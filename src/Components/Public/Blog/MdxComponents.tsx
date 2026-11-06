import type { ComponentPropsWithoutRef } from "react";
import { Icon } from "@/Components/Common/Icon";

function Box({ children }: { children: React.ReactNode }) {
  return <div className="not-prose my-7 rounded-lg border border-line bg-subtle p-6">{children}</div>;
}

export function Highlights({ items }: { items: string[] }) {
  return (
    <Box>
      <ul className="grid gap-3">
        {items.map((Item) => (
          <li key={Item} className="flex gap-3">
            <Icon Name="Check" Size={20} ClassName="mt-1 text-accent" />
            <span>{Item}</span>
          </li>
        ))}
      </ul>
    </Box>
  );
}

export function Steps({ items }: { items: { title: string; description: string }[] }) {
  return (
    <ol className="not-prose relative my-8 grid gap-6 ps-12 before:absolute before:inset-y-2 before:start-[18px] before:w-px before:bg-line-strong">
      {items.map((Step, Index) => (
        <li key={Step.title} className="relative">
          <span className="absolute -start-12 top-0 grid size-9 place-items-center rounded-full border-[1.5px] border-accent bg-page font-mono text-[13px] font-semibold text-accent-ink">
            <bdi dir="ltr">{Index + 1}</bdi>
          </span>
          <h4 className="text-lg font-bold">{Step.title}</h4>
          <p className="mt-1 text-ink-muted">{Step.description}</p>
        </li>
      ))}
    </ol>
  );
}

export function Features({ items }: { items: { name: string; description: string }[] }) {
  return (
    <div className="not-prose my-8 grid gap-4 md:grid-cols-2">
      {items.map((Feature) => (
        <div key={Feature.name} className="rounded-lg border border-line bg-surface p-5 shadow-card">
          <h4 className="flex items-center gap-2.5 font-bold">
            <Icon Name="Zap" Size={18} ClassName="text-accent" />
            {Feature.name}
          </h4>
          <p className="mt-2 text-[15px] text-ink-muted">{Feature.description}</p>
        </div>
      ))}
    </div>
  );
}

export function Tech({ items }: { items: string[] }) {
  return (
    <ul className="not-prose my-7 flex flex-wrap gap-2" lang="en">
      {items.map((Item) => (
        <li key={Item} className="rounded-full border border-line px-3.5 py-1 font-mono text-sm text-ink-muted">
          {Item}
        </li>
      ))}
    </ul>
  );
}

export function Stats({ items }: { items: { value: string; label: string }[] }) {
  return (
    <dl className="not-prose my-8 grid grid-cols-1 overflow-hidden rounded-lg border border-line sm:grid-cols-3">
      {items.map((Stat, Index) => (
        <div key={Stat.label} className={"p-5 " + (Index > 0 ? "border-line max-sm:border-t sm:border-s" : "")}>
          <dt className="sr-only">{Stat.label}</dt>
          <dd>
            <b className="block font-latin text-3xl font-bold text-accent-ink">
              <bdi dir="auto">{Stat.value}</bdi>
            </b>
            <span className="text-sm text-ink-muted">{Stat.label}</span>
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function ArticleMdxComponents(HeadingIds: string[]) {
  let HeadingIndex = 0;
  return {
    h2: ({ children, ...Props }: ComponentPropsWithoutRef<"h2">) => <h2 id={HeadingIds[HeadingIndex++]} {...Props}>{children}</h2>,
    table: (Props: ComponentPropsWithoutRef<"table">) => (
      <div className="my-6 overflow-x-auto">
        <table {...Props} />
      </div>
    ),
    Highlights,
    Steps,
    Features,
    Tech,
    Stats,
  };
}
