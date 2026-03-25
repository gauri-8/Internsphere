import { Link, useNavigate } from "react-router-dom";
import { useUser, useClerk } from "@clerk/clerk-react";

function Navbar() {
  const { isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();

  const handleSignOut = async () => {
  await signOut({ redirectUrl: "/" });
};

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        html, body, #root { width: 100%; margin: 0; padding: 0; overflow-x: hidden; }
        .nav-link {
          color: rgba(255,255,255,0.7);
          margin-left: 8px;
          text-decoration: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.3px;
          padding: 8px 16px;
          border-radius: 8px;
          transition: all 0.2s ease;
          position: relative;
        }
        .nav-link:hover {
          color: #fff;
          background: rgba(255,255,255,0.08);
        }
        .nav-link.cta {
          background: linear-gradient(135deg, #06b6d4, #2563eb);
          color: white;
          font-weight: 600;
        }
        .nav-link.cta:hover {
          background: linear-gradient(135deg, #22d3ee, #3b82f6);
          transform: translateY(-1px);
          box-shadow: 0 4px 15px rgba(6,182,212,0.4);
        }
        .navbar-wrap {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          width: 100%;
          padding: 0 40px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(8, 12, 26, 0.7);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          box-sizing: border-box;
        }
        .nav-logo {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 22px;
          letter-spacing: -0.5px;
          background: linear-gradient(135deg, #fff 40%, #06b6d4);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-decoration: none;
        }
        .nav-logo span {
          background: linear-gradient(135deg, #06b6d4, #2563eb);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .nav-dot {
          display: inline-block;
          width: 6px;
          height: 6px;
          background: #06b6d4;
          border-radius: 50%;
          margin-left: 3px;
          margin-bottom: 10px;
          -webkit-text-fill-color: initial;
          background-clip: initial;
          -webkit-background-clip: initial;
        }
        .nav-user {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .nav-user-name {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          color: rgba(255,255,255,0.6);
          font-weight: 500;
        }
        .nav-signout-btn {
          padding: 8px 16px;
          background: rgba(248,113,113,0.12);
          border: 1px solid rgba(248,113,113,0.25);
          color: #f87171;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 600;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
          margin-left: 8px;
        }
        .nav-signout-btn:hover {
          background: rgba(248,113,113,0.2);
          border-color: rgba(248,113,113,0.4);
          color: #fca5a5;
        }
      `}</style>
      <nav className="navbar-wrap">
        <Link to="/" className="nav-logo">
          Intern<span>Sphere</span>
          <span className="nav-dot" />
        </Link>

        <div style={{ display: "flex", alignItems: "center" }}>
          {isSignedIn ? (
            // Logged in — show user name + sign out
            <div className="nav-user">
              <span className="nav-user-name">
                {user?.firstName} · {user?.publicMetadata?.role === "recruiter" ? "Recruiter" : "Student"}
              </span>
              <button className="nav-signout-btn" onClick={handleSignOut}>
                Sign out
              </button>
            </div>
          ) : (
            // Not logged in — show Login + Get Started
            <>
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link cta">Get Started</Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;