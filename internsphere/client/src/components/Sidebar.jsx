import { Link, useLocation } from "react-router-dom";

function Sidebar({ active }) {
  const location = useLocation();

  const isActive = (key) => active === key;

  const navItems = [
    { key:"dashboard",     label:"Dashboard",       icon:"🏠", to:"/student/dashboard" },
    { key:"browse",        label:"Browse Jobs",      icon:"🔍", to:"/student/browse" },
    { key:"applications",  label:"My Applications",  icon:"📋", to:"/student/my-applications" },
   
  ];

  const accountItems = [
    { key:"profile",  label:"Profile",   icon:"👤", to:"/student/profile" },
   
  ];

  return (
    <>
      <style>{css}</style>
      <aside className="sidebar">
        <span className="sidebar-label">Menu</span>
        {navItems.map((item) => (
          <Link
            key={item.key}
            to={item.to}
            className={`sidebar-item ${isActive(item.key) ? "active" : ""}`}
          >
            <span className="sidebar-icon">{item.icon}</span>
            {item.label}
          </Link>
        ))}

        <span className="sidebar-label" style={{ marginTop: 8 }}>Account</span>
        {accountItems.map((item) => (
          <Link
            key={item.key}
            to={item.to}
            className={`sidebar-item ${isActive(item.key) ? "active" : ""}`}
          >
            <span className="sidebar-icon">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </aside>
    </>
  );
}

const css = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap');
.sidebar {
  width: 240px;
  background: #080c1a;
  position: fixed;
  top: 64px; left: 0; bottom: 0;
  padding: 28px 16px;
  border-right: 1px solid rgba(255,255,255,0.06);
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 2px;
  overflow-y: auto;
}
.sidebar-label {
  font-family: 'DM Sans', sans-serif;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: rgba(255,255,255,0.25);
  padding: 14px 12px 8px;
  display: block;
}
.sidebar-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 11px 14px;
  border-radius: 10px;
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: rgba(255,255,255,0.5);
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  border: 1px solid transparent;
}
.sidebar-item:hover {
  background: rgba(255,255,255,0.06);
  color: rgba(255,255,255,0.85);
}
.sidebar-item.active {
  background: rgba(6,182,212,0.12);
  color: #06b6d4;
  border-color: rgba(6,182,212,0.2);
}
.sidebar-icon { font-size: 16px; }
@media(max-width:900px){.sidebar{display:none;}}
`;

export default Sidebar;