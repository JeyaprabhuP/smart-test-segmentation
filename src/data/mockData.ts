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

export const patients: Patient[] = [
  {
    id: "P001", name: "Maria Santos", age: 67, gender: "F", severity: "critical",
    ward: "ICU", bed: "ICU-04", doctor: "Dr. Chen",
    admissionDate: "2026-03-17",
    vitals: { heartRate: 112, bloodPressure: "180/110", temperature: 39.2, oxygenSaturation: 88, respiratoryRate: 28 },
    history: [
      { date: "2026-03-17", event: "Admitted - Acute respiratory distress", severity: "critical" },
      { date: "2026-03-18", event: "Intubation performed", severity: "critical" },
      { date: "2026-03-19", event: "Vitals deteriorating", severity: "critical" },
    ],
    tasks: [
      { id: "T1", task: "ABG analysis stat", priority: "critical", done: false },
      { id: "T2", task: "Chest X-ray follow-up", priority: "moderate", done: true },
    ],
  },
  {
    id: "P002", name: "James O'Brien", age: 45, gender: "M", severity: "moderate",
    ward: "Cardiology", bed: "C-12", doctor: "Dr. Patel",
    admissionDate: "2026-03-18",
    vitals: { heartRate: 92, bloodPressure: "150/95", temperature: 37.4, oxygenSaturation: 94, respiratoryRate: 20 },
    history: [
      { date: "2026-03-18", event: "Admitted - Chest pain", severity: "moderate" },
      { date: "2026-03-19", event: "ECG shows ST elevation", severity: "moderate" },
    ],
    tasks: [
      { id: "T3", task: "Troponin levels recheck", priority: "moderate", done: false },
      { id: "T4", task: "Cardiology consult", priority: "moderate", done: false },
    ],
  },
  {
    id: "P003", name: "Aisha Rahman", age: 34, gender: "F", severity: "stable",
    ward: "General", bed: "G-08", doctor: "Dr. Kim",
    admissionDate: "2026-03-16",
    vitals: { heartRate: 72, bloodPressure: "120/80", temperature: 36.8, oxygenSaturation: 98, respiratoryRate: 16 },
    history: [
      { date: "2026-03-16", event: "Admitted - Post-op monitoring", severity: "stable" },
      { date: "2026-03-18", event: "Recovery on track", severity: "stable" },
    ],
    tasks: [
      { id: "T5", task: "Wound dressing change", priority: "stable", done: false },
    ],
  },
  {
    id: "P004", name: "Robert Chen", age: 78, gender: "M", severity: "critical",
    ward: "ICU", bed: "ICU-07", doctor: "Dr. Chen",
    admissionDate: "2026-03-15",
    vitals: { heartRate: 130, bloodPressure: "90/60", temperature: 38.8, oxygenSaturation: 85, respiratoryRate: 32 },
    history: [
      { date: "2026-03-15", event: "Admitted - Sepsis", severity: "critical" },
      { date: "2026-03-17", event: "Started vasopressors", severity: "critical" },
    ],
    tasks: [
      { id: "T6", task: "Blood culture results", priority: "critical", done: false },
      { id: "T7", task: "Adjust antibiotics", priority: "critical", done: false },
    ],
  },
  {
    id: "P005", name: "Elena Vasquez", age: 52, gender: "F", severity: "moderate",
    ward: "Neurology", bed: "N-03", doctor: "Dr. Patel",
    admissionDate: "2026-03-18",
    vitals: { heartRate: 88, bloodPressure: "140/90", temperature: 37.1, oxygenSaturation: 96, respiratoryRate: 18 },
    history: [
      { date: "2026-03-18", event: "Admitted - TIA symptoms", severity: "moderate" },
    ],
    tasks: [
      { id: "T8", task: "MRI brain scheduled", priority: "moderate", done: false },
    ],
  },
  {
    id: "P006", name: "David Kim", age: 29, gender: "M", severity: "stable",
    ward: "Orthopedics", bed: "O-11", doctor: "Dr. Kim",
    admissionDate: "2026-03-17",
    vitals: { heartRate: 68, bloodPressure: "118/76", temperature: 36.6, oxygenSaturation: 99, respiratoryRate: 14 },
    history: [
      { date: "2026-03-17", event: "Admitted - Fracture repair", severity: "stable" },
    ],
    tasks: [
      { id: "T9", task: "Physical therapy assessment", priority: "stable", done: false },
    ],
  },
  {
    id: "P007", name: "Grace Okonkwo", age: 61, gender: "F", severity: "critical",
    ward: "ICU", bed: "ICU-02", doctor: "Dr. Chen",
    admissionDate: "2026-03-19",
    vitals: { heartRate: 145, bloodPressure: "200/120", temperature: 38.5, oxygenSaturation: 87, respiratoryRate: 30 },
    history: [
      { date: "2026-03-19", event: "Admitted - Hypertensive crisis", severity: "critical" },
    ],
    tasks: [
      { id: "T10", task: "IV Labetalol drip", priority: "critical", done: false },
      { id: "T11", task: "CT head stat", priority: "critical", done: false },
    ],
  },
  {
    id: "P008", name: "Thomas Berg", age: 43, gender: "M", severity: "stable",
    ward: "General", bed: "G-15", doctor: "Dr. Kim",
    admissionDate: "2026-03-18",
    vitals: { heartRate: 76, bloodPressure: "125/82", temperature: 36.9, oxygenSaturation: 97, respiratoryRate: 16 },
    history: [
      { date: "2026-03-18", event: "Admitted - Observation", severity: "stable" },
    ],
    tasks: [
      { id: "T12", task: "Discharge planning", priority: "stable", done: false },
    ],
  },
];

