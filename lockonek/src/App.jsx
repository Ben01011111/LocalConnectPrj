import { useState } from "react";

// Styles
import { GLOBAL_CSS } from "./styles/globalCss";

// Hooks
import { useToast }    from "./hooks/useToast";
import { useDatabase } from "./hooks/useDatabase";

// Utils
import { exportApplicantsCSV } from "./utils/exportCSV";

// Layout
import { Sidebar } from "./components/layout/Sidebar";

// Pages
import { LoginPage }       from "./pages/LoginPage";
import { DashboardPage }   from "./pages/DashboardPage";
import { JobsPage }        from "./pages/JobsPage";
import { ApplicantsPage }  from "./pages/ApplicantsPage";
import { InternshipsPage } from "./pages/InternshipsPage";
import { EmployersPage }   from "./pages/EmployersPage";
import { PostJobPage }     from "./pages/PostJobPage";
import { ReportsPage }     from "./pages/ReportsPage";
import { DBSchemaPage }    from "./pages/DBSchemaPage";
import { SettingsPage }    from "./pages/SettingsPage";
import { NotificationsPage } from "./pages/NotificationsPage";

// Modals
import { JobModal }      from "./components/modals/JobModal";
import { ApplicantModal }from "./components/modals/ApplicantModal";
import { EmployerModal } from "./components/modals/EmployerModal";
import { OJTModal }      from "./components/modals/OJTModal";
import { DetailModal }   from "./components/ui/Modal";

// Primitives
import { Toast }         from "./components/ui/Toast";
import { Badge }         from "./components/ui";
import { DetailRow }     from "./components/ui";

