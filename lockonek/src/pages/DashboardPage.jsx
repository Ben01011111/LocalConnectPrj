import { Topbar } from "../components/layout/Topbar";
import { Btn, StatCard, ChartBar, ActionBtn, DetailRow } from "../components/ui";
import { Badge } from "../components/ui";
import { Card, CardHeader, CardBody } from "../components/ui/Card";
import { SectionTitle } from "../components/ui";
import { Table, TR, TD } from "../components/ui/Table";

export const DashboardPage = ({ db, onNavigate, toast, user }) => {
  const isAdmin    = user?.role === "Administrator";
  const isEmployer = user?.role === "Business Employer";
  const isSeeker   = user?.role === "Job Seeker";
  const isStudent  = user?.role === "OJT Student";

  const recent     = [...db.applicants].slice(-5).reverse();
  const prios      = db.applicants.filter((a) => a.priority);
  const liveJobs   = db.jobs.filter((j) => j.status === "live");
  const activeOJT  = db.ojt.filter((r) => r.status === "ongoing");
  const doneOJT    = db.ojt.filter((r) => r.status === "completed");

  const getJobTitle = (id) => db.jobs.find((j) => j.id == id)?.title || "—";
  const getEmpName  = (id) => db.employers.find((e) => e.id == id)?.name || "—";

  const welcomeMsg = {
    "Administrator": "Here's today's employment summary",
    "Business Employer": "Manage your job listings and applicants",
    "Job Seeker":        "Find your next opportunity",
    "OJT Student":       "Track your internship progress",
  }[user?.role] || "Welcome back";

  // ── Progress bar helper ──
  const ProgressBar = ({ comp, req, color = "var(--accent)" }) => {
    const pct = req > 0 ? Math.min(100, Math.round((comp / req) * 100)) : 0;
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--muted)", marginBottom: 4 }}>
          <span>{comp} / {req}</span>
          <span style={{ fontWeight: 600, color: pct >= 100 ? "#16A34A" : color }}>{pct}%</span>
        </div>
        <div style={{ height: 8, background: "var(--surface2)", borderRadius: 99, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${pct}%`, background: pct >= 100 ? "#16A34A" : color, borderRadius: 99, transition: "width .4s ease" }} />
        </div>
      </div>
    );
  };

  // ════════════════════════════════════════
  //  OJT STUDENT DASHBOARD
  // ════════════════════════════════════════
  if (isStudent) {
    const myRecords = db.ojt; // in real app, filter by student user id
    const collegeRecords = myRecords.filter((r) => r.type === "college_ojt");
    const shsRecords     = myRecords.filter((r) => r.type === "shs");

    return (
      <div className="fade-up">
        <Topbar title="OJT Dashboard" subtitle="Track your internship & work immersion progress">
          <Btn variant="primary" onClick={() => onNavigate("internships")}>🏢 Apply to Establishment</Btn>
        </Topbar>

        <div style={{ padding: 28 }}>
          {/* Stats row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 18, marginBottom: 24 }}>
            <div className="fade-up-1">
              <StatCard icon="🎓" value={activeOJT.length || "0"} label="Active OJT Programs" color="blue" />
            </div>
            <div className="fade-up-2">
              <StatCard icon="✅" value={doneOJT.length || "0"} label="Completed Programs" color="green" />
            </div>
            <div className="fade-up-3">
              <StatCard icon="🏢" value={db.employers.filter(e => e.status === "verified").length || "0"} label="Verified Establishments" color="amber" />
            </div>
            <div className="fade-up-4">
              <StatCard icon="⏳" value={db.ojt.filter(r => r.status === "pending").length || "0"} label="Pending Applications" color="purple" />
            </div>
          </div>

          {/* OJT Progress Cards */}
          {myRecords.length > 0 && (
            <div style={{ marginBottom: 18 }}>
              <div style={{ fontSize: 11, fontWeight: 600, marginBottom: 12, color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".06em" }}>My OJT Records</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
                {myRecords.map((r) => {
                  const isCollege = r.type === "college_ojt";
                  const comp = isCollege ? r.comp_hours : r.comp_days;
                  const req  = isCollege ? r.req_hours  : r.req_days;
                  const pct  = req > 0 ? Math.min(100, Math.round((comp / req) * 100)) : 0;
                  const statusColor = r.status === "completed" ? "#16A34A" : r.status === "ongoing" ? "var(--accent)" : "#F59E0B";

                  return (
                    <Card key={r.id} style={{ padding: 18 }}>
                      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 10 }}>
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 700 }}>{getEmpName(r.employer_id)}</div>
                          <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>
                            {isCollege ? `📚 ${r.degree || "College OJT"}` : `📖 SHS – ${r.strand || "Work Immersion"}`}
                          </div>
                        </div>
                        <span style={{ padding: "3px 10px", borderRadius: 99, fontSize: 11, fontWeight: 600, background: r.status === "completed" ? "#DCFCE7" : r.status === "ongoing" ? "var(--accent-l)" : "#FEF9C3", color: statusColor, flexShrink: 0 }}>
                          {r.status}
                        </span>
                      </div>

                      <div style={{ marginBottom: 8 }}>
                        <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 6 }}>
                          {isCollege ? "Hours Completed" : "Days Completed"}
                        </div>
                        <ProgressBar comp={comp} req={req} />
                      </div>

                      {pct >= 100 && (
                        <div style={{ background: "#DCFCE7", borderRadius: 7, padding: "7px 12px", fontSize: 12, color: "#166534", fontWeight: 600, textAlign: "center" }}>
                          🎉 Congratulations! Requirements completed.
                        </div>
                      )}
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
            {/* Available Establishments */}
            <Card>
              <CardHeader>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <SectionTitle>Available Establishments</SectionTitle>
                  <button onClick={() => onNavigate("internships")} style={{ fontSize: 12, color: "var(--accent)", background: "none", border: "none", cursor: "pointer", fontWeight: 500 }}>Apply →</button>
                </div>
              </CardHeader>
              <Table headers={["Establishment", "Industry", "OJT Slots"]} isEmpty={db.employers.length === 0} empty="No establishments listed">
                {db.employers.filter(e => e.status === "verified").slice(0, 5).map((e) => (
                  <TR key={e.id}>
                    <TD>
                      <strong>{e.name}</strong>
                      <br /><small style={{ color: "var(--muted)" }}>{e.address}</small>
                    </TD>
                    <TD>{e.industry}</TD>
                    <TD style={{ textAlign: "center" }}>
                      <span style={{ background: "var(--accent-l)", color: "var(--accent)", padding: "2px 10px", borderRadius: 99, fontSize: 12, fontWeight: 600 }}>
                        {e.ojt_slots}
                      </span>
                    </TD>
                  </TR>
                ))}
              </Table>
            </Card>

            {/* OJT Requirements Info */}
            <Card>
              <CardHeader><SectionTitle>OJT Requirements Guide</SectionTitle></CardHeader>
              <CardBody>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {[
                    { icon: "🎓", title: "College OJT", desc: "Minimum 480 hours (varies by course). Required: MOA, endorsement letter, daily time record, narrative report.", color: "#EFF6FF", border: "#BFDBFE", text: "#1D4ED8" },
                    { icon: "📚", title: "SHS Work Immersion", desc: "Minimum 40 days as per DepEd Order. Required: parental consent, student insurance, weekly accomplishment report.", color: "#F0FDF4", border: "#BBF7D0", text: "#166534" },
                    { icon: "📋", title: "Documents Needed", desc: "School ID, barangay clearance, medical certificate, 2x2 photos, resume, endorsement from school.", color: "#FFFBEB", border: "#FDE68A", text: "#92400E" },
                  ].map((item) => (
                    <div key={item.title} style={{ background: item.color, border: `1px solid ${item.border}`, borderRadius: 9, padding: "12px 14px" }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: item.text, marginBottom: 4 }}>{item.icon} {item.title}</div>
                      <div style={{ fontSize: 12, color: item.text, opacity: .85, lineHeight: 1.5 }}>{item.desc}</div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // ════════════════════════════════════════
  //  JOB SEEKER DASHBOARD  (redirect — seeker lands on jobs page directly)
  // ════════════════════════════════════════
  if (isSeeker) {
    return (
      <div className="fade-up">
        <Topbar title="Job Board" subtitle="Find your next opportunity">
          <Btn variant="primary" onClick={() => onNavigate("jobs")}>🔍 Browse All Jobs</Btn>
        </Topbar>
        <div style={{ padding: 28 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18, marginBottom: 24 }}>
            <div className="fade-up-1"><StatCard icon="💼" value={liveJobs.length || "0"} label="Open Jobs Available" color="blue" /></div>
            <div className="fade-up-2"><StatCard icon="🏢" value={db.employers.filter(e => e.status === "verified").length || "0"} label="Verified Employers" color="amber" /></div>
            <div className="fade-up-3"><StatCard icon="✅" value={db.applicants.filter(a => a.status === "confirmed").length || "0"} label="Confirmed Placements" color="green" /></div>
          </div>
          <Card>
            <CardHeader>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <SectionTitle>Latest Job Openings</SectionTitle>
                <button onClick={() => onNavigate("jobs")} style={{ fontSize: 12, color: "var(--accent)", background: "none", border: "none", cursor: "pointer", fontWeight: 500 }}>Browse all →</button>
              </div>
            </CardHeader>
            <Table headers={["Job Title", "Employer", "Salary", "Deadline"]} isEmpty={liveJobs.length === 0} empty="No open jobs yet">
              {liveJobs.slice(0, 5).map((j) => (
                <TR key={j.id}>
                  <TD><strong>{j.title}</strong><br /><small style={{ color: "var(--muted)" }}>{j.industry}</small></TD>
                  <TD>{getEmpName(j.employer_id)}</TD>
                  <TD>{j.salary || "TBD"}</TD>
                  <TD>{j.deadline || "Open"}</TD>
                </TR>
              ))}
            </Table>
          </Card>
        </div>
      </div>
    );
  }

  // ════════════════════════════════════════
  //  EMPLOYER DASHBOARD
  // ════════════════════════════════════════
  if (isEmployer) {
    return (
      <div className="fade-up">
        <Topbar title="Dashboard" subtitle={welcomeMsg}>
          <Btn variant="primary" onClick={() => onNavigate("post-job")}>+ Post Job</Btn>
        </Topbar>
        <div style={{ padding: 28 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 18, marginBottom: 24 }}>
            <div className="fade-up-1"><StatCard icon="💼" value={liveJobs.length || "0"} label="Live Job Listings" trend="+2" trendDir="up" color="blue" /></div>
            <div className="fade-up-2"><StatCard icon="👥" value={db.applicants.length || "0"} label="Total Applicants" trend="+5" trendDir="up" color="green" /></div>
            <div className="fade-up-3"><StatCard icon="✅" value={db.applicants.filter(a => a.status === "confirmed").length || "0"} label="Confirmed Hires" color="amber" /></div>
            <div className="fade-up-4"><StatCard icon="⏳" value={db.applicants.filter(a => a.status === "pending").length || "0"} label="Pending Review" color="purple" /></div>
          </div>
          <Card>
            <CardHeader>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <SectionTitle>Recent Applicants</SectionTitle>
                <button onClick={() => onNavigate("applicants")} style={{ fontSize: 12, color: "var(--accent)", background: "none", border: "none", cursor: "pointer", fontWeight: 500 }}>View all →</button>
              </div>
            </CardHeader>
            <Table headers={["Name", "Applied For", "Status"]} isEmpty={recent.length === 0} empty="No applicants yet">
              {recent.map((a) => (
                <TR key={a.id}>
                  <TD><strong>{a.name}</strong><br /><small style={{ color: "var(--muted)" }}>{a.barangay || "—"}</small></TD>
                  <TD>{a.job_id ? getJobTitle(a.job_id) : "—"}</TD>
                  <TD><Badge text={a.status} /></TD>
                </TR>
              ))}
            </Table>
          </Card>
        </div>
      </div>
    );
  }

  // ════════════════════════════════════════
  //  ADMIN DASHBOARD (default)
  // ════════════════════════════════════════
  return (
    <div className="fade-up">
      <Topbar title="Dashboard" subtitle={welcomeMsg}>
        <Btn onClick={() => toast("Report exported to PDF")}>📥 Export</Btn>
        <Btn variant="primary" onClick={() => onNavigate("post-job")}>+ Post Job</Btn>
      </Topbar>

      <div style={{ padding: 28 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 18, marginBottom: 24 }}>
          <div className="fade-up-1"><StatCard icon="👥" value={db.applicants.length || "0"} label="Total Applicants" trend="+12%" trendDir="up" color="green" /></div>
          <div className="fade-up-2"><StatCard icon="💼" value={db.employers.length || "0"} label="Active Employers" trend="+5%" trendDir="up" color="amber" /></div>
          <div className="fade-up-3"><StatCard icon="📋" value={liveJobs.length || "0"} label="Open Job Listings" trend="+18%" trendDir="up" color="blue" /></div>
          <div className="fade-up-4"><StatCard icon="🎓" value={activeOJT.length || "0"} label="Active OJT Slots" trend="-3%" trendDir="down" color="purple" /></div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 18 }}>
          <Card>
            <CardHeader>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <SectionTitle>Recent Applications</SectionTitle>
                <button onClick={() => onNavigate("applicants")} style={{ fontSize: 12, color: "var(--accent)", background: "none", border: "none", cursor: "pointer", fontWeight: 500 }}>View all →</button>
              </div>
            </CardHeader>
            <Table headers={["Applicant", "Position", "Status"]} isEmpty={recent.length === 0} empty="No recent applications">
              {recent.map((a) => (
                <TR key={a.id}>
                  <TD><strong>{a.name}</strong><br /><small style={{ color: "var(--muted)" }}>{a.barangay || "—"}</small></TD>
                  <TD>{a.job_id ? getJobTitle(a.job_id) : "—"}</TD>
                  <TD><Badge text={a.status} /></TD>
                </TR>
              ))}
            </Table>
          </Card>

          <Card>
            <CardHeader><SectionTitle>Job Seekers by Category</SectionTitle></CardHeader>
            <CardBody>
              {[
                ["Underemployed",        78, 421],
                ["Fresh Graduate",       55, 298, "#C8873A"],
                ["OFW (Returning)",      30, 162, "#2563EB"],
                ["PWD",                  18,  96, "#8B5CF6"],
                ["OSY",                  12,  65, "#EC4899"],
                ["SHS (Work Immersion)", 40, 206, "#F59E0B"],
              ].map(([l, p, v, c]) => <ChartBar key={l} label={l} pct={p} value={v} color={c} />)}
            </CardBody>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <SectionTitle>Priority Beneficiaries</SectionTitle>
              <span style={{ fontSize: 12, color: "var(--muted)" }}>RA 8972 & 4Ps / DSWD Pantawid Pamilya</span>
            </div>
          </CardHeader>
          <Table headers={["Name", "Category", "Barangay", "Status", "Action"]} isEmpty={prios.length === 0} empty="No priority beneficiaries registered yet">
            {prios.map((a) => (
              <TR key={a.id}>
                <TD>{a.name}</TD>
                <TD><span style={{ display: "inline-flex", alignItems: "center", padding: "3px 10px", borderRadius: 99, fontSize: 11, fontWeight: 600, background: "#F3EEFF", color: "#6B21A8" }}>{a.priority}</span></TD>
                <TD>{a.barangay || "—"}</TD>
                <TD><Badge text={a.status} /></TD>
                <TD><ActionBtn variant="green" onClick={() => toast("Profile opened")}>View</ActionBtn></TD>
              </TR>
            ))}
          </Table>
        </Card>
      </div>
    </div>
  );
};