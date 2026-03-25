import { useState } from "react";
import { useSignUp } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

export default function Register() {
  const { signUp, setActive, isLoaded } = useSignUp();
  const navigate = useNavigate();

  const [role, setRole]           = useState("student");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName]   = useState("");
  const [email, setEmail]         = useState("");
  const [password, setPassword]   = useState("");
  const [code, setCode]           = useState("");
  const [step, setStep]           = useState("form"); // "form" | "verify"
  const [error, setError]         = useState("");
  const [loading, setLoading]     = useState(false);

  // Step 1 — Create account in Clerk + send verification email
  const handleRegister = async () => {
    if (!isLoaded) return;
    setLoading(true);
    setError("");
    try {
      await signUp.create({ firstName, lastName, emailAddress: email, password });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setStep("verify");
    } catch (err) {
      setError(err.errors?.[0]?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  // Step 2 — Verify email, activate session, save user to MongoDB
  const handleVerify = async () => {
    if (!isLoaded) return;
    setLoading(true);
    setError("");
    try {
      const result = await signUp.attemptEmailAddressVerification({ code });

      if (result.status === "complete") {
        // 1. Activate Clerk session
        await setActive({ session: result.createdSessionId });

        // 2. Get real Clerk JWT (session ID is NOT a JWT — this was the bug)
        const token = await window.Clerk.session.getToken();

        // 3. Save user + role to MongoDB
        await fetch("http://localhost:5000/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ role, firstName, lastName, email }),
        });

        // 4. Redirect based on chosen role
        if (role === "student") navigate("/student/dashboard");
        else navigate("/recruiter/dashboard");
      }
    } catch (err) {
      setError(err.errors?.[0]?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={s.root}>
      <style>{css}</style>
      <div className="reg-bg" />
      <div className="reg-grid" />
      <Navbar />

      <div style={s.layout}>
        <div className="reg-card">

          {step === "form" ? (
            <>
              <p className="reg-eyebrow">Join InternSphere</p>
              <h1 className="reg-title">Create account</h1>
              <p className="reg-subtitle">Start your internship journey today — it's free</p>

              <label className="field-label">I am a</label>
              <div className="role-toggle">
                <button type="button" className={`role-btn ${role === "student" ? "active" : ""}`} onClick={() => setRole("student")}>
                  🎓 Student
                </button>
                <button type="button" className={`role-btn ${role === "recruiter" ? "active" : ""}`} onClick={() => setRole("recruiter")}>
                  💼 Recruiter
                </button>
              </div>

              <div className="field-row">
                <div className="field-group">
                  <label className="field-label">First name</label>
                  <input className="field-input" placeholder="Alex" value={firstName} onChange={e => setFirstName(e.target.value)} />
                </div>
                <div className="field-group">
                  <label className="field-label">Last name</label>
                  <input className="field-input" placeholder="Johnson" value={lastName} onChange={e => setLastName(e.target.value)} />
                </div>
              </div>

              <div className="field-group">
                <label className="field-label">Email address</label>
                <input type="email" className="field-input" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
              </div>

              <div className="field-group">
                <label className="field-label">Password</label>
                <input type="password" className="field-input" placeholder="Create a strong password" value={password} onChange={e => setPassword(e.target.value)} />
              </div>

              {error && <p className="reg-error">{error}</p>}

              <button className="reg-btn" onClick={handleRegister} disabled={loading}>
                {loading ? "Creating account..." : "Create Account →"}
              </button>

              <p className="reg-footer-text">
                Already have an account? <a href="/login">Sign in</a>
              </p>
            </>
          ) : (
            <>
              <p className="reg-eyebrow">Almost there!</p>
              <h1 className="reg-title">Verify your email</h1>
              <p className="reg-subtitle">We sent a 6-digit code to <strong style={{ color: "white" }}>{email}</strong></p>

              <div className="field-group" style={{ marginTop: 24 }}>
                <label className="field-label">Verification Code</label>
                <input
                  className="field-input"
                  placeholder="Enter 6-digit code"
                  value={code}
                  onChange={e => setCode(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleVerify()}
                  style={{ textAlign: "center", fontSize: 20, letterSpacing: 8 }}
                />
              </div>

              {error && <p className="reg-error">{error}</p>}

              <button className="reg-btn" onClick={handleVerify} disabled={loading}>
                {loading ? "Verifying..." : "Verify & Continue →"}
              </button>

              <p className="reg-footer-text">
                Didn't get a code?{" "}
                <button
                  style={{ background: "none", border: "none", color: "#818cf8", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontSize: 14, fontWeight: 500 }}
                  onClick={() => signUp.prepareEmailAddressVerification({ strategy: "email_code" })}
                >
                  Resend code
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const s = {
  root:   { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", padding: "100px 24px 40px" },
  layout: { position: "relative", zIndex: 1, width: "100%", display: "flex", justifyContent: "center" },
};

const css = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
.reg-bg{position:fixed;inset:0;background:radial-gradient(ellipse 60% 50% at 20% 10%,rgba(129,140,248,0.15) 0%,transparent 60%),radial-gradient(ellipse 50% 40% at 90% 80%,rgba(6,182,212,0.12) 0%,transparent 60%),#080c1a;z-index:0;}
.reg-grid{position:fixed;inset:0;background-image:linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px);background-size:50px 50px;z-index:0;}
.reg-card{position:relative;z-index:1;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.09);border-radius:20px;padding:48px 44px;width:100%;max-width:460px;backdrop-filter:blur(20px);}
.reg-eyebrow{font-family:'DM Sans',sans-serif;font-size:12px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#818cf8;margin-bottom:12px;}
.reg-title{font-family:'Syne',sans-serif;font-size:32px;font-weight:800;color:white;letter-spacing:-1px;margin-bottom:8px;}
.reg-subtitle{font-family:'DM Sans',sans-serif;font-size:14px;color:rgba(255,255,255,0.4);margin-bottom:28px;font-weight:300;}
.role-toggle{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:20px;}
.role-btn{padding:12px;border-radius:10px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.04);color:rgba(255,255,255,0.5);font-family:'DM Sans',sans-serif;font-size:14px;font-weight:500;cursor:pointer;transition:all 0.2s;}
.role-btn:hover{border-color:rgba(255,255,255,0.2);color:white;}
.role-btn.active{background:rgba(129,140,248,0.15);border-color:#818cf8;color:white;}
.field-row{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
.field-group{display:flex;flex-direction:column;margin-bottom:16px;}
.field-label{font-family:'DM Sans',sans-serif;font-size:12px;font-weight:600;letter-spacing:0.8px;text-transform:uppercase;color:rgba(255,255,255,0.5);margin-bottom:8px;}
.field-input{width:100%;padding:13px 16px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:10px;font-family:'DM Sans',sans-serif;font-size:15px;color:white;outline:none;transition:all 0.2s;box-sizing:border-box;}
.field-input::placeholder{color:rgba(255,255,255,0.25);}
.field-input:focus{border-color:#818cf8;background:rgba(129,140,248,0.07);box-shadow:0 0 0 3px rgba(129,140,248,0.12);}
.reg-btn{width:100%;padding:14px;margin-top:8px;background:linear-gradient(135deg,#818cf8,#2563eb);color:white;font-family:'DM Sans',sans-serif;font-size:15px;font-weight:600;border:none;border-radius:10px;cursor:pointer;transition:all 0.25s;box-shadow:0 4px 20px rgba(129,140,248,0.25);}
.reg-btn:hover:not(:disabled){transform:translateY(-1px);box-shadow:0 8px 30px rgba(129,140,248,0.4);}
.reg-btn:disabled{opacity:0.6;cursor:not-allowed;}
.reg-error{font-family:'DM Sans',sans-serif;font-size:13px;color:#f87171;margin-bottom:12px;padding:10px 14px;background:rgba(248,113,113,0.1);border-radius:8px;border:1px solid rgba(248,113,113,0.2);}
.reg-footer-text{text-align:center;font-family:'DM Sans',sans-serif;font-size:14px;color:rgba(255,255,255,0.4);margin-top:20px;}
.reg-footer-text a{color:#818cf8;text-decoration:none;font-weight:500;}
`;