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
          {/* Left side: Navigation links */}
          <div className="d-flex align-items-center">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/"><i className="fas fa-home"></i> Home</Link>
              </li>
              <li className="nav-item">
  <Link className="nav-link" to="/features">
    <i className="fas fa-blog"></i> Blog
  </Link>
</li>

              <li className="nav-item">
                <Link className="nav-link" to="/contact"><i className="fas fa-envelope"></i> Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Center: Logo */}
          <div className="navbar-brand mx-auto">
            <Link to="/">
              <img alt="Logo" src={logo} className="Logo" />
            </Link>
          </div>

          {/* Right side: Login/Logout button */}
          <div className="d-flex align-items-center ms-auto">
            <ul className="navbar-nav">
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
