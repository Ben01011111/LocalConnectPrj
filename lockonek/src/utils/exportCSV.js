/**
 * Exports a list of applicants as a CSV file download.
 * @param {Array} applicants
 * @param {Function} getJobTitle  - (id) => string
 */
export function exportApplicantsCSV(applicants, getJobTitle) {
  const headers = [
    "ID", "Name", "Barangay", "Education", "Contact",
    "Type", "Skills", "Job Applied", "Status", "Priority",
  ];
  const rows = applicants.map((a) => [
    a.id, a.name, a.barangay, a.education, a.contact,
    a.type, a.skills, getJobTitle(a.job_id), a.status, a.priority,
  ]);
  const csv = [headers, ...rows]
    .map((r) =>
      r.map((v) => `"${(v || "").toString().replace(/"/g, '""')}"`).join(",")
    )
    .join("\n");

  const el = document.createElement("a");
  el.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);
  el.download = "applicants_export.csv";
  el.click();
}
