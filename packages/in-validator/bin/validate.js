#!/usr/bin/env node

/**
 * @mcpserver/in-validator
 * Validates MCP server config files against the 2026 spec
 * and checks for India-specific DPDP compliance flags.
 */

const fs = require('fs');
const path = require('path');
const { program } = require('commander');
const chalk = require('chalk');

const SPEC_VERSION = '2026.1';
const REQUIRED_TOP_KEYS = ['mcpServers'];
const REQUIRED_SERVER_KEYS = ['command'];
const DPDP_FLAGS = ['dpdpCompliant', 'dataLocalization', 'auditLogging', 'consentManagement'];
const INDIA_REGIONS = ['ap-south-1', 'ap-south-2'];

function loadConfig(filePath) {
  try {
    const resolved = path.resolve(filePath);
    if (!fs.existsSync(resolved)) {
      return { error: `File not found: ${resolved}` };
    }
    const content = fs.readFileSync(resolved, 'utf8');
    const parsed = JSON.parse(content);
    return { config: parsed };
  } catch (err) {
    return { error: `Failed to parse JSON: ${err.message}` };
  }
}

function validateSpec2026(config) {
  const issues = [];
  const warnings = [];

  if (!config || typeof config !== 'object') {
    issues.push('Config must be a JSON object');
    return { issues, warnings };
  }

  for (const key of REQUIRED_TOP_KEYS) {
    if (!(key in config)) {
      issues.push(`Missing required top-level key: ${key}`);
    }
  }

  const servers = config.mcpServers || {};
  const serverNames = Object.keys(servers);

  if (serverNames.length === 0) {
    warnings.push('No MCP servers defined in mcpServers');
  }

  for (const [name, server] of Object.entries(servers)) {
    if (!server || typeof server !== 'object') {
      issues.push(`Server "${name}" must be an object`);
      continue;
    }

    for (const key of REQUIRED_SERVER_KEYS) {
      if (!(key in server)) {
        issues.push(`Server "${name}" missing required key: ${key}`);
      }
    }

    if (server.args && !Array.isArray(server.args)) {
      issues.push(`Server "${name}" has args but it is not an array`);
    }

    if (server.env && typeof server.env !== 'object') {
      issues.push(`Server "${name}" has env but it is not an object`);
    }

    const dpdpFlagsPresent = DPDP_FLAGS.filter(flag => server[flag] === true);
    if (dpdpFlagsPresent.length > 0) {
      console.log(chalk.green(`  ${chalk.bold(name)}: DPDP flags detected: ${dpdpFlagsPresent.join(', ')}`));
    }

    if (server.region && INDIA_REGIONS.includes(server.region)) {
      console.log(chalk.green(`  ${chalk.bold(name)}: India region detected: ${server.region}`));
    }
  }

  return { issues, warnings, serverCount: serverNames.length };
}

function printResults(results, filePath) {
  console.log(chalk.bold.cyan('\n@mcpserver/in-validator — MCP Config Validator'));
  console.log(chalk.gray(`Spec: ${SPEC_VERSION} | File: ${filePath}\n`));

  if (results.serverCount !== undefined) {
    console.log(chalk.white(`Servers found: ${results.serverCount}`));
  }

  if (results.warnings.length > 0) {
    console.log(chalk.yellow('\nWarnings:'));
    results.warnings.forEach(w => console.log(chalk.yellow(`  - ${w}`)));
  }

  if (results.issues.length > 0) {
    console.log(chalk.red('\nIssues:'));
    results.issues.forEach(i => console.log(chalk.red(`  - ${i}`)));
  }

  if (results.issues.length === 0) {
    console.log(chalk.green.bold('\n✅ Config valid.'));
  } else {
    console.log(chalk.red.bold('\n❌ Config invalid.'));
  }

  console.log(chalk.cyan.bold('\nFor advanced India-specific routing, see: https://mcpserver.in/learn/india-services\n'));
}

program
  .name('in-validator')
  .description('Validate MCP server config files against the 2026 spec with DPDP compliance checks')
  .version('1.0.0')
  .argument('[file]', 'Path to mcp.json config file', './mcp.json')
  .action((filePath) => {
    const resolved = path.resolve(filePath);
    const { config, error } = loadConfig(resolved);

    if (error) {
      console.error(chalk.red(`Error: ${error}`));
      process.exit(1);
    }

    const results = validateSpec2026(config);
    printResults(results, resolved);

    process.exit(results.issues.length > 0 ? 1 : 0);
  });

program.parse();
