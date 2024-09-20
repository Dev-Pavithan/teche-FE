import React, { useEffect, useState } from 'react';
import { FaCcVisa, FaCcMastercard, FaCcAmex, FaCcDiscover } from 'react-icons/fa';
import axios from 'axios';
import './PaymentManagement.css'; // Import the CSS file

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

  const filteredPayments = payments.filter(payment =>
    (payment.cardholderName || '').toLowerCase().includes(search.toLowerCase()) ||
    (payment.currency || '').toLowerCase().includes(search.toLowerCase()) ||
    (payment.amount ? payment.amount.toString() : '').includes(search)
  );

  const getCardIcon = (paymentMethodType) => {
    switch (paymentMethodType) {
      case 'visa':
        return <FaCcVisa size={24} className="payment-card-icon" />;
      case 'mastercard':
        return <FaCcMastercard size={24} className="payment-card-icon" />;
      case 'amex':
        return <FaCcAmex size={24} className="payment-card-icon" />;
      case 'discover':
        return <FaCcDiscover size={24} className="payment-card-icon" />;
      default:
        return <FaCcVisa size={24} className="payment-card-icon" />;
    }
  };

  return (
    <div className="payment-management-container mt-4">
      <h2 className="payment-heading mb-4">Payment Management</h2>

      {/* Search Input */}
      <div className="payment-search mb-3">
        <input
          type="text"
          className="form-control payment-search-input"
          placeholder="Search by Card Holder Name, Currency, or Amount"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Payment Details Table */}
      <table className="payment-table table-striped table-bordered">
        <thead className="payment-thead">
          <tr>
            <th scope="col">Card Holder Name</th>
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
                <td>{payment.cardholderName || 'N/A'}</td>
                <td>${(payment.amount / 100).toFixed(2)}</td>
                <td>{payment.currency ? payment.currency.toUpperCase() : 'N/A'}</td>
                <td>
                  {payment.payment_method_types && payment.payment_method_types.length > 0
                    ? getCardIcon(payment.payment_method_types[0])
                    : <FaCcVisa size={24} className="payment-card-icon" />}
                </td>
                <td>{new Date(payment.createdAt).toLocaleDateString()}</td>
                <td>{new Date(payment.createdAt).toLocaleTimeString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">No payments found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
