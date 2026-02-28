import { useState } from "react";
import { INDUSTRIES, EMP_TYPES, INDUSTRY_EMOJI } from "../constants";
import { Topbar } from "../components/layout/Topbar";
import { Btn, Empty, Alert } from "../components/ui";
import { Card } from "../components/ui/Card";
import { FilterBar, SearchBox, FilterSelect } from "../components/ui/FilterBar";

// ─────────────────────────────────────────────────────────
//  Apply Modal — multi-step, fixed layout, no overflow
// ─────────────────────────────────────────────────────────
const ApplyModal = ({ job, employer, onClose, onSubmit }) => {
  const [step, setStep] = useState(1); // 1=details, 2=personal, 3=experience, 4=done

  // Personal info
  const [name,     setName]     = useState("");
  const [contact,  setContact]  = useState("");
  const [barangay, setBarangay] = useState("");
  const [education,setEducation]= useState("");
  const [skills,   setSkills]   = useState("");
  const [note,     setNote]     = useState("");

  // Work experience entries
  const [experiences, setExperiences] = useState([
    { id: 1, company: "", position: "", from: "", to: "", current: false, description: "" },
  ]);

  const addExp = () =>
    setExperiences((p) => [...p, { id: Date.now(), company: "", position: "", from: "", to: "", current: false, description: "" }]);
  const removeExp = (id) =>
    setExperiences((p) => p.filter((e) => e.id !== id));
  const updateExp = (id, field, value) =>
    setExperiences((p) => p.map((e) => e.id === id ? { ...e, [field]: value } : e));

  const EDU_OPTIONS = ["High School","Vocational/TESDA","Some College","College Graduate","Post Graduate"];

  if (!job) return null;

  const handleFinalSubmit = () => {
    if (!name.trim() || !contact.trim()) { alert("Name and contact number are required."); return; }
    onSubmit({ name, contact, barangay, education, skills, note, experiences, job_id: job.id });
    setStep(4);
  };

  // ── Styles ──
  const S = {
    overlay:  { position: "fixed", inset: 0, background: "rgba(0,0,0,.5)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" },
    modal:    { background: "#fff", borderRadius: 16, width: "100%", maxWidth: 620, display: "flex", flexDirection: "column", boxShadow: "0 32px 80px rgba(0,0,0,.22)", maxHeight: "calc(100vh - 40px)", overflow: "hidden" },
    header:   { padding: "20px 24px 16px", borderBottom: "1px solid var(--border)", flexShrink: 0 },
    body:     { flex: 1, overflowY: "auto", padding: "20px 24px" },
    footer:   { padding: "14px 24px", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0, background: "#fff" },
    label:    { fontSize: 11, fontWeight: 600, color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 5, display: "block" },
    input:    { width: "100%", padding: "9px 12px", borderRadius: 8, border: "1.5px solid var(--border)", fontSize: 13, fontFamily: "'DM Sans',sans-serif", outline: "none", boxSizing: "border-box", background: "#fff" },
    grid2:    { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 },
    infoBox:  { background: "var(--bg)", borderRadius: 8, padding: "10px 12px" },
    stepDot:  (active, done) => ({ width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, flexShrink: 0, background: done ? "var(--accent)" : active ? "var(--accent)" : "var(--surface2)", color: done || active ? "#fff" : "var(--muted)", transition: "all .2s" }),
  };

  const STEPS = ["Job Details", "Personal Info", "Work Experience", "Confirm"];

  const StepIndicator = () => (
    <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 20 }}>
      {STEPS.map((s, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", flex: i < STEPS.length - 1 ? 1 : "none" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <div style={S.stepDot(step === i + 1, step > i + 1)}>
              {step > i + 1 ? "✓" : i + 1}
            </div>
            <span style={{ fontSize: 10, color: step === i + 1 ? "var(--accent)" : "var(--muted)", fontWeight: step === i + 1 ? 600 : 400, whiteSpace: "nowrap" }}>{s}</span>
          </div>
          {i < STEPS.length - 1 && (
            <div style={{ flex: 1, height: 2, background: step > i + 1 ? "var(--accent)" : "var(--border)", margin: "0 6px", marginBottom: 16, transition: "background .2s" }} />
          )}
        </div>
      ))}
    </div>
  );

  const NavBtns = ({ onBack, onNext, nextLabel = "Next →", nextDisabled = false }) => (
    <div style={S.footer}>
      <button onClick={onBack || onClose}
        style={{ padding: "9px 18px", borderRadius: 8, border: "1.5px solid var(--border)", background: "none", fontSize: 13, cursor: "pointer", fontFamily: "'DM Sans',sans-serif", color: "var(--muted)" }}>
        {onBack ? "← Back" : "Cancel"}
      </button>
      <button onClick={onNext} disabled={nextDisabled}
        style={{ padding: "9px 22px", borderRadius: 8, border: "none", background: nextDisabled ? "var(--border)" : "var(--accent)", color: nextDisabled ? "var(--muted)" : "#fff", fontSize: 13, fontWeight: 600, cursor: nextDisabled ? "not-allowed" : "pointer", fontFamily: "'DM Sans',sans-serif" }}>
        {nextLabel}
      </button>
    </div>
  );

  return (
    <div style={S.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={S.modal}>

        {/* ── Fixed Header ── */}
        <div style={S.header}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: 17, fontWeight: 700, fontFamily: "'Fraunces',serif", lineHeight: 1.2 }}>{job.title}</div>
              <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>
                {employer?.name || "—"} &nbsp;·&nbsp; 📍 {job.location}
              </div>
            </div>
            <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "var(--muted)", lineHeight: 1, marginLeft: 12 }}>×</button>
          </div>
        </div>

        {/* ── Step 1: Job Details ── */}
        {step === 1 && (<>
          <div style={S.body}>
            <StepIndicator />
            <div style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 12 }}>Job Information</div>
            <div style={{ ...S.grid2, marginBottom: 10 }}>
              {[
                ["💼 Industry",  job.industry],
                ["📋 Job Type",  job.type],
                ["💰 Salary",    job.salary || "TBD"],
                ["👥 Vacancies", `${job.vacancies || 1} slot${(job.vacancies||1) > 1 ? "s" : ""}`],
                ["📍 Location",  job.location || "—"],
                ["📅 Deadline",  job.deadline || "Open"],
              ].map(([k, v]) => (
                <div key={k} style={S.infoBox}>
                  <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 2 }}>{k}</div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{v}</div>
                </div>
              ))}
            </div>
            {job.skills && (
              <div style={{ ...S.infoBox, marginBottom: 10 }}>
                <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 4 }}>🏷 Required Skills</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {job.skills.split(",").map((s) => (
                    <span key={s} style={{ padding: "3px 10px", borderRadius: 99, fontSize: 11, fontWeight: 600, background: "#EFF6FF", color: "#1D4ED8" }}>{s.trim()}</span>
                  ))}
                </div>
              </div>
            )}
            <div style={{ background: "#FFFBEB", border: "1px solid #FDE68A", borderRadius: 8, padding: "10px 14px", fontSize: 12, color: "#92400E" }}>
              ℹ️ Review the job details carefully before applying. Your application will be reviewed and processed.
            </div>
          </div>
          <NavBtns onNext={() => setStep(2)} nextLabel="Start Application →" />
        </>)}

        {/* ── Step 2: Personal Info ── */}
        {step === 2 && (<>
          <div style={S.body}>
            <StepIndicator />
            <div style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 14 }}>Personal Information</div>
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
              <div style={S.grid2}>
                <div>
                  <label style={S.label}>Barangay</label>
                  <input style={S.input} value={barangay} onChange={(e) => setBarangay(e.target.value)} placeholder="e.g. Rosary Heights I" />
                </div>
                <div>
                  <label style={S.label}>Highest Education</label>
                  <select style={S.input} value={education} onChange={(e) => setEducation(e.target.value)}>
                    <option value="">Select...</option>
                    {EDU_OPTIONS.map((o) => <option key={o}>{o}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label style={S.label}>Skills / Qualifications</label>
                <input style={S.input} value={skills} onChange={(e) => setSkills(e.target.value)} placeholder="e.g. Computer Literacy, Customer Service, MS Excel" />
              </div>
              <div>
                <label style={S.label}>Message to Employer <span style={{ fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>(optional)</span></label>
                <textarea style={{ ...S.input, resize: "vertical", minHeight: 72 }} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Briefly tell us why you're a good fit for this role..." />
              </div>
            </div>
          </div>
          <NavBtns onBack={() => setStep(1)} onNext={() => { if (!name || !contact) { alert("Name and contact are required."); return; } setStep(3); }} nextLabel="Next: Work Experience →" />
        </>)}

        {/* ── Step 3: Work Experience ── */}
        {step === 3 && (<>
          <div style={S.body}>
            <StepIndicator />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".08em" }}>Work Experience</div>
              <button onClick={addExp}
                style={{ fontSize: 12, padding: "6px 14px", borderRadius: 7, border: "1.5px dashed var(--accent)", background: "var(--accent-l)", color: "var(--accent)", cursor: "pointer", fontWeight: 600, fontFamily: "'DM Sans',sans-serif" }}>
                + Add Entry
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {experiences.map((exp, i) => (
                <div key={exp.id} style={{ border: "1.5px solid var(--border)", borderRadius: 10, padding: "14px 16px", background: "var(--bg)", position: "relative" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: "var(--accent)" }}>Experience #{i + 1}</span>
                    {experiences.length > 1 && (
                      <button onClick={() => removeExp(exp.id)}
                        style={{ fontSize: 11, color: "#DC2626", background: "#FEF2F2", border: "none", borderRadius: 6, padding: "3px 10px", cursor: "pointer", fontFamily: "'DM Sans',sans-serif" }}>
                        Remove
                      </button>
                    )}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <div style={S.grid2}>
                      <div>
                        <label style={S.label}>Company / Employer</label>
                        <input style={S.input} value={exp.company} onChange={(e) => updateExp(exp.id, "company", e.target.value)} placeholder="e.g. BDO Cotabato" />
                      </div>
                      <div>
                        <label style={S.label}>Position / Job Title</label>
                        <input style={S.input} value={exp.position} onChange={(e) => updateExp(exp.id, "position", e.target.value)} placeholder="e.g. Bank Teller" />
                      </div>
                    </div>
                    <div style={S.grid2}>
                      <div>
                        <label style={S.label}>From (Month/Year)</label>
                        <input style={S.input} type="month" value={exp.from} onChange={(e) => updateExp(exp.id, "from", e.target.value)} />
                      </div>
                      <div>
                        <label style={S.label}>To (Month/Year)</label>
                        <input style={{ ...S.input, opacity: exp.current ? 0.4 : 1 }} type="month" value={exp.to} disabled={exp.current} onChange={(e) => updateExp(exp.id, "to", e.target.value)} />
                        <label style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6, fontSize: 12, color: "var(--muted)", cursor: "pointer" }}>
                          <input type="checkbox" checked={exp.current} onChange={(e) => updateExp(exp.id, "current", e.target.checked)} />
                          Currently working here
                        </label>
                      </div>
                    </div>
                    <div>
                      <label style={S.label}>Key Responsibilities</label>
                      <textarea style={{ ...S.input, resize: "vertical", minHeight: 56 }} value={exp.description} onChange={(e) => updateExp(exp.id, "description", e.target.value)} placeholder="Briefly describe your duties and accomplishments..." />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 12, fontSize: 12, color: "var(--muted)", fontStyle: "italic" }}>
              💡 No work experience? Leave the fields blank and click Next — fresh graduates are welcome to apply.
            </div>
          </div>
          <NavBtns onBack={() => setStep(2)} onNext={handleFinalSubmit} nextLabel="Submit Application ✓" />
        </>)}

        {/* ── Step 4: Success ── */}
        {step === 4 && (
          <div style={{ ...S.body, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "48px 32px" }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#DCFCE7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, marginBottom: 16 }}>✅</div>
            <div style={{ fontSize: 20, fontWeight: 700, fontFamily: "'Fraunces',serif", marginBottom: 8 }}>Application Submitted!</div>
            <div style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.7, marginBottom: 28, maxWidth: 380 }}>
              Your application for <strong>{job.title}</strong> at <strong>{employer?.name}</strong> has been submitted. You will be contacted at <strong>{contact}</strong>.
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={onClose}
                style={{ padding: "10px 28px", borderRadius: 8, border: "none", background: "var(--accent)", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans',sans-serif" }}>
                Done
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────
//  Main JobsPage
// ─────────────────────────────────────────────────────────
export const JobsPage = ({ db, onAdd, onEdit, onDelete, onView, onApply, user }) => {
  const [q,        setQ]        = useState("");
  const [fi,       setFi]       = useState("");
  const [ft,       setFt]       = useState("");
  const [fs,       setFs]       = useState("");
  const [applyJob, setApplyJob] = useState(null);

  const isAdmin    = user?.role === "Administrator";
  const isEmployer = user?.role === "Business Employer";
  const isSeeker   = user?.role === "Job Seeker";
  const isStudent  = user?.role === "OJT Student";
  const canManage  = isAdmin || isEmployer;
  const canEdit    = isAdmin;

  const visibleJobs = isSeeker || isStudent
    ? db.jobs.filter((j) => j.status === "live")
    : db.jobs;

  const filtered = visibleJobs.filter((j) => {
    const mq = !q || j.title.toLowerCase().includes(q.toLowerCase()) ||
      (j.skills || "").toLowerCase().includes(q.toLowerCase()) ||
      (j.industry || "").toLowerCase().includes(q.toLowerCase());
    return mq && (!fi || j.industry === fi) && (!ft || j.type === ft) && (!fs || j.status === fs);
  });

  const getEmp = (id) => db.employers.find((e) => e.id == id);

  return (
    <div className="fade-up">
      <Topbar title={isSeeker || isStudent ? "Browse Job Openings" : "Job Listings"}>
        {canManage && <Btn variant="primary" onClick={() => onAdd()}>+ Post Job</Btn>}
      </Topbar>

      <div style={{ padding: 28 }}>
        {isSeeker && (
          <Alert type="info">
            💡 Click <strong>Apply Now</strong> on any listing to submit your application.
          </Alert>
        )}

        <FilterBar>
          <SearchBox value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search jobs, skills, industry..." />
          <FilterSelect value={fi} onChange={(e) => setFi(e.target.value)}>
            <option value="">All Industries</option>
            {INDUSTRIES.map((i) => <option key={i}>{i}</option>)}
          </FilterSelect>
          <FilterSelect value={ft} onChange={(e) => setFt(e.target.value)}>
            <option value="">All Types</option>
            {EMP_TYPES.map((t) => <option key={t}>{t}</option>)}
          </FilterSelect>
          {canManage && (
            <FilterSelect value={fs} onChange={(e) => setFs(e.target.value)}>
              <option value="">All Status</option>
              <option value="live">live</option>
              <option value="draft">draft</option>
              <option value="closed">closed</option>
            </FilterSelect>
          )}
        </FilterBar>

        {filtered.length === 0 ? (
          <Empty icon="💼" title="No job listings found"
            sub={canManage ? "Post a new job to get started" : "No open positions right now. Check back soon!"} />
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18 }}>
            {filtered.map((j) => {
              const emp = getEmp(j.employer_id);
              const dotColor = j.status === "live" ? "#16A34A" : j.status === "draft" ? "#F59E0B" : "#DC2626";
              return (
                <Card key={j.id} style={{ padding: 22, display: "flex", flexDirection: "column", gap: 0, transition: "transform .15s,box-shadow .15s", borderRadius: 16 }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "var(--shadow-md)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "var(--shadow)"; }}>

                  {/* Title row + icon */}
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 6 }}>
                    <div style={{ flex: 1, paddingRight: 12 }}>
                      <div style={{ fontSize: 16, fontWeight: 700, lineHeight: 1.25, fontFamily: "'Fraunces',serif", color: "var(--text)" }}>{j.title}</div>
                      <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 3 }}>{emp?.name || "—"}</div>
                    </div>
                    <div style={{ width: 46, height: 46, borderRadius: 12, background: "#F0F4F8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>
                      {INDUSTRY_EMOJI[j.industry] || "💼"}
                    </div>
                  </div>

                  {/* Pill tags */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14, marginTop: 2 }}>
                    <span style={{ padding: "4px 10px", borderRadius: 99, fontSize: 11, fontWeight: 600, background: "#EDE9FE", color: "#5B21B6" }}>{j.type}</span>
                    <span style={{ padding: "4px 10px", borderRadius: 99, fontSize: 11, fontWeight: 600, background: "#DBEAFE", color: "#1D4ED8" }}>{j.industry}</span>
                    {canManage && (
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "4px 10px", borderRadius: 99, fontSize: 11, fontWeight: 600, background: "var(--surface2)", color: "var(--muted)" }}>
                        <span style={{ width: 7, height: 7, borderRadius: "50%", background: dotColor, display: "inline-block" }} />{j.status}
                      </span>
                    )}
                  </div>

                  {/* Info rows — stacked, clean */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: 14 }}>
                    <div style={{ fontSize: 13, color: "var(--muted)" }}>📍 {j.location || "—"}</div>
                    <div style={{ fontSize: 13, color: "var(--muted)" }}>💰 {j.salary || "TBD"}</div>
                    {j.vacancies && <div style={{ fontSize: 13, color: "var(--muted)" }}>👥 {j.vacancies} slot{j.vacancies > 1 ? "s" : ""} available</div>}
                    {j.deadline && <div style={{ fontSize: 13, color: "var(--muted)" }}>📅 Deadline: {j.deadline}</div>}
                  </div>

                  {/* Skills */}
                  {j.skills && (
                    <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 16 }}>
                      🏷 {j.skills}
                    </div>
                  )}

                  {/* CTA button — full width */}
                  <div style={{ marginTop: "auto", display: "flex", gap: 6 }}>
                    {isSeeker ? (
                      <button onClick={() => setApplyJob(j)}
                        style={{ flex: 1, padding: "11px", borderRadius: 10, background: "var(--accent)", color: "#fff", border: "none", fontSize: 13, fontWeight: 700, cursor: "pointer", letterSpacing: ".01em", transition: "opacity .15s" }}
                        onMouseEnter={(e) => e.target.style.opacity = ".88"}
                        onMouseLeave={(e) => e.target.style.opacity = "1"}>
                        Apply Now
                      </button>
                    ) : (
                      <>
                        <button onClick={() => onView(j)}
                          style={{ flex: 1, padding: "10px", borderRadius: 10, background: "var(--accent-l)", color: "var(--accent)", border: "none", fontSize: 13, fontWeight: 700, cursor: "pointer", transition: "all .15s" }}
                          onMouseEnter={(e) => { e.target.style.background = "var(--accent)"; e.target.style.color = "#fff"; }}
                          onMouseLeave={(e) => { e.target.style.background = "var(--accent-l)"; e.target.style.color = "var(--accent)"; }}>
                          View Details
                        </button>
                        {isAdmin && <button onClick={() => onEdit(j)} style={{ width: 38, padding: "10px", borderRadius: 10, background: "var(--surface2)", border: "none", fontSize: 14, cursor: "pointer" }}>✏️</button>}
                        {isAdmin && <button onClick={() => onDelete(j.id)} style={{ width: 38, padding: "10px", borderRadius: 10, background: "#FEF2F2", border: "none", fontSize: 14, cursor: "pointer" }}>🗑</button>}
                      </>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {applyJob && (
        <ApplyModal
          job={applyJob}
          employer={getEmp(applyJob.employer_id)}
          onClose={() => setApplyJob(null)}
          onSubmit={(data) => {
            onApply && onApply({ ...data, status: "pending", type: "unemployed", priority: "" });
          }}
        />
      )}
    </div>
  );
};