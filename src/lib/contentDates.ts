import contentDates from "../data/contentDates.generated.json";

export interface ContentDates {
  datePublished: string;
  dateModified: string;
}

const dates = contentDates as Record<string, { datePublished?: string; dateModified?: string }>;

/**
 * Real per-entry publish/modify dates derived from git history
 * (see scripts/derive-content-dates.mjs) — not hardcoded literals.
 * Falls back to today for content not yet present in git history
 * (e.g. an entry added and not yet committed).
 */
export function getContentDates(key: string, fallbackKey?: string): ContentDates {
  const entry = dates[key] || (fallbackKey ? dates[fallbackKey] : undefined);
  const today = new Date().toISOString().slice(0, 10);
  return {
    datePublished: entry?.datePublished || today,
    dateModified: entry?.dateModified || today,
  };
}
