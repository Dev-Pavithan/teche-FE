import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';
import Google from './google.png';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      toast.error('Please provide both email and password.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:7100/user/login', formData);
      console.log('Login successful:', response.data);

      // Assuming the response contains user data including role and token
      const { role, userId, token } = response.data; 

      // Store data in session storage
      sessionStorage.setItem('role', role);
      sessionStorage.setItem('userId', userId);
      sessionStorage.setItem('token', token); 

      // Success toast message
      toast.success('Login successful! Redirecting...', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // Redirect based on user role
      if (role === 'admin') {
        navigate('/admin'); 
      } else {
        navigate('/'); 
      }
    } catch (error) {
      console.error('Login failed:', error);
      toast.error('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group password-group">
            <label htmlFor="password">Password</label>
            <div className="password-container">
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                id="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <div className="form-group">
            <a href="#!" className="forgot-password">Forgot Password?</a>
          </div>

          <button type="submit" className="btn-primary">Login</button>

          <div className="register-prompt">
            <p>
              Don't have an account?{' '}
              <Link to="/register" className="register-link">
                Register
              </Link>
            </p>
          </div>

          <div className="register-divider">
            <span>or</span>
          </div>

          <button type="button" className="google-button">
            <img className="GoogleImageIcon" src={Google} alt="Google" /> Sign in with Google
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
