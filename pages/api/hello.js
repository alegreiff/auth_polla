// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getToken } from 'next-auth/jwt';

export default async function handler(req, res) {
  const secret = process.env.NEXTAUTH_SECRET;
  const token = await getToken({ req, secret });
  if (token) {
    // Signed in
    // console.log('JSON Web Token', JSON.stringify(token, null, 2));
    res.status(200).json({ token });
  } else {
    // Not Signed in
    res.status(200).json({ message: 'No token' });
  }
  res.end();
  //res.status(200).json({ name: 'John Doe' })
}
