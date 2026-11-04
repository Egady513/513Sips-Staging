/**
 * Atlas Wealth - Main Application Logic
 * Portfolio tracking dashboard with live data
 */

// Portfolio state
let portfolioData = null;
let currentPrices = {};
let chartInstance = null;
let currentTimeRange = '6M';

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  loadPortfolioData();
  setupEventListeners();
  fetchLivePrices();
  
  // Auto-refresh prices every 60 seconds
  setInterval(fetchLivePrices, 60000);
});

// Load portfolio configuration
function loadPortfolioData() {
  portfolioData = { ...PORTFOLIO_CONFIG };
  updateUI();
}

// Setup event listeners
function setupEventListeners() {
  // Tab switching
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab;
      switchTab(tab);
    });
  });
  
  // Time range buttons
  document.querySelectorAll('.time-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      currentTimeRange = btn.dataset.range;
      document.querySelectorAll('.time-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      updateChart();
    });
  });
  
  // Modal close
  document.querySelector('.modal-close').addEventListener('click', closeModal);
  document.querySelector('.modal-overlay').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeModal();
  });
}

// Switch tabs
function switchTab(tab) {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tab);
  });
  
  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.toggle('active', content.id === `${tab}-tab`);
  });
}

// Fetch live prices from Yahoo Finance
async function fetchLivePrices() {
  const tickers = portfolioData.holdings
    .filter(h => h.ticker !== 'CASH')
    .map(h => h.ticker);
  
  for (const ticker of tickers) {
    try {
      const response = await fetch(
        `https://query1.finance.yahoo.com/v8/finance/chart/${ticker}?interval=1d&range=1d`
      );
      const data = await response.json();
      
      if (data.chart && data.chart.result && data.chart.result[0]) {
        const result = data.chart.result[0];
        const meta = result.meta;
        const quote = result.indicators.quote[0];
        
        currentPrices[ticker] = {
          price: meta.regularMarketPrice || meta.previousClose,
          previousClose: meta.previousClose || meta.chartPreviousClose,
          change: meta.regularMarketPrice - meta.previousClose,
          changePercent: ((meta.regularMarketPrice - meta.previousClose) / meta.previousClose) * 100
        };
      }
    } catch (error) {
      console.warn(`Failed to fetch ${ticker}:`, error);
      // Use fallback prices
      currentPrices[ticker] = getFallbackPrice(ticker);
    }
  }
  
  // Add cash
  currentPrices['CASH'] = {
    price: 1,
    previousClose: 1,
    change: 0,
    changePercent: 0
  };
  
  updateUI();
}

// Fallback prices if API fails
function getFallbackPrice(ticker) {
  const fallbacks = {
    'VOO': { price: 475.23, previousClose: 470.15, change: 5.08, changePercent: 1.08 },
    'VTI': { price: 289.45, previousClose: 286.20, change: 3.25, changePercent: 1.14 },
    'VXUS': { price: 58.92, previousClose: 59.45, change: -0.53, changePercent: -0.89 },
    'BND': { price: 72.85, previousClose: 72.60, change: 0.25, changePercent: 0.34 }
  };
  return fallbacks[ticker] || { price: 100, previousClose: 100, change: 0, changePercent: 0 };
}

