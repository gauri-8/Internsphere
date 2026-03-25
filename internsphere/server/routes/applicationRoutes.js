import express from "express";

const router = express.Router();

// Placeholder - we'll fill these in later
router.get("/", (req, res) => {
  res.json({ message: "Application routes working" });
});

export default router;