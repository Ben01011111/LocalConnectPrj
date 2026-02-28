import { useState } from "react";

export const Table = ({ headers, children, empty, isEmpty, widths }) => (
  <div style={{ overflowX: "auto" }}>
    <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: widths ? "fixed" : "auto" }}>
      {widths && (
        <colgroup>
          {widths.map((w, i) => <col key={i} style={{ width: w }} />)}
        </colgroup>
      )}
      <thead>
        <tr>
          {headers.map((h) => (
            <th key={h} style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: ".08em", color: "var(--muted)", fontWeight: 600, padding: "10px 14px", background: "var(--bg)", textAlign: "left", whiteSpace: "nowrap" }}>
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
    {isEmpty && (
      <div style={{ textAlign: "center", padding: "48px 0", color: "var(--muted)" }}>{empty}</div>
    )}
  </div>
);

export const TR = ({ children }) => {
  const [hov, setHov] = useState(false);
  return (
    <tr onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: hov ? "var(--bg)" : "transparent", transition: "background .1s" }}>
      {children}
    </tr>
  );
};

export const TD = ({ children, style }) => (
  <td style={{ padding: "12px 14px", fontSize: 13, borderTop: "1px solid var(--border)", verticalAlign: "middle", ...style }}>
    {children}
  </td>
);