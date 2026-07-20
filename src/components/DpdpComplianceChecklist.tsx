"use client";

import { useState } from "react";
import Breadcrumbs from "./Breadcrumbs";
import { ShieldCheck, AlertTriangle, CheckCircle2, XCircle, Info } from "lucide-react";

interface ChecklistItem {
  id: string;
  category: string;
  title: string;
  description: string;
  requirement: string;
}

const checklistItems: ChecklistItem[] = [
  {
    id: "data-localization",
    category: "Data Residency",
    title: "Data Localization",
    description: "Personal data of Indian users must be stored and processed within India.",
    requirement: "DPDP Act 2023 - Section 5"
  },
  {
    id: "consent-management",
    category: "Consent",
    title: "Explicit Consent",
    description: "Obtain clear, explicit consent before collecting or processing personal data.",
    requirement: "DPDP Act 2023 - Section 6"
  },
  {
    id: "purpose-limitation",
    category: "Data Handling",
    title: "Purpose Limitation",
    description: "Collect only data necessary for specified purposes. Do not use data for unrelated purposes.",
    requirement: "DPDP Act 2023 - Section 7"
  },
  {
    id: "data-minimization",
    category: "Data Handling",
    title: "Data Minimization",
    description: "Limit data collection to what is strictly necessary for the intended purpose.",
    requirement: "DPDP Act 2023 - Section 8"
  },
  {
    id: "breach-notification",
    category: "Security",
    title: "Breach Notification",
    description: "Notify affected users and the Data Protection Board within 72 hours of a data breach.",
    requirement: "DPDP Act 2023 - Rule 6"
  },
  {
    id: "encryption-transit",
    category: "Security",
    title: "Encryption in Transit",
    description: "Use TLS 1.2+ for all data in transit. Enforce HTTPS for all endpoints.",
    requirement: "Industry Best Practice"
  },
  {
    id: "encryption-rest",
    category: "Security",
    title: "Encryption at Rest",
    description: "Encrypt databases, backups, and storage using AES-256 or equivalent.",
    requirement: "Industry Best Practice"
  },
  {
    id: "access-control",
    category: "Security",
    title: "Access Control",
    description: "Implement role-based access control (RBAC) and least-privilege principles.",
    requirement: "Industry Best Practice"
  },
  {
    id: "audit-logging",
    category: "Security",
    title: "Audit Logging",
    description: "Maintain immutable audit logs for data access, modifications, and administrative actions.",
    requirement: "DPDP Act 2023 - Section 9"
  },
  {
    id: "data-retention",
    category: "Data Governance",
    title: "Data Retention Policy",
    description: "Define and enforce data retention periods. Delete data when no longer needed.",
    requirement: "DPDP Act 2023 - Section 10"
  },
  {
    id: "user-rights",
    category: "User Rights",
    title: "User Rights Implementation",
    description: "Support access, correction, deletion, and portability of user data.",
    requirement: "DPDP Act 2023 - Section 11"
  },
  {
    id: "dpo-appointment",
    category: "Governance",
    title: "Data Protection Officer",
    description: "Appoint a Data Protection Officer for significant data processing operations.",
    requirement: "DPDP Act 2023 - Section 12"
  },
  {
    id: "rbi-data-localization",
    category: "RBI Compliance",
    title: "RBI Data Localization",
    description: "Payment and financial data must be stored in India. Cross-border transfer requires explicit approval.",
    requirement: "RBI Notification 2018"
  },
  {
    id: "rbi-consent",
    category: "RBI Compliance",
    title: "RBI Consent Framework",
    description: "Implement explicit consent for payment data collection and processing.",
    requirement: "RBI Notification 2018"
  },
  {
    id: "rbi-audit",
    category: "RBI Compliance",
    title: "RBI Audit Requirements",
    description: "Maintain 7-year audit trails for financial data processing and transactions.",
    requirement: "RBI Notification 2018"
  }
];

export default function DpdpComplianceChecklist() {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    setCheckedItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const completedCount = checkedItems.size;
  const totalCount = checklistItems.length;
  const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const categories = Array.from(new Set(checklistItems.map((item) => item.category)));

  return (
    <div id="tools-page" className="min-h-screen bg-transparent text-[#e0e0e0] font-sans pt-6 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: "Developer Tools", href: "/tools/mcp-playground" },
            { name: "DPDP & RBI Compliance Checklist", href: "/tools/dpdp-compliance-checklist" }
          ]}
        />

        <div className="text-center py-6 mb-8 border-b border-white/5 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-60 h-60 bg-cyan-500/5 rounded-full blur-[80px] pointer-events-none" />
          <h1 className="text-3xl font-display font-bold text-white tracking-tighter leading-tight">
            DPDP & RBI Compliance Checklist
          </h1>
          <p className="mt-2 text-xs text-white/50 max-w-xl mx-auto leading-relaxed">
            Educational compliance checklist for MCP deployments in India. Covers DPDP Act 2023, RBI guidelines, data localization, consent management, and breach notification requirements.
          </p>
          <div className="mt-4 p-3 rounded-lg bg-amber-950/20 border border-amber-800/30 text-amber-200 text-xs max-w-xl mx-auto">
            <Info className="w-4 h-4 inline-block mr-1" />
            This is an educational checklist, not legal advice. Consult a qualified lawyer for compliance determinations.
          </div>
        </div>

        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 sm:p-8 shadow-xl backdrop-blur-md">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-white">Progress</h2>
              <p className="text-xs text-white/50 mt-1">
                {completedCount} of {totalCount} items reviewed
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-black text-cyan-300">{progress}%</div>
              <div className="text-[10px] text-white/40">Complete</div>
            </div>
          </div>
          <div className="w-full bg-white/5 rounded-full h-2 mb-8">
            <div
              className="bg-cyan-500 h-2 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>

          {categories.map((category) => (
            <div key={category} className="mb-8">
              <h3 className="text-sm font-bold text-white/70 uppercase tracking-wider mb-4 pb-2 border-b border-white/5">
                {category}
              </h3>
              <div className="space-y-3">
                {checklistItems
                  .filter((item) => item.category === category)
                  .map((item) => {
                    const isChecked = checkedItems.has(item.id);
                    return (
                      <div
                        key={item.id}
                        className={`p-4 rounded-lg border transition-all cursor-pointer ${
                          isChecked
                            ? "bg-emerald-950/10 border-emerald-500/20"
                            : "bg-white/[0.02] border-white/5 hover:border-white/10"
                        }`}
                        onClick={() => toggleItem(item.id)}
                      >
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5">
                            {isChecked ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                            ) : (
                              <div className="w-5 h-5 rounded-full border-2 border-white/20" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="text-sm font-bold text-white">{item.title}</h4>
                              <span className="text-[10px] font-mono text-white/30">{item.requirement}</span>
                            </div>
                            <p className="text-xs text-white/55 leading-relaxed">{item.description}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-6 rounded-xl bg-white/[0.01] border border-white/5 text-center">
          <h3 className="text-white font-medium mb-2">Need Detailed Guidance?</h3>
          <p className="text-xs text-white/50 mb-4">
            Explore our DPDP compliance guide and production deployment resources for implementation details.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="/learn/dpdp-compliance-guide"
              className="inline-flex items-center gap-2 rounded-md bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold px-4 py-2 transition-all"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              DPDP Guide
            </a>
            <a
              href="/learn/mcp-production-deployment"
              className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-bold text-white hover:bg-white/[0.06] transition-all"
            >
              Deployment Guide
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
