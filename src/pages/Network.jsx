import React from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { Filter, Users } from 'lucide-react';
import './PageStyles.css';

const Network = () => {
  // Mock data for criminal network
  const graphData = {
    nodes: [
      { id: 'John Doe', group: 1, val: 20 },
      { id: 'Jane Smith', group: 2, val: 10 },
      { id: 'Gang A', group: 3, val: 30 },
      { id: 'Location X', group: 4, val: 15 },
      { id: 'Suspect Y', group: 1, val: 25 },
    ],
    links: [
      { source: 'John Doe', target: 'Gang A' },
      { source: 'Jane Smith', target: 'Location X' },
      { source: 'Suspect Y', target: 'Gang A' },
      { source: 'John Doe', target: 'Suspect Y' },
    ]
  };

  return (
    <div className="page-container animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Network & Link Analysis</h1>
        <p className="page-subtitle">Uncover hidden relationships between suspects, victims, and organized crime groups.</p>
      </div>

      <div className="glass-panel">
        <div className="network-controls">
          <button className="btn-primary" style={{padding: '8px 16px', fontSize: '0.85rem'}}>
            <Filter size={16} /> Filter Nodes
          </button>
          <button className="btn-primary" style={{padding: '8px 16px', fontSize: '0.85rem', background: 'transparent', borderColor: 'var(--border-glass)'}}>
            <Users size={16} /> Isolate Gangs
          </button>
        </div>
        <div className="graph-wrapper">
          <ForceGraph2D
            graphData={graphData}
            nodeAutoColorBy="group"
            nodeRelSize={6}
            linkColor={() => 'rgba(255,255,255,0.2)'}
            width={1300}
            height={600}
            backgroundColor="#00000000" // transparent
          />
        </div>
      </div>
    </div>
  );
};

export default Network;
