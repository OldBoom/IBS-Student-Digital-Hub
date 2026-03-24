// GET /api/documents
//
// Query params: topicId[] (array), semester (number)
// - Filter documents by semester range (semester_min <= semester <= semester_max).
// - Filter by topic via document_topics join if topicId[] provided.
// - Return: Document[] = { id, title, description, file_url, semester_min, semester_max }

import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ message: 'not implemented' }, { status: 501 })
}
