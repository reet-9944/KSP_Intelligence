import React, { useState, useEffect } from 'react';
import { Bot, User, Send, FileText, Mic, Globe, Info } from 'lucide-react';
import './PageStyles.css';
import { queryDatabase } from '../data/mockDatabase';

const InvestigatorAI = ({ userRole }) => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: `Welcome to the KSP Intelligence Hub, ${userRole}. I am your AI assistant. You can ask me to summarize case files, detect similar historical cases, or query the database in natural language.` }
  ]);
  const [input, setInput] = useState('');
  const [language, setLanguage] = useState('EN');
  const [isRecording, setIsRecording] = useState(false);

  // Simulated live alert
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessages(prev => [...prev, { 
        sender: 'bot', 
        text: '🚨 [LIVE ALERT] Anomaly detected: Multiple Vehicle Thefts reported in East Zone within the last 30 minutes. Dispatching patrol recommendations.' 
      }]);
    }, 15000);
    return () => clearTimeout(timer);
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMsg = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    setTimeout(() => {
      let botMsg = { sender: 'bot', text: '' };
      const query = userMsg.text.toLowerCase();
      
      if (userRole === 'Policymaker' && (query.includes('trend') || query.includes('report'))) {
        botMsg.text = "Based on macro analysis, property crimes are up 12% in the South Zone, correlating with rapid urbanization. Do you want the full policy impact report?";
      } else if (query.includes('ಸಾರಾಂಶ')) {
        botMsg.text = "ಎಫ್‌ಐಆರ್ # 1029 ರ ಆಧಾರದ ಮೇಲೆ, ಇಂದಿರಾನಗರ ಮೆಟ್ರೋ ಬಳಿ 23:00 ಗಂಟೆಗೆ ದ್ವಿಚಕ್ರ ವಾಹನ ಕಳ್ಳತನ ನಡೆದಿದೆ. ಇದು ಪೂರ್ವ ವಲಯದ ಇತ್ತೀಚಿನ 3 ಪ್ರಕರಣಗಳಿಗೆ ಹೊಂದಿಕೆಯಾಗುತ್ತದೆ.";
      } else {
        // Use the actual mock database query engine!
        botMsg.text = queryDatabase(query);
      }

      setMessages(prev => [...prev, botMsg]);
    }, 800);
  };

  const toggleVoice = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false);
        setInput(language === 'EN' ? 'Summarize vehicle thefts' : 'ವಾಹನ ಕಳ್ಳತನದ ಸಾರಾಂಶ ನೀಡಿ');
      }, 2000);
    }
  };

  return (
    <div className="page-container animate-fade-in">
      <div className="page-header" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px'}}>
        <div>
          <h1 className="page-title">{userRole === 'Policymaker' ? 'AI Policy Assistant' : 'Investigator AI Chatbot'}</h1>
          <p className="page-subtitle">Natural language interface for complex database queries, case summaries, and reporting.</p>
        </div>
        <div style={{display: 'flex', gap: '12px'}}>
          <button 
            className="btn-primary" 
            onClick={() => setLanguage(language === 'EN' ? 'KN' : 'EN')}
            style={{background: 'rgba(255,255,255,0.05)', borderColor: 'var(--border-glass)', color: 'var(--text-main)'}}
          >
            <Globe size={16} /> {language === 'EN' ? 'Switch to Kannada' : 'Switch to English'}
          </button>
        </div>
      </div>

      <div className="glass-panel chat-window">
        <div className="network-controls" style={{justifyContent: 'space-between', background: 'rgba(0,0,0,0.2)'}}>
           <div style={{display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.85rem'}}>
             <Info size={16} /> Context: {userRole} Access | Connected to Live DB
           </div>
          <button className="btn-primary" style={{padding: '8px 16px', fontSize: '0.85rem', background: 'var(--accent)', borderColor: 'var(--accent)', color: 'white'}}>
            <FileText size={16} /> Export Conversation History (PDF)
          </button>
        </div>
        
        <div className="chat-history">
          {messages.map((msg, idx) => (
            <div key={idx} className={`message ${msg.sender}`}>
              <div style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: msg.sender === 'bot' ? 'var(--primary)' : 'var(--text-main)', fontSize: '0.85rem', fontWeight: 600}}>
                {msg.sender === 'bot' ? <Bot size={16}/> : <User size={16}/>}
                {msg.sender === 'bot' ? 'KSP Intelligence' : userRole}
              </div>
              <div style={{lineHeight: 1.6}}>{msg.text}</div>
            </div>
          ))}
        </div>

        <div className="chat-input-area">
          <button 
            className={`btn-primary ${isRecording ? 'pulse' : ''}`} 
            onClick={toggleVoice} 
            style={{borderRadius: '50%', padding: '12px', background: isRecording ? 'var(--accent)' : 'transparent', borderColor: isRecording ? 'var(--accent)' : 'var(--border-glass)', color: isRecording ? 'white' : 'var(--text-muted)'}}
          >
            <Mic size={20} />
          </button>
          <input 
            type="text" 
            className="chat-input" 
            placeholder={language === 'EN' ? "Try: 'Summarize vehicle thefts' or 'Where does Rajendra operate?'" : "ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಇಲ್ಲಿ ಟೈಪ್ ಮಾಡಿ..."}
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
