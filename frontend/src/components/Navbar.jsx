import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { auth } from '../services/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="navbar" id="main-navbar" role="navigation" aria-label="Main navigation">
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem' }}>
        
        <Link to="/" className="navbar-brand" aria-label="SecureShe Home" onClick={closeMenu}>
          {/* We assume assets/logo.png is available in public folder or imported, fallback to emoji if missing */}
          <span style={{ fontSize: '1.5rem' }}>🌸</span>
          <span>SecureShe</span>
        </Link>

        <div className={`navbar-nav ${isOpen ? 'open' : ''}`} id="navbar-nav">
          <Link to="/" className={`nav-link ${isActive('/')}`} onClick={closeMenu}>Home</Link>
          {user && <Link to="/dashboard" className={`nav-link ${isActive('/dashboard')}`} onClick={closeMenu}>Dashboard</Link>}
          <Link to="/directory" className={`nav-link ${isActive('/directory')}`} onClick={closeMenu}>Helplines</Link>
          <Link to="/forum" className={`nav-link ${isActive('/forum')}`} onClick={closeMenu}>Forum</Link>
          <Link to="/community" className={`nav-link ${isActive('/community')}`} onClick={closeMenu}>Community</Link>
          <Link to="/map" className={`nav-link ${isActive('/map')}`} onClick={closeMenu}>Safety Map</Link>
          <Link to="/helpline" className={`nav-link ${isActive('/helpline')}`} onClick={closeMenu}>AI ChatBot</Link>
        </div>

        <div className="navbar-actions">
          {user ? (
            <Link to="/profile" className="btn btn-ghost btn-sm" onClick={closeMenu}>
              Profile
            </Link>
          ) : (
            <Link to="/signin" className="btn btn-primary btn-sm" onClick={closeMenu}>
              Sign In
            </Link>
          )}
          
          <button 
            className={`navbar-toggle ${isOpen ? 'active' : ''}`} 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu" 
            aria-expanded={isOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  );
}
