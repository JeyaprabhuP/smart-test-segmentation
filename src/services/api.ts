/**
 * API Service Layer
 * 
 * All data access goes through this module. Currently uses mock data.
 * To connect to real endpoints, replace the implementations below
 * with fetch/axios calls to your FastAPI backend.
 * 
 * Example:
 *   const API_BASE = "https://your-api.com/api/v1";
 *   export const getPatients = async () => {
 *     const res = await fetch(`${API_BASE}/patients`);
 *     return res.json();
 *   };
 */

import { patients } from "@/data/patients";
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
  StaffMember, Department, Notification, SystemMetric, ShiftSchedule, Severity
} from "@/data/types";

// Simulates async API calls — swap with real fetch when ready
const delay = <T>(data: T): Promise<T> => Promise.resolve(data);

// ─── Patients ───────────────────────────────────────────
export const getPatients = () => delay(patients);
export const getPatientById = (id: string) => delay(patients.find(p => p.id === id) ?? null);
export const getPatientsBySeverity = (severity: Severity) => delay(patients.filter(p => p.severity === severity));
export const getPatientsByWard = (ward: string) => delay(patients.filter(p => p.ward === ward));
export const getPatientsByDoctor = (doctor: string) => delay(patients.filter(p => p.doctor === doctor));
export const getPatientStats = () => delay({
  total: patients.length,
  critical: patients.filter(p => p.severity === "critical").length,
  moderate: patients.filter(p => p.severity === "moderate").length,
  stable: patients.filter(p => p.severity === "stable").length,
});

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
export const getAdminDashboardData = () => delay({
  patients, classificationRules, auditLogs, systemMetrics,
});

export const getManagerDashboardData = () => delay({
  patients, resources, alerts, hourlyPatientLoad, wardDistribution,
  staff, departments,
});

export const getClinicianDashboardData = () => delay({
  patients, alerts: alerts.filter(a => !a.read), notifications,
});
