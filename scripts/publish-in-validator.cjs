#!/usr/bin/env node

/**
 * publish-in-validator.js
 *
 * Prepares and publishes the @mcpserver/in-validator npm package.
 *
 * Usage:
 *   node scripts/publish-in-validator.js dry-run   # Show what would be done
 *   node scripts/publish-in-validator.js publish    # Actually publish to npm
 *
 * Prerequisites:
 *   - npm login (must have access to @mcpserver scope)
 *   - git remote set to github.com/mcpserver-in/in-validator.git
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PACKAGE_DIR = path.resolve(__dirname, '../packages/in-validator');
const REPO_URL = 'https://github.com/mcpserver-in/in-validator.git';

function log(msg) {
  console.log(`\x1b[36m[in-validator]\x1b[0m ${msg}`);
}

function logOk(msg) {
  console.log(`\x1b[32m[in-validator]\x1b[0m ${msg}`);
}

function logErr(msg) {
  console.log(`\x1b[31m[in-validator]\x1b[0m ${msg}`);
}

function run(cmd, opts = {}) {
  log(`$ ${cmd}`);
  try {
    const out = execSync(cmd, { cwd: PACKAGE_DIR, encoding: 'utf8', stdio: 'pipe', ...opts });
    if (out) console.log(out.trim());
    return out;
  } catch (err) {
    const msg = err.stdout?.toString() || err.message;
    logErr(msg);
    if (!opts.allowFail) throw err;
    return null;
  }
}

async function main() {
  const mode = process.argv[2] || 'dry-run';

  log('Publishing @mcpserver/in-validator');
  log(`Mode: ${mode}`);
  log(`Package dir: ${PACKAGE_DIR}`);

  if (!fs.existsSync(PACKAGE_DIR)) {
    logErr(`Package directory not found: ${PACKAGE_DIR}`);
    process.exit(1);
  }

  const pkg = JSON.parse(fs.readFileSync(path.join(PACKAGE_DIR, 'package.json'), 'utf8'));
  logOk(`Found package: ${pkg.name}@${pkg.version}`);

  if (mode === 'dry-run') {
    log('Dry-run: would run the following steps:');
    console.log(`
  1. cd ${PACKAGE_DIR}
  2. git init && git remote add origin ${REPO_URL}
  3. git add -A && git commit -m "chore: initial release @mcpserver/in-validator@${pkg.version}"
  4. git tag v${pkg.version}
  5. git push -u origin main --tags
  6. npm publish --access public
    `);
    logOk('Dry-run complete.');
    return;
  }

  if (mode !== 'publish') {
    logErr(`Unknown mode: ${mode}. Use "dry-run" or "publish".`);
    process.exit(1);
  }

  log('Step 1/6: Ensure we are in a git repo');
  run('git init', { allowFail: true });
  run(`git remote add origin ${REPO_URL}`, { allowFail: true });

  log('Step 2/6: Install dependencies');
  run('npm install', { allowFail: false });

  log('Step 3/6: Lint / sanity check');
  run('node bin/validate.js', { allowFail: true });

  log('Step 4/6: Commit');
  run('git add -A');
  run('git diff --cached --quiet', { allowFail: true }) || run(`git commit -m "chore: initial release @mcpserver/in-validator@${pkg.version}"`);

  log('Step 5/6: Tag');
  run(`git tag v${pkg.version}`, { allowFail: true });

  log('Step 6/6: Push to GitHub');
  run('git branch -M main', { allowFail: true });
  run('git push -u origin main --tags', { allowFail: false });

  log('Step 7/7: Publish to npm');
  run('npm publish --access public', { allowFail: false });

  logOk(`Published @mcpserver/in-validator@${pkg.version}`);
  log(`GitHub: ${REPO_URL}`);
  log(`npm: https://www.npmjs.com/package/@mcpserver/in-validator`);
}

main().catch(err => {
  logErr(String(err));
  process.exit(1);
});
