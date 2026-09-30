import React, { useRef, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../util/auth';

export default function MediaForm() {
  const { token } = useAuth();
  const formRef = useRef();
  const [msg, setMsg] = useState('');
  const handleSubmit = async e => {
    e.preventDefault();
    const form = formRef.current;
    const fd = new FormData(form);
    try {
      await axios.post('/api/media', fd, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setMsg('Media uploaded!');
      form.reset();
    } catch (err) {
      setMsg(err.response?.data?.message || 'Error uploading');
    }
  };
  return (
    <form ref={formRef} onSubmit={handleSubmit} style={{margin:'16px 0', padding:12, background:'#fef'}}>
      <h4>Upload Media (Photo/Video)</h4>
      <select name="type" required>
        <option value="">Select type</option>
        <option value="photo">Photo</option>
        <option value="video">Video</option>
      </select><br/>
      <input type="file" name="file" required /><br/>
      <input name="caption" placeholder="Caption" /><br/>
      <input name="relatedExpeditions" placeholder="Related Expedition IDs (comma)" /><br/>
      <input name="tags" placeholder="Tags (comma)" /><br/>
      <button type="submit">Add Media</button><span> {msg}</span>
    </form>
  );
}
