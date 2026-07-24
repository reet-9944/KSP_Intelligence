import React from 'react';
import { NavLink } from 'react-router-dom';
import { Shield, Map, Share2, TrendingUp, Bot, User, LogOut, FileBadge } from 'lucide-react';
import './Navbar.css';

const Navbar = ({ userRole, onLogout }) => {
  // Role-Based Access Control (RBAC) mapping for Navbar links
  const rolePermissions = {
    'Investigator': ['overview', 'geospatial', 'chatbot', 'offender'],
    'Analyst': ['overview', 'geospatial', 'network', 'predictive', 'chatbot', 'offender'],
    'Supervisor': ['overview', 'geospatial', 'predictive', 'offender'],
    'Policymaker': ['overview', 'predictive', 'chatbot']
  };

  // Safe fallback if role is unrecognized
  const allowedLinks = rolePermissions[userRole] || ['overview'];

  return (
    <nav className="navbar glass-panel">
      <div className="navbar-brand">
        <Shield className="brand-icon" size={28} />
        <span className="brand-text">KSP <span className="text-gradient">Intelligence</span></span>
      </div>
      
      <div className="navbar-links">
        {allowedLinks.includes('overview') && (
          <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} end>
            <Shield size={18} /> Overview
          </NavLink>
        )}
        
        {allowedLinks.includes('geospatial') && (
          <NavLink to="/geospatial" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            <Map size={18} /> Geospatial
          </NavLink>
        )}
        
        {allowedLinks.includes('network') && (
          <NavLink to="/network" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            <Share2 size={18} /> Network
          </NavLink>
        )}
        
        {allowedLinks.includes('predictive') && (
          <NavLink to="/predictive" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            <TrendingUp size={18} /> Predictive
          </NavLink>
        )}
        
        {allowedLinks.includes('chatbot') && (
          <NavLink to="/ai" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            <Bot size={18} /> Chatbot
          </NavLink>
        )}
        
        {allowedLinks.includes('offender') && (
          <NavLink to="/offender" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            <FileBadge size={18} /> Profiling
          </NavLink>
        )}
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
