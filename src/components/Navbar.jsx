import React from 'react';
import { NavLink } from 'react-router-dom';
import { Shield, Map, Share2, TrendingUp, Bot } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
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
          <Bot size={18} /> Investigator AI
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
