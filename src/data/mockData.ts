// Re-export everything from individual data modules for backward compatibility
export type { Severity, UserRole, Patient, ClassificationRule, AuditLog, Resource, Alert, StaffMember, Department, Notification, SystemMetric, ShiftSchedule } from "./types";
export { patients } from "./patients";
export { classificationRules } from "./rules";
export { auditLogs } from "./auditLogs";
export { resources } from "./resources";
export { alerts } from "./alerts";
export { staff, shiftSchedules } from "./staff";
export { departments } from "./departments";
export { notifications } from "./notifications";
export { systemMetrics, hourlyPatientLoad, wardDistribution } from "./systemMetrics";
