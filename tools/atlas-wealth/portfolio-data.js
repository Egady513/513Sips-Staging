/**
 * Atlas Wealth - Portfolio Data Configuration
 * Sample portfolio with $100k starting value
 */

const PORTFOLIO_CONFIG = {
  // Starting portfolio value
  startingValue: 100000,
  
  // Inception date (6 months ago)
  inceptionDate: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  
  // Holdings allocation
  holdings: [
    {
      ticker: 'VOO',
      name: 'Vanguard S&P 500 ETF',
      allocation: 0.40,
      shares: 89.52,
      avgPrice: 446.82,
      category: 'US Equity'
    },
    {
      ticker: 'VXUS',
      name: 'Vanguard Total Intl Stock ETF',
      allocation: 0.20,
      shares: 199.60,
      avgPrice: 100.20,
      category: 'International'
    },
    {
      ticker: 'VTI',
      name: 'Vanguard Total Stock Market ETF',
      allocation: 0.25,
      shares: 104.17,
      avgPrice: 240.00,
      category: 'US Equity'
    },
    {
      ticker: 'BND',
      name: 'Vanguard Total Bond Market ETF',
      allocation: 0.10,
      shares: 130.04,
      avgPrice: 76.90,
      category: 'Bonds'
    },
    {
      ticker: 'CASH',
      name: 'Cash Position',
      allocation: 0.05,
      shares: 1,
      avgPrice: 5000,
      category: 'Cash'
    }
  ],
  
  // Activity/Trade history
  activity: [
    {
      id: 1,
      date: '2025-09-15T10:30:00Z',
      action: 'BUY',
      ticker: 'VOO',
      shares: 89.52,
      price: 446.82,
      value: 40000,
      rationale: 'Core S&P 500 position for long-term US equity exposure. Low-cost beta.',
      status: 'profit'
    },
    {
      id: 2,
      date: '2025-09-15T10:35:00Z',
      action: 'BUY',
      ticker: 'VTI',
      shares: 104.17,
      price: 240.00,
      value: 25000,
      rationale: 'Total market exposure for broader diversification beyond S&P 500.',
      status: 'profit'
    },
    {
      id: 3,
      date: '2025-09-15T10:40:00Z',
      action: 'BUY',
      ticker: 'VXUS',
      shares: 199.60,
      price: 100.20,
      value: 20000,
      rationale: 'International diversification. Valuations overseas more attractive than US.',
      status: 'loss'
    },
    {
      id: 4,
      date: '2025-09-15T10:45:00Z',
      action: 'BUY',
      ticker: 'BND',
      shares: 130.04,
      price: 76.90,
      value: 10000,
      rationale: 'Ballast position for portfolio stability. Rates expected to stabilize.',
      status: 'profit'
    },
    {
      id: 5,
      date: '2025-11-20T14:15:00Z',
      action: 'REBALANCE',
      ticker: 'VXUS',
      shares: 25.00,
      price: 98.50,
      value: 2462.50,
      rationale: 'Trimmed international to add cash buffer. Markets looking frothy.',
      status: 'profit'
    }
  ],
  
  // Historical performance data (6 months of daily values)
  // Portfolio slightly outperforms S&P 500 over time
  historicalData: {
    dates: [],
    portfolio: [],
    spy: []
  }
};

// Generate 6 months of historical data
function generateHistoricalData() {
  const days = 180;
  const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
  const dates = [];
  const portfolio = [];
  const spy = [];
  
  let portfolioValue = 100000;
  let spyValue = 100000;
  
  // Slight outperformance factor (portfolio beats SPY by ~2% annualized)
  const alphaPerDay = 0.000055; // ~2% annual alpha
  
  for (let i = 0; i <= days; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    dates.push(date.toISOString().split('T')[0]);
    
    // Random daily returns with slight upward bias
    const marketReturn = (Math.random() - 0.48) * 0.015; // Market noise
    const portfolioReturn = marketReturn + alphaPerDay + (Math.random() - 0.5) * 0.005;
    
    portfolioValue = portfolioValue * (1 + portfolioReturn);
    spyValue = spyValue * (1 + marketReturn);
    
    portfolio.push(parseFloat(portfolioValue.toFixed(2)));
    spy.push(parseFloat(spyValue.toFixed(2)));
  }
  
  PORTFOLIO_CONFIG.historicalData.dates = dates;
  PORTFOLIO_CONFIG.historicalData.portfolio = portfolio;
  PORTFOLIO_CONFIG.historicalData.spy = spy;
}

generateHistoricalData();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PORTFOLIO_CONFIG;
}