import React, { useState, useEffect } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { Filter, Users, DollarSign, Activity } from 'lucide-react';
import './PageStyles.css';
import { database } from '../data/mockDatabase';

const Network = ({ userRole }) => {
  const [width, setWidth] = useState(1300);
  const [graphData, setGraphData] = useState(database.network);
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    // Handle responsive graph width
    const handleResize = () => {
      const container = document.querySelector('.graph-wrapper');
      if (container) setWidth(container.clientWidth);
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Init
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Simulate Real-time streaming
  useEffect(() => {
    if (!isLive) return;
    
    const interval = setInterval(() => {
      setGraphData(prev => {
        const newNodeId = `New Alias ${Math.floor(Math.random() * 1000)}`;
        return {
          nodes: [...prev.nodes, { id: newNodeId, group: 1, val: 15 }],
          links: [...prev.links, { source: 'Phantom Gang', target: newNodeId }]
        };
      });
    }, 12000); // Add a new node every 12 seconds to simulate live data
    
    return () => clearInterval(interval);
  }, [isLive]);

  const isPolicymaker = userRole === 'Policymaker';

  return (
    <div className="page-container animate-fade-in">
      <div className="page-header" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px'}}>
        <div>
          <h1 className="page-title">{isPolicymaker ? "Macro Criminal Networks" : "Network & Financial Link Analysis"}</h1>
          <p className="page-subtitle">
            {isPolicymaker 
              ? "High-level overview of organized crime groups and international financial outflows." 
              : "Uncover hidden relationships between suspects, victims, organized crime groups, and financial money trails."}
          </p>
        </div>
        <div className={`badge ${isLive ? 'pulse' : ''}`} style={{background: isLive ? 'rgba(0, 255, 136, 0.1)' : 'rgba(255,255,255,0.1)', color: isLive ? '#00ff88' : 'white', borderColor: isLive ? '#00ff88' : 'gray'}}>
          <Activity size={16} style={{marginRight: '8px'}}/> {isLive ? 'Live Connection: SCRB Core' : 'Offline Mode'}
        </div>
      </div>

      <div className="glass-panel">
        <div className="network-controls" style={{display: 'flex', gap: '16px', flexWrap: 'wrap'}}>
          <button className="btn-primary" style={{padding: '8px 16px', fontSize: '0.85rem'}}>
            <Filter size={16} /> {isPolicymaker ? 'Filter by District' : 'Filter Nodes'}
          </button>
          
          {/* Hide granular tactical tools from policymakers to de-clutter their view */}
          {!isPolicymaker && (
            <>
              <button className="btn-primary" style={{padding: '8px 16px', fontSize: '0.85rem', background: 'transparent', borderColor: 'var(--border-glass)'}}>
                <Users size={16} /> Isolate Gangs
              </button>
              <button className="btn-primary" style={{padding: '8px 16px', fontSize: '0.85rem', background: 'rgba(0, 255, 136, 0.1)', borderColor: '#00ff88', color: '#00ff88'}}>
                <DollarSign size={16} /> Highlight Financial Trails
              </button>
            </>
          )}
        </div>
        <div className="graph-wrapper" style={{width: '100%', overflow: 'hidden'}}>
          <ForceGraph2D
            graphData={graphData}
            nodeAutoColorBy="group"
            nodeRelSize={6}
            linkColor={() => 'rgba(255,255,255,0.2)'}
            width={width}
            height={typeof window !== 'undefined' && window.innerWidth < 768 ? 400 : 600}
            backgroundColor="#00000000"
            nodeLabel={(node) => `${node.id} ${node.group === 5 ? '(Financial)' : ''}`}
          />
        </div>
      </div>
    </div>
  );
};

export default Network;
