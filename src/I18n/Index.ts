import type { Lang } from "@/Lib/Seo";
import { COMMON_EN } from "./Common/En";
import { COMMON_AR } from "./Common/Ar";
import { HOME_EN } from "./Home/En";
import { HOME_AR } from "./Home/Ar";
import { PAGES_EN } from "./Pages/En";
import { PAGES_AR } from "./Pages/Ar";

const DICTIONARIES = {
  en: { Common: COMMON_EN, Home: HOME_EN, Pages: PAGES_EN },
  ar: { Common: COMMON_AR, Home: HOME_AR, Pages: PAGES_AR },
};

export type TDictionary = (typeof DICTIONARIES)["en"];
export type TCommon = TDictionary["Common"];

export function GetDictionary(Language: Lang): TDictionary {
  return DICTIONARIES[Language];
}
