import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req, ev) {
  const secret = process.env.NEXTAUTH_SECRET;
  const token = await getToken({ req, secret });

  if (token) {
    console.log('OK JSON Web Token', JSON.stringify(token, null, 2));
    return NextResponse.next();
  } else {
    const url = req.nextUrl.clone();
    url.pathname = '/pollero/signin';
    console.log('ERROR TOKEN goto', url);
    return NextResponse.redirect(url);
  }

  /* if (!session) {
    const url = req.nextUrl.clone();
    url.pathname = '/pollero/signin';
    console.log('URL', url);
    return NextResponse.redirect(url);
  } else {
    console.log('JSON Web Token', JSON.stringify(session, null, 2));
    //console.log('hurrah');
    return NextResponse.next();
  } */
}
