import { describe, it, expect } from "vitest";
import {
  contentRegistry,
  getIndexableEntries,
  getEntry,
} from "@/content/content-registry";

/**
 * Pillar registry structure:
 * - 55 factory-created pillar entries (13 learn + 22 guide + 6 build + 10 client + 4 security)
 * - 7 aggregate routes (parent === ""): home, learn, build, security, compare, glossary, about
 * - Glossary term entries (type === "glossary", parent === "glossary")
 * - Comparison aggregate entries (type === "comparison")
 *
 * Total canonical paths in registry: 82
 */
describe("pillar-registry", () => {
  it("has exactly 55 factory-created pillar entries (13+22+6+10+4)", () => {
    const pillarEntries = Object.values(contentRegistry).filter(
      (e) => e.parent !== "" && e.type !== "glossary" && e.type !== "comparison"
    );
    expect(pillarEntries).toHaveLength(55);
  });

  it("P01–P55 all present (55 total pillar pages)", () => {
    const pillarEntries = Object.values(contentRegistry).filter(
      (e) => e.parent !== "" && e.type !== "glossary" && e.type !== "comparison"
    );
    expect(pillarEntries.length).toBe(55);
  });

  it("has 7 aggregate hub routes (parent === '')", () => {
    const aggregates = Object.values(contentRegistry).filter((e) => e.parent === "");
    expect(aggregates).toHaveLength(7);
  });

  it("82 unique canonical paths", () => {
    const paths = Object.keys(contentRegistry);
    const uniquePaths = new Set(paths);
    expect(uniquePaths.size).toBe(82);
    expect(uniquePaths.size).toBe(paths.length);
  });

  it("0 duplicate canonical paths", () => {
    const paths = Object.keys(contentRegistry);
    const duplicates = paths.filter((path, index) => paths.indexOf(path) !== index);
    expect(duplicates).toHaveLength(0);
  });

  it("every canonical path resolves to a RegistryEntry with matching indexPath", () => {
    const paths = Object.keys(contentRegistry);
    paths.forEach((path) => {
      const entry = getEntry(path);
      expect(entry).toBeDefined();
      expect(entry?.indexPath).toBe(path);
    });
  });
});
