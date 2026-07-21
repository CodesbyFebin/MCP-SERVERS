#!/usr/bin/env node
//
// Pulls real, linkable content-gap candidates from GitHub (issues) and
// Reddit (posts) for a given topic pillar, and writes the raw results —
// with source URLs — to research/content-gaps/<pillar>.json.
//
// This exists so that FAQ/topic ideas for the blog cluster are grounded in
// results you can open and re-check, instead of inline citations that
// can't be audited later. Nothing in the output file is curated or
// verified copy — treat it as a lead list, not publishable text.
//
// Usage:
//   node scripts/extract-content-gaps.mjs --pillar=security \
//     --query="MCP security proxy" --query="Model Context Protocol security risk"
//
// Optional:
//   GITHUB_TOKEN env var — raises the GitHub search rate limit from
//   10 req/min (unauthenticated) to 30 req/min and includes private repos
//   you have access to. Needs no scopes for public search.
//
//   REDDIT_CLIENT_ID / REDDIT_CLIENT_SECRET — Reddit's public
//   www.reddit.com/search.json endpoint 403s from most server/cloud IPs,
//   so Reddit search requires an app-only OAuth token instead. Create a
//   free "script" app at https://www.reddit.com/prefs/apps to get these.
//   Without them, Reddit search is skipped (GitHub results still run).

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.join(__dirname, '..', 'research', 'content-gaps');

const USER_AGENT = 'mcpserver.in-content-gap-research/1.0';
const REQUEST_DELAY_MS = 1500;

function parseArgs(argv) {
  const opts = { pillar: null, queries: [], limit: 15 };
  for (const arg of argv) {
    if (arg.startsWith('--pillar=')) opts.pillar = arg.slice('--pillar='.length);
    else if (arg.startsWith('--query=')) opts.queries.push(arg.slice('--query='.length));
    else if (arg.startsWith('--limit=')) opts.limit = parseInt(arg.slice('--limit='.length), 10);
  }
  return opts;
}

function dedupeByUrl(items) {
  const seen = new Set();
  return items.filter((item) => {
    if (seen.has(item.url)) return false;
    seen.add(item.url);
    return true;
  });
}

async function searchGithubIssues(query, limit, token) {
  // Quote the query as an exact phrase and keep GitHub's default best-match
  // relevance sort. Sorting by reactions instead discards relevance entirely
  // and surfaces wildly-popular issues that only loosely matched one word
  // (e.g. a 5,000-reaction issue with "protocol" or "security" mentioned
  // once in a huge unrelated thread) ahead of on-topic, low-traffic ones.
  const phrase = query.includes('"') ? query : `"${query}"`;
  const url = `https://api.github.com/search/issues?q=${encodeURIComponent(phrase)}&per_page=${limit}`;
  const headers = { Accept: 'application/vnd.github+json', 'User-Agent': USER_AGENT };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(url, { headers });
  if (!res.ok) {
    console.warn(`  GitHub search failed for "${query}": ${res.status} ${res.statusText}`);
    return [];
  }
  const data = await res.json();
  return (data.items || []).map((item) => ({
    source: 'github_issue',
    title: item.title,
    url: item.html_url,
    repo: item.repository_url ? item.repository_url.replace('https://api.github.com/repos/', '') : null,
    reactions: item.reactions ? item.reactions.total_count : 0,
    comments: item.comments,
    state: item.state,
    created_at: item.created_at,
    is_pull_request: Boolean(item.pull_request),
    matched_query: query,
  }));
}

let redditTokenPromise = null;

async function getRedditToken(clientId, clientSecret) {
  if (!redditTokenPromise) {
    redditTokenPromise = (async () => {
      const res = await fetch('https://www.reddit.com/api/v1/access_token', {
        method: 'POST',
        headers: {
          Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': USER_AGENT,
        },
        body: 'grant_type=client_credentials',
      });
      if (!res.ok) {
        throw new Error(`Reddit OAuth token request failed: ${res.status} ${res.statusText}`);
      }
      const data = await res.json();
      return data.access_token;
    })();
  }
  return redditTokenPromise;
}

async function searchReddit(query, limit, clientId, clientSecret) {
  if (!clientId || !clientSecret) {
    console.warn('  Skipping Reddit (no REDDIT_CLIENT_ID/REDDIT_CLIENT_SECRET set)');
    return [];
  }

  let token;
  try {
    token = await getRedditToken(clientId, clientSecret);
  } catch (err) {
    console.warn(`  Reddit auth failed: ${err.message}`);
    return [];
  }

  const url = `https://oauth.reddit.com/search?q=${encodeURIComponent(query)}&sort=top&t=year&limit=${limit}`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}`, 'User-Agent': USER_AGENT } });
  if (!res.ok) {
    console.warn(`  Reddit search failed for "${query}": ${res.status} ${res.statusText}`);
    return [];
  }
  const data = await res.json();
  const children = data.data && data.data.children ? data.data.children : [];
  return children.map((child) => {
    const p = child.data;
    return {
      source: 'reddit_post',
      title: p.title,
      url: `https://www.reddit.com${p.permalink}`,
      subreddit: p.subreddit_name_prefixed,
      score: p.score,
      num_comments: p.num_comments,
      created_at: new Date(p.created_utc * 1000).toISOString(),
      matched_query: query,
    };
  });
}

async function main() {
  const { pillar, queries, limit } = parseArgs(process.argv.slice(2));

  if (!pillar || queries.length === 0) {
    console.error('Usage: node scripts/extract-content-gaps.mjs --pillar=<slug> --query="..." [--query="..."] [--limit=15]');
    console.error('Example: node scripts/extract-content-gaps.mjs --pillar=security --query="MCP security proxy" --query="Model Context Protocol security risk"');
    process.exit(1);
  }

  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    console.warn('No GITHUB_TOKEN set — GitHub search will run unauthenticated (10 requests/min limit).');
  }
  const redditClientId = process.env.REDDIT_CLIENT_ID;
  const redditClientSecret = process.env.REDDIT_CLIENT_SECRET;

  const results = {
    pillar,
    queried_at: new Date().toISOString(),
    queries,
    github_issues: [],
    reddit_posts: [],
  };

  for (const query of queries) {
    console.log(`Searching GitHub issues for: "${query}"`);
    const gh = await searchGithubIssues(query, limit, token);
    results.github_issues.push(...gh);
    console.log(`  -> ${gh.length} results`);
    await new Promise((r) => setTimeout(r, REQUEST_DELAY_MS));

    console.log(`Searching Reddit for: "${query}"`);
    const rd = await searchReddit(query, limit, redditClientId, redditClientSecret);
    results.reddit_posts.push(...rd);
    console.log(`  -> ${rd.length} results`);
    await new Promise((r) => setTimeout(r, REQUEST_DELAY_MS));
  }

  results.github_issues = dedupeByUrl(results.github_issues).sort((a, b) => b.reactions - a.reactions);
  results.reddit_posts = dedupeByUrl(results.reddit_posts).sort((a, b) => b.score - a.score);

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  const outPath = path.join(OUTPUT_DIR, `${pillar}.json`);
  fs.writeFileSync(outPath, `${JSON.stringify(results, null, 2)}\n`, 'utf-8');

  console.log(`\nWrote ${results.github_issues.length} GitHub issues + ${results.reddit_posts.length} Reddit posts to ${path.relative(process.cwd(), outPath)}`);
  console.log('Every entry has a real url field pointing at the source — open it before citing it in content.');
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
