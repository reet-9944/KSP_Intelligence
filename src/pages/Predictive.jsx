import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { AlertTriangle, Activity, Info } from 'lucide-react';
import './PageStyles.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Predictive = () => {
  const [showExplanation, setShowExplanation] = useState(false);

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: '#f0f4f8' } },
    },
    scales: {
      x: { ticks: { color: '#8b949e' }, grid: { color: 'rgba(255,255,255,0.1)' } },
      y: { ticks: { color: '#8b949e' }, grid: { color: 'rgba(255,255,255,0.1)' } },
    },
  };

  const trendData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Historical Average',
        data: [120, 110, 105, 115, 125, 130],
        borderColor: '#7000ff',
        backgroundColor: 'rgba(112, 0, 255, 0.5)',
      },
      {
        label: 'Predicted Trend (AI)',
        data: [125, 115, 110, 130, 150, 165],
        borderColor: '#ff0055',
        backgroundColor: 'rgba(255, 0, 85, 0.5)',
        borderDash: [5, 5],
      },
    ],
  };

  const riskData = {
    labels: ['South Zone', 'North Zone', 'East Zone', 'West Zone', 'Central'],
    datasets: [
      {
        label: 'AI Risk Score',
        data: [85, 45, 60, 35, 92],
        backgroundColor: [
          'rgba(255, 0, 85, 0.8)',
          'rgba(0, 240, 255, 0.8)',
          'rgba(255, 184, 0, 0.8)',
          'rgba(0, 255, 136, 0.8)',
          'rgba(255, 0, 85, 0.8)',
        ],
      },
    ],
  };

  return (
    <div className="page-container animate-fade-in">
      <div className="page-header" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
        <div>
          <h1 className="page-title">Predictive & Sociological Analytics</h1>
          <p className="page-subtitle">AI-driven forecasts and socio-economic risk scoring for proactive resource allocation.</p>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Trend Prediction */}
        <div className="glass-panel chart-card" style={{position: 'relative'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <h3 style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
              <Activity size={20} color="var(--primary)" /> Emerging Crime Trends
            </h3>
            <button 
              onClick={() => setShowExplanation(!showExplanation)}
              className="btn-primary" 
              style={{padding: '4px 12px', fontSize: '0.8rem', background: 'transparent', borderColor: 'var(--border-glass)'}}
            >
              <Info size={14} /> Explain AI
            </button>
          </div>
          <p style={{color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '16px'}}>
            Forecasted spikes based on hidden correlations and seasonal data.
          </p>

          {showExplanation && (
            <div className="glass-panel" style={{position: 'absolute', top: '70px', right: '24px', zIndex: 10, padding: '16px', maxWidth: '300px', border: '1px solid var(--primary)', background: 'var(--bg-darker)'}}>
              <h4 style={{color: 'var(--primary)', marginBottom: '8px', fontSize: '0.9rem'}}>AI Reasoning Trail</h4>
              <ul style={{fontSize: '0.8rem', color: 'var(--text-main)', paddingLeft: '16px', margin: 0, display: 'flex', flexDirection: 'column', gap: '8px'}}>
                <li><strong>Correlation 1:</strong> 42% increase in urbanization migration to South Zone (Census Data).</li>
                <li><strong>Correlation 2:</strong> Economic stress indicators spiked in May (Jobless claims).</li>
                <li><strong>Historical Pattern:</strong> Summer months historically show a 15% baseline increase in property crimes.</li>
              </ul>
            </div>
          )}

          <div className="chart-wrapper">
            <Line options={lineOptions} data={trendData} />
          </div>
        </div>

        {/* Risk Scoring */}
        <div className="glass-panel chart-card">
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <h3 style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
              <AlertTriangle size={20} color="var(--accent)" /> High-Risk Zone Analysis
            </h3>
          </div>
          <p style={{color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '16px'}}>
            Zones with high probability of clustered incidents within 48 hours.
          </p>
          <div className="chart-wrapper">
            <Bar options={lineOptions} data={riskData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Predictive;
