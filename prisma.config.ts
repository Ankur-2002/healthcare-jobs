import "dotenv/config";
import { defineConfig } from "prisma/config";

// Prisma 7 config — matches the official Next.js guide pattern.
// See: https://www.prisma.io/docs/guides/frameworks/nextjs
//
// NOTE: Set DATABASE_URL in .env before running migrations or seeding.
// Format: postgresql://USER:PASSWORD@HOST:PORT/DATABASE

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: `tsx prisma/seed.ts`,
  },
  datasource: {
    // Falls back to empty string so `prisma generate` works without a DB.
    // Migrations and queries require a real DATABASE_URL in .env.
    url: process.env.DATABASE_URL ?? "",
  },
});
