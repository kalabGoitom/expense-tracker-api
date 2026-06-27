import { signup, login, logout, deleteAccount } from "../controllers/auth.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import express from "express";
import { SignupSchema, LoginSchema } from "../validiators/auth.js";
import validateRequest from "../middlewares/validateRequest.js";

const router = express.Router();

router.post("/signup", validateRequest(SignupSchema), signup);
router.post("/login", validateRequest(LoginSchema), login);
router.post("/logout", authMiddleware, logout);
router.delete("/deleteAccount", authMiddleware, deleteAccount);

export default router;
