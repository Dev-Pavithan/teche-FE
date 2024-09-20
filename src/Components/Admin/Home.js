import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import CalendarComponent from './CalendarComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUserCircle, faCalendar } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Modal } from 'react-bootstrap';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

export default function Home() {
  const [data, setData] = useState({ total: 0, active: 0, blocked: 0 });
  const [messages, setMessages] = useState([]);
  const [messageCount, setMessageCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = JSON.parse(sessionStorage.getItem('users')) || [];
        const total = users.length;
        const active = users.filter(user => !user.blocked).length;
        const blocked = total - active;

        setData({ total, active, blocked });

        const messages = JSON.parse(sessionStorage.getItem('messages')) || [];
        const recentMessages = messages.slice(0, 5);
        setMessages(recentMessages);
        animateCountUp(messages.length);

        const newNotifications = recentMessages.map((msg) => ({
          type: 'message',
          message: `New message from ${msg.name}`,
          timestamp: msg.timestamp,
        }));

        setNotifications(newNotifications);
        setUnreadCount(newNotifications.length);
      } catch (error) {
        console.error('Error fetching data:', error);
        setData({ total: 0, active: 0, blocked: 0 });
        setMessages([]);
        setNotifications([]);
      }
    };

    const fetchPackages = async () => {
      try {
        const response = await axios.get('http://localhost:7100/api/packages');
        setPackages(response.data);
      } catch (error) {
        console.error('Error fetching packages:', error);
      }
    };

    fetchData();
    fetchPackages();
  }, []);

  const animateCountUp = (total) => {
    let start = 0;
    const duration = 1500;
    const stepTime = Math.abs(Math.floor(duration / total));
    const counter = () => {
      if (start < total) {
        start += 1;
        setMessageCount(start);
        setTimeout(counter, stepTime);
      }
    };
    counter();
  };

  const donutChartData = {
    labels: ['Active', 'Blocked'],
    datasets: [{
      data: [data.active, data.blocked],
      backgroundColor: ['#9b4ec8', '#e98ffb'],
      borderColor: ['#ffffff', '#ffffff'],
      borderWidth: 2,
    }],
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 d-flex justify-content-end align-items-center mt-3">
          <FontAwesomeIcon icon={faBell} className="icon" />
          <FontAwesomeIcon icon={faCalendar} 
            className="icon" 
            onClick={() => setShowCalendar(true)} 
          />
          <FontAwesomeIcon icon={faUserCircle} className="icon" />
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-md-4 d-flex flex-column">
          <div className="total-users card">
            <h5>Total Users</h5>
            <p className="message-count">{data.total}</p>
          </div>
          <div className="total-messages card">
            <h5>Total Messages</h5>
            <p className="message-count">{messageCount}</p>
          </div>
        </div>

        <div className="col-md-4 d-flex justify-content-center align-items-center">
          <div className="done-chart">
            <Doughnut data={donutChartData} />
          </div>
        </div>

        <div className="col-md-4">
          <div className="packages-list card">
            <h5>Available Packages</h5>
            {packages.length > 0 ? (
              packages.map((pkg, index) => (
                <div key={index} className="package-card card mb-3">
                  <div className="card-body">
                    <h5 className="package-name">{pkg.name}</h5>
                    <p className="package-description">{pkg.description}</p>
                    <button className="btn btn-primary">View Details</button>
                  </div>
                </div>
              ))
            ) : (
              <p>No packages available</p>
            )}
          </div>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-md-6">
          <div className="payment-section card">
            <h5>Payment</h5>
            {/* Payment details here */}
          </div>
        </div>
        <div className="col-md-6">
          <div className="recent-messages card">
            <h5>Recent Messages</h5>
            {messages.length > 0 ? (
              <ul className="message-list">
                {messages.map((msg, index) => (
                  <li key={index} className="message-item">
                    <div className="message-avatar">
                      <FontAwesomeIcon icon={faUserCircle} className="avatar-icon" />
                    </div>
                    <div className="message-content">
                      <strong>{msg.name}</strong>
                      <p>{msg.text}</p>
                      <span className="message-timestamp">{new Date(msg.timestamp).toLocaleTimeString()}</span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No recent messages</p>
            )}
          </div>
        </div>
      </div>

      

      {/* Calendar Modal */}
      <Modal show={showCalendar} onHide={() => setShowCalendar(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Select a Date</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CalendarComponent date={selectedDate} setDate={setSelectedDate} />
        </Modal.Body>
      </Modal>
    </div>
  );
}
