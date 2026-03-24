// GET /api/dashboard
//
// - Requires authenticated student session.
// - Reads semester from session.
// - Returns: top 3 documents, top 3 processes, all platforms — all filtered by semester.
// - Guard: role must be 'student' or 'admin'; else 401.

import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ message: 'not implemented' }, { status: 501 })
}
