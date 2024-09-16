import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import CalendarComponent from './CalendarComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

export default function Home() {
  const [data, setData] = useState({ total: 0, active: 0, blocked: 0 });
  const [messages, setMessages] = useState([]);
  const [messageCount, setMessageCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);

  // State for package management
  const [packages, setPackages] = useState([]);
  const [packageLoading, setPackageLoading] = useState(true);
  const [packageError, setPackageError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = JSON.parse(sessionStorage.getItem('users')) || [];
        const total = users.length;
        const active = users.filter(user => !user.blocked).length;
        const blocked = total - active;

        setData({ total, active, blocked });

        const messages = JSON.parse(sessionStorage.getItem('messages')) || [];
        const sortedMessages = messages.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        const recentMessages = sortedMessages.slice(0, 5);

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
      } finally {
        setLoading(false);
      }
    };

    const fetchPackages = async () => {
      try {
        const response = await axios.get('http://localhost:7100/api/packages');
        setPackages(response.data);
      } catch (error) {
        setPackageError('Error fetching packages.');
      } finally {
        setPackageLoading(false);
      }
    };

    fetchData();
    fetchPackages();
  }, []);

  // Function to animate number from 0 to total count
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

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    setUnreadCount(0);
  };

  const clearNotifications = () => {
    setNotifications([]);
    setUnreadCount(0);
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

  if (loading || packageLoading) {
    return <div className="container mt-4"><p>Loading...</p></div>;
  }

  return (
    <div className="container mt-4 home-container">
      {/* Navbar */}
      <div className="navbarHome d-flex justify-content-end mb-4">
        <div className="navbarHome-icons">
          <div className="icon-wrapper">
            <FontAwesomeIcon icon={faBell} className="icon bell-icon" onClick={handleNotificationClick} />
            {unreadCount > 0 && (
              <span className="badge badge-danger notification-badge">{unreadCount}</span>
            )}
            {showNotifications && (
              <div className="notification-dropdown">
                <ul className="list-group-notification">
                  {notifications.length > 0 ? (
                    notifications.map((notification, index) => (
                      <li key={index} className="list-group-item">
                        {notification.message}
                      </li>
                    ))
                  ) : (
                    <li className="list-group-notification">No notifications</li>
                  )}
                </ul>
                <button className="btn btn-clear mt-2" onClick={clearNotifications}>Clear Notifications</button>
              </div>
            )}
          </div>
          <div className="icon-wrapper">
            <FontAwesomeIcon icon={faUserCircle} className="icon user-icon" />
          </div>
        </div>
      </div>

      {/* Main content cards */}
      <div className="row first-row">
        <div className="col-md-6 col-lg-4 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Calendar</h5>
              <CalendarComponent />
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-4 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">User Statistics</h5>
              <Doughnut data={donutChartData} options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  tooltip: {
                    callbacks: {
                      label: function (tooltipItem) {
                        const dataset = tooltipItem.dataset;
                        const total = dataset.data.reduce((acc, value) => acc + value, 0);
                        const value = dataset.data[tooltipItem.dataIndex];
                        const percentage = ((value / total) * 100).toFixed(2);
                        return `${tooltipItem.label}: ${value} (${percentage}%)`;
                      }
                    }
                  }
                }
              }} />
              <div className="chart-info mt-3">
                <p><strong>Total Users:</strong> {data.total}</p>
                <p><strong>Active Users:</strong> {data.active} ({((data.active / data.total) * 100).toFixed(2)}%)</p>
                <p><strong>Blocked Users:</strong> {data.blocked} ({((data.blocked / data.total) * 100).toFixed(2)}%)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Total Messages count */}
        <div className="col-md-6 col-lg-4 mb-4">
          <div className="card h-100 text-center d-flex flex-column justify-content-center">
            <div className="card-body">
              <h5 className="card-title03">Total Messages</h5>
              <p className="card-text message-count">
                <span className="count">{messageCount}</span>
              </p>
              <p className="card-text below-text">Messages</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Messages and Available Packages Section */}
      <div className="row">
        <div className="col-md-8 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Recent Messages</h5>
              <ul className="list-group">
                {messages.length > 0 ? (
                  messages.map((message) => (
                    <li key={message._id} className="list-group-item">
                      <strong>{message.name}:</strong> {message.message}
                    </li>
                  ))
                ) : (
                  <li className="list-group-item no-messages">No recent messages</li>
                )}
              </ul>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Available Packages</h5>
              {packageError && <p className="text-danger">{packageError}</p>}
              <div className="row">
                {packages.length > 0 ? (
                  packages.map((pkg) => (
                    <div key={pkg._id} className="col-md-12 mb-3">
                      <div className="package-card">
                        <div className="package-card-body">
                          <h6 className="package-name">{pkg.name}</h6>
                          <p className="package-version">Version: {pkg.version}</p>
                          <p className="package-description">{pkg.description}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No packages found</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


