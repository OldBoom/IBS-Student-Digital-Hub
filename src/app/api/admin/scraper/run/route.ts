// POST /api/admin/scraper/run
//
// - Requires role = 'admin'.
// - Insert a new scraper_jobs row with status = 'running'.
// - Trigger scraper adapter (see lib/scraper/adapter.ts).
// - Update scraper_jobs row on completion: status, finished_at, inserted_count, updated_count, error_log.
// - Return: { jobId: string }

import { NextResponse } from 'next/server'

export async function POST() {
  return NextResponse.json({ message: 'not implemented' }, { status: 501 })
}
