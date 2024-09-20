import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './UserManagement.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [searchEmail, setSearchEmail] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      toast.error('Unauthorized! Please log in.');
      navigate('/login');
      return;
    }

    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:7100/user/all', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUsers(response.data);
      } catch (error) {
        toast.error('Failed to fetch users. Please try again later.');
      }
    };

    fetchUsers();
  }, [navigate]);

  const handleSearch = async () => {
    const token = sessionStorage.getItem('token');
    try {
      const response = await axios.get(`http://localhost:7100/user/by-email/${searchEmail}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setFilteredUsers([response.data]);
    } catch (error) {
      toast.error('User not found.');
      setFilteredUsers([]);
    }
  };

  const handleBlockToggle = async (id, currentlyBlocked) => {
    const token = sessionStorage.getItem('token');
    try {
      const response = await axios.patch(`http://localhost:7100/user/${id}/block`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers(users.map(user => (user._id === id ? { ...user, blocked: !currentlyBlocked } : user)));
      toast.success(response.data.message);
    } catch (error) {
      toast.error('Failed to toggle user block status.');
    }
  };

  return (
    <div className="container mt-4 user-management-container">
      <h2 className="user-management-heading mb-4">Manage Users</h2>

      <div className="d-flex justify-content-end mb-3">
        <input
          type="text"
          className="form-control search-input me-2"
          placeholder="Search by email"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
        />
        <button onClick={handleSearch} className="btn btn-primary search-button">Search</button>
      </div>

      <div className="table-responsive">
        <table className="user-table table table-hover table-striped">
          <thead className="user-table-header">
            <tr>
              <th className="user-table-header-id">ID</th>
              <th className="user-table-header-name">Name</th>
              <th className="user-table-header-email">Email</th>
              <th className="user-table-header-role">Role</th>
              <th className="user-table-header-status">Status</th>
              <th className="user-table-header-actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {(filteredUsers.length > 0 ? filteredUsers : users).map((user) => (
              <tr key={user._id} className="user-table-row">
                <td className="user-table-data">{user._id}</td>
                <td className="user-table-data">{user.name}</td>
                <td className="user-table-data">{user.email}</td>
                <td className="user-table-data">{user.role}</td>
                <td className="user-table-data">{user.blocked ? 'Blocked' : 'Active'}</td>
                <td className="user-table-data">
                  <button
                    onClick={() => handleBlockToggle(user._id, user.blocked)}
                    className={`btn ${user.blocked ? 'btn-success' : 'btn-danger'}`}
                  >
                    {user.blocked ? 'Unblock' : 'Block'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
