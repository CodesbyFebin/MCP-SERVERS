#!/usr/bin/env python3
"""
MCPserver.in — SEO / AEO / GEO MACHINE-READABLE CERTIFICATION

Validates robots.txt, llms.txt, ai.txt, and sitemap.xml against the
publication-authority contract.

Corrections vs the proposed audit:
  - urllib instead of `requests` (no external dependency).
  - Sitemap leak check is LEDGER-DRIVEN, not family-based: the sitemap must
    EXACTLY equal the published indexable cohort (sitemap ⊆ indexable AND
    indexable ⊆ sitemap). The proposed blanket check on /glossary/ would
    falsely flag the 21 legitimately published glossary entries.
  - /llms.txt checks verify real link targets (mcp-registry.json, /pillars).
  - /ai.txt requires the machine-source pointers (Registry/LLMs-Info/Policy).

Usage: python3 scripts/audit_seo_aeo_geo.py [http://127.0.0.1:3100]
"""

import csv
import json
import re
import sys
import urllib.request
import xml.etree.ElementTree as ET
from pathlib import Path

TARGET_URL = (sys.argv[1] if len(sys.argv) > 1 else "http://127.0.0.1:3100").rstrip("/")
ROOT = Path(__file__).parent.parent
LEDGER_PATH = ROOT / "reports" / "milestone-7-migration-ledger.csv"
TIMEOUT = 15
NS = "{http://www.sitemaps.org/schemas/sitemap/0.9}"

GREEN, RED, CYAN, BOLD, END = "\033[92m", "\033[91m", "\033[96m", "\033[1m", "\033[0m"


def log_pass(msg): print(f"{GREEN}PASS {msg}{END}")
def log_fail(msg): print(f"{RED}FAIL {msg}{END}")
def log_info(msg): print(f"{CYAN}--   {msg}{END}")
def log_header(msg): print(f"\n{BOLD}{'=' * 60}\n{msg}\n{'=' * 60}{END}")


def fetch(url):
    req = urllib.request.Request(url, headers={"User-Agent": "mcpserver-machine-audit/1.0"})
    try:
        with urllib.request.urlopen(req, timeout=TIMEOUT) as res:
            return res.status, res.read(), dict(res.headers)
    except urllib.error.HTTPError as e:
        return e.code, b"", dict(e.headers)
    except Exception as e:
        return None, b"", {"error": str(e)}


def ledger_sets():
    """Ledger-derived sets: (cohort, redirect_sources, gone).

    The ledger is the authority for MIGRATION decisions on legacy URLs, not
    for live indexability: KEEP/DEFER rows may currently serve as noindex
    stubs (e.g. /blog), and DEFER_NOINDEX rows may be fully published in the
    registry (e.g. glossary entries). The sitemap contract is therefore
    checked against LIVE runtime truth (below), using the ledger for
    redirect/gone leak detection and legacy coverage.
    """
    cohort, redirects, gone = set(), set(), set()
    with open(LEDGER_PATH, encoding="utf-8") as f:
        for row in csv.DictReader(f):
            path = row["canonical_url"].replace("https://www.mcpserver.in", "").rstrip("/") or "/"
            dec = row["decision"].strip()
            status = row["canonical_route_status"].strip()
            if dec == "REDIRECT_301":
                redirects.add(path)
            elif dec == "GONE_410":
                gone.add(path)
            elif (dec == "KEEP_INDEXED" and status == "served") or dec == "DEFER_NOINDEX":
                cohort.add(path)
    return cohort, redirects, gone


# Core hub surfaces declared in llms.txt / navigation. Each must be either in
# the sitemap or live-noindex — a hub accidentally dropped from the sitemap
# (or advertising itself while noindex) is a certification failure.
HUB_SURFACES = [
    "/", "/servers", "/pillars", "/docs", "/categories", "/capabilities",
    "/evidence", "/methodology", "/editorial-policy", "/about",
]

_live_cache = {}


def live_state(path):
    """(reachable, noindex) for a path, cached. noindex = X-Robots-Tag or
    <meta name="robots" content="...noindex...">."""
    if path in _live_cache:
        return _live_cache[path]
    status, body, headers = fetch(f"{TARGET_URL}{path}")
    reachable = status == 200
    noindex = False
    if reachable:
        if "noindex" in headers.get("X-Robots-Tag", "").lower():
            noindex = True
        else:
            html = body.decode("utf-8", "replace")
            for tag in re.findall(r"<meta\s[^>]*>", html, re.I):
                if re.search(r"name\s*=\s*[\"']robots[\"']", tag, re.I) and \
                   re.search(r"content\s*=\s*[\"'][^\"']*noindex", tag, re.I):
                    noindex = True
                    break
    _live_cache[path] = (reachable, noindex)
    return _live_cache[path]


