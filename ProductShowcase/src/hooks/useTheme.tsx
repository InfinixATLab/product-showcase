import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const stored = localStorage.getItem("pokedex:theme");
      return stored === "dark" ? "dark" : "light";
    } catch {
      return "light";
    }
  });

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    try {
      localStorage.setItem("pokedex:theme", theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  function toggle() {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }

  return { theme, toggle };
}
