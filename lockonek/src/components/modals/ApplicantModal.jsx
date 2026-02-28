import { useState, useEffect } from "react";
import { EDU_LEVELS, SEEKER_TYPES, APP_STATUSES, PRIORITIES } from "../../constants";
import { Modal } from "../ui/Modal";
import { Btn, FormRow, FormField, Input, Select } from "../ui";

const DEFAULT = {
  name: "", barangay: "", education: "High School",
  contact: "", type: "unemployed", job_id: "",
  skills: "", status: "pending", priority: "",
};

export const ApplicantModal = ({ open, onClose, applicant, jobs, onSave }) => {
  const [f, setF] = useState(DEFAULT);
  useEffect(() => { setF(applicant ? { ...DEFAULT, ...applicant } : DEFAULT); }, [open]);
  const s = (k) => (e) => setF((p) => ({ ...p, [k]: e.target.value }));

  return (
    <Modal open={open} onClose={onClose} title={applicant ? "Edit Applicant" : "Add Applicant"}
      footer={
        <>
          <Btn variant="secondary" onClick={onClose}>Cancel</Btn>
          <Btn variant="primary" onClick={() => onSave(f)}>Save Applicant</Btn>
        </>
      }>
      <FormRow>
        <FormField label="Full Name *"><Input value={f.name} onChange={s("name")} placeholder="Juan dela Cruz" /></FormField>
        <FormField label="Barangay"><Input value={f.barangay} onChange={s("barangay")} placeholder="Brgy. Rosary Heights" /></FormField>
      </FormRow>
      <FormRow>
        <FormField label="Education Level">
          <Select value={f.education} onChange={s("education")}>{EDU_LEVELS.map((e) => <option key={e}>{e}</option>)}</Select>
        </FormField>
        <FormField label="Contact Number"><Input value={f.contact} onChange={s("contact")} placeholder="09XXXXXXXXX" /></FormField>
      </FormRow>
      <FormRow>
        <FormField label="Seeker Type">
          <Select value={f.type} onChange={s("type")}>{SEEKER_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}</Select>
        </FormField>
        <FormField label="Applied For">
          <Select value={f.job_id} onChange={s("job_id")}>
            <option value="">-- None --</option>
            {jobs.map((j) => <option key={j.id} value={j.id}>{j.title}</option>)}
          </Select>
        </FormField>
      </FormRow>
      <div style={{ marginBottom: 16 }}>
        <FormField label="Skills"><Input value={f.skills} onChange={s("skills")} placeholder="Computer Literacy, Bookkeeping..." /></FormField>
      </div>
      <FormRow>
        <FormField label="Status">
          <Select value={f.status} onChange={s("status")}>{APP_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}</Select>
        </FormField>
        <FormField label="Priority Category">
          <Select value={f.priority} onChange={s("priority")}>{PRIORITIES.map((p) => <option key={p} value={p}>{p || "None"}</option>)}</Select>
        </FormField>
      </FormRow>
    </Modal>
  );
};
