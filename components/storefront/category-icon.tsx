import { Car, Cpu, Home, LampCeiling, Package, Sparkles } from "lucide-react";

type CategoryIconProps = {
  slug: string;
};

export function CategoryIcon({ slug }: CategoryIconProps) {
  const iconClassName = "h-7 w-7";

  if (slug.includes("light")) return <LampCeiling className={iconClassName} aria-hidden="true" />;
  if (slug.includes("home")) return <Home className={iconClassName} aria-hidden="true" />;
  if (slug.includes("car")) return <Car className={iconClassName} aria-hidden="true" />;
  if (slug.includes("elect")) return <Cpu className={iconClassName} aria-hidden="true" />;
  if (slug.includes("beauty")) return <Sparkles className={iconClassName} aria-hidden="true" />;

  return <Package className={iconClassName} aria-hidden="true" />;
}
