# IBS Student Digital Hub - Sprint Plan

## Project Metadata

| Field | Value |
|---|---|
| Project | IBS Student Digital Hub |
| Start Date | 2026-03-24 |
| Hard Launch | 2026-07-03 |
| Total Duration | 14 weeks + 4-day buffer |
| Sprint Length | 2 weeks |
| Total Sprints | 7 (Sprint 0 – Sprint 6) |
| Team Size | 5 |

## Team Roles

| ID | Role | Responsibility Scope |
|---|---|---|
| Lead | Fullstack Lead | Architecture, cross-cutting concerns, integration glue, unblocking |
| FE1 | Frontend Developer 1 | Pages, routing, primary user-facing UI |
| FE2 | Frontend Developer 2 | Components, secondary pages, UX polish |
| BE1 | Backend Developer 1 | Route handlers, auth, database schema |
| BE2 | Backend Developer 2 | Business logic, validation, secondary APIs |

## Timeline Overview

```
Sprint 0   2026-03-24 – 2026-04-06   Foundation Setup
Sprint 1   2026-04-07 – 2026-04-20   Authentication + Dashboard
Sprint 2   2026-04-21 – 2026-05-04   Search + Contact + Documents
Sprint 3   2026-05-05 – 2026-05-18   Processes + Help + Platforms
Sprint 4   2026-05-19 – 2026-06-01   Admin Panel + CRUD
Sprint 5   2026-06-02 – 2026-06-15   Scraper Integration
Sprint 6   2026-06-16 – 2026-06-29   Hardening + Release Readiness
Buffer     2026-06-30 – 2026-07-03   Deployment Verification + Hotfixes
```

---

## Sprint 0 — Foundation Setup

**Dates:** 2026-03-24 – 2026-04-06  
**Goal:** Project skeleton is initialized, typed, linted, and connected to a migrated SQLite database with full schema in place.

### Tasks

#### Lead
- Initialize Next.js 14+ project with App Router and TypeScript strict mode enabled.
- Configure ESLint and Prettier with enforced rules.
- Define final folder structure matching `docs/ibs-student-hub-dev-plan.md` Section 9.
- Initialize Drizzle ORM with SQLite adapter and verify connection.
- Write first migration: create all core tables (`students`, `contacts`, `topics`, `contact_topics`, `documents`, `document_topics`, `processes`, `process_topics`, `platforms`, `help_articles`, `scraper_jobs`).
- Establish base seed script for development data.

#### FE1
- Install and configure TailwindCSS with base theme tokens (colors, spacing, typography).
- Create root layout with `<html>`, `<body>`, font setup, and global styles.
- Create routing stubs for all student-facing pages: `/login`, `/dashboard`, `/search`, `/contacts`, `/documents`, `/processes`, `/help-center`, `/platforms`.
- Verify all stub routes render without errors.

#### FE2
- Create routing stubs for all admin pages: `/admin/login`, `/admin/dashboard`, `/admin/contacts`, `/admin/documents`, `/admin/processes`, `/admin/help-articles`, `/admin/platforms`, `/admin/scraper-jobs`.
- Define base reusable UI components: `Button`, `Input`, `Card`, `Badge`, `PageHeader`.
- Create `components/` folder structure with index exports.

#### BE1
- Write Drizzle schema file (`drizzle/schema.ts`) covering all tables per Section 5.3 of the dev plan.
- Implement migration runner configuration (`drizzle.config.ts`).
- Verify all table definitions compile and migrate successfully against local SQLite file.
- Add `db` singleton export in `lib/db/index.ts`.

#### BE2
- Define zod schemas for all primary content entities: `Student`, `Contact`, `Document`, `Process`, `Platform`, `HelpArticle`, `Topic`.
- Create `lib/validation/` module with named exports per entity.
- Configure environment variable loading (`lib/config.ts`): `DATABASE_URL`, `SESSION_SECRET`, `NODE_ENV`.
- Validate required env vars at startup (fail-fast).

