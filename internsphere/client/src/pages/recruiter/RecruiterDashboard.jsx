import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import Navbar from "../../components/Navbar";
import RecruiterSidebar from "../../components/RecruiterSidebar";

const recentApplications = [
  { name:"Priya Sharma",   role:"Frontend Intern",     college:"IIT Bombay",   status:"Shortlisted", color:"#06b6d4" },
  { name:"Arjun Mehta",    role:"Backend Intern",       college:"NIT Trichy",   status:"Under Review", color:"#f59e0b" },
  { name:"Sneha Patil",    role:"Full Stack Intern",    college:"BITS Pilani",  status:"Applied",      color:"#818cf8" },
  { name:"Rohan Das",      role:"Data Science Intern",  college:"IIT Delhi",    status:"Shortlisted",  color:"#34d399" },
];

const activeJobs = [
  { id:1, role:"Frontend Intern",    applicants:24, deadline:"Apr 15", status:"Active",  color:"#06b6d4" },
  { id:2, role:"Backend Intern",     applicants:18, deadline:"Apr 20", status:"Active",  color:"#818cf8" },
  { id:3, role:"Data Science Intern",applicants:31, deadline:"Apr 10", status:"Closing", color:"#f87171" },
];

const statusConfig = {
  "Applied":      { bg:"rgba(6,182,212,0.1)",   color:"#06b6d4" },
  "Under Review": { bg:"rgba(245,158,11,0.1)",  color:"#f59e0b" },
  "Shortlisted":  { bg:"rgba(52,211,153,0.1)",  color:"#34d399" },
  "Rejected":     { bg:"rgba(248,113,113,0.1)", color:"#f87171" },
};

