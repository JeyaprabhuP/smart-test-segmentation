import React, { createContext, useContext, useState, ReactNode } from "react";
import { UserRole } from "@/data/mockData";

interface RoleContextType {
  role: UserRole | null;
  setRole: (role: UserRole | null) => void;
}

const RoleContext = createContext<RoleContextType>({ role: null, setRole: () => {} });

export const RoleProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<UserRole | null>(null);
  return <RoleContext.Provider value={{ role, setRole }}>{children}</RoleContext.Provider>;
};

export const useRole = () => useContext(RoleContext);