### Dependencies
- BE1 MUST complete schema and migration before Lead runs seed script.
- FE1 MUST complete TailwindCSS setup before FE2 builds components.
- Lead MUST commit folder structure before FE1/FE2 create stub files.

### Definition of Done

- [ ] `npm run dev` starts without errors.
- [ ] `npm run lint` passes with zero warnings.
- [ ] TypeScript strict mode compiles with zero errors.
- [ ] Drizzle migration runs successfully and all tables exist in SQLite file.
- [ ] All student-facing and admin route stubs return 200 with placeholder content.
- [ ] All zod schemas export without type errors.
- [ ] Required env vars fail-fast when missing.

---

## Sprint 1 — Authentication + Dashboard

**Dates:** 2026-04-07 – 2026-04-20  
**Goal:** Students and admins can log in with role-based sessions; authenticated students see a personalized, semester-filtered dashboard.

### Tasks

#### Lead
- Design and implement session strategy (JWT or server-side session with `SESSION_SECRET`).
- Create middleware (`middleware.ts`) enforcing role-based route protection for `(public)` and `(admin)` route groups.
- Define `AuthContext` or session utility (`lib/auth/session.ts`) returning `{ userId, role, semester }`.
- Wire middleware to redirect unauthenticated users to `/login` (students) or `/admin/login` (admins).

#### FE1
- Build `/login` page: `student_id` + `semester` form with validation feedback.
- Build `/dashboard` page layout: header, sidebar navigation, and widget grid.
- Implement dashboard widgets: "Recent Documents", "Upcoming Processes", "Quick Links".
- Connect dashboard page to `GET /api/dashboard` and render semester-filtered data.

#### FE2
- Build sidebar navigation component with active-route highlighting.
- Build `UserBadge` component displaying logged-in student's `student_id` and semester.
- Implement logout button calling `POST /api/auth/logout` and redirecting to `/login`.
- Apply responsive layout breakpoints to dashboard and login pages.

#### BE1
- Implement `POST /api/auth/login`: validate body via zod, query `students` table, issue session/JWT, return role.
- Implement `POST /api/auth/logout`: invalidate session/JWT, clear cookie.
- Implement `GET /api/dashboard`: return semester-filtered shortcuts (top 3 documents, top 3 processes, all platforms).
- Enforce `role === 'student'` guard on `/api/dashboard`.

#### BE2
- Add `students` table seed entries for `student` and `admin` roles.
- Write unit tests for login validation: missing fields, invalid `student_id`, expired session.
- Implement session TTL configuration (default: 24h); value MUST come from env var `SESSION_TTL_HOURS`.

### Dependencies
- Lead MUST complete middleware and `lib/auth/session.ts` before BE1 implements route guards.
- BE1 MUST complete `POST /api/auth/login` before FE1 can wire login form.
- FE1 MUST complete dashboard layout before FE2 adds sidebar and user badge.

### Definition of Done

- [ ] Student can log in with valid `student_id` + `semester` and land on `/dashboard`.
- [ ] Invalid credentials return 401 with error message rendered on login form.
- [ ] Unauthenticated access to `/dashboard` redirects to `/login`.
- [ ] Dashboard displays semester-filtered documents, processes, and platforms.
- [ ] Admin login redirects to `/admin/dashboard` (stub).
- [ ] Logout clears session and redirects to `/login`.
- [ ] Session expires after configured TTL.

---

## Sprint 2 — Search + Contact Finder + Document Center

**Dates:** 2026-04-21 – 2026-05-04  
**Goal:** Students can search across all content types using full-text search, find contacts by topic, and browse/download documents with filtering.

### Tasks

#### Lead
- Configure SQLite FTS5 virtual tables for `documents`, `contacts`, `help_articles`, `processes`, and `platforms` in schema.
- Implement search ranking strategy in `lib/search/index.ts`: FTS5 `rank` column ordering with fallback BM25.
- Define unified `SearchResult` type: `{ id, contentType, title, summary, actionUrl }`.
- Write migration adding FTS5 virtual tables and triggers to keep them in sync.

