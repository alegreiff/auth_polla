import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req, ev) {
  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    encryption: true,
  });
  console.log('Desde MiddleWare', session, process.env.NEXTAUTH_SECRET);

  if (!session) {
    console.log('JSON Web Token', JSON.stringify(session, null, 2));

    const url = req.nextUrl.clone();
    url.pathname = '/pollero/signin';
    console.log('URL', url);
    return NextResponse.redirect(url);
  } else {
    //console.log('hurrah');
    return NextResponse.next();
  }
}
