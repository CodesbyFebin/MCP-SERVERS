export interface ServerIntegration {
  name: string;
  slug: string;
  category: string;
  description: string;
  auth: string;
  useCases: string[];
  related: string[];
  features: string[];
}

export const servers: ServerIntegration[] = [
  // Developer Tools (15)
  {
    name: "GitHub",
    slug: "github-mcp-server",
    category: "Developer Tools",
    description: "Securely connect your AI agents to private and public GitHub repositories to write, review, and automate code workflows, pull requests, issues, and releases.",
    auth: "GitHub Personal Access Token / OAuth 2.0",
    useCases: ["Search codebase and repositories", "Create, review and merge pull requests", "Automate issue tracking and labeling"],
    related: ["gitlab-mcp-server", "bitbucket-mcp-server", "jira-mcp-server"],
    features: ["Repository search", "File writing", "PR creation", "Branch management", "Issue audits"]
  },
  {
    name: "GitLab",
    slug: "gitlab-mcp-server",
    category: "Developer Tools",
    description: "Orchestrate GitLab pipelines, manage merge requests, and perform secure code reviews inside private instances using Model Context Protocol.",
    auth: "GitLab Private Token",
    useCases: ["Audit pipeline status and logs", "Approve and merge code modifications", "Manage project issues and boards"],
    related: ["github-mcp-server", "bitbucket-mcp-server", "docker-mcp-server"],
    features: ["CI/CD pipeline triggers", "Project search", "Merge request handling", "Branch actions"]
  },
  {
    name: "Bitbucket",
    slug: "bitbucket-mcp-server",
    category: "Developer Tools",
    description: "Allows autonomous agents to perform file modifications, check commits, and manage pull requests on Bitbucket Cloud or Server.",
    auth: "App Password / OAuth",
    useCases: ["Integrate codebases into LLM workflows", "Check branch status", "Review repository changes"],
    related: ["github-mcp-server", "gitlab-mcp-server", "jira-mcp-server"],
    features: ["Repo checkout", "Pull request reviews", "Branch updates", "Commit search"]
  },
  {
    name: "Docker",
    slug: "docker-mcp-server",
    category: "Developer Tools",
    description: "Manage containers, inspect active Docker configurations, execute container commands, and troubleshoot local microservices instantly using natural language.",
    auth: "Local Unix Socket / SSH",
    useCases: ["List active containers and resources", "Restart failing containers and check logs", "Build Dockerfiles dynamically based on code"],
    related: ["kubernetes-mcp-server", "aws-mcp-server", "vercel-mcp-server"],
    features: ["Container listing", "Logs extraction", "Build commands", "Container lifecycle control"]
  },
  {
    name: "Kubernetes",
    slug: "kubernetes-mcp-server",
    category: "Developer Tools",
    description: "Query Pods, Services, and Deployments in your Kubernetes clusters. Instantly debug server errors or deploy YAML configurations safely.",
    auth: "Kubeconfig Credentials",
    useCases: ["Extract pod crash logs for troubleshooting", "Examine deployment configurations", "Scale replicas using AI guidance"],
    related: ["docker-mcp-server", "aws-mcp-server", "google-cloud-mcp-server"],
    features: ["Pod search", "Namespace diagnostics", "YAML validation", "Scale configuration overrides"]
  },
  {
    name: "Vercel",
    slug: "vercel-mcp-server",
    category: "Developer Tools",
    description: "List Vercel deployments, check preview urls, trigger production builds, and retrieve site analytics directly inside code chats.",
    auth: "Vercel Personal Access Token",
    useCases: ["Monitor active production builds", "Retrieve domain details and env vars", "Rollback deployments during outages"],
    related: ["cloudflare-mcp-server", "github-mcp-server", "aws-mcp-server"],
    features: ["Deployment lookup", "Rollback triggers", "Analytics retrieval", "Domain link checks"]
  },
  {
    name: "Cloudflare",
    slug: "cloudflare-mcp-server",
    category: "Developer Tools",
    description: "Manage Cloudflare DNS records, configure Page Rules, purge CDN caches, and monitor Worker scripts effortlessly with AI support.",
    auth: "Cloudflare API Token",
    useCases: ["Purge specific URL caches instantly", "Update proxy DNS settings", "Check Cloudflare Worker health and errors"],
    related: ["vercel-mcp-server", "aws-mcp-server", "supabase-mcp-server"],
    features: ["DNS CRUD", "Cache purging", "Workers monitoring", "Security level adjustments"]
  },
  {
    name: "Sentry",
    slug: "sentry-mcp-server",
    category: "Developer Tools",
    description: "Expose application errors, trace logs, and exception dumps to help AI models diagnose and repair application bugs in real-time.",
    auth: "Sentry Integration Token",
    useCases: ["Query top unresolved bugs", "Extract full stack traces", "Link commits to exception origins"],
    related: ["github-mcp-server", "jira-mcp-server", "mcp-monitoring"],
    features: ["Error aggregation", "Stack trace analysis", "User impact reports", "Assignee updates"]
  },
  {
    name: "Postman",
    slug: "postman-mcp-server",
    category: "Developer Tools",
    description: "Expose Postman collections, run automated test suites, and validate active HTTP configurations inside LLM workspaces.",
    auth: "Postman API Key",
    useCases: ["Run endpoint tests on staging", "Load dynamic schemas for testing", "Audit API endpoint performance"],
    related: ["openapi-to-mcp-server", "swagger-to-mcp-server"],
    features: ["Collection testing", "Environment mapping", "Test run triggers", "API compliance reports"]
  },
  {
    name: "SonarQube",
    slug: "sonarqube-mcp-server",
    category: "Developer Tools",
    description: "Expose code quality audits, security vulnerabilities, and code smell warnings directly to autonomous development agents.",
    auth: "SonarQube User Token",
    useCases: ["Audit security coverage", "Retrieve quality gate indicators", "Isolate specific bug vectors in files"],
    related: ["github-mcp-server", "gitlab-mcp-server"],
    features: ["Security scanning", "Coverage reviews", "Code smell diagnostics", "Quality gates audits"]
  },
  {
    name: "CircleCI",
    slug: "circleci-mcp-server",
    category: "Developer Tools",
    description: "Expose pipeline statuses, retry failed tests, and automate continuous integration setups directly inside AI workflows.",
    auth: "CircleCI Personal Token",
    useCases: ["Trigger test pipeline steps", "Retrieve test coverage summaries", "Examine failed compile errors"],
    related: ["github-mcp-server", "docker-mcp-server"],
    features: ["Pipeline control", "Job details retrieval", "Artifact inspection", "Build metrics"]
  },
  {
    name: "Heroku",
    slug: "heroku-mcp-server",
    category: "Developer Tools",
    description: "Check Heroku app dyno health, manage configurations, and trigger direct git deployments through Model Context Protocol.",
    auth: "Heroku API Key",
    useCases: ["Restart web dynos during heavy loads", "Retrieve configuration variables", "Stream live server errors"],
    related: ["vercel-mcp-server", "postgres-mcp-server"],
    features: ["Dyno restarts", "Log streaming", "Config management", "App metric reports"]
  },
  {
    name: "Jenkins",
    slug: "jenkins-mcp-server",
    category: "Developer Tools",
    description: "Connect legacy CI/CD pipelines to modern AI workflows, triggering parameterized jobs and pulling logs dynamically.",
    auth: "Jenkins API Token",
    useCases: ["Trigger legacy deploy processes", "Analyze long-running build issues", "Update job configurations"],
    related: ["gitlab-mcp-server", "docker-mcp-server"],
    features: ["Job execution", "Console logs streaming", "Parameter configuration", "Queue inspection"]
  },
  {
    name: "GitBook",
    slug: "gitbook-mcp-server",
    category: "Developer Tools",
    description: "Sync code documentation, read guide contents, and write structured wiki files instantly with AI assistance.",
    auth: "GitBook API Key",
    useCases: ["Extract user guides for prompt injection", "Write developer onboarding manuals", "Sync code changes with text documentation"],
    related: ["github-mcp-server", "notion-mcp-server"],
    features: ["Page generation", "Space indexing", "Markdown conversions", "Collaboration tracking"]
  },
  {
    name: "Swagger",
    slug: "swagger-mcp-server",
    category: "Developer Tools",
    description: "Integrate old Swagger v2 files directly into agent contexts, converting static definitions to operational tools on-the-fly.",
    auth: "None / Shared Keys",
    useCases: ["Inspect legacy corporate endpoints", "Generate real-time tool adapters", "Validate REST JSON structures"],
    related: ["openapi-to-mcp-server", "postman-mcp-server"],
    features: ["Schema parsing", "Live code compilation", "Dynamic tool registration", "Payload validation"]
  },

  // Databases (15)
  {
    name: "PostgreSQL",
    slug: "postgres-mcp-server",
    category: "Databases",
    description: "Expose PostgreSQL databases to AI agents. Let your models query schemas, run safely-isolated SELECT queries, and automate database administration tasks.",
    auth: "Database Connection String",
    useCases: ["Check tables schema and indexes", "Query metrics for dashboard reporting", "Execute optimized raw SQL select statements"],
    related: ["mysql-mcp-server", "supabase-mcp-server", "sqlite-mcp-server"],
    features: ["Schema reflection", "Read-only guardrails", "Index optimization analysis", "Query profiling"]
  },
  {
    name: "MySQL",
    slug: "mysql-mcp-server",
    category: "Databases",
    description: "Connect to MySQL and MariaDB instances. Allow models to analyze relational databases, run query plans, and export records securely.",
    auth: "MySQL Credentials",
    useCases: ["Inspect relational tables", "Run audit queries", "Verify slow queries lists"],
    related: ["postgres-mcp-server", "sqlite-mcp-server", "mongodb-mcp-server"],
    features: ["Table mapping", "Safe execution sandbox", "Uptime diagnostics", "Storage engine checks"]
  },
  {
    name: "MongoDB",
    slug: "mongodb-mcp-server",
    category: "Databases",
    description: "Connect AI systems to document databases. Run safe aggregates, retrieve document structures, and automate collections management.",
    auth: "MongoDB URI connection",
    useCases: ["Analyze user document schemas", "Extract specific JSON documents", "Optimize database indexing strategies"],
    related: ["postgres-mcp-server", "redis-mcp-server", "supabase-mcp-server"],
    features: ["Collection inspections", "NoSQL sandbox querying", "Aggregate assistance", "Metric pipelines"]
  },
  {
    name: "SQLite",
    slug: "sqlite-mcp-server",
    category: "Databases",
    description: "The ideal database tool for local AI agents. Run instant queries on local database files with zero network latency.",
    auth: "Local File Path",
    useCases: ["Query local app state", "Create fast temp databases for AI coding", "Expose local development caches"],
    related: ["postgres-mcp-server", "mysql-mcp-server", "filesystem-mcp-server"],
    features: ["Zero-config setup", "File read/write isolation", "Fast schema reflections", "Query execution"]
  },
  {
    name: "Redis",
    slug: "redis-mcp-server",
    category: "Databases",
    description: "Expose fast in-memory key-value data, trace application sessions, clear stale caches, and manage message queues with AI support.",
    auth: "Redis Connection String",
    useCases: ["Audit current cache keys", "Purge expired system configs", "Monitor redis pub/sub events"],
    related: ["postgres-mcp-server", "mongodb-mcp-server", "supabase-mcp-server"],
    features: ["Key-value scanning", "TTL monitoring", "Cache flush actions", "Queue length lookups"]
  },
  {
    name: "Supabase",
    slug: "supabase-mcp-server",
    category: "Databases",
    description: "Manage Supabase projects, write PostgreSQL functions, inspect Edge Functions, and manage public files buckets through natural language.",
    auth: "Supabase Service Key / URL",
    useCases: ["Query user data tables", "Review active database logs", "Manage public storage configurations"],
    related: ["postgres-mcp-server", "firebase-mcp-server", "cloudflare-mcp-server"],
    features: ["Table editor controls", "Edge function details", "Storage bucket updates", "Database telemetry"]
  },
  {
    name: "Firebase",
    slug: "firebase-mcp-server",
    category: "Databases",
    description: "Allows models to read/write Firestore collections, audit Firebase Authentication users, and monitor Realtime Database paths.",
    auth: "Firebase Admin Service Account JSON",
    useCases: ["Export selected user profiles", "Update config settings in Firestore", "Check user account creation dates"],
    related: ["supabase-mcp-server", "mongodb-mcp-server", "google-cloud-mcp-server"],
    features: ["Firestore reads/writes", "Auth user management", "Realtime database monitors", "Cloud functions status"]
  },
  {
    name: "Pinecone",
    slug: "pinecone-mcp-server",
    category: "Databases",
    description: "Manage Pinecone vector namespaces, perform semantic searches, insert vector records, and review active search metrics.",
    auth: "Pinecone API Key",
    useCases: ["Query vector similarity indexes", "Inspect custom index schemas", "Manage knowledge base dimensions"],
    related: ["vector-database-mcp-server", "supabase-mcp-server", "redis-mcp-server"],
    features: ["Similarity queries", "Upsert vectors", "Namespace cleanups", "Metadata filtering"]
  },
  {
    name: "Vector Database",
    slug: "vector-database-mcp-server",
    category: "Databases",
    description: "A generalized MCP server supporting ChromaDB, Milvus, and Weaviate. Let your AI search across dynamic high-dimensional vectors.",
    auth: "Custom Server Credentials",
    useCases: ["Perform semantic context injection", "Audit vector data collections", "Re-index embedding spaces"],
    related: ["pinecone-mcp-server", "postgres-mcp-server"],
    features: ["Multi-provider support", "Semantic searches", "Index statistics", "Embedding mapping"]
  },
  {
    name: "Cassandra",
    slug: "cassandra-mcp-server",
    category: "Databases",
    description: "Query wide-column Cassandra database tables and execute Cassandra Query Language (CQL) safely inside models.",
    auth: "Cassandra Connection Credentials",
    useCases: ["Analyze high-scale telemetry", "Inspect Cassandra column families", "Check partition key values"],
    related: ["postgres-mcp-server", "redis-mcp-server"],
    features: ["CQL compilation", "Node status checks", "Table schema mapping", "Data export"]
  },
  {
    name: "Neo4j",
    slug: "neo4j-mcp-server",
    category: "Databases",
    description: "Connect to Neo4j graph databases. Allow AI models to execute Cypher queries and traverse intricate network relationships.",
    auth: "Neo4j Auth Credentials",
    useCases: ["Map graph database nodes", "Analyze fraud networks", "Retrieve path connections"],
    related: ["postgres-mcp-server", "mongodb-mcp-server"],
    features: ["Cypher queries execution", "Graph metadata map", "Node count tallies", "Relationship insights"]
  },
  {
    name: "DynamoDB",
    slug: "dynamodb-mcp-server",
    category: "Databases",
    description: "Expose AWS DynamoDB tables to your agents. Perform high-performance document reads, partition key queries, and schema updates.",
    auth: "AWS Access Keys",
    useCases: ["Query device transaction records", "Scan customer configs tables", "Update attribute parameters in records"],
    related: ["aws-mcp-server", "mongodb-mcp-server"],
    features: ["Index queries", "Table scanning metrics", "Partition updates", "Throughput metrics"]
  },
  {
    name: "ClickHouse",
    slug: "clickhouse-mcp-server",
    category: "Databases",
    description: "Query ClickHouse analytical databases. Run massive aggregates on millions of events instantly under LLM guidance.",
    auth: "ClickHouse HTTP Auth",
    useCases: ["Aggregate user session data", "Identify top traffic sources", "Audit server error distributions"],
    related: ["postgres-mcp-server", "mysql-mcp-server"],
    features: ["Analytical queries", "Table sizing reviews", "Partitions diagnostic", "Compression metrics"]
  },
  {
    name: "Elasticsearch",
    slug: "elasticsearch-mcp-server",
    category: "Databases",
    description: "Expose Elasticsearch indexes. Perform full-text search, audit cluster states, and map complex query filters.",
    auth: "Elastic Search Token",
    useCases: ["Find relevant system error logs", "Perform cluster health diagnoses", "Verify index keyword mappings"],
    related: ["redis-mcp-server", "mongodb-mcp-server"],
    features: ["Full-text searches", "Index analytics", "Cluster health checks", "Alias configurations"]
  },
  {
    name: "Oracle DB",
    slug: "oracle-mcp-server",
    category: "Databases",
    description: "Expose secure Oracle Database instances to enterprise-grade AI models, enabling SQL*Plus actions and data retrieval.",
    auth: "Oracle Connection Credentials",
    useCases: ["Run inventory reports", "Analyze active sessions", "Map complex enterprise schemas"],
    related: ["postgres-mcp-server", "mysql-mcp-server"],
    features: ["PL/SQL compilation", "Session monitoring", "Tablespace analysis", "Read isolation"]
  },

  // Productivity & Communication (15)
  {
    name: "Slack",
    slug: "slack-mcp-server",
    category: "Productivity",
    description: "Let AI agents read public channels, send instant Slack updates, search for historical threads, and manage channel setups.",
    auth: "Slack Bot User Token / OAuth",
    useCases: ["Send system deployment notifications", "Search Slack channels for specific developer discussions", "Automate customer support ticket responses"],
    related: ["gmail-mcp-server", "trello-mcp-server", "jira-mcp-server"],
    features: ["Post messages", "Search history", "Create channels", "Listen to mentions", "User profiles lookup"]
  },
  {
    name: "Gmail",
    slug: "gmail-mcp-server",
    category: "Productivity",
    description: "Connect to your Google Workspace Inbox. Allow AI agents to draft emails, summarize unread items, search messages, and apply labels.",
    auth: "Google OAuth 2.0 Credentials",
    useCases: ["Summarize daily newsletter updates", "Draft client follow-up letters", "Audit inbox for security alerts"],
    related: ["google-calendar-mcp-server", "google-drive-mcp-server", "slack-mcp-server"],
    features: ["Search emails", "Send drafts", "Thread summaries", "Label applications", "Spam analysis"]
  },
  {
    name: "Google Calendar",
    slug: "google-calendar-mcp-server",
    category: "Productivity",
    description: "Allow your personal AI assistant to schedule meetings, list upcoming events, check participant availability, and manage invites.",
    auth: "Google OAuth 2.0 Credentials",
    useCases: ["Find calendar gaps for team Syncs", "List daily meeting logs", "Update existing calendar event times"],
    related: ["gmail-mcp-server", "google-drive-mcp-server", "notion-mcp-server"],
    features: ["Event scheduling", "Conflict discovery", "List events", "Invites automation", "Daily summaries"]
  },
  {
    name: "Google Drive",
    slug: "google-drive-mcp-server",
    category: "Productivity",
    description: "Securely explore, read, search, and structure your corporate documents, spreadsheets, and slides directly within models.",
    auth: "Google OAuth 2.0 Credentials",
    useCases: ["Search documents for specific templates", "Export file folders structure", "Extract spreadsheet cells for model prompts"],
    related: ["gmail-mcp-server", "google-calendar-mcp-server", "notion-mcp-server"],
    features: ["File searches", "Read document text", "Create files", "Folder tree exports", "Permission checks"]
  },
  {
    name: "Notion",
    slug: "notion-mcp-server",
    category: "Productivity",
    description: "Expose Notion workspaces, read dynamic wiki pages, append developer logs, and manage project tables cleanly.",
    auth: "Notion Integration Token",
    useCases: ["Sync local meeting minutes to Notion", "Query company wiki details", "Append daily task items to boards"],
    related: ["google-drive-mcp-server", "jira-mcp-server", "trello-mcp-server"],
    features: ["Block reading/writing", "Page indexing", "Database queries", "Property updates", "Workspace search"]
  },
  {
    name: "Jira",
    slug: "jira-mcp-server",
    category: "Productivity",
    description: "Connect AI agents to your Jira backlog. Allow models to query tickets, create issues, transition statuses, and append comments.",
    auth: "Jira API Token / Basic Auth",
    useCases: ["Audit sprint blocker tickets", "Create detailed technical sub-tasks", "Draft release notes based on resolved issues"],
    related: ["linear-mcp-server", "trello-mcp-server", "github-mcp-server"],
    features: ["Issue transitions", "JQL search query", "Comment appending", "Sprint analytics", "Assignee updates"]
  },
  {
    name: "Linear",
    slug: "linear-mcp-server",
    category: "Productivity",
    description: "Expose the modern developer ticketing tool. Create issues, search cycles, and assign developers instantly using models.",
    auth: "Linear Personal API Key",
    useCases: ["Assign unallocated bug tickets", "Retrieve cycle velocity statistics", "Update issue status after code commits"],
    related: ["jira-mcp-server", "trello-mcp-server", "github-mcp-server"],
    features: ["Issue creations", "Cycle progress reports", "User profiles map", "Project status updates"]
  },
  {
    name: "Trello",
    slug: "trello-mcp-server",
    category: "Productivity",
    description: "Read Trello boards, move tasks across workflow lists, search cards, and append labels based on code changes.",
    auth: "Trello API Key & Token",
    useCases: ["Update sprint board status", "Add developer checklist items", "Summarize client board suggestions"],
    related: ["jira-mcp-server", "notion-mcp-server", "slack-mcp-server"],
    features: ["Card moves", "List indexing", "Checklist management", "Label applications"]
  },
  {
    name: "HubSpot",
    slug: "hubspot-mcp-server",
    category: "Productivity",
    description: "Expose HubSpot contacts, pipelines, deals, and engagement history to let models act as personalized sales assistants.",
    auth: "HubSpot Private App Access Token",
    useCases: ["List active sales opportunities", "Log CRM contacts after email responses", "Track client interactions histories"],
    related: ["salesforce-mcp-server", "stripe-mcp-server", "gmail-mcp-server"],
    features: ["Contact indexing", "Deal status triggers", "Activity logs writing", "Company lookups"]
  },
  {
    name: "Salesforce",
    slug: "salesforce-mcp-server",
    category: "Productivity",
    description: "Connect enterprise-level customer relationships databases, running SOQL queries and updating records inside workflows.",
    auth: "Salesforce OAuth Credentials",
    useCases: ["Extract corporate lead metrics", "Draft support communications based on case profiles", "Update accounts lists"],
    related: ["hubspot-mcp-server", "stripe-mcp-server", "enterprise-mcp"],
    features: ["SOQL execution", "Lead tracking", "Case management", "Account updates"]
  },
  {
    name: "Microsoft Teams",
    slug: "ms-teams-mcp-server",
    category: "Productivity",
    description: "Post chat updates, schedule team calls, and search corporate threads inside your secure Microsoft Cloud.",
    auth: "Microsoft Graph Token",
    useCases: ["Send DevOps status alerts", "Schedule team retrospectives", "Retrieve client thread details"],
    related: ["slack-mcp-server", "gmail-mcp-server"],
    features: ["Message posting", "Call invitations", "Channel listings", "Thread summaries"]
  },
  {
    name: "Zoom",
    slug: "zoom-mcp-server",
    category: "Productivity",
    description: "Generate zoom invitation links, search meeting summaries, and retrieve participant details under AI instructions.",
    auth: "Zoom Server-to-Server OAuth",
    useCases: ["Automate webinar schedules", "Extract meeting audio transcripts", "Manage attendance records"],
    related: ["google-calendar-mcp-server", "slack-mcp-server"],
    features: ["Meeting creation", "Invite link generation", "Transcript search", "Registrant tracking"]
  },
  {
    name: "Discord",
    slug: "discord-mcp-server",
    category: "Productivity",
    description: "Automate user moderations, log community ideas, search channels, and post system announcements via your Discord Bot.",
    auth: "Discord Bot Token",
    useCases: ["Welcome new server users", "Expose community feedback channels", "Broadcast release notifications"],
    related: ["slack-mcp-server", "github-mcp-server"],
    features: ["Message broadcasts", "Member moderations", "Channel indexers", "Reaction listeners"]
  },
  {
    name: "Figma",
    slug: "figma-mcp-server",
    category: "Productivity",
    description: "Expose design canvas frames, inspect CSS variables, retrieve design components metadata, and track comments.",
    auth: "Figma Personal Access Token",
    useCases: ["Verify design spacing parameters", "Export component image links for AI coders", "Summarize design review feedbacks"],
    related: ["github-mcp-server", "slack-mcp-server"],
    features: ["File node inspections", "CSS details export", "Comment lookups", "Asset link generations"]
  },
  {
    name: "Asana",
    slug: "asana-mcp-server",
    category: "Productivity",
    description: "Expose Asana tasks, manage workspace projects, assign ticket owners, and log developer times natively.",
    auth: "Asana Personal Token",
    useCases: ["Sync code commits with task status", "Query project milestones", "Check owner workload tallies"],
    related: ["jira-mcp-server", "trello-mcp-server"],
    features: ["Task insertions", "Milestone monitoring", "User allocations", "Status trackers"]
  },

  // Billing & E-Commerce (10)
  {
    name: "Stripe",
    slug: "stripe-mcp-server",
    category: "Finance",
    description: "Safely audit invoices, search payments details, track active subscriptions, and view billing charts inside corporate platforms.",
    auth: "Stripe Restricted Secret Key",
    useCases: ["Expose MRR metrics to finance agents", "Audit failed customer invoices", "Retrieve subscription statuses for support reps"],
    related: ["razorpay-mcp-server", "shopify-mcp-server", "hubspot-mcp-server"],
    features: ["Read-only invoices lookup", "Subscription tracking", "MRR metrics profiling", "Refund analysis"]
  },
  {
    name: "Razorpay",
    slug: "razorpay-mcp-server",
    category: "Finance",
    description: "Optimized for Indian startups. Audit transactions, trace refund requests, and manage Razorpay Route splits.",
    auth: "Razorpay API Key & Secret",
    useCases: ["Query daily transaction totals", "Audit payment link completion rates", "Verify split billing settlements"],
    related: ["stripe-mcp-server", "shopify-mcp-server", "mcp-for-indian-startups"],
    features: ["Order status audit", "Refund checks", "Settlements analytics", "Route allocations"]
  },
  {
    name: "Shopify",
    slug: "shopify-mcp-server",
    category: "Finance",
    description: "Connect e-commerce stores. Track customer orders, check inventory levels, and update catalog descriptions via AI.",
    auth: "Shopify Admin Access Token",
    useCases: ["Analyze daily sales performance", "Audit running inventory alerts", "Update SEO keywords on products catalogs"],
    related: ["stripe-mcp-server", "razorpay-mcp-server", "hubspot-mcp-server"],
    features: ["Product lookups", "Order analytics", "Inventory alerts", "SEO text injections"]
  },
  {
    name: "PayPal",
    slug: "paypal-mcp-server",
    category: "Finance",
    description: "Audit PayPal Business transactions, invoice details, subscription setups, and payout profiles dynamically.",
    auth: "PayPal Client ID & Secret",
    useCases: ["Query international payment status", "Audit refund completions", "Verify monthly sales tallies"],
    related: ["stripe-mcp-server", "shopify-mcp-server"],
    features: ["Invoice analysis", "Payment audits", "Payout tracking", "Subscription metrics"]
  },
  {
    name: "QuickBooks",
    slug: "quickbooks-mcp-server",
    category: "Finance",
    description: "Expose balance sheets, company accounts files, tax summaries, and client invoice ledgers to finance assistants safely.",
    auth: "QuickBooks OAuth Token",
    useCases: ["Audit company monthly overheads", "Track pending client invoices", "Generate yearly tax outlines"],
    related: ["stripe-mcp-server", "salesforce-mcp-server"],
    features: ["Balance sheet metrics", "Invoice tracking", "Vendor accounts audits", "Expense reporting"]
  },
  {
    name: "WooCommerce",
    slug: "woocommerce-mcp-server",
    category: "Finance",
    description: "Connect WooCommerce stores. Audit orders, configure coupon parameters, and analyze category performance.",
    auth: "WooCommerce Consumer Key",
    useCases: ["Verify order shipping states", "Draft promotional coupon parameters", "Audit top-performing inventory items"],
    related: ["shopify-mcp-server", "stripe-mcp-server"],
    features: ["Order analytics", "Coupon administration", "Product metadata checks", "Review indexes"]
  },
  {
    name: "Xero",
    slug: "xero-mcp-server",
    category: "Finance",
    description: "Integrate Xero accounting. Export invoice details, map bank transactions, and review company balances.",
    auth: "Xero OAuth Access",
    useCases: ["Match bank deposits to invoices", "Verify vendor payment timelines", "Draft ledger corrections"],
    related: ["quickbooks-mcp-server", "stripe-mcp-server"],
    features: ["Bank reconciliation logs", "Invoice creations", "Ledger audits", "Balance indicators"]
  },
  {
    name: "Chargebee",
    slug: "chargebee-mcp-server",
    category: "Finance",
    description: "Audit subscription billing lifecycles, manage dynamic coupon setups, and trace customer churn indicators.",
    auth: "Chargebee API Key",
    useCases: ["Verify customer subscription tiers", "Trace aggregate customer churn rates", "Audit trial conversion trends"],
    related: ["stripe-mcp-server", "hubspot-mcp-server"],
    features: ["Subscription analytics", "Churn indicators lookup", "Coupon updates", "Plan metrics"]
  },
  {
    name: "Paddle",
    slug: "paddle-mcp-server",
    category: "Finance",
    description: "Audit international merchant-of-record (MoR) sales, monitor global sales tax compliance, and track payouts.",
    auth: "Paddle Vendor Auth",
    useCases: ["Analyze global product demand", "Track payout completions", "Audit transaction tax allocations"],
    related: ["stripe-mcp-server", "chargebee-mcp-server"],
    features: ["MoR transaction lookup", "Global tax tracking", "Payout reports", "Billing alerts"]
  },
  {
    name: "Adyen",
    slug: "adyen-mcp-server",
    category: "Finance",
    description: "Expose global payment rails. Audit transaction completion percentages, configure chargeback logs, and audit cards metrics.",
    auth: "Adyen Merchant Credentials",
    useCases: ["Identify high-risk payment attempts", "Track chargeback disputes timelines", "Monitor payment settlement timelines"],
    related: ["stripe-mcp-server", "paypal-mcp-server"],
    features: ["Dispute monitoring", "Transaction audits", "Risk scoring metrics", "Payout trackers"]
  },

  // AI/ML Model Providers (6)
  {
    name: "OpenAI",
    slug: "openai-mcp-server",
    category: "AI Models",
    description: "Connect to OpenAI models (GPT-4, GPT-3.5-turbo) for chat completions, embeddings, and image generation.",
    auth: "OpenAI API Key",
    useCases: ["Generate code completions", "Embed documents for search", "Create images from prompts"],
    related: ["anthropic-mcp-server", "google-gemini-mcp-server", "ollama-mcp-server"],
    features: ["Chat completions", "Embeddings", "Image generation", "Model listing"]
  },
  {
    name: "Anthropic",
    slug: "anthropic-mcp-server",
    category: "AI Models",
    description: "Access Claude models (Claude 3 Opus, Sonnet, Haiku) for reasoning-intensive tasks with constitutional AI.",
    auth: "Anthropic API Key",
    useCases: ["Analyze long documents", "Execute complex reasoning", "Format structured output"],
    related: ["openai-mcp-server", "google-gemini-mcp-server"],
    features: ["Chat completions", "Vision analysis", "Long context windows", "JSON mode"]
  },
  {
    name: "Google Gemini",
    slug: "google-gemini-mcp-server",
    category: "AI Models",
    description: "Use Gemini models (Gemini 1.5 Pro, Flash) for multimodal reasoning and Google Workspace integration.",
    auth: "Google AI API Key",
    useCases: ["Analyze PDFs and images", "Query Google Drive", "Multilingual chat"],
    related: ["openai-mcp-server", "anthropic-mcp-server"],
    features: ["Multimodal input", "Google Workspace integration", "Long context", "Embedding search"]
  },
  {
    name: "Ollama",
    slug: "ollama-mcp-server",
    category: "AI Models",
    description: "Run open-weight models locally (Llama 3, Mistral, Gemma) with no data leaving your infrastructure.",
    auth: "None (local)",
    useCases: ["Private inference", "Air-gapped deployment", "Cost-controlled inference"],
    related: ["openai-mcp-server", "lm-studio-mcp-server"],
    features: ["Local inference", "Model library", "GPU acceleration", "REST API"]
  },
  {
    name: "Mistral",
    slug: "mistral-mcp-server",
    category: "AI Models",
    description: "Access Mistral models (Mixtral, Mistral 7B) optimized for code and multilingual tasks.",
    auth: "Mistral API Key",
    useCases: ["Code generation", "French/English translation", "Fast inference"],
    related: ["openai-mcp-server", "cohere-mcp-server"],
    features: ["Function calling", "Code expertise", "Multilingual", "REST API"]
  },
  {
    name: "Cohere",
    slug: "cohere-mcp-server",
    category: "AI Models",
    description: "Use Cohere models (Command R, Command R+) for enterprise-grade retrieval and multilingual chat.",
    auth: "Cohere API Key",
    useCases: ["Enterprise RAG", "Multilingual support", "Document analysis"],
    related: ["openai-mcp-server", "mistral-mcp-server"],
    features: ["RAG optimized", "Multilingual", "Embeddings", "Chat API"]
  },

  // Observability Tools (5)
  {
    name: "Prometheus",
    slug: "prometheus-mcp-server",
    category: "Observability",
    description: "Query Prometheus metrics, check alert rules, and analyze time-series data for MCP server performance monitoring.",
    auth: "Prometheus Bearer Token",
    useCases: ["Check p99 latency for MCP tools", "Query active connections", "List alert rule violations"],
    related: ["grafana-mcp-server", "aws-mcp-server", "kubernetes-mcp-server"],
    features: ["Metric queries", "Alert rule inspection", "Time-series analysis", "Query builder"]
  },
  {
    name: "Grafana",
    slug: "grafana-mcp-server",
    category: "Observability",
    description: "Manage Grafana dashboards, query data sources, and visualize MCP server metrics through natural language.",
    auth: "Grafana API Key",
    useCases: ["Create latency dashboards", "Share observability reports", "Configure alert channels"],
    related: ["prometheus-mcp-server", "datadog-mcp-server", "newrelic-mcp-server"],
    features: ["Dashboard management", "Query builder", "Alert configuration", "Report sharing"]
  },
  {
    name: "Datadog",
    slug: "datadog-mcp-server",
    category: "Observability",
    description: "Monitor cloud infrastructure, check APM traces, and analyze logs for MCP server deployments.",
    auth: "Datadog API Key",
    useCases: ["Check MCP server memory usage", "Query error logs", "Analyze request latency distributions"],
    related: ["prometheus-mcp-server", "grafana-mcp-server", "aws-mcp-server"],
    features: ["APM tracing", "Log analysis", "Metric queries", "Alert management"]
  },
  {
    name: "New Relic",
    slug: "newrelic-mcp-server",
    category: "Observability",
    description: "Query New Relic telemetry, manage dashboards, and troubleshoot MCP server performance via NRQL.",
    auth: "New Relic API Key",
    useCases: ["Query NRQL for latency spikes", "Manage synthetic monitors", "Create custom dashboards"],
    related: ["datadog-mcp-server", "grafana-mcp-server", "aws-mcp-server"],
    features: ["NRQL queries", "Dashboard builder", "Alert policies", "Entity search"]
  },
  {
    name: "OpenTelemetry",
    slug: "opentelemetry-mcp-server",
    category: "Observability",
    description: "Collect traces, metrics, and logs from MCP servers with OpenTelemetry Collector and query telemetry data.",
    auth: "OTLP Endpoint",
    useCases: ["Export traces from tools", "Query metrics by span", "Analyze log patterns"],
    related: ["prometheus-mcp-server", "grafana-mcp-server", "kubernetes-mcp-server"],
    features: ["Trace collection", "Metric export", "Log aggregation", "Query interface"]
  },

  // Cloud Platforms (10)
  {
    name: "AWS",
    slug: "aws-mcp-server",
    category: "Cloud",
    description: "Allow your models to inspect EC2 instance statuses, check S3 bucket permissions, monitor CloudWatch logs, and check AWS bill metrics safely.",
    auth: "AWS Access & Secret Keys",
    useCases: ["List active EC2 resources and dynos", "Monitor active cost parameters", "Check CloudWatch alert histories"],
    related: ["google-cloud-mcp-server", "azure-mcp-server", "kubernetes-mcp-server"],
    features: ["EC2 details checks", "S3 security diagnostics", "CloudWatch search", "Cost monitors"]
  },
  {
    name: "Google Cloud",
    slug: "google-cloud-mcp-server",
    category: "Cloud",
    description: "Connect GCP projects. Monitor Cloud Run services, query BigQuery analytics, and check Cloud Logging details instantly.",
    auth: "GCP Service Account Credentials JSON",
    useCases: ["Check Cloud Run service revisions", "Execute rapid analytics on BigQuery datasets", "Audit project IAM permissions histories"],
    related: ["aws-mcp-server", "azure-mcp-server", "kubernetes-mcp-server"],
    features: ["Cloud Run status", "BigQuery queries sandbox", "IAM audit logs", "Logging streaming"]
  },
  {
    name: "Azure",
    slug: "azure-mcp-server",
    category: "Cloud",
    description: "Expose Azure resource groups, monitor Virtual Machines telemetry, and manage Blob Storage security parameters.",
    auth: "Azure Active Directory Client Secret",
    useCases: ["Verify VM system loads", "Audit resource group configuration files", "Retrieve active subscription invoices"],
    related: ["aws-mcp-server", "google-cloud-mcp-server", "kubernetes-mcp-server"],
    features: ["VM diagnostic charts", "Security Center checks", "Resource group mapping", "Cost summaries"]
  },
  {
    name: "DigitalOcean",
    slug: "digitalocean-mcp-server",
    category: "Cloud",
    description: "Check active droplets health, manage firewall configurations, and trigger backup droplets cycles safely.",
    auth: "DigitalOcean Personal Access Token",
    useCases: ["Monitor droplet memory limits", "Update firewalls list", "Rollout droplet snapshots during updates"],
    related: ["aws-mcp-server", "cloudflare-mcp-server"],
    features: ["Droplet scaling controls", "Firewall configurations", "Snapshot backups", "Bandwidth checkers"]
  },
  {
    name: "Linode",
    slug: "linode-mcp-server",
    category: "Cloud",
    description: "Manage Linode compute nodes, check NodeBalancers configs, and review Object Storage allocations.",
    auth: "Linode Personal Token",
    useCases: ["Check Linode status metrics", "Identify failing nodes", "Retrieve cost parameters"],
    related: ["digitalocean-mcp-server", "aws-mcp-server"],
    features: ["Node monitoring", "Balancer detail checks", "Storage calculations", "Cost analysis"]
  },
  {
    name: "Supabase Cloud",
    slug: "supabase-cloud-mcp-server",
    category: "Cloud",
    description: "Monitor multi-project cloud deployments, track database size indicators, and inspect active edge-functions.",
    auth: "Supabase Partner Access",
    useCases: ["Audit storage growth trends", "Inspect edge error metrics", "Manage environment variables"],
    related: ["supabase-mcp-server", "vercel-mcp-server"],
    features: ["DB metrics tracker", "Storage counters", "Environment controllers", "Edge functions dashboard"]
  },
  {
    name: "Fly.io",
    slug: "fly-io-mcp-server",
    category: "Cloud",
    description: "Check Fly app volumes, monitor edge routing telemetry, and restart failed fly machines.",
    auth: "Fly.io Access Token",
    useCases: ["Restart failed regional nodes", "Examine routing statistics", "Configure persistent volumes"],
    related: ["vercel-mcp-server", "docker-mcp-server"],
    features: ["Machine restarts", "Edge latency checks", "Volume controllers", "Log streaming"]
  },
  {
    name: "Railway",
    slug: "railway-mcp-server",
    category: "Cloud",
    description: "Audit Railway project services, check live service logs, and update environment secrets dynamically.",
    auth: "Railway API Token",
    useCases: ["Monitor railway deployment triggers", "Verify database health metrics", "Sync environment variables"],
    related: ["vercel-mcp-server", "supabase-mcp-server"],
    features: ["Service metrics lookup", "Environment synchronization", "Uptime trackers", "Deploy control"]
  },
  {
    name: "Render",
    slug: "render-mcp-server",
    category: "Cloud",
    description: "Check Render web services, deploy static websites, and review private service networking parameters.",
    auth: "Render API Key",
    useCases: ["Trigger production builds", "Monitor web service response limits", "Trace server compile failures"],
    related: ["vercel-mcp-server", "railway-mcp-server"],
    features: ["Build trigger commands", "Service health diagnostics", "Private host lookups", "Cost tracking"]
  },
  {
    name: "Scaleway",
    slug: "scaleway-mcp-server",
    category: "Cloud",
    description: "Expose Scaleway cloud elements, audit bare metal nodes, and manage S3-compatible objects.",
    auth: "Scaleway Token",
    useCases: ["Monitor bare metal capacities", "Manage file storage parameters", "Track network balance"],
    related: ["aws-mcp-server", "digitalocean-mcp-server"],
    features: ["Bare metal telemetry", "Bucket actions", "Load balancer metrics", "Cost diagnostics"]
  }
];
