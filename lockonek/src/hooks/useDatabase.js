import { useState } from "react";

const SAMPLE_EMPLOYERS = [
  { id: 1, name: "Cotabato City Hall",           industry: "Government",         address: "Quezon Avenue, Cotabato City",        contact: "Maria Santos",    phone: "0912-345-6789", positions: 5, ojt_slots: 8,  status: "verified" },
  { id: 2, name: "Sultan Kudarat Medical Center", industry: "Healthcare",         address: "Sinsuat Avenue, Cotabato City",       contact: "Dr. Jose Reyes",  phone: "0923-456-7890", positions: 3, ojt_slots: 6,  status: "verified" },
  { id: 3, name: "Notre Dame College",            industry: "Education",          address: "Cotabato City",                       contact: "Fr. Miguel Cruz", phone: "0945-678-9012", positions: 2, ojt_slots: 15, status: "verified" },
  { id: 4, name: "SM City Cotabato",              industry: "Commerce & Trade",   address: "Sinsuat Avenue, Cotabato City",       contact: "John Dela Cruz",  phone: "0967-890-1234", positions: 12,ojt_slots: 5,  status: "verified" },
  { id: 5, name: "BDO Cotabato Branch",           industry: "Finance",            address: "Quezon Avenue, Cotabato City",        contact: "Carlo Mendoza",   phone: "0989-012-3456", positions: 2, ojt_slots: 3,  status: "verified" },
];

const SAMPLE_JOBS = [
  { id: 1, employer_id: 1, title: "Administrative Aide III",       industry: "Government",         type: "Regular / Permanent",  salary: "₱14,000/month", vacancies: 2, location: "City Hall, Cotabato City",        skills: "Computer Literacy, Encoding, Filing",        status: "live", deadline: "2026-03-15" },
  { id: 2, employer_id: 2, title: "Staff Nurse",                   industry: "Healthcare",         type: "Regular / Permanent",  salary: "₱22,000/month", vacancies: 3, location: "Sultan Kudarat Med Center",       skills: "Nursing, Patient Care, BLS",                 status: "live", deadline: "2026-03-25" },
  { id: 3, employer_id: 3, title: "Elementary School Teacher",     industry: "Education",          type: "Regular / Permanent",  salary: "₱24,000/month", vacancies: 2, location: "Notre Dame College",               skills: "Teaching, Lesson Planning, Communication",  status: "live", deadline: "2026-03-31" },
  { id: 4, employer_id: 4, title: "Sales Associate",               industry: "Commerce & Trade",   type: "Regular / Permanent",  salary: "₱12,000/month", vacancies: 5, location: "SM City Cotabato",                 skills: "Customer Service, Cash Handling, Teamwork", status: "live", deadline: "2026-03-22" },
  { id: 5, employer_id: 5, title: "Bank Teller",                   industry: "Finance",            type: "Regular / Permanent",  salary: "₱17,000/month", vacancies: 1, location: "BDO Cotabato Branch",              skills: "Banking, Customer Service, Accuracy",        status: "live", deadline: "2026-04-05" },
  { id: 6, employer_id: 1, title: "OJT – Admin & Records",         industry: "Government",         type: "College OJT",          salary: "Allowance-based", vacancies: 3, location: "City Hall, Cotabato City",      skills: "Encoding, Filing, MS Office",               status: "live", deadline: "2026-04-01" },
  { id: 7, employer_id: 2, title: "OJT – Clinical Nursing",        industry: "Healthcare",         type: "College OJT",          salary: "Allowance-based", vacancies: 4, location: "Sultan Kudarat Med Center",     skills: "Patient Care, Vital Signs, BLS",             status: "live", deadline: "2026-04-10" },
  { id: 8, employer_id: 3, title: "OJT – Teaching Assistant",      industry: "Education",          type: "College OJT",          salary: "Allowance-based", vacancies: 2, location: "Notre Dame College",             skills: "Teaching, Communication, Lesson Planning",  status: "live", deadline: "2026-04-15" },
  { id: 9, employer_id: 4, title: "SHS Immersion – Retail & Sales",industry: "Commerce & Trade",   type: "SHS Work Immersion",   salary: "No allowance",    vacancies: 5, location: "SM City Cotabato",              skills: "Customer Service, Teamwork, Cash Handling", status: "live", deadline: "2026-03-28" },
  { id: 10, employer_id: 5, title: "SHS Immersion – Banking & Finance", industry: "Finance",       type: "SHS Work Immersion",   salary: "No allowance",    vacancies: 3, location: "BDO Cotabato Branch",            skills: "Basic Accounting, Computer Literacy",        status: "live", deadline: "2026-04-08" },
];

