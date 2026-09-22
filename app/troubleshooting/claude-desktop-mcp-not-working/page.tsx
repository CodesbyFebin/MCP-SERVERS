import type { Metadata } from "next";
import { BrandMcpArticle, Code, P, Ext } from "@/src/components/content/BrandMcpArticle";

export const dynamic = "force-static";

const SLUG = "claude-desktop-mcp-not-working";
const PATH = `/troubleshooting/${SLUG}`;
const TITLE = "Claude Desktop MCP Not Working? 10 Fixes";
const DESCRIPTION =
  "Fix an MCP server that won't connect or show tools in Claude Desktop: config paths, log files, absolute paths, Node and npx issues, environment variables, stdout, and Windows ENOENT.";
const REVIEWED = "2026-09-23";
const CONNECT = "https://modelcontextprotocol.io/docs/develop/connect-local-servers";
const DEBUG = "https://modelcontextprotocol.io/docs/tools/debugging";
const STDIO = "https://modelcontextprotocol.io/specification/2026-07-28/basic/transports/stdio";

const UL = "mb-4 list-inside list-disc space-y-2 text-slate-700 dark:text-slate-300";

export function generateMetadata(): Metadata {
  return {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: `https://www.mcpserver.in${PATH}` },
    robots: { index: true, follow: true },
    openGraph: { title: TITLE, description: DESCRIPTION, type: "article" },
  };
}

