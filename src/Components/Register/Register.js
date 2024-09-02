import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './register.css';
import Google from './google.png';  

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);  
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      toast.error('All fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:7100/user/register', formData);
      console.log('Registration successful', response.data);
      
      // Success toast message
      toast.success('Registration successful! You can now log in.', {
        position: "top-right",
        autoClose: 3000, // Close the toast after 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // Redirect to the login page after 5 seconds
      setTimeout(() => {
        navigate('/');
      }, 5000); // 5000 milliseconds = 5 seconds
      
    } catch (error) {
      console.error('Registration failed', error);
      const errorMessage = error.response?.data?.message || 'Failed to register. Please try again.';
      toast.error(errorMessage);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="Register-container">
      <div className="Register-box">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

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

          <div className="form-group password-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="password-container">
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                id="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
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

          <button type="submit" className="btn-primary">Register</button>

          <div className="register-prompt">
            <p>Already have an account? <Link to="/login" className="register-link">Login</Link></p>
          </div>

          <div className="register-divider">
            <span>or</span>
          </div>

          <button type="button" className="google-button">
            <img className="GoogleImageIcon" src={Google} alt="Google" /> Sign up with Google
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
