export const INDUSTRIES = [
  "Government",
  "Commerce & Trade",
  "Agriculture",
  "Healthcare",
  "Education",
  "Finance",
  "Food & Hospitality",
];

export const EMP_TYPES = [
  "Regular / Permanent",
  "Fixed-term",
  "Flexible / Part-time",
  "Seasonal",
  "Volunteer",
  "Self-Employment / Livelihood",
  "College OJT",
  "SHS Work Immersion",
];

export const EDU_LEVELS = [
  "Elementary",
  "High School",
  "Vocational/TESDA",
  "College Graduate",
];

export const SEEKER_TYPES = [
  "unemployed",
  "underemployed",
  "osy",
  "ofw_return",
  "pwd",
  "solo_parent",
  "ip",
  "kabataan",
];

export const APP_STATUSES = [
  "pending",
  "matched",
  "endorsed",
  "confirmed",
  "declined",
];

export const PRIORITIES = [
  "",
  "4Ps Beneficiary",
  "Solo Parent (RA 8972)",
  "PWD",
  "OFW Reintegration",
  "Indigenous People (IP)",
];

export const SHS_STRANDS = ["ABM", "HUMSS", "STEM", "TVL", "GAS"];

export const INDUSTRY_EMOJI = {
  Government: "🏛️",
  "Commerce & Trade": "🏪",
  Agriculture: "🌾",
  Healthcare: "🏥",
  Education: "🎓",
  Finance: "🏦",
  "Food & Hospitality": "🍽️",
};

export const STATUS_STYLE = {
  pending:   { bg: "#FDF3E7", color: "#92400E" },
  matched:   { bg: "#EFF6FF", color: "#1D4ED8" },
  endorsed:  { bg: "#EDFBF2", color: "#166534" },
  confirmed: { bg: "#EDFBF2", color: "#166534" },
  declined:  { bg: "#FEF2F2", color: "#991B1B" },
  live:      { bg: "#EDFBF2", color: "#166534" },
  draft:     { bg: "#FDF3E7", color: "#92400E" },
  closed:    { bg: "#F0EDE5", color: "#7A6F60" },
  ongoing:   { bg: "#EFF6FF", color: "#1D4ED8" },
  completed: { bg: "#EDFBF2", color: "#166534" },
  verified:  { bg: "#EDFBF2", color: "#166534" },
  pending_v: { bg: "#FDF3E7", color: "#92400E" },
};

export const NAV = [
  { id: "dashboard",     icon: "📊", label: "Dashboard",           group: "Main" },
  { id: "jobs",          icon: "💼", label: "Job Listings",         group: "Main", badge: true },
  { id: "applicants",    icon: "👥", label: "Applicants",           group: "Main" },
  { id: "internships",   icon: "🎓", label: "Internships / OJT",    group: "Main" },
  { id: "employers",     icon: "🏢", label: "Employers",            group: "Main" },
  { id: "notifications", icon: "🔔", label: "Notifications",        group: "Main", notifBadge: true },
  { id: "post-job",      icon: "➕", label: "Post a Job",           group: "Operations" },
  { id: "reports",       icon: "📈", label: "Reports & Analytics",  group: "Operations" },
  { id: "db-schema",     icon: "🗄️", label: "Database Schema",      group: "System" },
  { id: "settings",      icon: "⚙️", label: "Settings",             group: "System" },
];