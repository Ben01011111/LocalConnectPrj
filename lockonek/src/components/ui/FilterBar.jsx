export const FilterBar = ({ children }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22, flexWrap: "wrap" }}>
    {children}
  </div>
);

export const SearchBox = ({ value, onChange, placeholder }) => (
  <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
    <span style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", fontSize: 15, color: "var(--muted)" }}>🔍</span>
    <input value={value} onChange={onChange} placeholder={placeholder}
      style={{ width: "100%", padding: "9px 14px 9px 36px", border: "1.5px solid var(--border)", borderRadius: "var(--rs)", background: "var(--surface)", fontSize: 13, outline: "none", fontFamily: "'DM Sans',sans-serif" }}
      onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
      onBlur={(e)  => (e.target.style.borderColor = "var(--border)")}
    />
  </div>
);

export const FilterSelect = ({ value, onChange, children }) => (
  <select value={value} onChange={onChange}
    style={{ padding: "9px 13px", border: "1.5px solid var(--border)", borderRadius: "var(--rs)", background: "var(--surface)", fontSize: 13, outline: "none", cursor: "pointer", fontFamily: "'DM Sans',sans-serif" }}>
    {children}
  </select>
);
