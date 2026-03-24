// GET /api/health
//
// - Check DB connectivity (run a trivial query).
// - Return: { status: 'ok', db: 'connected', timestamp: ISO string } or 500 if DB unreachable.
// - Used by deployment runbook smoke tests.

import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ message: 'not implemented' }, { status: 501 })
}
