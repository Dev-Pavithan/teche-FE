import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './features.css';

export default function Features() {
    const [packages, setPackages] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPackages();
    }, []);

    // Fetch packages from API
    const fetchPackages = async () => {
        try {
            const response = await axios.get('http://localhost:7100/api/packages');
            setPackages(response.data);
        } catch (error) {
            console.error('Error fetching packages:', error);
        }
    };

    // Handle package button click
    const handlePackageClick = (pkg) => {
        // Store the selected package details in sessionStorage
        sessionStorage.setItem('selectedPackageId', pkg._id);
        sessionStorage.setItem('paymentAmount', pkg.price * 100); // Store amount in cents
        sessionStorage.setItem('selectedPackageName', pkg.name); // Store package name
        sessionStorage.setItem('selectedPackageDescription', pkg.description); // Store package description
        // Navigate to the payment page
        navigate('/payment');
    };

    return (
        <div>
            {/* Header Section */}
            <div className="container mt-5">
                <div className="row text-center mb-5">
                    <h1 className="display-4">Unlock the Full Potential of Tech-E</h1>
                    <p className="lead">Unveil the smart tools that bring your Tech-E experience to life.</p>
                </div>
            </div>

            {/* Features Section */}
            <div className="container mt-5">
                <div className="row align-items-center">
                    {/* Feature Sections */}
                </div>
            </div>

            {/* Packages Section */}
            <div className="container mt-5">
                <h2 className="text-center mb-4">Our Packages</h2>
                <div className="row">
                    {packages.length > 0 ? (
                        packages.map((pkg) => (
                            <div key={pkg._id} className="col-md-3 col-sm-6 mb-4">
                                <div className="package-card01">
                                    <div className="card-body1">
                                        <h5 className="card-title">{pkg.name}</h5>
                                        <p className="card-text">{pkg.description}</p>
                                        <button
                                            className="package-btn"
                                            onClick={() => handlePackageClick(pkg)}
                                            aria-label={`Select package ${pkg.name} for ${pkg.price}`}
                                        >
                                            {pkg.price}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No packages available</p>
                    )}
                </div>
            </div>

            {/* Demo Button Section */}
            <section>
                <div className="container mt-5">
                    <div className="row mb-4">
                        <div className="demo col-12">
                            <div className="demo p-3 text-center">
                                <button className="custom-btn" onClick={() => { /* handle demo click */ }}>Demo</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
