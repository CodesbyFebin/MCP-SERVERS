import sitemap from "../app/sitemap";
import { GET as getServersJson } from "../app/api/servers.json/route";
import { GET as getRegistryJson } from "../app/mcp-registry.json/route";
import { GET as getLlms } from "../app/llms.txt/route";
import { GET as getLlmsFull } from "../app/llms-full.txt/route";
import { generateStaticParams as getServerStaticParams } from "../app/servers/[slug]/page";
import { servers } from "../src/data/servers";

type Surface = {
  name: string;
  slugs: string[];
};

function normalizeSlugs(values: Iterable<string>): string[] {
  return [...new Set(values)].filter(Boolean).sort();
}

function extractServerSlugs(text: string): string[] {
  const matches = text.matchAll(/\/servers\/([a-z0-9-]+)\/?/g);
  return normalizeSlugs([...matches].map((match) => match[1]));
}

function compareSurface(expected: string[], surface: Surface): string[] {
  const actual = normalizeSlugs(surface.slugs);
  const expectedSet = new Set(expected);
  const actualSet = new Set(actual);
  const missing = expected.filter((slug) => !actualSet.has(slug));
  const extra = actual.filter((slug) => !expectedSet.has(slug));
  const errors: string[] = [];

  if (missing.length) errors.push(`${surface.name}: missing ${missing.join(", ")}`);
  if (extra.length) errors.push(`${surface.name}: extra ${extra.join(", ")}`);

  if (!missing.length && !extra.length) {
    console.log(`✅ ${surface.name}: ${actual.length} server slug(s), exact cohort match.`);
  }

  return errors;
}

async function main() {
  const expected = normalizeSlugs(servers.map((server) => server.slug));
  const errors: string[] = [];

  if (!expected.length) {
    errors.push("Public server cohort is empty; consistency cannot be verified safely.");
  }

  const staticParams = await getServerStaticParams();

  const sitemapSlugs = normalizeSlugs(
    sitemap()
      .map((entry) => new URL(entry.url).pathname)
      .filter((pathname) => /^\/servers\/[a-z0-9-]+\/?$/.test(pathname))
      .map((pathname) => pathname.split("/").filter(Boolean)[1]),
  );

  const serversResponse = await getServersJson();
  if (!serversResponse.ok) {
    errors.push(`/api/servers.json returned HTTP ${serversResponse.status}`);
  }
  const serversPayload = (await serversResponse.json()) as { servers?: Array<{ slug?: string }> };
  const apiSlugs = normalizeSlugs((serversPayload.servers ?? []).map((server) => server.slug ?? ""));

  const registryResponse = await getRegistryJson();
  if (!registryResponse.ok) {
    errors.push(`/mcp-registry.json returned HTTP ${registryResponse.status}`);
  }
  const registryPayload = (await registryResponse.json()) as { servers?: Array<{ slug?: string }> };
  const registrySlugs = normalizeSlugs((registryPayload.servers ?? []).map((server) => server.slug ?? ""));

  const llmsResponse = await getLlms();
  const llmsFullResponse = await getLlmsFull();
  if (!llmsResponse.ok) errors.push(`/llms.txt returned HTTP ${llmsResponse.status}`);
  if (!llmsFullResponse.ok) errors.push(`/llms-full.txt returned HTTP ${llmsFullResponse.status}`);

  const surfaces: Surface[] = [
    {
      name: "/servers/[slug] static params",
      slugs: staticParams.map((param) => param.slug),
    },
    { name: "sitemap server URLs", slugs: sitemapSlugs },
    { name: "/api/servers.json", slugs: apiSlugs },
    { name: "/mcp-registry.json", slugs: registrySlugs },
    { name: "/llms.txt", slugs: extractServerSlugs(await llmsResponse.text()) },
    { name: "/llms-full.txt", slugs: extractServerSlugs(await llmsFullResponse.text()) },
  ];

  console.log(`Publication source cohort: ${expected.length} server slug(s): ${expected.join(", ")}`);

  for (const surface of surfaces) {
    errors.push(...compareSurface(expected, surface));
  }

  if (errors.length) {
    console.error(`\n❌ Publication-surface consistency failed with ${errors.length} error(s):`);
    for (const error of errors) console.error(`- ${error}`);
    process.exit(1);
  }

  console.log("\n✅ All server publication surfaces resolve to the exact Evidence-Ledger public cohort.");
}

main().catch((error) => {
  console.error("❌ Publication-surface consistency check crashed:", error);
  process.exit(1);
});
