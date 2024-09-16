import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const getButtonClass = (path) => {
    return location.pathname === path ? 'btn btn-primary active' : 'btn btn-primary';
  };

  return (
    <div className="admin-dashboard">
      <div className="left-navbar">
        <h1
          style={{ cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          Tech-E Admin
        </h1>
        <button className={getButtonClass('/admin/home')} onClick={() => navigate('/admin/home')}>
          <i className="bi bi-house-door"></i> Home
        </button>
        <button className={getButtonClass('/admin/users')} onClick={() => navigate('/admin/users')}>
          <i className="bi bi-person"></i> Manage Users
        </button>
        <button className={getButtonClass('/admin/packages')} onClick={() => navigate('/admin/packages')}>
          <i className="bi bi-box"></i> Manage Packages
        </button>
        <button className={getButtonClass('/admin/messages')} onClick={() => navigate('/admin/messages')}>
          <i className="bi bi-envelope"></i> Manage Messages
        </button>
        <button className={getButtonClass('/admin/settings')} onClick={() => navigate('/admin/settings')}>
          <i className="bi bi-gear"></i> Settings
        </button>
      </div>

      <div className="right-section">
        <Outlet />
      </div>
    </div>
  );
}
