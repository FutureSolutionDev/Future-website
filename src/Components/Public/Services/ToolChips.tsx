import { PRODUCTS, ProductName } from "@/Data/Products";
import type { Lang } from "@/Lib/Seo";
import { Cn } from "@/Lib/Cn";

function ToolLabel(Tool: string, Language: Lang): string {
  const Own = PRODUCTS.find((Product) => Product.Name === Tool);
  return Own ? ProductName(Own, Language) : Tool;
}

export function ToolChips({ Tools, Language, ClassName }: { Tools: string[]; Language: Lang; ClassName?: string }) {
  return (
    <ul className={Cn("flex flex-wrap gap-2", ClassName)}>
      {Tools.map((Tool) => {
        const Label = ToolLabel(Tool, Language);
        const IsLatin = Label === Tool;
        return (
          <li
            key={Tool}
            lang={IsLatin ? "en" : undefined}
            className={Cn(
              "rounded-full border border-line bg-surface px-3 py-1 text-xs text-ink-muted",
              IsLatin ? "font-mono" : "font-semibold",
            )}
          >
            {Label}
          </li>
        );
      })}
    </ul>
  );
}
