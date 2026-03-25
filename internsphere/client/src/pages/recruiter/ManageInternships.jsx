import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import RecruiterSidebar from "../../components/RecruiterSidebar";

const initialJobs = [
  { id:1, role:"Frontend Intern",     domain:"Engineering", location:"Remote",     type:"Full-time", stipend:40000, openings:5, applicants:24, deadline:"Apr 15, 2026", status:"Active",   color:"#06b6d4", posted:"Mar 1, 2026" },
  { id:2, role:"Backend Intern",      domain:"Engineering", location:"Bangalore",  type:"Part-time", stipend:35000, openings:3, applicants:18, deadline:"Apr 20, 2026", status:"Active",   color:"#818cf8", posted:"Mar 5, 2026" },
  { id:3, role:"Data Science Intern", domain:"Data",        location:"Hyderabad",  type:"Full-time", stipend:45000, openings:4, applicants:31, deadline:"Apr 10, 2026", status:"Closing",  color:"#f87171", posted:"Feb 28, 2026" },
  { id:4, role:"UI/UX Intern",        domain:"Design",      location:"Remote",     type:"Part-time", stipend:25000, openings:2, applicants:9,  deadline:"Mar 30, 2026", status:"Closed",   color:"#94a3b8", posted:"Feb 20, 2026" },
  { id:5, role:"Product Intern",      domain:"Product",     location:"Bengaluru",  type:"Full-time", stipend:42000, openings:2, applicants:15, deadline:"Apr 25, 2026", status:"Active",   color:"#34d399", posted:"Mar 10, 2026" },
];

const statusConfig = {
  Active:  { bg:"rgba(52,211,153,0.1)",  color:"#34d399" },
  Closing: { bg:"rgba(248,113,113,0.1)", color:"#f87171" },
  Closed:  { bg:"rgba(148,163,184,0.1)", color:"#94a3b8" },
};

