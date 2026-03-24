// GET /api/processes
//
// Query params: topicId[] (array), semester (number)
// - Filter by semester range and topics.
// - Return: Process[] = { id, slug, title, overview, semester_min, semester_max, topics[] }
// - Does NOT include full steps_json (use /api/processes/[slug] for that).

import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ message: 'not implemented' }, { status: 501 })
}
