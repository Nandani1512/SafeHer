import './Community.css';
import React, { useState } from 'react';
import { Users, Building, FileText, Mail, Phone, HelpCircle, Megaphone, ChevronDown, ChevronUp } from 'lucide-react';

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
    <div className="container" style={{ padding: '2rem 0', maxWidth: '900px' }}>
      <div className="community-hero" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h1 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: 'var(--fs-3xl)' }}>
          <Users size={36} color="var(--clr-primary)" /> Campus <span className="gradient-text">Community</span>
        </h1>
        <p style={{ maxWidth: '500px', margin: '1rem auto 0', color: 'var(--clr-text-secondary)' }}>
          NIT Patna — Connect, stay informed, and access campus resources instantly.
        </p>
      </div>

      <div className="community-grid" style={{ display: 'grid', gap: '2rem' }}>
        
        {/* Quick Contacts */}
        <section className="card" style={{ padding: '2rem' }}>
          <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: 'var(--fs-lg)' }}>
            <FileText size={20} /> Essential Contacts
          </h2>
          <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div className="contact-card-minimal">
              <Mail size={20} color="var(--clr-primary-light)" />
              <div>
                <strong>DSW Office</strong>
                <span>dsw@nitp.ac.in</span>
              </div>
            </div>
            <div className="contact-card-minimal">
              <Phone size={20} color="var(--clr-accent)" />
              <div>
                <strong>Security (24/7)</strong>
                <span>0612-2371715</span>
              </div>
            </div>
            <div className="contact-card-minimal">
              <Mail size={20} color="var(--clr-success)" />
              <div>
                <strong>ICC (Harassment)</strong>
                <span>icc@nitp.ac.in</span>
              </div>
            </div>
          </div>
        </section>

        {/* Live Feed */}
        <section className="card" style={{ padding: '2rem' }}>
          <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: 'var(--fs-lg)' }}>
            <Megaphone size={20} /> Community Announcements
          </h2>
          
          <div className="community-post-input" style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
            <input 
              type="text" 
              className="form-input" 
              placeholder="Share a quick update or event..." 
              value={postInput}
              onChange={(e) => setPostInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handlePost()}
              style={{ flex: 1 }}
            />
            <button className="btn btn-primary" onClick={handlePost}>Post</button>
          </div>
          
          <div className="feed-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {posts.length === 0 ? (
              <p style={{ color: 'var(--clr-text-muted)', textAlign: 'center', padding: '2rem 0' }}>No recent announcements.</p>
            ) : (
              posts.map((post, i) => (
                <div key={i} className="feed-item" style={{ padding: '1.25rem', background: 'var(--clr-surface-light)', borderRadius: 'var(--radius-md)', border: '1px solid var(--clr-border)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <strong style={{ color: 'var(--clr-primary-light)' }}>Student</strong>
                    <span style={{ fontSize: '0.8rem', color: 'var(--clr-text-muted)' }}>{post.time}</span>
                  </div>
                  <p style={{ color: 'var(--clr-text)' }}>{post.text}</p>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Minimal FAQ */}
        <section>
          <h2 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: 'var(--fs-lg)', color: 'var(--clr-text-muted)' }}>
            <HelpCircle size={18} /> Quick Help
          </h2>
          <div className="minimal-faq" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {faqs.map((faq, idx) => (
              <div key={idx} className={`faq-item-minimal ${activeFAQ === idx ? 'open' : ''}`} onClick={() => toggleFAQ(idx)}>
                <div className="faq-q">
                  {faq.q}
                  {activeFAQ === idx ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
                {activeFAQ === idx && <div className="faq-a">{faq.a}</div>}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

