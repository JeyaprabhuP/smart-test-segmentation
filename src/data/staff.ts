import { StaffMember, ShiftSchedule } from "./types";

export const staff: StaffMember[] = [
  { id: "S001", name: "Dr. Wei Chen", role: "doctor", department: "ICU", shift: "day", onDuty: true, patientsAssigned: 5 },
  { id: "S002", name: "Dr. Anjali Patel", role: "doctor", department: "Cardiology", shift: "day", onDuty: true, patientsAssigned: 3 },
  { id: "S003", name: "Dr. Sarah Kim", role: "doctor", department: "General", shift: "day", onDuty: true, patientsAssigned: 4 },
  { id: "S004", name: "Dr. Emily Williams", role: "doctor", department: "Obstetrics", shift: "day", onDuty: true, patientsAssigned: 2 },
  { id: "S005", name: "Dr. Marcus Johnson", role: "doctor", department: "Neurology", shift: "night", onDuty: false, patientsAssigned: 0 },
  { id: "S006", name: "Dr. Lisa Gomez", role: "doctor", department: "ICU", shift: "night", onDuty: false, patientsAssigned: 0 },
  { id: "S007", name: "Nurse Rachel Adams", role: "nurse", department: "ICU", shift: "day", onDuty: true, patientsAssigned: 2 },
  { id: "S008", name: "Nurse Tom Bradley", role: "nurse", department: "ICU", shift: "day", onDuty: true, patientsAssigned: 2 },
  { id: "S009", name: "Nurse Maria Garcia", role: "nurse", department: "Cardiology", shift: "day", onDuty: true, patientsAssigned: 3 },
  { id: "S010", name: "Nurse James Park", role: "nurse", department: "General", shift: "day", onDuty: true, patientsAssigned: 4 },
  { id: "S011", name: "Nurse Linda Foster", role: "nurse", department: "General", shift: "day", onDuty: true, patientsAssigned: 3 },
  { id: "S012", name: "Nurse David Osei", role: "nurse", department: "Neurology", shift: "day", onDuty: true, patientsAssigned: 2 },
  { id: "S013", name: "Nurse Hannah White", role: "nurse", department: "Obstetrics", shift: "day", onDuty: true, patientsAssigned: 1 },
  { id: "S014", name: "Tech Alex Rivera", role: "technician", department: "Radiology", shift: "day", onDuty: true, patientsAssigned: 0 },
  { id: "S015", name: "Tech Yuki Sato", role: "technician", department: "Lab", shift: "day", onDuty: true, patientsAssigned: 0 },
  { id: "S016", name: "Nurse Keisha Brown", role: "nurse", department: "ICU", shift: "night", onDuty: false, patientsAssigned: 0 },
  { id: "S017", name: "Nurse Omar Hassan", role: "nurse", department: "General", shift: "night", onDuty: false, patientsAssigned: 0 },
  { id: "S018", name: "Tech Marta Perez", role: "technician", department: "Radiology", shift: "night", onDuty: false, patientsAssigned: 0 },
];

export const shiftSchedules: ShiftSchedule[] = [
  { id: "SH001", staffId: "S001", staffName: "Dr. Wei Chen", role: "Doctor", department: "ICU", date: "2026-03-19", shift: "day", status: "on-duty" },
  { id: "SH002", staffId: "S002", staffName: "Dr. Anjali Patel", role: "Doctor", department: "Cardiology", date: "2026-03-19", shift: "day", status: "on-duty" },
  { id: "SH003", staffId: "S003", staffName: "Dr. Sarah Kim", role: "Doctor", department: "General", date: "2026-03-19", shift: "day", status: "on-duty" },
  { id: "SH004", staffId: "S004", staffName: "Dr. Emily Williams", role: "Doctor", department: "Obstetrics", date: "2026-03-19", shift: "day", status: "on-duty" },
  { id: "SH005", staffId: "S005", staffName: "Dr. Marcus Johnson", role: "Doctor", department: "Neurology", date: "2026-03-19", shift: "night", status: "scheduled" },
  { id: "SH006", staffId: "S006", staffName: "Dr. Lisa Gomez", role: "Doctor", department: "ICU", date: "2026-03-19", shift: "night", status: "scheduled" },
  { id: "SH007", staffId: "S007", staffName: "Nurse Rachel Adams", role: "Nurse", department: "ICU", date: "2026-03-19", shift: "day", status: "on-duty" },
  { id: "SH008", staffId: "S008", staffName: "Nurse Tom Bradley", role: "Nurse", department: "ICU", date: "2026-03-19", shift: "day", status: "on-duty" },
  { id: "SH009", staffId: "S016", staffName: "Nurse Keisha Brown", role: "Nurse", department: "ICU", date: "2026-03-19", shift: "night", status: "scheduled" },
  { id: "SH010", staffId: "S009", staffName: "Nurse Maria Garcia", role: "Nurse", department: "Cardiology", date: "2026-03-19", shift: "day", status: "on-duty" },
  { id: "SH011", staffId: "S010", staffName: "Nurse James Park", role: "Nurse", department: "General", date: "2026-03-18", shift: "day", status: "completed" },
  { id: "SH012", staffId: "S017", staffName: "Nurse Omar Hassan", role: "Nurse", department: "General", date: "2026-03-18", shift: "night", status: "completed" },
];