#### FE1
- Build `/search` page: query input with debounce (300ms), result list grouped by content type.
- Build `SearchResultCard` component rendering `contentType` badge, title, summary, and action link.
- Implement filter bar on `/search`: content type checkboxes, semester select, topic multiselect.
- Handle empty-state and loading-state for search results.

#### FE2
- Build `/contacts` page: topic selector dropdown and results grid.
- Build `ContactCard` component: full name, department, email, office hours, responsibility scope.
- Implement empty-state fallback on `/contacts` showing administrative contact when no mapping found.
- Build `/documents` page: document list with topic filter and semester filter.
- Build `DocumentCard` component: title, description, semester range, download button.

#### BE1
- Implement `GET /api/search`: accept `q`, `type[]`, `semester`, `topic` query params; query FTS5; return `SearchResult[]`.
- Implement typo-tolerance via FTS5 prefix queries (`term*`) where term length ≥ 4.
- Implement `GET /api/contacts`: accept `topicId` query param; return contacts with mapped topics; return fallback if empty.

#### BE2
- Implement `GET /api/documents`: accept `topicId[]` and `semester` query params; return filtered document list.
- Write integration tests for `/api/search`: single-type query, cross-type query, empty result, filter combinations.
- Write integration test for `/api/contacts`: topic match, no-match fallback.

### Dependencies
- Lead MUST complete FTS5 migration before BE1 implements `/api/search`.
- BE1 MUST deliver `/api/contacts` before FE2 wires `/contacts` page.
- BE2 MUST deliver `/api/documents` before FE2 wires `/documents` page.

### Definition of Done

- [ ] Search returns results across all five content types.
- [ ] Search filters by content type, semester, and topic produce correct subsets.
- [ ] FTS5 prefix matching handles partial queries (≥ 4 characters).
- [ ] `/contacts` returns mapped contacts for a given topic.
- [ ] `/contacts` returns fallback contact when topic has no mapping.
- [ ] `/documents` filters by topic and semester correctly.
- [ ] All download links on `DocumentCard` are functional.
- [ ] Empty and loading states are rendered on all three pages.

---

## Sprint 3 — Process Guides + Help Center + Platform Hub

**Dates:** 2026-05-05 – 2026-05-18  
**Goal:** Students can follow structured step-by-step process guides, access the help center with categorized articles, and view all academic platforms with usage instructions.

### Tasks

#### Lead
- Define `steps_json` schema for `processes` table: `Step[]` where `Step = { order, title, description, documentIds[], contactId? }`.
- Implement `lib/db/processes.ts` query helper resolving step-level document and contact references.
- Implement Markdown rendering utility (`lib/markdown.ts`) for `help_articles.body_md` using `remark` or `marked`.

#### FE1
- Build `/processes` page: list of available guides with topic and semester filters.
- Build `/processes/[slug]` page: step-by-step guide renderer.
- Build `ProcessStep` component: step number, title, description, linked documents, linked contact.
- Add warning note rendering for steps containing `warningNote` field.

#### FE2
- Build `/help-center` page: category navigation sidebar and article list.
- Build `/help-center/[slug]` page: article detail with Markdown body rendering.
- Apply `target_audience` filter toggle: `All`, `International`, `First Semester`.
- Build `/platforms` page: card grid listing all platforms.
- Build `PlatformCard` component: name, purpose, direct link, usage instructions, when-to-use context.

#### BE1
- Implement `GET /api/processes`: accept `topicId[]` and `semester` query params; return process list.
- Implement `GET /api/processes/[slug]`: return full process with resolved step document and contact references.
- Implement `GET /api/help-articles`: accept `category` and `target_audience` query params.

#### BE2
- Implement `GET /api/help-articles/[slug]`: return single article with `body_md`.
- Implement `GET /api/platforms`: return all platform entries ordered by name.
- Write integration tests for `/api/processes/[slug]` step resolution with embedded contacts and documents.

### Dependencies
- Lead MUST finalize `steps_json` schema before BE1 implements process detail endpoint.
- Lead MUST deliver `lib/markdown.ts` before FE2 renders help article pages.
- BE1 MUST complete `/api/processes/[slug]` before FE1 builds step renderer.

