import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function MediaGallery() {
  const [data, setData] = useState([]);
  useEffect(() => { axios.get('/api/media').then(res => setData(res.data)); }, []);
  return (
    <section style={{ padding: 24 }}>
      <h2>Media Gallery</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
        {data.map(item => item.type === 'photo' ? (
          <img key={item._id} src={'/uploads/' + item.url} alt={item.caption} title={item.caption} width={140} style={{ border: '1px solid #ddd' }} />
        ) : (
          <video key={item._id} src={'/uploads/' + item.url} width={180} controls title={item.caption} />
        ))}
      </div>
    </section>
  );
}
