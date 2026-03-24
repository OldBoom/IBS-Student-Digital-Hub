// Admin contacts API — requires role = 'admin'.
//
// POST   /api/admin/contacts         — create contact; sets source_type = 'manual'.
// PUT    /api/admin/contacts/[id]    — update contact; sets updated_at.
// DELETE /api/admin/contacts/[id]    — delete contact.
//
// All writes: validate body via ContactSchema (zod), log to admin_audit_log, sanitize URLs.
// Returns 403 if session role !== 'admin'.

import { NextResponse } from 'next/server'

export async function POST() {
  return NextResponse.json({ message: 'not implemented' }, { status: 501 })
}
