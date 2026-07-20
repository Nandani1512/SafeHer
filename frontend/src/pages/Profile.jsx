import './Profile.css';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db, firebaseSignOut, ref, get, update, updateProfile } from '../services/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { Edit2, Phone, MessageCircle, Users, Map, CheckCircle, Activity, Link as LinkIcon } from 'lucide-react';

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [editCollege, setEditCollege] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        navigate('/signin');
        return;
      }
      setUser(currentUser);
      setEditName(currentUser.displayName || '');
      
      try {
        const snapshot = await get(ref(db, 'users/' + currentUser.uid));
        if (snapshot.exists()) {
          const data = snapshot.val();
          setUserData(data);
          setEditCollege(data.college || '');
          if (data.name) setEditName(data.name);
        }
      } catch (err) {
        console.warn('Could not load profile from db:', err);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    await firebaseSignOut(auth);
    navigate('/');
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    try {
      await updateProfile(user, { displayName: editName });
      await update(ref(db, 'users/' + user.uid), { name: editName, college: editCollege });
      
      setUserData(prev => ({ ...prev, name: editName, college: editCollege }));
      setIsEditing(false);
      alert('Profile updated successfully!'); // Replace with toast later
    } catch (err) {
      alert('Failed to update profile');
    }
  };

  if (!user) return <div className="container" style={{ padding: '2rem 0', textAlign: 'center' }}>Loading...</div>;

  const displayName = userData?.name || user.displayName || 'User';
  const displayAvatar = displayName.charAt(0).toUpperCase();

  return (
    <div className="container container-md" style={{ padding: '2rem 0' }}>
      <div className="profile-header card-glow" style={{ display: 'flex', alignItems: 'center', gap: '2rem', padding: '2rem', marginBottom: '2rem', background: 'var(--clr-surface)', borderRadius: 'var(--radius-lg)' }}>
        <div className="profile-avatar-lg" style={{ 
          width: '80px', height: '80px', borderRadius: '50%', background: 'var(--clr-primary)', 
          color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', fontWeight: 'bold' 
        }}>
          {displayAvatar}
        </div>
        <div className="profile-info">
          <h1 style={{ marginBottom: '0.25rem' }}>{displayName}</h1>
          <div className="email" style={{ color: 'var(--clr-text-secondary)', marginBottom: '0.25rem' }}>{user.email}</div>
          <div className="college" style={{ color: 'var(--clr-primary-light)', fontWeight: '600', marginBottom: '0.25rem' }}>
            {userData?.college || 'College not set'}
          </div>
          <div className="member-since" style={{ fontSize: '0.9rem', color: 'var(--clr-text-muted)' }}>
            Member since {userData?.createdAt ? new Date(userData.createdAt).toLocaleDateString() : '—'}
          </div>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button className="btn btn-ghost btn-sm" onClick={() => setIsEditing(!isEditing)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Edit2 size={16} /> Edit Profile</button>
            <button className="btn btn-ghost btn-sm" onClick={handleSignOut} style={{ borderColor: 'rgba(248,113,113,0.3)', color: 'var(--clr-danger)' }}>Sign Out</button>
          </div>
        </div>
      </div>

      <div className="profile-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {isEditing && (
          <div className="profile-section card">
            <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Edit2 size={20} /> Edit Profile</h2>
            <form onSubmit={handleEditSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input type="text" className="form-input" value={editName} onChange={e => setEditName(e.target.value)} placeholder="Your full name" />
              </div>
              <div className="form-group">
                <label className="form-label">College</label>
                <input type="text" className="form-input" value={editCollege} onChange={e => setEditCollege(e.target.value)} placeholder="e.g., NIT Patna" />
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button type="submit" className="btn btn-primary btn-sm">Save Changes</button>
                <button type="button" className="btn btn-ghost btn-sm" onClick={() => setIsEditing(false)}>Cancel</button>
              </div>
            </form>
          </div>
        )}

        <div className="profile-section card">
          <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><LinkIcon size={20} /> Quick Links</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Link to="/helpline" className="activity-item" style={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none', color: 'inherit' }}>
              <div className="activity-icon" style={{ background: 'var(--clr-surface-light)', padding: '0.5rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Phone size={16} /></div>
              <span style={{ flex: 1 }}>Helpline Directory</span>
              <span style={{ color: 'var(--clr-text-muted)' }}>→</span>
            </Link>
            <Link to="/forum" className="activity-item" style={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none', color: 'inherit' }}>
              <div className="activity-icon" style={{ background: 'var(--clr-surface-light)', padding: '0.5rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><MessageCircle size={16} /></div>
              <span style={{ flex: 1 }}>Forum</span>
              <span style={{ color: 'var(--clr-text-muted)' }}>→</span>
            </Link>
            <Link to="/community" className="activity-item" style={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none', color: 'inherit' }}>
              <div className="activity-icon" style={{ background: 'var(--clr-surface-light)', padding: '0.5rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Users size={16} /></div>
              <span style={{ flex: 1 }}>Community</span>
              <span style={{ color: 'var(--clr-text-muted)' }}>→</span>
            </Link>
            <Link to="/map" className="activity-item" style={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none', color: 'inherit' }}>
              <div className="activity-icon" style={{ background: 'var(--clr-surface-light)', padding: '0.5rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Map size={16} /></div>
              <span style={{ flex: 1 }}>Safety Map</span>
              <span style={{ color: 'var(--clr-text-muted)' }}>→</span>
            </Link>
          </div>
        </div>

        <div className="profile-section card">
          <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Activity size={20} /> Activity</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="activity-item" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div className="activity-icon" style={{ background: 'var(--clr-surface-light)', padding: '0.5rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><CheckCircle size={16} /></div>
              <span style={{ flex: 1 }}>Joined SecureShe</span>
              <span style={{ color: 'var(--clr-text-muted)', fontSize: '0.9rem' }}>{userData?.createdAt ? new Date(userData.createdAt).toLocaleDateString() : '—'}</span>
            </div>
            <div className="activity-item" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div className="activity-icon" style={{ background: 'var(--clr-surface-light)', padding: '0.5rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Phone size={16} /></div>
              <span style={{ flex: 1 }}>Helpline accessed</span>
              <span style={{ color: 'var(--clr-text-muted)', fontSize: '0.9rem' }}>Today</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

