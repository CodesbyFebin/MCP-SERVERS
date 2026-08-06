/**
 * Runtime publication registry.
 *
 * Single source of truth for which generated pages are live. The route layer,
 * sitemap, search index, related-page graph, and llms.txt all consume
 * `getPublishedGeneratedPages()` — never the raw content/generated directory.
 *
 * A page is only returned when BOTH publish_approved AND indexable are true,
 * so the 5,000 candidate files cannot leak into production until explicitly
 * approved through the editorial gate.
 */

import fs from "fs";
import path from "path";

export interface PublishedPage {
  id: string;
  url: string;
  route: string;
  content_family: string;
  cluster: string;
  primary_entity: string;
  primary_keyword: string;
  search_intent: string;
  canonical_url: string;
  parent_hub: string;
}

interface RegistryEntry {
  id: string;
  url: string;
  route: string;
  content_family: string;
  cluster: string;
  primary_entity: string;
  primary_keyword: string;
  search_intent: string;
  canonical_url: string;
  parent_hub: string;
  gates: {
    publish_approved: boolean;
    indexable: boolean;
  };
}

const REGISTRY_PATH = path.join(process.cwd(), "PUBLICATION_REGISTRY.json");

let cache: PublishedPage[] | null = null;

function loadRegistry(): RegistryEntry[] {
  if (!fs.existsSync(REGISTRY_PATH)) return [];
  try {
    const data = JSON.parse(fs.readFileSync(REGISTRY_PATH, "utf-8"));
    return data.entries || [];
  } catch {
    return [];
  }
}

/** Pages approved for production (publish_approved && indexable). */
export function getPublishedGeneratedPages(): PublishedPage[] {
  if (cache) return cache;
  const entries = loadRegistry();
  cache = entries
    .filter((e) => e.gates?.publish_approved && e.gates?.indexable)
    .map((e) => ({
      id: e.id,
      url: e.url,
      route: e.route,
      content_family: e.content_family,
      cluster: e.cluster,
      primary_entity: e.primary_entity,
      primary_keyword: e.primary_keyword,
      search_intent: e.search_intent,
      canonical_url: e.canonical_url,
      parent_hub: e.parent_hub,
    }));
  return cache;
}

export function getPublishedRoutes(): string[] {
  return getPublishedGeneratedPages().map((p) => p.route);
}

export function getGeneratedPageByRoute(route: string): PublishedPage | null {
  const normalized = route.startsWith("/") ? route : `/${route}`;
  return getPublishedGeneratedPages().find((p) => p.route === normalized) || null;
}

export function isGeneratedRoutePublished(route: string): boolean {
  return getGeneratedPageByRoute(route) !== null;
}

/** Invalidate the in-process cache (used in tests / dev). */
export function clearPublicationCache() {
  cache = null;
}