// Calculate portfolio metrics
function calculateMetrics() {
  let totalValue = 0;
  let totalCost = 0;
  let todayChange = 0;
  
  portfolioData.holdings.forEach(holding => {
    const price = currentPrices[holding.ticker]?.price || holding.avgPrice;
    const previousClose = currentPrices[holding.ticker]?.previousClose || holding.avgPrice;
    const value = price * holding.shares;
    const cost = holding.avgPrice * holding.shares;
    const dayChange = (price - previousClose) * holding.shares;
    
    totalValue += value;
    totalCost += cost;
    todayChange += dayChange;
  });
  
  const totalReturn = totalValue - portfolioData.startingValue;
  const totalReturnPercent = (totalReturn / portfolioData.startingValue) * 100;
  const todayChangePercent = (todayChange / totalValue) * 100;
  
  // Calculate alpha vs S&P 500
  const spyStart = portfolioData.historicalData.spy[0];
  const spyCurrent = portfolioData.historicalData.spy[portfolioData.historicalData.spy.length - 1];
  const spyReturn = ((spyCurrent - spyStart) / spyStart) * 100;
  const alpha = totalReturnPercent - spyReturn;
  
  // Calculate max drawdown
  let maxDrawdown = 0;
  let peak = portfolioData.historicalData.portfolio[0];
  portfolioData.historicalData.portfolio.forEach(value => {
    if (value > peak) peak = value;
    const drawdown = (peak - value) / peak;
    if (drawdown > maxDrawdown) maxDrawdown = drawdown;
  });
  
  // Estimate Sharpe ratio (simplified)
  const returns = [];
  for (let i = 1; i < portfolioData.historicalData.portfolio.length; i++) {
    const dailyReturn = (portfolioData.historicalData.portfolio[i] - portfolioData.historicalData.portfolio[i-1]) 
                      / portfolioData.historicalData.portfolio[i-1];
    returns.push(dailyReturn);
  }
  const avgReturn = returns.reduce((a, b) => a + b, 0) / returns.length;
  const variance = returns.reduce((sum, r) => sum + Math.pow(r - avgReturn, 2), 0) / returns.length;
  const stdDev = Math.sqrt(variance);
  const sharpeRatio = (avgReturn * 252) / (stdDev * Math.sqrt(252)); // Annualized
  
  return {
    totalValue,
    totalReturn,
    totalReturnPercent,
    todayChange,
    todayChangePercent,
    alpha,
    sharpeRatio: sharpeRatio || 1.2,
    maxDrawdown: maxDrawdown * 100
  };
}

// Update UI with current data
function updateUI() {
  const metrics = calculateMetrics();
  
  // Update header values
  document.getElementById('portfolio-value').textContent = formatCurrency(metrics.totalValue);
  
  const todayEl = document.getElementById('today-return');
  todayEl.innerHTML = formatReturn(metrics.todayChange, metrics.todayChangePercent);
  todayEl.className = metrics.todayChange >= 0 ? 'value positive' : 'value negative';
  
  const allTimeEl = document.getElementById('alltime-return');
  allTimeEl.innerHTML = formatReturn(metrics.totalReturn, metrics.totalReturnPercent);
  allTimeEl.className = metrics.totalReturn >= 0 ? 'value positive' : 'value negative';
  
  // Update stats
  document.getElementById('stat-total-return').textContent = `${metrics.totalReturnPercent >= 0 ? '+' : ''}${metrics.totalReturnPercent.toFixed(2)}%`;
  document.getElementById('stat-alpha').textContent = `${metrics.alpha >= 0 ? '+' : ''}${metrics.alpha.toFixed(2)}%`;
  document.getElementById('stat-sharpe').textContent = metrics.sharpeRatio.toFixed(2);
  document.getElementById('stat-drawdown').textContent = `-${metrics.maxDrawdown.toFixed(2)}%`;
  
  // Update holdings
  updateHoldings(metrics.totalValue);
  
  // Update chart
  updateChart();
  
  // Update market overview
  updateMarketOverview();
}

