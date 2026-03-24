// Zod validation schemas for all primary entities.
//
// Exports one schema per entity. Used in all API route handlers before any DB write.
//
// Schemas to implement:
//   StudentLoginSchema     — { student_id: string, semester: number }
//   ContactSchema          — { full_name, department, email, office_hours?, notes?, topicIds[] }
//   DocumentSchema         — { title, description, file_url, semester_min, semester_max, topicIds[] }
//   ProcessSchema          — { slug, title, overview, steps: Step[], semester_min, semester_max, topicIds[] }
//   HelpArticleSchema      — { slug, title, body_md, target_audience: 'all'|'international'|'first_semester' }
//   PlatformSchema         — { name, purpose, url, usage_instructions }
//
// Step shape: { order: number, title: string, description: string, documentIds: string[], contactId?: string, warningNote?: string }

// TODO: implement all schemas using zod
