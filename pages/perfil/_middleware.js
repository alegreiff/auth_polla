import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req, ev) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  console.log(session);

  if (!session) {
    const url = req.nextUrl.clone();
    url.pathname = '/signin';
    console.log('URL', url);
    return NextResponse.redirect(url);
  } else {
    return NextResponse.next();
  }
}
