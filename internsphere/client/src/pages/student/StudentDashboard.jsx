import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

function StudentDashboard() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [applied, setApplied] = useState([]);

  const firstName = user?.firstName || "Student";
  const lastName = user?.lastName || "";
  const fullName = `${firstName} ${lastName}`.trim();
  const avatarLetter = firstName[0]?.toUpperCase() || "S";
  const email = user?.primaryEmailAddress?.emailAddress || "";

  const internships = [
    { id: 1, company: "Google",     role: "Frontend Intern",    location: "Remote",     type: "Full-time", tag: "Featured", color: "#06b6d4" },
    { id: 2, company: "Microsoft",  role: "Backend Intern",     location: "Bangalore",  type: "Part-time", tag: "New",      color: "#818cf8" },
    { id: 3, company: "Amazon",     role: "Full Stack Intern",  location: "Hyderabad",  type: "Full-time", tag: "Hot",      color: "#34d399" },
    { id: 4, company: "Flipkart",   role: "Mobile Dev Intern",  location: "Bengaluru",  type: "Full-time", tag: "New",      color: "#f59e0b" },
    { id: 5, company: "Razorpay",   role: "UI/UX Intern",       location: "Remote",     type: "Part-time", tag: "Featured", color: "#f87171" },
    { id: 6, company: "Zepto",      role: "Data Science Intern",location: "Mumbai",     type: "Full-time", tag: "Hot",      color: "#a78bfa" },
  ];

  const stats = [
    { label: "Applications", value: applied.length || 3, icon: "📋", color: "#06b6d4" },
    { label: "Shortlisted",  value: 1,   icon: "⭐", color: "#34d399" },
    { label: "Pending",      value: 2,   icon: "⏳", color: "#f59e0b" },
    { label: "Profile Score",value: "78%",icon: "📈", color: "#818cf8" },
  ];

  return (
    <div style={styles.root}>
      <style>{css}</style>
      <Navbar />
      <Sidebar active="dashboard" />

      <main className="dash-main">

        {/* Profile banner */}
        <div className="profile-banner">
          <div className="profile-info">
            <div className="profile-avatar">{avatarLetter}</div>
            <div>
              <div className="profile-name">{fullName}</div>
              <div className="profile-role">{email}</div>
            </div>
          </div>
          <button className="profile-edit-btn" onClick={() => navigate("/student/profile")}>
            Edit Profile →
          </button>
        </div>

        {/* Welcome */}
        <div className="welcome-strip">
          <p className="welcome-tag">Good morning 👋</p>
          <h1 className="welcome-title">Welcome, {firstName}!</h1>
          <p className="welcome-sub">Track your applications and discover new opportunities below.</p>
        </div>

        {/* Stats */}
        <div className="stats-grid">
          {stats.map((s, i) => (
            <div className="stat-card" key={i}>
              <div className="stat-icon-wrap" style={{ background: `${s.color}18` }}>
                {s.icon}
              </div>
              <div>
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div className="quick-actions">
          <button className="qa-btn primary" onClick={() => navigate("/student/browse")}>🔍 Browse All Internships</button>
          <button className="qa-btn secondary" onClick={() => navigate("/student/my-applications")}>📋 View My Applications</button>
        </div>

        {/* Job listings */}
        <div className="section-header">
          <h2 className="section-title">Recommended Internships</h2>
          <button className="see-all-btn" onClick={() => navigate("/student/browse")}>See all →</button>
        </div>

        <div className="jobs-grid">
          {internships.map((job) => {
            const tagColors = {
              Featured: { bg:"rgba(6,182,212,0.1)",   color:"#06b6d4" },
              New:      { bg:"rgba(52,211,153,0.1)",  color:"#34d399" },
              Hot:      { bg:"rgba(248,113,113,0.1)", color:"#f87171" },
            };
            const tagStyle = tagColors[job.tag] || {};
            return (
              <div
                className="job-card"
                key={job.id}
                style={{ "--accent-color": job.color }}
                onClick={() => navigate(`/student/internship/${job.id}`)}
              >
                <div className="job-card-top">
                  <div className="job-company-logo" style={{ background:`linear-gradient(135deg,${job.color}cc,${job.color}66)` }}>
                    {job.company[0]}
                  </div>
                  <span className="job-tag" style={tagStyle}>{job.tag}</span>
                </div>
                <div className="job-role">{job.role}</div>
                <div className="job-company">{job.company}</div>
                <div className="job-meta">
                  <span className="job-pill">📍 {job.location}</span>
                  <span className="job-pill">⏱ {job.type}</span>
                </div>
                <button
                  className="apply-btn"
                  onClick={(e) => { e.stopPropagation(); navigate(`/student/internship/${job.id}`); }}
                >
                  View & Apply →
                </button>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

const styles = {
  root: { minHeight:"100vh", background:"#f0f4f8", paddingTop:64, fontFamily:"'DM Sans',sans-serif" },
};

const css = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
* { box-sizing: border-box; }
.dash-main { margin-left:240px; padding:40px; }
.welcome-strip { margin-bottom:28px; }
.welcome-tag { font-family:'DM Sans',sans-serif; font-size:12px; font-weight:600; letter-spacing:2px; text-transform:uppercase; color:#06b6d4; margin-bottom:8px; }
.welcome-title { font-family:'Syne',sans-serif; font-size:30px; font-weight:800; color:#0f172a; letter-spacing:-1px; margin:0 0 4px; }
.welcome-sub { font-family:'DM Sans',sans-serif; font-size:14px; color:#64748b; margin:0; font-weight:300; }
.stats-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:20px; margin-bottom:28px; }
.stat-card { background:white; border:1px solid #e2e8f0; border-radius:14px; padding:22px 20px; display:flex; align-items:center; gap:16px; transition:all 0.2s; }
.stat-card:hover { transform:translateY(-2px); box-shadow:0 8px 24px rgba(0,0,0,0.07); }
.stat-icon-wrap { width:44px; height:44px; border-radius:10px; display:flex; align-items:center; justify-content:center; font-size:18px; flex-shrink:0; }
.stat-value { font-family:'Syne',sans-serif; font-size:26px; font-weight:800; color:#0f172a; line-height:1; }
.stat-label { font-family:'DM Sans',sans-serif; font-size:12px; color:#94a3b8; margin-top:3px; }
.quick-actions { display:flex; gap:12px; margin-bottom:36px; flex-wrap:wrap; }
.qa-btn { padding:12px 22px; border-radius:10px; font-family:'DM Sans',sans-serif; font-size:14px; font-weight:600; cursor:pointer; border:none; transition:all 0.2s; }
.qa-btn.primary { background:#0f172a; color:white; }
.qa-btn.primary:hover { background:#1e293b; }
.qa-btn.secondary { background:white; color:#475569; border:1px solid #e2e8f0; }
.qa-btn.secondary:hover { background:#f8fafc; }
.section-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:20px; }
.section-title { font-family:'Syne',sans-serif; font-size:20px; font-weight:800; color:#0f172a; letter-spacing:-0.5px; margin:0; }
.see-all-btn { background:none; border:none; font-family:'DM Sans',sans-serif; font-size:13px; color:#06b6d4; font-weight:600; cursor:pointer; }
.jobs-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(240px,1fr)); gap:18px; }
.job-card { background:white; border:1px solid #e2e8f0; border-radius:16px; padding:22px; cursor:pointer; transition:all 0.25s; position:relative; overflow:hidden; }
.job-card::before { content:''; position:absolute; top:0;left:0;right:0; height:3px; background:var(--accent-color); opacity:0; transition:opacity 0.2s; }
.job-card:hover { transform:translateY(-4px); box-shadow:0 16px 40px rgba(0,0,0,0.09); border-color:#cbd5e1; }
.job-card:hover::before { opacity:1; }
.job-card-top { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:14px; }
.job-company-logo { width:44px; height:44px; border-radius:10px; display:flex; align-items:center; justify-content:center; font-family:'Syne',sans-serif; font-weight:800; font-size:18px; color:white; }
.job-tag { font-size:11px; font-weight:600; padding:4px 10px; border-radius:100px; font-family:'DM Sans',sans-serif; }
.job-role { font-family:'Syne',sans-serif; font-size:15px; font-weight:700; color:#0f172a; margin-bottom:3px; }
.job-company { font-family:'DM Sans',sans-serif; font-size:13px; color:#64748b; margin-bottom:12px; }
.job-meta { display:flex; gap:6px; flex-wrap:wrap; margin-bottom:16px; }
.job-pill { padding:4px 9px; background:#f1f5f9; border-radius:6px; font-size:11px; color:#475569; font-family:'DM Sans',sans-serif; }
.apply-btn { width:100%; padding:10px; background:#0f172a; color:white; border:none; border-radius:9px; font-size:13px; font-weight:600; font-family:'DM Sans',sans-serif; cursor:pointer; transition:all 0.2s; }
.apply-btn:hover { background:#1e293b; }
.profile-banner { background:linear-gradient(135deg,#080c1a,#1e293b); border-radius:16px; padding:24px 28px; display:flex; align-items:center; justify-content:space-between; margin-bottom:32px; border:1px solid rgba(255,255,255,0.08); gap:20px; flex-wrap:wrap; }
.profile-info { display:flex; align-items:center; gap:16px; }
.profile-avatar { width:50px; height:50px; border-radius:13px; background:linear-gradient(135deg,#06b6d4,#2563eb); display:flex; align-items:center; justify-content:center; font-family:'Syne',sans-serif; font-size:20px; font-weight:800; color:white; }
.profile-name { font-family:'Syne',sans-serif; font-size:17px; font-weight:800; color:white; letter-spacing:-0.3px; }
.profile-role { font-family:'DM Sans',sans-serif; font-size:13px; color:rgba(255,255,255,0.45); margin-top:2px; }
.profile-edit-btn { padding:9px 18px; background:rgba(255,255,255,0.07); border:1px solid rgba(255,255,255,0.12); color:rgba(255,255,255,0.7); font-family:'DM Sans',sans-serif; font-size:13px; font-weight:500; border-radius:8px; cursor:pointer; transition:all 0.2s; }
.profile-edit-btn:hover { background:rgba(255,255,255,0.12); color:white; }
@media(max-width:900px){.dash-main{margin-left:0;padding:24px 16px;}.stats-grid{grid-template-columns:1fr 1fr;}}
`;

export default StudentDashboard;