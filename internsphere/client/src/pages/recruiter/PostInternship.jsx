import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import RecruiterSidebar from "../../components/RecruiterSidebar";

export default function PostInternship() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [newSkill, setNewSkill] = useState("");

  const [form, setForm] = useState({
    title:"", domain:"", type:"Full-time", location:"", locationType:"Remote",
    duration:"", stipend:"", openings:"", deadline:"",
    about:"", responsibilities:"", requirements:"",
    skills:[], perks:"",
  });

  const update = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const addSkill = () => {
    if (newSkill.trim() && !form.skills.includes(newSkill.trim())) {
      setForm(p => ({ ...p, skills: [...p.skills, newSkill.trim()] }));
      setNewSkill("");
    }
  };

  const removeSkill = (sk) => setForm(p => ({ ...p, skills: p.skills.filter(s => s !== sk) }));

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => navigate("/recruiter/manage"), 3000);
  };

  if (submitted) {
    return (
      <div style={s.root}>
        <style>{css}</style>
        <Navbar />
        <RecruiterSidebar active="post" />
        <main className="pi-main">
          <div className="pi-success">
            <div style={{ fontSize:56 }}>🎉</div>
            <h2 className="pi-success-title">Internship Posted!</h2>
            <p className="pi-success-sub">Your internship listing is now live and visible to students on InternSphere.</p>
            <p className="pi-success-redirect">Redirecting to Manage Internships...</p>
          </div>
        </main>
      </div>
    );
  }

  const steps = ["Basic Details", "Role Description", "Skills & Perks", "Review & Post"];

  return (
    <div style={s.root}>
      <style>{css}</style>
      <Navbar />
      <RecruiterSidebar active="post" />
      <main className="pi-main">

        <div className="pi-header">
          <p className="pi-eyebrow">New Listing</p>
          <h1 className="pi-title">Post an Internship</h1>
          <p className="pi-sub">Fill in the details below to create your internship listing.</p>
        </div>

        {/* Stepper */}
        <div className="pi-stepper">
          {steps.map((label, i) => {
            const n = i + 1;
            const done = step > n;
            const active = step === n;
            return (
              <div key={n} className="pi-step-item">
                <div className={`pi-step-circle ${done?"done":""} ${active?"active":""}`}>
                  {done ? "✓" : n}
                </div>
                <span className={`pi-step-label ${active?"active-label":""}`}>{label}</span>
                {i < steps.length - 1 && <div className={`pi-step-line ${done?"done-line":""}`} />}
              </div>
            );
          })}
        </div>

        <div className="pi-card">

          {/* Step 1 — Basic Details */}
          {step === 1 && (
            <div className="pi-form">
              <h2 className="pi-form-title">Basic Details</h2>
              <Field label="Internship Title" placeholder="e.g. Frontend Developer Intern" value={form.title} onChange={v => update("title",v)} />
              <div className="pi-row">
                <div className="pi-field">
                  <label className="pi-label">Domain</label>
                  <select className="pi-input" value={form.domain} onChange={e => update("domain",e.target.value)}>
                    <option value="">Select domain</option>
                    {["Engineering","Design","Data Science","Product","Marketing","Finance","Operations"].map(d => <option key={d}>{d}</option>)}
                  </select>
                </div>
                <div className="pi-field">
                  <label className="pi-label">Internship Type</label>
                  <select className="pi-input" value={form.type} onChange={e => update("type",e.target.value)}>
                    <option>Full-time</option>
                    <option>Part-time</option>
                  </select>
                </div>
              </div>
              <div className="pi-row">
                <div className="pi-field">
                  <label className="pi-label">Location Type</label>
                  <select className="pi-input" value={form.locationType} onChange={e => update("locationType",e.target.value)}>
                    <option>Remote</option>
                    <option>On-site</option>
                    <option>Hybrid</option>
                  </select>
                </div>
                {form.locationType !== "Remote" && (
                  <Field label="City" placeholder="e.g. Bangalore" value={form.location} onChange={v => update("location",v)} />
                )}
              </div>
              <div className="pi-row">
                <Field label="Duration" placeholder="e.g. 3 months" value={form.duration} onChange={v => update("duration",v)} />
                <Field label="Monthly Stipend (₹)" placeholder="e.g. 30000" value={form.stipend} onChange={v => update("stipend",v)} />
              </div>
              <div className="pi-row">
                <Field label="Number of Openings" placeholder="e.g. 5" value={form.openings} onChange={v => update("openings",v)} />
                <Field label="Application Deadline" placeholder="" type="date" value={form.deadline} onChange={v => update("deadline",v)} />
              </div>
            </div>
          )}

          {/* Step 2 — Role Description */}
          {step === 2 && (
            <div className="pi-form">
              <h2 className="pi-form-title">Role Description</h2>
              <div className="pi-field">
                <label className="pi-label">About the Company</label>
                <textarea className="pi-textarea" rows={3} placeholder="Brief description of your company..." value={form.about} onChange={e => update("about",e.target.value)} />
              </div>
              <div className="pi-field">
                <label className="pi-label">Responsibilities</label>
                <textarea className="pi-textarea" rows={5} placeholder="List key responsibilities (one per line)..." value={form.responsibilities} onChange={e => update("responsibilities",e.target.value)} />
              </div>
              <div className="pi-field">
                <label className="pi-label">Requirements</label>
                <textarea className="pi-textarea" rows={5} placeholder="List candidate requirements (one per line)..." value={form.requirements} onChange={e => update("requirements",e.target.value)} />
              </div>
            </div>
          )}

          {/* Step 3 — Skills & Perks */}
          {step === 3 && (
            <div className="pi-form">
              <h2 className="pi-form-title">Skills & Perks</h2>
              <div className="pi-field">
                <label className="pi-label">Required Skills</label>
                <div className="pi-skills-wrap">
                  {form.skills.map(sk => (
                    <span key={sk} className="pi-skill-tag">
                      {sk}
                      <button className="pi-skill-remove" onClick={() => removeSkill(sk)}>×</button>
                    </span>
                  ))}
                </div>
                <div className="pi-add-skill">
                  <input className="pi-input" placeholder="Type a skill and press Add..." value={newSkill} onChange={e => setNewSkill(e.target.value)} onKeyDown={e => e.key==="Enter" && addSkill()} style={{ flex:1 }} />
                  <button className="pi-add-btn" onClick={addSkill}>Add</button>
                </div>
              </div>
              <div className="pi-field">
                <label className="pi-label">Perks & Benefits</label>
                <textarea className="pi-textarea" rows={4} placeholder="e.g. Certificate of completion, Letter of recommendation, PPO opportunity..." value={form.perks} onChange={e => update("perks",e.target.value)} />
              </div>
            </div>
          )}

          {/* Step 4 — Review */}
          {step === 4 && (
            <div className="pi-form">
              <h2 className="pi-form-title">Review Your Listing</h2>

              <div className="pi-preview-card">
                <div className="pi-preview-top">
                  <div className="pi-preview-logo">T</div>
                  <div>
                    <div className="pi-preview-role">{form.title || "Internship Title"}</div>
                    <div className="pi-preview-company">TechCorp India</div>
                  </div>
                </div>
                <div className="pi-preview-pills">
                  <span className="pi-prev-pill">📍 {form.locationType}{form.location ? ` · ${form.location}` : ""}</span>
                  <span className="pi-prev-pill">⏱ {form.type}</span>
                  <span className="pi-prev-pill">📅 {form.duration || "Duration"}</span>
                  <span className="pi-prev-pill">💰 ₹{form.stipend || "0"}/mo</span>
                  <span className="pi-prev-pill">🎯 {form.openings || "0"} openings</span>
                </div>
                {form.skills.length > 0 && (
                  <div className="pi-preview-skills">
                    {form.skills.map(sk => <span key={sk} className="pi-prev-skill">{sk}</span>)}
                  </div>
                )}
              </div>

              <div className="pi-review-grid">
                {[
                  { label:"Domain",    val:form.domain || "—" },
                  { label:"Deadline",  val:form.deadline || "—" },
                  { label:"Openings",  val:form.openings || "—" },
                  { label:"Stipend",   val:form.stipend ? `₹${form.stipend}/mo` : "—" },
                ].map(item => (
                  <div key={item.label} className="pi-review-item">
                    <div className="pi-review-label">{item.label}</div>
                    <div className="pi-review-val">{item.val}</div>
                  </div>
                ))}
              </div>

              {form.responsibilities && (
                <div className="pi-field">
                  <label className="pi-label">Responsibilities Preview</label>
                  <p className="pi-preview-text">{form.responsibilities}</p>
                </div>
              )}
            </div>
          )}

          {/* Navigation */}
          <div className="pi-nav">
            {step > 1 && <button className="pi-btn-secondary" onClick={() => setStep(s => s - 1)}>← Previous</button>}
            <div style={{ flex:1 }} />
            {step < 4
              ? <button className="pi-btn-primary" onClick={() => setStep(s => s + 1)}>Continue →</button>
              : <button className="pi-btn-primary" onClick={handleSubmit}>🚀 Post Internship</button>
            }
          </div>
        </div>
      </main>
    </div>
  );
}

