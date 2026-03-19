import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: ReactNode;
  variant?: "default" | "critical" | "moderate" | "stable";
}

const variantStyles = {
  default: "bg-card border-border",
  critical: "bg-card border-l-4 border-l-critical border-t-border border-r-border border-b-border",
  moderate: "bg-card border-l-4 border-l-moderate border-t-border border-r-border border-b-border",
  stable: "bg-card border-l-4 border-l-stable border-t-border border-r-border border-b-border",
};

const iconStyles = {
  default: "bg-accent text-accent-foreground",
  critical: "bg-critical/10 text-critical",
  moderate: "bg-moderate/10 text-moderate",
  stable: "bg-stable/10 text-stable",
};

const StatCard = ({ title, value, subtitle, icon, variant = "default" }: StatCardProps) => (
  <div className={`rounded-xl border p-5 ${variantStyles[variant]}`}>
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-muted-foreground font-medium">{title}</p>
        <p className="text-3xl font-extrabold text-foreground mt-1">{value}</p>
        {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
      </div>
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconStyles[variant]}`}>
        {icon}
      </div>
    </div>
  </div>
);

export default StatCard;
