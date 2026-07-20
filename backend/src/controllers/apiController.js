const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const handleHelplineMessage = async (req, res) => {
  const { message } = req.body;
  
  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
    return res.json({ reply: "I'm currently in offline mode because the AI is not configured. Please dial 112 for immediate assistance." });
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are an AI safety assistant for a women's campus safety app named SecureShe. Be empathetic, concise, and helpful. If it sounds like a severe emergency, recommend calling 112. User message: ${message}`
    });
    
    res.json({ reply: response.text });
  } catch (error) {
    console.error('AI Error:', error);
    res.status(500).json({ reply: "I'm having trouble connecting right now. Please try again or call an emergency helpline." });
  }
};

const getStatus = (req, res) => {
  res.json({ status: 'ok', message: 'SecureShe API is running' });
};

module.exports = { handleHelplineMessage, getStatus };
