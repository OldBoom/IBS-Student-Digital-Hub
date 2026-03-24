import type { Config } from 'drizzle-kit'

// Drizzle Kit configuration.
// Points to the schema file and the SQLite database file.
// Run `npm run db:migrate` to apply migrations.
export default {
  schema: './src/drizzle/schema.ts',
  out: './src/drizzle/migrations',
  driver: 'better-sqlite',
  dbCredentials: {
    url: process.env.DATABASE_URL ?? './sqlite.db',
  },
} satisfies Config
