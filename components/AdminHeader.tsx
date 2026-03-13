"use client";

import { useThemeClass } from "@/lib/adminTheme";

export default function AdminHeader() {
  const c = useThemeClass();

  return (
    <div className="flex items-center justify-between mb-8">
      <h1
        className={`font-title text-4xl tracking-wide ${c("text-white/90", "text-gray-900")}`}
      >
        SPIKE{" "}
        <span
          className={`text-base font-sans tracking-normal ${c("text-white/30", "text-gray-400")}`}
        >
          Admin
        </span>
      </h1>
    </div>
  );
}
