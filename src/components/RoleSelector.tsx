import { motion } from "framer-motion";
import { Shield, BarChart3, Stethoscope, Activity } from "lucide-react";
import { useRole } from "@/context/RoleContext";
import { UserRole } from "@/data/mockData";

const roles: { role: UserRole; title: string; description: string; icon: React.ReactNode }[] = [
  { role: "admin", title: "Administrator", description: "Manage rules, thresholds & audit logs", icon: <Shield className="w-8 h-8" /> },
  { role: "manager", title: "Manager", description: "Patient load, resources & severity overview", icon: <BarChart3 className="w-8 h-8" /> },
  { role: "clinician", title: "Clinician", description: "Patient vitals, triage & task management", icon: <Stethoscope className="w-8 h-8" /> },
];

const RoleSelector = () => {
  const { setRole } = useRole();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
              <Activity className="w-7 h-7 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-extrabold text-foreground tracking-tight">
              Vital<span className="text-secondary">Triage</span> AI
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">Smart Patient Segmentation Platform</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {roles.map((r, i) => (
            <motion.button
              key={r.role}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setRole(r.role)}
              className="group relative p-8 rounded-2xl bg-card border border-border hover:border-secondary/50 transition-all duration-300 text-left hover:shadow-lg hover:shadow-secondary/10"
            >
              <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center text-accent-foreground mb-5 group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors">
                {r.icon}
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">{r.title}</h3>
              <p className="text-muted-foreground text-sm">{r.description}</p>
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity text-secondary text-sm font-medium">
                Enter →
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoleSelector;
