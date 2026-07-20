import './Community.css';
import React, { useState } from 'react';

export default function Community() {
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [postInput, setPostInput] = useState('');
  const [posts, setPosts] = useState([]);

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  const handlePost = () => {
    if (!postInput.trim()) return;
    setPosts([{ text: postInput, time: 'Just now' }, ...posts]);
    setPostInput('');
  };

  const faqs = [
    {
      q: "What should I do if I face harassment on campus?",
      a: "Immediately contact the Internal Complaints Committee (ICC) at icc@nitp.ac.in or call the campus security. You can also file a complaint with the Women Helpline at 181. SecureShe provides one-click access to all these resources through our helpline page. Your identity will be kept confidential."
    },
    {
      q: "How do I access mental health support on campus?",
      a: "NIT Patna has a counseling center available for all students. You can also reach out to the Vandrevala Foundation (1860-2662-345) for 24/7 multilingual mental health support. Check our helpline directory for more resources."
    },
    {
      q: "What are the safe zones on campus during late hours?",
      a: "The girls' hostel area, library (till 11 PM), main gate area, and academic blocks with security cameras are considered safe zones. Avoid isolated areas after dark."
    }
  ];

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <div className="community-hero" style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1>👥 Campus <span className="gradient-text">Community</span></h1>
        <p>Connect with women from your college, access important contacts, and stay updated on events.</p>
      </div>

      <div className="college-selector card" style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2>🏫 National Institute of Technology, Patna</h2>
        <span className="badge badge-success" style={{ marginTop: '0.5rem' }}>Active</span>
      </div>

      <div className="outreach-section" style={{ marginBottom: '3rem' }}>
        <h2 style={{ marginBottom: '1.5rem' }}>📋 Outreach Contacts</h2>
        <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
          <div className="contact-card card">
            <h4 style={{ color: 'var(--clr-primary-light)' }}>Prof. Samrat Mukherjee</h4>
            <div className="role" style={{ fontSize: '0.9rem', color: 'var(--clr-text-secondary)' }}>Dean Student Welfare</div>
            <div className="email" style={{ marginTop: '0.5rem' }}>📧 dsw@nitp.ac.in</div>
          </div>
          <div className="contact-card card">
            <h4 style={{ color: 'var(--clr-primary-light)' }}>Campus Security</h4>
            <div className="role" style={{ fontSize: '0.9rem', color: 'var(--clr-text-secondary)' }}>24/7 Security Office</div>
            <div className="email" style={{ marginTop: '0.5rem' }}>📞 0612-2371715</div>
          </div>
          <div className="contact-card card">
            <h4 style={{ color: 'var(--clr-primary-light)' }}>Internal Complaints Committee</h4>
            <div className="role" style={{ fontSize: '0.9rem', color: 'var(--clr-text-secondary)' }}>Sexual Harassment Prevention</div>
            <div className="email" style={{ marginTop: '0.5rem' }}>📧 icc@nitp.ac.in</div>
          </div>
        </div>
      </div>

      <div className="faq-section" style={{ marginBottom: '3rem' }}>
        <h2 style={{ marginBottom: '1.5rem' }}>❓ Frequently Asked Questions</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {faqs.map((faq, idx) => (
            <div key={idx} className={`faq-item card ${activeFAQ === idx ? 'open' : ''}`} style={{ padding: '1.5rem', cursor: 'pointer' }} onClick={() => toggleFAQ(idx)}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                {faq.q}
                <span>{activeFAQ === idx ? '▲' : '▼'}</span>
              </div>
              {activeFAQ === idx && (
                <div style={{ marginTop: '1rem', color: 'var(--clr-text-secondary)', fontSize: '0.95rem' }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="community-feed card">
        <h2 style={{ marginBottom: '1.5rem' }}>📢 Community Announcements</h2>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          <input 
            type="text" 
            className="form-input" 
            placeholder="Share something with the community..." 
            value={postInput}
            onChange={(e) => setPostInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handlePost()}
          />
          <button className="btn btn-primary" onClick={handlePost}>Post</button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {posts.map((post, i) => (
            <div key={i} className="card-glass" style={{ padding: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <strong>You</strong> <span style={{ fontSize: '0.8rem', color: 'var(--clr-text-muted)' }}>{post.time}</span>
              </div>
              <p>{post.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

