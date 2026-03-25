import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

const allInternships = [
  { id: 1, company: "Google", role: "Frontend Intern", location: "Remote", type: "Full-time", domain: "Engineering", stipend: "₹40,000/mo", duration: "3 months", color: "#06b6d4", tag: "Featured" },
  { id: 2, company: "Microsoft", role: "Backend Intern", location: "Bangalore", type: "Part-time", domain: "Engineering", stipend: "₹35,000/mo", duration: "6 months", color: "#818cf8", tag: "New" },
  { id: 3, company: "Amazon", role: "Full Stack Intern", location: "Hyderabad", type: "Full-time", domain: "Engineering", stipend: "₹45,000/mo", duration: "3 months", color: "#34d399", tag: "Hot" },
  { id: 4, company: "Flipkart", role: "Mobile Dev Intern", location: "Bengaluru", type: "Full-time", domain: "Engineering", stipend: "₹30,000/mo", duration: "4 months", color: "#f59e0b", tag: "New" },
  { id: 5, company: "Razorpay", role: "UI/UX Intern", location: "Remote", type: "Part-time", domain: "Design", stipend: "₹25,000/mo", duration: "3 months", color: "#f87171", tag: "Featured" },
  { id: 6, company: "Zepto", role: "Data Science Intern", location: "Mumbai", type: "Full-time", domain: "Data", stipend: "₹38,000/mo", duration: "6 months", color: "#a78bfa", tag: "Hot" },
  { id: 7, company: "Swiggy", role: "Product Management Intern", location: "Bangalore", type: "Full-time", domain: "Product", stipend: "₹42,000/mo", duration: "4 months", color: "#fb923c", tag: "New" },
  { id: 8, company: "CRED", role: "ML Intern", location: "Remote", type: "Full-time", domain: "Data", stipend: "₹50,000/mo", duration: "3 months", color: "#22d3ee", tag: "Hot" },
  { id: 9, company: "Meesho", role: "Backend Intern", location: "Bangalore", type: "Part-time", domain: "Engineering", stipend: "₹28,000/mo", duration: "6 months", color: "#e879f9", tag: "New" },
];

const domains = ["All", "Engineering", "Design", "Data", "Product"];
const types = ["All", "Full-time", "Part-time"];
const locations = ["All", "Remote", "Bangalore", "Hyderabad", "Mumbai", "Bengaluru"];

