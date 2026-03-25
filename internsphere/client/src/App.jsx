import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

import LandingPage from "./pages/auth/LandingPage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import StudentDashboard from "./pages/student/StudentDashboard";
import BrowseInternships from "./pages/student/BrowseInternships";
import InternshipDetails from "./pages/student/InternshipDetails";
import ApplyInternship from "./pages/student/ApplyInternship";
import MyApplications from "./pages/student/MyApplications";
import ApplicationStatus from "./pages/student/ApplicationStatus";
import StudentProfile from "./pages/student/StudentProfile";

import RecruiterDashboard from "./pages/recruiter/RecruiterDashboard";
import PostInternship from "./pages/recruiter/PostInternship";
import ManageInternships from "./pages/recruiter/ManageInternships";
import ViewApplications from "./pages/recruiter/ViewApplications";
import ResumeScreening from "./pages/recruiter/ResumeScreening";
import RecruiterProfile from "./pages/recruiter/RecruiterProfile";

// ── If already logged in, redirect away from /login and /register ──
// This is what fixes the "session already exists" error
function PublicRoute({ children }) {
  const { isSignedIn, isLoaded, user } = useUser();
  if (!isLoaded) return null;
  if (isSignedIn) {
    const role = user?.publicMetadata?.role;
    return <Navigate to={role === "recruiter" ? "/recruiter/dashboard" : "/student/dashboard"} replace />;
  }
  return children;
}

// ── Must be logged in as a student ──
function StudentRoute({ children }) {
  const { isSignedIn, isLoaded, user } = useUser();
  if (!isLoaded) return null;
  if (!isSignedIn) return <Navigate to="/login" replace />;
  if (user?.publicMetadata?.role !== "student") return <Navigate to="/recruiter/dashboard" replace />;
  return children;
}

// ── Must be logged in as a recruiter ──
function RecruiterRoute({ children }) {
  const { isSignedIn, isLoaded, user } = useUser();
  if (!isLoaded) return null;
  if (!isSignedIn) return <Navigate to="/login" replace />;
  if (user?.publicMetadata?.role !== "recruiter") return <Navigate to="/student/dashboard" replace />;
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login"    element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />

        {/* Student (protected) */}
        <Route path="/student/dashboard"       element={<StudentRoute><StudentDashboard /></StudentRoute>} />
        <Route path="/student/browse"          element={<StudentRoute><BrowseInternships /></StudentRoute>} />
        <Route path="/student/internship/:id"  element={<StudentRoute><InternshipDetails /></StudentRoute>} />
        <Route path="/student/apply/:id"       element={<StudentRoute><ApplyInternship /></StudentRoute>} />
        <Route path="/student/my-applications" element={<StudentRoute><MyApplications /></StudentRoute>} />
        <Route path="/student/application/:id" element={<StudentRoute><ApplicationStatus /></StudentRoute>} />
        <Route path="/student/profile"         element={<StudentRoute><StudentProfile /></StudentRoute>} />

        {/* Recruiter (protected) */}
        <Route path="/recruiter/dashboard"        element={<RecruiterRoute><RecruiterDashboard /></RecruiterRoute>} />
        <Route path="/recruiter/post-internship"  element={<RecruiterRoute><PostInternship /></RecruiterRoute>} />
        <Route path="/recruiter/manage"           element={<RecruiterRoute><ManageInternships /></RecruiterRoute>} />
        <Route path="/recruiter/applications/:id" element={<RecruiterRoute><ViewApplications /></RecruiterRoute>} />
        <Route path="/recruiter/screening/:id"    element={<RecruiterRoute><ResumeScreening /></RecruiterRoute>} />
        <Route path="/recruiter/profile"          element={<RecruiterRoute><RecruiterProfile /></RecruiterRoute>} />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;