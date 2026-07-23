export interface DirectoryCategory {
  slug: string;
  name: string;
  description: string;
  iconName: string;
  count: number;
}

export const categories: DirectoryCategory[] = [
  {
    slug: "developer-tools",
    name: "Developer Tools",
    description: "Connect code repositories, CI/CD, and hosting dashboards.",
    iconName: "Code",
    count: 34
  },
  {
    slug: "databases",
    name: "Databases",
    description: "Safely expose SQL/NoSQL databases and vector indexes to models.",
    iconName: "Database",
    count: 28
  },
  {
    slug: "productivity",
    name: "Productivity",
    description: "Let AI organize emails, calendar logs, and project management tickets.",
    iconName: "Briefcase",
    count: 22
  },
  {
    slug: "finance",
    name: "Finance & Billing",
    description: "Manage subscription plans, check invoices, and trigger split billing.",
    iconName: "CreditCard",
    count: 16
  }
];
