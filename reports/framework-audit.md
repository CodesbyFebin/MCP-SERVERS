# Framework Audit

Generated: 2026-08-04T19:03:09.830Z

## Framework

- Framework: Next.js
- Version: ^16.2.10
- App Router: yes

## Package Manager

- Decision: npm
- Authoritative lockfile: package-lock.json
- Install command: npm ci
- Lockfiles found:
  - ./package-lock.json
  - /Users/cyberteck/package-lock.json

## Routing Ownership

- Root proxy.ts exists: true
- Deprecated middleware.ts exists: false
- src/proxy.ts exists: false
- Proxy owns host/protocol/slash/query canonicalization and composite legacy intent consolidation.
- next.config.js owns rewrites and currently returns no duplicate permanent redirects.
- vercel.json owns deterministic historical blog/glossary redirects only.

## Risks

- Parent home-directory package-lock.json exists; Next root must be pinned.

## Files Requiring Modification

- proxy.ts
- next.config.js
- vercel.json
- package.json
- docs/adr/lockfile-and-package-manager.md
