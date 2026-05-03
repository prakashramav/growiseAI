require('dotenv').config();
const { GoogleGenAI } = require('@google/genai');

async function listModels() {
  const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  try {
    const result = await genAI.models.list();
    for await (const model of result) {
        console.log(`- ${model.name} (${model.displayName})`);
    }
  } catch (err) {
    console.error('Error:', err);
  }
}

listModels();
