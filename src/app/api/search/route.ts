// GET /api/search
//
// Query params: q (string), type[] (content type filter), semester (number), topic (string)
// - Query FTS5 virtual tables for documents, contacts, processes, help_articles, platforms.
// - Apply prefix matching for terms >= 4 characters (e.g. "enrol*").
// - Return: SearchResult[] = { id, contentType, title, summary, actionUrl }
// - Ordered by FTS5 rank score.

import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ message: 'not implemented' }, { status: 501 })
}
