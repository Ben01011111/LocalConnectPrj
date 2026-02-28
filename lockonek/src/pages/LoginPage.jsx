import { useState } from "react";
import { Input, Select } from "../components/ui";

const ROLE_MAP = {
  admin:     { name: "Admin",    role: "Administrator" },
  employer:  { name: "Employer User", role: "Business Employer" },
  jobseeker: { name: "Job Seeker",   role: "Job Seeker" },
  student:   { name: "Student",      role: "OJT Student" },
};

export const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState("admin@localconnect.gov.ph");
  const [pass,  setPass]  = useState("password");
  const [role,  setRole]  = useState("admin");

  return (
    <div style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr" }}>
      {/* HERO */}
      <div style={{ background: "linear-gradient(145deg,#1B3D2A 0%,#2D5F3F 50%,#1B3D2A 100%)", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 52 }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 30% 40%,rgba(200,135,58,.18) 0%,transparent 70%)" }} />
        <div style={{ position: "absolute", top: 0, right: 0, width: "60%", height: "100%", opacity: .06, backgroundImage: "repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 0,transparent 50%)", backgroundSize: "24px 24px" }} />
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,.12)", border: "1px solid rgba(255,255,255,.2)", borderRadius: 99, padding: "6px 14px", fontSize: 12, color: "rgba(255,255,255,.8)", letterSpacing: ".06em", textTransform: "uppercase", fontWeight: 500, width: "fit-content", marginBottom: 28, position: "relative", zIndex: 1 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#C8873A", display: "inline-block" }} />
          Employment Matching System
        </div>
        <h1 style={{ fontFamily: "'Fraunces',serif", fontSize: 52, fontWeight: 800, color: "#fff", lineHeight: 1.08, position: "relative", zIndex: 1, marginBottom: 16 }}>
          Bridging <em style={{ fontStyle: "italic", fontWeight: 300, color: "rgba(200,135,58,.9)" }}>Local</em><br />Workers &amp;<br />Employers
        </h1>
        <p style={{ fontSize: 15, color: "rgba(255,255,255,.65)", lineHeight: 1.65, maxWidth: 360, position: "relative", zIndex: 1 }}>
          A platform connecting job seekers and employers within the municipality.
        </p>
        <div style={{ display: "flex", gap: 32, marginTop: 48, paddingTop: 32, borderTop: "1px solid rgba(255,255,255,.1)", position: "relative", zIndex: 1 }}>
          {[["1,240+", "Job Seekers"], ["180+", "Employers"], ["95%", "Match Rate"]].map(([v, l]) => (
            <div key={l}>
              <span style={{ fontFamily: "'Fraunces',serif", fontSize: 28, fontWeight: 600, color: "#fff", display: "block" }}>{v}</span>
              <span style={{ fontSize: 11, color: "rgba(255,255,255,.5)", textTransform: "uppercase", letterSpacing: ".08em" }}>{l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* FORM */}
      <div style={{ background: "var(--surface)", display: "flex", alignItems: "center", justifyContent: "center", padding: 48 }}>
        <div style={{ width: "100%", maxWidth: 400 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 44 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🌱</div>
            <div>
              <div style={{ fontFamily: "'Fraunces',serif", fontSize: 20, fontWeight: 700 }}>LocalConnect</div>
              <div style={{ fontSize: 11, color: "var(--muted)" }}>Local Employment & Internship Matching System</div>
            </div>
          </div>
          <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: 28, fontWeight: 700, marginBottom: 6 }}>Welcome back</h2>
          <p style={{ fontSize: 14, color: "var(--muted)", marginBottom: 32 }}>Sign in to access your dashboard</p>

          <div style={{ marginBottom: 18 }}>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--muted)", marginBottom: 5, textTransform: "uppercase", letterSpacing: ".04em" }}>Email Address</label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
          </div>
          <div style={{ marginBottom: 18 }}>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--muted)", marginBottom: 5, textTransform: "uppercase", letterSpacing: ".04em" }}>Password</label>
            <Input type="password" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="••••••••" />
          </div>
          <div style={{ marginBottom: 28 }}>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--muted)", marginBottom: 5, textTransform: "uppercase", letterSpacing: ".04em" }}>Login As</label>
            <Select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="admin">Administrator</option>
              <option value="employer">Employer</option>
              <option value="jobseeker">Job Seeker</option>
              <option value="student">Student / OJT</option>
            </Select>
          </div>

          <button onClick={() => onLogin(ROLE_MAP[role])}
            style={{ width: "100%", padding: 13, background: "var(--accent)", color: "#fff", border: "none", borderRadius: "var(--rs)", fontSize: 15, fontWeight: 600, cursor: "pointer", transition: "background .2s" }}
            onMouseEnter={(e) => (e.target.style.background = "#245233")}
            onMouseLeave={(e) => (e.target.style.background = "var(--accent)")}>
            Sign In →
          </button>
          <p style={{ fontSize: 13, color: "var(--muted)", textAlign: "center", marginTop: 22 }}>
            Don't have an account? <span style={{ color: "var(--accent)", fontWeight: 500, cursor: "pointer" }}>Register here</span>
          </p>
        </div>
      </div>
    </div>
  );
};