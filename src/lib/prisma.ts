// lib/prisma.ts — Prisma 7 singleton with PrismaPg driver adapter.
// Follows the official Prisma + Next.js guide exactly.
// See: https://www.prisma.io/docs/guides/frameworks/nextjs

import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL || 'postgresql://dummy:dummy@localhost:5432/dummy',
});

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
