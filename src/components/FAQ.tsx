"use client";

import { useState } from "react";
import { FAQItem } from "../data/faqs";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

export interface FAQProps {
  items: FAQItem[];
  title?: string;
  subtitle?: string;
}

export default function FAQ({ items, title = "Frequently Asked Questions", subtitle = "Contextual information and technical support details regarding Model Context Protocol integration" }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq-section" className="py-12 bg-transparent">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h3 className="text-xl sm:text-2xl font-sans font-bold text-white tracking-tight flex items-center justify-center gap-2">
            <HelpCircle className="w-5 h-5 text-cyan-400" />
            {title}
          </h3>
          <p className="text-xs text-gray-500 mt-2 max-w-xl mx-auto">{subtitle}</p>
        </div>

        <div className="space-y-3">
          {items.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                id={`faq-item-${idx}`}
                className="rounded-xl bg-gray-900/40 border border-gray-800/80 hover:border-gray-800 transition-all overflow-hidden"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full px-5 py-4 flex items-center justify-between text-left font-medium text-sm text-gray-200 hover:text-white transition-colors"
                >
                  <span className="pr-4">{item.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-cyan-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-500 shrink-0" />
                  )}
                </button>
                
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-gray-400 leading-relaxed border-t border-gray-950/40 bg-[#06060c]/20">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
