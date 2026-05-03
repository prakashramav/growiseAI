const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

exports.generateChatResponse = async (prompt, contextData) => {
  try {
    const systemInstruction = `You are a helpful, professional AI financial advisor named GrowWise AI. 
    Use the following user data for context if needed: ${JSON.stringify(contextData)}. 
    Keep responses concise and actionable.`;

    const response = await ai.models.generateContent({
      model: 'gemini-flash-lite-latest',
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    return response.text;
  } catch (error) {
    throw error;
  }
};

exports.categorizeTransaction = async (title) => {
  try {
    const prompt = `Categorize the following transaction title into one of these categories: Food, Travel, Shopping, Utilities, Entertainment, Health, Transfer, Other. 
    Only reply with the category name, nothing else. Transaction: ${title}`;

    const response = await ai.models.generateContent({
      model: 'gemini-flash-lite-latest',
      contents: prompt,
    });

    return response.text.trim();
  } catch (error) {
    return 'Other'; // fallback
  }
};

exports.generateSummary = async (transactions) => {
  try {
    const prompt = `Based on these recent transactions, provide a short 2-3 sentence financial summary highlighting key spending patterns or warnings. 
    Transactions: ${JSON.stringify(transactions)}`;

    const response = await ai.models.generateContent({
      model: 'gemini-flash-lite-latest',
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    throw error;
  }
};

exports.generateInvestmentSuggestions = async (contextData) => {
  try {
    const prompt = `Based on the following user financial data, suggest 3-4 secure (low to medium risk) investment options. 
    Focus on diversification and steady growth (e.g., Index Funds, ETFs, Bonds). 
    Explain briefly why each is a secure choice for this specific user.
    User Context: ${JSON.stringify(contextData)}`;

    const response = await ai.models.generateContent({
      model: 'gemini-flash-lite-latest',
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    throw error;
  }
};
