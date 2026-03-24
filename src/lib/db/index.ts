// Database client — single Drizzle + better-sqlite3 instance.
//
// - Reads DATABASE_URL from environment (fail-fast if missing).
// - Exports `db` as the shared Drizzle client used across all route handlers and lib modules.
// - Import as: import { db } from '@/lib/db'

export const db = null // TODO: replace with drizzle(new Database(process.env.DATABASE_URL))
