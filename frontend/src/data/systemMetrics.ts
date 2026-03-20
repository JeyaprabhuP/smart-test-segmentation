import { SystemMetric } from "./types";

export const systemMetrics: SystemMetric[] = [
  { id: "SM001", name: "Avg. Triage Time", value: 4.2, unit: "min", trend: "down", changePercent: -12 },
  { id: "SM002", name: "Classification Accuracy", value: 96.8, unit: "%", trend: "up", changePercent: 1.5 },
  { id: "SM003", name: "Rules Triggered Today", value: 23, unit: "", trend: "up", changePercent: 15 },
  { id: "SM004", name: "Avg. Length of Stay", value: 3.7, unit: "days", trend: "stable", changePercent: 0 },
  { id: "SM005", name: "Patient Throughput", value: 42, unit: "patients/day", trend: "up", changePercent: 8 },
  { id: "SM006", name: "Readmission Rate", value: 4.1, unit: "%", trend: "down", changePercent: -5 },
  { id: "SM007", name: "Bed Turnover", value: 1.8, unit: "per day", trend: "up", changePercent: 3 },
  { id: "SM008", name: "Alert Response Time", value: 2.1, unit: "min", trend: "down", changePercent: -18 },
];

export const hourlyPatientLoad = [
  { hour: "00:00", critical: 2, moderate: 3, stable: 5 },
  { hour: "02:00", critical: 2, moderate: 3, stable: 5 },
  { hour: "04:00", critical: 2, moderate: 4, stable: 5 },
  { hour: "06:00", critical: 3, moderate: 3, stable: 5 },
  { hour: "08:00", critical: 3, moderate: 3, stable: 4 },
  { hour: "10:00", critical: 4, moderate: 4, stable: 5 },
  { hour: "12:00", critical: 5, moderate: 4, stable: 5 },
  { hour: "14:00", critical: 5, moderate: 3, stable: 6 },
  { hour: "16:00", critical: 4, moderate: 3, stable: 4 },
  { hour: "18:00", critical: 4, moderate: 3, stable: 4 },
  { hour: "20:00", critical: 3, moderate: 2, stable: 3 },
  { hour: "22:00", critical: 3, moderate: 2, stable: 4 },
];

export const wardDistribution = [
  { ward: "ICU", critical: 5, moderate: 0, stable: 0 },
  { ward: "Cardiology", critical: 0, moderate: 2, stable: 0 },
  { ward: "Neurology", critical: 0, moderate: 2, stable: 0 },
  { ward: "General", critical: 0, moderate: 0, stable: 3 },
  { ward: "Orthopedics", critical: 0, moderate: 0, stable: 1 },
  { ward: "Obstetrics", critical: 0, moderate: 0, stable: 1 },
  { ward: "Geriatrics", critical: 0, moderate: 1, stable: 0 },
  { ward: "Emergency", critical: 1, moderate: 1, stable: 2 },
];
