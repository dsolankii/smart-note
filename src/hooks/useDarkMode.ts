"use client";

import { useEffect, useState } from "react";

export default function useDarkMode() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;          // SSR guard
    return window.localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return [isDark, setIsDark] as const;   
}
