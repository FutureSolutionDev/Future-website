export function JsonLd({ Data }: { Data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(Data).replace(/</g, "\\u003c") }}
    />
  );
}
