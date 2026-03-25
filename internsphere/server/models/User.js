import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      default: "",
    },
    lastName: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: ["student", "recruiter"],
      required: true,
    },

    // Student-specific fields
    college: { type: String, default: "" },
    year: { type: String, default: "" },
    branch: { type: String, default: "" },
    cgpa: { type: String, default: "" },
    skills: [{ type: String }],
    resumeUrl: { type: String, default: "" },
    bio: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    github: { type: String, default: "" },
    portfolio: { type: String, default: "" },

    // Recruiter-specific fields
    companyName: { type: String, default: "" },
    companyType: { type: String, default: "" },
    industry: { type: String, default: "" },
    companySize: { type: String, default: "" },
    headquarters: { type: String, default: "" },
    website: { type: String, default: "" },
    companyAbout: { type: String, default: "" },
    recruiterTitle: { type: String, default: "" },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;