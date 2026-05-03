const YahooFinance = require('yahoo-finance2').default;
const yahooFinance = new YahooFinance({ suppressNotices: ['yahooSurvey'] });

const ASSETS = [
  { symbol: 'BTC-USD', name: 'Bitcoin', type: 'Crypto' },
  { symbol: 'ETH-USD', name: 'Ethereum', type: 'Crypto' },
  { symbol: 'AAPL', name: 'Apple', type: 'Stock' },
  { symbol: 'MSFT', name: 'Microsoft', type: 'Stock' },
  { symbol: 'VFIAX', name: 'Vanguard 500', type: 'Mutual Fund' },
  { symbol: 'VOO', name: 'S&P 500 ETF', type: 'SIP Proxy' }
];

exports.getLiveMarketData = async (req, res) => {
  try {
    const symbols = ASSETS.map(a => a.symbol);
    const quotes = await yahooFinance.quote(symbols);
    
    // Sometimes quote returns a single object if only one symbol was found or passed, ensure it's an array
    const quotesArray = Array.isArray(quotes) ? quotes : [quotes];

    const formattedData = ASSETS.map(asset => {
      const quote = quotesArray.find(q => q && q.symbol === asset.symbol);
      if (quote) {
        return {
          ...asset,
          price: quote.regularMarketPrice,
          change: quote.regularMarketChange,
          changePercent: quote.regularMarketChangePercent,
          currency: quote.currency || 'USD'
        };
      }
      return null;
    }).filter(item => item !== null);

    res.json(formattedData);
  } catch (err) {
    console.error('Market data error:', err.message);
    res.status(500).json({ message: 'Failed to fetch market data' });
  }
};
