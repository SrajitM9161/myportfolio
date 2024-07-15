// src/pages/api/auth/login.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { login } from '../../../../actions/login';
import { setCookie } from 'nookies'; // Import nookies

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const data = req.body;
      const result = await login(data);

      if (result.error) {
        return res.status(400).json({ error: result.error });
      }

      // Set a cookie or token here
      setCookie({ res }, 'auth_token', 'your-generated-token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });

      return res.status(200).json({ success: result.success, user: result.user });
    } catch (error) {
      console.error('Error logging in:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  res.setHeader('Allow', ['POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
