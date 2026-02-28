import { useState } from "react";
import { INDUSTRIES, EMP_TYPES } from "../constants";
import { Topbar } from "../components/layout/Topbar";
import { Btn, Alert, FormRow, FormField, Input, Select, Textarea } from "../components/ui";

const DEFAULT = {
  title: "", employer_id: "", industry: "Government",
  type: "Regular / Permanent", salary: "", vacancies: 1,
  location: "", desc: "", skills: "", priority: "Open to All", deadline: "",
};

export const PostJobPage = ({ db, onSubmit }) => {
  const [f, setF] = useState(DEFAULT);
  const s = (k) => (e) => setF((p) => ({ ...p, [k]: e.target.value }));

  const handleSubmit = () => { onSubmit(f); setF(DEFAULT); };

  return (
    <div className="fade-up">
      <Topbar title="Post a Job Listing" />
      <div style={{ padding: 28 }}>
        

        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--r)", boxShadow: "var(--shadow)", maxWidth: 760 }}>
          <div style={{ padding: "22px 28px 18px", borderBottom: "1px solid var(--border)" }}>
            <div style={{ fontFamily: "'Fraunces',serif", fontSize: 18, fontWeight: 600 }}>Job Details</div>
            <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 3 }}>Fill in the position details. Fields marked * are required.</p>
          </div>

          <div style={{ padding: "24px 28px" }}>
            <FormRow>
              <FormField label="Job Title *"><Input value={f.title} onChange={s("title")} placeholder="e.g. Administrative Aide III" /></FormField>
              <FormField label="Employer / Establishment *">
                <Select value={f.employer_id} onChange={s("employer_id")}>
                  <option value="">Select employer...</option>
                  {db.employers.map((e) => <option key={e.id} value={e.id}>{e.name}</option>)}
                </Select>
              </FormField>
            </FormRow>
            <FormRow>
              <FormField label="Industry / Sector *">
                <Select value={f.industry} onChange={s("industry")}>{INDUSTRIES.map((i) => <option key={i}>{i}</option>)}</Select>
              </FormField>
              <FormField label="Employment Type *">
                <Select value={f.type} onChange={s("type")}>{EMP_TYPES.map((t) => <option key={t}>{t}</option>)}</Select>
              </FormField>
            </FormRow>
            <FormRow>
              <FormField label="Salary / Compensation"><Input value={f.salary} onChange={s("salary")} placeholder="e.g. ₱15,000/month" /></FormField>
              <FormField label="Number of Vacancies"><Input type="number" min="1" value={f.vacancies} onChange={s("vacancies")} /></FormField>
            </FormRow>
            <div style={{ marginBottom: 18 }}>
              <FormField label="Location / Address"><Input value={f.location} onChange={s("location")} placeholder="e.g. City Hall Compound, Cotabato City" /></FormField>
            </div>
            <div style={{ marginBottom: 18 }}>
              <FormField label="Job Description">
                <Textarea rows={4} value={f.desc} onChange={s("desc")} placeholder="Describe the role, responsibilities, and work environment..." />
              </FormField>
            </div>
            <div style={{ marginBottom: 18 }}>
              <FormField label="Skill Tags (comma-separated)"><Input value={f.skills} onChange={s("skills")} placeholder="e.g. Computer Literacy, Bookkeeping, Driving..." /></FormField>
            </div>
            <FormRow>
              <FormField label="Priority Group Eligibility">
                <Select value={f.priority} onChange={s("priority")}>
                  {["Open to All", "4Ps Beneficiaries (DSWD)", "Solo Parents (RA 8972)", "PWD-Friendly", "OFW Reintegration", "Indigenous People (IP)", "KABATAAN Program"].map((p) => <option key={p}>{p}</option>)}
                </Select>
              </FormField>
              <FormField label="Application Deadline"><Input type="date" value={f.deadline} onChange={s("deadline")} /></FormField>
            </FormRow>
          </div>

          <div style={{ padding: "16px 28px", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "flex-end", gap: 10 }}>
            <Btn variant="secondary" onClick={() => setF(DEFAULT)}>Clear Form</Btn>
            <Btn variant="primary" onClick={handleSubmit}>Submit for Validation →</Btn>
          </div>
        </div>
      </div>
    </div>
  );
};
