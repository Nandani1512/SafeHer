const handleHelplineMessage = (req, res) => {
  const { message } = req.body;
  
  const lowerMsg = message?.toLowerCase() || '';
  let reply = "I'm here to help. Please let me know what you need or dial 112 for immediate emergency assistance.";
  
  if (lowerMsg.includes('police') || lowerMsg.includes('emergency')) {
    reply = "If you are in immediate danger, please dial 112 (National Emergency) or 1091 (Women Helpline) immediately. Find a safe, well-lit area if possible.";
  } else if (lowerMsg.includes('harassment') || lowerMsg.includes('stalk')) {
    reply = "I'm sorry you are experiencing this. Harassment is illegal. Please document everything (screenshots, times, locations) and contact the cyber cell or local police. You can also press your SOS button to alert your contacts.";
  }

  res.json({ reply });
};

const getStatus = (req, res) => {
  res.json({ status: 'ok', message: 'SecureShe API is running' });
};

module.exports = { handleHelplineMessage, getStatus };
