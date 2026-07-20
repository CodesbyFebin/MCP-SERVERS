# mcpserver-in-validator

Validate MCP server config files against the 2026 spec and check for India-specific DPDP compliance flags.

## Install

```bash
npm install -g mcpserver-in-validator
```

## Usage

```bash
in-validator ./mcp.json
```

Or with npx:

```bash
npx mcpserver-in-validator ./path/to/your/mcp-config.json
```

## What it checks

- Required top-level `mcpServers` key
- Required `command` key per server
- Valid `args` array shape
- Valid `env` object shape
- DPDP compliance flags: `dpdpCompliant`, `dataLocalization`, `auditLogging`, `consentManagement`
- India region hints: `ap-south-1`, `ap-south-2`

## Exit codes

- `0` — config is valid
- `1` — config has issues

## Why this exists

MCP servers are only as trustworthy as the config that launches them. If you are deploying in India, you should also review:

- [DPDP Compliance for MCP](https://mcpserver.in/learn/dpdp-compliance-guide)
- [India-Specific MCP Routing](https://mcpserver.in/learn/india-services)

## License

MIT
