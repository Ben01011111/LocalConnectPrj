import { useState, useEffect } from "react";
import { SHS_STRANDS } from "../../constants";
import { Modal } from "../ui/Modal";
import { Btn, FormRow, FormField, Input, Select } from "../ui";

const DEFAULT = {
  student: "", type: "college_ojt", employer_id: "", status: "pending",
  degree: "", req_hours: 480, comp_hours: 0,
  strand: "ABM", req_days: 40, comp_days: 0,
};

export const OJTModal = ({ open, onClose, record, employers, onSave }) => {
  const [f, setF] = useState(DEFAULT);
  useEffect(() => { setF(record ? { ...DEFAULT, ...record } : DEFAULT); }, [open]);
  const s = (k) => (e) => setF((p) => ({ ...p, [k]: e.target.value }));

  return (
    <Modal open={open} onClose={onClose} title={record ? "Edit OJT Record" : "Add OJT Record"}
      footer={
        <>
          <Btn variant="secondary" onClick={onClose}>Cancel</Btn>
          <Btn variant="primary" onClick={() => onSave(f)}>Save Record</Btn>
        </>
      }>
      <FormRow>
        <FormField label="Student Name *"><Input value={f.student} onChange={s("student")} placeholder="Full name" /></FormField>
        <FormField label="Program Type">
          <Select value={f.type} onChange={s("type")}>
            <option value="college_ojt">College OJT</option>
            <option value="shs">SHS Work Immersion</option>
          </Select>
        </FormField>
      </FormRow>

      {f.type === "college_ojt" ? (
        <>
          <FormRow>
            <FormField label="Degree Program"><Input value={f.degree} onChange={s("degree")} placeholder="BS Accountancy" /></FormField>
            <FormField label="Required Hours"><Input type="number" min="0" value={f.req_hours} onChange={s("req_hours")} /></FormField>
          </FormRow>
          <div style={{ marginBottom: 16 }}>
            <FormField label="Completed Hours"><Input type="number" min="0" value={f.comp_hours} onChange={s("comp_hours")} /></FormField>
          </div>
        </>
      ) : (
        <>
          <FormRow>
            <FormField label="SHS Strand">
              <Select value={f.strand} onChange={s("strand")}>{SHS_STRANDS.map((s) => <option key={s}>{s}</option>)}</Select>
            </FormField>
            <FormField label="Required Days"><Input type="number" min="0" value={f.req_days} onChange={s("req_days")} /></FormField>
          </FormRow>
          <div style={{ marginBottom: 16 }}>
            <FormField label="Completed Days"><Input type="number" min="0" value={f.comp_days} onChange={s("comp_days")} /></FormField>
          </div>
        </>
      )}

      <FormRow>
        <FormField label="Host Company">
          <Select value={f.employer_id} onChange={s("employer_id")}>
            <option value="">Select employer...</option>
            {employers.map((e) => <option key={e.id} value={e.id}>{e.name}</option>)}
          </Select>
        </FormField>
        <FormField label="Status">
          <Select value={f.status} onChange={s("status")}>
            <option value="pending">Pending</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
          </Select>
        </FormField>
      </FormRow>
    </Modal>
  );
};
