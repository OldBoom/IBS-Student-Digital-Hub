// Session utilities — read and write JWT/session cookies.
//
// Exports:
//   createSession(payload: SessionPayload): string   — sign JWT, return token string
//   readSession(request: Request): SessionPayload | null  — verify and decode JWT from cookie
//   destroySession(response: Response): void          — clear session cookie
//
// SessionPayload = { userId: string, role: 'student' | 'admin', semester: number }
// Uses jose library for JWT signing. Secret from SESSION_SECRET env var.
// TTL from SESSION_TTL_HOURS env var (default 24h).

export type SessionPayload = {
  userId: string
  role: 'student' | 'admin'
  semester: number
}

// TODO: implement createSession, readSession, destroySession
