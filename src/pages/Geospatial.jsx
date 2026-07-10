import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './PageStyles.css';

const Geospatial = () => {
  // Mock data for crime hotspots
  const hotspots = [
    { id: 1, pos: [12.9716, 77.5946], intensity: 0.8, type: 'Theft', label: 'Bangalore Central' },
    { id: 2, pos: [12.9352, 77.6245], intensity: 0.5, type: 'Assault', label: 'Koramangala' },
    { id: 3, pos: [13.0068, 77.5813], intensity: 0.9, type: 'Burglary', label: 'Malleswaram' },
    { id: 4, pos: [12.9121, 77.6446], intensity: 0.6, type: 'Vehicle Theft', label: 'HSR Layout' },
  ];

  return (
    <div className="page-container animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Geospatial Intelligence</h1>
        <p className="page-subtitle">Track crime clusters and identify spatiotemporal hotspots in real-time.</p>
      </div>

      <div className="glass-panel map-container">
        <MapContainer center={[12.9716, 77.5946]} zoom={12} style={{ height: '600px', width: '100%', borderRadius: '16px' }} theme="dark">
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          />
          {hotspots.map((spot) => (
            <CircleMarker
              key={spot.id}
              center={spot.pos}
              radius={spot.intensity * 30}
              pathOptions={{ 
                color: spot.intensity > 0.7 ? '#ff0055' : '#ffb800', 
                fillColor: spot.intensity > 0.7 ? '#ff0055' : '#ffb800', 
                fillOpacity: 0.4 
              }}
            >
              <Popup className="custom-popup">
                <strong>{spot.label}</strong><br/>
                Type: {spot.type}<br/>
                Risk Level: {spot.intensity > 0.7 ? 'High' : 'Medium'}
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Geospatial;
