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

  function Toggle(Event: React.MouseEvent<HTMLButtonElement>) {
    const Root = document.documentElement;
    const Next = Root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    const Commit = () => {
      ApplyTheme(Next);
      try {
        localStorage.setItem(THEME_STORAGE_KEY, Next);
      } catch {}
    };
    const ReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (typeof document.startViewTransition !== "function" || ReducedMotion) {
      Commit();
      return;
    }
    let X = Event.clientX;
    let Y = Event.clientY;
    if (Event.detail === 0 || (X === 0 && Y === 0)) {
      const Rect = Event.currentTarget.getBoundingClientRect();
      X = Rect.left + Rect.width / 2;
      Y = Rect.top + Rect.height / 2;
    }
    const Radius = Math.hypot(Math.max(X, window.innerWidth - X), Math.max(Y, window.innerHeight - Y));
    const Transition = document.startViewTransition(Commit);
    Transition.ready
      .then(() => {
        Root.animate(
          { clipPath: [`circle(0px at ${X}px ${Y}px)`, `circle(${Radius}px at ${X}px ${Y}px)`] },
          { duration: 900, easing: "cubic-bezier(0.65, 0, 0.35, 1)", pseudoElement: "::view-transition-new(root)" },
        );
      })
      .catch(() => {});
  }

  return (
    <button
      type="button"
      onClick={Toggle}
      className="group grid size-[42px] place-items-center rounded-full border border-line bg-surface/60 text-ink-muted transition-colors hover:border-accent hover:text-ink"
    >
      <span className="block transition-transform duration-500 ease-out dark:hidden motion-safe:group-hover:-rotate-[20deg]" aria-hidden="true">
        <Moon size={18} />
      </span>
      <span className="hidden transition-transform duration-500 ease-out dark:block motion-safe:group-hover:rotate-90" aria-hidden="true">
        <Sun size={18} />
      </span>
      <span className="sr-only dark:hidden">{DarkLabel}</span>
      <span className="sr-only hidden dark:inline">{LightLabel}</span>
    </button>
  );
}
