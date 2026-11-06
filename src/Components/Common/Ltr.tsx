import type { ReactNode } from "react";

export function Ltr({ children, ClassName }: { children: ReactNode; ClassName?: string }) {
  return (
    <bdi dir="ltr" className={ClassName}>
      {children}
    </bdi>
  );
}
