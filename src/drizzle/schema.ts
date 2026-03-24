// Drizzle ORM schema — defines all database tables.
//
// Tables to define (see dev plan Section 5.3 for full column contracts):
//
//   students        (id, student_id, semester, role, created_at, updated_at)
//   topics          (id, slug, title, description)
//   contacts        (id, full_name, department, email, office_hours, notes, source_type, created_at, updated_at)
//   contact_topics  (contact_id, topic_id)           ← many-to-many join
//   documents       (id, title, description, file_url, semester_min, semester_max, source_type, created_at, updated_at)
//   document_topics (document_id, topic_id)           ← many-to-many join
//   processes       (id, slug, title, overview, steps_json, semester_min, semester_max, source_type, created_at, updated_at)
//   process_topics  (process_id, topic_id)            ← many-to-many join
//   platforms       (id, name, purpose, url, usage_instructions, source_type, created_at, updated_at)
//   help_articles   (id, slug, title, body_md, target_audience, source_type, created_at, updated_at)
//   scraper_jobs    (id, source_name, status, started_at, finished_at, inserted_count, updated_count, error_log)
//   admin_audit_log (id, actor_id, action, entity_type, entity_id, timestamp)
//
// FTS5 virtual tables (raw SQL in migrations, not Drizzle schema):
//   contacts_fts, documents_fts, processes_fts, help_articles_fts, platforms_fts
//
// source_type values: 'manual' | 'scraped'
// target_audience values: 'all' | 'international' | 'first_semester'
// scraper_jobs.status values: 'running' | 'success' | 'failed'

// TODO: implement all table definitions using drizzle-orm/sqlite-core
