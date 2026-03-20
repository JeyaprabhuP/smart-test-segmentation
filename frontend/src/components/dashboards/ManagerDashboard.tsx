import { AlertTriangle, Heart, Activity, BedDouble, Stethoscope, Monitor, Users } from "lucide-react";
import StatCard from "@/components/StatCard";
import SeverityBadge from "@/components/SeverityBadge";
import { patients, resources, alerts, hourlyPatientLoad, wardDistribution } from "@/data/mockData";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts";

const ManagerOverview = () => {
  const criticalCount = patients.filter(p => p.severity === "critical").length;
  const moderateCount = patients.filter(p => p.severity === "moderate").length;
  const stableCount = patients.filter(p => p.severity === "stable").length;
  const unreadAlerts = alerts.filter(a => !a.read);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-foreground">Patient Load Overview</h1>
        <p className="text-muted-foreground text-sm mt-1">Real-time patient distribution and alerts</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Critical" value={criticalCount} subtitle="Immediate attention" icon={<AlertTriangle className="w-5 h-5" />} variant="critical" />
        <StatCard title="Moderate" value={moderateCount} subtitle="Close monitoring" icon={<Heart className="w-5 h-5" />} variant="moderate" />
        <StatCard title="Stable" value={stableCount} subtitle="Standard care" icon={<Activity className="w-5 h-5" />} variant="stable" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Patient Load Trend */}
        <div className="bg-card rounded-xl border border-border p-5">
          <h3 className="font-semibold text-foreground mb-4">Patient Load Trend (24h)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={hourlyPatientLoad}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 15% 88%)" />
                <XAxis dataKey="hour" tick={{ fontSize: 12 }} stroke="hsl(220 10% 46%)" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(220 10% 46%)" />
                <Tooltip />
                <Area type="monotone" dataKey="critical" stackId="1" stroke="hsl(0 72% 51%)" fill="hsl(0 72% 51% / 0.3)" />
                <Area type="monotone" dataKey="moderate" stackId="1" stroke="hsl(38 92% 50%)" fill="hsl(38 92% 50% / 0.3)" />
                <Area type="monotone" dataKey="stable" stackId="1" stroke="hsl(152 60% 40%)" fill="hsl(152 60% 40% / 0.3)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Active Alerts */}
        <div className="bg-card rounded-xl border border-border p-5">
          <h3 className="font-semibold text-foreground mb-4">Active Alerts</h3>
          <div className="space-y-3">
            {unreadAlerts.map(alert => (
              <div key={alert.id} className={`p-3 rounded-lg border ${
                alert.severity === "critical" ? "border-critical/30 bg-critical/5" : "border-moderate/30 bg-moderate/5"
              }`}>
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-semibold text-sm text-foreground">{alert.patient}</span>
                    <p className="text-sm text-muted-foreground mt-0.5">{alert.message}</p>
                  </div>
                  <SeverityBadge severity={alert.severity} />
                </div>
                <p className="text-xs text-muted-foreground mt-1">{alert.timestamp}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ManagerResources = () => {
  const iconMap: Record<string, React.ReactNode> = {
    "ICU Beds": <BedDouble className="w-4 h-4" />,
    "General Beds": <BedDouble className="w-4 h-4" />,
    "Ventilators": <Monitor className="w-4 h-4" />,
    "Nurses on Shift": <Users className="w-4 h-4" />,
    "Doctors on Call": <Stethoscope className="w-4 h-4" />,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-foreground">Resource Allocation</h1>
        <p className="text-muted-foreground text-sm mt-1">Current utilization of beds, staff & equipment</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {resources.map(res => {
          const utilization = Math.round((res.occupied / res.total) * 100);
          const isHigh = utilization > 80;
          return (
            <div key={res.type} className="bg-card rounded-xl border border-border p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${isHigh ? "bg-critical/10 text-critical" : "bg-accent text-accent-foreground"}`}>
                  {iconMap[res.type]}
                </div>
                <div>
                  <h4 className="font-semibold text-foreground text-sm">{res.type}</h4>
                  <p className="text-xs text-muted-foreground">{res.occupied}/{res.total} in use</p>
                </div>
              </div>
              <Progress value={utilization} className={`h-2 ${isHigh ? "[&>div]:bg-critical" : "[&>div]:bg-secondary"}`} />
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span>{utilization}% utilized</span>
                <span>{res.available} available</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ManagerHeatmap = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-extrabold text-foreground">Severity Heatmap</h1>
      <p className="text-muted-foreground text-sm mt-1">Patient distribution by ward and severity</p>
    </div>

    <div className="bg-card rounded-xl border border-border p-5">
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={wardDistribution}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 15% 88%)" />
            <XAxis dataKey="ward" tick={{ fontSize: 12 }} stroke="hsl(220 10% 46%)" />
            <YAxis tick={{ fontSize: 12 }} stroke="hsl(220 10% 46%)" />
            <Tooltip />
            <Legend />
            <Bar dataKey="critical" fill="hsl(0 72% 51%)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="moderate" fill="hsl(38 92% 50%)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="stable" fill="hsl(152 60% 40%)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>

    {/* Ward table */}
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Ward</TableHead>
            <TableHead>Patients</TableHead>
            <TableHead>Severity Breakdown</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {wardDistribution.map(w => {
            const total = w.critical + w.moderate + w.stable;
            return (
              <TableRow key={w.ward}>
                <TableCell className="font-medium">{w.ward}</TableCell>
                <TableCell>{total}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {w.critical > 0 && <span className="text-xs font-mono px-2 py-0.5 rounded bg-critical/10 text-critical">{w.critical} crit</span>}
                    {w.moderate > 0 && <span className="text-xs font-mono px-2 py-0.5 rounded bg-moderate/10 text-moderate">{w.moderate} mod</span>}
                    {w.stable > 0 && <span className="text-xs font-mono px-2 py-0.5 rounded bg-stable/10 text-stable">{w.stable} stbl</span>}
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  </div>
);

const ManagerDashboard = ({ page }: { page: string }) => {
  switch (page) {
    case "resources": return <ManagerResources />;
    case "heatmap": return <ManagerHeatmap />;
    default: return <ManagerOverview />;
  }
};

export default ManagerDashboard;
