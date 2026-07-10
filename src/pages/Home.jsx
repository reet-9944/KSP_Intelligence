import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Map, Share2, TrendingUp, Bot, ArrowRight, ShieldAlert } from 'lucide-react';
import './Home.css';

const Home = () => {
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

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content animate-fade-in">
          <div className="badge"><ShieldAlert size={16} className="badge-icon"/> KSP Official Platform</div>
          <h1 className="hero-title">
            Next-Gen <span className="text-gradient">Crime Intelligence</span> & Analytics
          </h1>
          <p className="hero-subtitle">
            Moving beyond manual records to an AI-driven, proactive policing ecosystem. 
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
          <h2 className="section-title fade-in-section text-center">Core Capabilities</h2>
          
          <div className="feature-grid">
            {/* Feature 1 */}
            <div className="feature-card glass-panel fade-in-section" onClick={() => navigate('/geospatial')}>
              <div className="feature-icon-wrapper geo">
                <Map size={32} />
              </div>
              <h3>Geospatial Intelligence</h3>
              <p>
                Interactive maps replacing static sheets. Visualize crime patterns, identify spatiotemporal clusters (hotspots), and receive emerging trend alerts with district-level drill-downs.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="feature-card glass-panel fade-in-section" onClick={() => navigate('/network')}>
              <div className="feature-icon-wrapper network">
                <Share2 size={32} />
              </div>
              <h3>Network & Link Analysis</h3>
              <p>
                Visually connect fragmented data points. Uncover organized crime structures, track repeat offenders, and detect hidden associations across multiple jurisdictions.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="feature-card glass-panel fade-in-section" onClick={() => navigate('/predictive')}>
              <div className="feature-icon-wrapper predictive">
                <TrendingUp size={32} />
              </div>
              <h3>Predictive Analytics</h3>
              <p>
                Move from reactive to proactive. Overlay socio-economic data for predictive risk scoring, and utilize AI for anomaly detection in behavioral patterns.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="feature-card glass-panel fade-in-section" onClick={() => navigate('/ai')}>
              <div className="feature-icon-wrapper ai">
                <Bot size={32} />
              </div>
              <h3>AI Investigator Chatbot</h3>
              <p>
                Natural language queries to rapidly extract insights. Generate AI case summaries, find similar historical cases (MO matching), and export tactical PDF reports.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer CTA */}
      <section className="cta-section fade-in-section">
        <div className="cta-box glass-panel text-center">
          <h2>Ready to analyze real-time data?</h2>
          <p>Access the unified database for state-wide comprehensive analysis.</p>
          <button className="btn-primary" style={{marginTop: '20px'}} onClick={() => navigate('/ai')}>
            Start AI Chat <Bot size={18} />
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
