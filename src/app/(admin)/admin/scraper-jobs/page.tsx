// /admin/scraper-jobs — Scraper job history and trigger.
//
// - Table: source_name, status (running/success/failed badge), started_at, finished_at, inserted_count, updated_count.
// - "Run Scraper" button → POST /api/admin/scraper/run → disabled while status = 'running'.
// - Auto-refresh polling every 5s while any job has status = 'running'.
// - Expandable error log drawer for failed jobs.

export default function AdminScraperJobsPage() {
  return null
}
