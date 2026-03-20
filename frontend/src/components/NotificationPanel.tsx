import { useState } from "react";
import { Bell, AlertTriangle, Info, AlertCircle, CheckCircle2, X } from "lucide-react";
import { useRole } from "@/context/RoleContext";
import { notifications } from "@/data/notifications";
import { Badge } from "@/components/ui/badge";
import { AnimatePresence, motion } from "framer-motion";

const typeIcons = {
  alert: AlertTriangle,
  warning: AlertCircle,
  info: Info,
  success: CheckCircle2,
};

const typeColors = {
  alert: "text-critical bg-critical/10",
  warning: "text-moderate bg-moderate/10",
  info: "text-secondary bg-secondary/10",
  success: "text-stable bg-stable/10",
};

const NotificationPanel = () => {
  const { role } = useRole();
  const [open, setOpen] = useState(false);
  const [readIds, setReadIds] = useState<Set<string>>(new Set(notifications.filter(n => n.read).map(n => n.id)));

  const filtered = notifications.filter(n => n.targetRole === role || n.targetRole === "all");
  const unreadCount = filtered.filter(n => !readIds.has(n.id)).length;

  const markRead = (id: string) => setReadIds(prev => new Set(prev).add(id));
  const markAllRead = () => setReadIds(new Set(filtered.map(n => n.id)));

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-lg text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <Badge className="absolute -top-0.5 -right-0.5 h-4 w-4 p-0 flex items-center justify-center text-[9px] bg-critical text-critical-foreground border-0">
            {unreadCount}
          </Badge>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -5, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -5, scale: 0.95 }}
              className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-card rounded-xl border border-border shadow-xl z-50 overflow-hidden"
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                <h3 className="font-semibold text-foreground text-sm flex items-center gap-2">
                  <Bell className="w-4 h-4 text-secondary" /> Notifications
                </h3>
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <button onClick={markAllRead} className="text-xs text-secondary hover:underline">Mark all read</button>
                  )}
                  <button onClick={() => setOpen(false)} className="p-1 rounded hover:bg-muted">
                    <X className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              </div>
              <div className="max-h-80 overflow-y-auto divide-y divide-border">
                {filtered.length === 0 ? (
                  <p className="text-center text-sm text-muted-foreground py-8">No notifications</p>
                ) : (
                  filtered.map(n => {
                    const Icon = typeIcons[n.type];
                    const isRead = readIds.has(n.id);
                    return (
                      <div
                        key={n.id}
                        onClick={() => markRead(n.id)}
                        className={`px-4 py-3 cursor-pointer hover:bg-muted/50 transition-colors ${!isRead ? "bg-secondary/5" : ""}`}
                      >
                        <div className="flex gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${typeColors[n.type]}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p className={`text-sm font-medium truncate ${!isRead ? "text-foreground" : "text-muted-foreground"}`}>{n.title}</p>
                              {!isRead && <div className="w-2 h-2 rounded-full bg-secondary shrink-0" />}
                            </div>
                            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{n.message}</p>
                            <p className="text-[10px] text-muted-foreground/60 mt-1">{n.timestamp}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationPanel;
