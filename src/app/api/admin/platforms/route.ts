// Admin platforms API — requires role = 'admin'.
//
// POST   /api/admin/platforms        — create.
// PUT    /api/admin/platforms/[id]   — update.
// DELETE /api/admin/platforms/[id]   — delete.
//
// Sanitize url field before write. Validate via PlatformSchema (zod).

import { NextResponse } from 'next/server'

export async function POST() {
  return NextResponse.json({ message: 'not implemented' }, { status: 501 })
}
