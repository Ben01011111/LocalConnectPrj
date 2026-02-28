export const Card = ({ children, style }) => (
  <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--r)", boxShadow: "var(--shadow)", ...style }}>
    {children}
  </div>
);

export const CardHeader = ({ children }) => (
  <div style={{ padding: "18px 22px 14px", borderBottom: "1px solid var(--border)" }}>
    {children}
  </div>
);

export const CardBody = ({ children, style }) => (
  <div style={{ padding: "18px 22px", ...style }}>
    {children}
  </div>
);
