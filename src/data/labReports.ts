import { LabReport } from "./types";

export const labReports: LabReport[] = [
  { id: "LR001", patientId: "P001", testName: "Arterial Blood Gas", category: "Blood Gas", orderedBy: "Dr. Chen", orderedAt: "2026-03-19 06:00", resultAt: "2026-03-19 06:45", status: "completed", results: [
    { parameter: "pH", value: "7.28", unit: "", normalRange: "7.35-7.45", flag: "low" },
    { parameter: "pCO2", value: "52", unit: "mmHg", normalRange: "35-45", flag: "high" },
    { parameter: "pO2", value: "58", unit: "mmHg", normalRange: "80-100", flag: "low" },
    { parameter: "HCO3", value: "18", unit: "mEq/L", normalRange: "22-26", flag: "low" },
  ]},
  { id: "LR002", patientId: "P001", testName: "Complete Blood Count", category: "Hematology", orderedBy: "Dr. Chen", orderedAt: "2026-03-19 05:30", resultAt: "2026-03-19 06:30", status: "completed", results: [
    { parameter: "WBC", value: "18.5", unit: "x10³/µL", normalRange: "4.5-11.0", flag: "high" },
    { parameter: "Hemoglobin", value: "11.2", unit: "g/dL", normalRange: "12.0-16.0", flag: "low" },
    { parameter: "Platelets", value: "210", unit: "x10³/µL", normalRange: "150-400", flag: "normal" },
    { parameter: "Hematocrit", value: "34", unit: "%", normalRange: "36-46", flag: "low" },
  ]},
  { id: "LR003", patientId: "P002", testName: "Troponin I", category: "Cardiac", orderedBy: "Dr. Patel", orderedAt: "2026-03-19 08:00", resultAt: "2026-03-19 08:45", status: "completed", results: [
    { parameter: "Troponin I", value: "2.8", unit: "ng/mL", normalRange: "<0.04", flag: "high" },
  ]},
  { id: "LR004", patientId: "P002", testName: "Lipid Panel", category: "Chemistry", orderedBy: "Dr. Patel", orderedAt: "2026-03-19 07:00", resultAt: "2026-03-19 09:00", status: "completed", results: [
    { parameter: "Total Cholesterol", value: "245", unit: "mg/dL", normalRange: "<200", flag: "high" },
    { parameter: "LDL", value: "165", unit: "mg/dL", normalRange: "<100", flag: "high" },
    { parameter: "HDL", value: "38", unit: "mg/dL", normalRange: ">40", flag: "low" },
    { parameter: "Triglycerides", value: "210", unit: "mg/dL", normalRange: "<150", flag: "high" },
  ]},
  { id: "LR005", patientId: "P004", testName: "Blood Culture", category: "Microbiology", orderedBy: "Dr. Chen", orderedAt: "2026-03-18 22:00", resultAt: "2026-03-19 10:00", status: "completed", results: [
    { parameter: "Organism", value: "E. coli", unit: "", normalRange: "No growth", flag: "high" },
    { parameter: "Sensitivity", value: "Meropenem-S", unit: "", normalRange: "N/A", flag: "normal" },
  ]},
  { id: "LR006", patientId: "P004", testName: "Lactate", category: "Chemistry", orderedBy: "Dr. Chen", orderedAt: "2026-03-19 04:00", resultAt: "2026-03-19 04:30", status: "completed", results: [
    { parameter: "Lactate", value: "4.8", unit: "mmol/L", normalRange: "0.5-2.0", flag: "high" },
  ]},
  { id: "LR007", patientId: "P005", testName: "CT Angiogram Head", category: "Radiology", orderedBy: "Dr. Patel", orderedAt: "2026-03-18 16:00", resultAt: "2026-03-19 08:00", status: "completed", results: [
    { parameter: "Finding", value: "No acute infarct", unit: "", normalRange: "Normal", flag: "normal" },
    { parameter: "Vessels", value: "Mild atherosclerosis", unit: "", normalRange: "Normal", flag: "high" },
  ]},
  { id: "LR008", patientId: "P007", testName: "Basic Metabolic Panel", category: "Chemistry", orderedBy: "Dr. Chen", orderedAt: "2026-03-19 07:00", resultAt: "2026-03-19 07:45", status: "completed", results: [
    { parameter: "Sodium", value: "138", unit: "mEq/L", normalRange: "136-145", flag: "normal" },
    { parameter: "Potassium", value: "3.2", unit: "mEq/L", normalRange: "3.5-5.0", flag: "low" },
    { parameter: "Creatinine", value: "1.8", unit: "mg/dL", normalRange: "0.7-1.3", flag: "high" },
    { parameter: "BUN", value: "32", unit: "mg/dL", normalRange: "7-20", flag: "high" },
    { parameter: "Glucose", value: "142", unit: "mg/dL", normalRange: "70-100", flag: "high" },
  ]},
  { id: "LR009", patientId: "P010", testName: "Troponin I - Serial", category: "Cardiac", orderedBy: "Dr. Chen", orderedAt: "2026-03-19 06:00", resultAt: "2026-03-19 06:30", status: "completed", results: [
    { parameter: "Troponin I", value: "15.2", unit: "ng/mL", normalRange: "<0.04", flag: "high" },
    { parameter: "CK-MB", value: "45", unit: "ng/mL", normalRange: "<5", flag: "high" },
    { parameter: "BNP", value: "820", unit: "pg/mL", normalRange: "<100", flag: "high" },
  ]},
  { id: "LR010", patientId: "P015", testName: "Comprehensive Metabolic", category: "Chemistry", orderedBy: "Dr. Chen", orderedAt: "2026-03-19 05:00", resultAt: "2026-03-19 05:45", status: "completed", results: [
    { parameter: "Glucose", value: "520", unit: "mg/dL", normalRange: "70-100", flag: "high" },
    { parameter: "pH (venous)", value: "7.1", unit: "", normalRange: "7.35-7.45", flag: "low" },
    { parameter: "Anion Gap", value: "22", unit: "mEq/L", normalRange: "8-12", flag: "high" },
    { parameter: "Potassium", value: "5.8", unit: "mEq/L", normalRange: "3.5-5.0", flag: "high" },
    { parameter: "Bicarbonate", value: "10", unit: "mEq/L", normalRange: "22-26", flag: "low" },
  ]},
  { id: "LR011", patientId: "P012", testName: "Sputum Culture", category: "Microbiology", orderedBy: "Dr. Williams", orderedAt: "2026-03-18 10:00", resultAt: "2026-03-19 10:00", status: "completed", results: [
    { parameter: "Organism", value: "S. pneumoniae", unit: "", normalRange: "No growth", flag: "high" },
    { parameter: "Sensitivity", value: "Amoxicillin-S", unit: "", normalRange: "N/A", flag: "normal" },
  ]},
  { id: "LR012", patientId: "P009", testName: "Coagulation Panel", category: "Hematology", orderedBy: "Dr. Patel", orderedAt: "2026-03-19 09:00", resultAt: "", status: "pending", results: [] },
  { id: "LR013", patientId: "P003", testName: "Wound Culture", category: "Microbiology", orderedBy: "Dr. Kim", orderedAt: "2026-03-19 08:00", resultAt: "", status: "pending", results: [] },
  { id: "LR014", patientId: "P014", testName: "EEG Report", category: "Neurology", orderedBy: "Dr. Patel", orderedAt: "2026-03-19 09:00", resultAt: "", status: "pending", results: [] },
];
