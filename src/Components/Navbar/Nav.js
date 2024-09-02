import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import './nav.css';
import logo from './Logo version04.png';

export default function Nav() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check session storage for role status on component mount
  useEffect(() => {
    const role = sessionStorage.getItem('role');
    if (role === 'user') {
      setIsLoggedIn(true);
    }
  }, []);

  // Handle user logout
  const handleLogout = () => {
    // Clear session storage
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('role');

    // Update login state
    setIsLoggedIn(false);

    // Navigate to the home page
    navigate('/');
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-custom">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img alt="Logo" src={logo} className="Logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/"><i className="fas fa-home"></i> Home</Link>
              </li>
              
              <li className="nav-item">
                <Link className="nav-link" to="/features"><i className="fas fa-cogs"></i> Features</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact"><i className="fas fa-envelope"></i> Tell Us</Link>
              </li>
              {/* Conditional rendering based on login state */}
              {isLoggedIn ? (
                <li className="nav-item">
                  <button className="nav-link btn btn-link" onClick={handleLogout}>
                    <i className="fas fa-sign-out-alt"></i> Logout
                  </button>
                </li>
              ) : (
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    <i className="fas fa-user"></i> Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
