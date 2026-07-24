import React, { useState } from 'react';
import { Bot, User, Send, FileText, Mic, Globe } from 'lucide-react';
import './PageStyles.css';

const InvestigatorAI = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Welcome to the KSP Intelligence Hub. I am your AI assistant. You can ask me to summarize case files, detect similar historical cases, or query the database in natural language.' }
  ]);
  const [input, setInput] = useState('');
  const [language, setLanguage] = useState('EN');
  const [isRecording, setIsRecording] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMsg = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    setTimeout(() => {
      let botMsg = { sender: 'bot', text: 'Processing query through AI engine...' };
      
      if (userMsg.text.toLowerCase().includes('summarize') || userMsg.text.toLowerCase().includes('ಸಾರಾಂಶ')) {
        botMsg.text = language === 'EN' 
          ? "Based on FIR #1029, the incident involves a two-wheeler theft at 23:00 near Indiranagar Metro. The suspects used a master key. This MO matches 3 other recent cases in the East Zone."
          : "ಎಫ್‌ಐಆರ್ # 1029 ರ ಆಧಾರದ ಮೇಲೆ, ಇಂದಿರಾನಗರ ಮೆಟ್ರೋ ಬಳಿ 23:00 ಗಂಟೆಗೆ ದ್ವಿಚಕ್ರ ವಾಹನ ಕಳ್ಳತನ ನಡೆದಿದೆ. ಇದು ಪೂರ್ವ ವಲಯದ ಇತ್ತೀಚಿನ 3 ಪ್ರಕರಣಗಳಿಗೆ ಹೊಂದಿಕೆಯಾಗುತ್ತದೆ.";
      } else {
        botMsg.text = language === 'EN'
          ? "I have queried the database. Found 14 related records. Would you like me to export these as a Tactical PDF Report?"
          : "ನಾನು ಡೇಟಾಬೇಸ್ ಅನ್ನು ಪರಿಶೀಲಿಸಿದ್ದೇನೆ. 14 ಸಂಬಂಧಿತ ದಾಖಲೆಗಳು ಕಂಡುಬಂದಿವೆ. ನೀವು ಇದನ್ನು PDF ಆಗಿ ರಫ್ತು ಮಾಡಲು ಬಯಸುವಿರಾ?";
      }

      setMessages(prev => [...prev, botMsg]);
    }, 1000);
  };

  const toggleVoice = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false);
        setInput(language === 'EN' ? 'Summarize the latest vehicle theft in Indiranagar.' : 'ಇಂದಿರಾನಗರದಲ್ಲಿ ಇತ್ತೀಚಿನ ವಾಹನ ಕಳ್ಳತನದ ಸಾರಾಂಶ ನೀಡಿ.');
      }, 2000);
    }
  };

  return (
    <div className="page-container animate-fade-in">
      <div className="page-header" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div>
          <h1 className="page-title">Investigator AI Chatbot</h1>
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
        <div className="network-controls" style={{justifyContent: 'flex-end', background: 'rgba(0,0,0,0.2)'}}>
          <button className="btn-primary" style={{padding: '8px 16px', fontSize: '0.85rem', background: 'var(--accent)', borderColor: 'var(--accent)', color: 'white'}}>
            <FileText size={16} /> Export Conversation History (PDF)
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
            placeholder={language === 'EN' ? "Type your query here..." : "ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಇಲ್ಲಿ ಟೈಪ್ ಮಾಡಿ..."}
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
