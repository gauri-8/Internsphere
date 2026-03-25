import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import RecruiterSidebar from "../../components/RecruiterSidebar";

const jobsMap = {
  1: { role:"Frontend Intern", skills:["React","JavaScript","CSS","HTML","Git"], color:"#06b6d4" },
  2: { role:"Backend Intern",  skills:["Node.js","Python","SQL","REST APIs"],    color:"#818cf8" },
  3: { role:"Data Science Intern", skills:["Python","ML","TensorFlow","SQL"],    color:"#f87171" },
};

const candidates = [
  { id:1, name:"Priya Sharma",  college:"IIT Bombay",   cgpa:"9.1", year:"3rd", skills:["React","JavaScript","CSS","Node.js","Git","HTML"], experience:"1 internship", match:92, status:"Shortlisted", strengths:["Strong React skills","High CGPA","Previous internship experience"], weaknesses:[], color:"#06b6d4" },
  { id:2, name:"Rohan Das",     college:"IIT Delhi",    cgpa:"9.3", year:"3rd", skills:["JavaScript","React","TypeScript","CSS","Webpack"], experience:"0 internships", match:89, status:"Shortlisted", strengths:["TypeScript expertise","Strong fundamentals"], weaknesses:["No prior work experience"], color:"#34d399" },
  { id:3, name:"Karan Singh",   college:"DTU Delhi",    cgpa:"8.8", year:"3rd", skills:["React","TypeScript","Git","REST APIs","Redux"],   experience:"0 internships", match:87, status:"Applied", strengths:["Redux knowledge","REST API experience"], weaknesses:["CGPA slightly lower"], color:"#a78bfa" },
  { id:4, name:"Sneha Patil",   college:"BITS Pilani",  cgpa:"8.4", year:"4th", skills:["React","Node.js","MongoDB","HTML","CSS"],          experience:"1 internship", match:85, status:"Applied", strengths:["Full-stack exposure","Internship experience"], weaknesses:["Less CSS depth"], color:"#f59e0b" },
  { id:5, name:"Meera Iyer",    college:"IIT Madras",   cgpa:"9.0", year:"3rd", skills:["Vue.js","JavaScript","CSS","HTML","Git"],           experience:"0 internships", match:78, status:"Under Review", strengths:["High CGPA","Strong JS foundation"], weaknesses:["Vue instead of React"], color:"#22d3ee" },
  { id:6, name:"Arjun Mehta",   college:"NIT Trichy",   cgpa:"8.7", year:"2nd", skills:["JavaScript","HTML","CSS","Bootstrap","jQuery"],    experience:"0 internships", match:65, status:"Under Review", strengths:["Eager learner","Good basics"], weaknesses:["No React experience","Junior year"], color:"#818cf8" },
  { id:7, name:"Anjali Nair",   college:"VIT Vellore",  cgpa:"8.2", year:"2nd", skills:["HTML","CSS","Bootstrap","Figma"],                  experience:"0 internships", match:52, status:"Rejected", strengths:["Design sense"], weaknesses:["No JavaScript","No React","Limited experience"], color:"#f87171" },
];

