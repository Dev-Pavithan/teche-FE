import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './AdminDashboard.css';
// import Anim from './Anim/anim.js'

export default function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const getButtonClassName = (path) => {
    return location.pathname === path ? 'btn btn-primary active' : 'btn btn-primary';
  };

  return (
    <div className="admin-dashboard">
      {/* <Anim/> */}

      <div className="left-navbar">
        <h1
          style={{ cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          Tech-E Admin
        </h1>
        <button className={getButtonClassName('/admin/home')} onClick={() => navigate('/admin/home')}>
          <i className="bi bi-house-door-fill"></i> Home
        </button>
        <button className={getButtonClassName('/admin/users')} onClick={() => navigate('/admin/users')}>
          <i className="bi bi-person-fill"></i> Manage Users
        </button>
        <button className={getButtonClassName('/admin/packages')} onClick={() => navigate('/admin/packages')}>
          <i className="bi bi-box-fill"></i> Manage Packages
        </button>
        <button className={getButtonClassName('/admin/messages')} onClick={() => navigate('/admin/messages')}>
          <i className="bi bi-envelope-fill"></i> Manage Messages
        </button>
        <button className={getButtonClassName('/admin/settings')} onClick={() => navigate('/admin/settings')}>
          <i className="bi bi-gear-fill"></i> Settings
        </button>
        <button className={getButtonClassName('/admin/paymentsDetails')} onClick={() => navigate('/admin/paymentsDetails')}>
          <i className="bi bi-credit-card-fill"></i> Payment Details
        </button>
      </div>
      <div className="right-section">
        <Outlet />
      </div>
    </div>
  );
}