export default function ManageInternships() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState(initialJobs);
  const [filterStatus, setFilterStatus] = useState("All");
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const filtered = filterStatus === "All" ? jobs : jobs.filter(j => j.status === filterStatus);

  const toggleStatus = (id) => {
    setJobs(prev => prev.map(j => j.id === id
      ? { ...j, status: j.status === "Active" ? "Closed" : "Active" }
      : j
    ));
  };

  const deleteJob = (id) => {
    setJobs(prev => prev.filter(j => j.id !== id));
    setDeleteConfirm(null);
  };

  const counts = { All:jobs.length, Active:jobs.filter(j=>j.status==="Active").length, Closing:jobs.filter(j=>j.status==="Closing").length, Closed:jobs.filter(j=>j.status==="Closed").length };

  return (
    <div style={s.root}>
      <style>{css}</style>
      <Navbar />
      <RecruiterSidebar active="manage" />

      {/* Delete confirm modal */}
      {deleteConfirm && (
        <div className="mi-overlay">
          <div className="mi-modal">
            <div style={{ fontSize:36, marginBottom:12 }}>🗑️</div>
            <h3 className="mi-modal-title">Delete Posting?</h3>
            <p className="mi-modal-sub">This will permanently remove the internship listing and all associated applications.</p>
            <div className="mi-modal-btns">
              <button className="mi-modal-cancel" onClick={() => setDeleteConfirm(null)}>Cancel</button>
              <button className="mi-modal-delete" onClick={() => deleteJob(deleteConfirm)}>Delete</button>
            </div>
          </div>
        </div>
      )}

      <main className="mi-main">
        <div className="mi-header">
          <div>
            <p className="mi-eyebrow">Your Listings</p>
            <h1 className="mi-title">Manage Internships</h1>
            <p className="mi-sub">{jobs.length} total postings · {counts.Active} active</p>
          </div>
          <button className="mi-post-btn" onClick={() => navigate("/recruiter/post-internship")}>
            + Post New
          </button>
        </div>

        {/* Filter tabs */}
        <div className="mi-tabs">
          {["All","Active","Closing","Closed"].map(f => (
            <button key={f} className={`mi-tab ${filterStatus===f?"active":""}`} onClick={() => setFilterStatus(f)}>
              {f} <span className="mi-tab-count">{counts[f]}</span>
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="mi-table-wrap">
          <div className="mi-table-header">
            <span>Role</span>
            <span>Domain</span>
            <span>Stipend</span>
            <span>Applicants</span>
            <span>Deadline</span>
            <span>Status</span>
            <span>Actions</span>
          </div>
          {filtered.map(job => {
            const sc = statusConfig[job.status];
            return (
              <div key={job.id} className="mi-table-row">
                <div className="mi-role-cell">
                  <div className="mi-role-dot" style={{ background:job.color }} />
                  <div>
                    <div className="mi-role-name">{job.role}</div>
                    <div className="mi-role-meta">📍 {job.location} · {job.type} · {job.openings} openings</div>
                  </div>
                </div>
                <span className="mi-cell">{job.domain}</span>
                <span className="mi-cell">₹{job.stipend.toLocaleString()}/mo</span>
                <div className="mi-cell">
                  <button className="mi-applicants-btn" onClick={() => navigate(`/recruiter/applications/${job.id}`)}>
                    👥 {job.applicants} →
                  </button>
                </div>
                <span className="mi-cell mi-deadline">{job.deadline}</span>
                <span className="mi-status" style={{ background:sc.bg, color:sc.color }}>{job.status}</span>
                <div className="mi-actions">
                  <button className="mi-action-btn" title="View applications" onClick={() => navigate(`/recruiter/applications/${job.id}`)}>👁</button>
                  <button className="mi-action-btn" title={job.status==="Active"?"Close listing":"Reopen listing"} onClick={() => toggleStatus(job.id)}>
                    {job.status==="Active" ? "⏸" : "▶️"}
                  </button>
                  <button className="mi-action-btn danger" title="Delete" onClick={() => setDeleteConfirm(job.id)}>🗑</button>
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div className="mi-empty">
              <div style={{ fontSize:40 }}>📭</div>
              <p>No internships with this status.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

const s = { root:{ minHeight:"100vh", background:"#f0f4f8", paddingTop:64, fontFamily:"'DM Sans',sans-serif" } };

const css = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
*{box-sizing:border-box;}
.mi-main{margin-left:240px;padding:40px;}
.mi-header{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:28px;flex-wrap:wrap;gap:16px;}
.mi-eyebrow{font-family:'DM Sans',sans-serif;font-size:12px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#06b6d4;margin-bottom:8px;}
.mi-title{font-family:'Syne',sans-serif;font-size:30px;font-weight:800;color:#0f172a;letter-spacing:-1px;margin:0 0 4px;}
.mi-sub{font-family:'DM Sans',sans-serif;font-size:14px;color:#64748b;margin:0;font-weight:300;}
.mi-post-btn{padding:12px 22px;background:linear-gradient(135deg,#06b6d4,#2563eb);color:white;border:none;border-radius:10px;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:600;cursor:pointer;transition:all 0.2s;white-space:nowrap;}
.mi-post-btn:hover{transform:translateY(-1px);box-shadow:0 8px 20px rgba(6,182,212,0.3);}
.mi-tabs{display:flex;gap:8px;margin-bottom:20px;flex-wrap:wrap;}
.mi-tab{padding:9px 18px;border-radius:10px;border:1px solid #e2e8f0;background:white;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:500;color:#64748b;cursor:pointer;transition:all 0.2s;display:flex;align-items:center;gap:8px;}
.mi-tab:hover{border-color:#cbd5e1;color:#0f172a;}
.mi-tab.active{background:#0f172a;color:white;border-color:#0f172a;}
.mi-tab-count{background:rgba(255,255,255,0.15);border-radius:100px;padding:1px 8px;font-size:11px;}
.mi-tab:not(.active) .mi-tab-count{background:#f1f5f9;color:#64748b;}
.mi-table-wrap{background:white;border:1px solid #e2e8f0;border-radius:16px;overflow:hidden;}
.mi-table-header{display:grid;grid-template-columns:2.5fr 1fr 1.2fr 1fr 1.2fr 1fr 1fr;gap:0;padding:14px 20px;background:#f8fafc;border-bottom:1px solid #e2e8f0;font-family:'DM Sans',sans-serif;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.8px;color:#94a3b8;}
.mi-table-row{display:grid;grid-template-columns:2.5fr 1fr 1.2fr 1fr 1.2fr 1fr 1fr;gap:0;padding:16px 20px;border-bottom:1px solid #f8fafc;align-items:center;transition:background 0.15s;}
.mi-table-row:hover{background:#fafbfc;}
.mi-table-row:last-child{border-bottom:none;}
.mi-role-cell{display:flex;align-items:center;gap:12px;}
.mi-role-dot{width:10px;height:10px;border-radius:50%;flex-shrink:0;}
.mi-role-name{font-family:'DM Sans',sans-serif;font-size:14px;font-weight:600;color:#0f172a;}
.mi-role-meta{font-family:'DM Sans',sans-serif;font-size:11px;color:#94a3b8;margin-top:2px;}
.mi-cell{font-family:'DM Sans',sans-serif;font-size:13px;color:#475569;}
.mi-deadline{color:#f59e0b;font-weight:500;}
.mi-applicants-btn{background:rgba(6,182,212,0.08);border:1px solid rgba(6,182,212,0.2);color:#06b6d4;border-radius:7px;padding:5px 10px;font-family:'DM Sans',sans-serif;font-size:12px;font-weight:600;cursor:pointer;transition:all 0.2s;}
.mi-applicants-btn:hover{background:rgba(6,182,212,0.15);}
.mi-status{padding:5px 12px;border-radius:100px;font-family:'DM Sans',sans-serif;font-size:11px;font-weight:600;white-space:nowrap;justify-self:start;}
.mi-actions{display:flex;gap:6px;}
.mi-action-btn{width:32px;height:32px;border-radius:8px;border:1px solid #e2e8f0;background:white;cursor:pointer;font-size:14px;display:flex;align-items:center;justify-content:center;transition:all 0.2s;}
.mi-action-btn:hover{background:#f1f5f9;border-color:#cbd5e1;}
.mi-action-btn.danger:hover{background:rgba(248,113,113,0.1);border-color:#f87171;}
.mi-empty{text-align:center;padding:60px 20px;color:#94a3b8;font-family:'DM Sans',sans-serif;font-size:15px;}
.mi-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:200;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(4px);}
.mi-modal{background:white;border-radius:20px;padding:40px;text-align:center;max-width:380px;width:90%;}
.mi-modal-title{font-family:'Syne',sans-serif;font-size:22px;font-weight:800;color:#0f172a;margin:0 0 10px;}
.mi-modal-sub{font-family:'DM Sans',sans-serif;font-size:14px;color:#64748b;line-height:1.6;margin-bottom:28px;font-weight:300;}
.mi-modal-btns{display:flex;gap:12px;justify-content:center;}
.mi-modal-cancel{padding:11px 24px;background:#f1f5f9;border:none;border-radius:10px;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:500;color:#475569;cursor:pointer;}
.mi-modal-delete{padding:11px 24px;background:#f87171;border:none;border-radius:10px;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:600;color:white;cursor:pointer;}
@media(max-width:1100px){.mi-table-header,.mi-table-row{grid-template-columns:2fr 1fr 1fr 1fr 1fr;}.mi-table-header span:nth-child(2),.mi-table-row .mi-cell:nth-child(2){display:none;}}
@media(max-width:900px){.mi-main{margin-left:0;padding:24px 16px;}}
`;