import React, { useState } from 'react';
import { Shield, Lock, UserCheck } from 'lucide-react';
import './PageStyles.css';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [role, setRole] = useState('Investigator');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    onLogin(role);
    navigate('/');
  };

  return (
    <div className="page-container animate-fade-in" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <div className="glass-panel" style={{ padding: '40px', maxWidth: '400px', width: '100%', textAlign: 'center' }}>
        <Shield size={48} color="var(--primary)" style={{ marginBottom: '16px' }} />
        <h2 style={{ fontFamily: 'var(--font-display)', marginBottom: '8px' }}>KSP Official Portal</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '32px', fontSize: '0.9rem' }}>Secure Role-Based Access</p>
        
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ textAlign: 'left' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Select Role</label>
            <select 
              value={role} 
              onChange={(e) => setRole(e.target.value)}
              style={{ 
                width: '100%', padding: '12px', borderRadius: '8px', 
                background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-glass)', 
                color: 'white', outline: 'none'
              }}
            >
              <option value="Investigator">Investigator</option>
              <option value="Analyst">Crime Analyst</option>
              <option value="Supervisor">Supervisor</option>
              <option value="Policymaker">Policymaker</option>
            </select>
          </div>
          
          <div style={{ textAlign: 'left' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Secure Token (Mock)</label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--text-muted)' }} />
              <input 
                type="password" 
                defaultValue="mock-token-123" 
                readOnly
                style={{ 
                  width: '100%', padding: '12px 12px 12px 36px', borderRadius: '8px', 
                  background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-glass)', 
                  color: 'white', outline: 'none'
                }} 
              />
            </div>
          </div>

          <button type="submit" className="btn-primary" style={{ justifyContent: 'center', marginTop: '16px' }}>
            <UserCheck size={18} /> Authenticate
          </button>
        </form>
        <p style={{ marginTop: '24px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          Audit logging enabled. All actions are traced in compliance with governance frameworks.
        </p>
      </div>
    </div>
  );
};

export default Login;
