import React, { useState } from 'react';
import CheckOut from './CheckOut';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { loadStripe } from '@stripe/stripe-js';
import { useLocation } from 'react-router-dom';

// Initialize Stripe
const stripePromise = loadStripe("pk_test_51Pez84Glv44VgkWUycmbDjCxdByoFchGmuMVBNdVPIQozAh7pkufsnQSRd3VXmdZ2ScohxRPcdzPmbkHv1XuJSM900NpTxkMBw");

export default function Payment() {
  const location = useLocation();
  const { Data } = location.state;
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expDate, setExpDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cardName || !cardNumber || !expDate || !cvv) {
      setSnackbarMessage('Please fill all fields');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    if (cardNumber.length < 3) {
      setSnackbarMessage('Invalid card number');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    try {
      const stripe = await stripePromise;
      const response = await fetch("http://localhost:5000/api/users/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ products: Data }),
      });
      const session = await response.json();
      const result = await stripe.redirectToCheckout({ sessionId: session.id });
      if (result.error) {
        console.error(result.error.message);
      }
    } catch (error) {
      console.error("Error during payment:", error);
      setSnackbarMessage('Payment failed');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => setSnackbarOpen(false);

  return (
    <div>
      <CheckOut Shipping ConfirmOrder Payment />
      <div>
        <form onSubmit={handleSubmit}>
          <Typography variant="h6" gutterBottom>
            Payment method
            <i className="fa-solid fa-credit-card mx-2" style={{ color: 'gray' }}></i>
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                required
                id="cardName"
                label="Name on card"
                fullWidth
                autoComplete="cc-name"
                variant="standard"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                id="cardNumber"
                label="Card number"
                fullWidth
                autoComplete="cc-number"
                variant="standard"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                id="expDate"
                label="Expiry date"
                fullWidth
                autoComplete="cc-exp"
                variant="standard"
                value={expDate}
                onChange={(e) => setExpDate(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                id="cvv"
                label="CVV"
                helperText="Last three digits on signature strip"
                fullWidth
                autoComplete="cc-csc"
                variant="standard"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit">
                Proceed to Payment
              </Button>
            </Grid>
          </Grid>
        </form>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}
