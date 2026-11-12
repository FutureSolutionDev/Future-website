const RESPONSIVE_ROOTS = /^\/(Projects|Products|Team)\/.+\.webp$/;
const SMALL_MAX_WIDTH = 750;

export default function ImageLoader({ src, width }: { src: string; width: number }): string {
  const [Pathname, Query] = src.split("?");
  if (!RESPONSIVE_ROOTS.test(Pathname) || width > SMALL_MAX_WIDTH) return src;
  const Slash = Pathname.lastIndexOf("/");
  const Small = `${Pathname.slice(0, Slash)}/Small${Pathname.slice(Slash)}`;
  return Query ? `${Small}?${Query}` : Small;
}
