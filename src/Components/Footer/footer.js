import React from 'react';
import { Link } from 'react-router-dom'; 
import './footer.css';

export default function Footer() {
  return (
    <div>
      <footer className="footer-custom text-white text-center text-lg-start">
        <div className="container p-4">
          <div className="row">
            <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase">About Us</h5>
              <p>
                Tech-E is committed to providing the best service and experience. Our app offers coding aid,
                companionship, and personal assistance to meet your needs.
              </p>
            </div>

            <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase">Quick Links</h5>
              <ul className="list-unstyled">
                <li><Link to="/" className="text-white">Home</Link></li>
                <li><Link to="/features" className="text-white">Features</Link></li>
                <li><Link to="/contact" className="text-white">Contact Us</Link></li>
                <li><Link to="/login" className="text-white">Login</Link></li>
              </ul>
            </div>

            <div className="col-lg-4 col-md-12 mb-4 mb-md-0">
              <h5 className="text-uppercase">Contact Information</h5>
              <ul className="list-unstyled">
                <li><i className="fas fa-envelope"></i> techeai24@gmail.com</li>
              </ul>

              <h5 className="text-uppercase mt-4">Follow Us</h5>
              <div>
                <a href="#!" className="text-white me-4">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#!" className="text-white me-4">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#!" className="text-white me-4">
                  <i className="fab fa-linkedin"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center p-3">
          © 2024 Tech-E. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
