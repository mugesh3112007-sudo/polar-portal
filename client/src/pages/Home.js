import React from 'react';
import { Link } from 'react-router-dom';

const cards = [
  { to: '/expeditions', icon: '🧭', label: 'Expeditions', desc: 'Archive of polar expedition reports and media.' },
  { to: '/datasets', icon: '📊', label: 'Datasets', desc: 'Scientific datasets collected during polar research.' },
  { to: '/publications', icon: '📚', label: 'Publications', desc: 'Research papers and journal articles.' },
  { to: '/media', icon: '🖼️', label: 'Media Gallery', desc: 'Photos and videos from expeditions.' },
  { to: '/activities', icon: '🏛️', label: 'Activities', desc: 'Institutional events, workshops, and news.' },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg,#1a3a5c,#2e86c1)', color: '#fff', padding: '60px 24px', textAlign: 'center' }}>
        <h1 style={{ fontSize: 32, marginBottom: 12 }}>🧊 Polar Science Outreach Portal</h1>
        <p style={{ fontSize: 18, opacity: 0.9 }}>
          Integrated Knowledge Repository & Media Dissemination<br />
          Ministry of Earth Sciences (MoES) | MIC
        </p>
        <Link to="/expeditions" style={{ display: 'inline-block', marginTop: 24, padding: '12px 28px', background: '#fff', color: '#1a3a5c', borderRadius: 8, fontWeight: 'bold', textDecoration: 'none' }}>
          Explore Expeditions →
        </Link>
      </div>

      {/* Cards */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, padding: 32, justifyContent: 'center' }}>
        {cards.map(c => (
          <Link key={c.to} to={c.to} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ width: 200, padding: 20, background: '#f5f8ff', borderRadius: 10, boxShadow: '0 2px 8px #0001', textAlign: 'center', transition: 'transform 0.2s' }}
              onMouseOver={e => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
              <div style={{ fontSize: 40 }}>{c.icon}</div>
              <h3 style={{ margin: '8px 0 4px' }}>{c.label}</h3>
              <p style={{ fontSize: 13, color: '#555' }}>{c.desc}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Footer */}
      <footer style={{ textAlign: 'center', padding: 16, background: '#1a3a5c', color: '#ccc', fontSize: 13 }}>
        © 2024 Polar Science Portal | Ministry of Earth Sciences | MIC | Smart Education
      </footer>
    </div>
  );
}