const SAMPLE_APPLICANTS = [
  { id: 1, name: "Juan dela Cruz",    barangay: "Rosary Heights I",  education: "College Graduate", contact: "0912-111-2233", type: "unemployed",    job_id: 1, skills: "Computer Literacy, Encoding",       status: "pending",   priority: "" },
  { id: 2, name: "Maria Santos",      barangay: "Poblacion 1",       education: "College Graduate", contact: "0923-222-3344", type: "underemployed", job_id: 2, skills: "Nursing, Patient Care, BLS",        status: "matched",   priority: "Solo Parent (RA 8972)" },
  { id: 3, name: "Ana Reyes",         barangay: "Bagua I",           education: "Vocational/TESDA", contact: "0934-333-4455", type: "unemployed",           job_id: 4, skills: "Customer Service, Teamwork",        status: "endorsed",  priority: "4Ps Beneficiary" },
  { id: 4, name: "Fatima Abdulkarim", barangay: "Rosary Heights IV", education: "College Graduate", contact: "0956-555-6677", type: "ofw_return",    job_id: 5, skills: "Accounting, MS Excel, Bookkeeping", status: "confirmed", priority: "OFW Reintegration" },
  { id: 5, name: "Pedro Buenaventura",barangay: "Poblacion 4",       education: "College Graduate", contact: "0967-666-7788", type: "pwd",           job_id: 3, skills: "Teaching, Communication",           status: "pending",   priority: "PWD" },
];

const SAMPLE_OJT = [
  { id: 1, student: "Mark Anthony Reyes",  type: "college_ojt", employer_id: 1, status: "ongoing",   degree: "BS Public Administration", req_hours: 480, comp_hours: 320, strand: "",     req_days: 0,  comp_days: 0  },
  { id: 2, student: "Jessa Marie Santos",  type: "college_ojt", employer_id: 2, status: "ongoing",   degree: "BS Nursing",               req_hours: 600, comp_hours: 450, strand: "",     req_days: 0,  comp_days: 0  },
  { id: 3, student: "Ryan dela Cruz",      type: "college_ojt", employer_id: 4, status: "completed", degree: "BS Business Administration",req_hours: 480, comp_hours: 480, strand: "",     req_days: 0,  comp_days: 0  },
  { id: 4, student: "Lilibeth Corpuz",     type: "shs",         employer_id: 1, status: "ongoing",   degree: "",                         req_hours: 0,   comp_hours: 0,   strand: "ABM",  req_days: 40, comp_days: 28 },
  { id: 5, student: "Hamza Abdulrahman",   type: "shs",         employer_id: 4, status: "ongoing",   degree: "",                         req_hours: 0,   comp_hours: 0,   strand: "TVL",  req_days: 40, comp_days: 15 },
];

let _nextId = { jobs: 11, applicants: 6, employers: 6, ojt: 6 };
const nid = (store) => _nextId[store]++;

export function useDatabase() {
  const [jobs,       setJobs]       = useState(SAMPLE_JOBS);
  const [applicants, setApplicants] = useState(SAMPLE_APPLICANTS);
  const [employers,  setEmployers]  = useState(SAMPLE_EMPLOYERS);
  const [ojt,        setOJT]        = useState(SAMPLE_OJT);

  const db = { jobs, applicants, employers, ojt };

  const getEmpName  = (id) => employers.find((e) => e.id == id)?.name  || "—";
  const getJobTitle = (id) => jobs.find((j) => j.id == id)?.title || "—";

  const addJob    = (f) => setJobs((p) => [...p, { ...f, id: nid("jobs") }]);
  const updateJob = (id, f) => setJobs((p) => p.map((j) => j.id == id ? { ...j, ...f } : j));
  const deleteJob = (id) => setJobs((p) => p.filter((j) => j.id != id));

  const addApplicant    = (f) => setApplicants((p) => [...p, { ...f, id: nid("applicants") }]);
  const updateApplicant = (id, f) => setApplicants((p) => p.map((a) => a.id == id ? { ...a, ...f } : a));
  const deleteApplicant = (id) => setApplicants((p) => p.filter((a) => a.id != id));
  const updateApplicantStatus = (id, status) =>
    setApplicants((p) => p.map((a) => a.id == id ? { ...a, status } : a));

  const addEmployer      = (f) => setEmployers((p) => [...p, { ...f, id: nid("employers") }]);
  const updateEmployer   = (id, f) => setEmployers((p) => p.map((e) => e.id == id ? { ...e, ...f } : e));
  const deleteEmployer   = (id) => setEmployers((p) => p.filter((e) => e.id != id));
  const validateEmployer = (id) =>
    setEmployers((p) => p.map((e) => e.id == id ? { ...e, status: "verified" } : e));

  const addOJT    = (f) => setOJT((p) => [...p, { ...f, id: nid("ojt") }]);
  const updateOJT = (id, f) => setOJT((p) => p.map((r) => r.id == id ? { ...r, ...f } : r));
  const deleteOJT = (id) => setOJT((p) => p.filter((r) => r.id != id));

  return {
    db, getEmpName, getJobTitle,
    addJob, updateJob, deleteJob,
    addApplicant, updateApplicant, deleteApplicant, updateApplicantStatus,
    addEmployer, updateEmployer, deleteEmployer, validateEmployer,
    addOJT, updateOJT, deleteOJT,
  };
}