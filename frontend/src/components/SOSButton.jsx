import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import './SOSButton.css';

// Socket setup for real-time SOS broadcasting
const socket = io(import.meta.env.VITE_API_URL);

export default function SOSButton() {
  const [isActive, setIsActive] = useState(false);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    // Get user location on mount if possible
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => console.error("Error getting location", error)
      );
    }
  }, []);

  const triggerSOS = () => {
    setIsActive(true);
    
    socket.emit('trigger-sos', { location });
    
    // Simulate stopping SOS after 10 seconds for demo
    setTimeout(() => setIsActive(false), 10000);
  };

  return (
    <div className="sos-container">
      <button 
        className={`sos-btn ${isActive ? 'active' : ''}`}
        onClick={triggerSOS}
        disabled={isActive}
      >
        <div className="sos-text">
          {isActive ? 'ALERT SENT' : 'SOS'}
        </div>
        <div className="ripple"></div>
      </button>
      {isActive && (
        <p className="sos-status">
          Broadcasting your location to emergency contacts...
        </p>
      )}
    </div>
  );
}
