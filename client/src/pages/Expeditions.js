import React, { useEffect, useState } from 'react';
import api from '../util/api';

const getFileUrl = (url) => url.startsWith('http') ? url : `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/uploads/${url}`;

export default function Expeditions() {

  const [data, setData] = useState([]);
  useEffect(() => {
    api.get('/api/expeditions').then(res => setData(res.data));
  }, []);
  return (
    <section style={{ padding: 24 }}>
      <h2>Expeditions</h2>
      <ul>
        {data.map(e => (
          <li key={e._id} style={{ marginBottom: 16 }}>
            <strong>{e.title}</strong> <span>({e.date?.slice(0, 10)})</span>
            <div>{e.description}</div>
            {e.sourceUrl && <div style={{ marginTop: 6 }}><a href={e.sourceUrl} target="_blank" rel="noreferrer">Official source: {e.sourceName || e.sourceUrl} ↗</a></div>}
            {e.reportFile && (
              <a href={getFileUrl(e.reportFile)} target="_blank" rel="noreferrer">📄 Report</a>
            )}
            {e.photos && e.photos.length > 0 && (
              <div>
                {e.photos.map(f => (
                  <img key={f} src={getFileUrl(f)} alt="" width={80} style={{ margin: 2 }} />
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
