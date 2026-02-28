export const Toast = ({ message, type, visible }) => (
  <div style={{
    position: "fixed", bottom: 28, right: 28,
    background: type === "error" ? "#C0392B" : type === "success" ? "#2D5F3F" : "#1A1714",
    color: "#fff", padding: "12px 20px", borderRadius: "var(--rs)", fontSize: 14, fontWeight: 500,
    boxShadow: "var(--shadow-md)", zIndex: 9999, pointerEvents: "none", transition: "all .3s",
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(50px)",
  }}>
    {message}
  </div>
);
