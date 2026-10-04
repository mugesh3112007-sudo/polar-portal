import React from 'react';
import { useAuth } from '../util/auth';
import ExpeditionForm from './forms/ExpeditionForm';
import DatasetForm from './forms/DatasetForm';
import PublicationForm from './forms/PublicationForm';
import MediaForm from './forms/MediaForm';
import ActivityForm from './forms/ActivityForm';

export default function AdminDashboard() {
  const { logout } = useAuth();
  return (
    <section style={{ padding: 24 }}>
      <h2>Admin Dashboard</h2>
      <button onClick={logout}>Logout</button>
      <div style={{marginTop:16}}>
        <ExpeditionForm />
        <DatasetForm />
        <PublicationForm />
        <MediaForm />
        <ActivityForm />
      </div>
    </section>
  );
}
