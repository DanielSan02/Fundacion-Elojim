// middleware.js
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request) {
  // Obtener la ruta solicitada
  const path = request.nextUrl.pathname;
  
  // Definir rutas públicas (no requieren autenticación)
  const publicPaths = ['/auth/login', '/auth/register', '/', '/about', '/news', '/programas'];
  const isPublicPath = publicPaths.includes(path) || 
                      path.startsWith('/api/') ||
                      !path.startsWith('/dashboard') && !path.startsWith('/admin');
  
  // Obtener el token de sesión
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  });
  
  // Si el usuario no está autenticado y la ruta no es pública, redirigir al login
  if (!token && !isPublicPath) {
    const url = new URL('/auth/login', request.url);
    url.searchParams.set('callbackUrl', encodeURI(request.url));
    return NextResponse.redirect(url);
  }
  
  // Si el usuario está autenticado pero intenta acceder a rutas de autenticación
  if (token && (path === '/auth/login' || path === '/auth/register')) {
    // Redirigir según el rol
    if (token.rolId === 1) {
      return NextResponse.redirect(new URL('/admin', request.url));
    } else if (token.rolId === 2) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    } else {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
  
  // Verificar acceso al dashboard (solo para usuarios con rolId 2)
  if (path.startsWith('/dashboard') && token?.rolId !== 2) {
    // Redirigir a página de acceso denegado
    return NextResponse.redirect(new URL('/access-denied', request.url));
  }
  
  // Verificar acceso al panel admin (solo para usuarios con rolId 1)
  if (path.startsWith('/admin') && token?.rolId !== 1) {
    // Redirigir a página de acceso denegado
    return NextResponse.redirect(new URL('/access-denied', request.url));
  }
  
  return NextResponse.next();
}

// Configurar qué rutas serán interceptadas por el middleware
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/auth/login',
    '/auth/register',
  ]
};