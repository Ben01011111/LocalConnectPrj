import { useState } from "react";
import { STATUS_STYLE } from "../../constants";

// ── Badge ────────────────────────────────────────────────
export const Badge = ({ text, variant }) => {
  const s = STATUS_STYLE[text] || STATUS_STYLE[variant] || { bg: "#F0EDE5", color: "#7A6F60" };
  return (
    <span style={{ display: "inline-flex", alignItems: "center", padding: "3px 10px", borderRadius: 99, fontSize: 11, fontWeight: 600, background: s.bg, color: s.color }}>
      {text}
    </span>
  );
};

// ── Input ────────────────────────────────────────────────
export const Input = ({ style, ...p }) => (
  <input {...p} style={{ width: "100%", padding: "11px 14px", border: "1.5px solid var(--border)", borderRadius: "var(--rs)", background: "var(--bg)", color: "var(--text)", fontSize: 14, outline: "none", transition: "border-color .2s", fontFamily: "'DM Sans',sans-serif", ...style }}
    onFocus={(e) => { e.target.style.borderColor = "var(--accent)"; e.target.style.boxShadow = "0 0 0 3px var(--accent-l)"; }}
    onBlur={(e)  => { e.target.style.borderColor = "var(--border)";  e.target.style.boxShadow = "none"; }}
  />
);

