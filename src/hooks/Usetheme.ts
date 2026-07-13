"use client";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { themeAtom, Theme } from "@/store/Themeatom";
const STORAGE_KEY = "theme";
function applyThemeClass(theme: Theme) {
  const root = document.documentElement;
  if (theme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
}
export function useTheme() {
  const [theme, setTheme] = useAtom(themeAtom);
  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial: Theme = stored === "light" || stored === "dark" ? stored : systemPrefersDark ? "dark" : "light";
    setTheme(initial);
    applyThemeClass(initial);
  }, []);
  function toggleTheme() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    window.localStorage.setItem(STORAGE_KEY, next);
    applyThemeClass(next);
  }
  function setThemeExplicit(next: Theme) {
    setTheme(next);
    window.localStorage.setItem(STORAGE_KEY, next);
    applyThemeClass(next);
  }
  return { theme, toggleTheme, setTheme: setThemeExplicit };
}