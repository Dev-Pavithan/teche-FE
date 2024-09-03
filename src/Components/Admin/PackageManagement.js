import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ManagePackages.css'; 

const packages = [
  {
    id: 1,
    name: 'Free Package',
    description: 'Basic features for free.',
    price: '$0',
    features: ['Feature 1', 'Feature 2', 'Feature 3'],
    type: 'free',
  },
  {
    id: 2,
    name: 'Premium Package 1',
    description: 'Includes additional features for a small fee.',
    price: '$10',
    features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'],
    type: 'premium',
  },
  {
    id: 3,
    name: 'Premium Package 2',
    description: 'More features and priority support.',
    price: '$20',
    features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4', 'Feature 5'],
    type: 'premium',
  },
  {
    id: 4,
    name: 'Premium Package 3',
    description: 'All features plus exclusive access.',
    price: '$30',
    features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4', 'Feature 5', 'Feature 6'],
    type: 'premium',
  },
];

export default function ManagePackages() {
  return (
    <div className="container mt-4">
      <h2 className="mb-4">Manage Packages</h2>
      <div className="row">
        {packages.map((pkg) => (
          <div key={pkg.id} className="col-md-4 mb-4">
            <div className={`package-card ${pkg.type}`}>
              <h3>{pkg.name}</h3>
              <p className="description">{pkg.description}</p>
              <h4 className="price">{pkg.price}</h4>
              <ul className="features">
                {pkg.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              <button className="btn btn-primary">Select</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
