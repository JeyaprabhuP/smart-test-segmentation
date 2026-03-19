import { useState } from "react";
import { AlertTriangle, Heart, Users, Activity, Plus, Pencil, Trash2, Power } from "lucide-react";
import StatCard from "@/components/StatCard";
import SeverityBadge from "@/components/SeverityBadge";
import { patients, classificationRules, auditLogs, ClassificationRule } from "@/data/mockData";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const AdminOverview = () => {
  const criticalCount = patients.filter(p => p.severity === "critical").length;
  const moderateCount = patients.filter(p => p.severity === "moderate").length;
  const stableCount = patients.filter(p => p.severity === "stable").length;
  const activeRules = classificationRules.filter(r => r.active).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-foreground">System Overview</h1>
        <p className="text-muted-foreground text-sm mt-1">Classification engine status & patient distribution</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Critical Patients" value={criticalCount} icon={<AlertTriangle className="w-5 h-5" />} variant="critical" />
        <StatCard title="Moderate Patients" value={moderateCount} icon={<Heart className="w-5 h-5" />} variant="moderate" />
        <StatCard title="Stable Patients" value={stableCount} icon={<Activity className="w-5 h-5" />} variant="stable" />
        <StatCard title="Active Rules" value={activeRules} subtitle={`of ${classificationRules.length} total`} icon={<Users className="w-5 h-5" />} />
      </div>
      <div className="bg-card rounded-xl border border-border p-5">
        <h3 className="font-semibold text-foreground mb-3">Recent Audit Activity</h3>
        <div className="space-y-3">
          {auditLogs.slice(0, 4).map(log => (
            <div key={log.id} className="flex items-start justify-between text-sm">
              <div>
                <span className="font-medium text-foreground">{log.action}</span>
                <span className="text-muted-foreground"> — {log.target}</span>
                <p className="text-xs text-muted-foreground">{log.user}</p>
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap">{log.timestamp}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const AdminRules = () => {
  const [rules, setRules] = useState<ClassificationRule[]>(classificationRules);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingRule, setEditingRule] = useState<ClassificationRule | null>(null);

  const toggleRule = (id: string) => {
    setRules(prev => prev.map(r => r.id === id ? { ...r, active: !r.active } : r));
  };

  const deleteRule = (id: string) => {
    setRules(prev => prev.filter(r => r.id !== id));
  };

  const openEdit = (rule: ClassificationRule) => {
    setEditingRule(rule);
    setDialogOpen(true);
  };

  const openCreate = () => {
    setEditingRule(null);
    setDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground">Classification Rules</h1>
          <p className="text-muted-foreground text-sm mt-1">Configure thresholds for patient triage severity</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreate} className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
              <Plus className="w-4 h-4 mr-2" /> Add Rule
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingRule ? "Edit Rule" : "Create Rule"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <div><Label>Rule Name</Label><Input defaultValue={editingRule?.name || ""} placeholder="e.g. Tachycardia Critical" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Metric</Label>
                  <Select defaultValue={editingRule?.metric || ""}>
                    <SelectTrigger><SelectValue placeholder="Select metric" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Heart Rate">Heart Rate</SelectItem>
                      <SelectItem value="O2 Saturation">O2 Saturation</SelectItem>
                      <SelectItem value="Temperature">Temperature</SelectItem>
                      <SelectItem value="Systolic BP">Systolic BP</SelectItem>
                      <SelectItem value="Respiratory Rate">Respiratory Rate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div><Label>Operator</Label>
                  <Select defaultValue={editingRule?.operator || ""}>
                    <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value=">">Greater than (&gt;)</SelectItem>
                      <SelectItem value="<">Less than (&lt;)</SelectItem>
                      <SelectItem value=">=">≥</SelectItem>
                      <SelectItem value="<=">≤</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Threshold</Label><Input type="number" defaultValue={editingRule?.threshold || ""} /></div>
                <div><Label>Severity</Label>
                  <Select defaultValue={editingRule?.severity || ""}>
                    <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="critical">Critical</SelectItem>
                      <SelectItem value="moderate">Moderate</SelectItem>
                      <SelectItem value="stable">Stable</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button className="w-full bg-primary text-primary-foreground" onClick={() => setDialogOpen(false)}>
                {editingRule ? "Save Changes" : "Create Rule"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Rule Name</TableHead>
              <TableHead>Metric</TableHead>
              <TableHead>Condition</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead>Active</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rules.map(rule => (
              <TableRow key={rule.id}>
                <TableCell className="font-medium">{rule.name}</TableCell>
                <TableCell>{rule.metric}</TableCell>
                <TableCell className="font-mono text-sm">{rule.operator} {rule.threshold}</TableCell>
                <TableCell><SeverityBadge severity={rule.severity} /></TableCell>
                <TableCell>
                  <Switch checked={rule.active} onCheckedChange={() => toggleRule(rule.id)} />
                </TableCell>
                <TableCell className="text-right space-x-1">
                  <Button variant="ghost" size="icon" onClick={() => openEdit(rule)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => deleteRule(rule.id)} className="text-destructive hover:text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

const AdminAudit = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-extrabold text-foreground">Audit Logs</h1>
      <p className="text-muted-foreground text-sm mt-1">Complete system activity history</p>
    </div>
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Timestamp</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Target</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {auditLogs.map(log => (
            <TableRow key={log.id}>
              <TableCell className="font-mono text-xs">{log.timestamp}</TableCell>
              <TableCell className="text-sm">{log.user}</TableCell>
              <TableCell className="font-medium">{log.action}</TableCell>
              <TableCell className="text-muted-foreground">{log.target}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  </div>
);

const AdminDashboard = ({ page }: { page: string }) => {
  switch (page) {
    case "rules": return <AdminRules />;
    case "audit": return <AdminAudit />;
    default: return <AdminOverview />;
  }
};

export default AdminDashboard;
