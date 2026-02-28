export const Topbar = ({ title, subtitle, children }) => (
  <div style={{
    background: "var(--surface)", borderBottom: "1px solid var(--border)",
    padding: "14px 28px", display: "flex", alignItems: "center",
    justifyContent: "space-between", position: "sticky", top: 0, zIndex: 10,
  }}>
    <div>
      <div style={{ fontFamily: "'Fraunces',serif", fontSize: 22, fontWeight: 700 }}>{title}</div>
      {subtitle && <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>{subtitle}</div>}
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>{children}</div>
  </div>
);
