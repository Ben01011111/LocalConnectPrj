import { useState } from "react";
import { Topbar } from "../components/layout/Topbar";
import { Btn, FormRow, FormField, Input, Toggle } from "../components/ui";

export const SettingsPage = ({ user, toast }) => {
  const [name,  setName]  = useState(user.name || "");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notifs, setNotifs] = useState({
    alerts: true, msg: true, fairs: true, automatch: false, renewal: true,
  });

  return (
    <div className="fade-up">
      <Topbar title="Settings" />
      <div style={{ padding: 28 }}>
        <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 22 }}>
          {/* Side nav */}
          <div>
            {[
              ["👤 Account", true],
              ["🔔 Notifications", false],
              ["🔒 Privacy & Data (RA 10173)", false],
              ["🔗 Integrations", false],
              ["⚙️ System", false],
            ].map(([label, active]) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 12px", borderRadius: "var(--rs)", fontSize: 13, cursor: "pointer", color: active ? "var(--accent)" : "var(--muted)", background: active ? "var(--accent-l)" : "transparent", fontWeight: active ? 600 : 400, marginBottom: 2 }}>
                {label}
              </div>
            ))}
          </div>

          {/* Main panel */}
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--r)", boxShadow: "var(--shadow)" }}>
            <div style={{ padding: "20px 26px 16px", borderBottom: "1px solid var(--border)" }}>
              <div style={{ fontFamily: "'Fraunces',serif", fontSize: 17, fontWeight: 600 }}>Account Settings</div>
            </div>
            <div style={{ padding: "22px 26px" }}>
              <FormRow>
                <FormField label="Full Name"><Input value={name} onChange={(e) => setName(e.target.value)} /></FormField>
                <FormField label="Email"><Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" /></FormField>
              </FormRow>
              <FormRow>
                <FormField label="Role"><Input value={user.role || "LGU Administrator"} readOnly style={{ background: "var(--surface2)", color: "var(--muted)" }} /></FormField>
                <FormField label="Contact Number"><Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="09XXXXXXXXX" /></FormField>
              </FormRow>

              <div style={{ borderTop: "1px solid var(--border)", paddingTop: 20, marginTop: 8 }}>
                <div style={{ fontFamily: "'Fraunces',serif", fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Notification Preferences</div>
                {[
                  ["alerts",  "New Application Alerts",         "Get notified when a job seeker applies"],
                  ["msg",     "In-app Messaging",                "Enable messaging between job seekers and employers"],
                  ["fairs",   "Job Fair Announcements",          "Notify users about upcoming job fairs & events"],
                  ["automatch","Auto-match Recommendations",     "Preference-based resume upload matching engine"],
                  ["renewal", "Account Expiry Renewal Reminders","Barangay-based account renewal notifications"],
                ].map(([key, title, desc], i, arr) => (
                  <div key={key} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 0", borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none" }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 500 }}>{title}</div>
                      <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>{desc}</div>
                    </div>
                    <Toggle on={notifs[key]} onChange={(v) => setNotifs((p) => ({ ...p, [key]: v }))} />
                  </div>
                ))}
              </div>
            </div>

            <div style={{ padding: "14px 26px", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "flex-end", gap: 10 }}>
              <Btn variant="secondary">Cancel</Btn>
              <Btn variant="primary" onClick={() => toast("Settings saved successfully!", "success")}>Save Changes</Btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
