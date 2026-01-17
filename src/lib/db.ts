import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient(): PrismaClient | null {
  const dbUrl = process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL;

  if (!dbUrl) {
    console.warn("No database URL configured, running without database");
    return null;
  }

  try {
    const adapter = new PrismaLibSql({
      url: dbUrl,
      authToken: process.env.TURSO_AUTH_TOKEN,
    });

    return new PrismaClient({
      adapter,
      log: process.env.NODE_ENV === "development" ? ["query"] : [],
    });
  } catch (error) {
    console.error("Failed to initialize Prisma client:", error);
    return null;
  }
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production" && prisma) {
  globalForPrisma.prisma = prisma;
}

export default prisma;
