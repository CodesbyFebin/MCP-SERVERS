export interface SchemaJsonLdProps {
  schema: Record<string, any>;
}

export default function SchemaJsonLd({ schema }: SchemaJsonLdProps) {
  const json = JSON.stringify(schema).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
