import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import RecruiterSidebar from "../../components/RecruiterSidebar";

const jobsMap = {
  1: { role:"Frontend Intern",     color:"#06b6d4" },
  2: { role:"Backend Intern",      color:"#818cf8" },
  3: { role:"Data Science Intern", color:"#f87171" },
};

const allApplicants = [
  { id:1, name:"Priya Sharma",   college:"IIT Bombay",   year:"3rd Year", cgpa:"9.1", branch:"CS",      status:"Shortlisted",  appliedDate:"Mar 10", skills:["React","JS","CSS"],         match:92, color:"#06b6d4" },
  { id:2, name:"Arjun Mehta",    college:"NIT Trichy",   year:"2nd Year", cgpa:"8.7", branch:"CS",      status:"Under Review", appliedDate:"Mar 11", skills:["Node.js","Python","SQL"],    match:85, color:"#818cf8" },
  { id:3, name:"Sneha Patil",    college:"BITS Pilani",  year:"4th Year", cgpa:"8.4", branch:"IT",      status:"Applied",      appliedDate:"Mar 12", skills:["React","Node.js","AWS"],     match:88, color:"#34d399" },
  { id:4, name:"Rohan Das",      college:"IIT Delhi",    year:"3rd Year", cgpa:"9.3", branch:"CS",      status:"Shortlisted",  appliedDate:"Mar 13", skills:["Python","ML","TensorFlow"],  match:94, color:"#f59e0b" },
  { id:5, name:"Anjali Nair",    college:"VIT Vellore",  year:"2nd Year", cgpa:"8.2", branch:"IT",      status:"Rejected",     appliedDate:"Mar 14", skills:["HTML","CSS","JS"],           match:61, color:"#f87171" },
  { id:6, name:"Karan Singh",    college:"DTU Delhi",    year:"3rd Year", cgpa:"8.8", branch:"CS",      status:"Applied",      appliedDate:"Mar 15", skills:["React","TypeScript","Git"],  match:87, color:"#a78bfa" },
  { id:7, name:"Meera Iyer",     college:"IIT Madras",   year:"3rd Year", cgpa:"9.0", branch:"CS",      status:"Under Review", appliedDate:"Mar 15", skills:["Vue.js","Node.js","Docker"], match:83, color:"#22d3ee" },
];

const statusConfig = {
  "Applied":      { bg:"rgba(6,182,212,0.1)",   color:"#06b6d4" },
  "Under Review": { bg:"rgba(245,158,11,0.1)",  color:"#f59e0b" },
  "Shortlisted":  { bg:"rgba(52,211,153,0.1)",  color:"#34d399" },
  "Rejected":     { bg:"rgba(248,113,113,0.1)", color:"#f87171" },
};

const statuses = ["All","Applied","Under Review","Shortlisted","Rejected"];

