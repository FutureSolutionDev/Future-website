"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Menu, X } from "lucide-react";
import { Cn } from "@/Lib/Cn";
import { ButtonClass } from "@/Components/Common/Button";
import SeasonalDecorations from "@/Components/Public/Seasonal/SeasonalDecorations";
import { LanguageSwitch } from "./LanguageSwitch";
import { ThemeToggle } from "./ThemeToggle";
import type { Lang } from "@/Lib/Seo";
import type { TCommon } from "@/I18n/Index";

export type TNavItem = { Key: string; Label: string; Path: string };

type TNavbarProps = {
  Language: Lang;
  Items: TNavItem[];
  Nav: TCommon["Nav"];
  BookLabel: string;
  LogoSrc: string;
};

function StripLang(Path: string): string {
  return Path.replace(/^\/(en|ar)(?=\/|$)/, "") || "";
}

export function Navbar({
  Language,
  Items,
  Nav,
  BookLabel,
  LogoSrc,
}: TNavbarProps) {
  const Pathname = usePathname() || `/${Language}`;
  const [OpenPath, SetOpenPath] = useState<string | null>(null);
  const Open = OpenPath === Pathname;
  const SetOpen = (Value: boolean) => SetOpenPath(Value ? Pathname : null);
  const [Hash, SetHash] = useState("");
  const MenuButtonRef = useRef<HTMLButtonElement>(null);
  const PanelRef = useRef<HTMLDivElement>(null);
  const Rest = StripLang(Pathname === "/" ? "" : Pathname);
  const IsHome = Rest === "";
  const OtherLang: Lang = Language === "ar" ? "en" : "ar";

  useEffect(() => {
    const OnHashChange = () => SetHash(window.location.hash);
    OnHashChange();
    window.addEventListener("hashchange", OnHashChange);
    return () => window.removeEventListener("hashchange", OnHashChange);
  }, [Pathname]);

  useEffect(() => {
    if (!Open) return;
    const MenuButton = MenuButtonRef.current;
    const PreviousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const OnKey = (Event: KeyboardEvent) => {
      if (Event.key === "Escape") {
        SetOpenPath(null);
        return;
      }
      if (Event.key !== "Tab" || !PanelRef.current) return;
      const Focusable = Array.from(
        PanelRef.current.querySelectorAll<HTMLElement>(
          "a[href], button:not([disabled])",
        ),
      );
      const First = Focusable[0];
      const Last = Focusable[Focusable.length - 1];
      if (!PanelRef.current.contains(document.activeElement)) {
        Event.preventDefault();
        First?.focus();
      } else if (Event.shiftKey && document.activeElement === First) {
        Event.preventDefault();
        Last?.focus();
      } else if (!Event.shiftKey && document.activeElement === Last) {
        Event.preventDefault();
        First?.focus();
      }
    };
    window.addEventListener("keydown", OnKey);
    return () => {
      document.body.style.overflow = PreviousOverflow;
      window.removeEventListener("keydown", OnKey);
      MenuButton?.focus();
    };
  }, [Open]);

  const IsActive = (Item: TNavItem) => {
    const ItemRest = StripLang(Item.Path);
    if (ItemRest === "") return IsHome;
    return (
      Rest === ItemRest ||
      Rest.startsWith(`${ItemRest}/`) ||
      (ItemRest === "/portfolio" && Rest.startsWith("/products"))
    );
  };

  return (
    <header
      data-theme={IsHome ? "inverse" : undefined}
      className="sticky top-0 z-50 border-b border-line bg-page/90 backdrop-blur-md supports-[backdrop-filter]:bg-page/85"
    >
      <div className="container-page relative flex h-nav items-center justify-between gap-6">
        <SeasonalDecorations Mode="Desktop" />
        <Link
          href={`/${Language}`}
          className="shrink-0"
          aria-label="Future Solutions Dev"
        >
          <Image
            src={LogoSrc}
            alt="Future Solutions Dev"
            width={126}
            height={80}
            priority
            className={Cn("h-10 w-auto", IsHome && "brightness-0 invert")}
          />
        </Link>

        <nav aria-label={Nav.MainNavigation} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {Items.map((Item) => (
              <li key={Item.Key}>
                <Link
                  href={Item.Path}
                  aria-current={IsActive(Item) ? "page" : undefined}
                  className={Cn(
                    "relative block px-3.5 py-2 text-[15px] font-medium text-ink-muted transition-colors hover:text-ink",
                    "aria-[current=page]:text-ink aria-[current=page]:after:absolute aria-[current=page]:after:inset-x-3.5 aria-[current=page]:after:-bottom-[17px] aria-[current=page]:after:h-0.5 aria-[current=page]:after:bg-accent",
                  )}
                >
                  {Item.Label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle DarkLabel={Nav.ThemeDark} LightLabel={Nav.ThemeLight} />
          <LanguageSwitch Target={OtherLang} Href={`/${OtherLang}${Rest}${Hash}`} Label={Nav.SwitchLanguageLabel} />
          <Link
            href={`/${Language}/contact`}
            className={ButtonClass("Primary", "Sm", "hidden sm:inline-flex")}
          >
            {BookLabel}
          </Link>
          <button
            ref={MenuButtonRef}
            type="button"
            onClick={() => SetOpen(true)}
            aria-label={Nav.Menu}
            aria-expanded={Open}
            aria-controls="mobile-menu"
            className="grid size-[42px] place-items-center rounded-md border border-line text-ink lg:hidden"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {Open &&
        createPortal(
          <div className="fixed inset-0 z-[60] text-ink lg:hidden">
            <button
              type="button"
              tabIndex={-1}
              aria-hidden="true"
              onClick={() => SetOpen(false)}
              className="absolute inset-0 bg-brand-950/50 backdrop-blur-sm"
            />
            <div
              ref={PanelRef}
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label={Nav.MainNavigation}
              className="absolute inset-y-0 start-0 flex w-[min(86vw,360px)] flex-col bg-page shadow-shot animate-rise"
            >
              <div className="flex h-nav items-center justify-between border-b border-line px-5">
                <Image
                  src={LogoSrc}
                  alt="Future Solutions Dev"
                  width={126}
                  height={80}
                  className="h-9 w-auto"
                />
                <button
                  type="button"
                  onClick={() => SetOpen(false)}
                  aria-label={Nav.CloseMenu}
                  className="grid size-10 place-items-center rounded-md border border-line"
                  autoFocus
                >
                  <X size={20} />
                </button>
              </div>
              <ul className="flex-1 overflow-y-auto px-3 py-4">
                <li>
                  <Link
                    href={`/${Language}`}
                    aria-current={IsHome ? "page" : undefined}
                    className="block rounded-md px-4 py-3 text-lg font-semibold aria-[current=page]:bg-accent-soft aria-[current=page]:text-accent-ink"
                  >
                    {Nav.Home}
                  </Link>
                </li>
                {Items.map((Item) => (
                  <li key={Item.Key}>
                    <Link
                      href={Item.Path}
                      aria-current={IsActive(Item) ? "page" : undefined}
                      className="block rounded-md px-4 py-3 text-lg font-semibold aria-[current=page]:bg-accent-soft aria-[current=page]:text-accent-ink"
                    >
                      {Item.Label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="border-t border-line p-5 pb-[max(20px,env(safe-area-inset-bottom))]">
                <Link
                  href={`/${Language}/contact`}
                  className={ButtonClass("Primary", "Md", "w-full")}
                >
                  {BookLabel}
                </Link>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </header>
  );
}
