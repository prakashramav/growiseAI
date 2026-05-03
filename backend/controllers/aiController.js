const { generateChatResponse, categorizeTransaction, generateSummary, generateInvestmentSuggestions } = require('../services/ai');
const Transaction = require('../models/Transaction');
const Budget = require('../models/Budget');
const Goal = require('../models/Goal');
const AILog = require('../models/AILog');
 
 // Simple in-memory cache
 const adviceCache = new Map();

exports.chat = async (req, res) => {
  const { prompt } = req.body;

  try {
    // Fetch some context
    const transactions = await Transaction.find({ user: req.user.id }).sort({ date: -1 }).limit(10);
    const contextData = { recentTransactions: transactions };

    const responseText = await generateChatResponse(prompt, contextData);

    // Save log
    const log = new AILog({
      user: req.user.id,
      prompt,
      response: responseText,
    });
    await log.save();

    res.json({ response: responseText });
  } catch (err) {
    if (err.status === 429) {
      return res.json({ 
        response: "I'm currently receiving a lot of requests! 🚀 To keep things secure and fast, I'm taking a short breather. \n\nIn the meantime, you can check your **Budgets** or **Goals** tabs for a quick overview of your progress. I'll be back in a few minutes to answer your specific questions!",
        isFallback: true 
      });
    }
    
    console.error('Chat AI Error:', err);
    res.status(500).json({ message: 'AI Assistant is temporarily offline.' });
  }
};

exports.categorize = async (req, res) => {
  const { title } = req.body;
  try {
    const category = await categorizeTransaction(title);
    res.json({ category });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'AI Error' });
  }
};

exports.summary = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id, type: 'expense' }).sort({ date: -1 }).limit(50);
    const summaryText = await generateSummary(transactions);
    res.json({ summary: summaryText });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'AI Error' });
  }
};

exports.investmentAdvice = async (req, res) => {
  const userId = req.user.id;
  const now = Date.now();

  // Check cache (expire after 1 hour)
  if (adviceCache.has(userId)) {
    const cached = adviceCache.get(userId);
    if (now - cached.timestamp < 3600000) {
      return res.json({ advice: cached.data });
    }
  }

  let transactions, budgets, goals;
  try {
    transactions = await Transaction.find({ user: userId }).sort({ date: -1 }).limit(50);
    budgets = await Budget.find({ user: userId });
    goals = await Goal.find({ user: userId });
  } catch (err) {
    console.error('Database Error:', err);
    return res.status(500).json({ message: 'Error fetching financial data' });
  }

  const contextData = {
    recentTransactions: transactions.map(t => ({ title: t.title, amount: t.amount, type: t.type, category: t.category })),
    activeBudgets: budgets.map(b => ({ category: b.category, amount: b.amount })),
    financialGoals: goals.map(g => ({ title: g.title, targetAmount: g.targetAmount, savedAmount: g.savedAmount })),
    currentSavingsRate: transactions.reduce((acc, curr) => acc + (curr.type === 'income' ? curr.amount : -curr.amount), 0)
  };

  try {
    const adviceText = await generateInvestmentSuggestions(contextData);
    
    // Save to cache
    adviceCache.set(userId, { data: adviceText, timestamp: now });

    res.json({ advice: adviceText });
  } catch (err) {
    if (err.status === 429) {
      // Fallback to local logic if quota exceeded
      const fallbackAdvice = generateFallbackAdvice(contextData);
      return res.json({ 
        advice: fallbackAdvice, 
        isFallback: true,
        message: 'Note: Using local advisor due to high demand (API limit reached).' 
      });
    }
    
    console.error('Investment Advice AI Error:', err);
    res.status(500).json({ message: 'AI Advisor is currently unavailable. Please try again later.' });
  }
};

// Local logic to provide secure suggestions when AI is unavailable
function generateFallbackAdvice(context) {
  const savings = context.currentSavingsRate || 0;
  
  let advice = "Based on your current financial profile, here are some secure investment options:\n\n";
  
  advice += "1. **Index Funds (S&P 500 / Nifty 50)**: A highly secure way to track the overall market growth. Ideal for long-term wealth building with historically stable returns.\n";
  advice += "2. **Debt Mutual Funds**: Lower risk than equity, these are great for preserving capital while earning better interest than a standard savings account.\n";
  advice += "3. **Government Bonds / Gold ETFs**: The most secure assets to protect against market volatility and inflation.\n";
  
  if (savings > 1000) {
    advice += "\n**Pro Tip**: Since you have a healthy savings rate, consider a 'Blue Chip' stock SIP to balance security with growth.";
  } else {
    advice += "\n**Pro Tip**: Focus on building a 3-month emergency fund in a high-yield savings account before moving into aggressive markets.";
  }
  
  return advice;
}
