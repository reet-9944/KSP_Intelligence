import React from 'react';
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
import { AlertTriangle, Activity } from 'lucide-react';
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
      <div className="page-header">
        <h1 className="page-title">Predictive Analytics</h1>
        <p className="page-subtitle">AI-driven forecasts and socio-economic risk scoring for proactive resource allocation.</p>
      </div>

      <div className="dashboard-grid">
        {/* Trend Prediction */}
        <div className="glass-panel chart-card">
          <h3 style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
            <Activity size={20} color="var(--primary)" /> Emerging Crime Trends
          </h3>
          <p style={{color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '16px'}}>
            Forecasted spikes based on hidden correlations and seasonal data.
          </p>
          <div className="chart-wrapper">
            <Line options={lineOptions} data={trendData} />
          </div>
        </div>

        {/* Risk Scoring */}
        <div className="glass-panel chart-card">
          <h3 style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
            <AlertTriangle size={20} color="var(--accent)" /> High-Risk Zone Analysis
          </h3>
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
