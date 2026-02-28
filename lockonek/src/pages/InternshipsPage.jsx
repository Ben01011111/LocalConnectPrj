import { useState } from "react";
import { INDUSTRY_EMOJI } from "../constants";
import { Topbar } from "../components/layout/Topbar";
import { Btn, ActionBtn, Alert, Empty } from "../components/ui";
import { Badge } from "../components/ui";
import { Card, CardHeader } from "../components/ui/Card";
import { SectionTitle } from "../components/ui";
import { Table, TR, TD } from "../components/ui/Table";
import { FilterBar, SearchBox, FilterSelect } from "../components/ui/FilterBar";

// ─────────────────────────────────────────────────────────
//  OJT Slot Apply Modal (for OJT Students)
// ─────────────────────────────────────────────────────────
const ApplySlotModal = ({ job, employer, onClose, onSubmit }) => {
  const [step,     setStep]     = useState(1);
  const [name,     setName]     = useState("");
  const [contact,  setContact]  = useState("");
  const [school,   setSchool]   = useState("");
  const [degree,   setDegree]   = useState("");
  const [strand,   setStrand]   = useState("ABM");
  const [note,     setNote]     = useState("");

  const isSHS     = job?.type === "SHS Work Immersion";
  const SHS_STRANDS = ["ABM","TVL","STEM","HUMSS","GAS","Sports Track","Arts & Design Track"];

  const S = {
    overlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,.5)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "80px 20px 20px" },
    modal:   { background: "#fff", borderRadius: 16, width: "100%", maxWidth: 560, display: "flex", flexDirection: "column", boxShadow: "0 32px 80px rgba(0,0,0,.22)", maxHeight: "calc(100vh - 100px)", overflow: "hidden" },
    header:  { padding: "18px 24px 14px", borderBottom: "1px solid var(--border)", flexShrink: 0 },
    body:    { flex: 1, overflowY: "auto", padding: "18px 24px" },
    footer:  { padding: "12px 24px", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0, background: "#fff" },
    label:   { fontSize: 11, fontWeight: 600, color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 5, display: "block" },
    input:   { width: "100%", padding: "9px 12px", borderRadius: 8, border: "1.5px solid var(--border)", fontSize: 13, fontFamily: "'DM Sans',sans-serif", outline: "none", boxSizing: "border-box", background: "#fff" },
    grid2:   { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 },
    infoBox: { background: "var(--bg)", borderRadius: 8, padding: "10px 12px" },
  };

  const BtnBack = ({ onClick }) => (
    <button onClick={onClick} style={{ padding: "9px 18px", borderRadius: 8, border: "1.5px solid var(--border)", background: "none", fontSize: 13, cursor: "pointer", fontFamily: "'DM Sans',sans-serif", color: "var(--muted)" }}>← Back</button>
  );
  const BtnNext = ({ onClick, label, disabled }) => (
    <button onClick={onClick} disabled={disabled} style={{ padding: "9px 22px", borderRadius: 8, border: "none", background: disabled ? "var(--border)" : "var(--accent)", color: disabled ? "var(--muted)" : "#fff", fontSize: 13, fontWeight: 600, cursor: disabled ? "not-allowed" : "pointer", fontFamily: "'DM Sans',sans-serif" }}>{label}</button>
  );

  const handleSubmit = () => {
    if (!name.trim() || !contact.trim()) { alert("Name and contact number are required."); return; }
    onSubmit({
      student:     name,
      type:        isSHS ? "shs" : "college_ojt",
      employer_id: job.employer_id,
      status:      "pending",
      degree:      isSHS ? "" : degree,
      req_hours:   isSHS ? 0 : 480,
      comp_hours:  0,
      strand:      isSHS ? strand : "",
      req_days:    isSHS ? 40 : 0,
      comp_days:   0,
    });
    setStep(3);
  };

  if (!job) return null;

  return (
    <div style={S.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={S.modal}>

        {/* Header */}
        <div style={S.header}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: 17, fontWeight: 700, fontFamily: "'Fraunces',serif", lineHeight: 1.2 }}>{job.title}</div>
              <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>{employer?.name || "—"} &nbsp;·&nbsp; 📍 {job.location}</div>
            </div>
            <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "var(--muted)", lineHeight: 1, marginLeft: 12 }}>×</button>
          </div>
        </div>

        {/* Step 1 — Slot Details */}
        {step === 1 && (<>
          <div style={S.body}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 12 }}>Slot Information</div>
            <div style={{ ...S.grid2, marginBottom: 10 }}>
              {[
                ["🎓 Program Type", job.type],
                ["🏭 Industry",     job.industry],
                ["👥 Slots Open",   `${job.vacancies} slot${job.vacancies > 1 ? "s" : ""}`],
                ["📍 Location",     job.location],
                ["💰 Allowance",    job.salary || "To be discussed"],
                ["📅 Deadline",     job.deadline || "Open"],
              ].map(([k, v]) => (
                <div key={k} style={S.infoBox}>
                  <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 2 }}>{k}</div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{v}</div>
                </div>
              ))}
            </div>
            {job.skills && (
              <div style={{ ...S.infoBox, marginBottom: 10 }}>
                <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 4 }}>🏷 Skills / Tasks Involved</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {job.skills.split(",").map((s) => (
                    <span key={s} style={{ padding: "3px 10px", borderRadius: 99, fontSize: 11, fontWeight: 600, background: "#EFF6FF", color: "#1D4ED8" }}>{s.trim()}</span>
                  ))}
                </div>
              </div>
            )}
            <div style={{ background: "#FFFBEB", border: "1px solid #FDE68A", borderRadius: 8, padding: "10px 14px", fontSize: 12, color: "#92400E" }}>
              ℹ️ Your application will be coordinated with {employer?.name}. Bring your school endorsement letter upon confirmation.
            </div>
          </div>
          <div style={S.footer}>
            <button onClick={onClose} style={{ padding: "9px 18px", borderRadius: 8, border: "1.5px solid var(--border)", background: "none", fontSize: 13, cursor: "pointer", fontFamily: "'DM Sans',sans-serif", color: "var(--muted)" }}>Cancel</button>
            <BtnNext onClick={() => setStep(2)} label="Apply for this Slot →" />
          </div>
        </>)}

        {/* Step 2 — Student Details */}
        {step === 2 && (<>
          <div style={S.body}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 14 }}>Your Details</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={S.grid2}>
                <div>
                  <label style={S.label}>Full Name <span style={{ color: "#DC2626" }}>*</span></label>
                  <input style={S.input} value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Juan dela Cruz" />
                </div>
                <div>
                  <label style={S.label}>Contact Number <span style={{ color: "#DC2626" }}>*</span></label>
                  <input style={S.input} value={contact} onChange={(e) => setContact(e.target.value)} placeholder="e.g. 0912-345-6789" />
                </div>
              </div>
              <div>
                <label style={S.label}>School / University</label>
                <input style={S.input} value={school} onChange={(e) => setSchool(e.target.value)} placeholder="e.g. Notre Dame College, Cotabato City" />
              </div>
              {isSHS ? (
                <div>
                  <label style={S.label}>SHS Strand</label>
                  <select style={S.input} value={strand} onChange={(e) => setStrand(e.target.value)}>
                    {SHS_STRANDS.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
              ) : (
                <div>
                  <label style={S.label}>Degree / Course</label>
                  <input style={S.input} value={degree} onChange={(e) => setDegree(e.target.value)} placeholder="e.g. BS Nursing" />
                </div>
              )}
              <div>
                <label style={S.label}>Message / Notes <span style={{ fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>(optional)</span></label>
                <textarea style={{ ...S.input, resize: "vertical", minHeight: 70 }} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Any notes for the establishment..." />
              </div>
            </div>
          </div>
          <div style={S.footer}>
            <BtnBack onClick={() => setStep(1)} />
            <BtnNext onClick={handleSubmit} label="Submit Application ✓" disabled={!name.trim() || !contact.trim()} />
          </div>
        </>)}

        {/* Step 3 — Success */}
        {step === 3 && (
          <div style={{ ...S.body, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "48px 32px" }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#DCFCE7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, marginBottom: 16 }}>🎓</div>
            <div style={{ fontSize: 20, fontWeight: 700, fontFamily: "'Fraunces',serif", marginBottom: 8 }}>Application Submitted!</div>
            <div style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.7, marginBottom: 28, maxWidth: 360 }}>
              Your application for <strong>{job.title}</strong> at <strong>{employer?.name}</strong> has been submitted. You will be contacted at <strong>{contact}</strong> once your slot is confirmed.
            </div>
            <button onClick={onClose} style={{ padding: "10px 32px", borderRadius: 8, border: "none", background: "var(--accent)", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans',sans-serif" }}>Done</button>
          </div>
        )}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────
//  Main InternshipsPage
// ─────────────────────────────────────────────────────────
export const InternshipsPage = ({ db, onAdd, onEdit, onDelete, onOJTApply, user }) => {
  const [q,        setQ]        = useState("");
  const [ft,       setFt]       = useState("");
  const [fs,       setFs]       = useState("");
  const [applyJob, setApplyJob] = useState(null);

  const isAdmin    = user?.role === "Administrator";
  const isEmployer = user?.role === "Business Employer";
  const isStudent  = user?.role === "OJT Student";
  const canManage  = isAdmin || isEmployer;

  const getEmpName = (id) => db.employers.find((e) => e.id == id)?.name || "—";
  const getEmp     = (id) => db.employers.find((e) => e.id == id);

  // OJT/Immersion job slots — only College OJT and SHS Work Immersion types
  const ojtJobs = db.jobs.filter((j) =>
    j.status === "live" &&
    (j.type === "College OJT" || j.type === "SHS Work Immersion")
  );

  const filteredSlots = ojtJobs.filter((j) => {
    const mq = !q || j.title.toLowerCase().includes(q.toLowerCase()) ||
      (j.industry || "").toLowerCase().includes(q.toLowerCase()) ||
      getEmpName(j.employer_id).toLowerCase().includes(q.toLowerCase());
    return mq && (!ft || j.type === ft);
  });

  // OJT records for admin/employer view
  const filteredRecords = db.ojt.filter((r) => {
    const mq = !q || r.student.toLowerCase().includes(q.toLowerCase()) ||
      getEmpName(r.employer_id).toLowerCase().includes(q.toLowerCase());
    return mq && (!ft || r.type === ft) && (!fs || r.status === fs);
  });

  const college = filteredRecords.filter((r) => r.type === "college_ojt");
  const shs     = filteredRecords.filter((r) => r.type === "shs");

  const ProgressBar = ({ comp, req }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <div style={{ flex: 1, height: 6, background: "var(--surface2)", borderRadius: 99, overflow: "hidden", minWidth: 50 }}>
        <div style={{ height: "100%", width: `${Math.min(100, ((comp||0)/(req||1))*100)}%`, background: "var(--accent)", borderRadius: 99 }} />
      </div>
      <span style={{ fontSize: 11, color: "var(--muted)", whiteSpace: "nowrap" }}>{comp||0}/{req||"—"}</span>
    </div>
  );

  // ── OJT STUDENT VIEW — job card listing ───────────────
  if (isStudent) {
    return (
      <div className="fade-up">
        <Topbar title="OJT & Immersion Vacancies">
        </Topbar>
        <div style={{ padding: 28 }}>
          <Alert type="info">
            🎓 Showing available <strong>College OJT</strong> and <strong>SHS Work Immersion</strong> slots from verified establishments. Click <strong>Apply for Slot</strong> to submit your application.
          </Alert>

          <FilterBar>
            <SearchBox value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by title, industry, or establishment..." />
            <FilterSelect value={ft} onChange={(e) => setFt(e.target.value)}>
              <option value="">All Programs</option>
              <option value="College OJT">College OJT</option>
              <option value="SHS Work Immersion">SHS Work Immersion</option>
            </FilterSelect>
          </FilterBar>

          {filteredSlots.length === 0 ? (
            <Empty icon="🎓" title="No OJT slots available" sub="Check back soon for new openings from verified establishments." />
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18 }}>
              {filteredSlots.map((j) => {
                const emp = getEmp(j.employer_id);
                const isSHS = j.type === "SHS Work Immersion";
                const typeTag = isSHS
                  ? { bg: "#FEF3C7", color: "#92400E", label: "📚 SHS Immersion" }
                  : { bg: "#EDE9FE", color: "#5B21B6", label: "🎓 College OJT" };
                return (
                  <Card key={j.id}
                    style={{ padding: 22, display: "flex", flexDirection: "column", gap: 0, transition: "transform .15s,box-shadow .15s", borderRadius: 16 }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "var(--shadow-md)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "var(--shadow)"; }}>

                    {/* Title row + icon */}
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 6 }}>
                      <div style={{ flex: 1, paddingRight: 12 }}>
                        <div style={{ fontSize: 16, fontWeight: 700, lineHeight: 1.25, fontFamily: "'Fraunces',serif", color: "var(--text)" }}>{j.title}</div>
                        <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 3 }}>{emp?.name || "—"}</div>
                      </div>
                      <div style={{ width: 46, height: 46, borderRadius: 12, background: "#F0F4F8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>
                        {INDUSTRY_EMOJI[j.industry] || "🎓"}
                      </div>
                    </div>

                    {/* Pill tags */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14, marginTop: 2 }}>
                      <span style={{ padding: "4px 10px", borderRadius: 99, fontSize: 11, fontWeight: 600, background: typeTag.bg, color: typeTag.color }}>{typeTag.label}</span>
                      <span style={{ padding: "4px 10px", borderRadius: 99, fontSize: 11, fontWeight: 600, background: "#DBEAFE", color: "#1D4ED8" }}>{j.industry}</span>
                    </div>

                    {/* Info rows */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: 14 }}>
                      <div style={{ fontSize: 13, color: "var(--muted)" }}>📍 {j.location}</div>
                      <div style={{ fontSize: 13, color: "var(--muted)" }}>💰 {j.salary}</div>
                      <div style={{ fontSize: 13, color: "var(--muted)" }}>👥 {j.vacancies} slot{j.vacancies > 1 ? "s" : ""} available</div>
                      {j.deadline && <div style={{ fontSize: 13, color: "var(--muted)" }}>📅 Deadline: {j.deadline}</div>}
                    </div>

                    {/* Skills */}
                    {j.skills && (
                      <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 16 }}>🏷 {j.skills}</div>
                    )}

                    {/* CTA — full width */}
                    <button onClick={() => setApplyJob(j)}
                      style={{ marginTop: "auto", width: "100%", padding: "11px", borderRadius: 10, background: "var(--accent)", color: "#fff", border: "none", fontSize: 13, fontWeight: 700, cursor: "pointer", letterSpacing: ".01em", transition: "opacity .15s" }}
                      onMouseEnter={(e) => e.target.style.opacity = ".88"}
                      onMouseLeave={(e) => e.target.style.opacity = "1"}>
                      Apply for Slot
                    </button>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        {applyJob && (
          <ApplySlotModal
            job={applyJob}
            employer={getEmp(applyJob.employer_id)}
            onClose={() => setApplyJob(null)}
            onSubmit={(data) => {
              onOJTApply && onOJTApply(data);
              setApplyJob(null);
            }}
          />
        )}
      </div>
    );
  }

  // ── ADMIN / EMPLOYER VIEW — OJT records table ─────────
  return (
    <div className="fade-up">
      <Topbar title="Internships & OJT Programs">
        {canManage && <Btn variant="primary" onClick={() => onAdd()}>+ Add OJT Record</Btn>}
      </Topbar>
      <div style={{ padding: 28 }}>
        <Alert type="info">
          📌 OJT / Internship programs must comply with DepEd and CHED requirements. SHS Work Immersion (Grade 11–12) and College OJT slots are tracked separately.
        </Alert>

        <FilterBar>
          <SearchBox value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by student or host company..." />
          <FilterSelect value={ft} onChange={(e) => setFt(e.target.value)}>
            <option value="">All Programs</option>
            <option value="college_ojt">College OJT</option>
            <option value="shs">SHS Work Immersion</option>
          </FilterSelect>
          <FilterSelect value={fs} onChange={(e) => setFs(e.target.value)}>
            <option value="">All Status</option>
            <option value="pending">pending</option>
            <option value="ongoing">ongoing</option>
            <option value="completed">completed</option>
          </FilterSelect>
        </FilterBar>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <Card>
            <CardHeader><SectionTitle>College OJT</SectionTitle></CardHeader>
            {college.length === 0 ? (
              <div style={{ padding: "28px", textAlign: "center", color: "var(--muted)", fontSize: 13 }}>No college OJT records yet</div>
            ) : (
              <Table
                headers={["Student", "Degree / Course", "Host Establishment", "Progress", "Status", ...(canManage ? ["Actions"] : [])]}
                widths={canManage ? ["22%","20%","22%","16%","10%","10%"] : ["25%","22%","25%","16%","12%"]}>
                {college.map((r) => (
                  <TR key={r.id}>
                    <TD><strong>{r.student}</strong></TD>
                    <TD>{r.degree || "—"}</TD>
                    <TD>{getEmpName(r.employer_id)}</TD>
                    <TD><ProgressBar comp={r.comp_hours} req={r.req_hours} /></TD>
                    <TD><Badge text={r.status} /></TD>
                    {canManage && (
                      <TD>
                        <ActionBtn variant="blue" onClick={() => onEdit(r)}>Edit</ActionBtn>
                        {isAdmin && <ActionBtn variant="red" onClick={() => onDelete(r.id)}>Del</ActionBtn>}
                      </TD>
                    )}
                  </TR>
                ))}
              </Table>
            )}
          </Card>

          <Card>
            <CardHeader><SectionTitle>SHS Work Immersion (DepEd)</SectionTitle></CardHeader>
            {shs.length === 0 ? (
              <div style={{ padding: "28px", textAlign: "center", color: "var(--muted)", fontSize: 13 }}>No SHS work immersion records yet</div>
            ) : (
              <Table
                headers={["Student", "Strand", "Host Establishment", "Progress", "Status", ...(canManage ? ["Actions"] : [])]}
                widths={canManage ? ["22%","20%","22%","16%","10%","10%"] : ["25%","22%","25%","16%","12%"]}>                {shs.map((r) => (
                  <TR key={r.id}>
                    <TD><strong>{r.student}</strong></TD>
                    <TD>{r.strand || "—"}</TD>
                    <TD>{getEmpName(r.employer_id)}</TD>
                    <TD><ProgressBar comp={r.comp_days} req={r.req_days} /></TD>
                    <TD><Badge text={r.status} /></TD>
                    {canManage && (
                      <TD>
                        <ActionBtn variant="blue" onClick={() => onEdit(r)}>Edit</ActionBtn>
                        {isAdmin && <ActionBtn variant="red" onClick={() => onDelete(r.id)}>Del</ActionBtn>}
                      </TD>
                    )}
                  </TR>
                ))}
              </Table>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};