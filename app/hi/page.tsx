import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "MCPserver.in — हिंदी",
  description: "MCPserver.in का हिंदी सारांश।",
  alternates: {
    canonical: "/hi",
    languages: {
      "en-IN": "/",
      "en": "/",
      "hi-IN": "/hi",
      "x-default": "/",
    },
  },
};

export default function HindiLanding() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-black text-white">MCPserver.in — हिंदी परिचय</h1>
      <p className="mt-4 text-white/65 leading-relaxed">
        यह पृष्ठ हिंदी में बुनियादी जानकारी प्रदान करता है।
      </p>
      <ul className="mt-6 space-y-2 text-white/65">
        <li>
          <Link className="text-cyan-300 hover:text-cyan-200" href="/docs">दस्तावेज़</Link>
        </li>
        <li>
          <Link className="text-cyan-300 hover:text-cyan-200" href="/pricing">मूल्य निर्धारण</Link>
        </li>
        <li>
          <Link className="text-cyan-300 hover:text-cyan-200" href="/faq">अक्सर पूछे जाने वाले प्रश्न</Link>
        </li>
      </ul>
    </div>
  );
}
