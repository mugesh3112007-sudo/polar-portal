import React, { useRef, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../util/auth';

export default function ExpeditionForm() {
  const { token } = useAuth();
  const formRef = useRef();
  const [msg, setMsg] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    const form = formRef.current;
    const fd = new FormData(form);
    try {
      await axios.post('/api/expeditions', fd, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setMsg('Expedition uploaded!');
      form.reset();
    } catch (err) {
      setMsg(err.response?.data?.message || 'Error uploading');
    }
  };
  return (
    <form ref={formRef} onSubmit={handleSubmit} style={{ margin:'24px 0', padding:12, background:'#eef' }}>
      <h4>Upload Expedition</h4>
      <input name="title" placeholder="Title" required /> <input name="date" type="date" required /><br/>
      <textarea name="description" placeholder="Description" required rows={2}/><br/>
      <input name="tags" placeholder="Tags (comma separated)" /><br/>
      <input type="file" name="reportFile" accept=".pdf,.doc,.docx" /> Report file<br/>
      <input type="file" name="photos" accept="image/*" multiple /> Photos<br/>
      <input type="file" name="videos" accept="video/*" multiple /> Videos<br/>
      <button type="submit">Add Expedition</button>
      <span> {msg}</span>
    </form>
  );
}
