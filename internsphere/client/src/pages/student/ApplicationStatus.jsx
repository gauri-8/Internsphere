import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

const applicationData = {
  1: {
    company:"Google", role:"Frontend Intern", location:"Remote", stipend:"₹40,000/mo",
    duration:"3 months", appliedDate:"March 10, 2026", color:"#06b6d4",
    currentStatus:"Shortlisted",
    timeline:[
      { stage:"Application Submitted", date:"March 10, 2026", done:true,  note:"Your application was successfully submitted." },
      { stage:"Application Reviewed",  date:"March 12, 2026", done:true,  note:"A recruiter has reviewed your profile and resume." },
      { stage:"Shortlisted",           date:"March 15, 2026", done:true,  note:"Congratulations! You've been shortlisted for the next round." },
      { stage:"Interview Scheduled",   date:"Pending",        done:false, note:"You will receive an interview invite soon." },
      { stage:"Final Decision",        date:"Pending",        done:false, note:"Offer or rejection based on interview performance." },
    ],
    recruiterNote:"Your profile stood out! We were impressed by your React and JavaScript skills. Expect an interview invite in the next 2–3 business days.",
    skills:["React","JavaScript","CSS","Git"],
    nextStep:"Watch your email for an interview scheduling link from Google Careers.",
  },
  2: {
    company:"Microsoft", role:"Backend Intern", location:"Bangalore", stipend:"₹35,000/mo",
    duration:"6 months", appliedDate:"March 12, 2026", color:"#818cf8",
    currentStatus:"Under Review",
    timeline:[
      { stage:"Application Submitted", date:"March 12, 2026", done:true,  note:"Your application was successfully submitted." },
      { stage:"Application Reviewed",  date:"Pending",        done:false, note:"A recruiter will review your application soon." },
      { stage:"Shortlisted",           date:"Pending",        done:false, note:"You'll be notified if shortlisted." },
      { stage:"Interview Scheduled",   date:"Pending",        done:false, note:"Interview details will be shared once shortlisted." },
      { stage:"Final Decision",        date:"Pending",        done:false, note:"Decision will follow the interview." },
    ],
    recruiterNote:null,
    skills:["Node.js","Python","SQL","Docker"],
    nextStep:"Your application is being reviewed. This usually takes 3–5 business days.",
  },
  4: {
    company:"Flipkart", role:"Mobile Dev Intern", location:"Bengaluru", stipend:"₹30,000/mo",
    duration:"4 months", appliedDate:"March 15, 2026", color:"#f59e0b",
    currentStatus:"Rejected",
    timeline:[
      { stage:"Application Submitted", date:"March 15, 2026", done:true,  note:"Your application was successfully submitted." },
      { stage:"Application Reviewed",  date:"March 16, 2026", done:true,  note:"Recruiter reviewed your profile." },
      { stage:"Not Selected",          date:"March 17, 2026", done:true,  note:"Unfortunately, your application was not taken forward this time." },
    ],
    recruiterNote:"Thank you for applying. We had many strong candidates and decided to move forward with others who more closely matched our requirements. We encourage you to apply again in the future.",
    skills:["React Native","Flutter","iOS","Android"],
    nextStep:"Don't get discouraged — keep applying! Browse more internships on InternSphere.",
  },
};

const statusConfig = {
  "Applied":       { color:"#06b6d4", bg:"rgba(6,182,212,0.1)"   },
  "Under Review":  { color:"#f59e0b", bg:"rgba(245,158,11,0.1)"  },
  "Shortlisted":   { color:"#34d399", bg:"rgba(52,211,153,0.1)"  },
  "Rejected":      { color:"#f87171", bg:"rgba(248,113,113,0.1)" },
  "Offered":       { color:"#818cf8", bg:"rgba(129,140,248,0.1)" },
};

