import { Patient } from "./types";

export const patients: Patient[] = [
  {
    id: "P001", name: "Maria Santos", age: 67, gender: "F", severity: "critical",
    ward: "ICU", bed: "ICU-04", doctor: "Dr. Chen", admissionDate: "2026-03-17",
    diagnosis: "Acute respiratory distress syndrome", status: "admitted", triageNurse: "Nurse Amy Collins", registeredAt: "2026-03-17 06:30",
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
    ward: "Cardiology", bed: "C-12", doctor: "Dr. Patel", admissionDate: "2026-03-18",
    diagnosis: "Acute coronary syndrome", status: "admitted",
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
    ward: "General", bed: "G-08", doctor: "Dr. Kim", admissionDate: "2026-03-16",
    diagnosis: "Post-appendectomy recovery", status: "admitted",
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
    ward: "ICU", bed: "ICU-07", doctor: "Dr. Chen", admissionDate: "2026-03-15",
    diagnosis: "Sepsis - urinary source", status: "admitted",
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
    ward: "Neurology", bed: "N-03", doctor: "Dr. Patel", admissionDate: "2026-03-18",
    diagnosis: "Transient ischemic attack", status: "admitted",
    vitals: { heartRate: 88, bloodPressure: "140/90", temperature: 37.1, oxygenSaturation: 96, respiratoryRate: 18 },
    history: [{ date: "2026-03-18", event: "Admitted - TIA symptoms", severity: "moderate" }],
    tasks: [{ id: "T8", task: "MRI brain scheduled", priority: "moderate", done: false }],
  },
  {
    id: "P006", name: "David Kim", age: 29, gender: "M", severity: "stable",
    ward: "Orthopedics", bed: "O-11", doctor: "Dr. Kim", admissionDate: "2026-03-17",
    diagnosis: "Tibial fracture - post-ORIF", status: "admitted",
    vitals: { heartRate: 68, bloodPressure: "118/76", temperature: 36.6, oxygenSaturation: 99, respiratoryRate: 14 },
    history: [{ date: "2026-03-17", event: "Admitted - Fracture repair", severity: "stable" }],
    tasks: [{ id: "T9", task: "Physical therapy assessment", priority: "stable", done: false }],
  },
  {
    id: "P007", name: "Grace Okonkwo", age: 61, gender: "F", severity: "critical",
    ward: "ICU", bed: "ICU-02", doctor: "Dr. Chen", admissionDate: "2026-03-19",
    diagnosis: "Hypertensive emergency", status: "admitted",
    vitals: { heartRate: 145, bloodPressure: "200/120", temperature: 38.5, oxygenSaturation: 87, respiratoryRate: 30 },
    history: [{ date: "2026-03-19", event: "Admitted - Hypertensive crisis", severity: "critical" }],
    tasks: [
      { id: "T10", task: "IV Labetalol drip", priority: "critical", done: false },
      { id: "T11", task: "CT head stat", priority: "critical", done: false },
    ],
  },
  {
    id: "P008", name: "Thomas Berg", age: 43, gender: "M", severity: "stable",
    ward: "General", bed: "G-15", doctor: "Dr. Kim", admissionDate: "2026-03-18",
    diagnosis: "Observation - syncope workup", status: "discharged",
    vitals: { heartRate: 76, bloodPressure: "125/82", temperature: 36.9, oxygenSaturation: 97, respiratoryRate: 16 },
    history: [{ date: "2026-03-18", event: "Admitted - Observation", severity: "stable" }],
    tasks: [{ id: "T12", task: "Discharge planning", priority: "stable", done: true }],
  },
  {
    id: "P009", name: "Fatima Al-Rashid", age: 55, gender: "F", severity: "moderate",
    ward: "Cardiology", bed: "C-05", doctor: "Dr. Patel", admissionDate: "2026-03-19",
    diagnosis: "Atrial fibrillation with rapid ventricular response", status: "admitted",
    vitals: { heartRate: 108, bloodPressure: "135/88", temperature: 37.0, oxygenSaturation: 95, respiratoryRate: 22 },
    history: [
      { date: "2026-03-19", event: "Admitted - Palpitations & dizziness", severity: "moderate" },
      { date: "2026-03-19", event: "Started on IV Amiodarone", severity: "moderate" },
    ],
    tasks: [
      { id: "T13", task: "Echo scheduled for 14:00", priority: "moderate", done: false },
      { id: "T14", task: "Anticoagulation assessment", priority: "moderate", done: false },
    ],
  },
  {
    id: "P010", name: "Liam Murphy", age: 72, gender: "M", severity: "critical",
    ward: "ICU", bed: "ICU-09", doctor: "Dr. Chen", admissionDate: "2026-03-18",
    diagnosis: "Acute myocardial infarction - STEMI", status: "admitted",
    vitals: { heartRate: 52, bloodPressure: "85/55", temperature: 36.4, oxygenSaturation: 89, respiratoryRate: 26 },
    history: [
      { date: "2026-03-18", event: "Admitted - STEMI, cath lab activated", severity: "critical" },
      { date: "2026-03-18", event: "PCI performed - LAD stent placed", severity: "critical" },
      { date: "2026-03-19", event: "Post-PCI hypotension requiring pressors", severity: "critical" },
    ],
    tasks: [
      { id: "T15", task: "Repeat troponin q6h", priority: "critical", done: false },
      { id: "T16", task: "Cardiology follow-up consult", priority: "critical", done: false },
      { id: "T17", task: "Adjust vasopressor dose", priority: "critical", done: false },
    ],
  },
  {
    id: "P011", name: "Sophie Laurent", age: 38, gender: "F", severity: "stable",
    ward: "Obstetrics", bed: "OB-02", doctor: "Dr. Williams", admissionDate: "2026-03-19",
    diagnosis: "Post-cesarean recovery", status: "admitted",
    vitals: { heartRate: 78, bloodPressure: "115/72", temperature: 36.7, oxygenSaturation: 99, respiratoryRate: 15 },
    history: [{ date: "2026-03-19", event: "C-section delivery - healthy neonate", severity: "stable" }],
    tasks: [
      { id: "T18", task: "Post-op wound check", priority: "stable", done: false },
      { id: "T19", task: "Lactation consult", priority: "stable", done: false },
    ],
  },
  {
    id: "P012", name: "Hiroshi Tanaka", age: 83, gender: "M", severity: "moderate",
    ward: "Geriatrics", bed: "GR-06", doctor: "Dr. Williams", admissionDate: "2026-03-17",
    diagnosis: "Pneumonia - community acquired", status: "admitted",
    vitals: { heartRate: 95, bloodPressure: "130/85", temperature: 38.2, oxygenSaturation: 92, respiratoryRate: 24 },
    history: [
      { date: "2026-03-17", event: "Admitted - Cough, fever, hypoxia", severity: "moderate" },
      { date: "2026-03-18", event: "Started IV antibiotics", severity: "moderate" },
      { date: "2026-03-19", event: "Slight improvement, still febrile", severity: "moderate" },
    ],
    tasks: [
      { id: "T20", task: "Sputum culture follow-up", priority: "moderate", done: false },
      { id: "T21", task: "Switch to oral antibiotics if afebrile", priority: "stable", done: false },
    ],
  },
  {
    id: "P013", name: "Priya Sharma", age: 27, gender: "F", severity: "stable",
    ward: "General", bed: "G-22", doctor: "Dr. Kim", admissionDate: "2026-03-19",
    diagnosis: "Acute gastroenteritis - dehydration", status: "admitted",
    vitals: { heartRate: 82, bloodPressure: "110/70", temperature: 37.3, oxygenSaturation: 98, respiratoryRate: 16 },
    history: [{ date: "2026-03-19", event: "Admitted - Dehydration, IV fluids started", severity: "stable" }],
    tasks: [{ id: "T22", task: "Recheck electrolytes at 16:00", priority: "stable", done: false }],
  },
  {
    id: "P014", name: "Carlos Mendez", age: 60, gender: "M", severity: "moderate",
    ward: "Neurology", bed: "N-08", doctor: "Dr. Patel", admissionDate: "2026-03-18",
    diagnosis: "New-onset seizures - under investigation", status: "admitted",
    vitals: { heartRate: 85, bloodPressure: "142/88", temperature: 37.0, oxygenSaturation: 97, respiratoryRate: 18 },
    history: [
      { date: "2026-03-18", event: "Admitted - Witnessed generalized seizure", severity: "moderate" },
      { date: "2026-03-19", event: "EEG performed - pending read", severity: "moderate" },
    ],
    tasks: [
      { id: "T23", task: "MRI brain with contrast", priority: "moderate", done: false },
      { id: "T24", task: "Levetiracetam level check", priority: "stable", done: false },
    ],
  },
  {
    id: "P015", name: "Anna Kowalski", age: 48, gender: "F", severity: "critical",
    ward: "ICU", bed: "ICU-11", doctor: "Dr. Chen", admissionDate: "2026-03-19",
    diagnosis: "Diabetic ketoacidosis", status: "admitted",
    vitals: { heartRate: 118, bloodPressure: "95/62", temperature: 37.8, oxygenSaturation: 91, respiratoryRate: 34 },
    history: [
      { date: "2026-03-19", event: "Admitted - DKA, pH 7.1, glucose 520", severity: "critical" },
      { date: "2026-03-19", event: "Insulin drip initiated, aggressive IVF", severity: "critical" },
    ],
    tasks: [
      { id: "T25", task: "BMP q2h until gap closes", priority: "critical", done: false },
      { id: "T26", task: "Endocrine consult", priority: "critical", done: false },
      { id: "T27", task: "Transition to subQ insulin when eating", priority: "moderate", done: false },
    ],
  },
  // Waiting / Registered patients (not yet admitted)
  {
    id: "P016", name: "Michael Torres", age: 55, gender: "M", severity: "moderate",
    ward: "—", bed: "—", doctor: "—", admissionDate: "—",
    diagnosis: "Chest pain - rule out ACS", status: "waiting", triageNurse: "Nurse Amy Collins", registeredAt: "2026-03-20 08:15",
    aiSeverity: "moderate", chiefComplaint: "Crushing chest pain radiating to left arm, onset 2 hours ago",
    vitals: { heartRate: 98, bloodPressure: "155/95", temperature: 37.1, oxygenSaturation: 95, respiratoryRate: 22 },
    history: [{ date: "2026-03-20", event: "Registered - Chest pain, triage assessment", severity: "moderate" }],
    tasks: [],
  },
  {
    id: "P017", name: "Sarah Johnson", age: 32, gender: "F", severity: "stable",
    ward: "—", bed: "—", doctor: "—", admissionDate: "—",
    diagnosis: "Migraine with aura", status: "waiting", triageNurse: "Nurse David Lee", registeredAt: "2026-03-20 08:30",
    aiSeverity: "stable", chiefComplaint: "Severe headache with visual disturbances, nausea",
    vitals: { heartRate: 76, bloodPressure: "125/80", temperature: 36.9, oxygenSaturation: 99, respiratoryRate: 16 },
    history: [{ date: "2026-03-20", event: "Registered - Migraine symptoms", severity: "stable" }],
    tasks: [],
  },
  {
    id: "P018", name: "William Chen", age: 70, gender: "M", severity: "critical",
    ward: "—", bed: "—", doctor: "—", admissionDate: "—",
    diagnosis: "Acute stroke symptoms", status: "registered", triageNurse: "Nurse Amy Collins", registeredAt: "2026-03-20 09:00",
    aiSeverity: "critical", chiefComplaint: "Sudden onset slurred speech, left-sided weakness, facial droop",
    vitals: { heartRate: 105, bloodPressure: "190/110", temperature: 37.2, oxygenSaturation: 93, respiratoryRate: 20 },
    history: [{ date: "2026-03-20", event: "Registered - Stroke symptoms, CODE STROKE activated", severity: "critical" }],
    tasks: [],
  },
];
