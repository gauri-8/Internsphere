import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

const internships = {
  1: { id:1, company:"Google", role:"Frontend Intern", location:"Remote", type:"Full-time", domain:"Engineering", stipend:"₹40,000/mo", duration:"3 months", color:"#06b6d4", tag:"Featured", openings:5, deadline:"April 15, 2026", skills:["React","JavaScript","CSS","HTML","Git"], about:"Google LLC is an American multinational technology company focusing on search engine technology, online advertising, cloud computing, computer software, quantum computing, e-commerce, and AI.", description:"We are looking for a passionate Frontend Intern to join our team for the summer. You will work alongside experienced engineers to build and improve our web products used by millions of users worldwide.", responsibilities:["Build and maintain responsive web applications using React","Collaborate with designers and backend engineers","Write clean, testable code","Participate in code reviews","Contribute to technical documentation"], requirements:["Currently pursuing B.Tech/B.E. in CS or related field","Strong knowledge of React and modern JavaScript","Understanding of HTML/CSS fundamentals","Good problem-solving skills","Strong communication skills"], perks:["Fully remote work","Certificate of completion","Letter of recommendation","Pre-placement offer opportunity","Mentorship from senior engineers"] },
  2: { id:2, company:"Microsoft", role:"Backend Intern", location:"Bangalore", type:"Part-time", domain:"Engineering", stipend:"₹35,000/mo", duration:"6 months", color:"#818cf8", tag:"New", openings:3, deadline:"April 20, 2026", skills:["Node.js","Python","SQL","REST APIs","Docker"], about:"Microsoft Corporation is an American multinational technology corporation which produces computer software, consumer electronics, personal computers, and related services.", description:"Join Microsoft's engineering team as a Backend Intern and work on scalable server-side applications and APIs that power Microsoft's cloud services.", responsibilities:["Design and build RESTful APIs","Work with databases and optimize queries","Collaborate with frontend teams","Write unit and integration tests","Deploy services to Azure"], requirements:["Pursuing CS/IT degree","Experience with Node.js or Python","Knowledge of databases (SQL/NoSQL)","Familiarity with cloud platforms is a plus"], perks:["Hybrid work model","Microsoft devices provided","Networking events","Full-time offer consideration","Health benefits"] },
  3: { id:3, company:"Amazon", role:"Full Stack Intern", location:"Hyderabad", type:"Full-time", domain:"Engineering", stipend:"₹45,000/mo", duration:"3 months", color:"#34d399", tag:"Hot", openings:8, deadline:"April 10, 2026", skills:["React","Node.js","AWS","MongoDB","TypeScript"], about:"Amazon.com, Inc. is an American multinational technology company focusing on e-commerce, cloud computing, online advertising, digital streaming, and AI.", description:"Amazon is seeking a talented Full Stack Intern to help build next-generation e-commerce features. You will own end-to-end features from design to deployment.", responsibilities:["Build full-stack features using React and Node.js","Design database schemas","Deploy and monitor services on AWS","Work in agile sprints","Contribute to system design discussions"], requirements:["CS degree in progress","Experience with React and Node.js","Basic knowledge of AWS services","TypeScript experience is a plus"], perks:["Relocation assistance","Amazon devices","AWS credits","PPO opportunity","Free food & snacks"] },
};

