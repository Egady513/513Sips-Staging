# Atlas Wealth

A sleek, dark-themed portfolio tracking dashboard for 513 Sips. Inspired by the Dub app design aesthetic with a focus on clean typography, gold accents, and glassmorphism cards.

## 🌐 Live Demo

Visit: `https://513sips.com/tools/atlas-wealth/`

## ✨ Features

### Portfolio Tracking
- **Real-time Portfolio Value**: Live updates every 60 seconds
- **Performance Metrics**: Total return, alpha vs S&P 500, Sharpe ratio, max drawdown
- **Interactive Charts**: Compare portfolio performance against S&P 500 benchmark
- **Time Range Selection**: View performance over 1D, 1W, 1M, YTD, 1Y, 6M, or All time

### Holdings Management
- **Visual Allocation Bar**: See your asset allocation at a glance
- **Detailed Holdings List**: Ticker, name, allocation %, current value, daily change
- **Click for Details**: Modal view with cost basis, gains/losses, and more

### Activity Timeline
- **Trade History**: Complete log of all buys, sells, and rebalances
- **Rationale Tracking**: Document why each trade was made
- **Performance Tracking**: See how each trade has performed since execution

### Market Overview
- **Major Indices**: Live S&P 500, NASDAQ, and DOW data
- **Market News**: Quick headlines to stay informed

## 🎨 Design

- **Dark Navy Background**: `#0A1628`
- **Gold Accents**: `#D4AF37`
- **Glassmorphism Cards**: Subtle transparency with backdrop blur
- **Responsive Layout**: Works beautifully on desktop and mobile

## 📊 Data Sources

### Live Data
- **Yahoo Finance API**: Free, no API key required
- **Endpoint**: `https://query1.finance.yahoo.com/v8/finance/chart/{TICKER}`
- **Fallback**: Cached/sample data if API is unavailable

### Sample Portfolio
Starting with $100,000 allocated across:
- **VOO** (S&P 500): 40%
- **VTI** (Total Market): 25%
- **VXUS** (International): 20%
- **BND** (Bonds): 10%
- **Cash**: 5%

## 🛠️ Technical Stack

- **HTML5**: Semantic markup
- **CSS3**: Custom properties, flexbox, grid, glassmorphism
- **Vanilla JavaScript**: No frameworks, lightweight and fast
- **Chart.js**: Interactive line charts via CDN
- **Yahoo Finance API**: Free market data

## 📁 File Structure

```
atlas-wealth/
├── index.html          # Main dashboard page
├── styles.css          # All styling (dark theme, glassmorphism)
├── app.js              # Application logic, data fetching, charts
├── portfolio-data.js   # Sample portfolio configuration
└── README.md           # This file
```

## 🚀 Getting Started

1. **Clone or download** the files
2. **Open `index.html`** in any modern browser
3. **No build step required** - it's all static files

## 🔧 Customization

### Change Holdings
Edit `portfolio-data.js`:
```javascript
holdings: [
  {
    ticker: 'YOUR_TICKER',
    name: 'Your Fund Name',
    allocation: 0.25,  // 25%
    shares: 100,
    avgPrice: 50.00,
    category: 'Category'
  }
]
```

### Change Starting Value
```javascript
startingValue: 100000  // Your amount
```

### Add Trades
Edit the `activity` array in `portfolio-data.js`:
```javascript
{
  id: 6,
  date: '2025-12-01T10:00:00Z',
  action: 'BUY',
  ticker: 'AAPL',
  shares: 10,
  price: 180.00,
  value: 1800,
  rationale: 'Your reasoning here',
  status: 'profit'
}
```

## 📱 Mobile Support

The dashboard is fully responsive:
- Holdings list stacks on mobile
- Chart adjusts height
- Touch-friendly buttons and interactions
- Optimized typography for small screens

## ⚠️ Disclaimer

This is a **shadow portfolio tracker** for educational and tracking purposes. It does not connect to actual brokerage accounts. All trades must be logged manually.

**Not financial advice.** Past performance does not guarantee future results.

## 📝 License

Built for 513 Sips by Charlie. All rights reserved.
