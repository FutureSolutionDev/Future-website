import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PUBLIC_DIR = path.join(process.cwd(), "public");
const VERSIONED_ROOTS = ["Projects", "Products", "Team", "og"];
const IMAGE_FILE = /\.(webp|png|jpe?g|avif)$/i;
const HASH_LENGTH = 10;
const CACHE = new Map<string, string>();

function DiskPath(PublicPath: string): string {
  return path.join(PUBLIC_DIR, ...PublicPath.split("?")[0].split("/").filter(Boolean));
}

function SmallSibling(File: string): string {
  return path.join(path.dirname(File), "Small", path.basename(File));
}

export function AssetHash(PublicPath: string): string | null {
  const Cached = CACHE.get(PublicPath);
  if (Cached) return Cached;
  const File = DiskPath(PublicPath);
  if (!fs.existsSync(File)) return null;
  const Hash = crypto.createHash("sha1").update(fs.readFileSync(File));
  const Small = SmallSibling(File);
  if (fs.existsSync(Small)) Hash.update(fs.readFileSync(Small));
  const Value = Hash.digest("hex").slice(0, HASH_LENGTH);
  CACHE.set(PublicPath, Value);
  return Value;
}

export function Versioned(PublicPath: string): string {
  if (PublicPath.includes("?")) return PublicPath;
  const Hash = AssetHash(PublicPath);
  return Hash ? `${PublicPath}?v=${Hash}` : PublicPath;
}

function CollectImages(Dir: string, Prefix: string, Out: string[]): void {
  if (!fs.existsSync(Dir)) return;
  for (const Entry of fs.readdirSync(Dir, { withFileTypes: true }).sort((A, B) => A.name.localeCompare(B.name))) {
    const Child = `${Prefix}/${Entry.name}`;
    if (Entry.isDirectory()) CollectImages(path.join(Dir, Entry.name), Child, Out);
    else if (IMAGE_FILE.test(Entry.name)) Out.push(Child);
  }
}

export function ImagesRelease(): string {
  const Files: string[] = [];
  for (const Root of VERSIONED_ROOTS) CollectImages(path.join(PUBLIC_DIR, Root), `/${Root}`, Files);
  const Hash = crypto.createHash("sha1");
  for (const File of Files) Hash.update(`${File}:${AssetHash(File) ?? ""}\n`);
  return Hash.digest("hex").slice(0, HASH_LENGTH);
}
