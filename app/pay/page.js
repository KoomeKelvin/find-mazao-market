// app/pay/pay.js
'uses client'
import PaymentForm from '../components/initializepayment'; 
import {Box} from '@mui/material'

export default function PayPage() {
  return (
    <Box
    width="100vw"
    height="100vh"
    display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    gap={2}
  
    >
      <h1>Make a Payment</h1>
      <PaymentForm />
    </Box>
  );
}
