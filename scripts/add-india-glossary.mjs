#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const glossaryPath = path.join(__dirname, '..', 'src', 'data', 'glossary.ts');

// India-specific terms to add
const indiaTerms = [
  {
    slug: "upi",
    term: "UPI (Unified Payments Interface)",
    definition: "India's real-time payment system that enables instant bank-to-bank transfers, allowing AI agents to initiate and check payments through MCP servers.",
    detailedExplanation: "UPI is India's most popular digital payment method, processing billions of transactions monthly. An MCP server for UPI would integrate with bank APIs (NPCI's UPI APIs or bank-specific APIs) to enable AI agents to check payment status, initiate merchant payments, or retrieve transaction history. UPI integration requires adherence to NPCI guidelines and bank-level security for production use.",
    keyTakeaways: [
      "India's real-time payment system for bank transfers",
      "MCP servers can wrap UPI APIs for AI payment queries",
      "Requires NPCI API access and bank-level security",
      "Returns transaction status, not full account data"
    ],
    useCase: "An AI agent uses a UPI MCP server to fetch payment status for a customer support query without accessing full bank account details.",
    technicalDetails: {
      protocolLayer: "Payment Integration Layer",
      format: "JSON-RPC wrapping NPCI/Bank UPI APIs",
      latencyProfile: "Typically 100-500ms per payment query"
    },
    references: [
      "https://www.npci.org.in/what-we-do/upi",
      "https://www.rbi.org.in/scripts/bs_viewcontent.aspx?Id=1439"
    ]
  },
  {
    slug: "gst",
    term: "GST (Goods and Services Tax)",
    definition: "India's comprehensive indirect tax system; an MCP server for GST enables AI agents to validate GSTIN numbers and retrieve tax compliance data.",
    detailedExplanation: "GST replaced multiple indirect taxes with a unified tax system. A GST MCP server would integrate with GSTN's APIs to enable businesses to validate GST identification numbers, retrieve invoice data, and check filing status. This is particularly useful for Indian businesses building agentic workflows around tax compliance and invoice processing.",
    keyTakeaways: [
      "India's unified indirect tax system since 2017",
      "MCP servers can validate GSTIN and check compliance",
      "Requires GSTN API access with proper authentication",
      "Useful for accounting and tax automation workflows"
    ],
    useCase: "An AI agent validates supplier GSTIN numbers before processing invoices in an accounting system.",
    technicalDetails: {
      protocolLayer: "Tax Compliance Layer",
      format: "JSON-RPC wrapping GSTN APIs",
      latencyProfile: "Typically 200-1000ms for validation queries"
    },
    references: [
      "https://www.gst.gov.in/",
      "https://www.gstn.org/"
    ]
  },
  {
    slug: "aadhaar",
    term: "Aadhaar",
    definition: "India's biometric identity system; MCP servers handling Aadhaar data must implement strict DPDP safeguards for PII.",
    detailedExplanation: "Aadhaar is the world's largest biometric identity system with over 1.3 billion enrollments. When building MCP tools that interact with Aadhaar data (identity verification, eKYC), servers must implement encryption, minimize data exposure, and maintain audit logs. Any Aadhaar-related tool should redact biometric data and only return verification status.",
    keyTakeaways: [
      "India's biometric identity system (1.3B+ enrollments)",
      "MCP servers must treat Aadhaar as sensitive PII",
      "Requires UIDAI compliance and DPDP safeguards",
      "Never exposes biometric data directly"
    ],
    useCase: "An MCP server verifies Aadhaar status for KYC workflows without returning any biometric or demographic data.",
    technicalDetails: {
      protocolLayer: "Identity Verification Layer",
      format: "Secure API with encrypted payloads",
      latencyProfile: "100-300ms for verification"
    },
    references: [
      "https://uidai.gov.in/",
      "https://mcpserver.in/learn/dpdp-compliance-guide"
    ]
  },
  {
    slug: "digi-locker",
    term: "DigiLocker",
    definition: "India's digital document wallet; MCP servers can retrieve verified documents (PAN, driving license, marksheets) for AI workflows.",
    detailedExplanation: "DigiLocker provides citizens with cloud-based document storage for government-issued documents. MCP servers can integrate with DigiLocker APIs to let AI agents access verified documents on behalf of users. Each document fetch requires user consent and proper OAuth scope management to comply with DPDP requirements.",
    keyTakeaways: [
      "Govt of India's digital document wallet",
      "MCP servers can access verified documents via OAuth",
      "Requires user consent for each document access",
      "Implements DPDP-scoped consent model"
    ],
    useCase: "An AI agent retrieves a user's driving license from DigiLocker to verify identity for a travel booking workflow.",
    technicalDetails: {
      protocolLayer: "Document Access Layer",
      format: "OAuth 2.0 + JSON-RPC",
      latencyProfile: "Typically 300-800ms per document fetch"
    },
    references: [
      "https://digitallocker.gov.in/",
      "https://developer.digilocker.gov.in/"
    ]
  },
  {
    slug: "ifsc",
    term: "IFSC (Indian Financial System Code)",
    definition: "An alphanumeric code that uniquely identifies Indian bank branches for NEFT, RTGS, and IMPS transactions.",
    detailedExplanation: "IFSC codes (e.g., SBIN0001234) are essential for Indian banking transactions. MCP servers that handle banking data should validate IFSC codes before processing transactions. The Reserve Bank of India maintains an official list of IFSC codes that can be queried via API for validation.",
    keyTakeaways: [
      "Uniquely identifies Indian bank branches",
      "Required for NEFT, RTGS, and IMPS transfers",
      "MCP servers should validate IFSC before transactions",
      "RBI maintains official IFSC directory"
    ],
    useCase: "An MCP banking server validates IFSC codes before initiating fund transfers.",
    technicalDetails: {
      protocolLayer: "Banking Validation Layer",
      format: "JSON lookup or regex validation",
      latencyProfile: "<10ms for local validation"
    },
    references: [
      "https://www.rbi.org.in/Scripts/IFSCDetail.aspx",
      "https://www.npci.org.in/"
    ]
  }
];

async function main() {
  const content = fs.readFileSync(glossaryPath, 'utf8');
  const lines = content.split('\n');
  
  // Find the closing "  ];" of the array
  const closingIndex = lines.findIndex((l, i) => i > 0 && l.trim() === '];' && lines[i-1].includes('}'));
  
  if (closingIndex === -1) {
    console.error('Could not find array closing');
    process.exit(1);
  }
  
  // Build new entries
  const newEntries = indiaTerms.map(term => `    {\n      slug: "${term.slug}",\n      term: "${term.term}",\n      definition: "${term.definition}",\n      detailedExplanation: "${term.detailedExplanation}",\n      keyTakeaways: [\n        ${term.keyTakeaways.map(k => `"${k}"`).join(',\n        ')}\n      ],\n      useCase: "${term.useCase}",\n      technicalDetails: {\n        protocolLayer: "${term.technicalDetails.protocolLayer}",\n        format: "${term.technicalDetails.format}",\n        latencyProfile: "${term.technicalDetails.latencyProfile}"\n      },\n      references: [\n        ${term.references.map(r => `"${r}"`).join(',\n        ')}\n      ]\n    }`).join(',\n');
  
  // Insert before the closing
  const before = lines.slice(0, closingIndex);
  const after = lines.slice(closingIndex);
  const newContent = [...before, '    },', newEntries, ...after].join('\n');
  
  fs.writeFileSync(glossaryPath, newContent, 'utf8');
  console.log(`✅ Added ${indiaTerms.length} India-specific glossary terms`);
}

main();