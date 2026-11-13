const CACHE_NAME = "fs-images-7219b8af7b";
const MAX_ENTRIES = 80;
const IMAGE_PATH = /^\/(Projects|Products|Team|og)\/.+\.(webp|png|jpe?g|avif)$/i;

self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("activate", (Event) => {
  Event.waitUntil(
    caches.keys()
      .then((Keys) => Promise.all(Keys.filter((Key) => Key.startsWith("fs-images-") && Key !== CACHE_NAME).map((Key) => caches.delete(Key))))
      .then(() => self.clients.claim()),
  );
});

async function Trim(Cache) {
  const Keys = await Cache.keys();
  for (let Index = 0; Index < Keys.length - MAX_ENTRIES; Index++) await Cache.delete(Keys[Index]);
}

async function FromCache(Request) {
  const Cache = await caches.open(CACHE_NAME);
  const Hit = await Cache.match(Request);
  if (Hit) return Hit;
  const Response = await fetch(Request);
  if (Response.ok && Response.type === "basic") {
    await Cache.put(Request, Response.clone());
    await Trim(Cache);
  }
  return Response;
}

self.addEventListener("fetch", (Event) => {
  const Request = Event.request;
  if (Request.method !== "GET") return;
  const Url = new URL(Request.url);
  if (Url.origin !== self.location.origin || !Url.searchParams.has("v") || !IMAGE_PATH.test(Url.pathname)) return;
  Event.respondWith(FromCache(Request).catch(() => fetch(Request)));
});
