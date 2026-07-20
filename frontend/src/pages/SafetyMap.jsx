import React from 'react';
import { Map, AlertTriangle, Moon, Shield, Bus } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './SafetyMap.css';

// Fix for default marker icons in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom markers based on colors
const createCustomIcon = (color) => {
  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
};

const safeIcon = createCustomIcon('green');
const emergencyIcon = createCustomIcon('red');
const securityIcon = createCustomIcon('blue');

export default function SafetyMap() {
  // Coordinates for NIT Patna (approximately)
  const center = [25.6206, 85.1722];

  const locations = [
    { id: 1, pos: [25.6210, 85.1725], type: 'safe', label: 'Main Library (Safe Zone)', desc: 'Well lit, 24/7 security present.' },
    { id: 2, pos: [25.6200, 85.1710], type: 'safe', label: 'Girls Hostel Gate', desc: 'Secure entry point.' },
    { id: 3, pos: [25.6215, 85.1730], type: 'security', label: 'Main Security Checkpoint', desc: 'Campus security main office.' },
    { id: 4, pos: [25.6190, 85.1740], type: 'emergency', label: 'Medical Center', desc: 'Campus clinic and emergency services.' },
  ];

  return (
    <div className="safety-map-container container">
      <div className="safety-header">
        <h1 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: 'var(--fs-3xl)' }}>
          <Map size={32} color="var(--clr-primary)" /> Campus <span className="gradient-text">Safety Map</span>
        </h1>
        <p style={{ color: 'var(--clr-text-secondary)', marginTop: '0.5rem' }}>Navigate safely with real-time information about safe zones and emergency locations.</p>
      </div>

      <div className="map-card" style={{ padding: '0', overflow: 'hidden', border: '1px solid var(--clr-border)', background: 'var(--clr-surface)', borderRadius: 'var(--radius-xl)' }}>
        <div style={{ height: '500px', width: '100%', position: 'relative' }}>
          <MapContainer center={center} zoom={16} style={{ height: '100%', width: '100%', zIndex: 1 }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {/* Draw a caution area */}
            <Circle center={[25.6225, 85.1700]} radius={50} pathOptions={{ color: 'red', fillColor: 'red', fillOpacity: 0.2 }}>
              <Popup>Caution Area: Construction site, poorly lit at night.</Popup>
            </Circle>

            {locations.map(loc => {
              let icon = safeIcon;
              if (loc.type === 'emergency') icon = emergencyIcon;
              if (loc.type === 'security') icon = securityIcon;

              return (
                <Marker key={loc.id} position={loc.pos} icon={icon}>
                  <Popup>
                    <strong>{loc.label}</strong><br/>
                    <span style={{ fontSize: '0.85rem', color: '#666' }}>{loc.desc}</span>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>
        
        <div className="map-legend" style={{ padding: '1.5rem', background: 'var(--clr-surface)' }}>
          <div className="legend-item"><span className="legend-dot" style={{ background: '#2aad27' }}></span> Safe Zones</div>
          <div className="legend-item"><span className="legend-dot" style={{ background: '#cb2b3e' }}></span> Medical/Emergency</div>
          <div className="legend-item"><span className="legend-dot" style={{ background: '#2a81cb' }}></span> Security Checkpoints</div>
          <div className="legend-item"><span className="legend-dot danger" style={{ background: 'red', opacity: 0.5 }}></span> Caution Areas</div>
        </div>
      </div>

      <div className="procedures-section">
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}><AlertTriangle size={24} /> Emergency Procedures</h2>
        <div className="procedure-grid">
          <div className="procedure-card">
            <div className="step-num">1</div>
            <h4>Stay Calm</h4>
            <p>Take a deep breath and assess your surroundings.</p>
          </div>
          <div className="procedure-card">
            <div className="step-num">2</div>
            <h4>Call for Help</h4>
            <p>Dial 112 (Emergency) or tap your SOS button.</p>
          </div>
          <div className="procedure-card">
            <div className="step-num">3</div>
            <h4>Seek Safety</h4>
            <p>Move to a well-lit, populated area immediately.</p>
          </div>
          <div className="procedure-card">
            <div className="step-num">4</div>
            <h4>Alert Others</h4>
            <p>Draw attention and inform campus security.</p>
          </div>
        </div>
      </div>
      
      <div className="tips-section" style={{ marginTop: '3rem' }}>
        <h2 style={{ marginBottom: '1.5rem' }}>Safety Guidelines</h2>
        <div className="tips-grid">
          <div className="tip-card">
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Moon size={20} /> Night Safety</h3>
            <ul>
              <li>Always walk in well-lit pathways</li>
              <li>Use the buddy system</li>
              <li>Share your live location</li>
            </ul>
          </div>
          <div className="tip-card">
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Shield size={20} /> Digital Safety</h3>
            <ul>
              <li>Don't share location on public social media</li>
              <li>Report cyberbullying immediately</li>
              <li>Enable two-factor authentication</li>
            </ul>
          </div>
          <div className="tip-card">
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Bus size={20} /> Commute Safety</h3>
            <ul>
              <li>Note vehicle numbers before boarding</li>
              <li>Trust your instincts</li>
              <li>Keep emergency contacts on speed dial</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
