// GET /api/contacts
//
// Query params: topicId (string)
// - Join contacts with contact_topics where topic_id = topicId.
// - If no results → return hardcoded fallback administrative contact.
// - Return: Contact[] = { id, full_name, department, email, office_hours, notes }

import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ message: 'not implemented' }, { status: 501 })
}
