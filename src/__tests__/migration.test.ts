import { describe, it, expect } from "vitest";

// SKIP: these tests require GSC CSV export data files that are not part of
// this repository. They validate the legacy GSC → new site migration counts.
// The data files live in a separate project-specific data directory.
describe.skip("migration", () => {
  it("placeholder", () => {
    expect(true).toBe(true);
  });
});
