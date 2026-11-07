import { AI_SERVICE } from "./Ai";
import { HOSTING_SERVICE } from "./Hosting";
import { MOBILE_SERVICE } from "./Mobile";
import { SAAS_SERVICE } from "./Saas";
import { SECURITY_SERVICE } from "./Security";
import type { TService } from "./Types";
import { WEB_SERVICE } from "./Web";

export * from "./Types";

export const SERVICES: TService[] = [WEB_SERVICE, MOBILE_SERVICE, SAAS_SERVICE, AI_SERVICE, HOSTING_SERVICE, SECURITY_SERVICE];

export function ServiceStack(Service: TService): string[] {
  return Service.StackGroups.flatMap((Group) => Group.Tools);
}

export const TECH_EXPERTISE: string[] = Array.from(new Set(SERVICES.flatMap(ServiceStack)));

export function GetServiceById(Id: string): TService | undefined {
  return SERVICES.find((Service) => Service.Id === Id);
}
