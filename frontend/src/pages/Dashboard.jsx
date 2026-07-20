import './Dashboard.css';
import React from 'react';
import { Link } from 'react-router-dom';
import SOSButton from '../components/SOSButton';

export default function Dashboard() {
  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <div className="section-header" style={{ textAlign: 'left', marginBottom: '2rem' }}>
        <h2>Welcome to your Dashboard</h2>
        <p>Your centralized hub for campus safety.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {/* Quick SOS Action */}
        <div className="card card-glow" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <h3 style={{ marginBottom: '1rem' }}>Emergency SOS</h3>
          <p style={{ color: 'var(--clr-text-secondary)', marginBottom: '2rem' }}>
            Instantly alert your trusted contacts and broadcast your live location.
          </p>
          <SOSButton />
        </div>

        {/* Quick Links */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>Quick Actions</h3>
          <Link to="/map" className="btn btn-secondary">🗺️ View Safety Map</Link>
          <Link to="/helpline" className="btn btn-secondary">🤖 Ask AI Assistant</Link>
          <Link to="/community" className="btn btn-secondary">👥 Community Hub</Link>
          <Link to="/profile" className="btn btn-ghost">⚙️ Manage Profile</Link>
        </div>
      </div>
    </div>
  );
}

