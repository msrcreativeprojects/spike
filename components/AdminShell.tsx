"use client";

import { useAdminTheme } from "@/lib/adminTheme";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const { theme, toggle } = useAdminTheme();

  return (
    <div
      className={
        theme === "dark"
          ? "min-h-dvh bg-[#0a0a0c] text-white"
          : "min-h-dvh bg-[#f5f5f7] text-gray-900"
      }
    >
      <button
        onClick={toggle}
        className={`fixed top-4 right-4 z-50 w-9 h-9 flex items-center justify-center rounded-full border transition-colors text-sm ${
          theme === "dark"
            ? "border-white/15 text-white/40 hover:text-white/70 hover:border-white/30"
            : "border-gray-300 text-gray-400 hover:text-gray-700 hover:border-gray-400"
        }`}
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      >
        {theme === "dark" ? "\u2600" : "\u263E"}
      </button>
      {children}
    </div>
  );
}
