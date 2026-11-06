import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function Cn(...Inputs: ClassValue[]): string {
  return twMerge(clsx(Inputs));
}
