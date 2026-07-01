import "dotenv/config";

import express from "express";
const app = express();

import cookieParser from "cookie-parser";

import { connectDB, disconnectDB } from "./config/db.js";

// routers
import authRouters from "./routes/auth.js";
import expenseRouters from "./routes/expense.js";

// middlewares

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRouters);
app.use("/expenses", expenseRouters);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (error) {
    console.error("Startup failed:", error);
    process.exit(1);
  }
};

start();

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection", err);
  app.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});

process.on("uncaughtRejection", (err) => {
  console.error("Uncaught Rejection", err);
  app.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});

process.on("SIGTERM", (err) => {
  console.error("SIGTERM received, shutting down");
  app.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});
