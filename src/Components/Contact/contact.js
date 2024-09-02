import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^\+?[0-9]*$/;
    return phoneRegex.test(phone);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, phone, message } = formData;

    if (!name || !email || !phone || !message) {
      toast.error('All fields are required.');
      return;
    }

    if (!validateEmail(email)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    if (!validatePhoneNumber(phone)) {
      toast.error('Please enter a valid phone number. It should contain only numbers and an optional "+" at the beginning.');
      return;
    }

    try {
      const response = await fetch('http://localhost:7100/contact', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, phone, message }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Form submitted', result);
        
        // Success toast message
        toast.success('Message submitted successfully!', {
          position: "top-right",
          autoClose: 5000, // Close the toast after 5 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        // Redirect to home page after 5 seconds
        setTimeout(() => {
          navigate('/');
        }, 5000); // 5000 milliseconds = 5 seconds

        // Clear form data
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        const error = await response.text();
        toast.error(`Submission failed: ${error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An unexpected error occurred.');
    }
  };

  return (
    <div className="contactUs">
      <div className="screen">
        <div className="screen__content">
          <form className="contact" onSubmit={handleSubmit}>
            <h1>Tell Us</h1>
            <div className="contact__field">
              <i className="contact__icon fas fa-user"></i>
              <input
                type="text"
                className="contact__input"
                placeholder="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="contact__field">
              <i className="contact__icon fas fa-envelope"></i>
              <input
                type="email"
                className="contact__input"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="contact__field">
              <i className="contact__icon fas fa-phone"></i>
              <input
                type="tel"
                className="contact__input"
                placeholder="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="contact__field">
              <i className="contact__icon fas fa-comment"></i>
              <input
                type="text"
                className="contact__input"
                placeholder="Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="button contact__submit">
              <span className="button__text">Send</span>
              <i className="button__icon fas fa-chevron-right"></i>
            </button>
          </form>
        </div>
        <div className="screen__background">
          <span className="screen__background__shape screen__background__shape4"></span>
          <span className="screen__background__shape screen__background__shape3"></span>        
          <span className="screen__background__shape screen__background__shape2"></span>
          <span className="screen__background__shape screen__background__shape1"></span>
        </div>        
      </div>
      <ToastContainer />
    </div>
  );
}
