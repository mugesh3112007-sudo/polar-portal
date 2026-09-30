import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Expeditions() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get('/api/expeditions').then(res => setData(res.data));
  }, []);
  return (
    <section style={{ padding: 24 }}>
      <h2>Expeditions</h2>
      <ul>
        {data.map(e => (
          <li key={e._id}>
            <strong>{e.title}</strong> <span>({e.date?.slice(0,10)})</span>
            <div>{e.description}</div>
            {e.reportFile && <a href={'/uploads/' + e.reportFile} target="_blank" rel="noreferrer">Report</a>}
            {e.photos && e.photos.length > 0 && (
              <div>Photos: {e.photos.map(f => <img key={f} src={'/uploads/' + f} alt="" width={80} style={{margin:2}} />)}</div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
