// Admin documents API — requires role = 'admin'.
//
// POST   /api/admin/documents        — create; sets source_type = 'manual'.
// PUT    /api/admin/documents/[id]   — update; sets updated_at.
// DELETE /api/admin/documents/[id]   — delete.
//
// Sanitize file_url before write. Validate via DocumentSchema (zod).

import { NextResponse } from 'next/server'

export async function POST() {
  return NextResponse.json({ message: 'not implemented' }, { status: 501 })
}
