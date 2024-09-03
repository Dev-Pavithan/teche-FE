import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="admin-dashboard">
      <div className="left-navbar">
        <h1>Tech-E Admin</h1>
        <button className="btn btn-primary" onClick={() => handleNavigate('/admin/home')}>
          <i className="bi bi-house-door"></i> Home
        </button>
        <button className="btn btn-secondary" onClick={() => handleNavigate('/admin/users')}>
          <i className="bi bi-person"></i> Manage Users
        </button>
        <button className="btn btn-secondary" onClick={() => handleNavigate('/admin/packages')}>
          <i className="bi bi-box"></i> Manage Packages
        </button>
        <button className="btn btn-secondary" onClick={() => handleNavigate('/admin/messages')}>
          <i className="bi bi-envelope"></i> Manage Messages
        </button>
        <button className="btn btn-secondary" onClick={() => handleNavigate('/admin/settings')}>
          <i className="bi bi-gear"></i> Settings
        </button>
      </div>

      <div className="right-section">
        <Outlet />
      </div>
    </div>
  );
}
