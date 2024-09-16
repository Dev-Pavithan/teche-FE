import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './package.css'

export default function PackageManagement() {
    const [packages, setPackages] = useState([]);
    const [form, setForm] = useState({
        name: '',
        version: '',
        description: '',
    });
    const [editingPackage, setEditingPackage] = useState(null);

    // Fetch all packages when component mounts
    useEffect(() => {
        fetchPackages();
    }, []);

    // Fetch all packages from the backend
    const fetchPackages = async () => {
        try {
            const response = await axios.get('http://localhost:7100/api/packages');
            setPackages(response.data);
        } catch (error) {
            console.error('Error fetching packages:', error);
        }
    };

    // Handle form input changes
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Create a new package
    const createPackage = async () => {
        try {
            await axios.post('http://localhost:7100/api/packages', form);
            fetchPackages();  
            setForm({ name: '', version: '', description: '', }); 
        } catch (error) {
            console.error('Error creating package:', error);
        }
    };

    // Update an existing package
    const updatePackage = async () => {
        try {
            await axios.put(`http://localhost:7100/api/packages/${editingPackage._id}`, form);
            fetchPackages();  
            setEditingPackage(null);  
            setForm({ name: '', version: '', description: '' });
        } catch (error) {
            console.error('Error updating package:', error);
        }
    };

    // Set form data when editing a package
    const startEditing = (pkg) => {
        setEditingPackage(pkg);
        setForm({
            name: pkg.name,
            version: pkg.version,
            description: pkg.description,
        });
    };

    // Delete a package
    const deletePackage = async (id) => {
        try {
            await axios.delete(`http://localhost:7100/api/packages/${id}`);
            fetchPackages();  // Refresh the package list
        } catch (error) {
            console.error('Error deleting package:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-5">Package Management</h1>

            <div className="card mb-4">
                <div className="card-body">
                    <h3>{editingPackage ? 'Edit Package' : 'Add New Package'}</h3>
                    <form>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="version">Version</label>
                            <input
                                type="text"
                                className="form-control"
                                id="version"
                                name="version"
                                value={form.version}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea
                                className="form-control"
                                id="description"
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                            ></textarea>
                        </div>
                       
                        <button
                            type="button"
                            className="btn btn-primary mt-3"
                            onClick={editingPackage ? updatePackage : createPackage}
                        >
                            {editingPackage ? 'Update Package' : 'Add Package'}
                        </button>
                    </form>
                </div>
            </div>

            {/* List of Packages */}
            <div className="card">
                <div className="card-body">
                    <h3 className="card-title">Available Packages</h3>
                    {packages.length > 0 ? (
                        <ul className="list-group">
                            {packages.map((pkg) => (
                                <li key={pkg._id} className="list-group-item d-flex justify-content-between align-items-center">
                                    <div>
                                        <strong>{pkg.name}</strong> - {pkg.version}
                                        <br />
                                        {pkg.description}
                                        <br />
                                    </div>
                                    <div>
                                        <button
                                            className="btn btn-sm btn-edit mr-2"
                                            onClick={() => startEditing(pkg)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-sm btn-delete"
                                            onClick={() => deletePackage(pkg._id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No packages found</p>
                    )}
                </div>
            </div>
        </div>
    );
}
