import type { ReactNode } from "react";
import { Cn } from "@/Lib/Cn";

type TSectionLabelProps = {
  children: ReactNode;
  Index?: string;
  Centered?: boolean;
  ClassName?: string;
};

export function SectionLabel({ children, Index, Centered = false, ClassName }: TSectionLabelProps) {
  return (
    <div
      className={Cn(
        "flex items-center gap-3 text-sm font-semibold leading-snug text-accent-ink",
        Centered && "justify-center",
        ClassName,
      )}
    >
      <span aria-hidden="true" className="size-[9px] shrink-0 rounded-full border-2 border-node bg-page" />
      {Index && <span className="font-mono text-[13px] font-semibold text-ink-soft">{Index}</span>}
      <span>{children}</span>
      {!Centered && (
        <span
          aria-hidden="true"
          className="h-px max-w-40 flex-1 bg-gradient-to-l from-transparent to-trace rtl:bg-gradient-to-r"
        />
      )}
    </div>
  );
}
