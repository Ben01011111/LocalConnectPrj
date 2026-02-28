import { useEffect } from "react";
import { Btn } from "../ui";

export const Modal = ({ open, onClose, title, children, footer, maxWidth = 560 }) => {
  useEffect(() => {
    const h = (e) => { if (e.key === "Escape") onClose(); };
    if (open) window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{ position: "fixed", inset: 0, background: "rgba(26,23,20,.55)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", animation: "fadeUp .2s ease" }}>
      <div style={{ background: "var(--surface)", borderRadius: "var(--r)", width: "90%", maxWidth, maxHeight: "90vh", overflowY: "auto", boxShadow: "var(--shadow-md)", animation: "fadeUp .2s ease" }}>
        {/* Header */}
        <div style={{ padding: "22px 26px 16px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, background: "var(--surface)", zIndex: 1 }}>
          <span style={{ fontFamily: "'Fraunces',serif", fontSize: 20, fontWeight: 700 }}>{title}</span>
          <button onClick={onClose} style={{ width: 30, height: 30, borderRadius: 8, border: "1.5px solid var(--border)", background: "none", cursor: "pointer", fontSize: 15, color: "var(--muted)", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
        </div>
        {/* Body */}
        <div style={{ padding: "22px 26px" }}>{children}</div>
        {/* Footer */}
        {footer && (
          <div style={{ padding: "14px 26px", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "flex-end", gap: 10 }}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export const DetailModal = ({ open, onClose, title, content, onEdit }) => (
  <Modal open={open} onClose={onClose} title={title} maxWidth={480}
    footer={
      <>
        <Btn variant="secondary" onClick={onClose}>Close</Btn>
        {onEdit && <Btn variant="primary" onClick={onEdit}>Edit</Btn>}
      </>
    }>
    {content}
  </Modal>
);
