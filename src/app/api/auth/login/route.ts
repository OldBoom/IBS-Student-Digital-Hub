// POST /api/auth/login
//
// Body: { student_id: string, semester: number }
// - Validate body with zod StudentLoginSchema.
// - Query students table by student_id.
// - Issue JWT / session cookie with { userId, role, semester }.
// - Returns: { role: 'student' | 'admin' } or 401 on failure.

import { NextResponse } from 'next/server'

export async function POST() {
  return NextResponse.json({ message: 'not implemented' }, { status: 501 })
}