export default function Page() {
  return (
    <BrandMcpArticle
      slug={SLUG}
      path={PATH}
      section={{ label: "Troubleshooting", href: "/troubleshooting" }}
      title={TITLE}
      h1="Claude Desktop MCP Server Not Working"
      description={DESCRIPTION}
      reviewedAt={REVIEWED}
      directAnswer="Most Claude Desktop MCP failures come from four things: invalid JSON in claude_desktop_config.json, relative paths, a command such as npx that Claude Desktop cannot find, or a server that crashes on start. Fully quit and reopen Claude Desktop, then read ~/Library/Logs/Claude/mcp*.log (macOS) or %APPDATA%\Claude\logs (Windows). The server's own log file usually names the exact error."
      sections={[
        {
          id: "first",
          heading: "Start here: the 60-second check",
          body: (
            <ol className="mb-4 list-inside list-decimal space-y-2 text-slate-700 dark:text-slate-300">
              <li>
                <strong>Quit Claude Desktop completely</strong> and reopen it. Closing the window is
                not enough; the config is only read at start-up.
              </li>
              <li>
                Click the <strong>+</strong> (&ldquo;Add files, connectors, and more&rdquo;) button
                in the chat box and hover <strong>Connectors</strong>. If your server is listed,
                it connected. If not, go on.
              </li>
              <li>
                Paste your config into a JSON validator. A trailing comma or a missing brace stops
                every server from loading.
              </li>
              <li>Open the logs (fix 2 below) and read the last lines for your server.</li>
            </ol>
          ),
        },
        {
          id: "config",
          heading: "1. Edit the right config file",
          body: (
            <>
              <P>
                Open it from Claude Desktop so you know you have the right one: the Claude menu in
                your system menu bar → <strong>Settings…</strong> → <strong>Developer</strong> →{" "}
                <strong>Edit Config</strong>. This is the app&apos;s settings window, not the
                settings inside a chat. The file lives at:
              </P>
              <ul className={UL}>
                <li>
                  macOS: <code>~/Library/Application Support/Claude/claude_desktop_config.json</code>
                </li>
                <li>
                  Windows: <code>%APPDATA%\Claude\claude_desktop_config.json</code>
                </li>
              </ul>
              <P>Every server goes inside a single top-level <code>mcpServers</code> object:</P>
              <Code>{`{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/username/Desktop"]
    }
  }
}`}</Code>
              <P>
                A common mistake is pasting a second <code>{`{ "mcpServers": ... }`}</code> block
                below the first. JSON allows only one top-level object; merge the entries instead.
              </P>
            </>
          ),
        },
        {
          id: "logs",
          heading: "2. Read the logs",
          body: (
            <>
              <P>Claude Desktop writes MCP logs to:</P>
              <ul className={UL}>
                <li>macOS: <code>~/Library/Logs/Claude</code></li>
                <li>Windows: <code>%APPDATA%\Claude\logs</code></li>
              </ul>
              <P>
                <code>mcp.log</code> records connection attempts and failures in general. Each
                server also gets <code>mcp-server-SERVERNAME.log</code>, which holds that
                server&apos;s stderr output. That file is where a stack trace or &ldquo;command not
                found&rdquo; shows up. Stdio servers often log everything to stderr, so not every
                line there is an error.
              </P>
              <P>Follow the logs live on macOS:</P>
              <Code>tail -n 20 -F ~/Library/Logs/Claude/mcp*.log</Code>
              <P>On Windows (PowerShell):</P>
              <Code>{`type "$env:AppData\\Claude\\logs\\mcp*.log"`}</Code>
            </>
          ),
        },
        {
          id: "manual",
          heading: "3. Run the server command yourself",
          body: (
            <>
              <P>
                Copy <code>command</code> and <code>args</code> from your config and run them in a
                terminal. If the server crashes, prints an error, or asks for input, you will see it
                immediately. For the filesystem example:
              </P>
              <Code>npx -y @modelcontextprotocol/server-filesystem /Users/username/Desktop</Code>
              <P>
                A working stdio server usually just sits there waiting for input. That is correct:
                it is waiting for Claude Desktop to talk to it. Press Ctrl+C to stop it.
              </P>
            </>
          ),
        },
        {
          id: "paths",
          heading: "4. Use absolute paths everywhere",
          body: (
            <P>
              Claude Desktop does not start servers from your project folder. The official
              debugging guide notes that the working directory &ldquo;may be undefined (like{" "}
              <code>/</code> on macOS)&rdquo;. A path like <code>./data</code> or{" "}
              <code>server.py</code> then points at the wrong place. Use full paths in{" "}
              <code>args</code>, in <code>command</code> when it is a script, and inside any{" "}
              <code>.env</code> file the server reads.
            </P>
          ),
        },
        {
          id: "node",
          heading: "5. Make sure Node.js and npx can be found",
          body: (
            <>
              <P>Many servers run through <code>npx</code>, which comes with Node.js. Check it:</P>
              <Code>node --version</Code>
              <P>
                If that works in your terminal but the log still says the command was not found,
                Claude Desktop may not see the same <code>PATH</code> as your shell. This can happen, for
                example, when Node was installed with a version manager. Stdio servers inherit only a limited
                set of environment variables, and the debugging guide recommends an absolute path
                for <code>command</code>. Find it and paste it in:
              </P>
              <Code>{`which npx        # macOS / Linux
where npx        # Windows`}</Code>
              <Code>{`"command": "/Users/you/.nvm/versions/node/v22.0.0/bin/npx"`}</Code>
              <P>The same applies to <code>uv</code>, <code>uvx</code>, <code>python</code> and <code>docker</code>.</P>
            </>
          ),
        },
        {
          id: "env",
          heading: "6. Pass API keys through env",
          body: (
            <>
              <P>
                Variables you export in <code>.zshrc</code> or <code>.bashrc</code> are not passed
                to the server. Put what it needs in an <code>env</code> block:
              </P>
              <Code>{`{
  "mcpServers": {
    "myserver": {
      "command": "mcp-server-myapp",
      "env": { "MYAPP_API_KEY": "your_key_here" }
    }
  }
}`}</Code>
              <P>
                This file then holds a secret in plain text. Keep it out of git and out of shared
                or synced folders.
              </P>
            </>
          ),
        },
        {
          id: "windows",
          heading: "7. Windows: ENOENT and ${APPDATA}",
          body: (
            <>
              <P>
                If the server log shows <code>ENOENT</code> together with a path containing{" "}
                <code>{"${APPDATA}"}</code>, add the expanded value to <code>env</code>:
              </P>
              <Code>{`"env": {
  "APPDATA": "C:\\\\Users\\\\you\\\\AppData\\\\Roaming\\\\"
}`}</Code>
              <P>
                The official guide also says <code>npx</code> may keep failing if npm is not
                installed globally. If <code>%APPDATA%\npm</code> does not exist, run:
              </P>
              <Code>npm install -g npm</Code>
            </>
          ),
        },
        {
          id: "stdout",
          heading: "8. Your own server: never print to stdout",
          body: (
            <>
              <P>
                Claude Desktop talks to local servers over the stdio transport. The{" "}
                <Ext href={STDIO}>MCP specification</Ext> says the server &ldquo;MUST NOT write
                anything to its <code>stdout</code> that is not a valid MCP message&rdquo;. A single{" "}
                <code>print()</code> or <code>console.log()</code> corrupts the stream and the
                connection fails, often with a JSON parse error in <code>mcp.log</code>.
              </P>
              <P>
                Log to stderr instead. In Python use the <code>logging</code> module (it writes to
                stderr by default) or <code>print(..., file=sys.stderr)</code>. In Node use{" "}
                <code>console.error()</code>.
              </P>
            </>
          ),
        },
        {
          id: "inspector",
          heading: "9. Test the server outside Claude with MCP Inspector",
          body: (
            <>
              <P>
                The MCP Inspector connects to a server directly and lets you list and call its
                tools. If a server fails in the Inspector, the problem is the server, not Claude
                Desktop. With the Python SDK:
              </P>
              <Code>uv run mcp dev server.py</Code>
              <P>For any stdio server command:</P>
              <Code>npx @modelcontextprotocol/inspector npx -y @modelcontextprotocol/server-filesystem /tmp</Code>
            </>
          ),
        },
        {
          id: "devtools",
          heading: "10. Still stuck: turn on DevTools",
          body: (
            <>
              <P>Claude Desktop can open Chrome DevTools for client-side errors. On macOS:</P>
              <Code>{`echo '{"allowDevTools": true}' > ~/Library/Application\\ Support/Claude/developer_settings.json`}</Code>
              <P>On Windows (PowerShell):</P>
              <Code>{`'{"allowDevTools": true}' | Set-Content "$env:AppData\\Claude\\developer_settings.json"`}</Code>
              <P>
                Restart, then press Command-Option-I (macOS) or Ctrl+Alt+I (Windows). Two DevTools
                windows open. Check Console for errors and Network for message payloads.
              </P>
            </>
          ),
        },
        {
          id: "remote",
          heading: "Remote servers (a URL instead of a command)",
          body: (
            <P>
              A remote server such as <code>https://example.com/mcp</code> is not a local command.
              Add it under Settings → Connectors → Add custom connector, or bridge it into the
              config file with <code>npx mcp-remote https://example.com/mcp</code>. If sign-in
              opens a browser and then fails, remove the connector and add it again to restart the
              OAuth flow.
            </P>
          ),
        },
      ]}
      evidence={[
        {
          source: "MCP docs: Connect to local MCP servers",
          url: CONNECT,
          type: "official",
          status: "verified",
          reviewedAt: REVIEWED,
          finding:
            "Config file paths for macOS and Windows; open via Settings → Developer → Edit Config; restart fully after edits; troubleshooting: JSON syntax, absolute paths, logs in ~/Library/Logs/Claude and %APPDATA%\\Claude\\logs, mcp.log vs mcp-server-SERVERNAME.log, running the server manually, Windows ENOENT with ${APPDATA}, npm install -g npm.",
          limitations: "Examples use the filesystem server; UI labels can change between Claude Desktop versions.",
        },
        {
          source: "MCP docs: Debugging",
          url: DEBUG,
          type: "official",
          status: "verified",
          reviewedAt: REVIEWED,
          finding:
            "Working directory may be undefined; stdio servers inherit a limited set of environment variables; use absolute paths including for command; do not log to stdout; developer_settings.json with allowDevTools; DevTools shortcuts; fully quit and reopen after changes.",
        },
        {
          source: "MCP specification 2026-07-28: stdio transport",
          url: STDIO,
          type: "official",
          status: "verified",
          reviewedAt: REVIEWED,
          finding:
            "Messages are newline-delimited JSON-RPC; the server MAY write logs to stderr and MUST NOT write anything to stdout that is not a valid MCP message.",
        },
      ]}
      faqs={[
        {
          question: "Where is claude_desktop_config.json?",
          answer:
            "On macOS: ~/Library/Application Support/Claude/claude_desktop_config.json. On Windows: %APPDATA%\\Claude\\claude_desktop_config.json. Open it from Claude Desktop with Settings → Developer → Edit Config.",
        },
        {
          question: "Where are the Claude Desktop MCP logs?",
          answer:
            "In ~/Library/Logs/Claude on macOS and %APPDATA%\\Claude\\logs on Windows. mcp.log covers connections; mcp-server-NAME.log holds each server's stderr output.",
        },
        {
          question: "I edited the config but nothing changed. Why?",
          answer:
            "Claude Desktop reads the config only at start-up. Quit it completely (not just the window) and reopen it. If it still does not load, check the JSON is valid.",
        },
        {
          question: "Why does it say npx or uv is not found when it works in my terminal?",
          answer:
            "Claude Desktop may not use your shell's PATH. Use the absolute path to the executable, found with `which npx` on macOS or Linux or `where npx` on Windows, as the command value.",
        },
        {
          question: "My Python server connects and then immediately fails. What is wrong?",
          answer:
            "Usually something is printed to stdout, which breaks the stdio protocol. Send all logging to stderr, then check mcp-server-NAME.log for the actual error.",
        },
      ]}
      related={[
        { href: "/clients/claude-desktop", label: "Using MCP servers in Claude Desktop" },
        { href: "/blog/mcp-transport-methods", label: "MCP transports: stdio vs Streamable HTTP" },
        { href: "/security/mcp-security", label: "MCP security overview" },
        { href: "/glossary/mcp-timeout", label: "MCP timeouts" },
      ]}
    />
  );
}
