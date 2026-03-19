import { Severity } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";

const SeverityBadge = ({ severity }: { severity: Severity }) => {
  const styles = {
    critical: "bg-critical/15 text-critical border-critical/30 hover:bg-critical/20",
    moderate: "bg-moderate/15 text-moderate border-moderate/30 hover:bg-moderate/20",
    stable: "bg-stable/15 text-stable border-stable/30 hover:bg-stable/20",
  };

  return (
    <Badge variant="outline" className={`text-xs font-semibold capitalize ${styles[severity]}`}>
      {severity}
    </Badge>
  );
};

export default SeverityBadge;
