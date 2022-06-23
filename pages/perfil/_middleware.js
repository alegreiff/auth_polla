import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req, ev) {
  const secret = process.env.NEXTAUTH_SECRET;
  const token = await getToken({ req, secret });

  if (token) {
    //console.log('OK JSON Web Token', JSON.stringify(token, null, 2));

    /* const url = req.nextUrl.clone();
    url.pathname = `/api/user/${token.user._id}`;
    const response = await fetch(url.href);
    const data = await response.json();
    if (data) {
      //console.log('PROFILE', data.perfil.pronos);
    } */

    return NextResponse.next();
  } else {
    const url = req.nextUrl.clone();
    url.pathname = '/pollero/signin';
    console.log('ERROR TOKEN goto', url.href);
    return NextResponse.redirect(url.href);
  }
}
