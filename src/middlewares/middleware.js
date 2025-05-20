// middleware.js
/*import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request) {
  const path = request.nextUrl.pathname;

  // Rutas protegidas por roles
  const isDashboard = path.startsWith('/dashboard');
  const isAdmin = path.startsWith('/admin');
  const isAuthPage = path === '/auth/login' || path === '/auth/register';

  // Obtener token
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Si no hay token y se accede a ruta protegida, redirigir al login
  if (!token && (isDashboard || isAdmin)) {
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('callbackUrl', encodeURIComponent(request.url));
    return NextResponse.redirect(loginUrl);
  }

  // Si hay token y se intenta acceder a login o register, redirigir por rol
  if (token && isAuthPage) {
    if (token.rolId === 1) {
      return NextResponse.redirect(new URL('/admin', request.url));
    } else if (token.rolId === 2) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    } else {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // Validación de acceso por rol
  if (isDashboard && token?.rolId !== 2) {
    return NextResponse.redirect(new URL('/access-denied', request.url));
  }

  if (isAdmin && token?.rolId !== 3) {
    return NextResponse.redirect(new URL('/access-denied', request.url));
  }

  // Permitir el paso si todo es válido
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/auth/login',
    '/auth/register',
  ]
};
*/