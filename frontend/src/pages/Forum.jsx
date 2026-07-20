import './Forum.css';
import React, { useState } from 'react';

export default function Forum() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [sortBy, setSortBy] = useState('recent');

  const categories = [
    { id: 'all', label: '🌐 All' },
    { id: 'general', label: '💬 General' },
    { id: 'safety', label: '🛡️ Safety' },
    { id: 'career', label: '💼 Career' },
    { id: 'mental-health', label: '🧠 Mental Health' },
    { id: 'events', label: '📅 Events' }
  ];

  return (
    <div className="container container-md" style={{ padding: '2rem 0' }}>
      <div className="forum-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1>💬 Women's <span className="gradient-text">Forum</span></h1>
          <p style={{ color: 'var(--clr-text-secondary)', marginTop: '0.5rem' }}>A safe space to share, discuss, and support each other</p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          ✍️ New Post
        </button>
      </div>

      <div className="forum-categories" style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {categories.map(cat => (
          <button 
            key={cat.id} 
            className={`badge ${activeTab === cat.id ? 'badge-primary' : ''}`}
            onClick={() => setActiveTab(cat.id)}
            style={{ 
              padding: '0.5rem 1rem', 
              cursor: 'pointer', 
              border: '1px solid var(--clr-border)',
              background: activeTab === cat.id ? 'var(--clr-primary)' : 'transparent',
              color: activeTab === cat.id ? 'white' : 'var(--clr-text-secondary)'
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="forum-sort" style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '2rem' }}>
        <span style={{ color: 'var(--clr-text-muted)', fontSize: '0.9rem' }}>Sort by:</span>
        {['recent', 'upvotes', 'comments'].map(sort => (
          <button 
            key={sort}
            onClick={() => setSortBy(sort)}
            style={{ 
              background: 'none', 
              border: 'none', 
              color: sortBy === sort ? 'var(--clr-primary-light)' : 'var(--clr-text-secondary)',
              cursor: 'pointer',
              fontWeight: sortBy === sort ? '600' : '400'
            }}
          >
            {sort === 'recent' ? '🕐 Recent' : sort === 'upvotes' ? '🔥 Most Upvoted' : '💬 Most Commented'}
          </button>
        ))}
      </div>

      <div id="forum-posts" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <span className="badge badge-accent">🛡️ Safety</span>
            <span style={{ color: 'var(--clr-text-muted)', fontSize: '0.8rem' }}>2 hours ago</span>
          </div>
          <h3 style={{ marginBottom: '0.5rem' }}>Safety walk group for late night library study?</h3>
          <p style={{ color: 'var(--clr-text-secondary)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
            Hi everyone, I usually study at the central library till 11 PM. Is there any existing group that walks back to the girls' hostel together?
          </p>
          <div style={{ display: 'flex', gap: '1rem', color: 'var(--clr-text-muted)', fontSize: '0.9rem' }}>
            <span>⬆️ 24 Upvotes</span>
            <span>💬 8 Comments</span>
          </div>
        </div>
        
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <span className="badge badge-primary">💼 Career</span>
            <span style={{ color: 'var(--clr-text-muted)', fontSize: '0.8rem' }}>5 hours ago</span>
          </div>
          <h3 style={{ marginBottom: '0.5rem' }}>Grace Hopper Celebration 2024 Scholarships</h3>
          <p style={{ color: 'var(--clr-text-secondary)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
            Just a reminder that the student scholarship applications for GHC 2024 are opening next week. I attended last year, happy to review essays!
          </p>
          <div style={{ display: 'flex', gap: '1rem', color: 'var(--clr-text-muted)', fontSize: '0.9rem' }}>
            <span>⬆️ 56 Upvotes</span>
            <span>💬 12 Comments</span>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <>
          <div className="modal-backdrop active" onClick={() => setIsModalOpen(false)}></div>
          <div className="modal active">
            <div className="modal-header">
              <h3>✍️ Create New Post</h3>
              <button className="modal-close" onClick={() => setIsModalOpen(false)}>&times;</button>
            </div>
            <form className="new-post-form" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
              <div className="form-group">
                <label className="form-label">Title</label>
                <input type="text" className="form-input" placeholder="What's on your mind?" required />
              </div>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select className="form-input" required>
                  <option value="general">💬 General</option>
                  <option value="safety">🛡️ Safety</option>
                  <option value="career">💼 Career</option>
                  <option value="mental-health">🧠 Mental Health</option>
                  <option value="events">📅 Events</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Content</label>
                <textarea className="form-input" placeholder="Share your thoughts, experiences, or questions..." required rows="6"></textarea>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Publish Post</button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}

