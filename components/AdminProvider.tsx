"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface AdminContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if admin token exists in cookies
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/admin/check-auth");
        setIsAuthenticated(res.ok);
      } catch {
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const logout = () => {
    setIsAuthenticated(false);
    // Call logout API
    fetch("/api/admin/logout", { method: "POST" });
  };

  return (
    <AdminContext.Provider value={{ isAuthenticated, isLoading, logout }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdmin must be used within AdminProvider");
  }
  return context;
}
