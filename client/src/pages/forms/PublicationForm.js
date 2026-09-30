import React, { useRef, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../util/auth';

export default function PublicationForm() {
  const { token } = useAuth();
  const formRef = useRef();
  const [msg, setMsg] = useState('');
  const handleSubmit = async e => {
    e.preventDefault();
    const form = formRef.current;
    const fd = new FormData(form);
    try {
      await axios.post('/api/publications', fd, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setMsg('Publication uploaded!');
      form.reset();
    } catch (err) {
      setMsg(err.response?.data?.message || 'Error uploading');
    }
  };
  return (
    <form ref={formRef} onSubmit={handleSubmit} style={{margin:'16px 0', padding:12, background:'#ffe'}}>
      <h4>Upload Publication</h4>
      <input name="title" placeholder="Title" required />
      <input name="journal" placeholder="Journal" required /><br/>
      <input name="authors" placeholder="Authors (comma)" required /><br/>
      <textarea name="abstract" placeholder="Abstract" rows={2} /><br/>
      <input name="publishedOn" type="date" /><br/>
      <input name="tags" placeholder="Tags (comma)" /><br/>
      <input type="file" name="pdfFile" required accept="application/pdf" /><br/>
      <button type="submit">Add Publication</button><span> {msg}</span>
    </form>
  );
}
