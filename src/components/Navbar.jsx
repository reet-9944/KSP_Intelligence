import React from 'react';
import { NavLink } from 'react-router-dom';
import { Shield, Map, Share2, TrendingUp, Bot, User, LogOut, FileBadge } from 'lucide-react';
import './Navbar.css';

const Navbar = ({ userRole, onLogout }) => {
  return (
    <nav className="navbar glass-panel">
      <div className="navbar-brand">
        <Shield className="brand-icon" size={28} />
        <span className="brand-text">KSP <span className="text-gradient">Intelligence</span></span>
      </div>
      
      <div className="navbar-links">
        <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} end>
          <Shield size={18} /> Overview
        </NavLink>
        <NavLink to="/geospatial" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          <Map size={18} /> Geospatial
        </NavLink>
        <NavLink to="/network" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          <Share2 size={18} /> Network
        </NavLink>
        <NavLink to="/predictive" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          <TrendingUp size={18} /> Predictive
        </NavLink>
        <NavLink to="/ai" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          <Bot size={18} /> Chatbot
        </NavLink>
        <NavLink to="/offender" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          <FileBadge size={18} /> Profiling
        </NavLink>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          <User size={16} /> {userRole}
        </div>
        <button onClick={onLogout} style={{ background: 'transparent', border: 'none', color: 'var(--accent)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <LogOut size={16} /> Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
