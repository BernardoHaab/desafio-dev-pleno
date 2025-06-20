import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { authService } from './services/authService';

const privateRoutes = ['/dashboard'];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isPrivateRoute = privateRoutes.includes(path);

  const cookie = (await cookies()).get('token')?.value;

  if (isPrivateRoute) {
    const isTokenValid = await authService.serverIsValidToken(cookie || '');

    if (!isTokenValid) {
      return NextResponse.redirect(new URL('/login', req.nextUrl));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard'],
};
