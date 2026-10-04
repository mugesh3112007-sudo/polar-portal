import React, { useEffect, useState } from 'react';
import api from '../util/api';

const getFileUrl = (url) => url.startsWith('http') ? url : `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/uploads/${url}`;

export default function Datasets() {
  const [data, setData] = useState([]);
  useEffect(() => {
    api.get('/api/datasets').then(res => setData(res.data));
  }, []);
  return (
    <section style={{ padding: 24 }}>
      <h2>Scientific Datasets</h2>
      <ul>
        {data.map(d => (
          <li key={d._id} style={{ marginBottom: 16 }}>
            <strong>{d.title}</strong>
            <div>{d.description}</div>
            {d.sourceUrl && <div style={{ marginTop: 6 }}><a href={d.sourceUrl} target="_blank" rel="noreferrer">Official source: {d.sourceName || d.sourceUrl} ↗</a></div>}
            {d.datasetFile && (
              <a href={getFileUrl(d.datasetFile)} target="_blank" rel="noreferrer">⬇️ Download</a>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
