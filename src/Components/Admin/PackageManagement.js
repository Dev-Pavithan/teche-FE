import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './package.css';

export default function PackageManagement() {
    const [packages, setPackages] = useState([]);
    const [form, setForm] = useState({
        name: '',
        version: '',
        description: '',
        price: '', // Use empty string for consistency with String type in schema
    });
    const [editingPackage, setEditingPackage] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchPackages();
    }, []);

    const fetchPackages = async () => {
        try {
            const response = await axios.get('http://localhost:7100/api/packages');
            setPackages(response.data);
        } catch (error) {
            console.error('Error fetching packages:', error);
            setError('Failed to fetch packages.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const createPackage = async () => {
        try {
            await axios.post('http://localhost:7100/api/packages', form);
            fetchPackages();
            setForm({ name: '', version: '', description: '', price: '' }); // Reset form
            setError(null);
        } catch (error) {
            console.error('Error creating package:', error);
            setError('Failed to create package.');
        }
    };

    const updatePackage = async () => {
        try {
            await axios.put(`http://localhost:7100/api/packages/${editingPackage._id}`, form);
            fetchPackages();
            setEditingPackage(null);
            setForm({ name: '', version: '', description: '', price: '' });
            setError(null);
        } catch (error) {
            console.error('Error updating package:', error);
            setError('Failed to update package.');
        }
    };

    const startEditing = (pkg) => {
        setEditingPackage(pkg);
        setForm({
            name: pkg.name,
            version: pkg.version,
            description: pkg.description,
            price: pkg.price, // Set price in the form
        });
    };

    const deletePackage = async (id) => {
        try {
            await axios.delete(`http://localhost:7100/api/packages/${id}`);
            fetchPackages();
        } catch (error) {
            console.error('Error deleting package:', error);
            setError('Failed to delete package.');
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-5">Package Management</h1>

            <div className="card mb-4">
                <div className="card-body">
                    <h3>{editingPackage ? 'Edit Package' : 'Add New Package'}</h3>
                    {error && <div className="alert alert-danger">{error}</div>}
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
                        <div className="form-group">
                            <label htmlFor="price">Price</label>
                            <input
                                type="text" // Use text to match String type in schema
                                className="form-control"
                                id="price"
                                name="price"
                                value={form.price}
                                onChange={handleChange}
                            />
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
                                        <strong>Price:</strong> ${pkg.price} 
                                    </div>
                                    <div>
                                        <button
                                            className="btn btn-sm btn-edit mr-2"
                                            onClick={() => startEditing(pkg)}
                                        >
                                            Edit
                                        </button>
                                        <br/>
                                        <br/>
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