export default function RecruiterDashboard() {
  const navigate = useNavigate();
  const { user } = useUser();

  const firstName = user?.firstName || "Recruiter";
  const lastName = user?.lastName || "";
  const fullName = `${firstName} ${lastName}`.trim();
  const avatarLetter = firstName[0]?.toUpperCase() || "R";
  // Company name: use publicMetadata if set, otherwise fall back to name
  const companyName = user?.publicMetadata?.companyName || `${fullName}'s Company`;

  const stats = [
    { label:"Active Postings",   value:3,   icon:"📋", color:"#06b6d4" },
    { label:"Total Applicants",  value:73,  icon:"👥", color:"#818cf8" },
    { label:"Shortlisted",       value:12,  icon:"⭐", color:"#34d399" },
    { label:"Interviews Today",  value:2,   icon:"📅", color:"#f59e0b" },
  ];

  return (
    <div style={s.root}>
      <style>{css}</style>
      <Navbar />
      <RecruiterSidebar active="dashboard" />
      <main className="rd-main">

        {/* Company banner */}
        <div className="rd-banner">
          <div className="rd-banner-left">
            <div className="rd-company-logo">{avatarLetter}</div>
            <div>
              <div className="rd-company-name">{companyName}</div>
              <div className="rd-company-sub">Recruiter Account · {fullName}</div>
            </div>
          </div>
          <button className="rd-post-btn" onClick={() => navigate("/recruiter/post-internship")}>
            + Post Internship
          </button>
        </div>

        {/* Welcome */}
        <div className="rd-welcome">
          <p className="rd-eyebrow">Overview</p>
          <h1 className="rd-title">Recruiter Dashboard</h1>
          <p className="rd-sub">Manage your internship postings and track applicants in one place.</p>
        </div>

        {/* Stats */}
        <div className="rd-stats">
          {stats.map((s, i) => (
            <div className="rd-stat-card" key={i}>
              <div className="rd-stat-icon" style={{ background:`${s.color}18` }}>{s.icon}</div>
              <div>
                <div className="rd-stat-val" style={{ color: s.color }}>{s.value}</div>
                <div className="rd-stat-label">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="rd-grid">
          {/* Active job postings */}
          <div className="rd-section">
            <div className="rd-section-header">
              <h2 className="rd-section-title">Active Postings</h2>
              <button className="rd-link-btn" onClick={() => navigate("/recruiter/manage")}>Manage all →</button>
            </div>
            <div className="rd-jobs-list">
              {activeJobs.map((job) => (
                <div key={job.id} className="rd-job-row" onClick={() => navigate(`/recruiter/applications/${job.id}`)}>
                  <div className="rd-job-dot" style={{ background: job.color }} />
                  <div className="rd-job-info">
                    <div className="rd-job-role">{job.role}</div>
                    <div className="rd-job-meta">{job.applicants} applicants · Deadline {job.deadline}</div>
                  </div>
                  <span className="rd-job-status" style={
                    job.status === "Closing"
                      ? { background:"rgba(248,113,113,0.1)", color:"#f87171" }
                      : { background:"rgba(52,211,153,0.1)", color:"#34d399" }
                  }>{job.status}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent applicants */}
          <div className="rd-section">
            <div className="rd-section-header">
              <h2 className="rd-section-title">Recent Applicants</h2>
              <button className="rd-link-btn" onClick={() => navigate("/recruiter/applications/1")}>View all →</button>
            </div>
            <div className="rd-applicants-list">
              {recentApplications.map((app, i) => {
                const sc = statusConfig[app.status];
                return (
                  <div key={i} className="rd-applicant-row">
                    <div className="rd-applicant-avatar" style={{ background:`linear-gradient(135deg,${app.color}cc,${app.color}55)` }}>
                      {app.name[0]}
                    </div>
                    <div className="rd-applicant-info">
                      <div className="rd-applicant-name">{app.name}</div>
                      <div className="rd-applicant-sub">{app.college} · {app.role}</div>
                    </div>
                    <span className="rd-app-status" style={{ background:sc.bg, color:sc.color }}>{app.status}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="rd-quick">
          <h2 className="rd-section-title" style={{ marginBottom:16 }}>Quick Actions</h2>
          <div className="rd-quick-grid">
            {[
              { icon:"✏️", label:"Post New Internship",    desc:"Create a new internship listing",   action:() => navigate("/recruiter/post-internship") },
              { icon:"📂", label:"Manage Postings",        desc:"Edit or close existing listings",   action:() => navigate("/recruiter/manage") },
              { icon:"👥", label:"View Applications",      desc:"Review and filter all applicants",  action:() => navigate("/recruiter/applications/1") },
              { icon:"🔍", label:"Resume Screening",       desc:"AI-powered candidate shortlisting", action:() => navigate("/recruiter/screening/1") },
            ].map((qa, i) => (
              <div key={i} className="rd-quick-card" onClick={qa.action}>
                <div className="rd-quick-icon">{qa.icon}</div>
                <div className="rd-quick-label">{qa.label}</div>
                <div className="rd-quick-desc">{qa.desc}</div>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}

const s = { root:{ minHeight:"100vh", background:"#f0f4f8", paddingTop:64, fontFamily:"'DM Sans',sans-serif" } };

const css = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
*{box-sizing:border-box;}
.rd-main{margin-left:240px;padding:40px;}
.rd-banner{background:linear-gradient(135deg,#080c1a,#1e293b);border-radius:16px;padding:24px 28px;display:flex;align-items:center;justify-content:space-between;margin-bottom:32px;border:1px solid rgba(255,255,255,0.08);gap:20px;flex-wrap:wrap;}
.rd-banner-left{display:flex;align-items:center;gap:16px;}
.rd-company-logo{width:50px;height:50px;border-radius:13px;background:linear-gradient(135deg,#06b6d4,#2563eb);display:flex;align-items:center;justify-content:center;font-family:'Syne',sans-serif;font-size:22px;font-weight:800;color:white;}
.rd-company-name{font-family:'Syne',sans-serif;font-size:18px;font-weight:800;color:white;letter-spacing:-0.3px;}
.rd-company-sub{font-family:'DM Sans',sans-serif;font-size:13px;color:rgba(255,255,255,0.4);margin-top:2px;}
.rd-post-btn{padding:12px 24px;background:linear-gradient(135deg,#06b6d4,#2563eb);color:white;border:none;border-radius:10px;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:600;cursor:pointer;transition:all 0.2s;box-shadow:0 4px 16px rgba(6,182,212,0.3);}
.rd-post-btn:hover{transform:translateY(-1px);box-shadow:0 8px 24px rgba(6,182,212,0.4);}
.rd-eyebrow{font-family:'DM Sans',sans-serif;font-size:12px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#06b6d4;margin-bottom:8px;}
.rd-title{font-family:'Syne',sans-serif;font-size:30px;font-weight:800;color:#0f172a;letter-spacing:-1px;margin:0 0 4px;}
.rd-sub{font-family:'DM Sans',sans-serif;font-size:14px;color:#64748b;margin:0 0 28px;font-weight:300;}
.rd-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:28px;}
.rd-stat-card{background:white;border:1px solid #e2e8f0;border-radius:14px;padding:20px;display:flex;align-items:center;gap:14px;transition:all 0.2s;}
.rd-stat-card:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,0,0,0.07);}
.rd-stat-icon{width:44px;height:44px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;}
.rd-stat-val{font-family:'Syne',sans-serif;font-size:26px;font-weight:800;line-height:1;}
.rd-stat-label{font-family:'DM Sans',sans-serif;font-size:12px;color:#94a3b8;margin-top:2px;}
.rd-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:28px;}
.rd-section{background:white;border:1px solid #e2e8f0;border-radius:16px;padding:24px;}
.rd-section-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:18px;}
.rd-section-title{font-family:'Syne',sans-serif;font-size:17px;font-weight:800;color:#0f172a;letter-spacing:-0.3px;margin:0;}
.rd-link-btn{background:none;border:none;font-family:'DM Sans',sans-serif;font-size:13px;color:#06b6d4;font-weight:600;cursor:pointer;}
.rd-jobs-list{display:flex;flex-direction:column;gap:12px;}
.rd-job-row{display:flex;align-items:center;gap:14px;padding:12px 14px;border-radius:10px;cursor:pointer;transition:background 0.2s;}
.rd-job-row:hover{background:#f8fafc;}
.rd-job-dot{width:10px;height:10px;border-radius:50%;flex-shrink:0;}
.rd-job-info{flex:1;}
.rd-job-role{font-family:'DM Sans',sans-serif;font-size:14px;font-weight:600;color:#0f172a;}
.rd-job-meta{font-family:'DM Sans',sans-serif;font-size:12px;color:#94a3b8;margin-top:2px;}
.rd-job-status{padding:4px 12px;border-radius:100px;font-family:'DM Sans',sans-serif;font-size:11px;font-weight:600;white-space:nowrap;}
.rd-applicants-list{display:flex;flex-direction:column;gap:10px;}
.rd-applicant-row{display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid #f8fafc;}
.rd-applicant-row:last-child{border-bottom:none;}
.rd-applicant-avatar{width:38px;height:38px;border-radius:9px;display:flex;align-items:center;justify-content:center;font-family:'Syne',sans-serif;font-weight:800;font-size:15px;color:white;flex-shrink:0;}
.rd-applicant-info{flex:1;}
.rd-applicant-name{font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;color:#0f172a;}
.rd-applicant-sub{font-family:'DM Sans',sans-serif;font-size:11px;color:#94a3b8;margin-top:2px;}
.rd-app-status{padding:4px 10px;border-radius:100px;font-family:'DM Sans',sans-serif;font-size:11px;font-weight:600;white-space:nowrap;}
.rd-quick{background:white;border:1px solid #e2e8f0;border-radius:16px;padding:24px;}
.rd-quick-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;}
.rd-quick-card{border:1px solid #e2e8f0;border-radius:12px;padding:20px;cursor:pointer;transition:all 0.2s;}
.rd-quick-card:hover{border-color:#06b6d4;background:rgba(6,182,212,0.03);transform:translateY(-2px);}
.rd-quick-icon{font-size:24px;margin-bottom:10px;}
.rd-quick-label{font-family:'Syne',sans-serif;font-size:14px;font-weight:700;color:#0f172a;margin-bottom:4px;}
.rd-quick-desc{font-family:'DM Sans',sans-serif;font-size:12px;color:#94a3b8;font-weight:300;line-height:1.5;}
@media(max-width:900px){.rd-main{margin-left:0;padding:24px 16px;}.rd-stats{grid-template-columns:1fr 1fr;}.rd-grid{grid-template-columns:1fr;}.rd-quick-grid{grid-template-columns:1fr 1fr;}}
`;