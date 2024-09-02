// Components/Admin/ManageMessages.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function ManageMessages() {
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if admin token exists, if not redirect to login
    const token = sessionStorage.getItem('token');
    if (!token) {
      toast.error('Unauthorized! Please log in.');
      navigate('/login');
      return;
    }

    // Fetch all messages from the backend
    const fetchMessages = async () => {
      try {
        const response = await axios.get('http://localhost:7100/message/all', {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to headers for authentication
          },
        });

        setMessages(response.data); // Store fetched messages
        // Optionally store messages in session storage or local storage as needed
        sessionStorage.setItem('messages', JSON.stringify(response.data));
        localStorage.setItem('lastFetchedMessages', new Date().toISOString()); // Store timestamp of the fetch
      } catch (error) {
        console.error('Error fetching messages:', error);
        toast.error('Failed to fetch messages. Please try again later.');
      }
    };

    fetchMessages();
  }, [navigate]);

  return (
    <div>
      <h2>Manage Messages</h2>
      {messages.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Sender</th>
              <th>Recipient</th>
              <th>Content</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((message) => (
              <tr key={message._id}>
                <td>{message.sender}</td>
                <td>{message.recipient}</td>
                <td>{message.content}</td>
                <td>{new Date(message.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No messages found.</p>
      )}
    </div>
  );
}
