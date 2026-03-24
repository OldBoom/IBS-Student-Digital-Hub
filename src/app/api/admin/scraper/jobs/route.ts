// GET /api/admin/scraper/jobs
//
// - Requires role = 'admin'.
// - Return paginated list of scraper_jobs ordered by started_at DESC.
// - Query params: page (number), limit (number, default 20).
// - Return: { jobs: ScraperJob[], total: number }

// GET /api/admin/scraper/jobs/[id]
// - Return single job including full error_log field.

import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ message: 'not implemented' }, { status: 501 })
}
