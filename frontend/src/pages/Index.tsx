import { useState } from "react";
import { useRole } from "@/context/RoleContext";
import LoginPage from "@/pages/LoginPage";
import TopNavLayout from "@/components/TopNavLayout";
import AdminDashboard from "@/components/dashboards/AdminDashboard";
import ManagerDashboard from "@/components/dashboards/ManagerDashboard";
import ClinicianDashboard from "@/components/dashboards/ClinicianDashboard";
import TriageNurseDashboard from "@/components/dashboards/TriageNurseDashboard";

const Index = () => {
  const { role } = useRole();
  const [activePage, setActivePage] = useState("overview");

  if (!role) return <LoginPage />;

  return (
    <TopNavLayout activePage={activePage} onPageChange={setActivePage}>
      {role === "admin" && <AdminDashboard page={activePage} />}
      {role === "manager" && <ManagerDashboard page={activePage} />}
      {role === "clinician" && <ClinicianDashboard page={activePage} />}
      {role === "triage_nurse" && <TriageNurseDashboard page={activePage} />}
    </TopNavLayout>
  );
};

export default Index;
