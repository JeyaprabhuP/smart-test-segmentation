import { AuditLog } from "./types";

export const auditLogs: AuditLog[] = [
  { id: "A001", user: "admin@vitaltriage.ai", action: "Updated Rule", target: "Tachycardia Critical (R001)", timestamp: "2026-03-19 08:30", category: "rule" },
  { id: "A002", user: "admin@vitaltriage.ai", action: "Created Rule", target: "Tachypnea Critical (R006)", timestamp: "2026-03-16 14:22", category: "rule" },
  { id: "A003", user: "manager@vitaltriage.ai", action: "Exported Report", target: "Weekly Triage Summary", timestamp: "2026-03-18 16:45", category: "report" },
  { id: "A004", user: "admin@vitaltriage.ai", action: "Disabled Rule", target: "Bradycardia Warning (R005)", timestamp: "2026-03-10 09:15", category: "rule" },
  { id: "A005", user: "dr.chen@vitaltriage.ai", action: "Updated Patient", target: "Maria Santos (P001)", timestamp: "2026-03-19 07:00", category: "patient" },
  { id: "A006", user: "admin@vitaltriage.ai", action: "Created Rule", target: "Hypotension Critical (R007)", timestamp: "2026-03-17 10:30", category: "rule" },
  { id: "A007", user: "admin@vitaltriage.ai", action: "Created Rule", target: "Severe Hypoxia Critical (R009)", timestamp: "2026-03-18 11:15", category: "rule" },
  { id: "A008", user: "dr.patel@vitaltriage.ai", action: "Updated Patient", target: "James O'Brien (P002)", timestamp: "2026-03-19 07:30", category: "patient" },
  { id: "A009", user: "system@vitaltriage.ai", action: "Auto-classified", target: "Anna Kowalski (P015) → Critical", timestamp: "2026-03-19 09:25", category: "system" },
  { id: "A010", user: "system@vitaltriage.ai", action: "Auto-classified", target: "Liam Murphy (P010) → Critical", timestamp: "2026-03-19 09:30", category: "system" },
  { id: "A011", user: "manager@vitaltriage.ai", action: "Exported Report", target: "Daily Resource Utilization", timestamp: "2026-03-19 06:00", category: "report" },
  { id: "A012", user: "admin@vitaltriage.ai", action: "Added User", target: "dr.williams@vitaltriage.ai", timestamp: "2026-03-15 14:00", category: "user" },
  { id: "A013", user: "system@vitaltriage.ai", action: "Alert Triggered", target: "Grace Okonkwo - Hypertensive Crisis", timestamp: "2026-03-19 09:15", category: "system" },
  { id: "A014", user: "nurse.adams@vitaltriage.ai", action: "Completed Task", target: "Chest X-ray follow-up (P001)", timestamp: "2026-03-19 08:00", category: "patient" },
  { id: "A015", user: "dr.kim@vitaltriage.ai", action: "Discharge Initiated", target: "Thomas Berg (P008)", timestamp: "2026-03-19 10:00", category: "patient" },
];
