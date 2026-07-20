import './Auth.css';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../services/firebase';
import { ShieldAlert } from 'lucide-react';

export default function Auth({ mode = 'signin' }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/dashboard');
    } catch (err) {
      console.error("Google Auth Error:", err);
      setError(err.message || 'An error occurred during Google authentication.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    try {
      if (mode === 'signin') {
        await signInWithEmailAndPassword(auth, email, password);
        navigate('/dashboard');
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        navigate('/dashboard');
      }
    } catch (err) {
      console.error("Auth Error:", err);
      setError(err.message || 'An error occurred during authentication.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="auth-container" style={{ width: '100%', maxWidth: '400px' }}>
        <div className="auth-card card">
          <div className="auth-header" style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <Link to="/" className="logo" style={{ display: 'inline-block', fontSize: '1.5rem', fontWeight: 'bold' }}>
              SecureShe
            </Link>
            <h1>{mode === 'signin' ? 'Welcome Back' : 'Create Account'}</h1>
            <p>{mode === 'signin' ? 'Sign in to access your safety dashboard' : 'Join the SecureShe community'}</p>
          </div>

          {error && (
            <div className="auth-error" style={{ color: 'var(--clr-danger)', marginBottom: '1rem', textAlign: 'center' }}>
              ⚠ {error}
            </div>
          )}

          <button className="btn btn-secondary" type="button" onClick={handleGoogleSignIn} disabled={loading} style={{ width: '100%', marginBottom: '1.5rem' }}>
            Continue with Google
          </button>

          <div className="auth-divider" style={{ textAlign: 'center', margin: '1rem 0', color: 'var(--clr-text-muted)' }}>or</div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="email">Email Address</label>
              <input 
                type="email" 
                className="form-input" 
                id="email" 
                placeholder="you@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password">Password</label>
              <input 
                type="password" 
                className="form-input" 
                id="password" 
                placeholder="Enter your password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>

            <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }} disabled={loading}>
              {loading ? 'Processing...' : (mode === 'signin' ? 'Sign In' : 'Sign Up')}
            </button>
          </form>

          <div className="auth-footer" style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            {mode === 'signin' ? (
              <p>Don't have an account? <Link to="/signup">Create one</Link></p>
            ) : (
              <p>Already have an account? <Link to="/signin">Sign in</Link></p>
            )}
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <Link to="/helpline" style={{ color: 'var(--clr-text-secondary)', fontSize: 'var(--fs-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            <ShieldAlert size={16} /> Need emergency help? Access helplines without signing in →
          </Link>
        </div>
      </div>
    </div>
  );
}

