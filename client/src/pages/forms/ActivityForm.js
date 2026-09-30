import React, { useRef, useState } from 'react';
import api from '../../util/api';
import { useAuth } from '../../util/auth';

export default function ActivityForm() {
  const { token } = useAuth();
  const formRef = useRef();
  const [msg, setMsg] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    const fd = new FormData(formRef.current);
    try {
      await api.post('/api/activities', fd, { headers: { Authorization: `Bearer ${token}` } });
      setMsg('✅ Activity uploaded!');
      formRef.current.reset();
    } catch (err) {
      setMsg('❌ ' + (err.response?.data?.message || 'Error uploading'));
    }
  };
  return (
    <form ref={formRef} onSubmit={handleSubmit} style={{ margin: '16px 0', padding: 16, background: '#dff', borderRadius: 8 }}>
      <h4>🏛️ Upload Institutional Activity</h4>
      <input name="title" placeholder="Title" required style={{ width: '100%' }} /><br /><br />
      <input name="category" placeholder="Category (e.g. Workshop, Seminar)" style={{ width: '100%' }} /><br /><br />
      <textarea name="description" placeholder="Description" rows={3} required style={{ width: '100%' }} /><br /><br />
      <input type="date" name="date" required /><br /><br />
      <label>Attachments: <input type="file" name="attachments" multiple /></label><br /><br />
      <button type="submit">Add Activity</button>
      {msg && <span style={{ marginLeft: 12 }}>{msg}</span>}
    </form>
  );
}
