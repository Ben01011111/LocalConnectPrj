# LocalConnect – LGU Employment Platform

A locally-scoped employment and internship matching system for Local Government Units (LGUs), built with **React + Vite**.

---

## 📁 Project File Structure

```
localconnect/
├── index.html                          # HTML shell / Vite entry
├── vite.config.js                      # Vite + React plugin config
├── package.json                        # Dependencies & scripts
│
└── src/
    ├── main.jsx                        # ReactDOM.createRoot entry
    ├── App.jsx                         # Root component — routing, modal orchestration, CRUD handlers
    │
    ├── constants/
    │   └── index.js                    # INDUSTRIES, EMP_TYPES, STATUS_STYLE, NAV, etc.
    │
    ├── styles/
    │   └── globalCss.js                # CSS string injected via <style> (design tokens, animations)
    │
    ├── hooks/
    │   ├── useToast.js                 # Toast notification state & timer
    │   └── useDatabase.js              # In-memory DB state + CRUD actions for all entities
    │
    ├── utils/
    │   └── exportCSV.js                # exportApplicantsCSV() helper
    │
    ├── components/
    │   ├── ui/
    │   │   ├── index.jsx               # Badge, Input, Select, Textarea, Btn, FormRow, FormField,
    │   │   │                           # ActionBtn, Toggle, Alert, Empty, DetailRow, SectionTitle,
    │   │   │                           # StatCard, ChartBar, StatusSelect
    │   │   ├── Card.jsx                # Card, CardHeader, CardBody
    │   │   ├── Table.jsx               # Table, TR, TD
    │   │   ├── FilterBar.jsx           # FilterBar, SearchBox, FilterSelect
    │   │   ├── Toast.jsx               # Toast notification overlay
    │   │   └── Modal.jsx               # Modal (base) + DetailModal
    │   │
    │   ├── layout/
    │   │   ├── Sidebar.jsx             # Left navigation sidebar
    │   │   └── Topbar.jsx              # Sticky page header bar
    │   │
    │   └── modals/
    │       ├── JobModal.jsx            # Add / Edit job listing form
    │       ├── ApplicantModal.jsx      # Add / Edit applicant form
    │       ├── EmployerModal.jsx       # Register / Edit employer form
    │       └── OJTModal.jsx            # Add / Edit OJT / work immersion record
    │
    └── pages/
        ├── LoginPage.jsx               # Split-panel login screen
        ├── DashboardPage.jsx           # Stats, recent applications, priority beneficiaries
        ├── JobsPage.jsx                # Card grid of job listings with filters
        ├── ApplicantsPage.jsx          # Table of applicants with inline status change
        ├── InternshipsPage.jsx         # College OJT + SHS Work Immersion split view
        ├── EmployersPage.jsx           # Employers table with validation action
        ├── PostJobPage.jsx             # Full job submission form
        ├── ReportsPage.jsx             # LMIS charts and analytics
        ├── DBSchemaPage.jsx            # ERD overview + SQL CREATE scripts
        └── SettingsPage.jsx            # Account & notification preferences
```

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## 🧩 Architecture Notes

| Layer | Responsibility |
|---|---|
| `constants/` | All enums, lookup maps, nav config — single source of truth |
| `hooks/useDatabase.js` | All entity state (jobs, applicants, employers, ojt) + CRUD; no UI logic |
| `hooks/useToast.js` | Toast timer management; decoupled from pages |
| `utils/exportCSV.js` | Pure function; no React dependency |
| `components/ui/` | Presentational-only, zero business logic |
| `components/layout/` | Shell components (Sidebar, Topbar) |
| `components/modals/` | Controlled form dialogs; receive data & onSave callbacks |
| `pages/` | Compose UI components; receive db + handlers from App.jsx |
| `App.jsx` | Single orchestrator: auth, routing, modal state, CRUD wiring |

---

## 🇵🇭 Compliance

- **RA 10173** – Data Privacy Act of 2012
- **RA 8972** – Solo Parents' Welfare Act
- **DepEd & CHED** – SHS Work Immersion and College OJT requirements
- **4Ps / DSWD** – Pantawid Pamilya priority flagging