// Update holdings list
function updateHoldings(totalValue) {
  const container = document.getElementById('holdings-list');
  container.innerHTML = '';
  
  portfolioData.holdings.forEach(holding => {
    const price = currentPrices[holding.ticker]?.price || holding.avgPrice;
    const change = currentPrices[holding.ticker]?.change || 0;
    const changePercent = currentPrices[holding.ticker]?.changePercent || 0;
    const value = price * holding.shares;
    const allocation = (value / totalValue) * 100;
    
    const item = document.createElement('div');
    item.className = 'holding-item';
    item.onclick = () => showHoldingDetail(holding);
    
    item.innerHTML = `
      <div class="holding-info">
        <span class="holding-ticker">${holding.ticker}</span>
        <span class="holding-name">${holding.name}</span>
      </div>
      <div class="holding-allocation">
        <span class="allocation-label">${allocation.toFixed(1)}%</span>
        <div class="allocation-bar-small">
          <div class="allocation-fill" style="width: ${allocation}%"></div>
        </div>
      </div>
      <div class="holding-value">${formatCurrency(value)}</div>
      <div class="holding-change ${change >= 0 ? 'positive' : 'negative'}">
        ${change >= 0 ? '+' : ''}${changePercent.toFixed(2)}%
      </div>
      <div class="holding-arrow">→</div>
    `;
    
    container.appendChild(item);
  });
  
  // Update allocation bar
  updateAllocationBar(totalValue);
}

// Update allocation bar
function updateAllocationBar(totalValue) {
  const container = document.getElementById('allocation-bar');
  container.innerHTML = '';
  
  const colors = {
    'VOO': 'voo',
    'VTI': 'vti',
    'VXUS': 'vxus',
    'BND': 'bnd',
    'CASH': 'cash'
  };
  
  portfolioData.holdings.forEach(holding => {
    const price = currentPrices[holding.ticker]?.price || holding.avgPrice;
    const value = price * holding.shares;
    const allocation = (value / totalValue) * 100;
    
    const segment = document.createElement('div');
    segment.className = `allocation-segment ${colors[holding.ticker]}`;
    segment.style.width = `${allocation}%`;
    segment.title = `${holding.ticker}: ${allocation.toFixed(1)}%`;
    
    container.appendChild(segment);
  });
}

// Update chart
function updateChart() {
  const ctx = document.getElementById('performance-chart').getContext('2d');
  
  // Filter data based on time range
  const { dates, portfolio, spy } = getChartData();
  
  if (chartInstance) {
    chartInstance.destroy();
  }
  
  chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: dates,
      datasets: [
        {
          label: 'Atlas Wealth',
          data: portfolio,
          borderColor: '#D4AF37',
          backgroundColor: 'rgba(212, 175, 55, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 6
        },
        {
          label: 'S&P 500',
          data: spy,
          borderColor: '#64748B',
          backgroundColor: 'transparent',
          borderWidth: 2,
          borderDash: [5, 5],
          fill: false,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        intersect: false,
        mode: 'index'
      },
      plugins: {
        legend: {
          display: true,
          labels: {
            color: '#94A3B8',
            usePointStyle: true,
            padding: 20
          }
        },
        tooltip: {
          backgroundColor: 'rgba(10, 22, 40, 0.95)',
          titleColor: '#FFFFFF',
          bodyColor: '#94A3B8',
          borderColor: 'rgba(255, 255, 255, 0.1)',
          borderWidth: 1,
          padding: 12,
          callbacks: {
            label: function(context) {
              return context.dataset.label + ': ' + formatCurrency(context.raw);
            }
          }
        }
      },
      scales: {
        x: {
          grid: {
            color: 'rgba(255, 255, 255, 0.03)',
            drawBorder: false
          },
          ticks: {
            color: '#64748B',
            maxTicksLimit: 6
          }
        },
        y: {
          grid: {
            color: 'rgba(255, 255, 255, 0.03)',
            drawBorder: false
          },
          ticks: {
            color: '#64748B',
            callback: function(value) {
              return '$' + (value / 1000).toFixed(0) + 'k';
            }
          }
        }
      }
    }
  });
}

// Get chart data based on time range
function getChartData() {
  const allDates = portfolioData.historicalData.dates;
  const allPortfolio = portfolioData.historicalData.portfolio;
  const allSpy = portfolioData.historicalData.spy;
  
  let days;
  switch (currentTimeRange) {
    case '1D': days = 1; break;
    case '1W': days = 7; break;
    case '1M': days = 30; break;
    case 'YTD': days = allDates.length; break;
    case '1Y': days = 365; break;
    case 'ALL': days = allDates.length; break;
    default: days = 180; // 6M
  }
  
  const start = Math.max(0, allDates.length - days);
  
  return {
    dates: allDates.slice(start),
    portfolio: allPortfolio.slice(start),
    spy: allSpy.slice(start)
  };
}

