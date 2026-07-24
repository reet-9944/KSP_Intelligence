import React from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { Filter, Users, DollarSign } from 'lucide-react';
import './PageStyles.css';

const Network = () => {
  // Enhanced Mock data including Financial Nodes
  const graphData = {
    nodes: [
      { id: 'John Doe', group: 1, val: 20 },
      { id: 'Jane Smith', group: 2, val: 10 },
      { id: 'Gang A', group: 3, val: 30 },
      { id: 'Location X', group: 4, val: 15 },
      { id: 'Suspect Y', group: 1, val: 25 },
      { id: 'Offshore Account 1', group: 5, val: 15 }, // Financial Node
      { id: 'Hawala Agent Z', group: 5, val: 20 }, // Financial Node
    ],
    links: [
      { source: 'John Doe', target: 'Gang A' },
      { source: 'Jane Smith', target: 'Location X' },
      { source: 'Suspect Y', target: 'Gang A' },
      { source: 'John Doe', target: 'Suspect Y' },
      { source: 'Gang A', target: 'Hawala Agent Z' },
      { source: 'Hawala Agent Z', target: 'Offshore Account 1' },
      { source: 'John Doe', target: 'Offshore Account 1' },
    ]
  };

  return (
    <div className="page-container animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Network & Financial Link Analysis</h1>
        <p className="page-subtitle">Uncover hidden relationships between suspects, victims, organized crime groups, and financial money trails.</p>
      </div>

      <div className="glass-panel">
        <div className="network-controls" style={{display: 'flex', gap: '16px', flexWrap: 'wrap'}}>
          <button className="btn-primary" style={{padding: '8px 16px', fontSize: '0.85rem'}}>
            <Filter size={16} /> Filter Nodes
          </button>
          <button className="btn-primary" style={{padding: '8px 16px', fontSize: '0.85rem', background: 'transparent', borderColor: 'var(--border-glass)'}}>
            <Users size={16} /> Isolate Gangs
          </button>
          <button className="btn-primary" style={{padding: '8px 16px', fontSize: '0.85rem', background: 'rgba(0, 255, 136, 0.1)', borderColor: '#00ff88', color: '#00ff88'}}>
            <DollarSign size={16} /> Highlight Financial Trails
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
            nodeLabel={(node) => `${node.id} ${node.group === 5 ? '(Financial)' : ''}`}
          />
        </div>
      </div>
    </div>
  );
};

export default Network;
