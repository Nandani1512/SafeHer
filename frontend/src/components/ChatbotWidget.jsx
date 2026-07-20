import React, { useState, useEffect, useRef } from 'react';
import { Bot, X, Send, Moon, Sun, Loader } from 'lucide-react';
import './ChatbotWidget.css';

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: 'Hi! I am the SafeHer AI Assistant. How can I help you today?', isBot: true }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [theme, setTheme] = useState('dark');
  const messagesEndRef = useRef(null);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { text: input, isBot: false };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/helpline`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage.text })
      });
      const data = await res.json();
      
      setMessages(prev => [...prev, { text: data.reply, isBot: true }]);
    } catch (error) {
      setMessages(prev => [...prev, { text: 'Sorry, I am having trouble connecting to the server right now.', isBot: true, isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`chatbot-widget-container ${theme}`}>
      {/* Floating Action Button */}
      {!isOpen && (
        <button className="chatbot-fab" onClick={() => setIsOpen(true)}>
          <Bot size={28} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Bot size={24} />
              <strong>SafeHer Assistant</strong>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <button className="icon-btn" onClick={toggleTheme}>
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button className="icon-btn" onClick={() => setIsOpen(false)}>
                <X size={20} />
              </button>
            </div>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-message ${msg.isBot ? 'bot-message' : 'user-message'} ${msg.isError ? 'error-message' : ''}`}>
                {msg.text}
              </div>
            ))}
            {isLoading && (
              <div className="chat-message bot-message loading">
                <Loader size={16} className="spin" /> Thinking...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form className="chatbot-input-area" onSubmit={handleSend}>
            <input 
              type="text" 
              placeholder="Type your message..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" disabled={!input.trim() || isLoading}>
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
