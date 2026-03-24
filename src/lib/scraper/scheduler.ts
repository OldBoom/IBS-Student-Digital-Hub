// Scraper scheduler — runs adapter on a cron schedule.
//
// - Reads SCRAPER_CRON env var for cron expression (e.g. '0 2 * * *' = daily at 2am).
// - Uses node-cron to register the job.
// - On each tick: call POST /api/admin/scraper/run internally or invoke adapter directly.
// - Scheduler MUST NOT start in test environment (NODE_ENV === 'test').
//
// Start the scheduler by importing this module in the app entrypoint or a server-only init file.

// TODO: implement scheduler using node-cron
