import React, { useState, useRef, useEffect } from 'react';
import './Helpline.css';

export default function Helpline() {
  const [messages, setMessages] = useState([
    { sender: 'ai', text: "Hello. I am your SecureShe AI Assistant. I can provide safety guidelines, emergency protocols, or emotional support. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userMessage }]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5005/api/helpline', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      });
      const data = await response.json();
      
      // Simulate typing delay for realistic feel
      setTimeout(() => {
        setMessages(prev => [...prev, { sender: 'ai', text: data.reply }]);
        setIsLoading(false);
      }, 800);
    } catch (error) {
      setMessages(prev => [...prev, { sender: 'ai', text: "Error connecting to AI. Please try again." }]);
      setIsLoading(false);
    }
  };

  return (
    <div className="helpline-container">
      <div className="chat-window">
        <div className="chat-header">
          <h2>🛡️ AI Safety Assistant</h2>
          <p>Confidential & 24/7 Support</p>
        </div>
        
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message-bubble ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
          {isLoading && (
            <div className="message-bubble ai typing-indicator">
              <span></span><span></span><span></span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form className="chat-input-area" onSubmit={handleSend}>
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question or concern here..."
            disabled={isLoading}
          />
          <button type="submit" disabled={isLoading || !input.trim()}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
