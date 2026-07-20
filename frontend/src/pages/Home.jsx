import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { Link } from 'react-router-dom';
import { Phone, Map, Bot, Shield, AlertTriangle } from 'lucide-react';
import SOSButton from '../components/SOSButton';
import './Home.css';

const socket = io(import.meta.env.VITE_API_URL);

export default function Home() {
  const [serverStatus, setServerStatus] = useState('Connecting to secure server...');

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/status`)
      .then(res => res.json())
      .then(data => setServerStatus(data.message))
      .catch(err => setServerStatus('Backend server offline'));
      
    socket.on('connect', () => console.log('Connected to socket.io'));
  }, []);

  return (
    <div className="home-container">
      <main>
        {/* Hero Section */}
        <section className="hero" id="hero">
          <div className="hero-float" style={{ opacity: 0.1 }}><Shield size={64} /></div>
          <div className="hero-float" style={{ opacity: 0.1 }}><AlertTriangle size={64} /></div>
          <div className="hero-float" style={{ opacity: 0.1 }}><Phone size={64} /></div>
          <div className="hero-float" style={{ opacity: 0.1 }}><Map size={64} /></div>

          <div className="container">
            <div className="hero-content">

              <h1>
                Your Safety Is Our
                <span className="gradient-text"> Top Priority</span>
              </h1>

              <div className="hero-tagline">
                <span>Secure.</span>
                <span className="dot"></span>
                <span>Empower.</span>
                <span className="dot"></span>
                <span>Thrive.</span>
              </div>

              <p className="hero-description">
                A comprehensive safety hub designed for women in academic institutions.
                Access emergency helplines, connect with your campus community,
                and stay informed with real-time safety resources — all in one place.
              </p>

              <div className="hero-actions" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
                <SOSButton />
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                  <Link to="/map" className="btn btn-primary btn-lg">
                    Explore Safety Map
                  </Link>
                  <Link to="/helpline" className="btn btn-ghost btn-lg" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Bot size={20} /> Access AI Helpline
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="stats-section">
          <div className="container">
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-value">50+</div>
                <div className="stat-label">Helpline Numbers</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">24/7</div>
                <div className="stat-label">AI ChatBot Support</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">100%</div>
                <div className="stat-label">Free to Use</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">Live</div>
                <div className="stat-label">SOS Tracking</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="section" id="features">
          <div className="container">
            <div className="section-header">
              <h2>Everything You Need to Stay Safe</h2>
              <p>Comprehensive tools and resources designed specifically for women's safety on campus and beyond.</p>
            </div>

            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon red"><Phone size={32} /></div>
                <h3>Helpline Directory</h3>
                <p>Complete database of emergency helplines categorized by type. One-click calling.</p>
                <Link to="/helpline" className="btn btn-ghost btn-sm">Access Helplines →</Link>
              </div>

              <div className="feature-card">
                <div className="feature-icon green"><Map size={32} /></div>
                <h3>Safety Map</h3>
                <p>Interactive maps showing safe zones, emergency exits, security checkpoints, and nearby hospitals.</p>
                <Link to="/map" className="btn btn-ghost btn-sm">View Map →</Link>
              </div>

              <div className="feature-card">
                <div className="feature-icon blue"><Bot size={32} /></div>
                <h3>AI ChatBot</h3>
                <p>24/7 AI-powered support for common questions, crisis guidance, and resource retrieval.</p>
                <Link to="/helpline" className="btn btn-ghost btn-sm">Chat Now →</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