def validate_robots():
    log_header("1. ROBOTS.TXT (crawler directives)")
    status, body, _ = fetch(f"{TARGET_URL}/robots.txt")
    if status != 200:
        log_fail(f"robots.txt unreachable (status={status})")
        return False
    content = body.decode("utf-8", "replace")
    passed = True

    for required in ["Disallow: /api/", "Disallow: /admin/", "Disallow: /drafts/", "Disallow: /internal/"]:
        if required in content:
            log_pass(f"{required} present (private surfaces blocked)")
        else:
            log_fail(f"missing '{required}'")
            passed = False

    if re.search(r"^Sitemap:\s*https://www\.mcpserver\.in/sitemap\.xml$", content, re.M):
        log_pass("Sitemap pointer present and correct")
    else:
        log_fail("missing/incorrect Sitemap pointer")
        passed = False

    # GEO doctrine: AI agents must be ALLOWED (this site's core strategy is
    # LLM discoverability). The audit asserts the allows stay in place.
    for agent in ["GPTBot", "ClaudeBot", "PerplexityBot"]:
        m = re.search(rf"User-agent:\s*{agent}\n(.*?)(?=\nUser-agent:|\Z)", content, re.S)
        if m and "Allow: /" in m.group(1):
            log_pass(f"{agent} explicitly allowed (GEO doctrine preserved)")
        else:
            log_fail(f"{agent} allow-directive missing — GEO strategy broken")
            passed = False
    return passed


def validate_llms():
    log_header("2. LLMS.TXT (LLM discovery & GEO)")
    status, body, headers = fetch(f"{TARGET_URL}/llms.txt")
    if status != 200:
        log_fail(f"llms.txt unreachable (status={status})")
        return False
    content = body.decode("utf-8", "replace")
    passed = True

    if content.startswith("# "):
        log_pass("valid Markdown H1 header present")
    else:
        log_fail("must start with a Markdown H1")
        passed = False

    ct = headers.get("Content-Type", "")
    if "text/plain" in ct or "text/markdown" in ct:
        log_pass(f"content-type text ({ct})")
    else:
        log_fail(f"unexpected content-type: {ct}")
        passed = False

    for label, target in [
        ("/servers", "https://www.mcpserver.in/servers"),
        ("/pillars", "https://www.mcpserver.in/pillars"),
        ("registry", "https://www.mcpserver.in/mcp-registry.json"),
        ("llms-full", "https://www.mcpserver.in/llms-full.txt"),
    ]:
        if target in content:
            log_pass(f"links {label} ({target})")
        else:
            log_fail(f"missing link to {target}")
            passed = False

    # Every link target in llms.txt must be a real surface (no fabrication):
    # page links must resolve 200 and be indexable; machine surfaces
    # (.json/.txt/.xml) must resolve 200.
    links = re.findall(r"\]\((https://www\.mcpserver\.in[^)]*)\)", content)
    n_page = 0
    fab = []
    for target in links:
        path = target.replace("https://www.mcpserver.in", "").rstrip("/") or "/"
        reachable, noindex = live_state(path)
        if not reachable:
            fab.append(f"{path} unreachable")
        elif noindex and not path.endswith((".json", ".txt", ".xml")):
            fab.append(f"{path} serves noindex")
        if not path.endswith((".json", ".txt", ".xml")):
            n_page += 1
    if fab:
        log_fail(f"{len(fab)} llms.txt links point at non-serving/noindex surfaces (fabrication):")
        for p in fab[:5]:
            print(f"     - {p}")
        passed = False
    else:
        log_pass(f"all {len(links)} llms.txt link targets resolve live ({n_page} page links)")
    log_info(f"{len(links)} canonical links listed")
    return passed


def validate_ai_manifest():
    log_header("3. AI.TXT (agent manifest)")
    status, body, headers = fetch(f"{TARGET_URL}/ai.txt")
    if status != 200:
        log_fail(f"/ai.txt unreachable (status={status})")
        return False
    root_body = body.decode("utf-8", "replace")

    status2, body2, _ = fetch(f"{TARGET_URL}/.well-known/ai.txt")
    wk_body = body2.decode("utf-8", "replace") if status2 == 200 else None

    passed = True
    if "text/plain" in headers.get("Content-Type", ""):
        log_pass("content-type text/plain")
    else:
        log_fail(f"unexpected content-type: {headers.get('Content-Type')}")
        passed = False

    for field in ["Registry: https://www.mcpserver.in/mcp-registry.json",
                  "LLMs-Info: https://www.mcpserver.in/llms.txt",
                  "Policy: https://www.mcpserver.in/robots.txt",
                  "Canonical: https://www.mcpserver.in"]:
        if field in root_body:
            log_pass(field)
        else:
            log_fail(f"missing '{field}'")
            passed = False

    if wk_body == root_body:
        log_pass("/.well-known/ai.txt mirrors /ai.txt byte-for-byte")
    else:
        log_fail("/.well-known/ai.txt diverges from /ai.txt")
        passed = False
    return passed


