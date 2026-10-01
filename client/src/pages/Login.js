import React, { useState } from 'react';
import api from '../util/api';
import { useAuth } from '../util/auth';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (isRegistering) {
        await api.post('/api/auth/register', { email, password });
        setError('');
        alert('Account Created! Please click "Login" to enter.');
        setIsRegistering(false);
      } else {
        const res = await api.post('/api/auth/login', { email, password });
        login(res.data.token, res.data.user);
        navigate('/admin');
      }
    } catch (err) {
      setError(err.response?.data?.message || (isRegistering ? 'Registration failed' : 'Login failed'));
    }
  };

  return (
    <section style={{ padding: 40, maxWidth: 360, margin: '60px auto', background: '#f5f8ff', borderRadius: 12, boxShadow: '0 2px 12px #0001' }}>
      <h2 style={{ textAlign: 'center' }}>🔐 {isRegistering ? 'Register Admin' : 'Admin Login'}</h2>
      <form onSubmit={handleSubmit}>
        <input value={email} type="email" onChange={e => setEmail(e.target.value)} placeholder="Email" required style={{ width: '100%', marginBottom: 12, padding: 8, boxSizing: 'border-box' }} /><br />
        <input value={password} type="password" onChange={e => setPassword(e.target.value)} placeholder="Password" required style={{ width: '100%', marginBottom: 12, padding: 8, boxSizing: 'border-box' }} /><br />
        
        <button type="submit" style={{ width: '100%', padding: 10, background: '#1a3a5c', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', marginBottom: 10 }}>
          {isRegistering ? 'Create Account' : 'Login'}
        </button>
        
        <div style={{ textAlign: 'center', fontSize: 13 }}>
          <button type="button" onClick={() => setIsRegistering(!isRegistering)} style={{ background: 'none', border: 'none', color: '#2e86c1', cursor: 'pointer', textDecoration: 'underline' }}>
            {isRegistering ? 'Already have an account? Login here.' : 'Need to register an admin? Click here.'}
          </button>
        </div>
        {error && <div style={{ color: 'red', marginTop: 12, textAlign: 'center', fontSize: 14 }}>{error}</div>}
      </form>
    </section>
  );
}
