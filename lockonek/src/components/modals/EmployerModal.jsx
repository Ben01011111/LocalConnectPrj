import { useState, useEffect } from "react";
import { INDUSTRIES } from "../../constants";
import { Modal } from "../ui/Modal";
import { Btn, FormRow, FormField, Input, Select } from "../ui";

const DEFAULT = {
  name: "", industry: "Government", address: "",
  contact: "", phone: "", positions: 0, ojt_slots: 0, status: "pending",
};

export const EmployerModal = ({ open, onClose, employer, onSave }) => {
  const [f, setF] = useState(DEFAULT);
  useEffect(() => { setF(employer ? { ...DEFAULT, ...employer } : DEFAULT); }, [open]);
  const s = (k) => (e) => setF((p) => ({ ...p, [k]: e.target.value }));

  return (
    <Modal open={open} onClose={onClose} title={employer ? "Edit Employer" : "Register Employer"}
      footer={
        <>
          <Btn variant="secondary" onClick={onClose}>Cancel</Btn>
          <Btn variant="primary" onClick={() => onSave(f)}>Save Employer</Btn>
        </>
      }>
      <FormRow>
        <FormField label="Business Name *"><Input value={f.name} onChange={s("name")} placeholder="e.g. Cotabato City Hall" /></FormField>
        <FormField label="Industry">
          <Select value={f.industry} onChange={s("industry")}>{INDUSTRIES.map((i) => <option key={i}>{i}</option>)}</Select>
        </FormField>
      </FormRow>
      <div style={{ marginBottom: 16 }}>
        <FormField label="Address"><Input value={f.address} onChange={s("address")} placeholder="Full business address" /></FormField>
      </div>
      <FormRow>
        <FormField label="Contact Person"><Input value={f.contact} onChange={s("contact")} placeholder="HR Manager" /></FormField>
        <FormField label="Contact Number"><Input value={f.phone} onChange={s("phone")} placeholder="09XXXXXXXXX" /></FormField>
      </FormRow>
      <FormRow>
        <FormField label="Open Positions"><Input type="number" min="0" value={f.positions} onChange={s("positions")} /></FormField>
        <FormField label="OJT Slots"><Input type="number" min="0" value={f.ojt_slots} onChange={s("ojt_slots")} /></FormField>
      </FormRow>
      <FormField label="Validation Status">
        <Select value={f.status} onChange={s("status")}>
          <option value="pending">Pending</option>
          <option value="verified">Verified</option>
        </Select>
      </FormField>
    </Modal>
  );
};
