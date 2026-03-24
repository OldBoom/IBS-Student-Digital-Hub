# Contributing

## Branch Strategy

| Branch | Purpose |
|---|---|
| `main` | Production-ready code only. Direct pushes prohibited. |
| `develop` | Integration branch. All feature branches merge here first. |
| `feature/<ticket>-<short-description>` | Feature work. Branch from `develop`. |
| `fix/<ticket>-<short-description>` | Bug fixes. Branch from `develop`. |
| `hotfix/<short-description>` | Critical production fixes. Branch from `main`. |

### Examples

```
feature/S1-auth-login
feature/S2-search-fts5
fix/S3-process-step-null
hotfix/session-expiry-crash
```

## Pull Request Rules

- PRs MUST target `develop` (not `main`) unless it is a hotfix.
- PR MUST include a description stating what changed and why.
- PR MUST pass all CI checks before merge: `lint`, `build`, `test`.
- PR MUST be reviewed and approved by at least one other team member.
- PR MUST NOT contain `any` type casts or disabled lint rules without justification in a comment.
- PR title MUST follow: `[Sprint X] Short description of change`.

## Commit Message Format

```
<type>(<scope>): <short summary>
```

Types: `feat`, `fix`, `chore`, `docs`, `test`, `refactor`, `style`

### Examples

```
feat(auth): implement POST /api/auth/login with zod validation
fix(search): handle empty FTS5 result set without crash
docs(readme): add db:migrate script to available commands
test(conflict): add unit tests for scraper manual-override rule
chore(deps): update drizzle-orm to latest
```

## Code Standards

### TypeScript

- Strict mode MUST remain enabled. DO NOT add `"strict": false` to `tsconfig.json`.
- DO NOT use `any`. Use `unknown` with type narrowing or define proper types.
- All exported functions MUST have explicit return types.

### Naming

- Components: `PascalCase` (e.g., `ContactCard`, `AdminTable`).
- Utility functions: `camelCase` (e.g., `getSessionUser`, `buildSearchQuery`).
- Database helpers: prefix with entity name (e.g., `contactsGetByTopic`, `documentsGetFiltered`).
- Route handler files: `route.ts` inside the corresponding `app/api/` segment.

### File Organization

- One component per file.
- Co-locate component-specific types in the same file.
- Shared types MUST live in `lib/types/` with named exports.
- Zod schemas MUST live in `lib/validation/` with one file per entity.

### API Responses

- All route handlers MUST return typed `NextResponse` with explicit HTTP status codes.
- 400 MUST accompany all zod validation failures with the zod error detail in the body.
- 401 for unauthenticated requests; 403 for authenticated but unauthorized requests.
- DO NOT expose internal database fields (e.g., `source_type`, `error_log`) in student-facing API responses.

### Database

- All DB access MUST go through Drizzle ORM. DO NOT write raw SQL except in FTS5 virtual table definitions.
- All write operations MUST set `updated_at` on update.
- Admin writes MUST set `source_type = 'manual'`.
- Scraper writes MUST set `source_type = 'scraped'` and MUST NOT overwrite records where `source_type = 'manual'`.

## Local Development Checklist

Before pushing:

- [ ] `npm run lint` — zero warnings.
- [ ] `npm run build` — zero errors.
- [ ] `npm run test` — all tests pass.
- [ ] No `console.log` left in production code paths.
- [ ] No `.env.local` or `*.db` files staged.

## Sprint Workflow

1. Pick tasks assigned to your role in the current sprint (`docs/ibs-student-hub-sprints.md`).
2. Branch from `develop` using the naming convention above.
3. Complete the task; verify it satisfies the sprint's Definition of Done checklist.
4. Open a PR to `develop` with the `[Sprint X]` prefix in the title.
5. Request review from at least one team member.
6. Lead merges to `develop` after approval and CI green.
7. Lead merges `develop` → `main` at sprint end after all sprint DoD items are checked.
