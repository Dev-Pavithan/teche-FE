// Components/Admin/UserTable.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if admin token exists, if not redirect to login
    const token = sessionStorage.getItem('token');
    if (!token) {
      toast.error('Unauthorized! Please log in.');
      navigate('/login');
      return;
    }

    // Fetch all users from the backend
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:7100/user/all', {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to headers for authentication
          },
        });

        setUsers(response.data); // Store fetched users
        // Optionally store users in session storage or local storage as needed
        sessionStorage.setItem('users', JSON.stringify(response.data));
        localStorage.setItem('lastFetchedUsers', new Date().toISOString()); // Store timestamp of the fetch
      } catch (error) {
        console.error('Error fetching users:', error);
        toast.error('Failed to fetch users. Please try again later.');
      }
    };

    fetchUsers();
  }, [navigate]);

  return (
    <div>
      <h2>Manage Users</h2>
      {users.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.blocked ? 'Blocked' : 'Active'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
}
