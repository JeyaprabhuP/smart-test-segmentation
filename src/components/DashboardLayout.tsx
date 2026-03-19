import { ReactNode } from "react";
import { motion } from "framer-motion";
import {
  Activity, LogOut, Bell, Shield, BarChart3, Stethoscope,
  LayoutDashboard, FileText, Settings, Users, Heart, ClipboardList
} from "lucide-react";
import { useRole } from "@/context/RoleContext";
import { alerts } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";

interface DashboardLayoutProps {
  children: ReactNode;
  activePage: string;
  onPageChange: (page: string) => void;
}

const navItems = {
  admin: [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "rules", label: "Classification Rules", icon: Settings },
    { id: "audit", label: "Audit Logs", icon: FileText },
  ],
  manager: [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "resources", label: "Resources", icon: Users },
    { id: "heatmap", label: "Severity Map", icon: BarChart3 },
  ],
  clinician: [
    { id: "overview", label: "Patients", icon: Heart },
    { id: "tasks", label: "Task List", icon: ClipboardList },
  ],
};

const roleLabels = { admin: "Administrator", manager: "Manager", clinician: "Clinician" };
const roleIcons = { admin: Shield, manager: BarChart3, clinician: Stethoscope };

const DashboardLayout = ({ children, activePage, onPageChange }: DashboardLayoutProps) => {
  const { role, setRole } = useRole();
  if (!role) return null;

  const RoleIcon = roleIcons[role];
  const unreadAlerts = alerts.filter(a => !a.read).length;

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-sidebar flex flex-col shrink-0">
        <div className="p-5 border-b border-sidebar-border">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-sidebar-primary/20 flex items-center justify-center">
              <Activity className="w-5 h-5 text-sidebar-primary" />
            </div>
            <span className="text-lg font-bold text-sidebar-foreground">
              Vital<span className="text-sidebar-primary">Triage</span>
            </span>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItems[role].map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                }`}
              >
                <Icon className="w-4.5 h-4.5" />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-3 border-t border-sidebar-border">
          <button
            onClick={() => setRole(null)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Switch Role
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-3">
            <RoleIcon className="w-5 h-5 text-secondary" />
            <h2 className="text-lg font-semibold text-foreground">{roleLabels[role]} Dashboard</h2>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-lg hover:bg-muted transition-colors">
              <Bell className="w-5 h-5 text-muted-foreground" />
              {unreadAlerts > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-[10px] bg-critical text-critical-foreground border-0">
                  {unreadAlerts}
                </Badge>
              )}
            </button>
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
              {role[0].toUpperCase()}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
