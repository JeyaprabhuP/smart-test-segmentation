import { ReactNode, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity, Shield, BarChart3, Stethoscope, LayoutDashboard, FileText,
  Settings, Users, Heart, ClipboardList, FlaskConical, Clock, Menu, X,
  UserPlus, ListChecks, MessageCircle
} from "lucide-react";
import { useRole } from "@/context/RoleContext";
import NotificationPanel from "@/components/NotificationPanel";
import ProfileMenu from "@/components/ProfileMenu";
import ChatbotWidget from "@/components/ChatbotWidget";

interface TopNavLayoutProps {
  children: ReactNode;
  activePage: string;
  onPageChange: (page: string) => void;
}

const navItems: Record<string, { id: string; label: string; icon: any }[]> = {
  admin: [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "rules", label: "Rules", icon: Settings },
    { id: "audit", label: "Audit Logs", icon: FileText },
  ],
  manager: [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "resources", label: "Resources", icon: Users },
    { id: "heatmap", label: "Severity Map", icon: BarChart3 },
  ],
  clinician: [
    { id: "overview", label: "Patients", icon: Heart },
    { id: "all-patients", label: "All Patients", icon: Users },
    { id: "tasks", label: "Tasks", icon: ClipboardList },
    { id: "labs", label: "Labs", icon: FlaskConical },
    { id: "hourly", label: "Hourly Vitals", icon: Clock },
  ],
  triage_nurse: [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "intake", label: "Patient Intake", icon: UserPlus },
    { id: "queue", label: "Triage Queue", icon: ListChecks },
  ],
};

const roleLabels: Record<string, string> = { admin: "Admin", manager: "Manager", clinician: "Clinician", triage_nurse: "Triage Nurse" };
const roleIcons: Record<string, any> = { admin: Shield, manager: BarChart3, clinician: Stethoscope, triage_nurse: UserPlus };

const TopNavLayout = ({ children, activePage, onPageChange }: TopNavLayoutProps) => {
  const { role, user } = useRole();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (!role) return null;

  const RoleIcon = roleIcons[role];
  const items = navItems[role] || [];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 bg-primary border-b border-primary/20 shadow-md">
        <div className="flex items-center h-14 px-4 lg:px-6">
          {/* Logo */}
          <div className="flex items-center gap-2 mr-6 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center">
              <Activity className="w-5 h-5 text-secondary" />
            </div>
            <span className="text-lg font-bold text-primary-foreground hidden sm:block">
              Vital<span className="text-secondary">Triage</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 flex-1">
            {items.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onPageChange(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "bg-secondary/20 text-secondary"
                      : "text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Role Badge */}
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/15 text-secondary text-xs font-semibold mr-3">
            <RoleIcon className="w-3.5 h-3.5" />
            {roleLabels[role]}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-1 ml-auto">
            <NotificationPanel />
            <ProfileMenu />
            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 rounded-lg text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-primary-foreground/10 overflow-hidden"
            >
              <div className="p-3 space-y-1">
                {items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activePage === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => { onPageChange(item.id); setMobileMenuOpen(false); }}
                      className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium ${
                        isActive
                          ? "bg-secondary/20 text-secondary"
                          : "text-primary-foreground/70 hover:text-primary-foreground"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-4 lg:p-6">
        <motion.div
          key={activePage}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.div>
      </main>

      {/* Global Chatbot */}
      <ChatbotWidget />
    </div>
  );
};

export default TopNavLayout;
