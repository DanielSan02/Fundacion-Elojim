import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis;

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query"], // Puedes quitar esto si no quieres ver los logs
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;