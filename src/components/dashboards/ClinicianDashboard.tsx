import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart, Thermometer, Wind, Droplets, Activity, ChevronRight,
  Clock, FlaskConical, FileText, AlertTriangle, CheckCircle2,
  TrendingUp, TrendingDown, Minus, Search, Filter, ArrowUpDown,
  Beaker, Microscope, Syringe, Pill, ClipboardCheck, Eye
} from "lucide-react";
import SeverityBadge from "@/components/SeverityBadge";
import { patients } from "@/data/patients";
import { labReports } from "@/data/labReports";
import { hourlyVitals } from "@/data/hourlyVitals";
import { Patient } from "@/data/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";

// ─── Patient Detail View ────────────────────────────────────
const PatientDetail = ({ patient, onBack }: { patient: Patient; onBack: () => void }) => {
  const [tasks, setTasks] = useState(patient.tasks);
  const [activeTab, setActiveTab] = useState("vitals");

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const patientLabs = labReports.filter(l => l.patientId === patient.id);
  const patientHourly = hourlyVitals.filter(v => v.patientId === patient.id);

  const vitals = [
    { label: "Heart Rate", value: `${patient.vitals.heartRate} bpm`, icon: <Heart className="w-4 h-4" />, warn: patient.vitals.heartRate > 100 },
    { label: "Blood Pressure", value: patient.vitals.bloodPressure, icon: <Activity className="w-4 h-4" />, warn: false },
    { label: "Temperature", value: `${patient.vitals.temperature}°C`, icon: <Thermometer className="w-4 h-4" />, warn: patient.vitals.temperature > 38 },
    { label: "O₂ Saturation", value: `${patient.vitals.oxygenSaturation}%`, icon: <Droplets className="w-4 h-4" />, warn: patient.vitals.oxygenSaturation < 92 },
    { label: "Resp. Rate", value: `${patient.vitals.respiratoryRate}/min`, icon: <Wind className="w-4 h-4" />, warn: patient.vitals.respiratoryRate > 24 },
  ];

  return (
    <div className="space-y-6">
      <button onClick={onBack} className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
        <ChevronRight className="w-4 h-4 rotate-180" /> Back to patients
      </button>

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
          <motion.div
            key={v.label}
            whileHover={{ scale: 1.02 }}
            className={`bg-card rounded-xl border p-4 cursor-default ${v.warn ? "border-critical/30 shadow-sm shadow-critical/10" : "border-border"}`}
          >
            <div className={`flex items-center gap-2 mb-1 text-xs font-medium ${v.warn ? "text-critical" : "text-muted-foreground"}`}>
              {v.icon} {v.label}
            </div>
            <p className={`text-xl font-bold ${v.warn ? "text-critical animate-pulse" : "text-foreground"}`}>{v.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Tabbed Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-muted">
          <TabsTrigger value="vitals" className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> Hourly Vitals</TabsTrigger>
          <TabsTrigger value="labs" className="flex items-center gap-1.5"><FlaskConical className="w-3.5 h-3.5" /> Lab Reports</TabsTrigger>
          <TabsTrigger value="timeline" className="flex items-center gap-1.5"><FileText className="w-3.5 h-3.5" /> Timeline</TabsTrigger>
          <TabsTrigger value="tasks" className="flex items-center gap-1.5"><ClipboardCheck className="w-3.5 h-3.5" /> Tasks</TabsTrigger>
        </TabsList>

        <TabsContent value="vitals" className="mt-4">
          {patientHourly.length > 0 ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <VitalChart data={patientHourly} dataKey="heartRate" label="Heart Rate (bpm)" color="hsl(0 72% 51%)" refLine={100} />
                <VitalChart data={patientHourly} dataKey="oxygenSaturation" label="O₂ Saturation (%)" color="hsl(215 80% 50%)" refLine={92} />
                <VitalChart data={patientHourly} dataKey="temperature" label="Temperature (°C)" color="hsl(38 92% 50%)" refLine={38} />
                <VitalChart data={patientHourly} dataKey="respiratoryRate" label="Respiratory Rate (/min)" color="hsl(152 60% 40%)" refLine={24} />
              </div>
              <div className="bg-card rounded-xl border border-border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead><Clock className="w-3.5 h-3.5 inline mr-1" />Time</TableHead>
                      <TableHead><Heart className="w-3.5 h-3.5 inline mr-1" />HR</TableHead>
                      <TableHead><Activity className="w-3.5 h-3.5 inline mr-1" />BP</TableHead>
                      <TableHead><Thermometer className="w-3.5 h-3.5 inline mr-1" />Temp</TableHead>
                      <TableHead><Droplets className="w-3.5 h-3.5 inline mr-1" />O₂</TableHead>
                      <TableHead><Wind className="w-3.5 h-3.5 inline mr-1" />RR</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {patientHourly.slice(-12).reverse().map((v, i) => (
                      <TableRow key={i}>
                        <TableCell className="font-mono text-xs">{v.timestamp.split(" ")[1]}</TableCell>
                        <TableCell className={v.heartRate > 100 ? "text-critical font-bold" : ""}>{v.heartRate}</TableCell>
                        <TableCell>{v.systolicBP}/{v.diastolicBP}</TableCell>
                        <TableCell className={v.temperature > 38 ? "text-critical font-bold" : ""}>{v.temperature}</TableCell>
                        <TableCell className={v.oxygenSaturation < 92 ? "text-critical font-bold" : ""}>{v.oxygenSaturation}%</TableCell>
                        <TableCell className={v.respiratoryRate > 24 ? "text-critical font-bold" : ""}>{v.respiratoryRate}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <Clock className="w-10 h-10 mx-auto mb-3 opacity-40" />
              <p>No hourly vitals data available for this patient</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="labs" className="mt-4">
          {patientLabs.length > 0 ? (
            <div className="space-y-4">
              {patientLabs.map(lab => (
                <motion.div
                  key={lab.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-card rounded-xl border border-border p-5"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${lab.status === "completed" ? "bg-stable/10 text-stable" : "bg-moderate/10 text-moderate"}`}>
                        {lab.status === "completed" ? <CheckCircle2 className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground flex items-center gap-2">
                          <Beaker className="w-4 h-4 text-secondary" /> {lab.testName}
                        </h4>
                        <p className="text-xs text-muted-foreground">{lab.category} · Ordered by {lab.orderedBy} · {lab.orderedAt}</p>
                      </div>
                    </div>
                    <Badge variant={lab.status === "completed" ? "default" : "secondary"} className={lab.status === "completed" ? "bg-stable/10 text-stable border-stable/20" : ""}>
                      {lab.status === "completed" ? "✓ Completed" : "⏳ Pending"}
                    </Badge>
                  </div>
                  {lab.results.length > 0 && (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead><Microscope className="w-3.5 h-3.5 inline mr-1" />Parameter</TableHead>
                          <TableHead>Value</TableHead>
                          <TableHead>Normal Range</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {lab.results.map((r, i) => (
                          <TableRow key={i}>
                            <TableCell className="font-medium">{r.parameter}</TableCell>
                            <TableCell className={`font-mono ${r.flag !== "normal" ? "text-critical font-bold" : ""}`}>{r.value} {r.unit}</TableCell>
                            <TableCell className="text-muted-foreground text-sm">{r.normalRange}</TableCell>
                            <TableCell>
                              <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${
                                r.flag === "high" ? "bg-critical/10 text-critical" : r.flag === "low" ? "bg-moderate/10 text-moderate" : "bg-stable/10 text-stable"
                              }`}>
                                {r.flag === "high" ? <TrendingUp className="w-3 h-3" /> : r.flag === "low" ? <TrendingDown className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
                                {r.flag.toUpperCase()}
                              </span>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <FlaskConical className="w-10 h-10 mx-auto mb-3 opacity-40" />
              <p>No lab reports available for this patient</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="timeline" className="mt-4">
          <div className="bg-card rounded-xl border border-border p-5">
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
                    <p className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" /> {h.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="tasks" className="mt-4">
          <div className="bg-card rounded-xl border border-border p-5">
            <div className="space-y-3">
              {tasks.map(t => (
                <motion.div
                  key={t.id}
                  whileHover={{ scale: 1.01 }}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
                >
                  <Checkbox checked={t.done} onCheckedChange={() => toggleTask(t.id)} />
                  <span className={`flex-1 text-sm ${t.done ? "line-through text-muted-foreground" : "text-foreground"}`}>{t.task}</span>
                  <SeverityBadge severity={t.priority} />
                </motion.div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>

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

// ─── Vital Chart Component ──────────────────────────────────
const VitalChart = ({ data, dataKey, label, color, refLine }: { data: any[]; dataKey: string; label: string; color: string; refLine?: number }) => (
  <div className="bg-card rounded-xl border border-border p-4">
    <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
      <TrendingUp className="w-4 h-4 text-secondary" /> {label}
    </h4>
    <div className="h-40">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 15% 88%)" />
          <XAxis dataKey="timestamp" tick={{ fontSize: 10 }} stroke="hsl(220 10% 46%)" tickFormatter={(v: string) => v.split(" ")[1]} />
          <YAxis tick={{ fontSize: 10 }} stroke="hsl(220 10% 46%)" />
          <Tooltip labelFormatter={(v: string) => `Time: ${v}`} />
          {refLine && <ReferenceLine y={refLine} stroke="hsl(0 72% 51%)" strokeDasharray="5 5" label={{ value: "Threshold", fontSize: 10, fill: "hsl(0 72% 51%)" }} />}
          <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);

// ─── Patient List ───────────────────────────────────────────
const ClinicianPatientList = ({ onSelect }: { onSelect: (p: Patient) => void }) => {
  const [search, setSearch] = useState("");
  const [severityFilter, setSeverityFilter] = useState<string>("all");

  const filtered = patients.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.ward.toLowerCase().includes(search.toLowerCase()) || p.doctor.toLowerCase().includes(search.toLowerCase());
    const matchSeverity = severityFilter === "all" || p.severity === severityFilter;
    return matchSearch && matchSeverity;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-foreground flex items-center gap-2"><Heart className="w-6 h-6 text-secondary" /> My Patients</h1>
        <p className="text-muted-foreground text-sm mt-1">Click a patient to view details, vitals, labs & triage recommendations</p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search patients, wards, doctors..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
        </div>
        <div className="flex gap-2">
          {["all", "critical", "moderate", "stable"].map(s => (
            <Button
              key={s}
              variant={severityFilter === s ? "default" : "outline"}
              size="sm"
              onClick={() => setSeverityFilter(s)}
              className={severityFilter === s ? (s === "critical" ? "bg-critical text-critical-foreground" : s === "moderate" ? "bg-moderate text-moderate-foreground" : s === "stable" ? "bg-stable text-stable-foreground" : "") : ""}
            >
              {s === "all" ? <Filter className="w-3.5 h-3.5 mr-1" /> : null}
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead><Activity className="w-3.5 h-3.5 inline mr-1" />Ward / Bed</TableHead>
              <TableHead><Syringe className="w-3.5 h-3.5 inline mr-1" />Doctor</TableHead>
              <TableHead><AlertTriangle className="w-3.5 h-3.5 inline mr-1" />Severity</TableHead>
              <TableHead><Heart className="w-3.5 h-3.5 inline mr-1" />HR</TableHead>
              <TableHead><Droplets className="w-3.5 h-3.5 inline mr-1" />O₂</TableHead>
              <TableHead><FlaskConical className="w-3.5 h-3.5 inline mr-1" />Labs</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map(p => {
              const labCount = labReports.filter(l => l.patientId === p.id).length;
              return (
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
                  <TableCell>
                    {labCount > 0 && (
                      <Badge variant="outline" className="text-xs"><FlaskConical className="w-3 h-3 mr-1" />{labCount}</Badge>
                    )}
                  </TableCell>
                  <TableCell><ChevronRight className="w-4 h-4 text-muted-foreground" /></TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

// ─── Task List ──────────────────────────────────────────────
const ClinicianTaskList = () => {
  const allTasks = patients.flatMap(p => p.tasks.map(t => ({ ...t, patient: p.name, patientSeverity: p.severity })));
  const [tasks, setTasks] = useState(allTasks);

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const pending = tasks.filter(t => !t.done).sort((a, b) => {
    const order = { critical: 0, moderate: 1, stable: 2 };
    return order[a.priority as keyof typeof order] - order[b.priority as keyof typeof order];
  });
  const completed = tasks.filter(t => t.done);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-foreground flex items-center gap-2"><ClipboardCheck className="w-6 h-6 text-secondary" /> Task List</h1>
        <p className="text-muted-foreground text-sm mt-1">{pending.length} pending · {completed.length} completed</p>
      </div>

      <div className="space-y-2">
        {pending.map(t => (
          <motion.div key={t.id} whileHover={{ scale: 1.005 }} className="flex items-center gap-3 bg-card rounded-xl border border-border p-4">
            <Checkbox checked={false} onCheckedChange={() => toggleTask(t.id)} />
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{t.task}</p>
              <p className="text-xs text-muted-foreground">{t.patient}</p>
            </div>
            <SeverityBadge severity={t.priority} />
          </motion.div>
        ))}
      </div>

      {completed.length > 0 && (
        <>
          <h3 className="text-sm font-semibold text-muted-foreground flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> Completed</h3>
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

// ─── Lab Reports Page ───────────────────────────────────────
const LabReportsPage = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = labReports.filter(l => {
    const matchSearch = l.testName.toLowerCase().includes(search.toLowerCase()) || l.category.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || l.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const getPatientName = (id: string) => patients.find(p => p.id === id)?.name || id;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-foreground flex items-center gap-2"><FlaskConical className="w-6 h-6 text-secondary" /> Lab Reports</h1>
        <p className="text-muted-foreground text-sm mt-1">{labReports.filter(l => l.status === "completed").length} completed · {labReports.filter(l => l.status === "pending").length} pending</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search tests, categories..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
        </div>
        <div className="flex gap-2">
          {["all", "completed", "pending"].map(s => (
            <Button key={s} variant={statusFilter === s ? "default" : "outline"} size="sm" onClick={() => setStatusFilter(s)}>
              {s === "completed" && <CheckCircle2 className="w-3.5 h-3.5 mr-1" />}
              {s === "pending" && <Clock className="w-3.5 h-3.5 mr-1" />}
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filtered.map(lab => (
          <motion.div key={lab.id} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-xl border border-border p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${lab.status === "completed" ? "bg-stable/10 text-stable" : "bg-moderate/10 text-moderate"}`}>
                  {lab.status === "completed" ? <CheckCircle2 className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                </div>
                <div>
                  <h4 className="font-semibold text-foreground flex items-center gap-2"><Beaker className="w-4 h-4 text-secondary" /> {lab.testName}</h4>
                  <p className="text-xs text-muted-foreground">
                    <Pill className="w-3 h-3 inline mr-1" />{getPatientName(lab.patientId)} · {lab.category} · {lab.orderedBy}
                  </p>
                </div>
              </div>
              <Badge variant={lab.status === "completed" ? "default" : "secondary"} className={lab.status === "completed" ? "bg-stable/10 text-stable border-stable/20" : ""}>
                {lab.status === "completed" ? "✓ Completed" : "⏳ Pending"}
              </Badge>
            </div>
            {lab.results.length > 0 && (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead><Microscope className="w-3.5 h-3.5 inline mr-1" />Parameter</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Normal Range</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {lab.results.map((r, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{r.parameter}</TableCell>
                      <TableCell className={`font-mono ${r.flag !== "normal" ? "text-critical font-bold" : ""}`}>{r.value} {r.unit}</TableCell>
                      <TableCell className="text-muted-foreground text-sm">{r.normalRange}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${
                          r.flag === "high" ? "bg-critical/10 text-critical" : r.flag === "low" ? "bg-moderate/10 text-moderate" : "bg-stable/10 text-stable"
                        }`}>
                          {r.flag === "high" ? <TrendingUp className="w-3 h-3" /> : r.flag === "low" ? <TrendingDown className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
                          {r.flag.toUpperCase()}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// ─── Hourly Vitals Page ─────────────────────────────────────
const HourlyVitalsPage = () => {
  const [selectedPatient, setSelectedPatient] = useState<string>(patients[0].id);
  const patientData = hourlyVitals.filter(v => v.patientId === selectedPatient);
  const patient = patients.find(p => p.id === selectedPatient)!;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-foreground flex items-center gap-2"><Clock className="w-6 h-6 text-secondary" /> Hourly Health Report</h1>
        <p className="text-muted-foreground text-sm mt-1">24-hour vital trends for selected patient</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {patients.map(p => (
          <Button
            key={p.id}
            variant={selectedPatient === p.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedPatient(p.id)}
            className="text-xs"
          >
            <Heart className={`w-3 h-3 mr-1 ${p.severity === "critical" ? "text-critical" : p.severity === "moderate" ? "text-moderate" : "text-stable"}`} />
            {p.name.split(" ")[0]}
          </Button>
        ))}
      </div>

      {patientData.length > 0 ? (
        <>
          <div className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
              {patient.name.split(" ").map(n => n[0]).join("")}
            </div>
            <div>
              <p className="font-semibold text-foreground">{patient.name}</p>
              <p className="text-xs text-muted-foreground">{patient.ward} · {patient.bed} · {patient.doctor}</p>
            </div>
            <SeverityBadge severity={patient.severity} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <VitalChart data={patientData} dataKey="heartRate" label="Heart Rate (bpm)" color="hsl(0 72% 51%)" refLine={100} />
            <VitalChart data={patientData} dataKey="oxygenSaturation" label="O₂ Saturation (%)" color="hsl(215 80% 50%)" refLine={92} />
            <VitalChart data={patientData} dataKey="temperature" label="Temperature (°C)" color="hsl(38 92% 50%)" refLine={38} />
            <VitalChart data={patientData} dataKey="respiratoryRate" label="Respiratory Rate (/min)" color="hsl(152 60% 40%)" refLine={24} />
          </div>
        </>
      ) : (
        <div className="text-center py-12 text-muted-foreground">
          <Clock className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p>No hourly data available for this patient</p>
        </div>
      )}
    </div>
  );
};

// ─── Main Dashboard Router ──────────────────────────────────
const ClinicianDashboard = ({ page }: { page: string }) => {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  if (page === "tasks") return <ClinicianTaskList />;
  if (page === "labs") return <LabReportsPage />;
  if (page === "hourly") return <HourlyVitalsPage />;

  if (selectedPatient) {
    return <PatientDetail patient={selectedPatient} onBack={() => setSelectedPatient(null)} />;
  }

  return <ClinicianPatientList onSelect={setSelectedPatient} />;
};

export default ClinicianDashboard;
