# Repository Forensics Report

**Generated:** 2026-09-10  
**Workspace:** `/workspace/63b72ac8-352e-4e5b-b366-7b9bdabc09e7/sessions/agent_845ef2ee-b175-4255-b01a-a31ff9a67c0a`  
**Status:** IN_PROGRESS  

## Canonical Public-Site Repository
- **Name:** `CodesbyFebin/MCP-SERVERS`
- **Remote URL:** `https://github.com/CodesbyFebin/MCP-SERVERS`
- **Default Branch:** `master`
- **Pushed At:** `2026-08-04T21:48:46.123Z`
- **HEAD Commit SHA:** `e3f244f68a723b28175818c5f3921a9515621e9b`
- **Root Tree Entries:** 29 (0 submodules)
- **Repository Private:** false

## Migration/Reference Repositories

### MCP-SERVER
- **Name:** `CodesbyFebin/MCP-SERVER`
- **Remote URL:** `https://github.com/CodesbyFebin/MCP-SERVER`
- **Default Branch:** `main`
- **Branches:** `main`, `production`
- **Pushed At:** `2026-08-22T06:13:48.000Z`
- **HEAD Commit SHA (main):** `d58768f3e35c3a8713c57b09123e3635f408d82a`
- **Root Tree Entries:** 29 (0 submodules)

### mcp-servers-master
- **Name:** `CodesbyFebin/mcp-servers-master`
- **Remote URL:** `https://github.com/CodesbyFebin/mcp-servers-master`
- **Default Branch:** `production`
- **Branches:** `production`, `master`, `main`, `qa`
- **Pushed At:** `2026-09-09T00:03:13.674Z`
- **HEAD Commit SHA (production):** `533e11e45a134778008259d72e4462296f531567`
- **Root Tree Entries:** 29 (0 submodules)
- **Contains:** `app-mcpserver-in/apps/web` directory

## Git Local Workspace Status
- **Git Executable:** NOT AVAILABLE in this session (no shell tool)
- **Workspace Git State:** Cannot conclusively record remote, branch, or HEAD SHA
- **Previous Agent Note:** "Three delegated research agents exceeded context limits" during prior git metadata attempts

## Live Site Provenance
- **Live URL:** `https://www.mcpserver.in`
- **Health Endpoint SHA:** `d80c461505304679b12c1ce225b6d1d0dc501ff9` (timestamp: `2026-09-10T08:54:07.814Z`)
- **Health SHA Mapping:** Does NOT match any recorded GitHub HEAD SHA (`e3f244f68a723b28175818c5f3921a9515621e9b`, `d58768f3e35c3a8713c57b09123e3635f408d82a`, `533e11e45a134778008259d72e4462296f531567`)
- **Deployment Provenance:** Unresolved - health SHA does not conclusively map to any source repository commit

## Key Findings
1. **Canonical Repository Established:** `CodesbyFebin/MCP-SERVERS` (master branch) is the production authority for `www.mcpserver.in`
2. **Migration Sources Identified:** `MCP-SERVER` and `mcp-servers-master` are migration/reference repositories, not competing production authorities
3. **Live Deployment Gap:** The current live site health SHA (`d80c461505304679b12c1ce225b6d1d0dc501ff9`) cannot be definitively mapped to any GitHub repository commit
4. **Local Git State:** Cannot be conclusively recorded due to tool limitations in this session
5. **Branch Structure:** 
   - `MCP-SERVERS`: master only
   - `MCP-SERVER`: main (default) with production as secondary
   - `mcp-servers-master`: production (default) with master/main/qa as additional branches
6. **Indexability Status:** All 5000 candidate URLs start with `indexable=false` and `publish_approved=false`; these require review before sitemap inclusion

## Critical Context
- **Workspace Path:** `/workspace/63b72ac8-352e-4e5b-b366-7b9bdabc09e7/sessions/agent_845ef2ee-b175-4255-b01a-a31ff9a67c0a`
- **Local Package Versions:** next@16.2.10, react@19.0.1
- **Route Registry Indexed Candidates:** 0 (all candidates require review)
- **Content Inventory Size:** 41,515 records
- **GSC Evidence:** No GSC API token available; search-console.json shows pending-external-access status

## Recommendations
1. Run local git commands to conclusively record remote, branch, and HEAD SHA
2. Map live deployment SHA to source repository through build evidence
3. Reconcile `ROUTE_REGISTRY.json` (`indexed_candidates: 0`) with live site `82` editorial entries and `0` verified servers
4. Complete GSC property setup and submit sitemap for proper indexing data