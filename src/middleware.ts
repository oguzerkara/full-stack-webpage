import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const segments = pathname.split('/');
  const locale = segments[1];
  const path = segments[2];
  
  const isPublicPath = ['login', 'register'].includes(path);
  const token = request.cookies.get('token')?.value;

  // Authentication logic
  if (token) {
    if (isPublicPath) {
      // User is logged in but trying to access a public page (e.g., login or register)
      return NextResponse.redirect(new URL(`/${locale}`, request.url));
    }
  } else if (!isPublicPath && path === 'profile') {
    // User is not logged in and trying to access a protected page (e.g., profile)
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
  }

  // Internationalization middleware
  const intlMiddleware = createIntlMiddleware({
    locales: ['en', 'de'],
    defaultLocale: 'en',
  });

  return intlMiddleware(request as any);
}

export const config = {
  matcher: [
    '/',
    '/(en|de)',
    '/(en|de)/profile',
    '/(en|de)/profile/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico|_next|munchen|images|fonts|THD-Logo).*)',
  ],
};
