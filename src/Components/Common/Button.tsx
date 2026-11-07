import Link from "next/link";
import type { ReactNode } from "react";
import { Cn } from "@/Lib/Cn";

type TVariant = "Primary" | "Line" | "Ghost";
type TSize = "Md" | "Sm";

const BASE =
  "inline-flex items-center justify-center gap-2.5 rounded-md font-semibold whitespace-nowrap transition-colors duration-200 border";

const VARIANTS: Record<TVariant, string> = {
  Primary: "bg-primary text-on-primary border-transparent hover:bg-primary-hover",
  Line: "border-line-strong text-ink bg-transparent hover:bg-surface-2",
  Ghost: "border-transparent text-accent-ink hover:bg-accent-soft",
};

const SIZES: Record<TSize, string> = {
  Md: "h-[50px] px-6 text-base",
  Sm: "h-[42px] px-[18px] text-[15px]",
};

type TButtonLinkProps = {
  Href: string;
  children: ReactNode;
  Variant?: TVariant;
  Size?: TSize;
  External?: boolean;
  ClassName?: string;
  AriaLabel?: string;
};

export function ButtonClass(Variant: TVariant = "Primary", Size: TSize = "Md", ClassName?: string): string {
  return Cn(BASE, VARIANTS[Variant], SIZES[Size], ClassName);
}

export function ButtonLink({
  Href,
  children,
  Variant = "Primary",
  Size = "Md",
  External = false,
  ClassName,
  AriaLabel,
}: TButtonLinkProps) {
  const Classes = ButtonClass(Variant, Size, ClassName);
  if (External) {
    return (
      <a href={Href} target="_blank" rel="noopener noreferrer" className={Classes} aria-label={AriaLabel}>
        {children}
      </a>
    );
  }
  return (
    <Link href={Href} className={Classes} aria-label={AriaLabel}>
      {children}
    </Link>
  );
}

export function TextLink({ Href, children, ClassName }: { Href: string; children: ReactNode; ClassName?: string }) {
  return (
    <Link
      href={Href}
      className={Cn(
        "font-semibold text-accent-ink border-b border-current pb-px hover:text-ink transition-colors",
        ClassName,
      )}
    >
      {children}
    </Link>
  );
}
