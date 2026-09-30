import React, { useRef, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../util/auth';

export default function ActivityForm() {
  const { token } = useAuth();
  const formRef = useRef();
  const [msg, setMsg] = useState('');
  const handleSubmit = async e => {
    e.preventDefault();
    const form = formRef.current;
    const fd = new FormData(form);
    try {
      await axios.post('/api/activities', fd, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setMsg('Activity uploaded!');
      form.reset();
    } catch (err) {
      setMsg(err.response?.data?.message || 'Error uploading');
    }
  };
  return (
    <form ref={formRef} onSubmit={handleSubmit} style={{margin:'16px 0', padding:12, background:'#dff'}}>
      <h4>Upload Institutional Activity</h4>
      <input name="title" placeholder="Title" required />
      <input name="category" placeholder="Category" /><br/>
      <textarea name="description" placeholder="Description" rows={2} required /><br/>
      <input type="date" name="date" required /><br/>
      <input type="file" name="attachments" multiple /><br/>
      <button type="submit">Add Activity</button><span> {msg}</span>
    </form>
  );
}
