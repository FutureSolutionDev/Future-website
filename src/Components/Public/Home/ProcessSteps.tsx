import { PROCESS_STEPS } from "@/Data/Process";
import type { Lang } from "@/Lib/Seo";

export function ProcessSteps({ Language }: { Language: Lang }) {
  return (
    <ol className="relative mt-12 grid gap-0 md:mt-14 md:grid-cols-4 md:gap-7 before:absolute before:inset-y-0 before:start-[19px] before:w-px before:bg-line-strong md:before:inset-x-0 md:before:inset-y-auto md:before:top-[19px] md:before:h-px md:before:w-auto">
      {PROCESS_STEPS.map((Step, Index) => (
        <li key={Step.Title.en} className="relative grid grid-cols-[38px_1fr] gap-x-4 pb-7 md:block md:pb-0">
          <span className="relative row-span-2 grid size-[38px] place-items-center rounded-full border-[1.5px] border-accent bg-page font-mono text-[13px] font-semibold text-accent-ink md:mb-5">
            <bdi dir="ltr">{String(Index + 1).padStart(2, "0")}</bdi>
          </span>
          <h3 className="text-[19px] font-bold">{Step.Title[Language]}</h3>
          <p className="mt-2 text-[15px] text-ink-muted">{Step.Description[Language]}</p>
        </li>
      ))}
    </ol>
  );
}
