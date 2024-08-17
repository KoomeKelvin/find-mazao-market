
// app/api/paystack/route.js
import { NextResponse } from 'next/server';
import https from 'https';

export async function POST(request) {
  console.log('on track')
  const { email, amount } = await request.json();

  // Paystack expects the amount in kobo (so multiply by 100)
  const paystackAmount = amount * 100;

  const params = JSON.stringify({
    email: email,
    amount: paystackAmount,
  });

  const options = {
    hostname: 'api.paystack.co',
    port: 443,
    path: '/transaction/initialize',
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`, // Ensure to store this key in your environment variables
      'Content-Type': 'application/json',
    },
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(NextResponse.json(JSON.parse(data)));
        } else {
          resolve(
            NextResponse.json({ error: 'Payment initiation failed' }, { status: res.statusCode })
          );
        }
      });
    });

    req.on('error', (e) => {
      console.error(e);
      resolve(
        NextResponse.json({ error: 'Payment initiation error' }, { status: 500 })
      );
    });

    req.write(params);
    req.end();
  });
}
