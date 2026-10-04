import React, { useEffect, useState } from 'react';
import api from '../util/api';

const getFileUrl = (url) => url.startsWith('http') ? url : `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/uploads/${url}`;

export default function Publications() {
  const [data, setData] = useState([]);
  useEffect(() => { api.get('/api/publications').then(res => setData(res.data)); }, []);
  return (
    <section style={{ padding: 24 }}>
      <h2>Publications</h2>
      <ul>
        {data.map(pub => (
          <li key={pub._id} style={{ marginBottom: 16 }}>
            <strong>{pub.title}</strong> — <em>{pub.journal}</em>
            <div>{pub.authors && pub.authors.join(', ')}</div>
            <div>{pub.abstract}</div>
            {pub.sourceUrl && <div style={{ marginTop: 6 }}><a href={pub.sourceUrl} target="_blank" rel="noreferrer">Official source: {pub.sourceName || pub.sourceUrl} ↗</a></div>}
            {pub.pdfUrl && (
              <a href={getFileUrl(pub.pdfUrl)} target="_blank" rel="noreferrer">📄 PDF</a>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
