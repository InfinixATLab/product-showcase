import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";

export function Header() {
  const { theme, toggle } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-gray-900/75 backdrop-blur-sm z-40 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          to="/"
          className="font-extrabold text-2xl text-red-500 dark:text-red-400"
        >
          Pokédex
        </Link>

        <div className="flex items-center gap-3">
          <Link to="/" className="text-sm text-gray-700 dark:text-gray-200">
            Home
          </Link>

          <button
            onClick={toggle}
            aria-label="Alternar tema"
            className="px-3 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-sm shadow-sm"
          >
            {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
          </button>
        </div>
      </div>
    </header>
  );
}
