import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { AlertTriangle, Filter, Map as MapIcon, Activity } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import './PageStyles.css';
import { database } from '../data/mockDatabase';

const Geospatial = ({ userRole }) => {
  const position = [12.9716, 77.5946]; // Bangalore center
  const [hotspots, setHotspots] = useState(database.hotspots);
  const [isLive, setIsLive] = useState(true);

  // Simulate real-time crime stream
  useEffect(() => {
    if (!isLive) return;
    
    const interval = setInterval(() => {
      // Add a slight randomization to a location to simulate new crimes
      const lat = 12.9 + (Math.random() * 0.1);
      const lng = 77.5 + (Math.random() * 0.1);
      
      setHotspots(prev => [...prev, {
        id: Date.now(),
        pos: [lat, lng],
        intensity: 0.9,
        type: 'Live Alert',
        label: 'Unverified Incident'
      }]);
    }, 10000); // Every 10 seconds add a new point
    
    return () => clearInterval(interval);
  }, [isLive]);

  const isPolicymaker = userRole === 'Policymaker';

  return (
    <div className="page-container animate-fade-in">
      <div className="page-header" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px'}}>
        <div>
          <h1 className="page-title">{isPolicymaker ? 'State-wide Crime Density' : 'Tactical Geospatial Intelligence'}</h1>
          <p className="page-subtitle">Real-time mapping of incident reports and historical crime hotspots.</p>
        </div>
        <div className={`badge ${isLive ? 'pulse' : ''}`} style={{background: isLive ? 'rgba(0, 255, 136, 0.1)' : 'rgba(255,255,255,0.1)', color: isLive ? '#00ff88' : 'white', borderColor: isLive ? '#00ff88' : 'gray'}}>
          <Activity size={16} style={{marginRight: '8px'}}/> {isLive ? 'Live Stream Active' : 'Offline Mode'}
        </div>
      </div>

      <div className="glass-panel map-container" style={{ position: 'relative', height: '600px', borderRadius: '16px' }}>
        
        {/* Map UI Overlay Controls */}
        <div style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 1000, display: 'flex', gap: '8px' }}>
          <button className="btn-primary" style={{ padding: '8px 12px', fontSize: '0.85rem' }}>
            <Filter size={16} /> Filters
          </button>
          {!isPolicymaker && (
            <button className="btn-primary" style={{ padding: '8px 12px', fontSize: '0.85rem', background: 'var(--accent)', borderColor: 'var(--accent)' }}>
              <AlertTriangle size={16} /> Active Alerts
            </button>
          )}
        </div>

        <MapContainer center={position} zoom={12} style={{ height: '100%', width: '100%' }}>
          {/* Dark themed map tiles */}
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          />
          
          {hotspots.map(spot => (
            <CircleMarker
              key={spot.id}
              center={spot.pos}
              pathOptions={{ 
                color: spot.type === 'Live Alert' ? '#ff0055' : (spot.intensity > 0.7 ? '#ff0055' : '#ff9900'), 
                fillColor: spot.type === 'Live Alert' ? '#ff0055' : (spot.intensity > 0.7 ? '#ff0055' : '#ff9900'), 
                fillOpacity: 0.6 
              }}
              radius={spot.intensity * 20}
            >
              <Popup>
                <div style={{ color: '#333' }}>
                  <strong>{spot.type}</strong><br/>
                  Location: {spot.label}<br/>
                  Intensity: {Math.round(spot.intensity * 100)}%
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Geospatial;
