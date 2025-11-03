'use client';

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type ThemeContextValue = {
  isDark: boolean;
  toggle: () => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const prefersDark = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

const getStoredPreference = () => {
  if (typeof window === "undefined") {
    return null;
  }

  const stored = window.localStorage.getItem("theme");
  return stored === "dark" ? "dark" : stored === "light" ? "light" : null;
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);
  const [initialised, setInitialised] = useState(false);

  useEffect(() => {
    const stored = getStoredPreference();
    if (stored) {
      setIsDark(stored === "dark");
    } else {
      setIsDark(prefersDark());
    }
    setInitialised(true);
  }, []);

  useEffect(() => {
    if (!initialised || typeof document === "undefined") {
      return;
    }

    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    window.localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark, initialised]);

  const value = useMemo(
    () => ({
      isDark,
      toggle: () => setIsDark((prev) => !prev),
    }),
    [isDark]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
};
