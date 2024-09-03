// ManageMessages.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported
import './ManageMessages.css'; // Ensure to import your custom CSS

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
        localStorage.setItem('lastFetchedMessages', new Date().toISOString());
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
    <div className="container mt-4 manage-messages">
      <h2 className="mb-4">Manage Messages</h2>

      {/* Search Bar */}
      <div className="d-flex justify-content-end mb-3">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Search by email"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
        />
        <button onClick={handleSearch} className="btn btn-primary">Search</button>
      </div>

      {/* Display Messages */}
      {filteredMessages.length > 0 || searchEmail === '' ? (
        <div className="table-responsive-scroll">
          <table className="table table-striped">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {(filteredMessages.length > 0 ? filteredMessages : messages).map((message) => (
                <tr key={message._id}>
                  <td>{message._id}</td>
                  <td>{message.name}</td>
                  <td>{message.email}</td>
                  <td>{message.phone}</td>
                  <td>{message.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No messages found.</p>
      )}
    </div>
  );
}
