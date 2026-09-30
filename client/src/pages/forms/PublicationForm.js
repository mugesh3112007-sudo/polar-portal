import React, { useRef, useState } from 'react';
import api from '../../util/api';
import { useAuth } from '../../util/auth';

export default function PublicationForm() {
  const { token } = useAuth();
  const formRef = useRef();
  const [msg, setMsg] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    const fd = new FormData(formRef.current);
    try {
      await api.post('/api/publications', fd, { headers: { Authorization: `Bearer ${token}` } });
      setMsg('✅ Publication uploaded!');
      formRef.current.reset();
    } catch (err) {
      setMsg('❌ ' + (err.response?.data?.message || 'Error uploading'));
    }
  };
  return (
    <form ref={formRef} onSubmit={handleSubmit} style={{ margin: '16px 0', padding: 16, background: '#ffe', borderRadius: 8 }}>
      <h4>📚 Upload Publication</h4>
      <input name="title" placeholder="Title" required style={{ width: '100%' }} /><br /><br />
      <input name="journal" placeholder="Journal name" style={{ width: '100%' }} /><br /><br />
      <input name="authors" placeholder="Authors (comma separated)" style={{ width: '100%' }} /><br /><br />
      <textarea name="abstract" placeholder="Abstract" rows={3} style={{ width: '100%' }} /><br /><br />
      <input name="publishedOn" type="date" /><br /><br />
      <input name="tags" placeholder="Tags (comma separated)" style={{ width: '100%' }} /><br /><br />
      <label>PDF File: <input type="file" name="pdfFile" required accept="application/pdf" /></label><br /><br />
      <button type="submit">Add Publication</button>
      {msg && <span style={{ marginLeft: 12 }}>{msg}</span>}
    </form>
  );
}
