import React, { useRef, useState } from 'react';
import api from '../../util/api';
import { useAuth } from '../../util/auth';

export default function ExpeditionForm() {
  const { token } = useAuth();
  const formRef = useRef();
  const [msg, setMsg] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    const fd = new FormData(formRef.current);
    try {
      await api.post('/api/expeditions', fd, { headers: { Authorization: `Bearer ${token}` } });
      setMsg('✅ Expedition uploaded!');
      formRef.current.reset();
    } catch (err) {
      setMsg('❌ ' + (err.response?.data?.message || 'Error uploading'));
    }
  };
  return (
    <form ref={formRef} onSubmit={handleSubmit} style={{ margin: '24px 0', padding: 16, background: '#eef', borderRadius: 8 }}>
      <h4>📍 Upload Expedition</h4>
      <input name="title" placeholder="Title" required style={{ marginRight: 8 }} />
      <input name="date" type="date" required /><br /><br />
      <textarea name="description" placeholder="Description" required rows={3} style={{ width: '100%' }} /><br /><br />
      <input name="tags" placeholder="Tags (comma separated)" style={{ width: '100%' }} /><br /><br />
      <label>Report File: <input type="file" name="reportFile" accept=".pdf,.doc,.docx" /></label><br />
      <label>Photos: <input type="file" name="photos" accept="image/*" multiple /></label><br />
      <label>Videos: <input type="file" name="videos" accept="video/*" multiple /></label><br /><br />
      <button type="submit">Add Expedition</button>
      {msg && <span style={{ marginLeft: 12 }}>{msg}</span>}
    </form>
  );
}
