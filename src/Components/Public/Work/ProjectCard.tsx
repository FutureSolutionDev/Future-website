import Image from "next/image";
import Link from "next/link";
import { OutArrow } from "@/Components/Common/Icon";
import { Cn } from "@/Lib/Cn";

type TProjectCardProps = {
  Href: string;
  ImageSrc?: string;
  ImageAlt: string;
  Kicker: string;
  Title: string;
  Text: string;
  Badge?: string;
  Muted?: boolean;
};

export function ProjectCard({ Href, ImageSrc, ImageAlt, Kicker, Title, Text, Badge, Muted = false }: TProjectCardProps) {
  return (
    <Link href={Href} className="group block">
      <figure className="relative aspect-video overflow-hidden rounded-lg border border-line bg-subtle">
        {ImageSrc ? (
          <Image
            src={ImageSrc}
            alt={ImageAlt}
            width={960}
            height={540}
            sizes="(min-width: 768px) 50vw, 100vw"
            className={Cn("h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]", Muted && "opacity-90")}
          />
        ) : (
          <span aria-hidden="true" className="grid h-full place-items-center font-latin text-3xl font-bold text-ink-soft">
            {Title}
          </span>
        )}
        {Badge && (
          <span className="absolute start-3 top-3 rounded-full border border-line bg-surface/95 px-3 py-1 text-xs font-semibold text-accent-ink backdrop-blur">
            {Badge}
          </span>
        )}
      </figure>
      <div className="flex items-start justify-between gap-4 pt-4">
        <div>
          <p className="text-[13px] font-medium text-accent-ink">{Kicker}</p>
          <h3 className="mt-0.5 text-[22px] font-bold transition-colors group-hover:text-accent-ink">{Title}</h3>
          <p className="mt-1 text-[15px] text-ink-muted">{Text}</p>
        </div>
        <OutArrow ClassName="mt-1 text-ink-soft transition-transform group-hover:-translate-y-0.5 group-hover:text-accent" />
      </div>
    </Link>
  );
}
