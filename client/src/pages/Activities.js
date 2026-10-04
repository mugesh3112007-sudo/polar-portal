import React, { useEffect, useState } from 'react';
import api from '../util/api';

const getFileUrl = (url) => url.startsWith('http') ? url : `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/uploads/${url}`;

export default function Activities() {
  const [data, setData] = useState([]);
  useEffect(() => { api.get('/api/activities').then(res => setData(res.data)); }, []);
  return (
    <section style={{ padding: 24 }}>
      <h2>Institutional Activities</h2>
      <ul>
        {data.map(a => (
          <li key={a._id} style={{ marginBottom: 16 }}>
            <strong>{a.title}</strong> <span>({a.category})</span> <span>{a.date?.slice(0, 10)}</span>
            <div>{a.description}</div>
            {a.sourceUrl && <div style={{ marginTop: 6 }}><a href={a.sourceUrl} target="_blank" rel="noreferrer">Official source: {a.sourceName || a.sourceUrl} ↗</a></div>}
            {a.attachments && a.attachments.map(f => (
              <a key={f} href={getFileUrl(f)} target="_blank" rel="noreferrer" style={{ marginRight: 8 }}>📎 View Attachment</a>
            ))}
          </li>
        ))}
      </ul>
    </section>
  );
}
