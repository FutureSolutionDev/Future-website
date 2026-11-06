const RESPONSIVE_ROOTS = /^\/(Projects|Products|Team)\/.+\.webp$/;
const SMALL_MAX_WIDTH = 828;

export default function ImageLoader({ src, width }: { src: string; width: number }): string {
  if (!RESPONSIVE_ROOTS.test(src) || width > SMALL_MAX_WIDTH) return src;
  const Slash = src.lastIndexOf("/");
  return `${src.slice(0, Slash)}/Small${src.slice(Slash)}`;
}
