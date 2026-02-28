import { useState } from "react";
import { APP_STATUSES, EDU_LEVELS } from "../constants";
import { Topbar } from "../components/layout/Topbar";
import { Btn, ActionBtn, Empty, StatusSelect, Alert } from "../components/ui";
import { Badge } from "../components/ui";
import { Card } from "../components/ui/Card";
import { Table, TR, TD } from "../components/ui/Table";
import { FilterBar, SearchBox, FilterSelect } from "../components/ui/FilterBar";

// ── Applicant View Modal ──────────────────────────────────
const ApplicantViewModal = ({ applicant, jobTitle, onClose, onStatusChange, onEdit, isAdmin, isEmployer }) => {
  const [status, setStatus] = useState(applicant?.status || "pending");
  const [saving, setSaving] = useState(false);

  if (!applicant) return null;

  const handleStatusSave = () => {
    onStatusChange(applicant.id, status);
    setSaving(true);
    setTimeout(() => setSaving(false), 800);
  };

  const handleApprove = () => {
    setStatus("confirmed");
    onStatusChange(applicant.id, "confirmed");
  };

  const S = {
    overlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,.5)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 },
    modal:   { background: "#fff", borderRadius: 16, width: "100%", maxWidth: 520, display: "flex", flexDirection: "column", boxShadow: "0 32px 80px rgba(0,0,0,.22)", maxHeight: "calc(100vh - 40px)", overflow: "hidden" },
    header:  { padding: "20px 24px 16px", borderBottom: "1px solid var(--border)", flexShrink: 0 },
    body:    { flex: 1, overflowY: "auto", padding: "20px 24px" },
    footer:  { padding: "14px 24px", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0, background: "#fff", gap: 10 },
    row:     { display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 12, fontSize: 14 },
    lbl:     { fontWeight: 600, color: "var(--muted)", width: 120, flexShrink: 0, fontSize: 12, textTransform: "uppercase", letterSpacing: ".04em", paddingTop: 2 },
    val:     { flex: 1, fontSize: 14, color: "var(--text)" },
    divider: { borderTop: "1px solid var(--border)", margin: "16px 0" },
    input:   { width: "100%", padding: "8px 12px", borderRadius: 8, border: "1.5px solid var(--border)", fontSize: 13, fontFamily: "'DM Sans',sans-serif", outline: "none", boxSizing: "border-box" },
  };

  const statusColors = {
    pending:   { bg: "#FEF3C7", color: "#92400E" },
    matched:   { bg: "#DBEAFE", color: "#1E40AF" },
    endorsed:  { bg: "#EDE9FE", color: "#5B21B6" },
    confirmed: { bg: "#DCFCE7", color: "#166534" },
    declined:  { bg: "#FEE2E2", color: "#991B1B" },
  };
  const sc = statusColors[status] || statusColors.pending;

  const canEdit   = isAdmin || isEmployer;
  const empStatuses = ["pending","matched","endorsed","declined"];

  return (
    <div style={S.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={S.modal}>

        {/* Header */}
        <div style={S.header}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: 18, fontWeight: 700, fontFamily: "'Fraunces',serif" }}>{applicant.name}</div>
              <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 3 }}>
                {applicant.contact || "No contact"} &nbsp;·&nbsp; {applicant.barangay || "—"}
              </div>
            </div>
            <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "var(--muted)", lineHeight: 1, marginLeft: 12 }}>×</button>
          </div>
        </div>

        {/* Body */}
        <div style={S.body}>

          {/* Status badge prominent */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18, padding: "10px 14px", borderRadius: 10, background: sc.bg }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: sc.color, textTransform: "uppercase", letterSpacing: ".06em" }}>Current Status</span>
            <span style={{ marginLeft: "auto", padding: "4px 12px", borderRadius: 99, fontSize: 12, fontWeight: 700, background: "rgba(255,255,255,.6)", color: sc.color }}>
              {status}
            </span>
          </div>

          {/* Applicant details */}
          <div style={S.row}><span style={S.lbl}>Education</span><span style={S.val}>{applicant.education || "—"}</span></div>
          <div style={S.row}><span style={S.lbl}>Seeker Type</span>
            <span style={{ ...S.val }}>
              <span style={{ display: "inline-flex", padding: "3px 9px", borderRadius: 99, fontSize: 11, fontWeight: 600, background: "var(--surface2)", color: "var(--muted)" }}>
                {applicant.type || "—"}
              </span>
            </span>
          </div>
          <div style={S.row}><span style={S.lbl}>Applied For</span><span style={{ ...S.val, fontWeight: 600 }}>{jobTitle || "—"}</span></div>
          <div style={S.row}><span style={S.lbl}>Skills</span><span style={S.val}>{applicant.skills || "—"}</span></div>
          {applicant.priority && (
            <div style={S.row}><span style={S.lbl}>Priority</span>
              <span style={{ display: "inline-flex", padding: "3px 9px", borderRadius: 99, fontSize: 11, fontWeight: 600, background: "#F3EEFF", color: "#6B21A8" }}>
                {applicant.priority}
              </span>
            </div>
          )}

          {/* Status management section */}
          {canEdit && (<>
            <div style={S.divider} />
            <div style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 12 }}>
              Update Status
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                style={{ ...S.input, flex: 1 }}>
                {(isAdmin ? APP_STATUSES : empStatuses).map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <button onClick={handleStatusSave}
                style={{ padding: "8px 16px", borderRadius: 8, border: "none", background: "var(--accent)", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap", fontFamily: "'DM Sans',sans-serif", opacity: saving ? .6 : 1 }}>
                {saving ? "Saved ✓" : "Save"}
              </button>
            </div>

            {/* Quick approve — prominent for employer */}
            {isEmployer && status !== "confirmed" && (
              <button onClick={handleApprove}
                style={{ marginTop: 12, width: "100%", padding: "11px", borderRadius: 10, border: "none", background: "#16A34A", color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans',sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                ✅ Approve Applicant
              </button>
            )}
            {isAdmin && status !== "confirmed" && (
              <button onClick={handleApprove}
                style={{ marginTop: 12, width: "100%", padding: "11px", borderRadius: 10, border: "none", background: "#16A34A", color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans',sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                ✅ Approve Applicant
              </button>
            )}
            {status === "confirmed" && (
              <div style={{ marginTop: 12, padding: "11px", borderRadius: 10, background: "#DCFCE7", color: "#166534", fontSize: 13, fontWeight: 600, textAlign: "center" }}>
                ✅ Applicant Approved
              </div>
            )}
          </>)}
        </div>

        {/* Footer */}
        <div style={S.footer}>
          <button onClick={onClose} style={{ padding: "9px 18px", borderRadius: 8, border: "1.5px solid var(--border)", background: "none", fontSize: 13, cursor: "pointer", fontFamily: "'DM Sans',sans-serif", color: "var(--muted)" }}>Close</button>
          {isAdmin && onEdit && (
            <button onClick={() => { onClose(); onEdit(applicant); }}
              style={{ padding: "9px 22px", borderRadius: 8, border: "none", background: "var(--accent)", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans',sans-serif" }}>
              ✏️ Edit Applicant
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// ── Main Page ─────────────────────────────────────────────
export const ApplicantsPage = ({ db, onAdd, onEdit, onDelete, onView, onStatusChange, onExport, user }) => {
  const [q,           setQ]           = useState("");
  const [fs,          setFs]          = useState("");
  const [fe,          setFe]          = useState("");
  const [viewTarget,  setViewTarget]  = useState(null);

  const isAdmin    = user?.role === "Administrator";
  const isEmployer = user?.role === "Business Employer";

  const filtered = db.applicants.filter((a) => {
    const mq = !q || a.name.toLowerCase().includes(q.toLowerCase()) ||
      (a.barangay || "").toLowerCase().includes(q.toLowerCase()) ||
      (a.skills || "").toLowerCase().includes(q.toLowerCase());
    return mq && (!fs || a.status === fs) && (!fe || a.education === fe);
  });

  const getJobTitle = (id) => db.jobs.find((j) => j.id == id)?.title || "—";

  return (
    <div className="fade-up">
      <Topbar title={isAdmin ? "Applicants Management" : "Applicants"}>
        {isAdmin && <Btn onClick={onExport}>📥 Export CSV</Btn>}
        {isAdmin && <Btn variant="primary" onClick={() => onAdd()}>+ Add Applicant</Btn>}
      </Topbar>
      <div style={{ padding: 28 }}>
        {isEmployer && (
          <Alert type="info">
            👁 You can view applicant profiles, update their status, and approve qualified applicants.
          </Alert>
        )}
        <FilterBar>
          <SearchBox value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name, barangay, skill..." />
          <FilterSelect value={fs} onChange={(e) => setFs(e.target.value)}>
            <option value="">All Status</option>
            {APP_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </FilterSelect>
          <FilterSelect value={fe} onChange={(e) => setFe(e.target.value)}>
            <option value="">All Education</option>
            {EDU_LEVELS.map((e) => <option key={e}>{e}</option>)}
          </FilterSelect>
        </FilterBar>
        <Card>
          {filtered.length === 0 ? (
            <Empty icon="👥" title="No applicants found" sub="Add your first applicant to get started" />
          ) : (
            <Table headers={["Name", "Barangay", "Education", "Skills", "Type", "Status", "Actions"]}>
              {filtered.map((a) => (
                <TR key={a.id}>
                  <TD>
                    <strong>{a.name}</strong>
                    {a.contact && <><br /><small style={{ color: "var(--muted)" }}>{a.contact}</small></>}
                  </TD>
                  <TD>{a.barangay || "—"}</TD>
                  <TD>{a.education || "—"}</TD>
                  <TD style={{ maxWidth: 150, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.skills || "—"}</TD>
                  <TD>
                    <span style={{ display: "inline-flex", alignItems: "center", padding: "3px 9px", borderRadius: 99, fontSize: 11, fontWeight: 600, background: "var(--surface2)", color: "var(--muted)" }}>
                      {a.type || "—"}
                    </span>
                  </TD>
                  <TD>
                    {isAdmin
                      ? <StatusSelect value={a.status} onChange={(v) => onStatusChange(a.id, v)} options={APP_STATUSES} />
                      : isEmployer
                        ? <StatusSelect value={a.status} onChange={(v) => onStatusChange(a.id, v)} options={["pending","matched","endorsed","declined"]} />
                        : <Badge text={a.status} />
                    }
                  </TD>
                  <TD>
                    <ActionBtn variant="green" onClick={() => setViewTarget(a)}>View</ActionBtn>
                    {isAdmin && <ActionBtn variant="blue" onClick={() => onEdit(a)}>Edit</ActionBtn>}
                    {isAdmin && <ActionBtn variant="red" onClick={() => onDelete(a.id)}>Del</ActionBtn>}
                  </TD>
                </TR>
              ))}
            </Table>
          )}
        </Card>
      </div>

      {viewTarget && (
        <ApplicantViewModal
          applicant={viewTarget}
          jobTitle={getJobTitle(viewTarget.job_id)}
          onClose={() => setViewTarget(null)}
          onStatusChange={(id, s) => { onStatusChange(id, s); setViewTarget((p) => ({ ...p, status: s })); }}
          onEdit={isAdmin ? (a) => { setViewTarget(null); onEdit(a); } : null}
          isAdmin={isAdmin}
          isEmployer={isEmployer}
        />
      )}
    </div>
  );
};