import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, Shield, Moon, Sun, Loader } from 'lucide-react';
import './Helpline.css';

export default function Helpline() {
  const [messages, setMessages] = useState([
    { sender: 'ai', text: "Hello. I am your SafeHer AI Assistant. I can provide safety guidelines, emergency protocols, or emotional support. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [theme, setTheme] = useState('dark');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userMessage }]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/helpline`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      });
      const data = await response.json();
      
      setTimeout(() => {
        setMessages(prev => [...prev, { sender: 'ai', text: data.reply }]);
        setIsLoading(false);
      }, 500);
    } catch (error) {
      setMessages(prev => [...prev, { sender: 'ai', text: "Error connecting to AI. Please try again." }]);
      setIsLoading(false);
    }
  };

  return (
    <div className={`helpline-fullscreen-container ${theme}`}>
      <div className="chat-layout">
        
        {/* Sidebar / Info Panel */}
        <div className="chat-sidebar">
          <div className="sidebar-header">
            <Bot size={40} color="var(--clr-primary)" />
            <h2>SafeHer AI</h2>
            <p>Your 24/7 Safety Companion</p>
          </div>
          
          <div className="sidebar-features">
            <div className="feature-item">
              <Shield size={20} color="var(--clr-success)" />
              <div>
                <strong>Confidential</strong>
                <p>All chats are private and secure.</p>
              </div>
            </div>
          </div>
          
          <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'center' }}>
             <button className="btn btn-ghost" onClick={toggleTheme} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {theme === 'dark' ? <><Sun size={18} /> Light Mode</> : <><Moon size={18} /> Dark Mode</>}
             </button>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="chat-main">
          <div className="chat-messages-area">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.sender === 'ai' ? 'bot-message' : 'user-message'}`}>
                {msg.sender === 'ai' && <div className="message-avatar"><Bot size={20} /></div>}
                <div className="message-content">{msg.text}</div>
              </div>
            ))}
            {isLoading && (
              <div className="chat-message bot-message loading">
                <div className="message-avatar"><Bot size={20} /></div>
                <div className="message-content" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Loader size={16} className="spin" /> Thinking...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form className="chat-input-area" onSubmit={handleSend}>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything..."
              disabled={isLoading}
            />
            <button type="submit" disabled={isLoading || !input.trim()}>
              <Send size={20} />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
