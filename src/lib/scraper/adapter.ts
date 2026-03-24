// Scraper adapter interface.
//
// Every legacy source adapter MUST implement ScraperAdapter.
// Adapters live in src/scripts/scraper/ (one file per source).
//
// ScraperResult = {
//   inserted: number,
//   updated: number,
//   errors: string[]   — human-readable error messages, stored in scraper_jobs.error_log
// }
//
// Adapter responsibilities:
// - Fetch and parse HTML from legacy source using cheerio.
// - Normalize data to match Drizzle entity schema.
// - Call conflict.ts upsert helper (respects source_type = 'manual' protection).
// - Handle HTTP failures and parse errors without throwing; push to errors[].

export type ScraperResult = {
  inserted: number
  updated: number
  errors: string[]
}

export type ScraperAdapter = {
  sourceName: string
  run(): Promise<ScraperResult>
}

// TODO: implement first legacy source adapter in src/scripts/scraper/
