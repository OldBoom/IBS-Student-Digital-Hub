// GET /api/platforms
//
// - Return all platforms ordered by name ASC.
// - Return: Platform[] = { id, name, purpose, url, usage_instructions }

import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ message: 'not implemented' }, { status: 501 })
}
