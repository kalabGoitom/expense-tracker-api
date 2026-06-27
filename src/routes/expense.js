import {
  createExpense,
  getAllExpenses,
  getExpense,
  updateExpense,
  deleteAllExpense,
  deleteExpense,
  summery,
} from "../controllers/expense.js";

import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import validateRequest from "../middlewares/validateRequest.js";
import { CreateSchema, UpdateSchema } from "../validiators/expense.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", validateRequest(CreateSchema), createExpense);

router.get("/", getAllExpenses);

router.get("/summery", summery);

router.patch("/:id", validateRequest(UpdateSchema), updateExpense);

router.route("/:id").get(getExpense).delete(deleteExpense);

router.delete("/", deleteAllExpense);

export default router;