### Definition of Done

- [ ] `/processes` lists guides filterable by topic and semester.
- [ ] `/processes/[slug]` renders all steps with linked documents and contacts.
- [ ] Warning notes render visually distinct from standard step content.
- [ ] `/help-center` displays categories and filters by `target_audience`.
- [ ] `/help-center/[slug]` renders Markdown body correctly.
- [ ] `/platforms` lists all platforms with purpose, link, and instructions.
- [ ] All API endpoints return correct data shapes validated by TypeScript types.

---

## Sprint 4 — Admin Panel + CRUD

**Dates:** 2026-05-19 – 2026-06-01  
**Goal:** Admins can authenticate, and maintain all content types (contacts, documents, processes, help articles, platforms) via full CRUD UI without direct database access.

### Tasks

#### Lead
- Implement admin session strategy: separate `role === 'admin'` guard enforced server-side on all `/admin/*` and `/api/admin/*` routes.
- Implement `source_type` write logic: manual admin saves MUST set `source_type = 'manual'` and persist `updated_at`.
- Add admin action logging: every POST/PUT/DELETE on admin routes MUST write actor `student_id` and timestamp to a `admin_audit_log` table.
- Create Drizzle migration for `admin_audit_log(id, actor_id, action, entity_type, entity_id, timestamp)`.

#### FE1
- Build `/admin/dashboard` page: summary counts per entity type, recent audit log entries.
- Build `/admin/contacts` CRUD page: list view with search, create form, edit form, delete confirmation.
- Build `/admin/documents` CRUD page: list view with filters, create form (includes file URL), edit form, delete confirmation.

#### FE2
- Build `/admin/processes` CRUD page: list view, create/edit form with step JSON editor (ordered list of step inputs).
- Build `/admin/help-articles` CRUD page: list view, create/edit form with Markdown textarea and `target_audience` selector.
- Build `/admin/platforms` CRUD page: list view, create/edit form.
- Implement shared admin components: `AdminTable`, `AdminForm`, `ConfirmDeleteModal`.

#### BE1
- Implement `POST /api/admin/contacts` (create), `PUT /api/admin/contacts/[id]` (update), `DELETE /api/admin/contacts/[id]`.
- Implement `POST /api/admin/documents`, `PUT /api/admin/documents/[id]`, `DELETE /api/admin/documents/[id]`.
- Sanitize all `file_url` and external URL fields before database write.
- Enforce role guard: all admin API routes MUST return 403 for non-admin sessions.

#### BE2
- Implement `POST /api/admin/processes`, `PUT /api/admin/processes/[id]`, `DELETE /api/admin/processes/[id]`.
- Implement `POST /api/admin/help-articles`, `PUT /api/admin/help-articles/[id]`, `DELETE /api/admin/help-articles/[id]`.
- Implement `POST /api/admin/platforms`, `PUT /api/admin/platforms/[id]`, `DELETE /api/admin/platforms/[id]`.
- All write endpoints MUST validate request body via corresponding zod schema before any DB operation.

### Dependencies
- Lead MUST complete admin role guard and `admin_audit_log` migration before BE1/BE2 implement write endpoints.
- BE1 MUST deliver contacts and documents endpoints before FE1 wires CRUD pages.
- BE2 MUST deliver processes, help-articles, platforms endpoints before FE2 wires CRUD pages.
- FE2 MUST deliver shared admin components (`AdminTable`, `AdminForm`) before FE1 uses them.

### Definition of Done

- [ ] Admin can log in via `/admin/login` and access `/admin/dashboard`.
- [ ] Non-admin session receives 403 on all `/api/admin/*` routes.
- [ ] Admin can create, edit, and delete all five content types via UI.
- [ ] All admin writes set `source_type = 'manual'` and `updated_at`.
- [ ] Every admin write produces a row in `admin_audit_log`.
- [ ] URL fields are sanitized before storage.
- [ ] zod validation rejects malformed payloads with 400 + error detail.

---

## Sprint 5 — Scraper Integration

