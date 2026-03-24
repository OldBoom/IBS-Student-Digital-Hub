// GET /api/help-articles/[slug]
//
// - Fetch single help article by slug.
// - Return: HelpArticleDetail = { id, slug, title, body_md, target_audience }

import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ message: 'not implemented' }, { status: 501 })
}
