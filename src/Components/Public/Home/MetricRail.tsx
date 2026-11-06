import type { Lang, TBilingual } from "@/Lib/Seo";

type TMetricRailProps = {
  Items: { Value: string; Label: TBilingual }[];
  Language: Lang;
};

export function MetricRail({ Items, Language }: TMetricRailProps) {
  return (
    <dl className="relative mt-14 grid grid-cols-2 gap-y-8 pb-12 md:mt-16 md:grid-cols-4 md:pt-0 md:before:absolute md:before:inset-x-0 md:before:top-0 md:before:h-px md:before:bg-trace">
      {Items.map((Item) => (
        <div
          key={Item.Value + Item.Label.en}
          className="relative ps-5 before:absolute before:start-0 before:top-2.5 before:size-[11px] before:rounded-full before:border-2 before:border-node before:bg-page md:ps-0 md:pt-7 md:pe-6 md:before:-top-[5px]"
        >
          <dt className="sr-only">{Item.Label[Language]}</dt>
          <dd>
            <b className="block font-latin text-[28px] leading-tight font-bold tracking-tight md:text-[38px]">
              <bdi dir="ltr">{Item.Value}</bdi>
            </b>
            <span aria-hidden="true" className="text-[15px] text-ink-muted">
              {Item.Label[Language]}
            </span>
          </dd>
        </div>
      ))}
    </dl>
  );
}
