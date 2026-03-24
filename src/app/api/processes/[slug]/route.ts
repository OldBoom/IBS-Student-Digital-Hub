// GET /api/processes/[slug]
//
// - Fetch process by slug.
// - Parse steps_json into Step[].
// - Resolve each step's document IDs → Document[], contact ID → Contact.
// - Return: ProcessDetail = { ...Process, steps: ResolvedStep[] }

import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ message: 'not implemented' }, { status: 501 })
}
