import { useState } from "react";
import { User, LogOut, Shield, Building2, Clock, Mail } from "lucide-react";
import { useRole } from "@/context/RoleContext";
import { AnimatePresence, motion } from "framer-motion";

const ProfileMenu = () => {
  const { user, role, logout } = useRole();
  const [open, setOpen] = useState(false);

  if (!user) return null;

  const roleLabels: Record<string, string> = { admin: "Administrator", manager: "Manager", clinician: "Clinician", triage_nurse: "Triage Nurse" };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-xs font-bold text-secondary hover:bg-secondary/30 transition-colors"
      >
        {user.avatar}
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -5, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -5, scale: 0.95 }}
              className="absolute right-0 top-full mt-2 w-72 bg-card rounded-xl border border-border shadow-xl z-50 overflow-hidden"
            >
              {/* Profile Header */}
              <div className="p-4 bg-primary/5 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center text-sm font-bold text-primary-foreground">
                    {user.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground text-sm truncate">{user.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{role && roleLabels[role]}</p>
                  </div>
                </div>
              </div>

              {/* Profile Details */}
              <div className="p-3 space-y-2 text-sm">
                <div className="flex items-center gap-2.5 px-2 py-1.5 text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span className="truncate">{user.email}</span>
                </div>
                <div className="flex items-center gap-2.5 px-2 py-1.5 text-muted-foreground">
                  <Building2 className="w-4 h-4" />
                  <span>{user.department}</span>
                </div>
                <div className="flex items-center gap-2.5 px-2 py-1.5 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>Last login: {user.lastLogin}</span>
                </div>
              </div>

              <div className="border-t border-border p-2">
                <button
                  onClick={() => { setOpen(false); logout(); }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-destructive hover:bg-destructive/10 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileMenu;
