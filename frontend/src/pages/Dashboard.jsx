import './Dashboard.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SOSButton from '../components/SOSButton';
import { Map, Bot, Users, UserCog, AlertTriangle, ShieldCheck, Info } from 'lucide-react';
import { auth } from '../services/firebase';

export default function Dashboard() {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Attempt to get user's name from Firebase Auth
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName || user.email?.split('@')[0] || '');
      }
    });
    return () => unsubscribe();
  }, []);

  // Placeholder alerts to make the dashboard look active
  const recentAlerts = [
    { id: 1, type: 'warning', icon: <AlertTriangle size={20} />, title: 'Campus Security Alert', desc: 'Avoid the north parking lot due to reported suspicious activity.', time: '10 mins ago' },
    { id: 2, type: 'safe', icon: <ShieldCheck size={20} />, title: 'Safe Walk Complete', desc: 'Sarah has safely reached her dorm building.', time: '1 hr ago' },
    { id: 3, type: 'info', icon: <Info size={20} />, title: 'New Safety Feature', desc: 'Check out our updated AI assistant for faster emergency routing.', time: '3 hrs ago' },
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome back{userName ? `, ${userName}` : ''}</h1>
        <p>Your centralized hub for campus safety.</p>
      </div>

      <div className="bento-grid">
        
        {/* SOS Card */}
        <div className="bento-card card-sos">
          <h3>Emergency SOS</h3>
          <p>Instantly alert contacts & share live location.</p>
          <div className="sos-container">
            <SOSButton />
          </div>
        </div>

        {/* Safety Status Card */}
        <div className="bento-card card-status">
          <div className="status-header">
            <div className="status-dot"></div>
            <h3>System Status: Online</h3>
          </div>
          
          <div className="status-stat">
            <span>Trusted Contacts</span>
            <span>3 Active</span>
          </div>
          
          <div className="status-stat">
            <span>Location Services</span>
            <span>Enabled</span>
          </div>

          <div className="status-stat" style={{ marginBottom: 0 }}>
            <span>Campus Threat Level</span>
            <span style={{ color: '#34d399' }}>Low</span>
          </div>
        </div>

        {/* Quick Links Card */}
        <div className="bento-card card-links">
          <h3>Quick Actions</h3>
          
          <Link to="/map" className="link-btn">
            <div className="link-icon"><Map size={20} /></div>
            Live Safety Map
          </Link>
          
          <Link to="/helpline" className="link-btn">
            <div className="link-icon"><Bot size={20} /></div>
            Ask AI Assistant
          </Link>
          
          <Link to="/community" className="link-btn">
            <div className="link-icon"><Users size={20} /></div>
            Community Forum
          </Link>
        </div>

        {/* Recent Community Alerts */}
        <div className="bento-card card-feed">
          <div className="feed-header">
            <h3>Recent Community Activity</h3>
            <Link to="/community" style={{ color: 'var(--clr-primary)', fontSize: 'var(--fs-sm)', textDecoration: 'none' }}>View All →</Link>
          </div>
          
          <div className="feed-list">
            {recentAlerts.map(alert => (
              <div key={alert.id} className="alert-item">
                <div className={`alert-icon ${alert.type}`}>
                  {alert.icon}
                </div>
                <div className="alert-content">
                  <h4>{alert.title}</h4>
                  <p>{alert.desc}</p>
                </div>
                <div className="alert-time">{alert.time}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
