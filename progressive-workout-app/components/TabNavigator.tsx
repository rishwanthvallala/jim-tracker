"use client"; // This is a Client Component because it uses a hook (usePathname).

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MUSCLE_GROUPS } from "@/lib/exerciseLibrary"; // Using @/ alias for cleaner imports

// Helper function to capitalize the first letter
const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export default function TabNavigator() {
  const pathname = usePathname(); // Gets the current URL path, e.g., "/chest"

  return (
    <nav className="bg-gray-800 p-2 sticky top-0 z-10">
      <div className="flex justify-center space-x-2 sm:space-x-4">
        {MUSCLE_GROUPS.map((group) => {
          const isActive = pathname === `/${group}`;
          return (
            <Link
              key={group}
              href={`/${group}`}
              className={`
                px-3 py-2 rounded-md text-sm font-medium transition-colors
                ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }
              `}
            >
              {capitalize(group)}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}