export default function BrowseInternships() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [domain, setDomain] = useState("All");
  const [type, setType] = useState("All");
  const [location, setLocation] = useState("All");
  const [saved, setSaved] = useState([]);

  const filtered = allInternships.filter((j) => {
    const matchSearch = j.role.toLowerCase().includes(search.toLowerCase()) || j.company.toLowerCase().includes(search.toLowerCase());
    const matchDomain = domain === "All" || j.domain === domain;
    const matchType = type === "All" || j.type === type;
    const matchLoc = location === "All" || j.location === location;
    return matchSearch && matchDomain && matchType && matchLoc;
  });

  const toggleSave = (id, e) => {
    e.stopPropagation();
    setSaved((prev) => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const tagColors = {
    Featured: { bg: "rgba(6,182,212,0.1)", color: "#06b6d4" },
    New: { bg: "rgba(52,211,153,0.1)", color: "#34d399" },
    Hot: { bg: "rgba(248,113,113,0.1)", color: "#f87171" },
  };

  return (
    <div style={s.root}>
      <style>{css}</style>
      <Navbar />
      <Sidebar active="browse" />
      <main className="bi-main">

        {/* Header */}
        <div className="bi-header">
          <div>
            <p className="bi-eyebrow">Discover Opportunities</p>
            <h1 className="bi-title">Browse Internships</h1>
            <p className="bi-sub">{filtered.length} roles available for you</p>
          </div>
        </div>

        {/* Search + Filters */}
        <div className="bi-filters">
          <div className="bi-search-wrap">
            <span className="bi-search-icon">🔍</span>
            <input
              className="bi-search"
              placeholder="Search by role or company..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="bi-filter-group">
            {[
              { label: "Domain", value: domain, setter: setDomain, opts: domains },
              { label: "Type", value: type, setter: setType, opts: types },
              { label: "Location", value: location, setter: setLocation, opts: locations },
            ].map((f) => (
              <select key={f.label} className="bi-select" value={f.value} onChange={(e) => f.setter(e.target.value)}>
                {f.opts.map((o) => <option key={o}>{o}</option>)}
              </select>
            ))}
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="bi-empty">
            <div style={{ fontSize: 48 }}>🔍</div>
            <p>No internships match your filters.</p>
          </div>
        ) : (
          <div className="bi-grid">
            {filtered.map((job) => (
              <div
                key={job.id}
                className="bi-card"
                style={{ "--accent": job.color }}
                onClick={() => navigate(`/student/internship/${job.id}`)}
              >
                <div className="bi-card-top">
                  <div className="bi-logo" style={{ background: `linear-gradient(135deg,${job.color}cc,${job.color}55)` }}>
                    {job.company[0]}
                  </div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span className="bi-tag" style={tagColors[job.tag]}>{job.tag}</span>
                    <button className="bi-save" onClick={(e) => toggleSave(job.id, e)}>
                      {saved.includes(job.id) ? "★" : "☆"}
                    </button>
                  </div>
                </div>
                <div className="bi-role">{job.role}</div>
                <div className="bi-company">{job.company}</div>
                <div className="bi-pills">
                  <span className="bi-pill">📍 {job.location}</span>
                  <span className="bi-pill">⏱ {job.type}</span>
                  <span className="bi-pill">📅 {job.duration}</span>
                </div>
                <div className="bi-footer">
                  <div className="bi-stipend">{job.stipend}</div>
                  <button className="bi-apply-btn" onClick={(e) => { e.stopPropagation(); navigate(`/student/internship/${job.id}`); }}>
                    View Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

const s = { root: { minHeight: "100vh", background: "#f0f4f8", paddingTop: 64, fontFamily: "'DM Sans',sans-serif" } };

const css = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
.bi-main { margin-left:240px; padding:40px; }
.bi-eyebrow { font-family:'DM Sans',sans-serif; font-size:12px; font-weight:600; letter-spacing:2px; text-transform:uppercase; color:#06b6d4; margin-bottom:8px; }
.bi-title { font-family:'Syne',sans-serif; font-size:30px; font-weight:800; color:#0f172a; letter-spacing:-1px; margin:0 0 4px; }
.bi-sub { font-family:'DM Sans',sans-serif; font-size:14px; color:#64748b; margin:0; }
.bi-header { margin-bottom:32px; }
.bi-filters { display:flex; gap:14px; margin-bottom:32px; flex-wrap:wrap; align-items:center; }
.bi-search-wrap { position:relative; flex:1; min-width:220px; }
.bi-search-icon { position:absolute; left:14px; top:50%; transform:translateY(-50%); font-size:14px; }
.bi-search { width:100%; padding:12px 16px 12px 40px; border:1px solid #e2e8f0; border-radius:10px; font-family:'DM Sans',sans-serif; font-size:14px; background:white; color:#0f172a; outline:none; box-sizing:border-box; transition:border 0.2s; }
.bi-search:focus { border-color:#06b6d4; box-shadow:0 0 0 3px rgba(6,182,212,0.1); }
.bi-filter-group { display:flex; gap:10px; flex-wrap:wrap; }
.bi-select { padding:11px 14px; border:1px solid #e2e8f0; border-radius:10px; font-family:'DM Sans',sans-serif; font-size:13px; background:white; color:#475569; outline:none; cursor:pointer; transition:border 0.2s; }
.bi-select:focus { border-color:#06b6d4; }
.bi-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(280px,1fr)); gap:20px; }
.bi-card { background:white; border:1px solid #e2e8f0; border-radius:16px; padding:24px; cursor:pointer; transition:all 0.25s; position:relative; overflow:hidden; }
.bi-card::before { content:''; position:absolute; top:0;left:0;right:0; height:3px; background:var(--accent); opacity:0; transition:opacity 0.2s; }
.bi-card:hover { transform:translateY(-4px); box-shadow:0 16px 40px rgba(0,0,0,0.09); border-color:#cbd5e1; }
.bi-card:hover::before { opacity:1; }
.bi-card-top { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:16px; }
.bi-logo { width:44px;height:44px; border-radius:10px; display:flex; align-items:center; justify-content:center; font-family:'Syne',sans-serif; font-weight:800; font-size:18px; color:white; }
.bi-tag { font-size:11px; font-weight:600; padding:4px 10px; border-radius:100px; font-family:'DM Sans',sans-serif; }
.bi-save { background:none; border:none; font-size:18px; cursor:pointer; color:#f59e0b; padding:0; transition:transform 0.2s; }
.bi-save:hover { transform:scale(1.2); }
.bi-role { font-family:'Syne',sans-serif; font-size:16px; font-weight:700; color:#0f172a; margin-bottom:4px; }
.bi-company { font-family:'DM Sans',sans-serif; font-size:13px; color:#64748b; margin-bottom:14px; }
.bi-pills { display:flex; gap:8px; flex-wrap:wrap; margin-bottom:16px; }
.bi-pill { padding:5px 10px; background:#f1f5f9; border-radius:6px; font-size:11px; color:#475569; font-family:'DM Sans',sans-serif; }
.bi-footer { display:flex; justify-content:space-between; align-items:center; border-top:1px solid #f1f5f9; padding-top:14px; }
.bi-stipend { font-family:'Syne',sans-serif; font-size:15px; font-weight:700; color:#0f172a; }
.bi-apply-btn { padding:8px 14px; background:#0f172a; color:white; border:none; border-radius:8px; font-size:12px; font-weight:600; font-family:'DM Sans',sans-serif; cursor:pointer; transition:all 0.2s; }
.bi-apply-btn:hover { background:#1e293b; }
.bi-empty { text-align:center; padding:80px 20px; color:#94a3b8; font-family:'DM Sans',sans-serif; font-size:15px; }
@media(max-width:900px){.bi-main{margin-left:0;padding:24px 16px;}}
`;