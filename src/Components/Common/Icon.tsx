import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Brain,
  Check,
  Cloud,
  Code2,
  Compass,
  Eye,
  Globe,
  Handshake,
  Layers,
  LineChart,
  PackageCheck,
  Rocket,
  Server,
  Shield,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Users,
  Wallet,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Cn } from "@/Lib/Cn";

const ICONS = {
  ArrowRight, ArrowUpRight, BarChart: BarChart3, Brain, Check, Cloud, Code: Code2, Compass,
  Eye, Globe, Handshake, Layers, LineChart, PackageCheck, Rocket, Server,
  Shield, ShieldCheck, ShoppingCart, Smartphone, Users, Wallet, Zap,
} satisfies Record<string, LucideIcon>;

export type TIconName = keyof typeof ICONS;

type TIconProps = {
  Name: TIconName;
  Size?: number;
  ClassName?: string;
};

export function Icon({ Name, Size = 20, ClassName }: TIconProps) {
  const Glyph = ICONS[Name];
  return <Glyph size={Size} strokeWidth={1.8} aria-hidden="true" className={Cn("shrink-0", ClassName)} />;
}

export function ForwardArrow({ Size = 18, ClassName }: { Size?: number; ClassName?: string }) {
  return <Icon Name="ArrowRight" Size={Size} ClassName={Cn("rtl:-scale-x-100", ClassName)} />;
}

export function OutArrow({ Size = 20, ClassName }: { Size?: number; ClassName?: string }) {
  return <Icon Name="ArrowUpRight" Size={Size} ClassName={Cn("rtl:-scale-x-100", ClassName)} />;
}
