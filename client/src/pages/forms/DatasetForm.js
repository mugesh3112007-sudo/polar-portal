import React, { useRef, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../util/auth';

export default function DatasetForm() {
  const { token } = useAuth();
  const formRef = useRef();
  const [msg, setMsg] = useState('');
  const handleSubmit = async e => {
    e.preventDefault();
    const form = formRef.current;
    const fd = new FormData(form);
    try {
      await axios.post('/api/datasets', fd, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setMsg('Dataset uploaded!');
      form.reset();
    } catch (err) {
      setMsg(err.response?.data?.message || 'Error uploading');
    }
  };
  return (
    <form ref={formRef} onSubmit={handleSubmit} style={{margin:'16px 0', padding:12, background:'#efe'}}>
      <h4>Upload Scientific Dataset</h4>
      <input name="title" placeholder="Title" required /><br/>
      <textarea name="description" placeholder="Description" required rows={2}/><br/>
      <input name="publishedOn" type="date" required /><br/>
      <input name="tags" placeholder="Tags (comma separated)" /><br/>
      <textarea name="metadata" placeholder="Metadata (JSON)" /><br/>
      <input type="file" name="datasetFile" required /><br/>
      <button type="submit">Add Dataset</button><span> {msg}</span>
    </form>
  );
}
