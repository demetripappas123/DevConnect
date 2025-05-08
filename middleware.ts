import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Add paths that don't require authentication
const publicPaths = ['/auth']

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')
  const { pathname } = request.nextUrl

  // Check if the path is in the authenticated group
  const isAuthenticatedPath = pathname.startsWith('/dashboard') ||
    pathname.startsWith('/profile') ||
    pathname.startsWith('/create') ||
    pathname.startsWith('/feed') ||
    pathname.startsWith('/watch') ||
    pathname.startsWith('/explore')

  // If it's an authenticated path and there's no token, redirect to root (auth page)
  if (isAuthenticatedPath && !token) {
    const url = new URL('/', request.url)
    return NextResponse.redirect(url)
  }

  // If user is authenticated and tries to access root (auth page), redirect to dashboard
  if (pathname === '/' && token) {
    const url = new URL('/dashboard', request.url)
    return NextResponse.redirect(url)
  }

  // Allow public paths
  if (publicPaths.includes(pathname)) {
    // If user is authenticated and tries to access auth page, redirect to dashboard
    if (token) {
      const url = new URL('/dashboard', request.url)
      return NextResponse.redirect(url)
    }
    return NextResponse.next()
  }

  return NextResponse.next()
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
} 