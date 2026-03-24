// GET /api/help-articles
//
// Query params: category (string), target_audience ('all' | 'international' | 'first_semester')
// - Filter help_articles by target_audience if provided.
// - Return: HelpArticle[] = { id, slug, title, target_audience } (no body_md in list view)

import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ message: 'not implemented' }, { status: 501 })
}
