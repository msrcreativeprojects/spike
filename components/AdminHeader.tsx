"use client";

import { useThemeClass } from "@/lib/adminTheme";

export default function AdminHeader({
  subtitle,
  navHref,
  navLabel,
}: {
  subtitle: string;
  navHref: string;
  navLabel: string;
}) {
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
          {subtitle}
        </span>
      </h1>
      <a
        href={navHref}
        className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider border transition-colors ${c(
          "border-white/15 text-white/40 hover:text-white/70 hover:border-white/30",
          "border-gray-300 text-gray-400 hover:text-gray-700 hover:border-gray-400"
        )}`}
      >
        {navLabel}
      </a>
    </div>
  );
}
