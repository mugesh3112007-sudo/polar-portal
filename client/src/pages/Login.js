import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../util/auth';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      login(res.data.token, res.data.user);
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };
  return (
    <section style={{ padding: 24, maxWidth: 320 }}>
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <input value={email} type="email" onChange={e => setEmail(e.target.value)} placeholder="Email" required /><br/>
        <input value={password} type="password" onChange={e => setPassword(e.target.value)} placeholder="Password" required /><br/>
        <button type="submit">Login</button>
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </form>
    </section>
  );
}
