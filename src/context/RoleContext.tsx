import React, { createContext, useContext, useState, ReactNode } from "react";
import { UserRole } from "@/data/types";
import { UserAccount } from "@/data/types";

interface RoleContextType {
  role: UserRole | null;
  setRole: (role: UserRole | null) => void;
  user: UserAccount | null;
  setUser: (user: UserAccount | null) => void;
  logout: () => void;
}

const RoleContext = createContext<RoleContextType>({ role: null, setRole: () => {}, user: null, setUser: () => {}, logout: () => {} });

export const RoleProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<UserRole | null>(null);
  const [user, setUser] = useState<UserAccount | null>(null);

  const logout = () => {
    setRole(null);
    setUser(null);
  };

  return <RoleContext.Provider value={{ role, setRole, user, setUser, logout }}>{children}</RoleContext.Provider>;
};

export const useRole = () => useContext(RoleContext);
