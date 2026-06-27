import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
  log:
    process.env.NODE_ENV === "development"
      ? ["query", "error", "warn"]
      : ["error"],
});

const connectDB = async () => {
  await prisma.$connect();
  console.log("Database connected");
};

const disconnectDB = async () => {
  await prisma.$disconnect();
  console.log("Database disconnected");
};

export { prisma, connectDB, disconnectDB };
