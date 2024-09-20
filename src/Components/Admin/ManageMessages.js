import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ManageMessages.css';

export default function ManageMessages() {
  const [messages, setMessages] = useState([]);
  const [searchEmail, setSearchEmail] = useState('');
  const [filteredMessages, setFilteredMessages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      toast.error('Unauthorized! Please log in.');
      navigate('/login');
      return;
    }

    const fetchMessages = async () => {
      try {
        const response = await axios.get('http://localhost:7100/contact/all', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setMessages(response.data);
        sessionStorage.setItem('messages', JSON.stringify(response.data));
      } catch (error) {
        console.error('Error fetching messages:', error);
        toast.error('Failed to fetch messages. Please try again later.');
      }
    };

    fetchMessages();
  }, [navigate]);

  const handleSearch = async () => {
    const token = sessionStorage.getItem('token');
    try {
      const response = await axios.get(`http://localhost:7100/contact/by-email/${searchEmail}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFilteredMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages by email:', error);
      toast.error('No messages found for this email.');
      setFilteredMessages([]);
    }
  };

  return (
    <div className="contact-management-container mt-4">
      <h2 className="contact-management-heading mb-4">Manage Messages</h2>

      <div className="message-search-bar mb-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control contact-search-input"
            placeholder="Search by email"
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
          />
          <button onClick={handleSearch} className="btn btn-primary search-button">Search</button>
        </div>
      </div>

      <div className="message-table-container table-responsive">
        <table className="contact-table table table-hover table-striped">
          <thead className="contact-thead">
            <tr>
              <th className="table-header-name">Name</th>
              <th className="table-header-email">Email</th>
              <th className="table-header-phone">Phone</th>
              <th className="table-header-message">Message</th>
            </tr>
          </thead>
          <tbody>
            {(filteredMessages.length > 0 ? filteredMessages : messages).length > 0 ? (
              (filteredMessages.length > 0 ? filteredMessages : messages).map((message) => (
                <tr key={message._id} className="table-row">
                  <td className="table-data-name">{message.name}</td>
                  <td className="table-data-email">{message.email}</td>
                  <td className="table-data-phone">{message.phone}</td>
                  <td className="table-data-message">{message.message}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">No messages found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
