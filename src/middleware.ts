// Middleware — runs on every matched request before it reaches a route handler or page.
//
// Responsibilities:
// - Read session cookie / JWT from request headers.
// - If route is under /(public)/* and user is not authenticated → redirect to /login.
// - If route is under /(admin)/* and user role !== 'admin' → redirect to /admin/login.
// - Pass through all /api/auth/* routes without auth check (public login endpoints).
//
// See: lib/auth/session.ts for session read/write utilities.

export function middleware() {
  // TODO: implement
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
