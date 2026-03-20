import { patients as patientData } from "@/data/patients";
import { classificationRules } from "@/data/rules";
import { auditLogs } from "@/data/auditLogs";
import { resources } from "@/data/resources";
import { alerts } from "@/data/alerts";
import { staff, shiftSchedules } from "@/data/staff";
import { departments } from "@/data/departments";
import { notifications } from "@/data/notifications";
import { systemMetrics, hourlyPatientLoad, wardDistribution } from "@/data/systemMetrics";
import type {
  Patient, ClassificationRule, AuditLog, Resource, Alert,
  StaffMember, Department, Notification, SystemMetric, ShiftSchedule, Severity, PatientStatus
} from "@/data/types";

let patients = [...patientData];

const delay = <T>(data: T): Promise<T> => Promise.resolve(data);

// ─── Patients ───────────────────────────────────────────
export const getPatients = () => delay(patients);
export const getPatientById = (id: string) => delay(patients.find(p => p.id === id) ?? null);
export const getPatientsBySeverity = (severity: Severity) => delay(patients.filter(p => p.severity === severity));
export const getPatientsByWard = (ward: string) => delay(patients.filter(p => p.ward === ward));
export const getPatientsByDoctor = (doctor: string) => delay(patients.filter(p => p.doctor === doctor));
export const getPatientsByStatus = (status: PatientStatus) => delay(patients.filter(p => p.status === status));
export const getPatientStats = () => delay({
  total: patients.length,
  critical: patients.filter(p => p.severity === "critical").length,
  moderate: patients.filter(p => p.severity === "moderate").length,
  stable: patients.filter(p => p.severity === "stable").length,
});

// ─── Triage ─────────────────────────────────────────────
export const getTriageQueue = () => delay(patients.filter(p => p.status === "waiting" || p.status === "registered"));

export const createPatient = (patient: Omit<Patient, "id">) => {
  const newPatient = { ...patient, id: `P${String(patients.length + 1).padStart(3, "0")}` } as Patient;
  patients = [...patients, newPatient];
  return delay(newPatient);
};

export const admitPatient = (id: string, ward: string, bed: string, doctor: string) => {
  patients = patients.map(p => p.id === id ? { ...p, status: "admitted" as const, ward, bed, doctor, admissionDate: new Date().toISOString().split("T")[0] } : p);
  return delay(patients.find(p => p.id === id)!);
};

// Simulated AI severity classification
export const classifyPatientSeverity = (vitals: Patient["vitals"], chiefComplaint: string): Severity => {
  if (vitals.heartRate > 120 || vitals.oxygenSaturation < 90 || vitals.respiratoryRate > 30 || vitals.temperature > 39) return "critical";
  if (vitals.heartRate > 100 || vitals.oxygenSaturation < 94 || vitals.respiratoryRate > 24 || vitals.temperature > 38) return "moderate";
  const criticalKeywords = ["stroke", "cardiac arrest", "seizure", "unconscious", "bleeding", "trauma"];
  if (criticalKeywords.some(k => chiefComplaint.toLowerCase().includes(k))) return "critical";
  return "stable";
};

// ─── Classification Rules ───────────────────────────────
export const getRules = () => delay(classificationRules);
export const getRuleById = (id: string) => delay(classificationRules.find(r => r.id === id) ?? null);
export const createRule = (rule: Omit<ClassificationRule, "id">) => delay({ ...rule, id: `R${Date.now()}` } as ClassificationRule);
export const updateRule = (id: string, updates: Partial<ClassificationRule>) => delay({ ...classificationRules.find(r => r.id === id)!, ...updates });
export const deleteRule = (id: string) => delay({ success: true, id });

// ─── Audit Logs ─────────────────────────────────────────
export const getAuditLogs = () => delay(auditLogs);
export const getAuditLogsByCategory = (category: AuditLog["category"]) => delay(auditLogs.filter(l => l.category === category));

// ─── Resources ──────────────────────────────────────────
export const getResources = () => delay(resources);

// ─── Alerts ─────────────────────────────────────────────
export const getAlerts = () => delay(alerts);
export const getUnreadAlerts = () => delay(alerts.filter(a => !a.read));
export const markAlertRead = (id: string) => delay({ success: true, id });

// ─── Staff ──────────────────────────────────────────────
export const getStaff = () => delay(staff);
export const getStaffOnDuty = () => delay(staff.filter(s => s.onDuty));
export const getStaffByDepartment = (dept: string) => delay(staff.filter(s => s.department === dept));
export const getShiftSchedules = () => delay(shiftSchedules);

// ─── Departments ────────────────────────────────────────
export const getDepartments = () => delay(departments);

// ─── Notifications ──────────────────────────────────────
export const getNotifications = () => delay(notifications);
export const getNotificationsByRole = (role: string) => delay(notifications.filter(n => n.targetRole === role || n.targetRole === "all"));
export const markNotificationRead = (id: string) => delay({ success: true, id });

// ─── System Metrics ─────────────────────────────────────
export const getSystemMetrics = () => delay(systemMetrics);
export const getHourlyPatientLoad = () => delay(hourlyPatientLoad);
export const getWardDistribution = () => delay(wardDistribution);

// ─── Aggregated Dashboard Data ──────────────────────────
export const getAdminDashboardData = () => delay({ patients, classificationRules, auditLogs, systemMetrics });
export const getManagerDashboardData = () => delay({ patients, resources, alerts, hourlyPatientLoad, wardDistribution, staff, departments });
export const getClinicianDashboardData = () => delay({ patients, alerts: alerts.filter(a => !a.read), notifications });
