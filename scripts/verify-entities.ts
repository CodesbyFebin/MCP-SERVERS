import {
  allEntities,
  CONTENT_FAMILY_META,
  WORKFLOW_STAGES,
  type AnyEntity,
} from "../src/data/entities";

/**
 * Entity registry integrity gate.
 *
 * Enforces the non-negotiable structural rules of the entity model:
 *
 *  - stable IDs are unique
 *  - (family, slug) pairs are unique
 *  - one route has exactly one owning entity
 *  - one primary search intent has exactly one *indexable* owning entity
 *  - routes are canonical-shaped (leading + trailing slash, no origin, no query)
 *  - routes live under their family's declared URL prefix
 *  - publication status is a known workflow stage
 *  - required descriptive fields are present
 *
 * The intent-uniqueness rule is only applied to entities that are actually
 * publishable. Candidates are allowed to share a keyword with a live page
 * because they are not indexable and have not yet been through intent
 * validation — that is precisely what the workflow exists to resolve.
 */

const INDEXABLE_STATUSES = new Set(["publish_approved", "published", "indexed"]);

const errors: string[] = [];
const warnings: string[] = [];

const byId = new Map<string, AnyEntity>();
const byFamilySlug = new Map<string, AnyEntity>();
const byRoute = new Map<string, AnyEntity>();
const byIntent = new Map<string, AnyEntity>();

function normalizeKeyword(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

for (const entity of allEntities) {
  const label = `${entity.family}:${entity.slug}`;

  // ── Required fields ────────────────────────────────────────────────────────
  for (const field of ["id", "slug", "family", "name", "route", "primaryKeyword"] as const) {
    if (!entity[field] || String(entity[field]).trim() === "") {
      errors.push(`[${label}] missing required field "${field}".`);
    }
  }

  if (!entity.metaDescription || entity.metaDescription.trim() === "") {
    warnings.push(`[${label}] has no metaDescription.`);
  }

  // ── Status must be a known workflow stage ──────────────────────────────────
  if (!WORKFLOW_STAGES.includes(entity.status) && entity.status !== "rejected" && entity.status !== "archived") {
    errors.push(`[${label}] has unknown publication status "${entity.status}".`);
  }

  // ── updatedAt must be a real date ──────────────────────────────────────────
  if (entity.updatedAt && Number.isNaN(Date.parse(entity.updatedAt))) {
    errors.push(`[${label}] has unparseable updatedAt "${entity.updatedAt}".`);
  }

  // ── Unique stable ID ───────────────────────────────────────────────────────
  const existingById = byId.get(entity.id);
  if (existingById) {
    errors.push(
      `Duplicate entity id "${entity.id}" used by ${existingById.family}:${existingById.slug} and ${label}.`,
    );
  } else {
    byId.set(entity.id, entity);
  }

  // ── Unique family + slug ───────────────────────────────────────────────────
  const familySlug = `${entity.family}/${entity.slug}`;
  const existingBySlug = byFamilySlug.get(familySlug);
  if (existingBySlug) {
    errors.push(`Duplicate entity for family+slug "${familySlug}".`);
  } else {
    byFamilySlug.set(familySlug, entity);
  }

  // ── Canonical route shape ──────────────────────────────────────────────────
  const route = entity.route;
  if (route) {
    if (/^https?:\/\//i.test(route)) {
      errors.push(`[${label}] route must be origin-relative, found absolute URL "${route}".`);
    } else {
      if (!route.startsWith("/")) {
        errors.push(`[${label}] route "${route}" must start with "/".`);
      }
      if (!route.endsWith("/")) {
        errors.push(`[${label}] route "${route}" must end with a trailing slash.`);
      }
      if (route.includes("?") || route.includes("#")) {
        errors.push(`[${label}] route "${route}" must not contain a query or fragment.`);
      }
      if (route.includes("//") && !route.startsWith("//")) {
        errors.push(`[${label}] route "${route}" contains a double slash.`);
      }
      if (route !== route.toLowerCase()) {
        errors.push(`[${label}] route "${route}" must be lowercase.`);
      }

      // Route must sit under the family's declared prefix.
      const meta = CONTENT_FAMILY_META[entity.family];
      if (meta?.urlPrefix) {
        const prefix = meta.urlPrefix.endsWith("/") ? meta.urlPrefix : `${meta.urlPrefix}/`;
        if (!route.startsWith(prefix)) {
          warnings.push(
            `[${label}] route "${route}" is outside its family prefix "${prefix}".`,
          );
        }
      }

      // ── One route, one owner ───────────────────────────────────────────────
      const existingByRoute = byRoute.get(route);
      if (existingByRoute) {
        errors.push(
          `Duplicate route owner for "${route}": ${existingByRoute.family}:${existingByRoute.slug} and ${label}.`,
        );
      } else {
        byRoute.set(route, entity);
      }
    }
  }

  // ── One primary intent, one indexable owner ────────────────────────────────
  if (entity.primaryKeyword && INDEXABLE_STATUSES.has(entity.status)) {
    const intent = normalizeKeyword(entity.primaryKeyword);
    const existingByIntent = byIntent.get(intent);
    if (existingByIntent) {
      errors.push(
        `Duplicate primary intent "${intent}" owned by both ` +
          `${existingByIntent.family}:${existingByIntent.slug} (${existingByIntent.route}) and ${label} (${entity.route}). ` +
          "Exactly one indexable page may own a primary search intent.",
      );
    } else {
      byIntent.set(intent, entity);
    }
  }
}

const indexableCount = allEntities.filter((e) => INDEXABLE_STATUSES.has(e.status)).length;

if (warnings.length > 0) {
  console.warn(`Entity registry warnings (${warnings.length}):`);
  for (const warning of warnings.slice(0, 25)) console.warn(`  ! ${warning}`);
  if (warnings.length > 25) console.warn(`  ... and ${warnings.length - 25} more.`);
  console.warn("");
}

if (errors.length > 0) {
  console.error(`Entity registry validation FAILED (${errors.length} error(s)):\n`);
  for (const error of errors) console.error(`  - ${error}`);
  process.exit(1);
}

console.log(
  `Entity registry validation passed (${allEntities.length} entities, ${byRoute.size} unique routes, ` +
    `${byIntent.size} unique indexable intents across ${indexableCount} indexable entities).`,
);
