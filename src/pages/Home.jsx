import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Map, Share2, TrendingUp, Bot, ArrowRight, ShieldAlert } from 'lucide-react';
import './Home.css';

const Home = ({ userRole }) => {
  const navigate = useNavigate();
  const observerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.fade-in-section');
    elements.forEach((el) => observer.observe(el));
    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        elements.forEach((el) => observerRef.current.unobserve(el));
      }
    };
  }, []);

  const getRoleGreeting = () => {
    switch(userRole) {
      case 'Investigator': return "Tactical Field Operations & Active Case Tracking.";
      case 'Analyst': return "Deep-Dive Link Analysis & Data Correlation Hub.";
      case 'Supervisor': return "Resource Deployment & Zone Command Overview.";
      case 'Policymaker': return "State-wide Macro Trends & Policy Impact Dashboards.";
      default: return "Moving beyond manual records to an AI-driven, proactive policing ecosystem.";
    }
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content animate-fade-in">
          <div className="badge"><ShieldAlert size={16} className="badge-icon"/> {userRole} Portal</div>
          <h1 className="hero-title">
            Next-Gen <span className="text-gradient">Crime Intelligence</span> & Analytics
          </h1>
          <p className="hero-subtitle">
            {getRoleGreeting()}
            <br/><br/>
            Discover hidden patterns, map criminal networks, and predict emerging trends with state-of-the-art visualization.
          </p>
          <div className="hero-actions">
            <button className="btn-primary pulse" onClick={() => navigate('/geospatial')}>
              Launch Intelligence Hub <ArrowRight size={18} />
            </button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="cyber-circle cc-1"></div>
          <div className="cyber-circle cc-2"></div>
          <div className="cyber-circle cc-3"></div>
        </div>
      </section>

      {/* Scrolling Info Sections */}
      <section className="info-section">
        <div className="container">
          <h2 className="section-title fade-in-section text-center">Core Capabilities for {userRole}s</h2>
          
          <div className="feature-grid">
            <div className="feature-card glass-panel fade-in-section" onClick={() => navigate('/geospatial')}>
              <div className="feature-icon-wrapper geo"><Map size={32} /></div>
              <h3>Geospatial Intelligence</h3>
              <p>Interactive maps for visualizing crime patterns, hotspots, and district-level alerts tailored to your jurisdiction.</p>
            </div>

            <div className="feature-card glass-panel fade-in-section" onClick={() => navigate('/network')}>
              <div className="feature-icon-wrapper network"><Share2 size={32} /></div>
              <h3>Network & Link Analysis</h3>
              <p>Uncover organized crime structures and detect hidden financial associations across jurisdictions.</p>
            </div>

            <div className="feature-card glass-panel fade-in-section" onClick={() => navigate('/predictive')}>
              <div className="feature-icon-wrapper predictive"><TrendingUp size={32} /></div>
              <h3>Predictive Analytics</h3>
              <p>Move from reactive to proactive with socio-economic data forecasting and AI anomaly detection.</p>
            </div>

            <div className="feature-card glass-panel fade-in-section" onClick={() => navigate('/ai')}>
              <div className="feature-icon-wrapper ai"><Bot size={32} /></div>
              <h3>AI Investigator Chatbot</h3>
              <p>Natural language queries to rapidly extract insights, find similar historical cases, and export tactical reports.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
