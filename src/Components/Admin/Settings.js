import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Settings.css'; 

export default function Settings() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    theme: 'light',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Settings updated:', formData);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Settings</h2>
      
      {/* Profile Settings */}
      <div className="settings-section mb-4">
        <h3>Profile Settings</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              className="form-control"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary">Save Changes</button>
        </form>
      </div>

      {/* Application Settings */}
      <div className="settings-section mb-4">
        <h3>Application Settings</h3>
        <div className="form-group">
          <label htmlFor="theme">Theme</label>
          <select
            id="theme"
            name="theme"
            className="form-control"
            value={formData.theme}
            onChange={handleChange}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
      </div>

      {/* Account Management */}
      <div className="settings-section">
        <h3>Account Management</h3>
        <button className="btn btn-danger">Delete Account</button>
      </div>
    </div>
  );
}