export default function ResumeScreening() {
  const { id } = useParams();
  const navigate = useNavigate();
  const job = jobsMap[id] || jobsMap[1];
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("All");
  const [threshold, setThreshold] = useState(70);
  const [statuses, setStatuses] = useState(Object.fromEntries(candidates.map(c => [c.id, c.status])));

  const filtered = candidates
    .filter(c => filter === "All" || c.match >= threshold)
    .sort((a, b) => b.match - a.match);

  const updateStatus = (cid, newStatus) => {
    setStatuses(prev => ({ ...prev, [cid]: newStatus }));
  };

  const getMatchColor = (m) => m >= 85 ? "#34d399" : m >= 70 ? "#f59e0b" : "#f87171";
  const getMatchLabel = (m) => m >= 85 ? "Strong Match" : m >= 70 ? "Good Match" : "Weak Match";

  const statusConfig = {
    "Applied":      { bg:"rgba(6,182,212,0.1)",   color:"#06b6d4" },
    "Under Review": { bg:"rgba(245,158,11,0.1)",  color:"#f59e0b" },
    "Shortlisted":  { bg:"rgba(52,211,153,0.1)",  color:"#34d399" },
    "Rejected":     { bg:"rgba(248,113,113,0.1)", color:"#f87171" },
  };

  return (
    <div style={s.root}>
      <style>{css}</style>
      <Navbar />
      <RecruiterSidebar active="applications" />
      <main className="rs-main">

        <button className="rs-back" onClick={() => navigate(`/recruiter/applications/${id}`)}>← Back to Applications</button>

        <div className="rs-header">
          <div>
            <p className="rs-eyebrow">AI-Powered Screening</p>
            <h1 className="rs-title">Resume Screening</h1>
            <p className="rs-sub">Candidates ranked by skill match for <strong>{job.role}</strong></p>
          </div>
        </div>

        {/* Required skills */}
        <div className="rs-skills-bar">
          <span className="rs-skills-label">Required Skills:</span>
          {job.skills.map(sk => <span key={sk} className="rs-req-skill" style={{ borderColor:job.color, color:job.color, background:`${job.color}11` }}>{sk}</span>)}
        </div>

        {/* Filter controls */}
        <div className="rs-controls">
          <div className="rs-threshold">
            <span className="rs-threshold-label">Minimum Match: <strong style={{ color:getMatchColor(threshold) }}>{threshold}%</strong></span>
            <input type="range" min={0} max={100} value={threshold} onChange={e => setThreshold(Number(e.target.value))} className="rs-range" />
          </div>
          <div className="rs-filter-tabs">
            {["All","Strong Match","Good Match","Weak Match"].map(f => (
              <button key={f} className={`rs-ftab ${filter===f?"active":""}`} onClick={() => setFilter(f)}>{f}</button>
            ))}
          </div>
        </div>

        <div className="rs-layout">
          {/* Candidate list */}
          <div className="rs-list">
            <div className="rs-list-header">
              <span>{filtered.length} candidates</span>
              <span className="rs-list-hint">Click a candidate to view details</span>
            </div>
            {filtered.map((c, rank) => {
              const mc = getMatchColor(c.match);
              const sc = statusConfig[statuses[c.id]];
              return (
                <div
                  key={c.id}
                  className={`rs-candidate-card ${selected?.id===c.id?"active":""}`}
                  onClick={() => setSelected(c)}
                  style={{ "--accent": c.color }}
                >
                  <div className="rs-rank">#{rank+1}</div>
                  <div className="rs-cand-avatar" style={{ background:`linear-gradient(135deg,${c.color}cc,${c.color}55)` }}>
                    {c.name[0]}
                  </div>
                  <div className="rs-cand-info">
                    <div className="rs-cand-name">{c.name}</div>
                    <div className="rs-cand-sub">{c.college} · CGPA {c.cgpa}</div>
                    <div className="rs-cand-skills">
                      {c.skills.slice(0,3).map(sk => {
                        const required = job.skills.includes(sk);
                        return <span key={sk} className="rs-cand-skill" style={required ? { background:`${job.color}15`, color:job.color, borderColor:`${job.color}40` } : {}}>{sk}</span>;
                      })}
                    </div>
                  </div>
                  <div className="rs-match-col">
                    <div className="rs-match-circle" style={{ borderColor:mc, color:mc }}>{c.match}%</div>
                    <span className="rs-match-label" style={{ color:mc }}>{getMatchLabel(c.match)}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detail panel */}
          <div className="rs-detail-panel">
            {!selected ? (
              <div className="rs-detail-empty">
                <div style={{ fontSize:40 }}>👆</div>
                <p>Select a candidate to view their detailed analysis</p>
              </div>
            ) : (
              <div className="rs-detail">
                <div className="rs-detail-top" style={{ borderColor:`${selected.color}33` }}>
                  <div className="rs-detail-avatar" style={{ background:`linear-gradient(135deg,${selected.color}cc,${selected.color}55)` }}>
                    {selected.name[0]}
                  </div>
                  <div>
                    <div className="rs-detail-name">{selected.name}</div>
                    <div className="rs-detail-sub">{selected.college} · {selected.year} Year</div>
                  </div>
                  <div className="rs-big-match" style={{ background:`${getMatchColor(selected.match)}18`, color:getMatchColor(selected.match) }}>
                    {selected.match}%
                  </div>
                </div>

                {/* Stats */}
                <div className="rs-detail-stats">
                  <div className="rs-ds"><span>CGPA</span><strong>{selected.cgpa}</strong></div>
                  <div className="rs-ds"><span>Year</span><strong>{selected.year}rd</strong></div>
                  <div className="rs-ds"><span>Experience</span><strong>{selected.experience}</strong></div>
                </div>

                {/* Match breakdown */}
                <div className="rs-detail-section">
                  <div className="rs-detail-section-title">Skill Match Breakdown</div>
                  <div className="rs-skill-breakdown">
                    {job.skills.map(sk => {
                      const has = selected.skills.includes(sk);
                      return (
                        <div key={sk} className="rs-skill-row">
                          <span className="rs-skill-name">{sk}</span>
                          <span className={`rs-skill-status ${has?"match":"miss"}`}>{has ? "✓ Has it" : "✗ Missing"}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Strengths */}
                {selected.strengths.length > 0 && (
                  <div className="rs-detail-section">
                    <div className="rs-detail-section-title">Strengths</div>
                    {selected.strengths.map((str, i) => (
                      <div key={i} className="rs-strength-item">✓ {str}</div>
                    ))}
                  </div>
                )}

                {/* Weaknesses */}
                {selected.weaknesses.length > 0 && (
                  <div className="rs-detail-section">
                    <div className="rs-detail-section-title">Areas of Concern</div>
                    {selected.weaknesses.map((w, i) => (
                      <div key={i} className="rs-weakness-item">⚠ {w}</div>
                    ))}
                  </div>
                )}

                {/* Actions */}
                <div className="rs-detail-actions">
                  <div className="rs-detail-section-title" style={{ marginBottom:12 }}>Update Status</div>
                  <div className="rs-action-grid">
                    <button className="rs-act-btn shortlist" onClick={() => updateStatus(selected.id,"Shortlisted")}>⭐ Shortlist</button>
                    <button className="rs-act-btn review"    onClick={() => updateStatus(selected.id,"Under Review")}>🔍 Review</button>
                    <button className="rs-act-btn reject"    onClick={() => updateStatus(selected.id,"Rejected")}>✕ Reject</button>
                  </div>
                  <div className="rs-current-status" style={statusConfig[statuses[selected.id]]}>
                    Current: {statuses[selected.id]}
                  </div>
                </div>
              </div>
            )}
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
.rs-main{margin-left:240px;padding:40px;}
.rs-back{background:none;border:none;font-family:'DM Sans',sans-serif;font-size:14px;color:#64748b;cursor:pointer;padding:0;margin-bottom:24px;}
.rs-back:hover{color:#0f172a;}
.rs-eyebrow{font-family:'DM Sans',sans-serif;font-size:12px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#06b6d4;margin-bottom:8px;}
.rs-title{font-family:'Syne',sans-serif;font-size:28px;font-weight:800;color:#0f172a;letter-spacing:-1px;margin:0 0 4px;}
.rs-sub{font-family:'DM Sans',sans-serif;font-size:14px;color:#64748b;margin:0;}
.rs-header{margin-bottom:20px;}
.rs-skills-bar{display:flex;align-items:center;gap:8px;flex-wrap:wrap;background:white;border:1px solid #e2e8f0;border-radius:12px;padding:14px 18px;margin-bottom:18px;}
.rs-skills-label{font-family:'DM Sans',sans-serif;font-size:12px;font-weight:600;color:#94a3b8;text-transform:uppercase;letter-spacing:0.8px;white-space:nowrap;}
.rs-req-skill{padding:5px 12px;border-radius:8px;border:1px solid;font-family:'DM Sans',sans-serif;font-size:12px;font-weight:500;}
.rs-controls{display:flex;align-items:center;gap:20px;margin-bottom:18px;flex-wrap:wrap;}
.rs-threshold{display:flex;align-items:center;gap:12px;background:white;border:1px solid #e2e8f0;border-radius:12px;padding:12px 18px;}
.rs-threshold-label{font-family:'DM Sans',sans-serif;font-size:13px;color:#64748b;white-space:nowrap;}
.rs-range{width:120px;accent-color:#06b6d4;}
.rs-filter-tabs{display:flex;gap:8px;flex-wrap:wrap;}
.rs-ftab{padding:8px 14px;border-radius:9px;border:1px solid #e2e8f0;background:white;font-family:'DM Sans',sans-serif;font-size:12px;font-weight:500;color:#64748b;cursor:pointer;transition:all 0.2s;}
.rs-ftab.active{background:#0f172a;color:white;border-color:#0f172a;}
.rs-layout{display:grid;grid-template-columns:1fr 320px;gap:20px;align-items:start;}
.rs-list{display:flex;flex-direction:column;gap:0;background:white;border:1px solid #e2e8f0;border-radius:16px;overflow:hidden;}
.rs-list-header{display:flex;justify-content:space-between;padding:14px 18px;border-bottom:1px solid #f1f5f9;font-family:'DM Sans',sans-serif;font-size:13px;color:#64748b;}
.rs-list-hint{font-size:12px;color:#94a3b8;}
.rs-candidate-card{display:flex;align-items:center;gap:12px;padding:14px 18px;cursor:pointer;transition:all 0.2s;border-bottom:1px solid #f8fafc;position:relative;}
.rs-candidate-card::before{content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:var(--accent);opacity:0;transition:opacity 0.2s;}
.rs-candidate-card:hover{background:#fafbfc;}
.rs-candidate-card.active{background:rgba(6,182,212,0.04);border-left:3px solid #06b6d4;}
.rs-candidate-card.active::before{opacity:1;}
.rs-candidate-card:last-child{border-bottom:none;}
.rs-rank{font-family:'Syne',sans-serif;font-size:13px;font-weight:800;color:#94a3b8;width:24px;text-align:center;flex-shrink:0;}
.rs-cand-avatar{width:38px;height:38px;border-radius:9px;display:flex;align-items:center;justify-content:center;font-family:'Syne',sans-serif;font-weight:800;font-size:15px;color:white;flex-shrink:0;}
.rs-cand-info{flex:1;min-width:0;}
.rs-cand-name{font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;color:#0f172a;}
.rs-cand-sub{font-family:'DM Sans',sans-serif;font-size:11px;color:#94a3b8;margin:2px 0 6px;}
.rs-cand-skills{display:flex;gap:4px;flex-wrap:wrap;}
.rs-cand-skill{padding:2px 7px;background:#f1f5f9;border-radius:5px;font-size:10px;color:#475569;font-family:'DM Sans',sans-serif;border:1px solid transparent;}
.rs-match-col{display:flex;flex-direction:column;align-items:center;gap:4px;flex-shrink:0;}
.rs-match-circle{width:46px;height:46px;border-radius:50%;border:2px solid;display:flex;align-items:center;justify-content:center;font-family:'Syne',sans-serif;font-size:12px;font-weight:800;}
.rs-match-label{font-family:'DM Sans',sans-serif;font-size:9px;font-weight:600;text-align:center;}
.rs-detail-panel{background:white;border:1px solid #e2e8f0;border-radius:16px;overflow:hidden;position:sticky;top:84px;}
.rs-detail-empty{padding:60px 24px;text-align:center;color:#94a3b8;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:300;}
.rs-detail{padding:24px;}
.rs-detail-top{display:flex;align-items:center;gap:12px;padding-bottom:18px;border-bottom:1px solid;margin-bottom:16px;flex-wrap:wrap;}
.rs-detail-avatar{width:48px;height:48px;border-radius:11px;display:flex;align-items:center;justify-content:center;font-family:'Syne',sans-serif;font-weight:800;font-size:18px;color:white;flex-shrink:0;}
.rs-detail-name{font-family:'Syne',sans-serif;font-size:16px;font-weight:800;color:#0f172a;letter-spacing:-0.3px;}
.rs-detail-sub{font-family:'DM Sans',sans-serif;font-size:12px;color:#64748b;margin-top:2px;}
.rs-big-match{margin-left:auto;padding:8px 14px;border-radius:10px;font-family:'Syne',sans-serif;font-size:20px;font-weight:800;}
.rs-detail-stats{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:16px;}
.rs-ds{background:#f8fafc;border-radius:9px;padding:10px;text-align:center;}
.rs-ds span{display:block;font-family:'DM Sans',sans-serif;font-size:10px;text-transform:uppercase;letter-spacing:0.8px;color:#94a3b8;margin-bottom:3px;}
.rs-ds strong{font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;color:#0f172a;}
.rs-detail-section{margin-bottom:16px;}
.rs-detail-section-title{font-family:'DM Sans',sans-serif;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:1px;color:#94a3b8;margin-bottom:10px;}
.rs-skill-breakdown{display:flex;flex-direction:column;gap:6px;}
.rs-skill-row{display:flex;justify-content:space-between;align-items:center;padding:7px 10px;background:#f8fafc;border-radius:8px;}
.rs-skill-name{font-family:'DM Sans',sans-serif;font-size:13px;color:#0f172a;font-weight:500;}
.rs-skill-status{font-family:'DM Sans',sans-serif;font-size:11px;font-weight:600;padding:3px 8px;border-radius:5px;}
.rs-skill-status.match{background:rgba(52,211,153,0.1);color:#34d399;}
.rs-skill-status.miss{background:rgba(248,113,113,0.1);color:#f87171;}
.rs-strength-item{font-family:'DM Sans',sans-serif;font-size:13px;color:#34d399;padding:5px 0;border-bottom:1px solid #f8fafc;font-weight:400;}
.rs-weakness-item{font-family:'DM Sans',sans-serif;font-size:13px;color:#f59e0b;padding:5px 0;border-bottom:1px solid #f8fafc;font-weight:400;}
.rs-detail-actions{}
.rs-action-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:10px;}
.rs-act-btn{padding:10px 8px;border:none;border-radius:9px;font-family:'DM Sans',sans-serif;font-size:12px;font-weight:600;cursor:pointer;transition:all 0.2s;}
.rs-act-btn.shortlist{background:rgba(52,211,153,0.12);color:#34d399;}
.rs-act-btn.shortlist:hover{background:rgba(52,211,153,0.2);}
.rs-act-btn.review{background:rgba(245,158,11,0.12);color:#f59e0b;}
.rs-act-btn.review:hover{background:rgba(245,158,11,0.2);}
.rs-act-btn.reject{background:rgba(248,113,113,0.1);color:#f87171;}
.rs-act-btn.reject:hover{background:rgba(248,113,113,0.2);}
.rs-current-status{padding:8px 12px;border-radius:8px;font-family:'DM Sans',sans-serif;font-size:12px;font-weight:600;text-align:center;}
@media(max-width:1100px){.rs-layout{grid-template-columns:1fr;}}
@media(max-width:900px){.rs-main{margin-left:0;padding:24px 16px;}.rs-detail-panel{position:static;}}
`;