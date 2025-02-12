"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

interface ThemeContextType {
  mode: "light" | "dark";
  setMode: (mode: "light" | "dark") => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState<"light" | "dark">("light");

  const applyTheme = (newMode: "light" | "dark") => {
    setMode(newMode);
    localStorage.setItem("theme", newMode);

    if (newMode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      applyTheme("dark");
    } else {
      applyTheme("light");
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ mode, setMode: applyTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

export default ThemeProvider;