// Update market overview
async function updateMarketOverview() {
  const indices = [
    { ticker: '^GSPC', name: 'S&P 500', display: 'SPX' },
    { ticker: '^IXIC', name: 'NASDAQ', display: 'NDX' },
    { ticker: '^DJI', name: 'DOW', display: 'DJI' }
  ];
  
  const container = document.getElementById('market-grid');
  container.innerHTML = '';
  
  for (const index of indices) {
    try {
      const response = await fetch(
        `https://query1.finance.yahoo.com/v8/finance/chart/${index.ticker}?interval=1d&range=1d`
      );
      const data = await response.json();
      
      let price, change, changePercent;
      
      if (data.chart && data.chart.result && data.chart.result[0]) {
        const meta = data.chart.result[0].meta;
        price = meta.regularMarketPrice || meta.previousClose;
        const prev = meta.previousClose || meta.chartPreviousClose;
        change = price - prev;
        changePercent = (change / prev) * 100;
      } else {
        throw new Error('No data');
      }
      
      const item = document.createElement('div');
      item.className = 'market-item';
      item.innerHTML = `
        <div class="name">${index.display}</div>
        <div class="value">${price.toLocaleString()}</div>
        <div class="change ${change >= 0 ? 'positive' : 'negative'}">
          ${change >= 0 ? '+' : ''}${changePercent.toFixed(2)}%
        </div>
      `;
      container.appendChild(item);
    } catch (error) {
      // Fallback values
      const fallbacks = {
        '^GSPC': { price: 5950, change: 1.2 },
        '^IXIC': { price: 18950, change: 1.5 },
        '^DJI': { price: 43500, change: 0.8 }
      };
      const fb = fallbacks[index.ticker];
      
      const item = document.createElement('div');
      item.className = 'market-item';
      item.innerHTML = `
        <div class="name">${index.display}</div>
        <div class="value">${fb.price.toLocaleString()}</div>
        <div class="change positive">+${fb.change.toFixed(2)}%</div>
      `;
      container.appendChild(item);
    }
  }
}

// Show holding detail modal
function showHoldingDetail(holding) {
  const price = currentPrices[holding.ticker]?.price || holding.avgPrice;
  const value = price * holding.shares;
  const cost = holding.avgPrice * holding.shares;
  const gain = value - cost;
  const gainPercent = (gain / cost) * 100;
  
  document.getElementById('modal-title').textContent = holding.ticker;
  document.getElementById('modal-name').textContent = holding.name;
  document.getElementById('modal-shares').textContent = holding.shares.toFixed(2);
  document.getElementById('modal-avg-price').textContent = formatCurrency(holding.avgPrice);
  document.getElementById('modal-current-price').textContent = formatCurrency(price);
  document.getElementById('modal-value').textContent = formatCurrency(value);
  document.getElementById('modal-cost').textContent = formatCurrency(cost);
  document.getElementById('modal-gain').textContent = `${gain >= 0 ? '+' : ''}${formatCurrency(gain)} (${gainPercent.toFixed(2)}%)`;
  document.getElementById('modal-gain').className = 'modal-value ' + (gain >= 0 ? 'positive' : 'negative');
  
  document.querySelector('.modal-overlay').classList.add('active');
}

// Close modal
function closeModal() {
  document.querySelector('.modal-overlay').classList.remove('active');
}

// Format currency
function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
}

// Format return
function formatReturn(value, percent) {
  const sign = value >= 0 ? '+' : '';
  return `<span>${sign}${formatCurrency(value)}</span> <span>(${sign}${percent.toFixed(2)}%)</span>`;
}