**Dates:** 2026-06-02 – 2026-06-15  
**Goal:** Scraper pipeline ingests content from at least one legacy university source, enforces manual-override precedence, and exposes job history in the admin panel.

### Tasks

#### Lead
- Define scraper adapter interface (`lib/scraper/adapter.ts`): `{ sourceName: string, run(): Promise<ScraperResult> }`.
- Implement conflict resolution logic (`lib/scraper/conflict.ts`): records with `source_type = 'manual'` MUST NOT be overwritten by scraper upsert.
- Implement scheduler using `node-cron` (`lib/scraper/scheduler.ts`): configurable cron expression via `SCRAPER_CRON` env var.
- Write `scraper_jobs` row lifecycle: insert on start, update `status`, `finished_at`, `inserted_count`, `updated_count`, `error_log` on completion.

#### FE1
- Build `/admin/scraper-jobs` page: table of past job runs with columns `source_name`, `status`, `started_at`, `finished_at`, `inserted_count`, `updated_count`.
- Add status badge: `running` (yellow), `success` (green), `failed` (red).
- Implement auto-refresh polling (every 5s) while a job has `status = 'running'`.

#### FE2
- Add "Run Scraper" button on `/admin/scraper-jobs` page triggering `POST /api/admin/scraper/run`.
- Display error log drawer for failed jobs (expand `error_log` content).
- Show loading/disabled state on "Run Scraper" button while a job is `running`.

#### BE1
- Implement first legacy source adapter using `cheerio`: parse target URL(s), extract content matching `contacts` or `documents` schema.
- Adapter MUST handle HTTP errors and parsing failures without crashing; failures MUST be written to `error_log`.
- Implement `POST /api/admin/scraper/run`: validate admin role, trigger adapter, return `{ jobId }`.

#### BE2
- Implement `GET /api/admin/scraper/jobs`: return paginated list of `scraper_jobs` ordered by `started_at DESC`.
- Implement `GET /api/admin/scraper/jobs/[id]`: return single job with full `error_log`.
- Write unit tests for conflict resolution: verify manual records survive scraper upsert.
- Write unit test for scheduler: verify cron expression parses correctly.

### Dependencies
- Lead MUST deliver adapter interface and conflict logic before BE1 builds the legacy adapter.
- Lead MUST complete `scraper_jobs` row lifecycle before FE1 can display real job data.
- BE1 MUST deliver `POST /api/admin/scraper/run` before FE2 wires the trigger button.
- BE2 MUST deliver `GET /api/admin/scraper/jobs` before FE1 wires the jobs table.

### Definition of Done

- [ ] Scraper adapter ingests data from at least one legacy source and upserts records.
- [ ] Each scraper run creates a `scraper_jobs` row with accurate counts.
- [ ] Failed adapter run persists `error_log`; job `status = 'failed'`.
- [ ] Manual records (`source_type = 'manual'`) are not overwritten by scraper run.
- [ ] Admin can trigger scraper run via UI button.
- [ ] Job list auto-refreshes while `status = 'running'`.
- [ ] Error log is accessible per job in admin UI.
- [ ] Scheduler triggers run on configured cron expression.

---

## Sprint 6 — Hardening + Release Readiness

**Dates:** 2026-06-16 – 2026-06-29  
**Goal:** All critical paths are covered by tests, security controls are verified, performance is acceptable, and the application is deployment-ready.

### Tasks

#### Lead
- Execute full E2E test pass covering key journeys (see Section 11 of dev plan): login + dashboard load, topic search + contact retrieval, document filter + download, admin CRUD cycle, scraper trigger + audit.
- Write deployment runbook (`docs/deployment-runbook.md`): environment variables, SQLite volume setup, migration command, startup command, health check endpoint.
- Implement `GET /api/health` returning `{ status: 'ok', db: 'connected', timestamp }`.
- Conduct security audit: verify all protected routes enforce role server-side, all inputs sanitized, no internal fields leaked in API responses.

