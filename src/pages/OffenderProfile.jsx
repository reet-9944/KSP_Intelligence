import React from 'react';
import { UserX, AlertOctagon, Activity, FileText } from 'lucide-react';
import './PageStyles.css';

const OffenderProfile = ({ userRole }) => {
  return (
    <div className="page-container animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Criminology-Based Profiling</h1>
        <p className="page-subtitle">Behavioral analysis, repeat offender tracking, and risk scoring.</p>
        {userRole === 'Policymaker' && (
          <div className="badge" style={{marginTop: '12px'}}>Note: Individual profiles are anonymized for Policy level access.</div>
        )}
      </div>

      <div className="dashboard-grid offender-grid">
        {/* Profile Card */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '24px' }}>
            <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'rgba(255, 0, 85, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', border: '2px solid var(--accent)' }}>
              <UserX size={48} color="var(--accent)" />
            </div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '4px', textAlign: 'center' }}>
              {userRole === 'Policymaker' ? 'Subject #9023' : 'Raja "The Phantom"'}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textAlign: 'center' }}>
              {userRole === 'Policymaker' ? 'Anonymized Record' : 'Alias: K. Rajendra | ID: KSP-9023'}
            </p>
          </div>

          <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Status</span>
              <span style={{ color: 'var(--warning)', fontWeight: 600 }}>Absconding</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Primary Zone</span>
              <span>South & East Zones</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Repeat Offenses</span>
              <span>14 Recorded</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{ color: 'var(--text-muted)' }}>AI Risk Score</span>
              <span style={{ background: 'var(--accent)', color: 'white', padding: '4px 12px', borderRadius: '50px', fontWeight: 600, fontSize: '0.85rem' }}>94/100 (Critical)</span>
            </div>
          </div>
        </div>

        {/* Behavioral Analysis & MO */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="glass-panel" style={{ padding: '24px' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Activity size={20} color="var(--primary)" /> Modus Operandi (MO) & Behavior
            </h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
              The subject demonstrates a highly organized behavioral pattern. Offenses primarily target high-end apartments during long weekends. The MO involves disabling electronic security systems (indicating technical proficiency) and escaping via stolen two-wheelers which are abandoned within a 5km radius.
            </p>
            <div style={{ display: 'flex', gap: '8px', marginTop: '16px', flexWrap: 'wrap' }}>
              <span className="badge" style={{margin: 0}}>Technical Sabotage</span>
              <span className="badge" style={{margin: 0}}>Night Operations</span>
              <span className="badge" style={{margin: 0}}>Organized Fencing</span>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '24px' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <FileText size={20} color="var(--warning)" /> Similar Historical Cases
            </h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ padding: '12px 0', borderBottom: '1px solid var(--border-glass)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                <div>
                  <strong>FIR #8920 - HSR Layout</strong>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Matches MO: Security Jamming</div>
                </div>
                <span style={{ color: 'var(--success)' }}>Closed (Convicted)</span>
              </li>
              <li style={{ padding: '12px 0', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                <div>
                  <strong>FIR #9102 - Koramangala</strong>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Matches MO: Abandoned Vehicle Escape</div>
                </div>
                <span style={{ color: 'var(--warning)' }}>Open Investigation</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OffenderProfile;
