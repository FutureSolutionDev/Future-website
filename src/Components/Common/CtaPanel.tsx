import { MessageCircle } from "lucide-react";
import { ButtonLink } from "./Button";
import { PanelTraces } from "./CircuitTraces";
import { WhatsAppLink } from "@/Lib/Site";
import { PathFor, type Lang } from "@/Lib/Seo";
import type { TCommon } from "@/I18n/Index";

type TCtaPanelProps = {
  Language: Lang;
  Common: TCommon;
  Title?: string;
  Text?: string;
};

export function CtaPanel({ Language, Common, Title, Text }: TCtaPanelProps) {
  return (
    <section className="container-page pb-20 md:pb-[104px]">
      <div data-theme="inverse" className="relative overflow-hidden rounded-xl px-6 py-10 md:p-14">
        <PanelTraces />
        <div className="relative flex flex-wrap items-center justify-between gap-8">
          <div className="max-w-xl">
            <h2 className="text-[28px] font-bold md:text-[38px]">{Title ?? Common.CtaPanel.Title}</h2>
            <p className="mt-2.5 text-[17px] text-ink-muted md:text-lg">{Text ?? Common.CtaPanel.Text}</p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <ButtonLink Href={PathFor(Language, "/contact")}>{Common.Cta.StartProject}</ButtonLink>
            <ButtonLink Href={WhatsAppLink()} External Variant="Line">
              <MessageCircle size={18} aria-hidden="true" />
              {Common.Cta.WhatsApp}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
