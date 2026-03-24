// Admin processes API — requires role = 'admin'.
//
// POST   /api/admin/processes        — create; serialize steps[] to steps_json.
// PUT    /api/admin/processes/[id]   — update.
// DELETE /api/admin/processes/[id]   — delete.
//
// Validate via ProcessSchema (zod). steps_json shape: Step[] = { order, title, description, documentIds[], contactId?, warningNote? }

import { NextResponse } from 'next/server'

export async function POST() {
  return NextResponse.json({ message: 'not implemented' }, { status: 501 })
}
