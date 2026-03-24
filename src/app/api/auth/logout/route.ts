// POST /api/auth/logout
//
// - Invalidate session / clear JWT cookie.
// - Returns: 200 on success.

import { NextResponse } from 'next/server'

export async function POST() {
  return NextResponse.json({ message: 'not implemented' }, { status: 501 })
}