// ── Select ───────────────────────────────────────────────
export const Select = ({ children, style, ...p }) => (
  <select {...p} style={{ width: "100%", padding: "11px 14px", border: "1.5px solid var(--border)", borderRadius: "var(--rs)", background: "var(--bg)", color: "var(--text)", fontSize: 14, outline: "none", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", ...style }}>
    {children}
  </select>
);

// ── Textarea ─────────────────────────────────────────────
export const Textarea = ({ style, ...p }) => (
  <textarea {...p} style={{ width: "100%", padding: "11px 14px", border: "1.5px solid var(--border)", borderRadius: "var(--rs)", background: "var(--bg)", color: "var(--text)", fontSize: 14, outline: "none", resize: "vertical", fontFamily: "'DM Sans',sans-serif", ...style }}
    onFocus={(e) => { e.target.style.borderColor = "var(--accent)"; }}
    onBlur={(e)  => { e.target.style.borderColor = "var(--border)"; }}
  />
);

// ── Btn ──────────────────────────────────────────────────
export const Btn = ({ variant = "default", style, children, ...p }) => {
  const base = { padding: "9px 20px", borderRadius: "var(--rs)", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6, transition: "all .15s", fontFamily: "'DM Sans',sans-serif" };
  const variants = {
    primary:   { background: "var(--accent)", color: "#fff", border: "none" },
    secondary: { background: "none", color: "var(--text)", border: "1.5px solid var(--border)" },
    danger:    { background: "none", color: "#DC2626", border: "1.5px solid #DC2626" },
    ghost:     { background: "none", color: "var(--accent)", border: "1.5px solid var(--accent-l)" },
    default:   { background: "var(--surface)", color: "var(--text)", border: "1.5px solid var(--border)" },
  };
  return <button {...p} style={{ ...base, ...(variants[variant] || variants.default), ...style }}>{children}</button>;
};

// ── FormRow / FormField ──────────────────────────────────
export const FormRow = ({ children, cols = 2 }) => (
  <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols},1fr)`, gap: 16, marginBottom: 18 }}>
    {children}
  </div>
);

export const FormField = ({ label, children }) => (
  <div>
    <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--muted)", marginBottom: 5, letterSpacing: ".04em", textTransform: "uppercase" }}>{label}</label>
    {children}
  </div>
);

// ── ActionBtn ────────────────────────────────────────────
export const ActionBtn = ({ variant = "green", children, ...p }) => {
  const cols = {
    green: ["var(--accent)", "var(--accent-l)"],
    blue:  ["var(--info)", "var(--info-l)"],
    red:   ["#DC2626", "#FEF2F2"],
  };
  const [c] = cols[variant] || cols.green;
  return (
    <button {...p}
      style={{ padding: "4px 10px", borderRadius: 6, fontSize: 12, fontWeight: 500, cursor: "pointer", border: `1.5px solid ${c}`, color: c, background: "transparent", fontFamily: "'DM Sans',sans-serif", transition: "all .15s", marginRight: 4 }}
      onMouseEnter={(e) => { e.target.style.background = c; e.target.style.color = "#fff"; }}
      onMouseLeave={(e) => { e.target.style.background = "transparent"; e.target.style.color = c; }}>
      {children}
    </button>
  );
};

// ── Toggle ───────────────────────────────────────────────
export const Toggle = ({ on, onChange }) => (
  <button onClick={() => onChange(!on)} style={{ width: 44, height: 24, borderRadius: 99, background: on ? "var(--accent)" : "var(--surface2)", border: "none", cursor: "pointer", position: "relative", transition: "background .2s", flexShrink: 0 }}>
    <span style={{ position: "absolute", width: 18, height: 18, borderRadius: "50%", background: "#fff", top: 3, left: on ? 23 : 3, transition: "left .2s", boxShadow: "0 1px 4px rgba(0,0,0,.2)" }} />
  </button>
);

// ── Alert ────────────────────────────────────────────────
export const Alert = ({ type = "info", children }) => {
  const s = type === "success"
    ? { bg: "#EDFBF2", color: "#166534", border: "#BBF7D0" }
    : { bg: "var(--info-l)", color: "#1D4ED8", border: "#BFDBFE" };
  return (
    <div style={{ padding: "11px 15px", borderRadius: "var(--rs)", fontSize: 13, marginBottom: 16, background: s.bg, color: s.color, border: `1px solid ${s.border}`, display: "flex", alignItems: "center", gap: 8 }}>
      {children}
    </div>
  );
};

// ── Empty ────────────────────────────────────────────────
export const Empty = ({ icon, title, sub }) => (
  <div style={{ textAlign: "center", padding: "56px 0", color: "var(--muted)" }}>
    <div style={{ fontSize: 40, marginBottom: 12 }}>{icon}</div>
    <div style={{ fontSize: 16, fontWeight: 500 }}>{title}</div>
    {sub && <div style={{ fontSize: 13, marginTop: 6 }}>{sub}</div>}
  </div>
);

// ── DetailRow ────────────────────────────────────────────
export const DetailRow = ({ label, value }) => (
  <div style={{ display: "flex", gap: 12, marginBottom: 12, fontSize: 14 }}>
    <span style={{ fontWeight: 600, color: "var(--muted)", width: 130, flexShrink: 0 }}>{label}</span>
    <span>{value ?? "—"}</span>
  </div>
);

// ── SectionTitle ─────────────────────────────────────────
export const SectionTitle = ({ children }) => (
  <span style={{ fontFamily: "'Fraunces',serif", fontSize: 17, fontWeight: 600 }}>{children}</span>
);

// ── StatCard ─────────────────────────────────────────────
export const StatCard = ({ icon, value, label, trend, trendDir, color }) => {
  const colors = { green: "var(--accent-l)", amber: "var(--amber-l)", blue: "var(--info-l)", purple: "#F3EEFF" };
  return (
    <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--r)", boxShadow: "var(--shadow)", padding: 22 }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
        <div style={{ width: 40, height: 40, borderRadius: 10, background: colors[color] || colors.green, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>{icon}</div>
        {trend && <span style={{ fontSize: 12, fontWeight: 500, padding: "3px 8px", borderRadius: 99, background: trendDir === "up" ? "#EDFBF2" : "#FEF2F2", color: trendDir === "up" ? "#16A34A" : "#DC2626" }}>{trend}</span>}
      </div>
      <div style={{ fontFamily: "'Fraunces',serif", fontSize: 30, fontWeight: 700, lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 4 }}>{label}</div>
    </div>
  );
};

// ── ChartBar ─────────────────────────────────────────────
export const ChartBar = ({ label, pct, value, color = "var(--accent)" }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 13 }}>
    <span style={{ fontSize: 12, color: "var(--muted)", width: 130, flexShrink: 0, textAlign: "right" }}>{label}</span>
    <div style={{ flex: 1, height: 10, background: "var(--surface2)", borderRadius: 99, overflow: "hidden" }}>
      <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 99, transition: "width .8s cubic-bezier(.4,0,.2,1)" }} />
    </div>
    <span style={{ fontSize: 12, fontWeight: 600, color: "var(--muted)", width: 36 }}>{value}</span>
  </div>
);

// ── StatusSelect ─────────────────────────────────────────
export const StatusSelect = ({ value, onChange, options }) => (
  <select value={value} onChange={(e) => onChange(e.target.value)}
    style={{ padding: "4px 8px", borderRadius: 6, border: "1.5px solid var(--border)", fontSize: 12, fontWeight: 600, cursor: "pointer", outline: "none", background: "var(--surface)", fontFamily: "'DM Sans',sans-serif" }}>
    {options.map((o) => <option key={o} value={o}>{o}</option>)}
  </select>
);
