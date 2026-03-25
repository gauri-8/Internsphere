import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import Navbar from "../../components/Navbar";
import RecruiterSidebar from "../../components/RecruiterSidebar";

export default function RecruiterProfile() {
  const { user } = useUser();

  const clerkName  = `${user?.firstName || ""} ${user?.lastName || ""}`.trim() || "Recruiter";
  const clerkEmail = user?.primaryEmailAddress?.emailAddress || "";
  const avatarLetter = (user?.firstName?.[0] || "R").toUpperCase();

  const initialProfile = {
    companyName: user?.publicMetadata?.companyName || "", companyType:"Product-based", industry:"Technology",
    founded:"", size:"", website:"",
    headquarters:"", tagline:"",
    about:"",
    recruiterName: clerkName, recruiterTitle:"",
    recruiterEmail: clerkEmail, recruiterPhone:"",
    linkedin:"", twitter:"",
    perks:[],
    domains:[],
  };
  const [profile, setProfile] = useState(initialProfile);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(initialProfile);
  const [saved, setSaved] = useState(false);
  const [newPerk, setNewPerk] = useState("");

  const update = (k, v) => setDraft(p => ({ ...p, [k]: v }));

  const addPerk = () => {
    if (newPerk.trim()) {
      setDraft(p => ({ ...p, perks: [...p.perks, newPerk.trim()] }));
      setNewPerk("");
    }
  };
  const removePerk = (pk) => setDraft(p => ({ ...p, perks: p.perks.filter(x => x !== pk) }));

  const handleSave = () => {
    setProfile(draft);
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div style={s.root}>
      <style>{css}</style>
      <Navbar />
      <RecruiterSidebar active="profile" />

      {saved && <div className="rp-toast">✓ Profile saved successfully!</div>}

      <main className="rp-main">
        <div className="rp-header">
          <div>
            <p className="rp-eyebrow">Company Account</p>
            <h1 className="rp-title">Recruiter Profile</h1>
          </div>
          {!editing
            ? <button className="rp-edit-btn" onClick={() => setEditing(true)}>✏️ Edit Profile</button>
            : <div style={{ display:"flex", gap:10 }}>
                <button className="rp-cancel-btn" onClick={() => { setDraft(profile); setEditing(false); }}>Cancel</button>
                <button className="rp-save-btn" onClick={handleSave}>Save Changes</button>
              </div>
          }
        </div>

        <div className="rp-layout">
          {/* Left sidebar */}
          <div className="rp-left">

            {/* Company card */}
            <div className="rp-company-card">
              <div className="rp-company-logo">{profile.companyName?.[0]?.toUpperCase() || avatarLetter}</div>
              <div className="rp-company-name">{profile.companyName}</div>
              <div className="rp-company-type">{profile.companyType} · {profile.industry}</div>
              <div className="rp-company-tagline">"{profile.tagline}"</div>
              <div className="rp-company-stats">
                <div className="rp-cs-item"><span>Founded</span><strong>{profile.founded}</strong></div>
                <div className="rp-cs-item"><span>Size</span><strong>{profile.size}</strong></div>
                <div className="rp-cs-item"><span>HQ</span><strong>{profile.headquarters.split(",")[0]}</strong></div>
              </div>
            </div>

            {/* Recruiter card */}
            <div className="rp-recruiter-card">
              <h3 className="rp-card-title">Recruiter Contact</h3>
              <div className="rp-recruiter-row">
                <div className="rp-recruiter-avatar">{profile.recruiterName[0]}</div>
                <div>
                  <div className="rp-recruiter-name">{profile.recruiterName}</div>
                  <div className="rp-recruiter-title">{profile.recruiterTitle}</div>
                </div>
              </div>
              <div className="rp-contact-item">📧 {profile.recruiterEmail}</div>
              <div className="rp-contact-item">📱 {profile.recruiterPhone}</div>
            </div>

            {/* Domains */}
            <div className="rp-domains-card">
              <h3 className="rp-card-title">Hiring Domains</h3>
              <div className="rp-domains">
                {profile.domains.map(d => <span key={d} className="rp-domain-tag">{d}</span>)}
              </div>
            </div>
          </div>

          {/* Right content */}
          <div className="rp-right">

            {/* Company info */}
            <div className="rp-section">
              <h2 className="rp-section-title">Company Information</h2>
              <div className="rp-field-row">
                <Field label="Company Name" value={editing ? draft.companyName : profile.companyName} onChange={v => update("companyName",v)} editing={editing} />
                <Field label="Industry" value={editing ? draft.industry : profile.industry} onChange={v => update("industry",v)} editing={editing} />
              </div>
              <div className="rp-field-row">
                <div className="rp-field">
                  <label className="rp-label">Company Type</label>
                  {editing
                    ? <select className="rp-input" value={draft.companyType} onChange={e => update("companyType",e.target.value)}>
                        {["Product-based","Service-based","Startup","MNC","NGO"].map(t => <option key={t}>{t}</option>)}
                      </select>
                    : <p className="rp-field-static">{profile.companyType}</p>
                  }
                </div>
                <div className="rp-field">
                  <label className="rp-label">Company Size</label>
                  {editing
                    ? <select className="rp-input" value={draft.size} onChange={e => update("size",e.target.value)}>
                        {["1–10","11–50","51–200","201–500","501–1000","1000+"].map(sz => <option key={sz}>{sz}</option>)}
                      </select>
                    : <p className="rp-field-static">{profile.size} employees</p>
                  }
                </div>
              </div>
              <div className="rp-field-row">
                <Field label="Headquarters" value={editing ? draft.headquarters : profile.headquarters} onChange={v => update("headquarters",v)} editing={editing} />
                <Field label="Website" value={editing ? draft.website : profile.website} onChange={v => update("website",v)} editing={editing} />
              </div>
              <Field label="Founded Year" value={editing ? draft.founded : profile.founded} onChange={v => update("founded",v)} editing={editing} />
              <div className="rp-field">
                <label className="rp-label">Company Tagline</label>
                {editing
                  ? <input className="rp-input" value={draft.tagline} onChange={e => update("tagline",e.target.value)} />
                  : <p className="rp-field-static">"{profile.tagline}"</p>
                }
              </div>
              <div className="rp-field">
                <label className="rp-label">About the Company</label>
                {editing
                  ? <textarea className="rp-textarea" rows={4} value={draft.about} onChange={e => update("about",e.target.value)} />
                  : <p className="rp-field-static">{profile.about}</p>
                }
              </div>
            </div>

            {/* Recruiter details */}
            <div className="rp-section">
              <h2 className="rp-section-title">Recruiter Details</h2>
              <div className="rp-field-row">
                <Field label="Your Name" value={editing ? draft.recruiterName : profile.recruiterName} onChange={v => update("recruiterName",v)} editing={editing} />
                <Field label="Your Title" value={editing ? draft.recruiterTitle : profile.recruiterTitle} onChange={v => update("recruiterTitle",v)} editing={editing} />
              </div>
              <div className="rp-field-row">
                <Field label="Work Email" value={editing ? draft.recruiterEmail : profile.recruiterEmail} onChange={v => update("recruiterEmail",v)} editing={editing} type="email" />
                <Field label="Phone" value={editing ? draft.recruiterPhone : profile.recruiterPhone} onChange={v => update("recruiterPhone",v)} editing={editing} />
              </div>
              <div className="rp-field-row">
                <Field label="LinkedIn" value={editing ? draft.linkedin : profile.linkedin} onChange={v => update("linkedin",v)} editing={editing} />
                <Field label="Twitter" value={editing ? draft.twitter : profile.twitter} onChange={v => update("twitter",v)} editing={editing} />
              </div>
            </div>

            {/* Perks */}
            <div className="rp-section">
              <h2 className="rp-section-title">Perks & Benefits Offered</h2>
              <div className="rp-perks">
                {(editing ? draft : profile).perks.map((pk, i) => (
                  <div key={i} className="rp-perk-item">
                    <span className="rp-perk-dot" />
                    <span>{pk}</span>
                    {editing && <button className="rp-perk-remove" onClick={() => removePerk(pk)}>×</button>}
                  </div>
                ))}
              </div>
              {editing && (
                <div className="rp-add-perk">
                  <input className="rp-input" placeholder="Add a perk..." value={newPerk} onChange={e => setNewPerk(e.target.value)} onKeyDown={e => e.key==="Enter" && addPerk()} style={{ flex:1 }} />
                  <button className="rp-add-btn" onClick={addPerk}>Add</button>
                </div>
              )}
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

function Field({ label, value, onChange, editing, type="text" }) {
  return (
    <div className="rp-field">
      <label className="rp-label">{label}</label>
      {editing
        ? <input type={type} className="rp-input" value={value} onChange={e => onChange(e.target.value)} />
        : <p className="rp-field-static">{value || "—"}</p>}
    </div>
  );
}

const s = { root:{ minHeight:"100vh", background:"#f0f4f8", paddingTop:64, fontFamily:"'DM Sans',sans-serif" } };

const css = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
*{box-sizing:border-box;}
.rp-main{margin-left:240px;padding:40px;}
.rp-toast{position:fixed;bottom:32px;right:32px;background:#0f172a;color:white;padding:14px 24px;border-radius:12px;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:600;z-index:999;border-left:3px solid #34d399;animation:slideIn 0.3s ease;}
@keyframes slideIn{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0);}}
.rp-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:28px;flex-wrap:wrap;gap:16px;}
.rp-eyebrow{font-family:'DM Sans',sans-serif;font-size:12px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#06b6d4;margin-bottom:8px;}
.rp-title{font-family:'Syne',sans-serif;font-size:30px;font-weight:800;color:#0f172a;letter-spacing:-1px;margin:0;}
.rp-edit-btn{padding:11px 22px;background:#0f172a;color:white;border:none;border-radius:10px;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:600;cursor:pointer;}
.rp-save-btn{padding:11px 22px;background:linear-gradient(135deg,#06b6d4,#2563eb);color:white;border:none;border-radius:10px;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:600;cursor:pointer;}
.rp-cancel-btn{padding:11px 22px;background:#f1f5f9;color:#475569;border:none;border-radius:10px;font-family:'DM Sans',sans-serif;font-size:14px;cursor:pointer;}
.rp-layout{display:grid;grid-template-columns:280px 1fr;gap:24px;align-items:start;}
.rp-left{display:flex;flex-direction:column;gap:16px;position:sticky;top:84px;}
.rp-right{display:flex;flex-direction:column;gap:20px;}
.rp-company-card{background:#080c1a;border-radius:16px;padding:28px;text-align:center;border:1px solid rgba(255,255,255,0.08);}
.rp-company-logo{width:64px;height:64px;border-radius:16px;background:linear-gradient(135deg,#06b6d4,#2563eb);display:flex;align-items:center;justify-content:center;font-family:'Syne',sans-serif;font-size:28px;font-weight:800;color:white;margin:0 auto 14px;}
.rp-company-name{font-family:'Syne',sans-serif;font-size:18px;font-weight:800;color:white;letter-spacing:-0.3px;margin-bottom:4px;}
.rp-company-type{font-family:'DM Sans',sans-serif;font-size:13px;color:rgba(255,255,255,0.4);margin-bottom:12px;}
.rp-company-tagline{font-family:'DM Sans',sans-serif;font-size:12px;color:rgba(255,255,255,0.3);font-style:italic;margin-bottom:20px;line-height:1.5;}
.rp-company-stats{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;}
.rp-cs-item{background:rgba(255,255,255,0.05);border-radius:8px;padding:10px 6px;text-align:center;}
.rp-cs-item span{display:block;font-family:'DM Sans',sans-serif;font-size:9px;text-transform:uppercase;letter-spacing:0.8px;color:rgba(255,255,255,0.3);margin-bottom:3px;}
.rp-cs-item strong{font-family:'DM Sans',sans-serif;font-size:12px;font-weight:600;color:white;}
.rp-recruiter-card,.rp-domains-card{background:white;border:1px solid #e2e8f0;border-radius:16px;padding:22px;}
.rp-card-title{font-family:'Syne',sans-serif;font-size:14px;font-weight:800;color:#0f172a;margin:0 0 14px;}
.rp-recruiter-row{display:flex;align-items:center;gap:12px;margin-bottom:14px;}
.rp-recruiter-avatar{width:38px;height:38px;border-radius:9px;background:linear-gradient(135deg,#818cf8,#2563eb);display:flex;align-items:center;justify-content:center;font-family:'Syne',sans-serif;font-weight:800;font-size:15px;color:white;flex-shrink:0;}
.rp-recruiter-name{font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;color:#0f172a;}
.rp-recruiter-title{font-family:'DM Sans',sans-serif;font-size:11px;color:#94a3b8;margin-top:1px;}
.rp-contact-item{font-family:'DM Sans',sans-serif;font-size:12px;color:#64748b;padding:5px 0;border-bottom:1px solid #f8fafc;}
.rp-contact-item:last-child{border-bottom:none;}
.rp-domains{display:flex;flex-wrap:wrap;gap:6px;}
.rp-domain-tag{padding:5px 11px;background:rgba(6,182,212,0.08);border:1px solid rgba(6,182,212,0.2);border-radius:7px;font-family:'DM Sans',sans-serif;font-size:12px;color:#06b6d4;font-weight:500;}
.rp-section{background:white;border:1px solid #e2e8f0;border-radius:16px;padding:28px;}
.rp-section-title{font-family:'Syne',sans-serif;font-size:18px;font-weight:800;color:#0f172a;letter-spacing:-0.3px;margin:0 0 22px;}
.rp-field-row{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:4px;}
.rp-field{display:flex;flex-direction:column;margin-bottom:18px;}
.rp-label{font-family:'DM Sans',sans-serif;font-size:11px;font-weight:600;letter-spacing:0.8px;text-transform:uppercase;color:#94a3b8;margin-bottom:7px;}
.rp-input{padding:11px 13px;border:1px solid #e2e8f0;border-radius:9px;font-family:'DM Sans',sans-serif;font-size:14px;color:#0f172a;outline:none;transition:border 0.2s;}
.rp-input:focus{border-color:#06b6d4;box-shadow:0 0 0 3px rgba(6,182,212,0.1);}
.rp-textarea{padding:11px 13px;border:1px solid #e2e8f0;border-radius:9px;font-family:'DM Sans',sans-serif;font-size:14px;color:#0f172a;outline:none;resize:vertical;transition:border 0.2s;}
.rp-textarea:focus{border-color:#06b6d4;}
.rp-field-static{font-family:'DM Sans',sans-serif;font-size:14px;color:#0f172a;margin:0;font-weight:400;line-height:1.6;}
.rp-perks{display:flex;flex-direction:column;gap:0;margin-bottom:14px;}
.rp-perk-item{display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid #f8fafc;font-family:'DM Sans',sans-serif;font-size:14px;color:#475569;}
.rp-perk-dot{width:6px;height:6px;border-radius:50%;background:#06b6d4;flex-shrink:0;}
.rp-perk-remove{margin-left:auto;background:none;border:none;color:#f87171;cursor:pointer;font-size:18px;padding:0;opacity:0.6;}
.rp-perk-remove:hover{opacity:1;}
.rp-add-perk{display:flex;gap:10px;}
.rp-add-btn{padding:11px 18px;background:#06b6d4;color:white;border:none;border-radius:9px;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;cursor:pointer;white-space:nowrap;}
@media(max-width:1100px){.rp-layout{grid-template-columns:1fr;}}
@media(max-width:900px){.rp-main{margin-left:0;padding:24px 16px;}.rp-left{position:static;}.rp-field-row{grid-template-columns:1fr;}}
`;