export default function ApplicationStatus() {
  const { id } = useParams();
  const navigate = useNavigate();
  const app = applicationData[id] || applicationData[1];
  const sc = statusConfig[app.currentStatus] || statusConfig["Applied"];

  return (
    <div style={s.root}>
      <style>{css}</style>
      <Navbar />
      <Sidebar active="applications" />
      <main className="as-main">

        <button className="as-back" onClick={() => navigate("/student/my-applications")}>← Back to Applications</button>

        <div className="as-layout">
          {/* Left */}
          <div className="as-left">

            {/* Hero */}
            <div className="as-hero" style={{ "--accent": app.color }}>
              <div className="as-hero-top">
                <div className="as-logo" style={{ background:`linear-gradient(135deg,${app.color}cc,${app.color}55)` }}>
                  {app.company[0]}
                </div>
                <div>
                  <h1 className="as-role">{app.role}</h1>
                  <p className="as-company">{app.company} · {app.location}</p>
                </div>
                <div style={{ marginLeft:"auto" }}>
                  <span className="as-status-badge" style={{ background:sc.bg, color:sc.color }}>{app.currentStatus}</span>
                </div>
              </div>
              <div className="as-meta-row">
                <span className="as-pill">💰 {app.stipend}</span>
                <span className="as-pill">📅 Applied {app.appliedDate}</span>
                <span className="as-pill">⏱ {app.duration}</span>
              </div>
            </div>

            {/* Timeline */}
            <div className="as-section">
              <h2 className="as-section-title">Application Timeline</h2>
              <div className="as-timeline">
                {app.timeline.map((t, i) => (
                  <div key={i} className={`as-tl-item ${t.done ? "done" : "pending"}`}>
                    <div className="as-tl-left">
                      <div className="as-tl-dot" style={t.done ? { background:app.color, borderColor:app.color } : {}}>
                        {t.done ? "✓" : ""}
                      </div>
                      {i < app.timeline.length - 1 && (
                        <div className="as-tl-line" style={t.done ? { background:`${app.color}44` } : {}} />
                      )}
                    </div>
                    <div className="as-tl-content">
                      <div className="as-tl-stage">{t.stage}</div>
                      <div className="as-tl-date">{t.date}</div>
                      <div className="as-tl-note">{t.note}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Next step */}
            <div className="as-next-step">
              <span style={{ fontSize:20 }}>💡</span>
              <div>
                <div className="as-next-label">Next Step</div>
                <div className="as-next-text">{app.nextStep}</div>
              </div>
            </div>

          </div>

          {/* Right */}
          <div className="as-right">

            {/* Recruiter note */}
            {app.recruiterNote && (
              <div className="as-note-card" style={{ borderColor:`${app.color}44` }}>
                <div className="as-note-header" style={{ color:app.color }}>
                  <span>💬</span> Recruiter's Note
                </div>
                <p className="as-note-text">"{app.recruiterNote}"</p>
              </div>
            )}

            {/* Skills assessed */}
            <div className="as-skills-card">
              <h3 className="as-card-title">Skills Assessed</h3>
              <div className="as-skills">
                {app.skills.map((sk) => (
                  <span key={sk} className="as-skill-tag" style={{ borderColor:app.color, color:app.color, background:`${app.color}11` }}>
                    {sk}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="as-actions-card">
              <h3 className="as-card-title">Actions</h3>
              <button className="as-action-btn primary" onClick={() => navigate("/student/browse")}>
                Browse More Internships
              </button>
              {app.currentStatus !== "Rejected" && (
                <button className="as-action-btn secondary">Download Application</button>
              )}
              {app.currentStatus === "Rejected" && (
                <button className="as-action-btn secondary" onClick={() => navigate(`/student/apply/${id}`)}>
                  Apply to Similar Roles
                </button>
              )}
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

const s = { root:{ minHeight:"100vh", background:"#f0f4f8", paddingTop:64, fontFamily:"'DM Sans',sans-serif" } };

const css = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
.as-main{margin-left:240px;padding:40px;}
.as-back{background:none;border:none;font-family:'DM Sans',sans-serif;font-size:14px;color:#64748b;cursor:pointer;padding:0;margin-bottom:24px;}
.as-back:hover{color:#0f172a;}
.as-layout{display:grid;grid-template-columns:1fr 300px;gap:24px;align-items:start;}
.as-left{display:flex;flex-direction:column;gap:20px;}
.as-hero{background:white;border:1px solid #e2e8f0;border-radius:16px;padding:28px;border-top:3px solid var(--accent);}
.as-hero-top{display:flex;align-items:center;gap:16px;margin-bottom:18px;flex-wrap:wrap;}
.as-logo{width:52px;height:52px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-family:'Syne',sans-serif;font-weight:800;font-size:20px;color:white;flex-shrink:0;}
.as-role{font-family:'Syne',sans-serif;font-size:22px;font-weight:800;color:#0f172a;letter-spacing:-0.5px;margin:0 0 4px;}
.as-company{font-family:'DM Sans',sans-serif;font-size:14px;color:#64748b;margin:0;}
.as-status-badge{padding:7px 16px;border-radius:100px;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;}
.as-meta-row{display:flex;gap:8px;flex-wrap:wrap;}
.as-pill{padding:6px 12px;background:#f1f5f9;border-radius:8px;font-size:12px;color:#475569;font-family:'DM Sans',sans-serif;}
.as-section{background:white;border:1px solid #e2e8f0;border-radius:16px;padding:28px;}
.as-section-title{font-family:'Syne',sans-serif;font-size:18px;font-weight:800;color:#0f172a;letter-spacing:-0.3px;margin:0 0 24px;}
.as-timeline{display:flex;flex-direction:column;}
.as-tl-item{display:flex;gap:16px;}
.as-tl-left{display:flex;flex-direction:column;align-items:center;width:32px;flex-shrink:0;}
.as-tl-dot{width:28px;height:28px;border-radius:50%;border:2px solid #e2e8f0;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:white;flex-shrink:0;transition:all 0.3s;}
.as-tl-item.pending .as-tl-dot{background:white;border-color:#e2e8f0;}
.as-tl-line{flex:1;width:2px;background:#f1f5f9;margin:4px 0;}
.as-tl-content{padding-bottom:28px;flex:1;}
.as-tl-stage{font-family:'DM Sans',sans-serif;font-size:14px;font-weight:600;color:#0f172a;margin-bottom:2px;}
.as-tl-item.pending .as-tl-stage{color:#94a3b8;}
.as-tl-date{font-family:'DM Sans',sans-serif;font-size:12px;color:#94a3b8;margin-bottom:4px;}
.as-tl-note{font-family:'DM Sans',sans-serif;font-size:13px;color:#64748b;line-height:1.5;font-weight:300;}
.as-tl-item.pending .as-tl-note{color:#cbd5e1;}
.as-next-step{background:linear-gradient(135deg,#080c1a,#1e293b);border-radius:14px;padding:20px 24px;display:flex;align-items:flex-start;gap:14px;border:1px solid rgba(255,255,255,0.08);}
.as-next-label{font-family:'DM Sans',sans-serif;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:1px;color:rgba(255,255,255,0.4);margin-bottom:4px;}
.as-next-text{font-family:'DM Sans',sans-serif;font-size:14px;color:rgba(255,255,255,0.75);line-height:1.6;font-weight:300;}
.as-right{display:flex;flex-direction:column;gap:16px;position:sticky;top:84px;}
.as-note-card{background:white;border:1px solid;border-radius:16px;padding:24px;}
.as-note-header{font-family:'DM Sans',sans-serif;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;display:flex;align-items:center;gap:6px;margin-bottom:12px;}
.as-note-text{font-family:'DM Sans',sans-serif;font-size:14px;color:#475569;line-height:1.7;margin:0;font-style:italic;font-weight:300;}
.as-skills-card,.as-actions-card{background:white;border:1px solid #e2e8f0;border-radius:16px;padding:24px;}
.as-card-title{font-family:'Syne',sans-serif;font-size:15px;font-weight:800;color:#0f172a;margin:0 0 14px;}
.as-skills{display:flex;flex-wrap:wrap;gap:8px;}
.as-skill-tag{padding:6px 12px;border-radius:8px;border:1px solid;font-family:'DM Sans',sans-serif;font-size:12px;font-weight:500;}
.as-action-btn{width:100%;padding:12px;border-radius:10px;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:600;cursor:pointer;transition:all 0.2s;margin-bottom:10px;border:none;}
.as-action-btn.primary{background:#0f172a;color:white;}
.as-action-btn.primary:hover{background:#1e293b;}
.as-action-btn.secondary{background:#f1f5f9;color:#475569;}
.as-action-btn.secondary:hover{background:#e2e8f0;}
@media(max-width:1100px){.as-layout{grid-template-columns:1fr;}}
@media(max-width:900px){.as-main{margin-left:0;padding:24px 16px;}.as-right{position:static;}}
`;