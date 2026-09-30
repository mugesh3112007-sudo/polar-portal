import React, { useRef, useState } from 'react';
import api from '../../util/api';
import { useAuth } from '../../util/auth';

export default function MediaForm() {
  const { token } = useAuth();
  const formRef = useRef();
  const [msg, setMsg] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    const fd = new FormData(formRef.current);
    try {
      await api.post('/api/media', fd, { headers: { Authorization: `Bearer ${token}` } });
      setMsg('✅ Media uploaded!');
      formRef.current.reset();
    } catch (err) {
      setMsg('❌ ' + (err.response?.data?.message || 'Error uploading'));
    }
  };
  return (
    <form ref={formRef} onSubmit={handleSubmit} style={{ margin: '16px 0', padding: 16, background: '#fef', borderRadius: 8 }}>
      <h4>🖼️ Upload Media (Photo/Video)</h4>
      <select name="type" required>
        <option value="">Select type</option>
        <option value="photo">Photo</option>
        <option value="video">Video</option>
      </select><br /><br />
      <label>File: <input type="file" name="file" required /></label><br /><br />
      <input name="caption" placeholder="Caption" style={{ width: '100%' }} /><br /><br />
      <input name="relatedExpeditions" placeholder="Related Expedition IDs (comma)" style={{ width: '100%' }} /><br /><br />
      <input name="tags" placeholder="Tags (comma separated)" style={{ width: '100%' }} /><br /><br />
      <button type="submit">Add Media</button>
      {msg && <span style={{ marginLeft: 12 }}>{msg}</span>}
    </form>
  );
}
