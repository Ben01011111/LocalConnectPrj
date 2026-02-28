import { useState } from "react";
import { Topbar } from "../components/layout/Topbar";
import { Card, CardHeader, CardBody } from "../components/ui/Card";
import { SectionTitle } from "../components/ui";

const TABLES = [
  { name: "📋 users", fields: ["🔑 user_id INT PK", "full_name VARCHAR(100)", "email VARCHAR(100) UNIQUE", "password_hash VARCHAR(255)", "role ENUM('admin','employer','job_seeker','student')", "barangay VARCHAR(80)", "contact_no VARCHAR(20)", "created_at TIMESTAMP"] },
  { name: "💼 job_listings", fields: ["🔑 job_id INT PK", "🔗 employer_id INT FK", "job_title VARCHAR(150)", "industry VARCHAR(80)", "employment_type ENUM(...)", "salary VARCHAR(60)", "vacancies INT", "skill_tags_hard TEXT", "status ENUM('draft','live','closed')", "deadline DATE"] },
  { name: "👤 job_seekers", fields: ["🔑 seeker_id INT PK", "🔗 user_id INT FK", "seeker_type ENUM(...)", "education_level ENUM(...)", "priority_flag BOOLEAN", "priority_category VARCHAR(80)", "resume_path VARCHAR(255)"] },
  { name: "📬 applications", fields: ["🔑 app_id INT PK", "🔗 seeker_id INT FK", "🔗 job_id INT FK", "status ENUM('pending','matched','endorsed','confirmed','declined')", "applied_at TIMESTAMP", "notes TEXT"] },
  { name: "🏢 employers", fields: ["🔑 employer_id INT PK", "🔗 user_id INT FK", "business_name VARCHAR(150)", "industry VARCHAR(80)", "address TEXT", "is_validated BOOLEAN", "validated_at TIMESTAMP"] },
  { name: "🎓 ojt_records", fields: ["🔑 ojt_id INT PK", "🔗 seeker_id INT FK", "🔗 employer_id INT FK", "program_type ENUM('college_ojt','shs_work_immersion')", "required_hours INT", "completed_hours INT", "status ENUM('pending','ongoing','completed')"] },
];

const CREATE_SQL = `-- LocalConnect Database Schema
-- RA 10173 (Data Privacy Act 2012) Compliant

CREATE DATABASE IF NOT EXISTS localconnect_db
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE users (
  user_id      INT AUTO_INCREMENT PRIMARY KEY,
  full_name    VARCHAR(100) NOT NULL,
  email        VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role         ENUM('admin','employer','job_seeker','student') NOT NULL,
  barangay     VARCHAR(80),
  contact_no   VARCHAR(20),
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE employers (
  employer_id   INT AUTO_INCREMENT PRIMARY KEY,
  user_id       INT NOT NULL,
  business_name VARCHAR(150) NOT NULL,
  industry      VARCHAR(80),
  address       TEXT,
  is_validated  BOOLEAN DEFAULT FALSE,
  validated_at  TIMESTAMP,
  validated_by  INT,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE job_listings (
  job_id          INT AUTO_INCREMENT PRIMARY KEY,
  employer_id     INT NOT NULL,
  job_title       VARCHAR(150),
  industry        VARCHAR(80),
  employment_type ENUM('regular','fixed_term','flexible','seasonal','volunteer','livelihood'),
  salary          VARCHAR(60),
  vacancies       INT DEFAULT 1,
  skill_tags_hard TEXT,
  status          ENUM('draft','live','closed') DEFAULT 'draft',
  deadline        DATE,
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (employer_id) REFERENCES employers(employer_id)
);

CREATE TABLE job_seekers (
  seeker_id         INT AUTO_INCREMENT PRIMARY KEY,
  user_id           INT NOT NULL,
  seeker_type       ENUM('unemployed','underemployed','osy','ofw_return','pwd','solo_parent','ip','kabataan'),
  education_level   ENUM('elementary','high_school','vocational','college'),
  priority_flag     BOOLEAN DEFAULT FALSE,
  priority_category VARCHAR(80),
  resume_path       VARCHAR(255),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE applications (
  app_id      INT AUTO_INCREMENT PRIMARY KEY,
  seeker_id   INT NOT NULL,
  job_id      INT NOT NULL,
  status      ENUM('pending','matched','endorsed','confirmed','declined') DEFAULT 'pending',
  applied_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  notes       TEXT,
  FOREIGN KEY (seeker_id) REFERENCES job_seekers(seeker_id),
  FOREIGN KEY (job_id)    REFERENCES job_listings(job_id)
);

CREATE TABLE ojt_records (
  ojt_id              INT AUTO_INCREMENT PRIMARY KEY,
  seeker_id           INT NOT NULL,
  employer_id         INT NOT NULL,
  program_type        ENUM('college_ojt','shs_work_immersion'),
  degree_program      VARCHAR(100),
  required_hours      INT,
  completed_hours     INT DEFAULT 0,
  status              ENUM('pending','ongoing','completed') DEFAULT 'pending',
  deped_ched_compliant BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (seeker_id)   REFERENCES job_seekers(seeker_id),
  FOREIGN KEY (employer_id) REFERENCES employers(employer_id)
);`;

export const DBSchemaPage = () => {
  const [tab, setTab] = useState("erd");

  return (
    <div className="fade-up">
      <Topbar title="Database Schema & SQL Scripts" />
      <div style={{ padding: 28 }}>
        <div style={{ background: "var(--surface2)", borderRadius: "var(--rs)", padding: "14px 18px", fontSize: 13, color: "var(--muted)", marginBottom: 20 }}>
          📐 <strong style={{ color: "var(--text)" }}>Tech Stack:</strong> PHP / MySQL | Web-based, mobile-responsive | Compliant with Republic Act 10173 (Data Privacy Act of 2012)
        </div>

        <div style={{ display: "flex", gap: 4, borderBottom: "2px solid var(--border)", marginBottom: 22 }}>
          {[["erd", "ERD Overview"], ["sql", "CREATE Scripts"]].map(([id, label]) => (
            <button key={id} onClick={() => setTab(id)}
              style={{ padding: "9px 18px", fontSize: 13, fontWeight: tab === id ? 600 : 500, cursor: "pointer", color: tab === id ? "var(--accent)" : "var(--muted)", background: "none", border: "none", borderBottom: `2px solid ${tab === id ? "var(--accent)" : "transparent"}`, marginBottom: -2, transition: "all .15s", fontFamily: "'DM Sans',sans-serif" }}>
              {label}
            </button>
          ))}
        </div>

        {tab === "erd" ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
            {TABLES.map((t) => (
              <Card key={t.name}>
                <CardHeader><SectionTitle>{t.name}</SectionTitle></CardHeader>
                <CardBody style={{ fontSize: 12, lineHeight: 1.9, color: "var(--muted)" }}>
                  {t.fields.map((f, i) => (
                    <div key={i} style={{ color: f.startsWith("🔑") ? "var(--accent)" : f.startsWith("🔗") ? "var(--amber)" : "var(--muted)", fontWeight: f.startsWith("🔑") || f.startsWith("🔗") ? 600 : 400 }}>{f}</div>
                  ))}
                </CardBody>
              </Card>
            ))}
          </div>
        ) : (
          <pre style={{ background: "#1A1714", color: "#A3E4B8", fontFamily: "monospace", fontSize: 12, padding: "20px 22px", borderRadius: "var(--rs)", overflowX: "auto", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>
            {CREATE_SQL}
          </pre>
        )}
      </div>
    </div>
  );
};
