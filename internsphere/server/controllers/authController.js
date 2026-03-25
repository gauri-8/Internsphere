import User from "../models/User.js";
import { clerkClient } from "@clerk/clerk-sdk-node";

// POST /api/auth/register
// Called right after Clerk signup to save user + role to MongoDB
export const registerUser = async (req, res) => {
  try {
    const clerkId = req.auth.userId;
    const { role, firstName, lastName, email } = req.body;

    // If user already exists just return them (idempotent)
    const existingUser = await User.findOne({ clerkId });
    if (existingUser) {
      return res.status(200).json({ message: "User already registered", user: existingUser });
    }

    // Save role to Clerk publicMetadata — this is what App.jsx reads for routing
    await clerkClient.users.updateUser(clerkId, {
      publicMetadata: { role },
    });

    // Save user to MongoDB
    const newUser = await User.create({ clerkId, email, firstName, lastName, role });

    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Registration failed", error: error.message });
  }
};

// GET /api/auth/me
// Returns current user from MongoDB (used by Login to get role)
export const getMe = async (req, res) => {
  try {
    res.status(200).json({ user: req.user });
  } catch (error) {
    res.status(500).json({ message: "Failed to get user", error: error.message });
  }
};