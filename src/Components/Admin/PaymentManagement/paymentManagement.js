import React, { useEffect, useState } from 'react';
import { FaCcVisa, FaCcMastercard, FaCcAmex, FaCcDiscover } from 'react-icons/fa';
import axios from 'axios';

export default function PaymentManagement() {
  const [payments, setPayments] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get('http://localhost:7100/api/payments/payment-intents');
        setPayments(response.data);
      } catch (error) {
        console.error('Error fetching payment data:', error);
      }
    };

    fetchPayments();
  }, []);

  // Function to filter payments based on the search input
  const filteredPayments = payments.filter(payment =>
    payment.paymentIntentId.toLowerCase().includes(search.toLowerCase()) ||
    payment.currency.toLowerCase().includes(search.toLowerCase()) ||
    payment.amount.toString().includes(search)
  );

  // Function to display appropriate card icon
  const getCardIcon = (paymentMethodType) => {
    switch (paymentMethodType) {
      case 'visa':
        return <FaCcVisa size={24} />;
      case 'mastercard':
        return <FaCcMastercard size={24} />;
      case 'amex':
        return <FaCcAmex size={24} />;
      case 'discover':
        return <FaCcDiscover size={24} />;
      default:
        return null;
    }
  };

  // Function to format date and time separately
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Extract date in local format
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString(); // Extract time in local format
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Payment Management</h2>

      {/* Search Input */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by Payment ID, Currency, or Amount"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Payment Details Table */}
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Payment ID</th>
            <th scope="col">Amount</th>
            <th scope="col">Currency</th>
            <th scope="col">Card Type</th>
            <th scope="col">Date</th>
            <th scope="col">Time</th>
          </tr>
        </thead>
        <tbody>
          {filteredPayments.length > 0 ? (
            filteredPayments.map((payment) => (
              <tr key={payment.paymentIntentId}>
                <td>{payment.paymentIntentId}</td>
                <td>${(payment.amount / 100).toFixed(2)}</td>
                <td>{payment.currency.toUpperCase()}</td>
                <td>
                  {payment.payment_method_types && payment.payment_method_types.length > 0
                    ? getCardIcon(payment.payment_method_types[0])
                    : 'N/A'}
                </td>
                <td>{formatDate(payment.createdAt)}</td>
                <td>{formatTime(payment.createdAt)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No payments found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
