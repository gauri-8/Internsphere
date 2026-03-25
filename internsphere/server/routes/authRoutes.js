import express from "express";
import { registerUser, getMe } from "../controllers/authController.js";
import { requireAuth, attachUser } from "../middleware/authMiddleware.js";

const router = express.Router();

// POST /api/auth/register — called once after signup to save user + role to MongoDB
router.post("/register", requireAuth, registerUser);

// GET /api/auth/me — called on login to fetch user + role from MongoDB
router.get("/me", requireAuth, attachUser, getMe);

export default router;