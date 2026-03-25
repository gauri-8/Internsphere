import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

function LandingPage() {
  const navigate = useNavigate();
  return (
    <div style={styles.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { width: 100%; min-height: 100vh; overflow-x: hidden; }
        body { margin: 0; padding: 0; }

        .hero-bg {
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse 80% 60% at 60% 0%, rgba(6,182,212,0.18) 0%, transparent 60%),
            radial-gradient(ellipse 50% 40% at 20% 80%, rgba(37,99,235,0.2) 0%, transparent 60%),
            #080c1a;
        }
        .hero-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 80% 70% at 50% 50%, black, transparent);
        }
        .badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(6,182,212,0.12);
          border: 1px solid rgba(6,182,212,0.3);
          color: #06b6d4;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.5px;
          padding: 6px 14px;
          border-radius: 100px;
          margin-bottom: 28px;
        }
        .badge-dot {
          width: 6px; height: 6px;
          background: #06b6d4;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
        .hero-title {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(48px, 7vw, 80px);
          line-height: 1.05;
          letter-spacing: -2px;
          color: white;
          margin-bottom: 24px;
        }
        .hero-title .accent {
          background: linear-gradient(135deg, #06b6d4 0%, #818cf8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hero-sub {
          font-family: 'DM Sans', sans-serif;
          font-size: 18px;
          line-height: 1.7;
          color: rgba(255,255,255,0.55);
          max-width: 520px;
          margin: 0 auto 40px;
          font-weight: 300;
        }
        .hero-actions {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
        }
        .btn-primary {
          padding: 14px 32px;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 600;
          background: linear-gradient(135deg, #06b6d4, #2563eb);
          color: white;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 0 30px rgba(6,182,212,0.3);
          letter-spacing: 0.2px;
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 40px rgba(6,182,212,0.45);
        }
        .btn-secondary {
          padding: 14px 28px;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 500;
          background: rgba(255,255,255,0.06);
          color: rgba(255,255,255,0.8);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.25s ease;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .btn-secondary:hover {
          background: rgba(255,255,255,0.1);
          color: white;
          border-color: rgba(255,255,255,0.2);
        }
        .stat-strip {
          display: flex;
          justify-content: center;
          gap: 60px;
          margin-top: 80px;
          padding-top: 48px;
          border-top: 1px solid rgba(255,255,255,0.07);
          flex-wrap: wrap;
        }
        .stat-item {
          text-align: center;
        }
        .stat-num {
          font-family: 'Syne', sans-serif;
          font-size: 36px;
          font-weight: 800;
          background: linear-gradient(135deg, #fff, #06b6d4);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .stat-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          color: rgba(255,255,255,0.4);
          margin-top: 4px;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        /* ABOUT */
        .about-section {
          padding: 120px 40px;
          max-width: 900px;
          margin: 0 auto;
          text-align: center;
        }
        .section-tag {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #06b6d4;
          margin-bottom: 16px;
        }
        .section-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(28px, 4vw, 42px);
          font-weight: 800;
          color: #0f172a;
          letter-spacing: -1px;
          line-height: 1.15;
          margin-bottom: 20px;
        }
        .section-body {
          font-family: 'DM Sans', sans-serif;
          font-size: 17px;
          line-height: 1.75;
          color: #64748b;
          font-weight: 300;
        }

        /* FEATURES */
        .features-section {
          background: #f8fafc;
          padding: 100px 40px;
          text-align: center;
          border-top: 1px solid #e2e8f0;
        }
        .feature-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 24px;
          max-width: 900px;
          margin: 56px auto 0;
        }
        .feature-card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 32px 28px;
          text-align: left;
          transition: all 0.25s ease;
          position: relative;
          overflow: hidden;
        }
        .feature-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, #06b6d4, #2563eb);
          transform: scaleX(0);
          transition: transform 0.3s ease;
          transform-origin: left;
        }
        .feature-card:hover {
          border-color: #cbd5e1;
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.08);
        }
        .feature-card:hover::before {
          transform: scaleX(1);
        }
        .feature-icon {
          width: 44px; height: 44px;
          border-radius: 10px;
          background: linear-gradient(135deg, rgba(6,182,212,0.12), rgba(37,99,235,0.12));
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          margin-bottom: 20px;
        }
        .feature-title {
          font-family: 'Syne', sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 10px;
        }
        .feature-desc {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          line-height: 1.65;
          color: #64748b;
          font-weight: 300;
        }

        /* FOOTER */
        .footer {
          background: #080c1a;
          padding: 48px 40px;
          text-align: center;
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .footer-logo {
          font-family: 'Syne', sans-serif;
          font-size: 20px;
          font-weight: 800;
          background: linear-gradient(135deg, #fff 40%, #06b6d4);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 12px;
        }
        .footer-copy {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          color: rgba(255,255,255,0.3);
        }
      `}</style>

      <Navbar />

      {/* HERO */}
      <section style={styles.hero}>
        <div className="hero-bg" />
        <div className="hero-grid" />
        <div style={styles.heroInner}>
          <div className="badge">
            <span className="badge-dot" />
            Now live — Find your perfect internship
          </div>
          <h1 className="hero-title">
            Launch Your Career<br />
            with <span className="accent">InternSphere</span>
          </h1>
          <p className="hero-sub">
            The smartest platform connecting ambitious students with
            top recruiters. Discover opportunities, apply with ease,
            and track every step of your journey.
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => navigate("/student/browse")}>Explore Internships →</button>
            <a href="/register" className="btn-secondary">
              <span>Create Account</span>
            </a>
          </div>
          <div className="stat-strip">
            <div className="stat-item">
              <div className="stat-num">2,400+</div>
              <div className="stat-label">Internships</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">850+</div>
              <div className="stat-label">Companies</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">12k+</div>
              <div className="stat-label">Students Placed</div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="about-section">
        <p className="section-tag">About the Platform</p>
        <h2 className="section-title">What is InternSphere?</h2>
        <p className="section-body">
          InternSphere is an intelligent internship management platform built
          for the modern student and recruiter. Students can discover curated
          opportunities and track their applications in real-time — while
          recruiters get powerful tools to post roles, screen resumes, and
          find the right fit, faster.
        </p>
      </section>

      {/* FEATURES */}
      <section className="features-section">
        <p className="section-tag">Platform Features</p>
        <h2 className="section-title">Everything you need,<br />in one place</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <div className="feature-title">Find Internships</div>
            <p className="feature-desc">Browse hundreds of roles from top companies, filtered by role, location, and domain.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📄</div>
            <div className="feature-title">Smart Resume Screening</div>
            <p className="feature-desc">Recruiters can instantly match and filter candidates using AI-powered resume analysis.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <div className="feature-title">Application Tracking</div>
            <p className="feature-desc">A live dashboard to manage every application — know exactly where you stand at a glance.</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-logo">InternSphere</div>
        <p className="footer-copy">© 2026 InternSphere — Internship Management Platform</p>
      </footer>
    </div>
  );
}

const styles = {
  root: {
    width: "100%",
    minHeight: "100vh",
    fontFamily: "'DM Sans', sans-serif",
    overflowX: "hidden",
  },
  hero: {
    position: "relative",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "100px 40px 80px",
    overflow: "hidden",
  },
  heroInner: {
    position: "relative",
    zIndex: 1,
    maxWidth: "700px",
    width: "100%",
  },
};

export default LandingPage;