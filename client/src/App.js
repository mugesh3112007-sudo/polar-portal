import React from 'react';
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Expeditions from './pages/Expeditions';
import Datasets from './pages/Datasets';
import Publications from './pages/Publications';
import MediaGallery from './pages/MediaGallery';
import Activities from './pages/Activities';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import { AuthProvider, useAuth } from './util/auth';

function ProtectedRoute({ children }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
}

function Navbar() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <nav style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '12px 24px', background: '#1a3a5c', flexWrap: 'wrap' }}>
      <Link to="/" style={{ color: '#fff', fontWeight: 'bold', fontSize: 18, textDecoration: 'none', marginRight: 16 }}>🧊 Polar Portal</Link>
      {[
        { to: '/expeditions', label: 'Expeditions' },
        { to: '/datasets', label: 'Datasets' },
        { to: '/publications', label: 'Publications' },
        { to: '/media', label: 'Media' },
        { to: '/activities', label: 'Activities' },
      ].map(l => (
        <Link key={l.to} to={l.to} style={{ color: '#cce', textDecoration: 'none', fontSize: 14 }}>{l.label}</Link>
      ))}
      <span style={{ flex: 1 }} />
      {token
        ? <><Link to="/admin" style={{ color: '#ffe', textDecoration: 'none', fontSize: 14 }}>Dashboard</Link>
            <button onClick={handleLogout} style={{ background: '#e74c3c', color: '#fff', border: 'none', borderRadius: 6, padding: '4px 12px', cursor: 'pointer', fontSize: 13 }}>Logout</button></>
        : <Link to="/login" style={{ color: '#ffe', textDecoration: 'none', fontSize: 14 }}>Admin Login</Link>
      }
    </nav>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/expeditions" element={<Expeditions />} />
        <Route path="/datasets" element={<Datasets />} />
        <Route path="/publications" element={<Publications />} />
        <Route path="/media" element={<MediaGallery />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
      </Routes>
    </AuthProvider>
  );
}
