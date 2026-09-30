import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Datasets() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get('/api/datasets').then(res => setData(res.data));
  }, []);
  return (
    <section style={{ padding: 24 }}>
      <h2>Scientific Datasets</h2>
      <ul>
        {data.map(d => (
          <li key={d._id}>
            <strong>{d.title}</strong>
            <div>{d.description}</div>
            {d.datasetFile && <a href={'/uploads/' + d.datasetFile} target="_blank" rel="noreferrer">Download</a>}
          </li>
        ))}
      </ul>
    </section>
  );
}
