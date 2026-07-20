import React, { useState } from 'react';
import { Phone, AlertTriangle, User, Shield, Ambulance } from 'lucide-react';

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
        <h1 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: 'var(--fs-3xl)' }}><Phone size={32} color="var(--clr-primary)" /> Emergency <span className="gradient-text">Helplines</span></h1>
        <p style={{ color: 'var(--clr-text-secondary)', marginTop: '0.5rem' }}>One tap to call. Immediate assistance.</p>
      </div>

      <div className="emergency-quick-dial" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
        <a href="tel:112" className="btn btn-danger btn-lg" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', fontSize: '1.2rem', padding: '1.25rem' }}>
          <AlertTriangle size={24} /> 112 — National Emergency
        </a>
        <a href="tel:181" className="btn btn-primary btn-lg" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', fontSize: '1.2rem', padding: '1.25rem' }}>
          <User size={24} /> 181 — Women Helpline
        </a>
        <a href="tel:1091" className="btn btn-secondary btn-lg" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', fontSize: '1.2rem', padding: '1.25rem' }}>
          <Shield size={24} /> 1091 — Police
        </a>
        <a href="tel:102" className="btn btn-secondary btn-lg" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', fontSize: '1.2rem', padding: '1.25rem' }}>
          <Ambulance size={24} /> 102 — Ambulance
        </a>
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

      <div className="helpline-cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
        {filteredHelplines.map((h, i) => (
          <a key={i} href={`tel:${h.number}`} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', textDecoration: 'none', color: 'inherit', transition: 'transform 0.2s', border: '1px solid var(--clr-border)' }}>
            <div>
              <h3 style={{ marginBottom: '0.25rem', fontSize: '1rem', color: 'var(--clr-text)' }}>{h.name}</h3>
              <span style={{ fontSize: '0.8rem', color: 'var(--clr-text-secondary)' }}>{h.category}</span>
            </div>
            <div style={{ background: 'var(--clr-surface-light)', padding: '0.75rem', borderRadius: '50%', color: 'var(--clr-primary)' }}>
              <Phone size={20} />
            </div>
          </a>
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
