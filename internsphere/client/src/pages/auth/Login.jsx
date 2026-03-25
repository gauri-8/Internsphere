import { useState } from "react";
import { useSignIn } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

export default function Login() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const navigate = useNavigate();

  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  const handleLogin = async () => {
    if (!isLoaded) return;
    setLoading(true);
    setError("");

    try {
      const result = await signIn.create({ identifier: email, password });

      if (result.status === "complete") {
        // 1. Activate Clerk session
        await setActive({ session: result.createdSessionId });

        // 2. Get real Clerk JWT (session ID is NOT a JWT — this was the bug)
        const token = await window.Clerk.session.getToken();

        // 3. Fetch user + role from MongoDB
        const res = await fetch("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        const userRole = data?.user?.role;

        // 4. Redirect based on role
        if (userRole === "recruiter") navigate("/recruiter/dashboard");
        else navigate("/student/dashboard");
      }
    } catch (err) {
      setError(err.errors?.[0]?.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={s.root}>
      <style>{css}</style>
      <div className="login-bg" />
      <div className="login-grid" />
      <Navbar />

      <div style={s.layout}>
        {/* Left side art */}
        <div className="login-side-art" style={s.sideArt}>
          <div style={s.sideArtInner}>
            <div style={s.sideQuote}>
              "The best time to find your first internship was last year. The second best time is now."
            </div>
            <div style={s.sideAuthor}>— InternSphere</div>
            <div style={s.floatCards}>
              {[
                { company: "Google",    role: "SWE Intern",  color: "#06b6d4" },
                { company: "Microsoft", role: "PM Intern",   color: "#818cf8" },
                { company: "Amazon",    role: "Data Intern", color: "#34d399" },
              ].map((c, i) => (
                <div key={i} style={{ ...s.floatCard, animationDelay: `${i * 0.5}s`, top: `${i * 72}px` }}>
                  <div style={{ ...s.floatCardDot, background: c.color }} />
                  <div>
                    <div style={s.floatCardRole}>{c.role}</div>
                    <div style={s.floatCardCompany}>{c.company}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Login form */}
        <div className="login-card">
          <p className="login-eyebrow">Welcome back</p>
          <h1 className="login-title">Sign in</h1>
          <p className="login-subtitle">Continue to your InternSphere dashboard</p>

          <div className="field-group">
            <label className="field-label">Email address</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="field-input"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div className="field-group">
            <label className="field-label">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="field-input"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleLogin()}
            />
          </div>

          {error && <p className="login-error">{error}</p>}

          <button className="login-btn" onClick={handleLogin} disabled={loading}>
            {loading ? "Signing in..." : "Sign in →"}
          </button>

          <div className="login-divider">
            <div className="login-divider-line" />
            <span className="login-divider-text">or</span>
            <div className="login-divider-line" />
          </div>

          <p className="login-footer-text">
            Don't have an account? <a href="/register">Create one free</a>
          </p>
        </div>
      </div>

      <style>{`@keyframes floatUp{0%,100%{transform:translateY(0px);}50%{transform:translateY(-8px);}}`}</style>
    </div>
  );
}

const s = {
  root:          { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", padding: "100px 24px 40px" },
  layout:        { display: "flex", alignItems: "center", justifyContent: "center", gap: "60px", position: "relative", zIndex: 1, width: "100%", maxWidth: "900px" },
  sideArt:       { flex: 1, maxWidth: "360px" },
  sideArtInner:  { position: "relative" },
  sideQuote:     { fontFamily: "'Syne',sans-serif", fontSize: "22px", fontWeight: "700", color: "white", lineHeight: "1.4", letterSpacing: "-0.5px", marginBottom: "12px" },
  sideAuthor:    { fontFamily: "'DM Sans',sans-serif", fontSize: "13px", color: "#06b6d4", fontWeight: "500", marginBottom: "48px" },
  floatCards:    { position: "relative", height: "220px" },
  floatCard:     { position: "absolute", left: 0, display: "flex", alignItems: "center", gap: "14px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", padding: "14px 18px", width: "240px", animation: "floatUp 3s ease-in-out infinite", backdropFilter: "blur(10px)" },
  floatCardDot:  { width: "10px", height: "10px", borderRadius: "50%", flexShrink: 0 },
  floatCardRole: { fontFamily: "'DM Sans',sans-serif", fontSize: "13px", fontWeight: "600", color: "white" },
  floatCardCompany: { fontFamily: "'DM Sans',sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.4)" },
};

const css = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
.login-bg{position:fixed;inset:0;background:radial-gradient(ellipse 60% 50% at 80% 20%,rgba(6,182,212,0.15) 0%,transparent 60%),radial-gradient(ellipse 50% 40% at 10% 80%,rgba(37,99,235,0.15) 0%,transparent 60%),#080c1a;z-index:0;}
.login-grid{position:fixed;inset:0;background-image:linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px);background-size:50px 50px;z-index:0;}
.login-card{position:relative;z-index:1;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.09);border-radius:20px;padding:48px 44px;width:100%;max-width:420px;backdrop-filter:blur(20px);}
.login-eyebrow{font-family:'DM Sans',sans-serif;font-size:12px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#06b6d4;margin-bottom:12px;}
.login-title{font-family:'Syne',sans-serif;font-size:32px;font-weight:800;color:white;letter-spacing:-1px;margin-bottom:8px;}
.login-subtitle{font-family:'DM Sans',sans-serif;font-size:14px;color:rgba(255,255,255,0.4);margin-bottom:28px;font-weight:300;}
.field-group{display:flex;flex-direction:column;margin-bottom:16px;}
.field-label{font-family:'DM Sans',sans-serif;font-size:12px;font-weight:600;letter-spacing:0.8px;text-transform:uppercase;color:rgba(255,255,255,0.5);margin-bottom:8px;}
.field-input{width:100%;padding:13px 16px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:10px;font-family:'DM Sans',sans-serif;font-size:15px;color:white;outline:none;transition:all 0.2s;box-sizing:border-box;}
.field-input::placeholder{color:rgba(255,255,255,0.25);}
.field-input:focus{border-color:#06b6d4;background:rgba(6,182,212,0.07);box-shadow:0 0 0 3px rgba(6,182,212,0.12);}
.login-btn{width:100%;padding:14px;background:linear-gradient(135deg,#06b6d4,#2563eb);color:white;font-family:'DM Sans',sans-serif;font-size:15px;font-weight:600;border:none;border-radius:10px;cursor:pointer;transition:all 0.25s;box-shadow:0 4px 20px rgba(6,182,212,0.25);margin-top:4px;}
.login-btn:hover:not(:disabled){transform:translateY(-1px);box-shadow:0 8px 30px rgba(6,182,212,0.4);}
.login-btn:disabled{opacity:0.6;cursor:not-allowed;}
.login-error{font-family:'DM Sans',sans-serif;font-size:13px;color:#f87171;margin-bottom:12px;padding:10px 14px;background:rgba(248,113,113,0.1);border-radius:8px;border:1px solid rgba(248,113,113,0.2);}
.login-divider{display:flex;align-items:center;gap:12px;margin:24px 0;}
.login-divider-line{flex:1;height:1px;background:rgba(255,255,255,0.08);}
.login-divider-text{font-family:'DM Sans',sans-serif;font-size:12px;color:rgba(255,255,255,0.25);}
.login-footer-text{text-align:center;font-family:'DM Sans',sans-serif;font-size:14px;color:rgba(255,255,255,0.4);}
.login-footer-text a{color:#06b6d4;text-decoration:none;font-weight:500;}
.login-side-art{display:none;}
@media(min-width:900px){.login-side-art{display:block;}}
`;