// ─────────────────────────────────────────────────────────
//  APP ROOT
// ─────────────────────────────────────────────────────────
export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user,     setUser]     = useState({ name: "Admin", role: "Administrator" });
  const [page,     setPage]     = useState("dashboard");

  const { toast, showToast } = useToast();

  const {
    db, getEmpName, getJobTitle,
    addJob, updateJob, deleteJob,
    addApplicant, updateApplicant, deleteApplicant, updateApplicantStatus,
    addEmployer, updateEmployer, deleteEmployer, validateEmployer,
    addOJT, updateOJT, deleteOJT,
  } = useDatabase();

  // Modal state
  const [jobModal,       setJobModal]       = useState({ open: false, job: null });
  const [applicantModal, setApplicantModal] = useState({ open: false, applicant: null });
  const [employerModal,  setEmployerModal]  = useState({ open: false, employer: null });
  const [ojtModal,       setOJTModal]       = useState({ open: false, record: null });
  const [detailModal,    setDetailModal]    = useState({ open: false, title: "", content: null, onEdit: null });

  // ── AUTH ────────────────────────────────────────────────
  const handleLogin  = (u) => {
    setUser(u);
    setLoggedIn(true);
    if (u.role === "Job Seeker")       setPage("jobs");
    else if (u.role === "OJT Student") setPage("internships");
    else setPage("dashboard");
    showToast("Welcome to LocalConnect!", "success");
  };
  const handleLogout = ()  => { setLoggedIn(false); setPage("dashboard"); showToast("Signed out successfully"); };

  // ── JOBS ────────────────────────────────────────────────
  const saveJob = (f) => {
    if (!f.title.trim()) { showToast("Job title is required", "error"); return; }
    if (jobModal.job) { updateJob(jobModal.job.id, f); showToast("Job listing updated", "success"); }
    else              { addJob(f);                      showToast("Job listing added!", "success"); }
    setJobModal({ open: false, job: null });
  };

  const handleDeleteJob = (id) => {
    if (!confirm("Delete this job listing?")) return;
    deleteJob(id);
    showToast("Job deleted");
  };

  const viewJob = (j) => {
    setDetailModal({
      open: true, title: j.title,
      onEdit: user.role === "Administrator"
        ? () => { setDetailModal((p) => ({ ...p, open: false })); setJobModal({ open: true, job: j }); }
        : null,
      content: (
        <>
          <DetailRow label="Employer"  value={getEmpName(j.employer_id)} />
          <DetailRow label="Industry"  value={j.industry} />
          <DetailRow label="Type"      value={j.type} />
          <DetailRow label="Salary"    value={j.salary} />
          <DetailRow label="Vacancies" value={j.vacancies} />
          <DetailRow label="Location"  value={j.location} />
          <DetailRow label="Skills"    value={j.skills} />
          <DetailRow label="Deadline"  value={j.deadline} />
          <div style={{ display: "flex", gap: 12, marginBottom: 12, fontSize: 14 }}>
            <span style={{ fontWeight: 600, color: "var(--muted)", width: 130, flexShrink: 0 }}>Status</span>
            <Badge text={j.status} />
          </div>
        </>
      ),
    });
  };

  const submitPostJob = (f) => {
    if (!f.title.trim()) { showToast("Job title is required", "error"); return; }
    addJob({ ...f, status: "draft" });
    showToast("Job submitted for admin validation!", "success");
  };

  // Job Seeker apply handler
  const handleJobSeekerApply = (data) => {
    addApplicant({ ...data, status: "pending", type: "unemployed", priority: "" });
    showToast("Application submitted! The team will contact you soon.", "success");
  };

  // OJT Student apply handler
  const handleOJTApply = (data) => {
    addOJT(data);
    showToast("OJT application submitted! Your request will be processed shortly.", "success");
  };

  // ── APPLICANTS ──────────────────────────────────────────
  const saveApplicant = (f) => {
    if (!f.name.trim()) { showToast("Name is required", "error"); return; }
    if (applicantModal.applicant) { updateApplicant(applicantModal.applicant.id, f); showToast("Applicant updated", "success"); }
    else                          { addApplicant(f);                                  showToast("Applicant added!", "success"); }
    setApplicantModal({ open: false, applicant: null });
  };

  const handleDeleteApplicant = (id) => {
    if (!confirm("Delete this applicant?")) return;
    deleteApplicant(id);
    showToast("Applicant removed");
  };

  const viewApplicant = (a) => {
    setDetailModal({
      open: true, title: a.name,
      onEdit: () => { setDetailModal((p) => ({ ...p, open: false })); setApplicantModal({ open: true, applicant: a }); },
      content: (
        <>
          <DetailRow label="Barangay"    value={a.barangay} />
          <DetailRow label="Contact"     value={a.contact} />
          <DetailRow label="Education"   value={a.education} />
          <DetailRow label="Type"        value={a.type} />
          <DetailRow label="Applied For" value={a.job_id ? getJobTitle(a.job_id) : "—"} />
          <DetailRow label="Skills"      value={a.skills} />
          {a.priority && (
            <div style={{ display: "flex", gap: 12, marginBottom: 12, fontSize: 14 }}>
              <span style={{ fontWeight: 600, color: "var(--muted)", width: 130, flexShrink: 0 }}>Priority</span>
              <span style={{ display: "inline-flex", alignItems: "center", padding: "3px 10px", borderRadius: 99, fontSize: 11, fontWeight: 600, background: "#F3EEFF", color: "#6B21A8" }}>{a.priority}</span>
            </div>
          )}
          <div style={{ display: "flex", gap: 12, marginBottom: 12, fontSize: 14 }}>
            <span style={{ fontWeight: 600, color: "var(--muted)", width: 130, flexShrink: 0 }}>Status</span>
            <Badge text={a.status} />
          </div>
        </>
      ),
    });
  };

  const handleExportCSV = () => {
    exportApplicantsCSV(db.applicants, getJobTitle);
    showToast("CSV exported!", "success");
  };

  // ── EMPLOYERS ───────────────────────────────────────────
  const saveEmployer = (f) => {
    if (!f.name.trim()) { showToast("Business name is required", "error"); return; }
    if (employerModal.employer) { updateEmployer(employerModal.employer.id, f); showToast("Employer updated", "success"); }
    else                        { addEmployer(f);                               showToast("Employer registered!", "success"); }
    setEmployerModal({ open: false, employer: null });
  };

  const handleDeleteEmployer = (id) => {
    if (!confirm("Delete this employer?")) return;
    deleteEmployer(id);
    showToast("Employer removed");
  };

  const handleValidateEmployer = (id) => {
    validateEmployer(id);
    showToast("Employer validated!", "success");
  };

  const viewEmployer = (e) => {
    const empJobs = db.jobs.filter((j) => j.employer_id == e.id);
    setDetailModal({
      open: true, title: e.name,
      onEdit: () => { setDetailModal((p) => ({ ...p, open: false })); setEmployerModal({ open: true, employer: e }); },
      content: (
        <>
          <DetailRow label="Industry"       value={e.industry} />
          <DetailRow label="Address"        value={e.address} />
          <DetailRow label="Contact"        value={e.contact} />
          <DetailRow label="Phone"          value={e.phone} />
          <DetailRow label="Open Positions" value={e.positions || 0} />
          <DetailRow label="OJT Slots"      value={e.ojt_slots || 0} />
          <div style={{ display: "flex", gap: 12, marginBottom: 12, fontSize: 14 }}>
            <span style={{ fontWeight: 600, color: "var(--muted)", width: 130, flexShrink: 0 }}>Validation</span>
            <Badge text={e.status === "verified" ? "Verified" : "Pending"} variant={e.status === "verified" ? "verified" : "pending"} />
          </div>
          {empJobs.length > 0 && (
            <>
              <div style={{ marginTop: 14, fontSize: 12, fontWeight: 600, color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".05em" }}>Active Listings</div>
              <ul style={{ marginTop: 6, paddingLeft: 18, fontSize: 13 }}>
                {empJobs.map((j) => <li key={j.id}>{j.title} ({j.status})</li>)}
              </ul>
            </>
          )}
        </>
      ),
    });
  };

  // ── OJT ─────────────────────────────────────────────────
  const saveOJT = (f) => {
    if (!f.student.trim()) { showToast("Student name is required", "error"); return; }
    if (ojtModal.record) { updateOJT(ojtModal.record.id, f); showToast("OJT record updated", "success"); }
    else                 { addOJT(f);                         showToast("OJT record added!", "success"); }
    setOJTModal({ open: false, record: null });
  };

  const handleDeleteOJT = (id) => {
    if (!confirm("Delete this OJT record?")) return;
    deleteOJT(id);
    showToast("OJT record removed");
  };

  // ── DERIVED ─────────────────────────────────────────────
  const liveJobCount        = db.jobs.filter((j) => j.status === "live").length;
  const confirmedApplicants = db.applicants.filter((a) => a.status === "confirmed");
  const confirmedOJT        = db.ojt.filter((r) => r.status === "completed" || r.status === "ongoing").slice(0, 3);

  // ── PAGE ROUTER ─────────────────────────────────────────
  const renderPage = () => {
    const isAdmin    = user.role === "Administrator";
    const isEmployer = user.role === "Business Employer";
    const isSeeker   = user.role === "Job Seeker";
    const isStudent  = user.role === "OJT Student";
    const home       = isSeeker ? "jobs" : isStudent ? "internships" : "dashboard";
    const redirect   = () => { setPage(home); return null; };

    switch (page) {
      case "dashboard":
        return <DashboardPage db={db} onNavigate={setPage} toast={showToast} user={user} />;

      case "jobs":
        return <JobsPage db={db}
          onAdd={() => setJobModal({ open: true, job: null })}
          onEdit={(j) => setJobModal({ open: true, job: j })}
          onDelete={handleDeleteJob}
          onView={viewJob}
          onApply={handleJobSeekerApply}
          user={user} />;

      case "applicants":
        if (isSeeker || isStudent) return redirect();
        return <ApplicantsPage db={db}
          onAdd={() => setApplicantModal({ open: true, applicant: null })}
          onEdit={(a) => setApplicantModal({ open: true, applicant: a })}
          onDelete={handleDeleteApplicant}
          onView={viewApplicant}
          onStatusChange={updateApplicantStatus}
          onExport={handleExportCSV}
          user={user} />;

      case "internships":
        return <InternshipsPage db={db}
          onAdd={() => setOJTModal({ open: true, record: null })}
          onEdit={(r) => setOJTModal({ open: true, record: r })}
          onDelete={handleDeleteOJT}
          onOJTApply={handleOJTApply}
          user={user} />;

      case "employers":
        if (isSeeker || isStudent || isEmployer) return redirect();
        return <EmployersPage db={db}
          onAdd={() => setEmployerModal({ open: true, employer: null })}
          onEdit={(e) => setEmployerModal({ open: true, employer: e })}
          onDelete={handleDeleteEmployer}
          onValidate={handleValidateEmployer}
          onView={viewEmployer}
          user={user} />;

      case "post-job":
        if (isSeeker || isStudent) return redirect();
        return <PostJobPage db={db} onSubmit={submitPostJob} />;

      case "reports":
        if (!isAdmin) return redirect();
        return <ReportsPage toast={showToast} />;

      case "db-schema":
        if (!isAdmin) return redirect();
        return <DBSchemaPage />;

      case "notifications":
        return <NotificationsPage user={user} db={db} confirmedApplicants={confirmedApplicants} confirmedOJT={confirmedOJT} />;

      case "settings":
        return <SettingsPage user={user} toast={showToast} />;

      default:
        return <DashboardPage db={db} onNavigate={setPage} toast={showToast} user={user} />;
    }
  };

  // ── RENDER ──────────────────────────────────────────────
  if (!loggedIn) {
    return (
      <>
        <style>{GLOBAL_CSS}</style>
        <LoginPage onLogin={handleLogin} />
        <Toast {...toast} />
      </>
    );
  }

  return (
    <>
      <style>{GLOBAL_CSS}</style>
      <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", minHeight: "100vh" }}>
        <Sidebar user={user} page={page} onNavigate={setPage} onLogout={handleLogout} liveJobCount={liveJobCount} confirmedApplicants={confirmedApplicants} confirmedOJT={confirmedOJT} db={db} />
        <main style={{ overflowY: "auto", background: "var(--bg)" }}>{renderPage()}</main>
      </div>

      {/* MODALS */}
      <JobModal
        open={jobModal.open}
        onClose={() => setJobModal({ open: false, job: null })}
        job={jobModal.job}
        employers={db.employers}
        onSave={saveJob} />
      <ApplicantModal
        open={applicantModal.open}
        onClose={() => setApplicantModal({ open: false, applicant: null })}
        applicant={applicantModal.applicant}
        jobs={db.jobs}
        onSave={saveApplicant} />
      <EmployerModal
        open={employerModal.open}
        onClose={() => setEmployerModal({ open: false, employer: null })}
        employer={employerModal.employer}
        onSave={saveEmployer} />
      <OJTModal
        open={ojtModal.open}
        onClose={() => setOJTModal({ open: false, record: null })}
        record={ojtModal.record}
        employers={db.employers}
        onSave={saveOJT} />
      <DetailModal
        open={detailModal.open}
        onClose={() => setDetailModal((p) => ({ ...p, open: false }))}
        title={detailModal.title}
        content={detailModal.content}
        onEdit={detailModal.onEdit} />

      <Toast {...toast} />
    </>
  );
}