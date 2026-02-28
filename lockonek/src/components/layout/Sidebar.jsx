import { NAV } from "../../constants";

const ALLOWED_PAGES = {
  "Administrator":     ["dashboard","jobs","applicants","internships","employers","post-job","reports","db-schema","settings"],
  "Business Employer": ["dashboard","jobs","applicants","post-job","internships","settings"],
  "Job Seeker":        ["jobs","notifications","settings"],
  "OJT Student":       ["internships","notifications","settings"],
};

const ROLE_HOME = {
  "Administrator":     "dashboard",
  "Business Employer": "dashboard",
  "Job Seeker":        "jobs",
  "OJT Student":       "internships",
};

// ── Notification Panel ────────────────────────────────────
const NotificationPanel = ({ notifications, onClose }) => (
  <div style={{ position: "fixed", inset: 0, zIndex: 2000 }} onClick={onClose}>
    <div
      onClick={(e) => e.stopPropagation()}
      style={{ position: "absolute", left: 270, top: 60, width: 320, background: "#fff", borderRadius: 14, boxShadow: "0 16px 48px rgba(0,0,0,.18)", border: "1px solid var(--border)", overflow: "hidden" }}>

      <div style={{ padding: "14px 18px 10px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 14, fontWeight: 700, fontFamily: "'Fraunces',serif" }}>Notifications</span>
        <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer", color: "var(--muted)", lineHeight: 1 }}>×</button>
      </div>

      {notifications.length === 0 ? (
        <div style={{ padding: "28px 18px", textAlign: "center", color: "var(--muted)", fontSize: 13 }}>
          🔔 No notifications yet
        </div>
      ) : (
        <div style={{ maxHeight: 340, overflowY: "auto" }}>
          {notifications.map((n, i) => (
            <div key={i} style={{ padding: "12px 18px", borderBottom: "1px solid var(--border)", display: "flex", gap: 12, alignItems: "flex-start", background: n.unread ? "#F0FDF4" : "#fff" }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: n.unread ? "#DCFCE7" : "var(--surface2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>
                {n.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.3 }}>{n.title}</div>
                <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2, lineHeight: 1.4 }}>{n.body}</div>
              </div>
              {n.unread && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#16A34A", flexShrink: 0, marginTop: 4 }} />}
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

// ── Main Sidebar ──────────────────────────────────────────
export const Sidebar = ({ user, page, onNavigate, onLogout, liveJobCount, confirmedApplicants = [], confirmedOJT = [], db }) => {
  const allowed    = ALLOWED_PAGES[user.role] || ALLOWED_PAGES["Administrator"];
  const visibleNav = NAV.filter((n) => allowed.includes(n.id));
  const groups     = [...new Set(visibleNav.map((n) => n.group))];
  const home       = ROLE_HOME[user.role] || "dashboard";

  if (!allowed.includes(page)) onNavigate(home);

  const isSeeker  = user.role === "Job Seeker";
  const isStudent = user.role === "OJT Student";

  const unreadCount = isSeeker
    ? confirmedApplicants.length
    : isStudent
      ? confirmedOJT.filter((r) => r.status === "ongoing").length
      : 0;

  return (
    <aside style={{
      background: "var(--surface)", borderRight: "1px solid var(--border)",
      display: "flex", flexDirection: "column", position: "sticky", top: 0,
      height: "100vh", overflowY: "auto", width: 260, flexShrink: 0,
    }}>
      {/* Logo */}
      <div style={{ padding: "22px 22px 18px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>🌱</div>
        <div style={{ fontFamily: "'Fraunces',serif", fontSize: 17, fontWeight: 700, lineHeight: 1.1 }}>
          LocalConnect
          <span style={{ display: "block", fontSize: 10, fontWeight: 400, fontFamily: "'DM Sans',sans-serif", color: "var(--muted)" }}>Employment Platform</span>
        </div>
      </div>

      {/* User chip */}
      <div style={{ margin: "14px 14px 4px", padding: "11px 12px", background: "var(--bg)", borderRadius: "var(--rs)", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 34, height: 34, borderRadius: "50%", background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: "#fff", fontWeight: 700, flexShrink: 0 }}>
          {(user.name || "A")[0]}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.name}</div>
          <div style={{ fontSize: 11, color: "var(--muted)" }}>{user.role}</div>
        </div>
      </div>

      {/* Inline alert banner for unread notifications */}
      {(isSeeker || isStudent) && unreadCount > 0 && (
        <div
          onClick={() => onNavigate("notifications")}
          style={{ margin: "6px 14px 0", padding: "10px 12px", background: "#F0FDF4", border: "1.5px solid #86EFAC", borderRadius: 10, cursor: "pointer", transition: "opacity .15s" }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = ".85"}
          onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#16A34A", marginBottom: 2 }}>
            {isSeeker ? "🎉 Application Update!" : "🎓 OJT Update!"}
          </div>
          <div style={{ fontSize: 11, color: "#166534", lineHeight: 1.4 }}>
            {isSeeker
              ? `${unreadCount} application${unreadCount > 1 ? "s" : ""} confirmed — tap to view.`
              : `${unreadCount} OJT slot${unreadCount > 1 ? "s" : ""} active — tap to view.`}
          </div>
        </div>
      )}

      {/* Nav */}
      <nav style={{ padding: "6px 10px", flex: 1 }}>
        {groups.map((g) => (
          <div key={g}>
            <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: ".1em", color: "var(--muted)", padding: "10px 10px 5px", fontWeight: 600 }}>{g}</div>
            {visibleNav.filter((n) => n.group === g).map((n) => (
              <button key={n.id} onClick={() => onNavigate(n.id)}
                style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 11px", borderRadius: "var(--rs)", cursor: "pointer", fontSize: 13, fontWeight: n.id === page ? 600 : 400, color: n.id === page ? "var(--accent)" : "var(--muted)", background: n.id === page ? "var(--accent-l)" : "transparent", border: "none", width: "100%", textAlign: "left", marginBottom: 2, transition: "all .15s" }}
                onMouseEnter={(e) => { if (n.id !== page) { e.currentTarget.style.background = "var(--bg)"; e.currentTarget.style.color = "var(--text)"; } }}
                onMouseLeave={(e) => { if (n.id !== page) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--muted)"; } }}>
                <span style={{ fontSize: 15, flexShrink: 0 }}>{n.icon}</span>
                {n.label}
                {n.badge && liveJobCount > 0 && (
                  <span style={{ marginLeft: "auto", background: "var(--accent)", color: "#fff", borderRadius: 99, fontSize: 10, fontWeight: 600, padding: "2px 7px" }}>{liveJobCount}</span>
                )}
                {n.notifBadge && unreadCount > 0 && (
                  <span style={{ marginLeft: "auto", background: "#DC2626", color: "#fff", borderRadius: 99, fontSize: 10, fontWeight: 600, padding: "2px 7px" }}>{unreadCount}</span>
                )}
              </button>
            ))}
          </div>
        ))}
      </nav>

      {/* Sign out */}
      <div style={{ padding: 14, borderTop: "1px solid var(--border)" }}>
        <button onClick={onLogout}
          style={{ width: "100%", padding: 10, background: "none", border: "1.5px solid var(--border)", borderRadius: "var(--rs)", fontSize: 13, color: "var(--muted)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "all .15s", fontFamily: "'DM Sans',sans-serif" }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--danger)"; e.currentTarget.style.color = "var(--danger)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--muted)"; }}>
          🚪 Sign Out
        </button>
      </div>
    </aside>
  );
};