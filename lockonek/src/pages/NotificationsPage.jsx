import { Topbar } from "../components/layout/Topbar";

const STATUS_COLORS = {
  confirmed: { bg: "#DCFCE7", color: "#166534", border: "#86EFAC" },
  ongoing:   { bg: "#DBEAFE", color: "#1E40AF", border: "#93C5FD" },
  completed: { bg: "#F3F4F6", color: "#374151", border: "#D1D5DB" },
};

const NotifCard = ({ icon, title, body, meta, tag, tagStyle, unread }) => (
  <div style={{
    background: unread ? "#F0FDF4" : "#fff",
    border: `1.5px solid ${unread ? "#86EFAC" : "var(--border)"}`,
    borderRadius: 14,
    padding: "18px 20px",
    display: "flex",
    gap: 16,
    alignItems: "flex-start",
    transition: "box-shadow .15s",
  }}>
    {/* Icon circle */}
    <div style={{ width: 48, height: 48, borderRadius: "50%", background: unread ? "#DCFCE7" : "var(--surface2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>
      {icon}
    </div>

    {/* Content */}
    <div style={{ flex: 1 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
        <span style={{ fontSize: 15, fontWeight: 700, fontFamily: "'Fraunces',serif" }}>{title}</span>
        {unread && <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#16A34A", display: "inline-block", flexShrink: 0 }} />}
      </div>
      <p style={{ fontSize: 13, color: "var(--muted)", margin: 0, lineHeight: 1.6 }}>{body}</p>
      {meta && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 10 }}>
          {meta.map(([k, v]) => (
            <div key={k} style={{ background: "var(--bg)", borderRadius: 8, padding: "6px 12px", fontSize: 12 }}>
              <span style={{ color: "var(--muted)", marginRight: 4 }}>{k}</span>
              <span style={{ fontWeight: 600 }}>{v}</span>
            </div>
          ))}
        </div>
      )}
      {tag && (
        <span style={{ display: "inline-block", marginTop: 10, padding: "4px 12px", borderRadius: 99, fontSize: 11, fontWeight: 700, ...tagStyle }}>
          {tag}
        </span>
      )}
    </div>
  </div>
);

export const NotificationsPage = ({ user, db, confirmedApplicants = [], confirmedOJT = [] }) => {
  const isSeeker  = user?.role === "Job Seeker";
  const isStudent = user?.role === "OJT Student";

  const seekerNotifs = confirmedApplicants.map((a) => {
    const job = db?.jobs?.find((j) => j.id == a.job_id);
    const emp = db?.employers?.find((e) => e.id == job?.employer_id);
    return {
      icon: "✅",
      title: "Application Confirmed!",
      body: `Great news! Your application for "${job?.title || "a position"}" at ${emp?.name || "the employer"} has been confirmed. Please coordinate with the employer for the next steps and bring your required documents.`,
      meta: [
        ["📋 Position", job?.title || "—"],
        ["🏢 Employer", emp?.name || "—"],
        ["📍 Location", job?.location || "—"],
        ["💰 Salary", job?.salary || "—"],
      ],
      tag: "✅ Confirmed",
      tagStyle: { background: "#DCFCE7", color: "#166534" },
      unread: true,
    };
  });

  const studentNotifs = confirmedOJT.map((r) => {
    const emp  = db?.employers?.find((e) => e.id == r.employer_id);
    const sc   = STATUS_COLORS[r.status] || STATUS_COLORS.ongoing;
    const isOngoing   = r.status === "ongoing";
    const isCompleted = r.status === "completed";
    return {
      icon: isCompleted ? "🏅" : "🎓",
      title: isOngoing ? "OJT Slot Confirmed!" : isCompleted ? "OJT Completed!" : "OJT Application Received",
      body: isOngoing
        ? `Your OJT at ${emp?.name || "the establishment"} is confirmed and currently ongoing. Remember to log your daily hours and bring your school endorsement letter.`
        : isCompleted
          ? `Congratulations! You have successfully completed your OJT at ${emp?.name || "the establishment"}. Please coordinate with your school for the submission of your completion documents.`
          : `Your OJT application at ${emp?.name || "the establishment"} has been received and is pending review.`,
      meta: [
        ["🏢 Establishment", emp?.name || "—"],
        ["📚 Program", r.type === "shs" ? "SHS Work Immersion" : "College OJT"],
        r.type === "shs"
          ? ["🏷 Strand", r.strand || "—"]
          : ["🎓 Degree", r.degree || "—"],
        r.type === "shs"
          ? ["📅 Progress", `${r.comp_days || 0} / ${r.req_days || 40} days`]
          : ["⏱ Progress", ` ${r.req_hours || 480} hours`],
      ],
      tag: isOngoing ? "● Ongoing" : isCompleted ? "✓ Completed" : "⏳ Pending",
      tagStyle: { background: sc.bg, color: sc.color, border: `1px solid ${sc.border}` },
      unread: isOngoing,
    };
  });

  const notifications = isSeeker ? seekerNotifs : isStudent ? studentNotifs : [];
  const unreadCount   = notifications.filter((n) => n.unread).length;

  return (
    <div className="fade-up">
      <Topbar title="Notifications">
        {unreadCount > 0 && (
          <span style={{ padding: "5px 14px", borderRadius: 99, background: "#DCFCE7", color: "#166534", fontSize: 12, fontWeight: 700 }}>
            {unreadCount} new
          </span>
        )}
      </Topbar>

      <div style={{ padding: 28 }}>
        {/* Summary banner */}
        {unreadCount > 0 && (
          <div style={{ background: "linear-gradient(135deg, #16A34A 0%, #15803D 100%)", borderRadius: 14, padding: "20px 24px", marginBottom: 24, color: "#fff", display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ fontSize: 36 }}>{isSeeker ? "🎉" : "🎓"}</div>
            <div>
              <div style={{ fontSize: 17, fontWeight: 700, fontFamily: "'Fraunces',serif", marginBottom: 4 }}>
                {isSeeker
                  ? `${unreadCount} Application${unreadCount > 1 ? "s" : ""} Confirmed!`
                  : `${unreadCount} OJT Slot${unreadCount > 1 ? "s" : ""} Active!`}
              </div>
              <div style={{ fontSize: 13, opacity: .9, lineHeight: 1.5 }}>
                {isSeeker
                  ? "Your application has been reviewed and approved. Check the details below and prepare your documents."
                  : "Your OJT placement is confirmed. Stay on track with your required hours and days."}
              </div>
            </div>
          </div>
        )}

        {notifications.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 20px" }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>🔔</div>
            <div style={{ fontSize: 18, fontWeight: 700, fontFamily: "'Fraunces',serif", marginBottom: 8 }}>No notifications yet</div>
            <div style={{ fontSize: 13, color: "var(--muted)", maxWidth: 320, margin: "0 auto", lineHeight: 1.6 }}>
              {isSeeker
                ? "Once your job application is confirmed by the employer, it will appear here."
                : "Once your OJT slot is confirmed or updated, it will appear here."}
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {notifications.map((n, i) => (
              <NotifCard key={i} {...n} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};