"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

type AdminTheme = "dark" | "light";

interface AdminThemeContextValue {
  theme: AdminTheme;
  toggle: () => void;
}

const AdminThemeContext = createContext<AdminThemeContextValue>({
  theme: "dark",
  toggle: () => {},
});

export function useAdminTheme() {
  return useContext(AdminThemeContext);
}

/**
 * Conditional class helper: returns the appropriate class string
 * based on the current admin theme.
 */
export function useThemeClass() {
  const { theme } = useAdminTheme();
  return (dark: string, light: string) => (theme === "dark" ? dark : light);
}

export function AdminThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<AdminTheme>("dark");

  useEffect(() => {
    const stored = localStorage.getItem("admin-theme") as AdminTheme | null;
    if (stored === "light" || stored === "dark") setTheme(stored);
  }, []);

  const toggle = () => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      localStorage.setItem("admin-theme", next);
      return next;
    });
  };

  return (
    <AdminThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </AdminThemeContext.Provider>
  );
}
