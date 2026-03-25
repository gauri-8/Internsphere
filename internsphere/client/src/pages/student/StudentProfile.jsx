import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

export default function StudentProfile() {
  const { user } = useUser();

  const clerkFirst = user?.firstName || "";
  const clerkLast  = user?.lastName  || "";
  const clerkEmail = user?.primaryEmailAddress?.emailAddress || "";

  const initialProfile = {
    firstName: clerkFirst, lastName: clerkLast, email: clerkEmail,
    phone:"", college:"", year:"",
    branch:"", cgpa:"", bio:"",
    linkedin:"", github:"", portfolio:"",
    skills:[],
    resumeName:"",
  };
  const [profile, setProfile] = useState(initialProfile);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(initialProfile);
  const [newSkill, setNewSkill] = useState("");
  const [saved, setSaved] = useState(false);

  const update = (k, v) => setDraft((p) => ({ ...p, [k]: v }));

  const addSkill = () => {
    if (newSkill.trim() && !draft.skills.includes(newSkill.trim())) {
      setDraft((p) => ({ ...p, skills: [...p.skills, newSkill.trim()] }));
      setNewSkill("");
    }
  };

  const removeSkill = (sk) => setDraft((p) => ({ ...p, skills: p.skills.filter(s => s !== sk) }));

  const handleSave = () => {
    setProfile(draft);
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleCancel = () => {
    setDraft(profile);
    setEditing(false);
  };

  const completionItems = [
    { label:"Basic Info", done: !!(profile.firstName && profile.email && profile.phone) },
    { label:"Academic Details", done: !!(profile.college && profile.year && profile.cgpa) },
    { label:"Bio", done: !!profile.bio },
    { label:"Skills", done: profile.skills.length > 0 },
    { label:"Resume", done: !!profile.resumeName },
    { label:"Social Links", done: !!(profile.linkedin || profile.github) },
  ];
  const completion = Math.round((completionItems.filter(x => x.done).length / completionItems.length) * 100);

  return (
    <div style={s.root}>
      <style>{css}</style>
      <Navbar />
      <Sidebar active="profile" />
      <main className="sp-main">

        {saved && (
          <div className="sp-toast">✓ Profile saved successfully!</div>
        )}

        {/* Header */}
        <div className="sp-header">
          <div>
            <p className="sp-eyebrow">Your Account</p>
            <h1 className="sp-title">Student Profile</h1>
          </div>
          {!editing ? (
            <button className="sp-edit-btn" onClick={() => setEditing(true)}>✏️ Edit Profile</button>
          ) : (
            <div style={{ display:"flex", gap:10 }}>
              <button className="sp-cancel-btn" onClick={handleCancel}>Cancel</button>
              <button className="sp-save-btn" onClick={handleSave}>Save Changes</button>
            </div>
          )}
        </div>

        <div className="sp-layout">
          {/* Left */}
          <div className="sp-left">

            {/* Avatar card */}
            <div className="sp-avatar-card">
              <div className="sp-avatar">
                {profile.firstName[0]}{profile.lastName[0]}
              </div>
              <div className="sp-avatar-name">{profile.firstName} {profile.lastName}</div>
              <div className="sp-avatar-sub">{profile.branch} · {profile.year}</div>
              <div className="sp-avatar-college">{profile.college}</div>

              {/* Completion */}
              <div className="sp-completion">
                <div className="sp-completion-header">
                  <span className="sp-completion-label">Profile Completion</span>
                  <span className="sp-completion-pct" style={{ color: completion >= 80 ? "#34d399" : "#f59e0b" }}>{completion}%</span>
                </div>
                <div className="sp-completion-bar">
                  <div className="sp-completion-fill" style={{ width:`${completion}%`, background: completion >= 80 ? "#34d399" : "#f59e0b" }} />
                </div>
                <div className="sp-completion-items">
                  {completionItems.map((item) => (
                    <div key={item.label} className="sp-ci">
                      <span style={{ color: item.done ? "#34d399" : "#e2e8f0" }}>{item.done ? "✓" : "○"}</span>
                      <span style={{ color: item.done ? "#0f172a" : "#94a3b8" }}>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Resume card */}
            <div className="sp-resume-card">
              <h3 className="sp-card-title">Resume</h3>
              {profile.resumeName ? (
                <div className="sp-resume-file">
                  <span style={{ fontSize:24 }}>📄</span>
                  <div>
                    <div className="sp-resume-name">{profile.resumeName}</div>
                    <div className="sp-resume-hint">Last updated recently</div>
                  </div>
                </div>
              ) : (
                <p className="sp-no-resume">No resume uploaded</p>
              )}
              <button className="sp-upload-btn" onClick={() => document.getElementById("sp-resume").click()}>
                {profile.resumeName ? "Replace Resume" : "Upload Resume"}
              </button>
              <input id="sp-resume" type="file" accept=".pdf,.doc,.docx" style={{ display:"none" }}
                onChange={(e) => { if(e.target.files[0]) setProfile(p => ({...p, resumeName: e.target.files[0].name})); }} />
            </div>

          </div>

          {/* Right */}
          <div className="sp-right">

            {/* Basic Info */}
            <div className="sp-section">
              <h2 className="sp-section-title">Basic Information</h2>
              <div className="sp-field-row">
                <Field label="First Name" value={editing ? draft.firstName : profile.firstName} onChange={(v) => update("firstName",v)} editing={editing} />
                <Field label="Last Name" value={editing ? draft.lastName : profile.lastName} onChange={(v) => update("lastName",v)} editing={editing} />
              </div>
              <div className="sp-field-row">
                <Field label="Email" value={editing ? draft.email : profile.email} onChange={(v) => update("email",v)} editing={editing} type="email" />
                <Field label="Phone" value={editing ? draft.phone : profile.phone} onChange={(v) => update("phone",v)} editing={editing} />
              </div>
              <div className="sp-field">
                <label className="sp-label">Bio</label>
                {editing ? (
                  <textarea className="sp-textarea" rows={4} value={draft.bio} onChange={(e) => update("bio", e.target.value)} />
                ) : (
                  <p className="sp-field-static">{profile.bio}</p>
                )}
              </div>
            </div>

            {/* Academic */}
            <div className="sp-section">
              <h2 className="sp-section-title">Academic Details</h2>
              <div className="sp-field-row">
                <Field label="College / University" value={editing ? draft.college : profile.college} onChange={(v) => update("college",v)} editing={editing} />
                <Field label="Branch" value={editing ? draft.branch : profile.branch} onChange={(v) => update("branch",v)} editing={editing} />
              </div>
              <div className="sp-field-row">
                <div className="sp-field">
                  <label className="sp-label">Current Year</label>
                  {editing ? (
                    <select className="sp-input" value={draft.year} onChange={(e) => update("year",e.target.value)}>
                      {["1st Year","2nd Year","3rd Year","4th Year"].map(y => <option key={y}>{y}</option>)}
                    </select>
                  ) : (
                    <p className="sp-field-static">{profile.year}</p>
                  )}
                </div>
                <Field label="CGPA" value={editing ? draft.cgpa : profile.cgpa} onChange={(v) => update("cgpa",v)} editing={editing} />
              </div>
            </div>

            {/* Skills */}
            <div className="sp-section">
              <h2 className="sp-section-title">Skills</h2>
              <div className="sp-skills">
                {(editing ? draft : profile).skills.map((sk) => (
                  <span key={sk} className="sp-skill-tag">
                    {sk}
                    {editing && (
                      <button className="sp-skill-remove" onClick={() => removeSkill(sk)}>×</button>
                    )}
                  </span>
                ))}
              </div>
              {editing && (
                <div className="sp-add-skill">
                  <input
                    className="sp-input"
                    placeholder="Add a skill..."
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addSkill()}
                    style={{ flex:1 }}
                  />
                  <button className="sp-add-skill-btn" onClick={addSkill}>Add</button>
                </div>
              )}
            </div>

            {/* Social Links */}
            <div className="sp-section">
              <h2 className="sp-section-title">Social & Links</h2>
              <div className="sp-field-row">
                <Field label="LinkedIn" value={editing ? draft.linkedin : profile.linkedin} onChange={(v) => update("linkedin",v)} editing={editing} />
                <Field label="GitHub" value={editing ? draft.github : profile.github} onChange={(v) => update("github",v)} editing={editing} />
              </div>
              <Field label="Portfolio Website" value={editing ? draft.portfolio : profile.portfolio} onChange={(v) => update("portfolio",v)} editing={editing} />
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

function Field({ label, value, onChange, editing, type="text" }) {
  return (
    <div className="sp-field">
      <label className="sp-label">{label}</label>
      {editing
        ? <input type={type} className="sp-input" value={value} onChange={(e) => onChange(e.target.value)} />
        : <p className="sp-field-static">{value || "—"}</p>}
    </div>
  );
}

const s = { root:{ minHeight:"100vh", background:"#f0f4f8", paddingTop:64, fontFamily:"'DM Sans',sans-serif" } };

const css = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
.sp-main{margin-left:240px;padding:40px;}
.sp-toast{position:fixed;bottom:32px;right:32px;background:#0f172a;color:white;padding:14px 24px;border-radius:12px;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:600;z-index:999;border-left:3px solid #34d399;animation:slideIn 0.3s ease;}
@keyframes slideIn{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0);}}
.sp-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:28px;flex-wrap:wrap;gap:16px;}
.sp-eyebrow{font-family:'DM Sans',sans-serif;font-size:12px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#06b6d4;margin-bottom:8px;}
.sp-title{font-family:'Syne',sans-serif;font-size:30px;font-weight:800;color:#0f172a;letter-spacing:-1px;margin:0;}
.sp-edit-btn{padding:11px 22px;background:#0f172a;color:white;border:none;border-radius:10px;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:600;cursor:pointer;transition:all 0.2s;}
.sp-edit-btn:hover{background:#1e293b;}
.sp-save-btn{padding:11px 22px;background:linear-gradient(135deg,#06b6d4,#2563eb);color:white;border:none;border-radius:10px;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:600;cursor:pointer;}
.sp-cancel-btn{padding:11px 22px;background:#f1f5f9;color:#475569;border:none;border-radius:10px;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:500;cursor:pointer;}
.sp-layout{display:grid;grid-template-columns:300px 1fr;gap:24px;align-items:start;}
.sp-left{display:flex;flex-direction:column;gap:16px;position:sticky;top:84px;}
.sp-right{display:flex;flex-direction:column;gap:20px;}
.sp-avatar-card{background:#080c1a;border-radius:16px;padding:28px;text-align:center;border:1px solid rgba(255,255,255,0.08);}
.sp-avatar{width:72px;height:72px;border-radius:18px;background:linear-gradient(135deg,#06b6d4,#2563eb);display:flex;align-items:center;justify-content:center;font-family:'Syne',sans-serif;font-size:24px;font-weight:800;color:white;margin:0 auto 14px;}
.sp-avatar-name{font-family:'Syne',sans-serif;font-size:18px;font-weight:800;color:white;letter-spacing:-0.3px;margin-bottom:4px;}
.sp-avatar-sub{font-family:'DM Sans',sans-serif;font-size:13px;color:rgba(255,255,255,0.45);margin-bottom:2px;}
.sp-avatar-college{font-family:'DM Sans',sans-serif;font-size:12px;color:rgba(255,255,255,0.3);margin-bottom:24px;}
.sp-completion{text-align:left;}
.sp-completion-header{display:flex;justify-content:space-between;margin-bottom:8px;}
.sp-completion-label{font-family:'DM Sans',sans-serif;font-size:12px;color:rgba(255,255,255,0.4);}
.sp-completion-pct{font-family:'Syne',sans-serif;font-size:14px;font-weight:800;}
.sp-completion-bar{height:6px;background:rgba(255,255,255,0.1);border-radius:100px;margin-bottom:14px;}
.sp-completion-fill{height:100%;border-radius:100px;transition:width 0.5s ease;}
.sp-completion-items{display:flex;flex-direction:column;gap:6px;}
.sp-ci{display:flex;align-items:center;gap:8px;font-family:'DM Sans',sans-serif;font-size:12px;}
.sp-resume-card{background:white;border:1px solid #e2e8f0;border-radius:16px;padding:24px;}
.sp-card-title{font-family:'Syne',sans-serif;font-size:15px;font-weight:800;color:#0f172a;margin:0 0 16px;}
.sp-resume-file{display:flex;align-items:center;gap:12px;background:#f8fafc;border-radius:10px;padding:14px;margin-bottom:14px;}
.sp-resume-name{font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;color:#0f172a;margin-bottom:2px;}
.sp-resume-hint{font-family:'DM Sans',sans-serif;font-size:11px;color:#94a3b8;}
.sp-no-resume{font-family:'DM Sans',sans-serif;font-size:13px;color:#94a3b8;margin:0 0 14px;}
.sp-upload-btn{width:100%;padding:10px;background:#f1f5f9;border:none;border-radius:8px;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;color:#475569;cursor:pointer;transition:all 0.2s;}
.sp-upload-btn:hover{background:#e2e8f0;}
.sp-section{background:white;border:1px solid #e2e8f0;border-radius:16px;padding:28px;}
.sp-section-title{font-family:'Syne',sans-serif;font-size:18px;font-weight:800;color:#0f172a;letter-spacing:-0.3px;margin:0 0 22px;}
.sp-field-row{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:20px;}
.sp-field{display:flex;flex-direction:column;margin-bottom:16px;}
.sp-label{font-family:'DM Sans',sans-serif;font-size:11px;font-weight:600;letter-spacing:0.8px;text-transform:uppercase;color:#94a3b8;margin-bottom:7px;}
.sp-input{padding:11px 13px;border:1px solid #e2e8f0;border-radius:9px;font-family:'DM Sans',sans-serif;font-size:14px;color:#0f172a;outline:none;transition:border 0.2s;}
.sp-input:focus{border-color:#06b6d4;box-shadow:0 0 0 3px rgba(6,182,212,0.1);}
.sp-textarea{padding:11px 13px;border:1px solid #e2e8f0;border-radius:9px;font-family:'DM Sans',sans-serif;font-size:14px;color:#0f172a;outline:none;resize:vertical;transition:border 0.2s;}
.sp-textarea:focus{border-color:#06b6d4;box-shadow:0 0 0 3px rgba(6,182,212,0.1);}
.sp-field-static{font-family:'DM Sans',sans-serif;font-size:14px;color:#0f172a;margin:0;font-weight:400;line-height:1.6;}
.sp-skills{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:14px;}
.sp-skill-tag{padding:7px 12px;background:rgba(6,182,212,0.08);border:1px solid rgba(6,182,212,0.25);border-radius:8px;font-family:'DM Sans',sans-serif;font-size:13px;color:#06b6d4;font-weight:500;display:flex;align-items:center;gap:6px;}
.sp-skill-remove{background:none;border:none;color:#06b6d4;cursor:pointer;font-size:16px;padding:0;line-height:1;opacity:0.6;}
.sp-skill-remove:hover{opacity:1;}
.sp-add-skill{display:flex;gap:10px;align-items:center;}
.sp-add-skill-btn{padding:11px 18px;background:#06b6d4;color:white;border:none;border-radius:9px;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;cursor:pointer;white-space:nowrap;}
@media(max-width:1100px){.sp-layout{grid-template-columns:1fr;}}
@media(max-width:900px){.sp-main{margin-left:0;padding:24px 16px;}.sp-left{position:static;}.sp-field-row{grid-template-columns:1fr;}}
`;