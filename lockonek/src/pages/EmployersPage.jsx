import { useState } from "react";
import { INDUSTRIES } from "../constants";
import { Topbar } from "../components/layout/Topbar";
import { Btn, ActionBtn, Empty, Alert } from "../components/ui";
import { Badge } from "../components/ui";
import { Card } from "../components/ui/Card";
import { Table, TR, TD } from "../components/ui/Table";
import { FilterBar, SearchBox, FilterSelect } from "../components/ui/FilterBar";

export const EmployersPage = ({ db, onAdd, onEdit, onDelete, onValidate, onView, user }) => {
  const [q,  setQ]  = useState("");
  const [fi, setFi] = useState("");
  const [fs, setFs] = useState("");

  const isAdmin = user?.role === "Administrator";

  const filtered = db.employers.filter((e) => {
    const mq = !q || e.name.toLowerCase().includes(q.toLowerCase()) ||
      (e.address || "").toLowerCase().includes(q.toLowerCase());
    return mq && (!fi || e.industry === fi) && (!fs || e.status === fs);
  });

  return (
    <div className="fade-up">
      <Topbar title="Employers & Establishments">
        {isAdmin && <Btn variant="primary" onClick={() => onAdd()}>+ Register Employer</Btn>}
      </Topbar>
      <div style={{ padding: 28 }}>
        {!isAdmin && (
          <Alert type="info">
            👁 View-only access. Only Administrators can register, edit, or validate employers.
          </Alert>
        )}
        <FilterBar>
          <SearchBox value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search employers..." />
          <FilterSelect value={fi} onChange={(e) => setFi(e.target.value)}>
            <option value="">All Industries</option>
            {INDUSTRIES.map((i) => <option key={i}>{i}</option>)}
          </FilterSelect>
          <FilterSelect value={fs} onChange={(e) => setFs(e.target.value)}>
            <option value="">All Validation</option>
            <option value="verified">Verified</option>
            <option value="pending">Pending</option>
          </FilterSelect>
        </FilterBar>
        <Card>
          {filtered.length === 0 ? (
            <Empty icon="🏢" title="No employers registered yet" sub={isAdmin ? "Register your first employer" : "No employers found"} />
          ) : (
            <Table headers={["Employer Name", "Industry", "Address", "Open Positions", "OJT Slots", "Validation", ...(isAdmin ? ["Action"] : [])]}>
              {filtered.map((e) => (
                <TR key={e.id}>
                  <TD>
                    <strong>{e.name}</strong>
                    {e.contact && <><br /><small style={{ color: "var(--muted)" }}>{e.contact}</small></>}
                  </TD>
                  <TD>{e.industry}</TD>
                  <TD style={{ maxWidth: 140, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{e.address || "—"}</TD>
                  <TD style={{ textAlign: "center" }}>{e.positions || 0}</TD>
                  <TD style={{ textAlign: "center" }}>{e.ojt_slots || 0}</TD>
                  <TD>
                    {e.status === "verified"
                      ? <Badge text="Verified" variant="verified" />
                      : isAdmin
                        ? <ActionBtn variant="green" onClick={() => onValidate(e.id)}>Validate</ActionBtn>
                        : <Badge text="Pending" variant="pending" />
                    }
                  </TD>
                  {isAdmin && (
                    <TD>
                      <ActionBtn variant="blue" onClick={() => onView(e)}>View</ActionBtn>
                      <ActionBtn variant="green" onClick={() => onEdit(e)}>Edit</ActionBtn>
                      <ActionBtn variant="red" onClick={() => onDelete(e.id)}>Del</ActionBtn>
                    </TD>
                  )}
                </TR>
              ))}
            </Table>
          )}
        </Card>
      </div>
    </div>
  );
};