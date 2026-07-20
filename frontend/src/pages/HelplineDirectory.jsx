import React, { useState } from 'react';

export default function HelplineDirectory() {
  const [search, setSearch] = useState('');

  const helplines = [
    { name: 'National Emergency', number: '112', category: 'General' },
    { name: 'Women Helpline', number: '181', category: 'Women' },
    { name: 'Police', number: '1091', category: 'Police' },
    { name: 'Ambulance', number: '102', category: 'Medical' },
    { name: 'Domestic Violence', number: '1091', category: 'Women' },
    { name: 'Cyber Crime', number: '1930', category: 'General' }
  ];

  const filteredHelplines = helplines.filter(h => 
    h.name.toLowerCase().includes(search.toLowerCase()) || 
    h.number.includes(search) ||
    h.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <div className="helpline-hero" style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1>📞 Helpline <span className="gradient-text">Directory</span></h1>
        <p>Comprehensive database of emergency helplines. No login required — access help instantly.</p>
      </div>

      <div className="emergency-quick-dial" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '2rem' }}>
        <span style={{ fontWeight: 'bold' }}>🚨 Quick Emergency:</span>
        <a href="tel:112" className="btn btn-danger btn-sm">📱 112 — Emergency</a>
        <a href="tel:181" className="btn btn-danger btn-sm">👩 181 — Women Helpline</a>
        <a href="tel:1091" className="btn btn-danger btn-sm">👮 1091 — Police</a>
        <a href="tel:102" className="btn btn-danger btn-sm">🏥 102 — Ambulance</a>
      </div>

      <div className="helpline-search-bar" style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <input 
          type="text" 
          className="form-input" 
          placeholder="Search helplines by name, number, or category..." 
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ width: '100%' }}
        />
      </div>

      <div className="helpline-cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {filteredHelplines.map((h, i) => (
          <div key={i} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ marginBottom: '0.25rem' }}>{h.name}</h3>
              <span className="badge badge-primary">{h.category}</span>
            </div>
            <a href={`tel:${h.number}`} className="btn btn-primary" style={{ fontSize: '1.2rem', padding: '0.5rem 1rem' }}>
              📞 {h.number}
            </a>
          </div>
        ))}
      </div>
      
      {filteredHelplines.length === 0 && (
        <div style={{ textAlign: 'center', color: 'var(--clr-text-muted)', marginTop: '2rem' }}>
          No helplines found matching your search.
        </div>
      )}
    </div>
  );
}
