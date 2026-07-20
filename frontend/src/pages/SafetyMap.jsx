import React from 'react';
import './SafetyMap.css';

export default function SafetyMap() {
  return (
    <div className="safety-map-container">
      <div className="safety-header">
        <h1>🗺️ Safety <span className="highlight">Map & Guidelines</span></h1>
        <p>Navigate safely with real-time information about safe zones and emergency locations.</p>
      </div>

      <div className="map-card">
        <div className="map-placeholder">
          <div className="map-icon">🗺️</div>
          <h3>Interactive Campus Safety Map</h3>
          <p>Shows safe zones, emergency exits, security checkpoints, and nearby hospitals.</p>
          <p className="api-note">Map integration requires Google Maps API key.</p>
        </div>
        
        <div className="map-legend">
          <div className="legend-item"><span className="legend-dot safe"></span> Safe Zones</div>
          <div className="legend-item"><span className="legend-dot emergency"></span> Emergency Exits</div>
          <div className="legend-item"><span className="legend-dot security"></span> Security Checkpoints</div>
          <div className="legend-item"><span className="legend-dot hospital"></span> Hospitals / Police</div>
          <div className="legend-item"><span className="legend-dot danger"></span> Caution Areas</div>
        </div>
      </div>

      <div className="procedures-section">
        <h2>🚨 Emergency Procedures</h2>
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
      
      <div className="tips-section">
        <h2>Safety Guidelines</h2>
        <div className="tips-grid">
          <div className="tip-card">
            <h3>🌙 Night Safety</h3>
            <ul>
              <li>Always walk in well-lit pathways</li>
              <li>Use the buddy system</li>
              <li>Share your live location</li>
            </ul>
          </div>
          <div className="tip-card">
            <h3>📱 Digital Safety</h3>
            <ul>
              <li>Don't share location on public social media</li>
              <li>Report cyberbullying immediately</li>
              <li>Enable two-factor authentication</li>
            </ul>
          </div>
          <div className="tip-card">
            <h3>🚌 Commute Safety</h3>
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
