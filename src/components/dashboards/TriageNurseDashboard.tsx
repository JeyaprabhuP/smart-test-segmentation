import { useState } from "react";
import { motion } from "framer-motion";
import {
  UserPlus, ListChecks, Activity, AlertTriangle, Heart, Thermometer,
  Wind, Droplets, ClipboardList, Stethoscope, Brain, CheckCircle2,
  Clock, Search, ArrowUpDown, BedDouble, User, FileText, Zap
} from "lucide-react";
import { patients as allPatients } from "@/data/patients";
import { classifyPatientSeverity, createPatient } from "@/services/api";
import { Patient, Severity } from "@/data/types";
import { useRole } from "@/context/RoleContext";
import StatCard from "@/components/StatCard";
import SeverityBadge from "@/components/SeverityBadge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// ─── Overview ───────────────────────────────────────────────
const TriageOverview = () => {
  const waiting = allPatients.filter(p => p.status === "waiting" || p.status === "registered");
  const admitted = allPatients.filter(p => p.status === "admitted");
  const critical = waiting.filter(p => p.severity === "critical").length;
  const moderate = waiting.filter(p => p.severity === "moderate").length;
  const stable = waiting.filter(p => p.severity === "stable").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-foreground flex items-center gap-2">
          <Activity className="w-6 h-6 text-secondary" /> Triage Overview
        </h1>
        <p className="text-muted-foreground text-sm mt-1">Today's screening summary</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="In Queue" value={waiting.length} subtitle="Awaiting admission" icon={<ListChecks className="w-5 h-5" />} />
        <StatCard title="Critical" value={critical} subtitle="Immediate attention" icon={<AlertTriangle className="w-5 h-5" />} variant="critical" />
        <StatCard title="Moderate" value={moderate} subtitle="Close monitoring" icon={<Heart className="w-5 h-5" />} variant="moderate" />
        <StatCard title="Stable" value={stable} subtitle="Standard care" icon={<Activity className="w-5 h-5" />} variant="stable" />
      </div>

      {/* Recent queue */}
      <div className="bg-card rounded-xl border border-border p-5">
        <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
          <Clock className="w-4 h-4 text-secondary" /> Recent Registrations
        </h3>
        <div className="space-y-3">
          {waiting.slice(0, 5).map(p => (
            <div key={p.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                  {p.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.age}y {p.gender} · {p.chiefComplaint?.slice(0, 50)}...</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <SeverityBadge severity={p.severity} />
                <Badge variant="outline" className="text-xs">{p.status}</Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── Patient Intake Form ────────────────────────────────────
const PatientIntakeForm = () => {
  const { user } = useRole();
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<{ severity: Severity; doctor: string } | null>(null);
  const [form, setForm] = useState({
    name: "", age: "", gender: "M", chiefComplaint: "", allergies: "",
    heartRate: "", bloodPressure: "", temperature: "", oxygenSaturation: "", respiratoryRate: "",
    symptoms: [] as string[],
    historyNotes: "",
  });

  const symptomOptions = [
    "Chest Pain", "Shortness of Breath", "Fever", "Headache", "Dizziness",
    "Nausea/Vomiting", "Abdominal Pain", "Weakness", "Confusion", "Bleeding"
  ];

  const toggleSymptom = (s: string) => {
    setForm(prev => ({
      ...prev,
      symptoms: prev.symptoms.includes(s) ? prev.symptoms.filter(x => x !== s) : [...prev.symptoms, s]
    }));
  };

  const doctorMap: Record<Severity, string> = {
    critical: "Dr. Chen (ICU)",
    moderate: "Dr. Patel (Cardiology)",
    stable: "Dr. Kim (General Medicine)",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const vitals = {
      heartRate: Number(form.heartRate) || 80,
      bloodPressure: form.bloodPressure || "120/80",
      temperature: Number(form.temperature) || 36.8,
      oxygenSaturation: Number(form.oxygenSaturation) || 98,
      respiratoryRate: Number(form.respiratoryRate) || 16,
    };

    const severity = classifyPatientSeverity(vitals, form.chiefComplaint);
    const doctor = doctorMap[severity];

    await createPatient({
      name: form.name,
      age: Number(form.age),
      gender: form.gender,
      severity,
      aiSeverity: severity,
      ward: "—",
      bed: "—",
      doctor: "—",
      admissionDate: "—",
      diagnosis: form.chiefComplaint,
      status: "waiting",
      triageNurse: user?.name || "Unknown",
      registeredAt: new Date().toISOString(),
      chiefComplaint: form.chiefComplaint,
      allergies: form.allergies,
      vitals,
      history: [{ date: new Date().toISOString().split("T")[0], event: `Registered - ${form.chiefComplaint}`, severity }],
      tasks: [],
    });

    setResult({ severity, doctor });
    setSubmitted(true);
  };

  if (submitted && result) {
    return (
      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-lg mx-auto text-center space-y-6">
          <div className="w-20 h-20 mx-auto rounded-full bg-stable/10 flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-stable" />
          </div>
          <h2 className="text-2xl font-extrabold text-foreground">Patient Registered Successfully</h2>
          <div className="bg-card rounded-xl border border-border p-6 text-left space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Patient</span>
              <span className="font-semibold text-foreground">{form.name}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground flex items-center gap-1"><Brain className="w-3.5 h-3.5" /> AI Severity</span>
              <SeverityBadge severity={result.severity} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground flex items-center gap-1"><Stethoscope className="w-3.5 h-3.5" /> Recommended Doctor</span>
              <span className="font-semibold text-foreground">{result.doctor}</span>
            </div>
          </div>
          <Button onClick={() => { setSubmitted(false); setResult(null); setForm({ name: "", age: "", gender: "M", chiefComplaint: "", allergies: "", heartRate: "", bloodPressure: "", temperature: "", oxygenSaturation: "", respiratoryRate: "", symptoms: [], historyNotes: "" }); }} className="bg-secondary text-secondary-foreground">
            <UserPlus className="w-4 h-4 mr-2" /> Register Another Patient
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-foreground flex items-center gap-2">
          <UserPlus className="w-6 h-6 text-secondary" /> Patient Intake
        </h1>
        <p className="text-muted-foreground text-sm mt-1">Register a new patient for triage assessment</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Demographics */}
        <div className="bg-card rounded-xl border border-border p-5 space-y-4">
          <h3 className="font-semibold text-foreground flex items-center gap-2"><User className="w-4 h-4 text-secondary" /> Demographics</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div><Label>Full Name *</Label><Input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Patient name" required /></div>
            <div><Label>Age *</Label><Input type="number" value={form.age} onChange={e => setForm(p => ({ ...p, age: e.target.value }))} placeholder="Age" required /></div>
            <div><Label>Gender *</Label>
              <Select value={form.gender} onValueChange={v => setForm(p => ({ ...p, gender: v }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="M">Male</SelectItem>
                  <SelectItem value="F">Female</SelectItem>
                  <SelectItem value="O">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Chief Complaint */}
        <div className="bg-card rounded-xl border border-border p-5 space-y-4">
          <h3 className="font-semibold text-foreground flex items-center gap-2"><FileText className="w-4 h-4 text-secondary" /> Chief Complaint</h3>
          <Textarea value={form.chiefComplaint} onChange={e => setForm(p => ({ ...p, chiefComplaint: e.target.value }))} placeholder="Describe the patient's primary complaint..." required />
          <div>
            <Label className="mb-2 block">Symptoms</Label>
            <div className="flex flex-wrap gap-2">
              {symptomOptions.map(s => (
                <button key={s} type="button" onClick={() => toggleSymptom(s)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                    form.symptoms.includes(s) ? "bg-secondary text-secondary-foreground border-secondary" : "bg-muted text-muted-foreground border-border hover:border-secondary/50"
                  }`}
                >{s}</button>
              ))}
            </div>
          </div>
          <div><Label>Allergies</Label><Input value={form.allergies} onChange={e => setForm(p => ({ ...p, allergies: e.target.value }))} placeholder="Known allergies (if any)" /></div>
        </div>

        {/* Vitals */}
        <div className="bg-card rounded-xl border border-border p-5 space-y-4">
          <h3 className="font-semibold text-foreground flex items-center gap-2"><Activity className="w-4 h-4 text-secondary" /> Initial Vitals</h3>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            <div><Label className="flex items-center gap-1"><Heart className="w-3.5 h-3.5 text-critical" /> HR (bpm)</Label><Input type="number" value={form.heartRate} onChange={e => setForm(p => ({ ...p, heartRate: e.target.value }))} placeholder="80" /></div>
            <div><Label className="flex items-center gap-1"><Activity className="w-3.5 h-3.5" /> BP</Label><Input value={form.bloodPressure} onChange={e => setForm(p => ({ ...p, bloodPressure: e.target.value }))} placeholder="120/80" /></div>
            <div><Label className="flex items-center gap-1"><Thermometer className="w-3.5 h-3.5 text-moderate" /> Temp (°C)</Label><Input type="number" step="0.1" value={form.temperature} onChange={e => setForm(p => ({ ...p, temperature: e.target.value }))} placeholder="36.8" /></div>
            <div><Label className="flex items-center gap-1"><Droplets className="w-3.5 h-3.5 text-secondary" /> O₂ (%)</Label><Input type="number" value={form.oxygenSaturation} onChange={e => setForm(p => ({ ...p, oxygenSaturation: e.target.value }))} placeholder="98" /></div>
            <div><Label className="flex items-center gap-1"><Wind className="w-3.5 h-3.5 text-stable" /> RR (/min)</Label><Input type="number" value={form.respiratoryRate} onChange={e => setForm(p => ({ ...p, respiratoryRate: e.target.value }))} placeholder="16" /></div>
          </div>
        </div>

        {/* History Notes */}
        <div className="bg-card rounded-xl border border-border p-5 space-y-4">
          <h3 className="font-semibold text-foreground flex items-center gap-2"><ClipboardList className="w-4 h-4 text-secondary" /> History Notes</h3>
          <Textarea value={form.historyNotes} onChange={e => setForm(p => ({ ...p, historyNotes: e.target.value }))} placeholder="Relevant medical history, current medications..." />
        </div>

        <Button type="submit" size="lg" className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 h-12 text-base">
          <Zap className="w-5 h-5 mr-2" /> Submit for AI Triage Classification
        </Button>
      </form>
    </div>
  );
};

// ─── Triage Queue ───────────────────────────────────────────
const TriageQueue = () => {
  const queue = allPatients
    .filter(p => p.status === "waiting" || p.status === "registered")
    .sort((a, b) => {
      const order = { critical: 0, moderate: 1, stable: 2 };
      return order[a.severity] - order[b.severity];
    });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-foreground flex items-center gap-2">
          <ListChecks className="w-6 h-6 text-secondary" /> Triage Queue
        </h1>
        <p className="text-muted-foreground text-sm mt-1">{queue.length} patients awaiting admission · Sorted by severity</p>
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead><User className="w-3.5 h-3.5 inline mr-1" />Patient</TableHead>
              <TableHead><AlertTriangle className="w-3.5 h-3.5 inline mr-1" />Severity</TableHead>
              <TableHead><FileText className="w-3.5 h-3.5 inline mr-1" />Chief Complaint</TableHead>
              <TableHead><Heart className="w-3.5 h-3.5 inline mr-1" />HR</TableHead>
              <TableHead><Droplets className="w-3.5 h-3.5 inline mr-1" />O₂</TableHead>
              <TableHead><Clock className="w-3.5 h-3.5 inline mr-1" />Registered</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {queue.map(p => (
              <TableRow key={p.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                      {p.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <span className="font-medium text-foreground text-sm">{p.name}</span>
                      <p className="text-xs text-muted-foreground">{p.age}y {p.gender}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell><SeverityBadge severity={p.severity} /></TableCell>
                <TableCell className="text-sm text-muted-foreground max-w-[200px] truncate">{p.chiefComplaint || p.diagnosis}</TableCell>
                <TableCell className={`font-mono text-sm ${p.vitals.heartRate > 100 ? "text-critical font-bold" : ""}`}>{p.vitals.heartRate}</TableCell>
                <TableCell className={`font-mono text-sm ${p.vitals.oxygenSaturation < 92 ? "text-critical font-bold" : ""}`}>{p.vitals.oxygenSaturation}%</TableCell>
                <TableCell className="text-xs text-muted-foreground">{p.registeredAt?.split("T")[0] || "—"}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={`text-xs ${p.status === "registered" ? "border-moderate/40 text-moderate" : "border-secondary/40 text-secondary"}`}>
                    {p.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
            {queue.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-12 text-muted-foreground">
                  <CheckCircle2 className="w-10 h-10 mx-auto mb-3 opacity-40" />
                  <p>No patients in the triage queue</p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

// ─── Main Dashboard Router ──────────────────────────────────
const TriageNurseDashboard = ({ page }: { page: string }) => {
  switch (page) {
    case "intake": return <PatientIntakeForm />;
    case "queue": return <TriageQueue />;
    default: return <TriageOverview />;
  }
};

export default TriageNurseDashboard;
