

# VitalTriage AI — Major Feature Update Plan

## Summary

Five major changes: add Triage Nurse role with patient intake, enhance Clinician dashboard with filters, add global AI chatbot, fix notifications/profiles, and move navigation from sidebar to top bar.

---

## 1. New Role: Triage Nurse

**Data changes:**
- Update `UserRole` type in `types.ts` to include `"triage_nurse"`
- Add `Patient` fields: `status: "registered" | "admitted" | "discharged" | "waiting"`, `triageNurse: string`, `registeredAt: string`, `aiSeverity?: Severity` (LLM-assigned)
- Add triage nurse users to `users.ts`
- Add new mock patients in "waiting"/"registered" states (not yet admitted)

**New components:**
- `TriageNurseDashboard.tsx` with pages:
  - **Patient Intake Form** — full registration form (name, age, gender, chief complaint, vitals entry, symptoms checklist, allergies, history notes). On submit, simulates LLM call that returns severity + recommended doctor + priority score
  - **Queue View** — list of waiting patients sorted by AI-assigned severity, with actions to admit/assign doctor
  - **Overview** — stats on patients screened today, severity distribution

**Integration:**
- Update `LoginPage.tsx` quick-login to include triage_nurse
- Update `RoleContext`, `DashboardLayout`, `Index.tsx` to route triage_nurse
- Update `api.ts` with `createPatient()`, `getTriageQueue()` functions

---

## 2. Enhanced Clinician Dashboard

**New "All Patients" view** replacing/extending current patient list:
- Filter chips: severity (critical/moderate/stable), status (admitted/waiting/discharged), ward, doctor
- Search by name/ID
- Sort by severity, admission date, status
- Toggle between card view and table view
- Shows ALL patients regardless of admission status
- Each patient row expandable or clickable for detail view (existing PatientDetail component)

---

## 3. Global AI Chatbot

**Floating chatbot widget** accessible from all dashboards:
- `ChatbotWidget.tsx` — fixed-position button (bottom-right) with expandable chat panel
- Role-aware system prompt (knows user's role and adjusts responses)
- Features: ask about patients, get help with triage, query protocols, make entries via natural language
- Since no Supabase/backend is connected, implement as a **mock chatbot** with pre-programmed responses matching common queries (patient lookup, protocol questions, severity explanations)
- UI: message bubbles, typing indicator, markdown rendering, minimize/maximize

---

## 4. Notifications & Profile System

**Notification Center:**
- `NotificationPanel.tsx` — slide-out panel from bell icon in header
- Shows role-filtered notifications from `notifications.ts`
- Mark as read/unread, filter by type (alert/info/warning/success)
- Badge count updates on interaction

**Profile Section:**
- `ProfilePage.tsx` or modal accessible from avatar in header
- Shows user info, department, role, last login
- Editable display name (mock save)

---

## 5. Top Navigation Bar (Replace Sidebar)

**Replace the 264px sidebar with a horizontal top navigation:**
- `TopNavLayout.tsx` replaces `DashboardLayout.tsx`
- Logo + app name on the left
- Role-specific nav items as horizontal tabs/buttons in the center
- Right side: notification bell, chatbot toggle, user avatar dropdown (profile, sign out)
- Sticky/fixed at top, always visible
- Responsive: hamburger menu on mobile with dropdown
- Content area takes full width below the nav bar

---

## Files to Create
| File | Purpose |
|------|---------|
| `src/components/dashboards/TriageNurseDashboard.tsx` | Intake form, queue, overview |
| `src/components/ChatbotWidget.tsx` | Global floating chatbot |
| `src/components/NotificationPanel.tsx` | Slide-out notification center |
| `src/components/ProfileMenu.tsx` | Avatar dropdown with profile/logout |
| `src/components/TopNavLayout.tsx` | New horizontal top navigation layout |

## Files to Modify
| File | Changes |
|------|---------|
| `src/data/types.ts` | Add `triage_nurse` to UserRole, add patient status fields |
| `src/data/users.ts` | Add triage nurse user accounts |
| `src/data/patients.ts` | Add non-admitted patients, status field |
| `src/services/api.ts` | Add triage/intake API functions |
| `src/context/RoleContext.tsx` | Support triage_nurse role |
| `src/pages/Index.tsx` | Route triage_nurse dashboard, remove sidebar reference |
| `src/pages/LoginPage.tsx` | Add triage_nurse quick login |
| `src/components/dashboards/ClinicianDashboard.tsx` | Add all-patients view with filters |
| `src/components/DashboardLayout.tsx` | Remove (replaced by TopNavLayout) |
| `src/data/mockData.ts` | Re-export new data |

## Technical Notes
- Chatbot will be mock-only (no LLM backend connected). Can be upgraded later with Lovable AI gateway.
- LLM severity assignment on patient intake will be simulated with rule-based logic matching existing classification rules.
- All new components use existing design tokens (severity colors, card styles, shadcn/ui).

