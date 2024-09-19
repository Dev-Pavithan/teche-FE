// import React, { useState, useEffect } from 'react';
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import './Payment.css';

// // Initialize Stripe
// const stripePromise = loadStripe('pk_test_51Q0TEXRvwjj18J6TooOsxJF8J8IweJyuMZdyc2p8M2bGJEihjAdAwbfUpavDZVfN9j5AAxUbOVt6JvjbHQSczIC600myHW2EBv');

// const CheckoutForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [amount, setAmount] = useState(3000);  // Default value is $30 (in cents)
//   const [packageDetails, setPackageDetails] = useState({ name: 'Default Package', description: 'Payment for $30 package' });

//   useEffect(() => {
//     // Fetch values from sessionStorage if they exist
//     const storedAmount = sessionStorage.getItem('paymentAmount');
//     const storedName = sessionStorage.getItem('selectedPackageName');
//     const storedDescription = sessionStorage.getItem('selectedPackageDescription');

//     if (storedAmount) {
//       setAmount(parseInt(storedAmount, 10));  // Use the stored amount if available
//     }
//     if (storedName && storedDescription) {
//       setPackageDetails({
//         name: storedName,
//         description: storedDescription,
//       });
//     }
//   }, [navigate]);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setLoading(true);

//     try {
//       // Create PaymentIntent with the amount in cents
//       const response = await axios.post('http://localhost:7100/api/payments/payment-intent', { amount });

//       const { clientSecret } = response.data;

//       // Confirm the payment with Stripe
//       const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: elements.getElement(CardElement),
//         },
//       });

//       if (error) {
//         toast.error('Payment failed: ' + error.message);
//       } else if (paymentIntent.status === 'succeeded') {
//         toast.success(`Payment of $${amount / 100} successful! Thank you for your purchase.`);
//         sessionStorage.removeItem('paymentAmount'); 
//         sessionStorage.removeItem('selectedPackageName');
//         sessionStorage.removeItem('selectedPackageDescription');
//         navigate('/'); 
//       } else {
//         toast.error('Payment failed. Please try again.');
//       }
//     } catch (error) {
//       console.error('Payment error:', error);
//       toast.error('Payment failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="payment-form">
//       <h4 className="mb-4">Enter Card Details</h4>
//       <div className="form-group mb-3">
//         <CardElement className="form-control" />
//       </div>
//       <div className="mb-3">
//         <p><strong>Package Name:</strong> {packageDetails.name}</p>
//         <p><strong>Description:</strong> {packageDetails.description}</p>
//       </div>
//       <button type="submit" className="btn btn-primary w-100" disabled={!stripe || loading}>
//         {loading ? 'Processing...' : `Pay $${(amount / 100).toFixed(2)}`}  {/* Show amount in dollars */}
//       </button>
//     </form>
//   );
// };

// const Payment = () => (
//   <div className="container payment-container">
//     <div className="row justify-content-center">
//       <div className="col-md-6">
//         <div className="card p-4 mt-5">
//           <h2 className="text-center mb-4">Complete Your Payment</h2>
//           <Elements stripe={stripePromise}>
//             <CheckoutForm />
//           </Elements>
//         </div>
//       </div>
//     </div>
//     <ToastContainer
//       position="top-center"
//       autoClose={5000}
//       hideProgressBar={false}
//       newestOnTop={false}
//       closeOnClick
//       rtl={false}
//       pauseOnFocusLoss
//       draggable
//       pauseOnHover
//     />
//   </div>
// );

// export default Payment;



import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Payment.css';

// Initialize Stripe
const stripePromise = loadStripe('pk_test_51Q0TEXRvwjj18J6TooOsxJF8J8IweJyuMZdyc2p8M2bGJEihjAdAwbfUpavDZVfN9j5AAxUbOVt6JvjbHQSczIC600myHW2EBv');

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Fixed amount of $30 (in cents)
  const amount = 3000;
  
  // Package details (hardcoded to a specific package for now)
  const packageDetails = {
    name: 'Fixed $30 Package',
    description: 'Payment for a fixed package of $30'
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      // Create PaymentIntent with the fixed amount in cents
      const response = await axios.post('http://localhost:7100/api/payments/payment-intent', { amount });

      const { clientSecret } = response.data;

      // Confirm the payment with Stripe
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (error) {
        toast.error('Payment failed: ' + error.message);
      } else if (paymentIntent.status === 'succeeded') {
        toast.success(`Payment of $${amount / 100} successful! Thank you for your purchase.`);
        navigate('/'); 
      } else {
        toast.error('Payment failed. Please try again.');
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <h4 className="mb-4">Enter Card Details</h4>
      <div className="form-group mb-3">
        <CardElement className="form-control" />
      </div>
      <div className="mb-3">
        <p><strong>Package Name:</strong> {packageDetails.name}</p>
        <p><strong>Description:</strong> {packageDetails.description}</p>
      </div>
      <button type="submit" className="btn btn-primary w-100" disabled={!stripe || loading}>
        {loading ? 'Processing...' : `Pay $${(amount / 100).toFixed(2)}`}  
      </button>
    </form>
  );
};

const Payment = () => (
  <div className="container payment-container">
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card p-4 mt-5">
          <h2 className="text-center mb-4">Complete Your Payment</h2>
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </div>
      </div>
    </div>
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  </div>
);

export default Payment;

