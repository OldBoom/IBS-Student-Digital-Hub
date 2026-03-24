// Admin help-articles API — requires role = 'admin'.
//
// POST   /api/admin/help-articles        — create.
// PUT    /api/admin/help-articles/[id]   — update.
// DELETE /api/admin/help-articles/[id]   — delete.
//
// Validate via HelpArticleSchema (zod). body_md stored as raw Markdown string.

import { NextResponse } from 'next/server'

export async function POST() {
  return NextResponse.json({ message: 'not implemented' }, { status: 501 })
}