export const classificationRules: ClassificationRule[] = [
  { id: "R001", name: "Tachycardia Critical", metric: "Heart Rate", operator: ">", threshold: 120, severity: "critical", active: true, lastModified: "2026-03-15" },
  { id: "R002", name: "Hypoxia Critical", metric: "O2 Saturation", operator: "<", threshold: 90, severity: "critical", active: true, lastModified: "2026-03-15" },
  { id: "R003", name: "Fever Moderate", metric: "Temperature", operator: ">", threshold: 38.5, severity: "moderate", active: true, lastModified: "2026-03-14" },
  { id: "R004", name: "Hypertension Moderate", metric: "Systolic BP", operator: ">", threshold: 160, severity: "moderate", active: true, lastModified: "2026-03-14" },
  { id: "R005", name: "Bradycardia Warning", metric: "Heart Rate", operator: "<", threshold: 50, severity: "moderate", active: false, lastModified: "2026-03-10" },
  { id: "R006", name: "Tachypnea Critical", metric: "Respiratory Rate", operator: ">", threshold: 30, severity: "critical", active: true, lastModified: "2026-03-16" },
];

export const auditLogs: AuditLog[] = [
  { id: "A001", user: "admin@vitaltriage.ai", action: "Updated Rule", target: "Tachycardia Critical (R001)", timestamp: "2026-03-19 08:30" },
  { id: "A002", user: "admin@vitaltriage.ai", action: "Created Rule", target: "Tachypnea Critical (R006)", timestamp: "2026-03-16 14:22" },
  { id: "A003", user: "manager@vitaltriage.ai", action: "Exported Report", target: "Weekly Triage Summary", timestamp: "2026-03-18 16:45" },
  { id: "A004", user: "admin@vitaltriage.ai", action: "Disabled Rule", target: "Bradycardia Warning (R005)", timestamp: "2026-03-10 09:15" },
  { id: "A005", user: "dr.chen@vitaltriage.ai", action: "Updated Patient", target: "Maria Santos (P001)", timestamp: "2026-03-19 07:00" },
];

export const resources: Resource[] = [
  { type: "ICU Beds", total: 12, occupied: 8, available: 4 },
  { type: "General Beds", total: 40, occupied: 28, available: 12 },
  { type: "Ventilators", total: 8, occupied: 5, available: 3 },
  { type: "Nurses on Shift", total: 24, occupied: 20, available: 4 },
  { type: "Doctors on Call", total: 8, occupied: 6, available: 2 },
];

export const alerts: Alert[] = [
  { id: "AL1", patient: "Grace Okonkwo", message: "BP critically elevated: 200/120", severity: "critical", timestamp: "2026-03-19 09:15", read: false },
  { id: "AL2", patient: "Robert Chen", message: "O2 saturation dropped to 85%", severity: "critical", timestamp: "2026-03-19 09:02", read: false },
  { id: "AL3", patient: "Maria Santos", message: "Heart rate elevated: 112 bpm", severity: "critical", timestamp: "2026-03-19 08:45", read: true },
  { id: "AL4", patient: "James O'Brien", message: "Troponin levels rising", severity: "moderate", timestamp: "2026-03-19 08:30", read: false },
  { id: "AL5", patient: "Elena Vasquez", message: "Scheduled MRI in 30 min", severity: "stable", timestamp: "2026-03-19 08:00", read: true },
];

export const hourlyPatientLoad = [
  { hour: "00:00", critical: 2, moderate: 3, stable: 5 },
  { hour: "04:00", critical: 2, moderate: 4, stable: 5 },
  { hour: "08:00", critical: 3, moderate: 3, stable: 4 },
  { hour: "12:00", critical: 3, moderate: 2, stable: 5 },
  { hour: "16:00", critical: 4, moderate: 3, stable: 4 },
  { hour: "20:00", critical: 3, moderate: 2, stable: 3 },
];

export const wardDistribution = [
  { ward: "ICU", critical: 3, moderate: 0, stable: 0 },
  { ward: "Cardiology", critical: 0, moderate: 1, stable: 0 },
  { ward: "Neurology", critical: 0, moderate: 1, stable: 0 },
  { ward: "General", critical: 0, moderate: 0, stable: 2 },
  { ward: "Orthopedics", critical: 0, moderate: 0, stable: 1 },
];
