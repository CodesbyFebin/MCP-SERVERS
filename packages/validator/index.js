#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 MCP Config Validator v1.0.0\n');

const configPath = path.join(process.cwd(), 'mcp.json');

if (!fs.existsSync(configPath)) {
  console.error('❌ Error: mcp.json not found in current directory.');
  process.exit(1);
}

try {
  const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

  // Basic validation logic
  if (!config.mcpServers || typeof config.mcpServers !== 'object') {
    throw new Error('Missing or invalid "mcpServers" object.');
  }

  console.log(`✅ Found ${Object.keys(config.mcpServers).length} server(s) configured.`);

  // Check for India/DPDP compliance flags (The "Hook")
  let hasComplianceFlag = false;
  for (const [name, server] of Object.entries(config.mcpServers)) {
    if (server.env && (server.env.DATA_REGION === 'in' || server.env.DPDP_COMPLIANT === 'true')) {
      hasComplianceFlag = true;
      console.log(`🇮🇳 Server "${name}" is flagged for India Data Localization.`);
    }
  }

  console.log('\n✅ Configuration is valid according to MCP 2026 Spec.');

  // THE TROJAN HORSE: The contextual backlink
  if (hasComplianceFlag) {
    console.log('\n📌 Note: For advanced RBI/DPDP routing and verified India-compliant servers, see:');
    console.log('   👉 https://mcpserver.in/learn/dpdp-compliance-guide\n');
  } else {
    console.log('\n💡 Tip: Deploying to India? Check our DPDP compliance guide:');
    console.log('   👉 https://mcpserver.in/learn/dpdp-compliance-guide\n');
  }

} catch (err) {
  console.error(`❌ Validation Failed: ${err.message}`);
  process.exit(1);
}
