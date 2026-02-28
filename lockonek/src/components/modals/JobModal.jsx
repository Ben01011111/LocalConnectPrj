import { useState, useEffect } from "react";
import { INDUSTRIES, EMP_TYPES } from "../../constants";
import { Modal } from "../ui/Modal";
import { Btn, FormRow, FormField, Input, Select } from "../ui";

const DEFAULT = {
  title: "", employer_id: "", industry: "Government",
  type: "Regular / Permanent", salary: "", vacancies: 1,
  location: "", skills: "", status: "draft", deadline: "",
};

export const JobModal = ({ open, onClose, job, employers, onSave }) => {
  const [f, setF] = useState(DEFAULT);
  useEffect(() => { setF(job ? { ...DEFAULT, ...job } : DEFAULT); }, [open]);
  const s = (k) => (e) => setF((p) => ({ ...p, [k]: e.target.value }));

  return (
    <Modal open={open} onClose={onClose} title={job ? "Edit Job Listing" : "Add Job Listing"}
      footer={
        <>
          <Btn variant="secondary" onClick={onClose}>Cancel</Btn>
          <Btn variant="primary" onClick={() => onSave(f)}>Save Job</Btn>
        </>
      }>
      <FormRow>
        <FormField label="Job Title *"><Input value={f.title} onChange={s("title")} placeholder="e.g. Administrative Aide" /></FormField>
        <FormField label="Employer">
          <Select value={f.employer_id} onChange={s("employer_id")}>
            <option value="">Select employer...</option>
            {employers.map((e) => <option key={e.id} value={e.id}>{e.name}</option>)}
          </Select>
        </FormField>
      </FormRow>
      <FormRow>
        <FormField label="Industry">
          <Select value={f.industry} onChange={s("industry")}>{INDUSTRIES.map((i) => <option key={i}>{i}</option>)}</Select>
        </FormField>
        <FormField label="Employment Type">
          <Select value={f.type} onChange={s("type")}>{EMP_TYPES.map((t) => <option key={t}>{t}</option>)}</Select>
        </FormField>
      </FormRow>
      <FormRow>
        <FormField label="Salary"><Input value={f.salary} onChange={s("salary")} placeholder="₱15,000/mo" /></FormField>
        <FormField label="Vacancies"><Input type="number" min="1" value={f.vacancies} onChange={s("vacancies")} /></FormField>
      </FormRow>
      <div style={{ marginBottom: 16 }}>
        <FormField label="Location"><Input value={f.location} onChange={s("location")} placeholder="e.g. City Hall Compound" /></FormField>
      </div>
      <div style={{ marginBottom: 16 }}>
        <FormField label="Skill Tags (comma-separated)"><Input value={f.skills} onChange={s("skills")} placeholder="Computer Literacy, Bookkeeping..." /></FormField>
      </div>
      <FormRow>
        <FormField label="Status">
          <Select value={f.status} onChange={s("status")}>
            <option value="draft">Draft</option>
            <option value="live">Live</option>
            <option value="closed">Closed</option>
          </Select>
        </FormField>
        <FormField label="Deadline"><Input type="date" value={f.deadline} onChange={s("deadline")} /></FormField>
      </FormRow>
    </Modal>
  );
};
