import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

const applications = [
  { id:1, company:"Google", role:"Frontend Intern", location:"Remote", appliedDate:"March 10, 2026", status:"Shortlisted", color:"#06b6d4", stipend:"₹40,000/mo" },
  { id:2, company:"Microsoft", role:"Backend Intern", location:"Bangalore", appliedDate:"March 12, 2026", status:"Under Review", color:"#818cf8", stipend:"₹35,000/mo" },
  { id:3, company:"Amazon", role:"Full Stack Intern", location:"Hyderabad", appliedDate:"March 14, 2026", status:"Applied", color:"#34d399", stipend:"₹45,000/mo" },
  { id:4, company:"Flipkart", role:"Mobile Dev Intern", location:"Bengaluru", appliedDate:"March 15, 2026", status:"Rejected", color:"#f59e0b", stipend:"₹30,000/mo" },
  { id:5, company:"CRED", role:"ML Intern", location:"Remote", appliedDate:"March 16, 2026", status:"Applied", color:"#22d3ee", stipend:"₹50,000/mo" },
];

const statusConfig = {
  "Applied":       { bg:"rgba(6,182,212,0.1)",   color:"#06b6d4",  icon:"📤" },
  "Under Review":  { bg:"rgba(245,158,11,0.1)",  color:"#f59e0b",  icon:"🔍" },
  "Shortlisted":   { bg:"rgba(52,211,153,0.1)",  color:"#34d399",  icon:"⭐" },
  "Rejected":      { bg:"rgba(248,113,113,0.1)", color:"#f87171",  icon:"✕" },
  "Offered":       { bg:"rgba(129,140,248,0.1)", color:"#818cf8",  icon:"🎉" },
};

const filters = ["All", "Applied", "Under Review", "Shortlisted", "Rejected"];

