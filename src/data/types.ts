export type Severity = "critical" | "moderate" | "stable";
export type UserRole = "admin" | "manager" | "clinician";

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  severity: Severity;
  ward: string;
  bed: string;
  doctor: string;
  admissionDate: string;
  diagnosis: string;
  vitals: {
    heartRate: number;
    bloodPressure: string;
    temperature: number;
    oxygenSaturation: number;
    respiratoryRate: number;
  };
  history: { date: string; event: string; severity: Severity }[];
  tasks: { id: string; task: string; priority: Severity; done: boolean }[];
}

export interface ClassificationRule {
  id: string;
  name: string;
  metric: string;
  operator: string;
  threshold: number;
  severity: Severity;
  active: boolean;
  lastModified: string;
}

export interface AuditLog {
  id: string;
  user: string;
  action: string;
  target: string;
  timestamp: string;
  category: "rule" | "patient" | "system" | "report" | "user";
}

export interface Resource {
  type: string;
  total: number;
  occupied: number;
  available: number;
}

export interface Alert {
  id: string;
  patient: string;
  message: string;
  severity: Severity;
  timestamp: string;
  read: boolean;
}

export interface StaffMember {
  id: string;
  name: string;
  role: "doctor" | "nurse" | "technician" | "admin";
  department: string;
  shift: "day" | "night" | "swing";
  onDuty: boolean;
  patientsAssigned: number;
}

export interface Department {
  id: string;
  name: string;
  head: string;
  totalBeds: number;
  occupiedBeds: number;
  staffCount: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "alert" | "info" | "warning" | "success";
  timestamp: string;
  read: boolean;
  targetRole: UserRole | "all";
}

export interface SystemMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  trend: "up" | "down" | "stable";
  changePercent: number;
}

export interface ShiftSchedule {
  id: string;
  staffId: string;
  staffName: string;
  role: string;
  department: string;
  date: string;
  shift: "day" | "night" | "swing";
  status: "scheduled" | "on-duty" | "completed" | "absent";
}

export interface HourlyVital {
  patientId: string;
  timestamp: string;
  heartRate: number;
  systolicBP: number;
  diastolicBP: number;
  temperature: number;
  oxygenSaturation: number;
  respiratoryRate: number;
}

export interface LabResult {
  parameter: string;
  value: string;
  unit: string;
  normalRange: string;
  flag: "normal" | "high" | "low";
}

export interface LabReport {
  id: string;
  patientId: string;
  testName: string;
  category: string;
  orderedBy: string;
  orderedAt: string;
  resultAt: string;
  status: "completed" | "pending" | "in-progress";
  results: LabResult[];
}

export interface UserAccount {
  id: string;
  email: string;
  password: string;
  name: string;
  role: UserRole;
  department: string;
  avatar: string;
  lastLogin: string;
}
