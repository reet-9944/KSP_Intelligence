import React, { useState } from 'react';
import { Bot, User, Send, FileText, Search } from 'lucide-react';
import './PageStyles.css';

const InvestigatorAI = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Welcome to the KSP Intelligence Hub. I am your AI assistant. You can ask me to summarize case files, detect similar historical cases, or query the database in natural language.' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMsg = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Mock AI Response
    setTimeout(() => {
      let botMsg = { sender: 'bot', text: 'Processing query through AI engine...' };
      
      if (userMsg.text.toLowerCase().includes('summarize')) {
        botMsg.text = "Based on FIR #1029, the incident involves a two-wheeler theft at 23:00 near Indiranagar Metro. The suspects used a master key. This MO matches 3 other recent cases in the East Zone.";
      } else if (userMsg.text.toLowerCase().includes('predict') || userMsg.text.toLowerCase().includes('trend')) {
        botMsg.text = "Analyzing temporal data... There is a 78% probability of increased property crimes in the South Zone during the upcoming holiday weekend. Recommend increasing night patrols.";
      } else {
        botMsg.text = "I have queried the database. Found 14 related records. Would you like me to export these as a Tactical PDF Report?";
      }

      setMessages(prev => [...prev, botMsg]);
    }, 1000);
  };

  return (
    <div className="page-container animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Investigator AI Chatbot</h1>
        <p className="page-subtitle">Natural language interface for complex database queries, case summaries, and reporting.</p>
      </div>

      <div className="glass-panel chat-window">
        <div className="network-controls" style={{justifyContent: 'flex-end'}}>
          <button className="btn-primary" style={{padding: '8px 16px', fontSize: '0.85rem'}}>
            <FileText size={16} /> Export PDF Report
          </button>
        </div>
        
        <div className="chat-history">
          {messages.map((msg, idx) => (
            <div key={idx} className={`message ${msg.sender}`}>
              <div style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: msg.sender === 'bot' ? 'var(--primary)' : 'var(--text-main)', fontSize: '0.85rem', fontWeight: 600}}>
                {msg.sender === 'bot' ? <Bot size={16}/> : <User size={16}/>}
                {msg.sender === 'bot' ? 'KSP Intelligence' : 'Investigator'}
              </div>
              <div style={{lineHeight: 1.6}}>{msg.text}</div>
            </div>
          ))}
        </div>

        <div className="chat-input-area">
          <input 
            type="text" 
            className="chat-input" 
            placeholder="e.g., 'Summarize recent vehicle thefts in Koramangala' or 'Find cases with similar Modus Operandi'"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button className="btn-primary" onClick={handleSend} style={{borderRadius: '8px'}}>
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvestigatorAI;
