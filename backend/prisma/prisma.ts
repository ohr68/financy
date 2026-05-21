import { env } from "../src/env"
import { PrismaClient } from "../src/generated/prisma/client"
import { PrismaLibSql } from "@prisma/adapter-libsql"

const globalForPrisma = global as unknown as { prisma: PrismaClient }

const url = env.DATABASE_URL

if (!url) {
  throw new Error("DATABASE_URL is not defined")
}

const adapter = new PrismaLibSql({
  url
})

export const prismaClient = globalForPrisma.prisma || new PrismaClient({adapter})

globalForPrisma.prisma = prismaClient