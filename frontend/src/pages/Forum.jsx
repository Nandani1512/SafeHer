import './Forum.css';
import React, { useState, useEffect } from 'react';
import { MessageCircle, Shield, Briefcase, Brain, Calendar, Globe, Plus, ArrowUp } from 'lucide-react';

export default function Forum() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [posts, setPosts] = useState([]);
  const [expandedPost, setExpandedPost] = useState(null);
  const [replyContent, setReplyContent] = useState('');

  // Form states
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('general');
  const [content, setContent] = useState('');

  const API_URL = import.meta.env.VITE_API_URL;

  const categories = [
    { id: 'all', label: 'All', icon: <Globe size={16} style={{marginRight: '8px'}} /> },
    { id: 'general', label: 'General', icon: <MessageCircle size={16} style={{marginRight: '8px'}} /> },
    { id: 'safety', label: 'Safety', icon: <Shield size={16} style={{marginRight: '8px'}} /> },
    { id: 'career', label: 'Career', icon: <Briefcase size={16} style={{marginRight: '8px'}} /> },
    { id: 'mental-health', label: 'Mental Health', icon: <Brain size={16} style={{marginRight: '8px'}} /> },
    { id: 'events', label: 'Events', icon: <Calendar size={16} style={{marginRight: '8px'}} /> }
  ];

  const fetchPosts = async () => {
    try {
      const res = await fetch(`${API_URL}/api/forum/posts?sort=${sortBy}`);
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error('Failed to fetch posts', err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [sortBy]);

  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/api/forum/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, category })
      });
      if (res.ok) {
        setIsModalOpen(false);
        setTitle('');
        setContent('');
        setCategory('general');
        fetchPosts();
      }
    } catch (err) {
      console.error('Failed to create post', err);
    }
  };

  const handleUpvote = async (id) => {
    try {
      const res = await fetch(`${API_URL}/api/forum/posts/${id}/upvote`, { method: 'POST' });
      if (res.ok) {
        fetchPosts();
      }
    } catch (err) {
      console.error('Failed to upvote', err);
    }
  };

  const handleReply = async (id) => {
    if (!replyContent.trim()) return;
    try {
      const res = await fetch(`${API_URL}/api/forum/posts/${id}/reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: replyContent })
      });
      if (res.ok) {
        setReplyContent('');
        fetchPosts();
      }
    } catch (err) {
      console.error('Failed to reply', err);
    }
  };

  const filteredPosts = activeTab === 'all' ? posts : posts.filter(p => p.category === activeTab);

  const getCategoryIcon = (catId) => {
    const cat = categories.find(c => c.id === catId);
    return cat ? cat.icon : <MessageCircle size={14} />;
  };

  return (
    <div className="container container-md" style={{ padding: '2rem 0' }}>
      <div className="forum-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1>Women's <span className="gradient-text">Forum</span></h1>
          <p style={{ color: 'var(--clr-text-secondary)', marginTop: '0.5rem' }}>A safe space to share, discuss, and support each other</p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Plus size={20} /> New Post
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
              color: activeTab === cat.id ? 'white' : 'var(--clr-text-secondary)',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            {cat.icon}
            {cat.label}
          </button>
        ))}
      </div>

      <div className="forum-sort" style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '2rem' }}>
        <span style={{ color: 'var(--clr-text-muted)', fontSize: '0.9rem' }}>Sort by:</span>
        {['recent', 'upvotes'].map(sort => (
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
            {sort === 'recent' ? 'Recent' : 'Most Upvoted'}
          </button>
        ))}
      </div>

      <div id="forum-posts" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filteredPosts.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--clr-text-muted)', padding: '2rem' }}>No posts found.</p>
        ) : (
          filteredPosts.map((post) => (
            <div key={post._id} className="card" style={{ transition: 'all 0.3s ease' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span className="badge badge-accent" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', textTransform: 'capitalize' }}>
                  {getCategoryIcon(post.category)} {post.category}
                </span>
                <span style={{ color: 'var(--clr-text-muted)', fontSize: '0.8rem' }}>
                  {new Date(post.createdAt).toLocaleString()}
                </span>
              </div>
              <h3 style={{ marginBottom: '0.5rem', cursor: 'pointer' }} onClick={() => setExpandedPost(expandedPost === post._id ? null : post._id)}>{post.title}</h3>
              <p style={{ color: 'var(--clr-text-secondary)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                {post.content}
              </p>
              <div style={{ display: 'flex', gap: '1rem', color: 'var(--clr-text-muted)', fontSize: '0.9rem' }}>
                <button onClick={() => handleUpvote(post._id)} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>
                  <ArrowUp size={16} color="var(--clr-primary-light)" /> {post.upvotes}
                </button>
                <button onClick={() => setExpandedPost(expandedPost === post._id ? null : post._id)} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>
                  <MessageCircle size={16} /> {post.replies?.length || 0}
                </button>
              </div>

              {expandedPost === post._id && (
                <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--clr-border)' }}>
                  <h4 style={{ marginBottom: '1rem', fontSize: '0.9rem' }}>Replies</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1rem' }}>
                    {post.replies?.length === 0 && <p style={{ fontSize: '0.85rem', color: 'var(--clr-text-muted)' }}>No replies yet. Be the first!</p>}
                    {post.replies?.map((reply, i) => (
                      <div key={i} style={{ background: 'var(--clr-surface-light)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                        <div style={{ fontSize: '0.8rem', color: 'var(--clr-text-muted)', marginBottom: '0.25rem' }}>{reply.author} • {new Date(reply.createdAt).toLocaleDateString()}</div>
                        <p style={{ fontSize: '0.9rem' }}>{reply.content}</p>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="Write a reply..." 
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      style={{ flex: 1, padding: '0.5rem 1rem' }}
                    />
                    <button className="btn btn-primary btn-sm" onClick={() => handleReply(post._id)}>Reply</button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <>
          <div className="modal-backdrop active" onClick={() => setIsModalOpen(false)}></div>
          <div className="modal active">
            <div className="modal-header">
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Plus size={20} /> Create New Post</h3>
              <button className="modal-close" onClick={() => setIsModalOpen(false)}>&times;</button>
            </div>
            <form className="new-post-form" onSubmit={handleCreatePost}>
              <div className="form-group">
                <label className="form-label">Title</label>
                <input type="text" className="form-input" placeholder="What's on your mind?" value={title} onChange={e => setTitle(e.target.value)} required />
              </div>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select className="form-input" value={category} onChange={e => setCategory(e.target.value)} required>
                  <option value="general">General</option>
                  <option value="safety">Safety</option>
                  <option value="career">Career</option>
                  <option value="mental-health">Mental Health</option>
                  <option value="events">Events</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Content</label>
                <textarea className="form-input" placeholder="Share your thoughts, experiences, or questions..." value={content} onChange={e => setContent(e.target.value)} required rows="6"></textarea>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Publish Post</button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}

