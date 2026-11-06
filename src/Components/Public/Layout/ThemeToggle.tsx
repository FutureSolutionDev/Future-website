"use client";

import { useEffect } from "react";
import { Moon, Sun } from "lucide-react";

export const THEME_STORAGE_KEY = "theme";

export const THEME_INIT_SCRIPT = `(function () {
  try {
    var stored = localStorage.getItem('${THEME_STORAGE_KEY}');
    var dark = stored ? stored === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  } catch (e) {}
})();`;

function ApplyTheme(Theme: "light" | "dark") {
  document.documentElement.setAttribute("data-theme", Theme);
}

export function ThemeToggle({ DarkLabel, LightLabel }: { DarkLabel: string; LightLabel: string }) {
  useEffect(() => {
    const Query = window.matchMedia("(prefers-color-scheme: dark)");
    const OnSystemChange = (Event: MediaQueryListEvent) => {
      try {
        if (localStorage.getItem(THEME_STORAGE_KEY)) return;
      } catch {
        return;
      }
      ApplyTheme(Event.matches ? "dark" : "light");
    };
    Query.addEventListener("change", OnSystemChange);
    return () => Query.removeEventListener("change", OnSystemChange);
  }, []);

  function Toggle() {
    const Next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    ApplyTheme(Next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, Next);
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={Toggle}
      className="grid size-[42px] place-items-center rounded-md border border-line text-ink-muted transition-colors hover:text-ink"
    >
      <span className="dark:hidden" aria-hidden="true">
        <Moon size={18} />
      </span>
      <span className="hidden dark:inline" aria-hidden="true">
        <Sun size={18} />
      </span>
      <span className="sr-only dark:hidden">{DarkLabel}</span>
      <span className="sr-only hidden dark:inline">{LightLabel}</span>
    </button>
  );
}