export default function InternshipDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const job = internships[id] || internships[1];

  return (
    <div style={s.root}>
      <style>{css}</style>
      <Navbar />
      <Sidebar active="browse" />
      <main className="id-main">

        {/* Back */}
        <button className="id-back" onClick={() => navigate("/student/browse")}>← Back to Browse</button>

        <div className="id-layout">
          {/* Left column */}
          <div className="id-left">

            {/* Hero card */}
            <div className="id-hero" style={{ "--accent": job.color }}>
              <div className="id-hero-top">
                <div className="id-logo" style={{ background: `linear-gradient(135deg,${job.color}cc,${job.color}55)` }}>
                  {job.company[0]}
                </div>
                <div>
                  <h1 className="id-role">{job.role}</h1>
                  <p className="id-company-name">{job.company} · {job.location}</p>
                </div>
              </div>
              <div className="id-meta-row">
                <span className="id-pill">⏱ {job.type}</span>
                <span className="id-pill">📅 {job.duration}</span>
                <span className="id-pill">💰 {job.stipend}</span>
                <span className="id-pill">🎯 {job.openings} openings</span>
                <span className="id-pill">⏰ Deadline: {job.deadline}</span>
              </div>
            </div>

            {/* About company */}
            <div className="id-section">
              <h2 className="id-section-title">About {job.company}</h2>
              <p className="id-body">{job.about}</p>
            </div>

            {/* Role description */}
            <div className="id-section">
              <h2 className="id-section-title">Role Description</h2>
              <p className="id-body">{job.description}</p>
            </div>

            {/* Responsibilities */}
            <div className="id-section">
              <h2 className="id-section-title">Responsibilities</h2>
              <ul className="id-list">
                {job.responsibilities.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
            </div>

            {/* Requirements */}
            <div className="id-section">
              <h2 className="id-section-title">Requirements</h2>
              <ul className="id-list">
                {job.requirements.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
            </div>

          </div>

          {/* Right column */}
          <div className="id-right">

            {/* Apply card */}
            <div className="id-apply-card">
              <div className="id-stipend-big">{job.stipend}</div>
              <div className="id-stipend-label">Monthly Stipend</div>
              <button className="id-apply-btn" onClick={() => navigate(`/student/apply/${job.id}`)}>
                Apply Now →
              </button>
              
              <div className="id-deadline-note">⏰ Application deadline: <strong>{job.deadline}</strong></div>
            </div>

            {/* Skills */}
            <div className="id-skills-card">
              <h3 className="id-card-title">Skills Required</h3>
              <div className="id-skills">
                {job.skills.map((sk) => (
                  <span key={sk} className="id-skill-tag" style={{ borderColor: job.color, color: job.color, background: `${job.color}11` }}>{sk}</span>
                ))}
              </div>
            </div>

            {/* Perks */}
            <div className="id-perks-card">
              <h3 className="id-card-title">Perks & Benefits</h3>
              {job.perks.map((p, i) => (
                <div key={i} className="id-perk-item">
                  <span className="id-perk-dot" style={{ background: job.color }} />
                  <span>{p}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

const s = { root: { minHeight:"100vh", background:"#f0f4f8", paddingTop:64, fontFamily:"'DM Sans',sans-serif" } };

const css = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
.id-main{margin-left:240px;padding:40px;}
.id-back{background:none;border:none;font-family:'DM Sans',sans-serif;font-size:14px;color:#64748b;cursor:pointer;padding:0;margin-bottom:24px;display:flex;align-items:center;gap:6px;transition:color 0.2s;}
.id-back:hover{color:#0f172a;}
.id-layout{display:grid;grid-template-columns:1fr 320px;gap:28px;align-items:start;}
.id-left{display:flex;flex-direction:column;gap:20px;}
.id-hero{background:white;border:1px solid #e2e8f0;border-radius:16px;padding:28px;border-top:3px solid var(--accent);}
.id-hero-top{display:flex;align-items:center;gap:18px;margin-bottom:20px;}
.id-logo{width:56px;height:56px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-family:'Syne',sans-serif;font-weight:800;font-size:22px;color:white;flex-shrink:0;}
.id-role{font-family:'Syne',sans-serif;font-size:24px;font-weight:800;color:#0f172a;letter-spacing:-0.5px;margin:0 0 4px;}
.id-company-name{font-family:'DM Sans',sans-serif;font-size:14px;color:#64748b;margin:0;}
.id-meta-row{display:flex;gap:8px;flex-wrap:wrap;}
.id-pill{padding:6px 12px;background:#f1f5f9;border-radius:8px;font-size:12px;color:#475569;font-family:'DM Sans',sans-serif;}
.id-section{background:white;border:1px solid #e2e8f0;border-radius:16px;padding:28px;}
.id-section-title{font-family:'Syne',sans-serif;font-size:17px;font-weight:800;color:#0f172a;margin:0 0 14px;letter-spacing:-0.3px;}
.id-body{font-family:'DM Sans',sans-serif;font-size:14px;line-height:1.75;color:#475569;margin:0;font-weight:300;}
.id-list{margin:0;padding-left:20px;display:flex;flex-direction:column;gap:10px;}
.id-list li{font-family:'DM Sans',sans-serif;font-size:14px;line-height:1.6;color:#475569;font-weight:300;}
.id-right{display:flex;flex-direction:column;gap:16px;position:sticky;top:84px;}
.id-apply-card{background:#080c1a;border-radius:16px;padding:28px;text-align:center;}
.id-stipend-big{font-family:'Syne',sans-serif;font-size:28px;font-weight:800;color:white;letter-spacing:-1px;}
.id-stipend-label{font-family:'DM Sans',sans-serif;font-size:12px;color:rgba(255,255,255,0.4);margin-bottom:24px;margin-top:4px;}
.id-apply-btn{width:100%;padding:14px;background:linear-gradient(135deg,#06b6d4,#2563eb);color:white;border:none;border-radius:10px;font-family:'DM Sans',sans-serif;font-size:15px;font-weight:600;cursor:pointer;transition:all 0.2s;margin-bottom:10px;box-shadow:0 4px 16px rgba(6,182,212,0.3);}
.id-apply-btn:hover{transform:translateY(-1px);box-shadow:0 8px 24px rgba(6,182,212,0.4);}
.id-save-btn{width:100%;padding:12px;background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.12);color:rgba(255,255,255,0.7);border-radius:10px;font-family:'DM Sans',sans-serif;font-size:14px;cursor:pointer;transition:all 0.2s;margin-bottom:16px;}
.id-save-btn:hover{background:rgba(255,255,255,0.12);color:white;}
.id-deadline-note{font-family:'DM Sans',sans-serif;font-size:12px;color:rgba(255,255,255,0.35);line-height:1.5;}
.id-deadline-note strong{color:rgba(255,255,255,0.6);}
.id-skills-card,.id-perks-card{background:white;border:1px solid #e2e8f0;border-radius:16px;padding:24px;}
.id-card-title{font-family:'Syne',sans-serif;font-size:15px;font-weight:800;color:#0f172a;margin:0 0 14px;}
.id-skills{display:flex;flex-wrap:wrap;gap:8px;}
.id-skill-tag{padding:6px 12px;border-radius:8px;border:1px solid;font-family:'DM Sans',sans-serif;font-size:12px;font-weight:500;}
.id-perk-item{display:flex;align-items:center;gap:10px;font-family:'DM Sans',sans-serif;font-size:13px;color:#475569;padding:6px 0;border-bottom:1px solid #f8fafc;}
.id-perk-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0;}
@media(max-width:1100px){.id-layout{grid-template-columns:1fr;}}
@media(max-width:900px){.id-main{margin-left:0;padding:24px 16px;}.id-right{position:static;}}
`;