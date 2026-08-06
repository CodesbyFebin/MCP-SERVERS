# ADR: Package Manager and Lockfile Ownership

Date: 2026-08-05

## Decision

MCPserver.in uses npm as the authoritative package manager.

The only project lockfile is:

- `package-lock.json`

The local install command is:

```bash
npm ci
```

The local development command is:

```bash
npm run dev
```

## Context

The repository contains a Next.js 16 app with `package.json` and a root `package-lock.json`.
No `pnpm-lock.yaml`, `yarn.lock`, or `bun.lockb` is used by the application.

The previous build warning came from a parent home-directory lockfile at `/Users/cyberteck/package-lock.json`.
That file is outside this repository and is not part of MCPserver.in. The app now pins `outputFileTracingRoot`
and `turbopack.root` in `next.config.js` to the repository directory so Next.js does not infer the parent folder.

The `.kilo` and `.kilocode` directories contained local tool/plugin lockfiles. Those lockfiles were removed because
they are not production install state for the MCPserver.in app and created lockfile ambiguity inside the repository.

## Consequences

- CI and local installs should use `npm ci`.
- The root `package-lock.json` must be committed and kept in sync with `package.json`.
- Additional package-manager lockfiles should not be added unless this ADR is superseded.
- Local tool/plugin folders must not introduce production lockfile ambiguity.
