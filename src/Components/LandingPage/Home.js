import React, { useEffect } from 'react';
import Typed from 'typed.js';
import { Link } from 'react-router-dom'; 
import './Home.css';
import avatar01 from './landing page-a1.png';

export default function Home() {
  useEffect(() => {
    const options = {
      strings: ["Companion", "Personal Assistance"],
      typeSpeed: 50,
      backSpeed: 25,
      backDelay: 1500,
      startDelay: 500,
      loop: true,
      showCursor: true
    };

    const typed = new Typed(".text", options);

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div className="hero">
      <main className="flex-fill container mt-4">
        <div className="row">
          <div className="col-md-6">
            <div className="intro-section">
              <h3>Hello It's Me</h3>
              <h3>Tech-E</h3>
              <h3>And I will be </h3>
              <h3> <span className="text"></span></h3>
              <p>I'm Your Friend</p>
              <div className="btn-group">
                <Link to="/features" className="Btn">Features</Link>
                <Link to="/login" className="Btn">Demo</Link> 
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <img alt="Tech-E Illustration" src={avatar01} className="img-fluid" />
          </div>
        </div>
      </main>
    </div>
  );
}