#### FE1
- Apply responsive design fixes across all student-facing pages for mobile and tablet breakpoints.
- Implement error boundary components for all data-fetching pages.
- Audit and fix all missing loading states.
- Verify all navigation flows complete in ≤ 3 steps for common student journeys per acceptance criteria.

#### FE2
- Run Lighthouse audit; address performance issues scoring below 75 on Performance and Accessibility.
- Add `aria-label` and semantic HTML attributes to all interactive components.
- Polish admin CRUD UI: consistent spacing, form validation feedback, success/error toast notifications.
- Verify all admin pages render correctly at 1280px and 1920px viewport widths.

#### BE1
- Write integration tests for all route handlers using SQLite test database: auth endpoints, dashboard, search, contacts, documents.
- Verify all route handlers return correct HTTP status codes: 200, 201, 400, 401, 403, 404.
- Confirm all output payloads exclude internal-only fields (e.g., raw password fields if any, internal audit metadata not relevant to consumers).

#### BE2
- Write unit tests for critical business logic: auth guards, FTS5 search ranking, conflict resolution rules, zod schema rejection cases.
- Write integration tests for processes, help-articles, platforms, and admin CRUD endpoints.
- Profile SQLite query performance on datasets of 100+ records per table; add indexes where query plans show full scans on filtered columns.

### Dependencies
- All Sprint 0–5 features MUST be merged before Sprint 6 begins.
- Lead MUST complete security audit before release buffer starts.
- BE2 MUST complete index profiling before Lead writes deployment runbook (to confirm no schema changes needed).

### Definition of Done

- [ ] All critical unit tests pass (`npm run test`).
- [ ] All integration tests pass against SQLite test database.
- [ ] E2E journeys pass: login, dashboard, search, contacts, documents, admin CRUD, scraper.
- [ ] `GET /api/health` returns 200 with `status: 'ok'`.
- [ ] Lighthouse Performance score ≥ 75 on `/dashboard` and `/search`.
- [ ] Lighthouse Accessibility score ≥ 85 on all student-facing pages.
- [ ] No unprotected admin route accessible without admin session.
- [ ] No internal fields exposed in student-facing API responses.
- [ ] Deployment runbook exists and is accurate.
- [ ] `npm run build` completes with zero errors.

---

## Release Buffer — Deployment Verification

**Dates:** 2026-06-30 – 2026-07-03  
**Goal:** Production environment is live, verified, and stable before the July 3 hard launch.

### Tasks

| Owner | Task |
|---|---|
| Lead | Execute production deployment per deployment runbook. |
| Lead | Run database migrations against production SQLite volume. |
| Lead | Verify `GET /api/health` returns 200 in production environment. |
| BE1 | Smoke-test all student-facing API endpoints in production. |
| BE2 | Smoke-test all admin API endpoints in production; verify role guards. |
| FE1 | Smoke-test all student-facing UI pages in production browser. |
| FE2 | Smoke-test all admin UI pages in production browser. |
| All | Triage and hotfix any P0 (blocking) issues discovered during smoke tests. |

### Definition of Done

- [ ] Application is accessible at production URL.
- [ ] Student login, dashboard, search, contacts, documents, processes, help-center, and platforms are functional.
- [ ] Admin login, all CRUD pages, and scraper trigger are functional.
- [ ] No P0 issues remain open.
- [ ] Hard launch approved by Lead on 2026-07-03.

---

## Cross-Sprint Constraints

- All branches MUST pass `npm run lint` and `npm run build` before merge.
- TypeScript strict mode MUST remain enabled throughout; type errors MUST NOT be suppressed with `any` casts.
- All database writes MUST go through Drizzle ORM; raw SQL MUST NOT be used outside of FTS5 virtual table definitions.
- `source_type` MUST be set on every content record insert (`'manual'` for admin writes, `'scraped'` for scraper writes).
- Manual records (`source_type = 'manual'`) MUST NOT be overwritten by scraper upserts at any point in the pipeline.
- Admin routes MUST enforce `role === 'admin'` server-side on every request; client-side role checks are supplementary only.
- Output payloads MUST NOT expose fields outside the defined API contract per entity.
