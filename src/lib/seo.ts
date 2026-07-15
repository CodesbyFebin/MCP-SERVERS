import { siteConfig } from "../data/site";

export interface SEOProps {
  title: string;
  description: string;
  canonical: string;
  noindex?: boolean;
}

export function generateSEO(
  pageTitle: string,
  pageDescription?: string,
  path: string = ""
): SEOProps {
  const fullTitle = pageTitle.includes(siteConfig.brand)
    ? pageTitle
    : `${pageTitle} | ${siteConfig.brand}.in`;
  
  const desc = pageDescription || siteConfig.description;
  const canonical = `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;

  return {
    title: fullTitle,
    description: desc,
    canonical,
    noindex: false
  };
}
