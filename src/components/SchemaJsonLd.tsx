"use client";

import { useEffect } from "react";

export interface SchemaJsonLdProps {
  schema: Record<string, any>;
}

export default function SchemaJsonLd({ schema }: SchemaJsonLdProps) {
  useEffect(() => {
    // Inject schema dynamically into the document head
    const scriptId = `schema-jsonld-${JSON.stringify(schema).slice(0, 30).replace(/[^\w]/g, "")}`;
    let script = document.getElementById(scriptId) as HTMLScriptElement;

    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.type = "application/ld+json";
      script.innerHTML = JSON.stringify(schema);
      document.head.appendChild(script);
    }

    return () => {
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [schema]);

  return null;
}
