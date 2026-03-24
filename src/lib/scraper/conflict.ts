// Conflict resolution for scraper upserts.
//
// Rule: records where source_type = 'manual' MUST NOT be overwritten by scraper runs.
// Rule: records where source_type = 'scraped' MAY be updated by scraper runs.
//
// Exports:
//   safeUpsert(table, record): Promise<'inserted' | 'updated' | 'skipped'>
//
// Logic:
//   1. Check if record with same identity key exists.
//   2. If exists and source_type = 'manual' → return 'skipped'.
//   3. If exists and source_type = 'scraped' → update, return 'updated'.
//   4. If not exists → insert with source_type = 'scraped', return 'inserted'.

// TODO: implement safeUpsert()
