import React, { useEffect, useState } from 'react';
import api from '../util/api';

const BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export default function MediaGallery() {
  const [data, setData] = useState([]);
  useEffect(() => { api.get('/api/media').then(res => setData(res.data)); }, []);
  return (
    <section style={{ padding: 24 }}>
      <h2>Media Gallery</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
        {data.map(item => item.type === 'photo' ? (
          <div key={item._id} style={{ textAlign: 'center' }}>
            <img src={`${BASE}/uploads/${item.url}`} alt={item.caption} title={item.caption} width={140} style={{ border: '1px solid #ddd' }} />
            <div style={{ fontSize: 12 }}>{item.caption}</div>
          </div>
        ) : (
          <div key={item._id} style={{ textAlign: 'center' }}>
            <video src={`${BASE}/uploads/${item.url}`} width={180} controls title={item.caption} />
            <div style={{ fontSize: 12 }}>{item.caption}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
