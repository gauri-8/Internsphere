import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import User from "../models/User.js";

// Verify Clerk JWT — protects any route it's applied to
export const requireAuth = ClerkExpressRequireAuth();

// Attach the MongoDB user to req.user after Clerk verification
export const attachUser = async (req, res, next) => {
  try {
    const clerkId = req.auth.userId;

    const user = await User.findOne({ clerkId });

    if (!user) {
      return res.status(404).json({ message: "User not found in database" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Only allow students
export const requireStudent = (req, res, next) => {
  if (req.user.role !== "student") {
    return res.status(403).json({ message: "Access denied. Students only." });
  }
  next();
};

// Only allow recruiters
export const requireRecruiter = (req, res, next) => {
  if (req.user.role !== "recruiter") {
    return res.status(403).json({ message: "Access denied. Recruiters only." });
  }
  next();
};