export default function ViewApplications() {
  const { id } = useParams();
  const navigate = useNavigate();
  const job = jobsMap[id] || jobsMap[1];
  const [filterStatus, setFilterStatus] = useState("All");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);
  const [applicants, setApplicants] = useState(allApplicants);
  const [sortBy, setSortBy] = useState("match");
  const [detailModal, setDetailModal] = useState(null);

  const filtered = applicants
    .filter(a => filterStatus === "All" || a.status === filterStatus)
    .filter(a => a.name.toLowerCase().includes(search.toLowerCase()) || a.college.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => sortBy === "match" ? b.match - a.match : sortBy === "cgpa" ? b.cgpa - a.cgpa : 0);

  const toggleSelect = (id) => setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  const selectAll = () => setSelected(filtered.map(a => a.id));
  const clearSelect = () => setSelected([]);

  const updateStatus = (applicantId, newStatus) => {
    setApplicants(prev => prev.map(a => a.id === applicantId ? { ...a, status:newStatus } : a));
    setDetailModal(prev => prev ? { ...prev, status:newStatus } : null);
  };

  const bulkUpdate = (newStatus) => {
    setApplicants(prev => prev.map(a => selected.includes(a.id) ? { ...a, status:newStatus } : a));
    clearSelect();
  };

  const counts = statuses.slice(1).reduce((acc, s) => { acc[s] = applicants.filter(a => a.status===s).length; return acc; }, {});

  return (
    <div style={s.root}>
      <style>{css}</style>
      <Navbar />
      <RecruiterSidebar active="applications" />

      {/* Detail modal */}
      {detailModal && (
        <div className="va-overlay" onClick={() => setDetailModal(null)}>
          <div className="va-modal" onClick={e => e.stopPropagation()}>
            <button className="va-modal-close" onClick={() => setDetailModal(null)}>×</button>
            <div className="va-modal-top">
              <div className="va-modal-avatar" style={{ background:`linear-gradient(135deg,${detailModal.color}cc,${detailModal.color}55)` }}>
                {detailModal.name[0]}
              </div>
              <div>
                <div className="va-modal-name">{detailModal.name}</div>
                <div className="va-modal-sub">{detailModal.college} · {detailModal.year} · {detailModal.branch}</div>
              </div>
              <div className="va-modal-match" style={{ background:`${detailModal.color}15`, color:detailModal.color }}>
                {detailModal.match}% match
              </div>
            </div>
            <div className="va-modal-meta">
              <div className="va-modal-meta-item"><span>CGPA</span><strong>{detailModal.cgpa}</strong></div>
              <div className="va-modal-meta-item"><span>Applied</span><strong>{detailModal.appliedDate}</strong></div>
              <div className="va-modal-meta-item"><span>Status</span><strong>{detailModal.status}</strong></div>
            </div>
            <div className="va-modal-skills">
              {detailModal.skills.map(sk => <span key={sk} className="va-modal-skill">{sk}</span>)}
            </div>
            <div className="va-modal-actions">
              <button className="va-action-pill shortlist" onClick={() => updateStatus(detailModal.id, "Shortlisted")}>⭐ Shortlist</button>
              <button className="va-action-pill review" onClick={() => updateStatus(detailModal.id, "Under Review")}>🔍 Under Review</button>
              <button className="va-action-pill reject" onClick={() => updateStatus(detailModal.id, "Rejected")}>✕ Reject</button>
              <button className="va-action-pill resume" onClick={() => navigate(`/recruiter/screening/${id}`)}>📄 View Resume</button>
            </div>
          </div>
        </div>
      )}

      <main className="va-main">
        <button className="va-back" onClick={() => navigate("/recruiter/manage")}>← Back to Manage</button>

        <div className="va-header">
          <div>
            <p className="va-eyebrow">Applications for</p>
            <h1 className="va-title">{job.role}</h1>
            <p className="va-sub">{applicants.length} total applicants</p>
          </div>
          <button className="va-screen-btn" onClick={() => navigate(`/recruiter/screening/${id}`)}>
            🔍 Resume Screening
          </button>
        </div>

        {/* Stats */}
        <div className="va-stats">
          {[
            { label:"Total",       val:applicants.length,          color:"#0f172a" },
            { label:"Shortlisted", val:counts["Shortlisted"]||0,   color:"#34d399" },
            { label:"Under Review",val:counts["Under Review"]||0,  color:"#f59e0b" },
            { label:"Rejected",    val:counts["Rejected"]||0,      color:"#f87171" },
          ].map((st, i) => (
            <div key={i} className="va-stat-card">
              <div className="va-stat-val" style={{ color:st.color }}>{st.val}</div>
              <div className="va-stat-label">{st.label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="va-controls">
          <div className="va-search-wrap">
            <span>🔍</span>
            <input className="va-search" placeholder="Search by name or college..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <select className="va-sort" value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="match">Sort: Best Match</option>
            <option value="cgpa">Sort: CGPA</option>
          </select>
        </div>

        <div className="va-tabs">
          {statuses.map(f => (
            <button key={f} className={`va-tab ${filterStatus===f?"active":""}`} onClick={() => setFilterStatus(f)}>
              {f} {f!=="All" && counts[f]>0 && <span className="va-tab-count">{counts[f]}</span>}
            </button>
          ))}
        </div>

        {/* Bulk actions */}
        {selected.length > 0 && (
          <div className="va-bulk">
            <span className="va-bulk-count">{selected.length} selected</span>
            <button className="va-bulk-btn shortlist" onClick={() => bulkUpdate("Shortlisted")}>⭐ Shortlist All</button>
            <button className="va-bulk-btn review" onClick={() => bulkUpdate("Under Review")}>🔍 Mark Under Review</button>
            <button className="va-bulk-btn reject" onClick={() => bulkUpdate("Rejected")}>✕ Reject All</button>
            <button className="va-bulk-clear" onClick={clearSelect}>Clear</button>
          </div>
        )}

        {/* Table */}
        <div className="va-table-wrap">
          <div className="va-table-header">
            <input type="checkbox" onChange={e => e.target.checked ? selectAll() : clearSelect()} style={{ cursor:"pointer" }} />
            <span>Applicant</span>
            <span>College</span>
            <span>CGPA</span>
            <span>Skills</span>
            <span>Match</span>
            <span>Status</span>
            <span>Actions</span>
          </div>
          {filtered.map(app => {
            const sc = statusConfig[app.status] || statusConfig["Applied"];
            return (
              <div key={app.id} className={`va-table-row ${selected.includes(app.id)?"selected":""}`}>
                <input type="checkbox" checked={selected.includes(app.id)} onChange={() => toggleSelect(app.id)} style={{ cursor:"pointer" }} />
                <div className="va-applicant-cell" onClick={() => setDetailModal(app)}>
                  <div className="va-avatar" style={{ background:`linear-gradient(135deg,${app.color}cc,${app.color}55)` }}>{app.name[0]}</div>
                  <div>
                    <div className="va-name">{app.name}</div>
                    <div className="va-year">{app.year} · Applied {app.appliedDate}</div>
                  </div>
                </div>
                <span className="va-cell">{app.college}</span>
                <span className="va-cell va-cgpa">{app.cgpa}</span>
                <div className="va-skills-cell">
                  {app.skills.slice(0,2).map(sk => <span key={sk} className="va-skill-pill">{sk}</span>)}
                  {app.skills.length > 2 && <span className="va-skill-more">+{app.skills.length-2}</span>}
                </div>
                <div className="va-match-cell">
                  <div className="va-match-bar-bg">
                    <div className="va-match-bar-fill" style={{ width:`${app.match}%`, background: app.match >= 85 ? "#34d399" : app.match >= 70 ? "#f59e0b" : "#f87171" }} />
                  </div>
                  <span className="va-match-pct">{app.match}%</span>
                </div>
                <span className="va-status" style={{ background:sc.bg, color:sc.color }}>{app.status}</span>
                <div className="va-row-actions">
                  <button className="va-row-btn" title="Shortlist" onClick={() => updateStatus(app.id,"Shortlisted")}>⭐</button>
                  <button className="va-row-btn" title="Reject" onClick={() => updateStatus(app.id,"Rejected")}>✕</button>
                  <button className="va-row-btn" title="View details" onClick={() => setDetailModal(app)}>👁</button>
                </div>
              </div>
            );
          })}
          {filtered.length===0 && (
            <div className="va-empty"><div style={{ fontSize:40 }}>📭</div><p>No applicants match your filters.</p></div>
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
.va-main{margin-left:240px;padding:40px;}
.va-back{background:none;border:none;font-family:'DM Sans',sans-serif;font-size:14px;color:#64748b;cursor:pointer;padding:0;margin-bottom:24px;}
.va-back:hover{color:#0f172a;}
.va-header{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:24px;flex-wrap:wrap;gap:16px;}
.va-eyebrow{font-family:'DM Sans',sans-serif;font-size:12px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#06b6d4;margin-bottom:8px;}
.va-title{font-family:'Syne',sans-serif;font-size:28px;font-weight:800;color:#0f172a;letter-spacing:-1px;margin:0 0 4px;}
.va-sub{font-family:'DM Sans',sans-serif;font-size:14px;color:#64748b;margin:0;}
.va-screen-btn{padding:12px 22px;background:#0f172a;color:white;border:none;border-radius:10px;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:600;cursor:pointer;transition:all 0.2s;white-space:nowrap;}
.va-screen-btn:hover{background:#1e293b;}
.va-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:24px;}
.va-stat-card{background:white;border:1px solid #e2e8f0;border-radius:12px;padding:18px;text-align:center;}
.va-stat-val{font-family:'Syne',sans-serif;font-size:28px;font-weight:800;line-height:1;}
.va-stat-label{font-family:'DM Sans',sans-serif;font-size:12px;color:#94a3b8;margin-top:4px;}
.va-controls{display:flex;gap:12px;margin-bottom:16px;flex-wrap:wrap;}
.va-search-wrap{position:relative;flex:1;min-width:220px;display:flex;align-items:center;gap:10px;background:white;border:1px solid #e2e8f0;border-radius:10px;padding:11px 14px;}
.va-search{border:none;outline:none;font-family:'DM Sans',sans-serif;font-size:14px;color:#0f172a;flex:1;background:transparent;}
.va-sort{padding:11px 14px;border:1px solid #e2e8f0;border-radius:10px;font-family:'DM Sans',sans-serif;font-size:13px;background:white;color:#475569;outline:none;cursor:pointer;}
.va-tabs{display:flex;gap:8px;margin-bottom:16px;flex-wrap:wrap;}
.va-tab{padding:8px 16px;border-radius:10px;border:1px solid #e2e8f0;background:white;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:500;color:#64748b;cursor:pointer;transition:all 0.2s;display:flex;align-items:center;gap:7px;}
.va-tab:hover{border-color:#cbd5e1;color:#0f172a;}
.va-tab.active{background:#0f172a;color:white;border-color:#0f172a;}
.va-tab-count{background:rgba(255,255,255,0.15);border-radius:100px;padding:1px 7px;font-size:11px;}
.va-tab:not(.active) .va-tab-count{background:#f1f5f9;color:#64748b;}
.va-bulk{display:flex;align-items:center;gap:10px;background:#0f172a;border-radius:12px;padding:12px 18px;margin-bottom:14px;flex-wrap:wrap;}
.va-bulk-count{font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;color:rgba(255,255,255,0.7);margin-right:4px;}
.va-bulk-btn{padding:7px 14px;border:none;border-radius:8px;font-family:'DM Sans',sans-serif;font-size:12px;font-weight:600;cursor:pointer;transition:all 0.2s;}
.va-bulk-btn.shortlist{background:rgba(52,211,153,0.2);color:#34d399;}
.va-bulk-btn.review{background:rgba(245,158,11,0.2);color:#f59e0b;}
.va-bulk-btn.reject{background:rgba(248,113,113,0.2);color:#f87171;}
.va-bulk-clear{margin-left:auto;background:none;border:none;color:rgba(255,255,255,0.4);font-family:'DM Sans',sans-serif;font-size:12px;cursor:pointer;}
.va-table-wrap{background:white;border:1px solid #e2e8f0;border-radius:16px;overflow:hidden;}
.va-table-header{display:grid;grid-template-columns:32px 2fr 1.5fr 0.7fr 1.5fr 1fr 1.2fr 1fr;gap:0;padding:12px 20px;background:#f8fafc;border-bottom:1px solid #e2e8f0;font-family:'DM Sans',sans-serif;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.8px;color:#94a3b8;align-items:center;}
.va-table-row{display:grid;grid-template-columns:32px 2fr 1.5fr 0.7fr 1.5fr 1fr 1.2fr 1fr;gap:0;padding:14px 20px;border-bottom:1px solid #f8fafc;align-items:center;transition:background 0.15s;}
.va-table-row:hover{background:#fafbfc;}
.va-table-row.selected{background:rgba(6,182,212,0.04);}
.va-table-row:last-child{border-bottom:none;}
.va-applicant-cell{display:flex;align-items:center;gap:10px;cursor:pointer;}
.va-applicant-cell:hover .va-name{color:#06b6d4;}
.va-avatar{width:36px;height:36px;border-radius:9px;display:flex;align-items:center;justify-content:center;font-family:'Syne',sans-serif;font-weight:800;font-size:14px;color:white;flex-shrink:0;}
.va-name{font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;color:#0f172a;transition:color 0.2s;}
.va-year{font-family:'DM Sans',sans-serif;font-size:11px;color:#94a3b8;margin-top:1px;}
.va-cell{font-family:'DM Sans',sans-serif;font-size:13px;color:#475569;}
.va-cgpa{font-weight:600;color:#0f172a;}
.va-skills-cell{display:flex;gap:4px;flex-wrap:wrap;}
.va-skill-pill{padding:3px 8px;background:#f1f5f9;border-radius:5px;font-size:11px;color:#475569;font-family:'DM Sans',sans-serif;}
.va-skill-more{padding:3px 8px;background:#e2e8f0;border-radius:5px;font-size:11px;color:#94a3b8;font-family:'DM Sans',sans-serif;}
.va-match-cell{display:flex;align-items:center;gap:8px;}
.va-match-bar-bg{flex:1;height:5px;background:#f1f5f9;border-radius:100px;}
.va-match-bar-fill{height:100%;border-radius:100px;transition:width 0.5s ease;}
.va-match-pct{font-family:'DM Sans',sans-serif;font-size:12px;font-weight:600;color:#0f172a;white-space:nowrap;}
.va-status{padding:4px 10px;border-radius:100px;font-family:'DM Sans',sans-serif;font-size:11px;font-weight:600;white-space:nowrap;justify-self:start;}
.va-row-actions{display:flex;gap:4px;}
.va-row-btn{width:28px;height:28px;border-radius:7px;border:1px solid #e2e8f0;background:white;cursor:pointer;font-size:12px;display:flex;align-items:center;justify-content:center;transition:all 0.2s;}
.va-row-btn:hover{background:#f1f5f9;}
.va-empty{text-align:center;padding:60px 20px;color:#94a3b8;font-family:'DM Sans',sans-serif;font-size:15px;}
.va-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:200;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(4px);}
.va-modal{background:white;border-radius:20px;padding:36px;max-width:480px;width:90%;position:relative;}
.va-modal-close{position:absolute;top:16px;right:16px;background:none;border:none;font-size:22px;cursor:pointer;color:#94a3b8;}
.va-modal-top{display:flex;align-items:center;gap:14px;margin-bottom:20px;flex-wrap:wrap;}
.va-modal-avatar{width:52px;height:52px;border-radius:13px;display:flex;align-items:center;justify-content:center;font-family:'Syne',sans-serif;font-weight:800;font-size:20px;color:white;flex-shrink:0;}
.va-modal-name{font-family:'Syne',sans-serif;font-size:20px;font-weight:800;color:#0f172a;letter-spacing:-0.3px;}
.va-modal-sub{font-family:'DM Sans',sans-serif;font-size:13px;color:#64748b;margin-top:3px;}
.va-modal-match{margin-left:auto;padding:8px 14px;border-radius:10px;font-family:'Syne',sans-serif;font-size:16px;font-weight:800;}
.va-modal-meta{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:18px;}
.va-modal-meta-item{background:#f8fafc;border-radius:10px;padding:12px;text-align:center;}
.va-modal-meta-item span{display:block;font-family:'DM Sans',sans-serif;font-size:10px;text-transform:uppercase;letter-spacing:1px;color:#94a3b8;margin-bottom:4px;}
.va-modal-meta-item strong{font-family:'DM Sans',sans-serif;font-size:14px;font-weight:600;color:#0f172a;}
.va-modal-skills{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:22px;}
.va-modal-skill{padding:6px 12px;background:rgba(6,182,212,0.08);border:1px solid rgba(6,182,212,0.2);border-radius:8px;font-family:'DM Sans',sans-serif;font-size:13px;color:#06b6d4;font-weight:500;}
.va-modal-actions{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
.va-action-pill{padding:12px;border:none;border-radius:10px;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;cursor:pointer;transition:all 0.2s;}
.va-action-pill.shortlist{background:rgba(52,211,153,0.12);color:#34d399;}
.va-action-pill.shortlist:hover{background:rgba(52,211,153,0.2);}
.va-action-pill.review{background:rgba(245,158,11,0.12);color:#f59e0b;}
.va-action-pill.review:hover{background:rgba(245,158,11,0.2);}
.va-action-pill.reject{background:rgba(248,113,113,0.1);color:#f87171;}
.va-action-pill.reject:hover{background:rgba(248,113,113,0.2);}
.va-action-pill.resume{background:#f1f5f9;color:#475569;}
.va-action-pill.resume:hover{background:#e2e8f0;}
@media(max-width:900px){.va-main{margin-left:0;padding:24px 16px;}.va-stats{grid-template-columns:1fr 1fr;}.va-table-header,.va-table-row{grid-template-columns:32px 2fr 1fr 1fr 1fr;}.va-table-header span:nth-child(4),.va-table-row .va-cell:nth-child(4),.va-table-header span:nth-child(5),.va-skills-cell{display:none;}}
`;