export default function MyApplications() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("All");

  const filtered = filter === "All" ? applications : applications.filter(a => a.status === filter);

  const counts = filters.slice(1).reduce((acc, s) => {
    acc[s] = applications.filter(a => a.status === s).length;
    return acc;
  }, {});

  return (
    <div style={s.root}>
      <style>{css}</style>
      <Navbar />
      <Sidebar active="applications" />
      <main className="ma-main">

        {/* Header */}
        <div className="ma-header">
          <div>
            <p className="ma-eyebrow">Track Your Journey</p>
            <h1 className="ma-title">My Applications</h1>
            <p className="ma-sub">{applications.length} total applications</p>
          </div>
        </div>

        {/* Summary cards */}
        <div className="ma-summary">
          {[
            { label:"Total", val: applications.length, color:"#0f172a", icon:"📋" },
            { label:"Shortlisted", val: counts["Shortlisted"] || 0, color:"#34d399", icon:"⭐" },
            { label:"Under Review", val: counts["Under Review"] || 0, color:"#f59e0b", icon:"🔍" },
            { label:"Rejected", val: counts["Rejected"] || 0, color:"#f87171", icon:"✕" },
          ].map((c) => (
            <div key={c.label} className="ma-summary-card">
              <div className="ma-summary-icon" style={{ background:`${c.color}18` }}>{c.icon}</div>
              <div className="ma-summary-val" style={{ color: c.color }}>{c.val}</div>
              <div className="ma-summary-label">{c.label}</div>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div className="ma-tabs">
          {filters.map((f) => (
            <button
              key={f}
              className={`ma-tab ${filter === f ? "active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f}
              {f !== "All" && counts[f] > 0 && (
                <span className="ma-tab-count">{counts[f]}</span>
              )}
            </button>
          ))}
        </div>

        {/* Applications list */}
        {filtered.length === 0 ? (
          <div className="ma-empty">
            <div style={{ fontSize:44 }}>📭</div>
            <p>No applications with this status yet.</p>
          </div>
        ) : (
          <div className="ma-list">
            {filtered.map((app) => {
              const sc = statusConfig[app.status] || statusConfig["Applied"];
              return (
                <div key={app.id} className="ma-card" onClick={() => navigate(`/student/application/${app.id}`)}>
                  <div className="ma-card-left">
                    <div className="ma-logo" style={{ background:`linear-gradient(135deg,${app.color}cc,${app.color}55)` }}>
                      {app.company[0]}
                    </div>
                    <div className="ma-info">
                      <div className="ma-role">{app.role}</div>
                      <div className="ma-company-loc">{app.company} · {app.location}</div>
                      <div className="ma-meta">
                        <span className="ma-pill">💰 {app.stipend}</span>
                        <span className="ma-pill">📅 Applied {app.appliedDate}</span>
                      </div>
                    </div>
                  </div>
                  <div className="ma-card-right">
                    <span className="ma-status" style={{ background:sc.bg, color:sc.color }}>
                      {sc.icon} {app.status}
                    </span>
                    <button className="ma-view-btn" onClick={(e) => { e.stopPropagation(); navigate(`/student/application/${app.id}`); }}>
                      View Status →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

const s = { root:{ minHeight:"100vh", background:"#f0f4f8", paddingTop:64, fontFamily:"'DM Sans',sans-serif" } };

const css = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
.ma-main{margin-left:240px;padding:40px;}
.ma-eyebrow{font-family:'DM Sans',sans-serif;font-size:12px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#06b6d4;margin-bottom:8px;}
.ma-title{font-family:'Syne',sans-serif;font-size:30px;font-weight:800;color:#0f172a;letter-spacing:-1px;margin:0 0 4px;}
.ma-sub{font-family:'DM Sans',sans-serif;font-size:14px;color:#64748b;margin:0;}
.ma-header{margin-bottom:28px;}
.ma-summary{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:28px;}
.ma-summary-card{background:white;border:1px solid #e2e8f0;border-radius:14px;padding:20px;display:flex;flex-direction:column;align-items:center;gap:8px;transition:all 0.2s;}
.ma-summary-card:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,0,0,0.07);}
.ma-summary-icon{width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:16px;}
.ma-summary-val{font-family:'Syne',sans-serif;font-size:28px;font-weight:800;line-height:1;}
.ma-summary-label{font-family:'DM Sans',sans-serif;font-size:12px;color:#94a3b8;}
.ma-tabs{display:flex;gap:8px;margin-bottom:24px;flex-wrap:wrap;}
.ma-tab{padding:9px 18px;border-radius:10px;border:1px solid #e2e8f0;background:white;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:500;color:#64748b;cursor:pointer;transition:all 0.2s;display:flex;align-items:center;gap:7px;}
.ma-tab:hover{border-color:#cbd5e1;color:#0f172a;}
.ma-tab.active{background:#0f172a;color:white;border-color:#0f172a;}
.ma-tab-count{background:rgba(255,255,255,0.2);border-radius:100px;padding:1px 7px;font-size:11px;}
.ma-tab.active .ma-tab-count{background:rgba(255,255,255,0.15);}
.ma-list{display:flex;flex-direction:column;gap:14px;}
.ma-card{background:white;border:1px solid #e2e8f0;border-radius:16px;padding:22px 24px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;transition:all 0.2s;gap:20px;}
.ma-card:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,0,0,0.07);border-color:#cbd5e1;}
.ma-card-left{display:flex;align-items:center;gap:16px;flex:1;}
.ma-logo{width:48px;height:48px;border-radius:11px;display:flex;align-items:center;justify-content:center;font-family:'Syne',sans-serif;font-weight:800;font-size:18px;color:white;flex-shrink:0;}
.ma-role{font-family:'Syne',sans-serif;font-size:16px;font-weight:700;color:#0f172a;margin-bottom:3px;}
.ma-company-loc{font-family:'DM Sans',sans-serif;font-size:13px;color:#64748b;margin-bottom:10px;}
.ma-meta{display:flex;gap:8px;flex-wrap:wrap;}
.ma-pill{padding:4px 10px;background:#f1f5f9;border-radius:6px;font-size:11px;color:#475569;font-family:'DM Sans',sans-serif;}
.ma-card-right{display:flex;flex-direction:column;align-items:flex-end;gap:12px;flex-shrink:0;}
.ma-status{padding:6px 14px;border-radius:100px;font-family:'DM Sans',sans-serif;font-size:12px;font-weight:600;white-space:nowrap;}
.ma-view-btn{padding:8px 16px;background:#f1f5f9;border:none;border-radius:8px;font-family:'DM Sans',sans-serif;font-size:12px;font-weight:600;color:#475569;cursor:pointer;transition:all 0.2s;white-space:nowrap;}
.ma-view-btn:hover{background:#e2e8f0;color:#0f172a;}
.ma-empty{text-align:center;padding:80px 20px;color:#94a3b8;font-family:'DM Sans',sans-serif;font-size:15px;}
@media(max-width:900px){.ma-main{margin-left:0;padding:24px 16px;}.ma-summary{grid-template-columns:1fr 1fr;}.ma-card{flex-direction:column;align-items:flex-start;}.ma-card-right{align-items:flex-start;}}
`;