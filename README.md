# IBS Student Digital Hub

Centralized student information platform for IBS students at HFU. Consolidates contacts, documents, processes, academic platforms, and help content into a single Next.js application.

---

## Problem

Student information is fragmented across HFU systems, PDFs, email threads, and departmental pages. Students cannot reliably find contacts, forms, or procedures without manual searching across multiple sources.

## Solution

A fullstack web application that aggregates, normalizes, and surfaces all relevant student information through a personalized dashboard, full-text search, and structured content modules.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14+ (App Router) |
| Language | TypeScript (strict mode) |
| Styling | TailwindCSS |
| Database | SQLite + Drizzle ORM |
| Search | SQLite FTS5 |
| Auth | JWT / session-based with role checks |
| Validation | Zod |
| Scraping | Cheerio + node-cron |

---

## Project Structure

```
IBS-Student-Digital-Hub/
  docs/
    ibs-student-hub-dev-plan.md    # Architecture and module specifications
    ibs-student-hub-sprints.md     # Sprint breakdown and task assignments
    302-llm-oriented-writing.mdc   # Writing standards for LLM-oriented docs
  src/
    app/
      (public)/                    # Student-facing pages
      (admin)/                     # Admin panel pages
      api/                         # Route handlers
    components/                    # Shared UI components
    lib/
      auth/                        # Session and role utilities
      db/                          # Drizzle client and query helpers
      search/                      # FTS5 search logic
      scraper/                     # Adapter interface and scheduler
      validation/                  # Zod schemas per entity
    drizzle/
      schema.ts                    # All table definitions
      migrations/                  # Drizzle migration files
    scripts/
      scraper/                     # Standalone scraper runners
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### Install

```bash
npm install
```

### Configure Environment

Copy `.env.example` to `.env.local` and fill in required values:

```bash
cp .env.example .env.local
```

Required variables:

```
DATABASE_URL=./sqlite.db
SESSION_SECRET=<random 32+ char string>
SESSION_TTL_HOURS=24
SCRAPER_CRON=0 2 * * *
NODE_ENV=development
```

### Run Migrations

```bash
npm run db:migrate
```

### Seed Development Data

```bash
npm run db:seed
```

### Start Development Server

```bash
npm run dev
```

Application available at `http://localhost:3000`.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run test` | Run unit and integration tests |
| `npm run db:migrate` | Apply Drizzle migrations |
| `npm run db:seed` | Seed development data |

---

## Key Modules

| Module | Route | Description |
|---|---|---|
| Student Login | `/login` | `student_id` + `semester` authentication |
| Dashboard | `/dashboard` | Personalized semester-filtered homepage |
| Search | `/search` | Full-text cross-module search with filters |
| Contact Finder | `/contacts` | Topic-based contact lookup |
| Document Center | `/documents` | Filterable academic resource library |
| Process Guides | `/processes` | Step-by-step procedural guides |
| Help Center | `/help-center` | Onboarding and international student support |
| Platform Hub | `/platforms` | University system catalog |
| Admin Panel | `/admin/*` | Content management for all entity types |

---

## Team

| Role | Responsibility |
|---|---|
| Lead (Fullstack) | Architecture, cross-cutting concerns, integration, deployment |
| FE1 (Frontend) | Student-facing pages, routing, primary UI |
| FE2 (Frontend) | Components, admin UI, UX polish |
| BE1 (Backend) | Route handlers, auth, database schema |
| BE2 (Backend) | Business logic, validation, testing |

---

## Sprint Timeline

| Sprint | Dates | Focus |
|---|---|---|
| Sprint 0 | Mar 24 – Apr 06 | Foundation setup |
| Sprint 1 | Apr 07 – Apr 20 | Authentication + Dashboard |
| Sprint 2 | Apr 21 – May 04 | Search + Contacts + Documents |
| Sprint 3 | May 05 – May 18 | Processes + Help + Platforms |
| Sprint 4 | May 19 – Jun 01 | Admin panel + CRUD |
| Sprint 5 | Jun 02 – Jun 15 | Scraper integration |
| Sprint 6 | Jun 16 – Jun 29 | Hardening + release readiness |
| Buffer | Jun 30 – Jul 03 | Deployment verification |

Full sprint details: [`docs/ibs-student-hub-sprints.md`](docs/ibs-student-hub-sprints.md)

---

## Documentation

- [Development Plan](docs/ibs-student-hub-dev-plan.md) — architecture, domain model, API design, acceptance criteria
- [Sprint Plan](docs/ibs-student-hub-sprints.md) — per-sprint task assignments, dependencies, definitions of done