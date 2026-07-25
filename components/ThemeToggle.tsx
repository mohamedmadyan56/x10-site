"use client";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      aria-label="تبديل الوضع"
      style={{
        background: "none",
        border: "1px solid var(--border)",
        borderRadius: "var(--r-sm)",
        padding: "6px 10px",
        cursor: "pointer",
        color: "var(--text)",
        fontSize: "18px",
        lineHeight: 1,
      }}
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
}
