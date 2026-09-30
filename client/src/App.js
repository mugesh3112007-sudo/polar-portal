import React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
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

export default function App() {
  return (
    <AuthProvider>
      <nav style={{ display: 'flex', gap: 12, padding: 12, background: '#e9f1fd' }}>
        <Link to="/">Home</Link>
        <Link to="/expeditions">Expeditions</Link>
        <Link to="/datasets">Datasets</Link>
        <Link to="/publications">Publications</Link>
        <Link to="/media">Media</Link>
        <Link to="/activities">Activities</Link>
        <Link to="/admin">Admin</Link>
      </nav>
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
