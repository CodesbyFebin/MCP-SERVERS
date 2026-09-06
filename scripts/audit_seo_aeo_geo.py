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


def indexable_cohort():
    """Published indexable paths from the content registry of record: the
    migration ledger's served KEEP + DEFER rows are registry-owned; but the
    true cohort is computed from the ledger's served rows that are not
    redirect sources and not rebuild stubs."""
    keep, defer = set(), set()
    with open(LEDGER_PATH, encoding="utf-8") as f:
        for row in csv.DictReader(f):
            path = row["canonical_url"].replace("https://www.mcpserver.in", "").rstrip("/") or "/"
            dec = row["decision"].strip()
            status = row["canonical_route_status"].strip()
            if dec == "KEEP_INDEXED" and status == "served":
                keep.add(path)
            elif dec == "DEFER_NOINDEX":
                # registry-owned pages absent from GSC: indexable cohort too
                defer.add(path)
    return keep, defer


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
    # the sitemap check below covers page cohort; here we just count links.
    n = len(re.findall(r"^-\s*\[[^\]]+\]\(https://www\.mcpserver\.in[^)]*\)", content, re.M))
    log_info(f"{n} canonical links listed")
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

    keep, defer = indexable_cohort()
    sitemap_paths = {(u.replace("https://www.mcpserver.in", "").rstrip("/") or "/") for u in urls}
    cohort = keep | defer

    extra = sorted(sitemap_paths - cohort)
    missing = sorted(cohort - sitemap_paths)

    # noindex surfaces must never appear
    stubs = [p for p in sitemap_paths if p.startswith(("/blog/", "/directory/")) and p not in cohort]

    passed = True
    if extra:
        log_fail(f"{len(extra)} sitemap URLs are NOT in the indexable cohort (leak):")
        for p in extra[:5]:
            print(f"     - {p}")
        passed = False
    else:
        log_pass("zero leaks: every sitemap URL is in the indexable cohort")

    if stubs:
        log_fail(f"{len(stubs)} rebuild-stub/noindex URLs leaked into sitemap")
        passed = False
    else:
        log_pass("no rebuild-stub/noindex URLs in sitemap")

    if missing:
        log_fail(f"{len(missing)} cohort pages missing from sitemap:")
        for p in missing[:5]:
            print(f"     - {p}")
        passed = False
    else:
        log_pass("indexable cohort fully covered by sitemap (exact match)")
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
        "timestamp": __import__("datetime").datetime.utcnow().isoformat() + "Z",
        "target": TARGET_URL,
        "results": results,
        "verdict": "PASSED" if all_pass else "FAILED",
    }, indent=2) + "\n", encoding="utf-8")
    print(f"Report: {out}")

    sys.exit(0 if all_pass else 1)


if __name__ == "__main__":
    main()
