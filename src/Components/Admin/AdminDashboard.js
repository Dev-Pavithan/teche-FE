// Components/Admin/AdminDashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const navigate = useNavigate();

  const handleManageUsers = () => {
    navigate('/admin/users');
  };

  const handleManageMessages = () => {
    navigate('/admin/messages'); 
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <button onClick={handleManageUsers}>Manage Users</button>
      <button onClick={handleManageMessages}>Manage Messages</button>
    </div>
  );
}
