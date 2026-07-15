import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import SchemaJsonLd from "./SchemaJsonLd";
import { siteConfig } from "../data/site";

export interface BreadcrumbItem {
  name: string;
  href: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  // Construct BreadcrumbList schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteConfig.url
      },
      ...items.map((item, idx) => ({
        "@type": "ListItem",
        "position": idx + 2,
        "name": item.name,
        "item": item.href.startsWith("http") ? item.href : `${siteConfig.url}${item.href}`
      }))
    ]
  };

  return (
    <nav aria-label="Breadcrumb" className="py-3 flex items-center flex-wrap gap-2 text-xs text-gray-500 mb-6 border-b border-gray-900/40">
      <SchemaJsonLd schema={breadcrumbSchema} />
      <Link id="breadcrumb-home" href="/" className="flex items-center gap-1 hover:text-cyan-400 transition-colors">
        <Home className="w-3.5 h-3.5" />
        <span>Home</span>
      </Link>
      {items.map((item, idx) => (
        <div key={idx} className="flex items-center gap-2">
          <ChevronRight className="w-3 h-3 text-gray-700 shrink-0" />
          {idx === items.length - 1 ? (
            <span className="text-gray-300 font-medium truncate max-w-[200px] sm:max-w-xs">{item.name}</span>
          ) : (
            <Link
              href={item.href}
              className="hover:text-cyan-400 transition-colors truncate max-w-[150px] sm:max-w-xs"
            >
              {item.name}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}

