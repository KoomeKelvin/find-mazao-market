// components/PaymentForm.js
'use client'
import { useState } from 'react';
import { TextField, Button, Typography, Container, Box } from '@mui/material';

export default function PaymentForm() {
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear any previous messages
    setMessage(null);

    try {
      // Send the data to the API endpoint
      const response = await fetch('/api/paystack', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          amount: parseFloat(amount), // Ensure amount is a number
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // If the request is successful, redirect the user to the payment gateway
        if (data.status === true) {
          window.location.href = data.data.authorization_url;
        } else {
          setMessage('Payment initiation failed');
        }
      } else {
        // Handle error response
        setMessage(data.error || 'An error occurred');
      }
    } catch (error) {
      setMessage('An unexpected error occurred');
      console.error('Error:', error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: 3,
          boxShadow: 3,
          borderRadius: 1,
          bgcolor: 'background.paper',
        }}
      >
        <Typography component="h1" variant="h5">
          Make a Payment
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 1 }}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="amount"
            label="Amount"
            name="amount"
            type="number"
            InputProps={{ inputProps: { min: 0 } }} // Ensure non-negative values
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Pay Now
          </Button>
          {message && <Typography color="error" variant="body2" sx={{ mt: 2 }}>{message}</Typography>}
        </Box>
      </Box>
    </Container>
  );
}
