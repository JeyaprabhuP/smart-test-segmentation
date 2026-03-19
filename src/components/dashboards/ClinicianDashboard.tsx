import { useState } from "react";
import { Heart, Thermometer, Wind, Droplets, Activity, CheckCircle2, Circle, ChevronRight } from "lucide-react";
import SeverityBadge from "@/components/SeverityBadge";
import { patients, Patient } from "@/data/mockData";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

const PatientDetail = ({ patient, onBack }: { patient: Patient; onBack: () => void }) => {
  const [tasks, setTasks] = useState(patient.tasks);

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const vitals = [
    { label: "Heart Rate", value: `${patient.vitals.heartRate} bpm`, icon: <Heart className="w-4 h-4" />, warn: patient.vitals.heartRate > 100 },
    { label: "Blood Pressure", value: patient.vitals.bloodPressure, icon: <Activity className="w-4 h-4" />, warn: false },
    { label: "Temperature", value: `${patient.vitals.temperature}°C`, icon: <Thermometer className="w-4 h-4" />, warn: patient.vitals.temperature > 38 },
    { label: "O₂ Saturation", value: `${patient.vitals.oxygenSaturation}%`, icon: <Droplets className="w-4 h-4" />, warn: patient.vitals.oxygenSaturation < 92 },
    { label: "Resp. Rate", value: `${patient.vitals.respiratoryRate}/min`, icon: <Wind className="w-4 h-4" />, warn: patient.vitals.respiratoryRate > 24 },
  ];

  return (
    <div className="space-y-6">
      <button onClick={onBack} className="text-sm text-muted-foreground hover:text-foreground transition-colors">← Back to patients</button>

      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xl font-bold">
          {patient.name.split(" ").map(n => n[0]).join("")}
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-foreground">{patient.name}</h1>
          <p className="text-sm text-muted-foreground">{patient.age}y {patient.gender} · {patient.ward} · Bed {patient.bed} · {patient.doctor}</p>
        </div>
        <SeverityBadge severity={patient.severity} />
      </div>

      {/* Vitals Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {vitals.map(v => (
          <div key={v.label} className={`bg-card rounded-xl border p-4 ${v.warn ? "border-critical/30" : "border-border"}`}>
            <div className={`flex items-center gap-2 mb-1 text-xs font-medium ${v.warn ? "text-critical" : "text-muted-foreground"}`}>
              {v.icon} {v.label}
            </div>
            <p className={`text-xl font-bold ${v.warn ? "text-critical animate-pulse-critical" : "text-foreground"}`}>{v.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Timeline */}
        <div className="bg-card rounded-xl border border-border p-5">
          <h3 className="font-semibold text-foreground mb-4">Patient Timeline</h3>
          <div className="space-y-4">
            {patient.history.map((h, i) => (
              <div key={i} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className={`w-3 h-3 rounded-full ${
                    h.severity === "critical" ? "bg-critical" : h.severity === "moderate" ? "bg-moderate" : "bg-stable"
                  }`} />
                  {i < patient.history.length - 1 && <div className="w-px h-full bg-border" />}
                </div>
                <div className="pb-4">
                  <p className="text-sm font-medium text-foreground">{h.event}</p>
                  <p className="text-xs text-muted-foreground">{h.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tasks */}
        <div className="bg-card rounded-xl border border-border p-5">
          <h3 className="font-semibold text-foreground mb-4">Interventions</h3>
          <div className="space-y-3">
            {tasks.map(t => (
              <div key={t.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Checkbox checked={t.done} onCheckedChange={() => toggleTask(t.id)} />
                <span className={`flex-1 text-sm ${t.done ? "line-through text-muted-foreground" : "text-foreground"}`}>{t.task}</span>
                <SeverityBadge severity={t.priority} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Triage */}
      <div className="bg-accent/50 rounded-xl border border-secondary/20 p-5">
        <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
          <Activity className="w-4 h-4 text-secondary" /> AI Triage Recommendation
        </h3>
        <p className="text-sm text-foreground">
          {patient.severity === "critical"
            ? "⚠️ Immediate intervention required. Multiple vitals exceeding critical thresholds. Recommend ICU escalation and specialist consult within 15 minutes."
            : patient.severity === "moderate"
            ? "⚡ Close monitoring advised. One or more vitals trending toward critical. Schedule follow-up assessment within 1 hour."
            : "✅ Patient stable. Continue standard monitoring protocol. Eligible for discharge planning review."}
        </p>
      </div>
    </div>
  );
};

const ClinicianPatientList = ({ onSelect }: { onSelect: (p: Patient) => void }) => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-extrabold text-foreground">My Patients</h1>
      <p className="text-muted-foreground text-sm mt-1">Click a patient to view details, vitals & triage recommendations</p>
    </div>

    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Patient</TableHead>
            <TableHead>Ward / Bed</TableHead>
            <TableHead>Doctor</TableHead>
            <TableHead>Severity</TableHead>
            <TableHead>HR</TableHead>
            <TableHead>O₂</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patients.map(p => (
            <TableRow key={p.id} className="cursor-pointer hover:bg-muted/50" onClick={() => onSelect(p)}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                    {p.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <span className="font-medium text-foreground">{p.name}</span>
                    <p className="text-xs text-muted-foreground">{p.age}y {p.gender}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-sm">{p.ward} · {p.bed}</TableCell>
              <TableCell className="text-sm">{p.doctor}</TableCell>
              <TableCell><SeverityBadge severity={p.severity} /></TableCell>
              <TableCell className={`font-mono text-sm ${p.vitals.heartRate > 100 ? "text-critical font-bold" : ""}`}>{p.vitals.heartRate}</TableCell>
              <TableCell className={`font-mono text-sm ${p.vitals.oxygenSaturation < 92 ? "text-critical font-bold" : ""}`}>{p.vitals.oxygenSaturation}%</TableCell>
              <TableCell><ChevronRight className="w-4 h-4 text-muted-foreground" /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  </div>
);

const ClinicianTaskList = () => {
  const allTasks = patients.flatMap(p => p.tasks.map(t => ({ ...t, patient: p.name, patientSeverity: p.severity })));
  const [tasks, setTasks] = useState(allTasks);

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const pending = tasks.filter(t => !t.done).sort((a, b) => {
    const order = { critical: 0, moderate: 1, stable: 2 };
    return order[a.priority] - order[b.priority];
  });
  const completed = tasks.filter(t => t.done);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-foreground">Task List</h1>
        <p className="text-muted-foreground text-sm mt-1">{pending.length} pending · {completed.length} completed</p>
      </div>

      <div className="space-y-2">
        {pending.map(t => (
          <div key={t.id} className="flex items-center gap-3 bg-card rounded-xl border border-border p-4">
            <Checkbox checked={false} onCheckedChange={() => toggleTask(t.id)} />
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{t.task}</p>
              <p className="text-xs text-muted-foreground">{t.patient}</p>
            </div>
            <SeverityBadge severity={t.priority} />
          </div>
        ))}
      </div>

      {completed.length > 0 && (
        <>
          <h3 className="text-sm font-semibold text-muted-foreground">Completed</h3>
          <div className="space-y-2 opacity-60">
            {completed.map(t => (
              <div key={t.id} className="flex items-center gap-3 bg-card rounded-xl border border-border p-4">
                <Checkbox checked={true} onCheckedChange={() => toggleTask(t.id)} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground line-through">{t.task}</p>
                  <p className="text-xs text-muted-foreground">{t.patient}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const ClinicianDashboard = ({ page }: { page: string }) => {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  if (page === "tasks") return <ClinicianTaskList />;

  if (selectedPatient) {
    return <PatientDetail patient={selectedPatient} onBack={() => setSelectedPatient(null)} />;
  }

  return <ClinicianPatientList onSelect={setSelectedPatient} />;
};

export default ClinicianDashboard;
