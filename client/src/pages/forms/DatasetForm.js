import React, { useRef, useState } from 'react';
import api from '../../util/api';
import { useAuth } from '../../util/auth';

export default function DatasetForm() {
  const { token } = useAuth();
  const formRef = useRef();
  const [msg, setMsg] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    const fd = new FormData(formRef.current);
    try {
      await api.post('/api/datasets', fd, { headers: { Authorization: `Bearer ${token}` } });
      setMsg('✅ Dataset uploaded!');
      formRef.current.reset();
    } catch (err) {
      setMsg('❌ ' + (err.response?.data?.message || 'Error uploading'));
    }
  };
  return (
    <form ref={formRef} onSubmit={handleSubmit} style={{ margin: '16px 0', padding: 16, background: '#efe', borderRadius: 8 }}>
      <h4>📊 Upload Scientific Dataset</h4>
      <input name="title" placeholder="Title" required style={{ width: '100%' }} /><br /><br />
      <textarea name="description" placeholder="Description" required rows={3} style={{ width: '100%' }} /><br /><br />
      <input name="publishedOn" type="date" required /><br /><br />
      <input name="tags" placeholder="Tags (comma separated)" style={{ width: '100%' }} /><br /><br />
      <textarea name="metadata" placeholder='Metadata JSON e.g. {"region":"Arctic"}' rows={2} style={{ width: '100%' }} /><br /><br />
      <label>Dataset File: <input type="file" name="datasetFile" required /></label><br /><br />
      <button type="submit">Add Dataset</button>
      {msg && <span style={{ marginLeft: 12 }}>{msg}</span>}
    </form>
  );
}
