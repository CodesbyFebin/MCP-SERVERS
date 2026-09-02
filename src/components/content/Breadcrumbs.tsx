import Link from "next/link";

interface Crumb {
  label: string;
  href?: string;
}

/**
 * Breadcrumbs render a visible navigation trail only.
 * JSON-LD BreadcrumbList is the responsibility of the page component that
 * calls this — it must use `breadcrumbJsonLd()` from @/src/seo/breadcrumbs
 * and include it in the page's schema block. Keeping the two concerns separate
 * prevents the double-BreadcrumbList bug.
 */
export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  if (crumbs.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-500 dark:text-slate-400">
      <ol className="flex flex-wrap items-center gap-1">
        <li>
          <Link href="/" className="hover:underline">Home</Link>
        </li>
        {crumbs.map((c, i) => {
          const isLast = i === crumbs.length - 1;
          return (
            <li key={i} className="flex items-center gap-1">
              <span aria-hidden="true">›</span>
              {c.href && !isLast ? (
                <Link href={c.href} className="hover:underline">{c.label}</Link>
              ) : (
                <span aria-current={isLast ? "page" : undefined} className="text-slate-700 dark:text-slate-300">
                  {c.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
