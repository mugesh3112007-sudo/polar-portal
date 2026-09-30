import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Activities() {
  const [data, setData] = useState([]);
  useEffect(() => { axios.get('/api/activities').then(res => setData(res.data)); }, []);
  return (
    <section style={{ padding: 24 }}>
      <h2>Institutional Activities</h2>
      <ul>
        {data.map(a => (
          <li key={a._id}>
            <strong>{a.title}</strong> <span>({a.category})</span>
            <div>{a.description}</div>
            {a.attachments && a.attachments.map(f => (
              <a key={f} href={'/uploads/' + f} target="_blank" rel="noreferrer">{f}</a>
            ))}
          </li>
        ))}
      </ul>
    </section>
  );
}