function Field({ label, placeholder, type="text", value, onChange }) {
  return (
    <div className="pi-field">
      <label className="pi-label">{label}</label>
      <input type={type} className="pi-input" placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)} />
    </div>
  );
}

const s = { root:{ minHeight:"100vh", background:"#f0f4f8", paddingTop:64, fontFamily:"'DM Sans',sans-serif" } };

const css = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
*{box-sizing:border-box;}
.pi-main{margin-left:240px;padding:40px;max-width:900px;}
.pi-eyebrow{font-family:'DM Sans',sans-serif;font-size:12px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#06b6d4;margin-bottom:8px;}
.pi-title{font-family:'Syne',sans-serif;font-size:30px;font-weight:800;color:#0f172a;letter-spacing:-1px;margin:0 0 4px;}
.pi-sub{font-family:'DM Sans',sans-serif;font-size:14px;color:#64748b;margin:0 0 28px;font-weight:300;}
.pi-stepper{display:flex;align-items:center;background:white;border:1px solid #e2e8f0;border-radius:14px;padding:20px 28px;margin-bottom:24px;gap:0;}
.pi-step-item{display:flex;align-items:center;gap:10px;flex:1;}
.pi-step-circle{width:32px;height:32px;border-radius:50%;background:#e2e8f0;color:#94a3b8;display:flex;align-items:center;justify-content:center;font-family:'Syne',sans-serif;font-size:13px;font-weight:800;flex-shrink:0;transition:all 0.3s;}
.pi-step-circle.active{background:#06b6d4;color:white;}
.pi-step-circle.done{background:#34d399;color:white;}
.pi-step-label{font-family:'DM Sans',sans-serif;font-size:13px;color:#94a3b8;white-space:nowrap;}
.pi-step-label.active-label{color:#0f172a;font-weight:600;}
.pi-step-line{flex:1;height:2px;background:#e2e8f0;margin:0 8px;transition:all 0.3s;}
.pi-step-line.done-line{background:#34d399;}
.pi-card{background:white;border:1px solid #e2e8f0;border-radius:16px;padding:36px;}
.pi-form-title{font-family:'Syne',sans-serif;font-size:20px;font-weight:800;color:#0f172a;letter-spacing:-0.5px;margin:0 0 28px;}
.pi-row{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:4px;}
.pi-field{display:flex;flex-direction:column;margin-bottom:20px;}
.pi-label{font-family:'DM Sans',sans-serif;font-size:11px;font-weight:600;letter-spacing:0.8px;text-transform:uppercase;color:#94a3b8;margin-bottom:8px;}
.pi-input{padding:12px 14px;border:1px solid #e2e8f0;border-radius:10px;font-family:'DM Sans',sans-serif;font-size:14px;color:#0f172a;outline:none;transition:border 0.2s;background:white;}
.pi-input:focus{border-color:#06b6d4;box-shadow:0 0 0 3px rgba(6,182,212,0.1);}
.pi-textarea{padding:12px 14px;border:1px solid #e2e8f0;border-radius:10px;font-family:'DM Sans',sans-serif;font-size:14px;color:#0f172a;outline:none;resize:vertical;transition:border 0.2s;line-height:1.6;}
.pi-textarea:focus{border-color:#06b6d4;box-shadow:0 0 0 3px rgba(6,182,212,0.1);}
.pi-skills-wrap{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px;min-height:36px;}
.pi-skill-tag{padding:7px 12px;background:rgba(6,182,212,0.08);border:1px solid rgba(6,182,212,0.25);border-radius:8px;font-family:'DM Sans',sans-serif;font-size:13px;color:#06b6d4;font-weight:500;display:flex;align-items:center;gap:6px;}
.pi-skill-remove{background:none;border:none;color:#06b6d4;cursor:pointer;font-size:16px;padding:0;line-height:1;opacity:0.6;}
.pi-skill-remove:hover{opacity:1;}
.pi-add-skill{display:flex;gap:10px;}
.pi-add-btn{padding:12px 20px;background:#06b6d4;color:white;border:none;border-radius:10px;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;cursor:pointer;white-space:nowrap;}
.pi-nav{display:flex;align-items:center;margin-top:32px;padding-top:24px;border-top:1px solid #f1f5f9;}
.pi-btn-primary{padding:13px 28px;background:linear-gradient(135deg,#06b6d4,#2563eb);color:white;border:none;border-radius:10px;font-family:'DM Sans',sans-serif;font-size:15px;font-weight:600;cursor:pointer;transition:all 0.2s;}
.pi-btn-primary:hover{transform:translateY(-1px);box-shadow:0 8px 20px rgba(6,182,212,0.3);}
.pi-btn-secondary{padding:13px 24px;background:#f1f5f9;color:#475569;border:none;border-radius:10px;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:500;cursor:pointer;}
.pi-btn-secondary:hover{background:#e2e8f0;}
.pi-preview-card{background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;padding:24px;margin-bottom:20px;}
.pi-preview-top{display:flex;align-items:center;gap:14px;margin-bottom:14px;}
.pi-preview-logo{width:44px;height:44px;border-radius:10px;background:linear-gradient(135deg,#06b6d4,#2563eb);display:flex;align-items:center;justify-content:center;font-family:'Syne',sans-serif;font-weight:800;font-size:18px;color:white;}
.pi-preview-role{font-family:'Syne',sans-serif;font-size:17px;font-weight:800;color:#0f172a;margin-bottom:3px;}
.pi-preview-company{font-family:'DM Sans',sans-serif;font-size:13px;color:#64748b;}
.pi-preview-pills{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px;}
.pi-prev-pill{padding:5px 10px;background:white;border:1px solid #e2e8f0;border-radius:6px;font-size:12px;color:#475569;font-family:'DM Sans',sans-serif;}
.pi-preview-skills{display:flex;gap:6px;flex-wrap:wrap;}
.pi-prev-skill{padding:5px 10px;background:rgba(6,182,212,0.08);border:1px solid rgba(6,182,212,0.2);border-radius:6px;font-size:12px;color:#06b6d4;font-family:'DM Sans',sans-serif;}
.pi-review-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:20px;}
.pi-review-item{background:#f8fafc;border-radius:10px;padding:14px 16px;}
.pi-review-label{font-family:'DM Sans',sans-serif;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.8px;color:#94a3b8;margin-bottom:4px;}
.pi-review-val{font-family:'DM Sans',sans-serif;font-size:14px;color:#0f172a;font-weight:500;}
.pi-preview-text{font-family:'DM Sans',sans-serif;font-size:13px;color:#475569;line-height:1.7;margin:0;white-space:pre-line;font-weight:300;}
.pi-success{max-width:480px;margin:100px auto;text-align:center;background:white;border:1px solid #e2e8f0;border-radius:20px;padding:60px 40px;}
.pi-success-title{font-family:'Syne',sans-serif;font-size:28px;font-weight:800;color:#0f172a;letter-spacing:-1px;margin:16px 0 12px;}
.pi-success-sub{font-family:'DM Sans',sans-serif;font-size:15px;color:#475569;line-height:1.7;margin-bottom:16px;font-weight:300;}
.pi-success-redirect{font-family:'DM Sans',sans-serif;font-size:13px;color:#94a3b8;}
@media(max-width:900px){.pi-main{margin-left:0;padding:24px 16px;}.pi-row{grid-template-columns:1fr;}}
`;