def validate_sitemap():
    log_header("4. SITEMAP.XML (indexability cohort exactness)")
    status, body, _ = fetch(f"{TARGET_URL}/sitemap.xml")
    if status != 200:
        log_fail(f"sitemap.xml unreachable (status={status})")
        return False
    try:
        root = ET.fromstring(body)
    except ET.ParseError as e:
        log_fail(f"invalid XML: {e}")
        return False

    urls = [el.text for el in root.iter(f"{NS}loc")]
    log_info(f"{len(urls)} URLs in sitemap")

    cohort, redirects, gone = ledger_sets()
    sitemap_paths = {(u.replace("https://www.mcpserver.in", "").rstrip("/") or "/") for u in urls}

    # Leak check: every sitemap URL must be live, indexable, and not a
    # retired/redirected legacy route.
    leaks = []
    for p in sorted(sitemap_paths):
        if p in redirects:
            leaks.append((p, "redirect source"))
            continue
        if p in gone:
            leaks.append((p, "GONE_410 row"))
            continue
        reachable, noindex = live_state(p)
        if not reachable:
            leaks.append((p, "not reachable (non-200)"))
        elif noindex:
            leaks.append((p, "serves noindex"))

    # Coverage check: every ledger cohort URL that is live-indexable must be
    # in the sitemap. Cohort rows currently serving noindex stubs (e.g. the
    # truthful /blog stub) are correctly excluded from the sitemap.
    missing = []
    for p in sorted(cohort):
        reachable, noindex = live_state(p)
        if reachable and not noindex and p not in sitemap_paths:
            missing.append(p)

    # Hub surfaces: each declared hub must be in the sitemap or live-noindex.
    hub_fail = []
    for p in HUB_SURFACES:
        reachable, noindex = live_state(p)
        if not reachable:
            hub_fail.append(f"{p} unreachable")
        elif p not in sitemap_paths and not noindex:
            hub_fail.append(f"{p} indexable but absent from sitemap")

    passed = True
    if leaks:
        log_fail(f"{len(leaks)} sitemap URLs fail the indexability contract (leak):")
        for p, why in leaks[:5]:
            print(f"     - {p} ({why})")
        passed = False
    else:
        log_pass("zero leaks: every sitemap URL is live and indexable")

    if missing:
        log_fail(f"{len(missing)} live-indexable cohort pages missing from sitemap:")
        for p in missing[:5]:
            print(f"     - {p}")
        passed = False
    else:
        log_pass("every live-indexable ledger cohort page is in the sitemap")

    if hub_fail:
        log_fail("hub surface contract violated:")
        for p in hub_fail[:5]:
            print(f"     - {p}")
        passed = False
    else:
        log_pass("all hub surfaces in sitemap or explicitly noindex")
    return passed


def main():
    print(f"{BOLD}MCPserver.in — MACHINE-READABLE CERTIFICATION (SEO/AEO/GEO){END}")
    log_info(f"Target: {TARGET_URL}")

    results = {
        "robots.txt": validate_robots(),
        "llms.txt": validate_llms(),
        "ai.txt": validate_ai_manifest(),
        "sitemap.xml": validate_sitemap(),
    }

    log_header("SCORECARD")
    all_pass = True
    for name, ok in results.items():
        print(f"  {name:<12}: {GREEN}PASS{END}" if ok else f"  {name:<12}: {RED}FAIL{END}")
        all_pass = all_pass and ok

    verdict = "MACHINE-READABLE GATE PASSED" if all_pass else "CERTIFICATION FAILED"
    print(f"\n{BOLD}{GREEN if all_pass else RED}{verdict}{END}\n")

    out = ROOT / "reports" / "machine-readable-audit-result.json"
    out.write_text(json.dumps({
        "timestamp": __import__("datetime").datetime.now(__import__("datetime").timezone.utc).isoformat().replace("+00:00", "Z"),
        "target": TARGET_URL,
        "results": results,
        "verdict": "PASSED" if all_pass else "FAILED",
    }, indent=2) + "\n", encoding="utf-8")
    print(f"Report: {out}")

    sys.exit(0 if all_pass else 1)


if __name__ == "__main__":
    main()
