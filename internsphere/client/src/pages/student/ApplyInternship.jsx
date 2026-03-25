import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

const jobMap = {
  1: { company:"Google", role:"Frontend Intern", color:"#06b6d4" },
  2: { company:"Microsoft", role:"Backend Intern", color:"#818cf8" },
  3: { company:"Amazon", role:"Full Stack Intern", color:"#34d399" },
};

export default function ApplyInternship() {
  const { id } = useParams();
  const navigate = useNavigate();
  const job = jobMap[id] || jobMap[1];

  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name:"", email:"", phone:"", college:"", year:"", cgpa:"", cover:"", linkedin:"", github:"", portfolio:"" });
  const [resumeFile, setResumeFile] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const update = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => navigate("/student/my-applications"), 3000);
  };

  if (submitted) {
    return (
      <div style={s.root}>
        <style>{css}</style>
        <Navbar />
        <Sidebar active="applications" />
        <main className="ap-main">
          <div className="ap-success">
            <div className="ap-success-icon">🎉</div>
            <h2 className="ap-success-title">Application Submitted!</h2>
            <p className="ap-success-sub">Your application for <strong>{job.role}</strong> at <strong>{job.company}</strong> has been sent successfully.</p>
            <p className="ap-success-redirect">Redirecting to My Applications...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div style={s.root}>
      <style>{css}</style>
      <Navbar />
      <Sidebar active="applications" />
      <main className="ap-main">

        <button className="ap-back" onClick={() => navigate(`/student/internship/${id}`)}>← Back to Details</button>

        {/* Header */}
        <div className="ap-header">
          <div className="ap-job-info">
            <div className="ap-logo" style={{ background: `linear-gradient(135deg,${job.color}cc,${job.color}55)` }}>
              {job.company[0]}
            </div>
            <div>
              <h1 className="ap-title">Apply for {job.role}</h1>
              <p className="ap-company">{job.company}</p>
            </div>
          </div>
        </div>

        {/* Stepper */}
        <div className="ap-stepper">
          {["Personal Info", "Academic Details", "Resume & Links", "Review"].map((label, i) => {
            const n = i + 1;
            const done = step > n;
            const active = step === n;
            return (
              <div key={n} className="ap-step-item">
                <div className={`ap-step-circle ${done ? "done" : ""} ${active ? "active" : ""}`} style={active || done ? { background: job.color } : {}}>
                  {done ? "✓" : n}
                </div>
                <span className={`ap-step-label ${active ? "active-label" : ""}`}>{label}</span>
                {i < 3 && <div className={`ap-step-line ${done ? "done-line" : ""}`} style={done ? { background: job.color } : {}} />}
              </div>
            );
          })}
        </div>

        {/* Form card */}
        <div className="ap-card">

          {step === 1 && (
            <div className="ap-form">
              <h2 className="ap-form-title">Personal Information</h2>
              <div className="ap-field-row">
                <Field label="Full Name" placeholder="Alex Johnson" value={form.name} onChange={(v) => update("name", v)} />
                <Field label="Email Address" placeholder="alex@example.com" type="email" value={form.email} onChange={(v) => update("email", v)} />
              </div>
              <div className="ap-field-row">
                <Field label="Phone Number" placeholder="+91 98765 43210" value={form.phone} onChange={(v) => update("phone", v)} />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="ap-form">
              <h2 className="ap-form-title">Academic Details</h2>
              <div className="ap-field-row">
                <Field label="College / University" placeholder="IIT Bombay" value={form.college} onChange={(v) => update("college", v)} />
              </div>
              <div className="ap-field-row">
                <div className="ap-field">
                  <label className="ap-label">Current Year</label>
                  <select className="ap-input" value={form.year} onChange={(e) => update("year", e.target.value)}>
                    <option value="">Select year</option>
                    <option>1st Year</option>
                    <option>2nd Year</option>
                    <option>3rd Year</option>
                    <option>4th Year</option>
                  </select>
                </div>
                <Field label="CGPA / Percentage" placeholder="8.5 / 85%" value={form.cgpa} onChange={(v) => update("cgpa", v)} />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="ap-form">
              <h2 className="ap-form-title">Resume & Links</h2>

              {/* Resume upload */}
              <div className="ap-upload-area" onClick={() => document.getElementById("resume-upload").click()}>
                <input id="resume-upload" type="file" accept=".pdf,.doc,.docx" style={{ display:"none" }} onChange={(e) => setResumeFile(e.target.files[0])} />
                {resumeFile ? (
                  <div className="ap-upload-done">
                    <span style={{ fontSize: 28 }}>📄</span>
                    <div>
                      <p className="ap-upload-filename">{resumeFile.name}</p>
                      <p className="ap-upload-size">{(resumeFile.size / 1024).toFixed(1)} KB</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <span style={{ fontSize: 36 }}>📤</span>
                    <p className="ap-upload-text">Click to upload your resume</p>
                    <p className="ap-upload-hint">PDF, DOC, DOCX — max 5MB</p>
                  </>
                )}
              </div>

              <div className="ap-field-row" style={{ marginTop: 20 }}>
                <Field label="LinkedIn Profile" placeholder="linkedin.com/in/yourname" value={form.linkedin} onChange={(v) => update("linkedin", v)} />
                <Field label="GitHub Profile" placeholder="github.com/yourname" value={form.github} onChange={(v) => update("github", v)} />
              </div>
              <Field label="Portfolio Website (optional)" placeholder="yourportfolio.com" value={form.portfolio} onChange={(v) => update("portfolio", v)} />

              <div className="ap-field" style={{ marginTop: 16 }}>
                <label className="ap-label">Cover Letter</label>
                <textarea
                  className="ap-textarea"
                  rows={5}
                  placeholder="Tell us why you're a great fit for this role..."
                  value={form.cover}
                  onChange={(e) => update("cover", e.target.value)}
                />
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="ap-form">
              <h2 className="ap-form-title">Review Your Application</h2>
              <div className="ap-review-grid">
                {[
                  { label:"Full Name", val: form.name || "—" },
                  { label:"Email", val: form.email || "—" },
                  { label:"Phone", val: form.phone || "—" },
                  { label:"College", val: form.college || "—" },
                  { label:"Year", val: form.year || "—" },
                  { label:"CGPA", val: form.cgpa || "—" },
                  { label:"LinkedIn", val: form.linkedin || "—" },
                  { label:"GitHub", val: form.github || "—" },
                  { label:"Resume", val: resumeFile ? resumeFile.name : "Not uploaded" },
                ].map((item) => (
                  <div key={item.label} className="ap-review-item">
                    <div className="ap-review-label">{item.label}</div>
                    <div className="ap-review-val">{item.val}</div>
                  </div>
                ))}
              </div>
              {form.cover && (
                <div className="ap-review-cover">
                  <div className="ap-review-label">Cover Letter</div>
                  <p className="ap-review-cover-text">{form.cover}</p>
                </div>
              )}
            </div>
          )}

          {/* Navigation */}
          <div className="ap-nav-btns">
            {step > 1 && (
              <button className="ap-btn-secondary" onClick={() => setStep(s => s - 1)}>← Previous</button>
            )}
            <div style={{ flex: 1 }} />
            {step < 4 ? (
              <button className="ap-btn-primary" style={{ background: `linear-gradient(135deg,${job.color},#2563eb)` }} onClick={() => setStep(s => s + 1)}>
                Continue →
              </button>
            ) : (
              <button className="ap-btn-primary" style={{ background: `linear-gradient(135deg,${job.color},#2563eb)` }} onClick={handleSubmit}>
                Submit Application 🚀
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function Field({ label, placeholder, type = "text", value, onChange }) {
  return (
    <div className="ap-field">
      <label className="ap-label">{label}</label>
      <input type={type} className="ap-input" placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

const s = { root: { minHeight:"100vh", background:"#f0f4f8", paddingTop:64, fontFamily:"'DM Sans',sans-serif" } };

const css = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
.ap-main{margin-left:240px;padding:40px;}
.ap-back{background:none;border:none;font-family:'DM Sans',sans-serif;font-size:14px;color:#64748b;cursor:pointer;padding:0;margin-bottom:24px;}
.ap-back:hover{color:#0f172a;}
.ap-header{margin-bottom:28px;}
.ap-job-info{display:flex;align-items:center;gap:16px;}
.ap-logo{width:52px;height:52px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-family:'Syne',sans-serif;font-weight:800;font-size:20px;color:white;}
.ap-title{font-family:'Syne',sans-serif;font-size:26px;font-weight:800;color:#0f172a;letter-spacing:-0.5px;margin:0 0 4px;}
.ap-company{font-family:'DM Sans',sans-serif;font-size:14px;color:#64748b;margin:0;}
.ap-stepper{display:flex;align-items:center;margin-bottom:32px;background:white;border:1px solid #e2e8f0;border-radius:14px;padding:20px 28px;gap:0;}
.ap-step-item{display:flex;align-items:center;gap:10px;flex:1;}
.ap-step-circle{width:32px;height:32px;border-radius:50%;background:#e2e8f0;color:#94a3b8;display:flex;align-items:center;justify-content:center;font-family:'Syne',sans-serif;font-size:13px;font-weight:800;flex-shrink:0;transition:all 0.3s;}
.ap-step-circle.active,.ap-step-circle.done{color:white;}
.ap-step-label{font-family:'DM Sans',sans-serif;font-size:13px;color:#94a3b8;white-space:nowrap;}
.ap-step-label.active-label{color:#0f172a;font-weight:600;}
.ap-step-line{flex:1;height:2px;background:#e2e8f0;margin:0 8px;transition:all 0.3s;}
.ap-step-line.done-line{}
.ap-card{background:white;border:1px solid #e2e8f0;border-radius:16px;padding:36px;}
.ap-form-title{font-family:'Syne',sans-serif;font-size:20px;font-weight:800;color:#0f172a;letter-spacing:-0.5px;margin:0 0 28px;}
.ap-field-row{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:20px;}
.ap-field{display:flex;flex-direction:column;margin-bottom:20px;}
.ap-label{font-family:'DM Sans',sans-serif;font-size:12px;font-weight:600;letter-spacing:0.8px;text-transform:uppercase;color:#64748b;margin-bottom:8px;}
.ap-input{padding:12px 14px;border:1px solid #e2e8f0;border-radius:10px;font-family:'DM Sans',sans-serif;font-size:14px;color:#0f172a;outline:none;transition:border 0.2s;background:white;}
.ap-input:focus{border-color:#06b6d4;box-shadow:0 0 0 3px rgba(6,182,212,0.1);}
.ap-textarea{padding:12px 14px;border:1px solid #e2e8f0;border-radius:10px;font-family:'DM Sans',sans-serif;font-size:14px;color:#0f172a;outline:none;resize:vertical;transition:border 0.2s;}
.ap-textarea:focus{border-color:#06b6d4;box-shadow:0 0 0 3px rgba(6,182,212,0.1);}
.ap-upload-area{border:2px dashed #e2e8f0;border-radius:14px;padding:40px;text-align:center;cursor:pointer;transition:all 0.2s;background:#fafafa;}
.ap-upload-area:hover{border-color:#06b6d4;background:rgba(6,182,212,0.03);}
.ap-upload-text{font-family:'DM Sans',sans-serif;font-size:15px;font-weight:600;color:#0f172a;margin:12px 0 4px;}
.ap-upload-hint{font-family:'DM Sans',sans-serif;font-size:12px;color:#94a3b8;}
.ap-upload-done{display:flex;align-items:center;gap:16px;justify-content:center;}
.ap-upload-filename{font-family:'DM Sans',sans-serif;font-size:14px;font-weight:600;color:#0f172a;margin:0 0 4px;}
.ap-upload-size{font-family:'DM Sans',sans-serif;font-size:12px;color:#94a3b8;margin:0;}
.ap-nav-btns{display:flex;align-items:center;margin-top:32px;padding-top:24px;border-top:1px solid #f1f5f9;}
.ap-btn-primary{padding:13px 28px;color:white;border:none;border-radius:10px;font-family:'DM Sans',sans-serif;font-size:15px;font-weight:600;cursor:pointer;transition:all 0.2s;}
.ap-btn-primary:hover{transform:translateY(-1px);box-shadow:0 8px 20px rgba(0,0,0,0.15);}
.ap-btn-secondary{padding:13px 24px;background:#f1f5f9;color:#475569;border:none;border-radius:10px;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:500;cursor:pointer;transition:all 0.2s;}
.ap-btn-secondary:hover{background:#e2e8f0;}
.ap-review-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:20px;}
.ap-review-item{background:#f8fafc;border-radius:10px;padding:14px 16px;}
.ap-review-label{font-family:'DM Sans',sans-serif;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.8px;color:#94a3b8;margin-bottom:4px;}
.ap-review-val{font-family:'DM Sans',sans-serif;font-size:14px;color:#0f172a;font-weight:500;}
.ap-review-cover{background:#f8fafc;border-radius:10px;padding:16px;}
.ap-review-cover-text{font-family:'DM Sans',sans-serif;font-size:14px;color:#475569;line-height:1.7;margin:8px 0 0;font-weight:300;}
.ap-success{max-width:500px;margin:100px auto;text-align:center;background:white;border:1px solid #e2e8f0;border-radius:20px;padding:60px 40px;}
.ap-success-icon{font-size:60px;margin-bottom:24px;}
.ap-success-title{font-family:'Syne',sans-serif;font-size:28px;font-weight:800;color:#0f172a;letter-spacing:-1px;margin-bottom:12px;}
.ap-success-sub{font-family:'DM Sans',sans-serif;font-size:15px;color:#475569;line-height:1.7;margin-bottom:16px;font-weight:300;}
.ap-success-redirect{font-family:'DM Sans',sans-serif;font-size:13px;color:#94a3b8;}
@media(max-width:900px){.ap-main{margin-left:0;padding:24px 16px;}.ap-field-row{grid-template-columns:1fr;}.ap-review-grid{grid-template-columns:1fr;}}
`;