import { useState } from "react";
import { useRole } from "@/context/RoleContext";
import RoleSelector from "@/components/RoleSelector";
import DashboardLayout from "@/components/DashboardLayout";
import AdminDashboard from "@/components/dashboards/AdminDashboard";
import ManagerDashboard from "@/components/dashboards/ManagerDashboard";
import ClinicianDashboard from "@/components/dashboards/ClinicianDashboard";

const Index = () => {
  const { role } = useRole();
  const [activePage, setActivePage] = useState("overview");

  if (!role) return <RoleSelector />;

  const handlePageChange = (page: string) => setActivePage(page);

  return (
    <DashboardLayout activePage={activePage} onPageChange={handlePageChange}>
      {role === "admin" && <AdminDashboard page={activePage} />}
      {role === "manager" && <ManagerDashboard page={activePage} />}
      {role === "clinician" && <ClinicianDashboard page={activePage} />}
    </DashboardLayout>
  );
};

export default Index;
