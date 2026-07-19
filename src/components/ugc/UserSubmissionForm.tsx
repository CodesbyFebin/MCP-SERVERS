"use client";

import { useState, useCallback } from "react";
import { Send, FileText, BookOpen, FolderOpen, Star, MessageSquare } from "lucide-react";

export type SubmissionType = "story" | "tutorial" | "resource" | "review" | "config";

interface UserSubmissionFormProps {
  postId: string;
  title?: string;
  type: SubmissionType;
}

const typeConfig: Record<SubmissionType, {
  icon: React.ComponentType<{ className?: string }>;
  placeholder: string;
  fields: { name: string; type: "text" | "textarea" | "select"; options?: string[] }[];
  submitLabel: string;
}> = {
  story: {
    icon: FileText,
    placeholder: "Tell us about your experience...",
    fields: [
      { name: "title", type: "text" },
      { name: "story", type: "textarea" },
      { name: "outcome", type: "textarea" }
    ],
    submitLabel: "Share Your Story"
  },
  tutorial: {
    icon: BookOpen,
    placeholder: "Walk us through your tutorial...",
    fields: [
      { name: "title", type: "text" },
      { name: "steps", type: "textarea" },
      { name: "difficulty", type: "select", options: ["Beginner", "Intermediate", "Advanced"] }
    ],
    submitLabel: "Submit Tutorial"
  },
  resource: {
    icon: FolderOpen,
    placeholder: "Describe the resource you're sharing...",
    fields: [
      { name: "name", type: "text" },
      { name: "url", type: "text" },
      { name: "description", type: "textarea" },
      { name: "category", type: "select", options: ["Tool", "Library", "Guide", "Template", "Dataset"] }
    ],
    submitLabel: "Share Resource"
  },
  review: {
    icon: Star,
    placeholder: "Write your review...",
    fields: [
      { name: "subject", type: "text" },
      { name: "rating", type: "select", options: ["1 - Poor", "2 - Fair", "3 - Good", "4 - Great", "5 - Excellent"] },
      { name: "pros", type: "textarea" },
      { name: "cons", type: "textarea" }
    ],
    submitLabel: "Submit Review"
  },
  config: {
    icon: MessageSquare,
    placeholder: "Share your configuration...",
    fields: [
      { name: "name", type: "text" },
      { name: "config", type: "textarea" },
      { name: "notes", type: "textarea" }
    ],
    submitLabel: "Share Config"
  }
};

export default function UserSubmissionForm({
  postId,
  title,
  type
}: UserSubmissionFormProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});

  const config = typeConfig[type];
  const Icon = config.icon;

  const handleChange = useCallback((field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleSubmit = useCallback(() => {
    const allFilled = config.fields.every(
      (f) => formData[f.name]?.trim()
    );
    if (allFilled) {
      setSubmitted(true);
      setFormData({});
      setTimeout(() => setIsExpanded(false), 2000);
    }
  }, [config.fields, formData]);

  if (submitted) {
    return (
      <section className="mt-8 rounded-xl border border-emerald-400/20 bg-emerald-500/5 p-6 text-center">
        <Star className="h-8 w-8 mx-auto text-emerald-400 mb-2" />
        <h3 className="text-sm font-bold text-emerald-200">Thank you!</h3>
        <p className="mt-1 text-xs text-white/50">
          Your submission has been shared with the community.
        </p>
      </section>
    );
  }

  return (
    <section className="mt-8 rounded-xl border border-white/10 bg-white/[0.03]" aria-label={title ?? type}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center gap-3 px-5 py-4 text-left"
      >
        <div className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/5">
          <Icon className="h-4 w-4 text-violet-300" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-white">{title ?? config.submitLabel}</h3>
          <p className="text-[11px] text-white/40">
            {isExpanded ? "Click to collapse" : "Click to share"}
          </p>
        </div>
      </button>

      {isExpanded && (
        <div className="px-5 pb-5 space-y-3 border-t border-white/5 pt-4">
          {config.fields.map((field) => (
            <div key={field.name}>
              <label className="block text-xs font-bold text-white/60 mb-1 capitalize">
                {field.name}
              </label>
              {field.type === "textarea" ? (
                <textarea
                  value={formData[field.name] ?? ""}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  placeholder={config.placeholder}
                  className="w-full resize-none rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/30 focus:border-violet-400/50 focus:outline-none"
                  rows={3}
                />
              ) : field.type === "select" && field.options ? (
                <select
                  value={formData[field.name] ?? ""}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-violet-400/50 focus:outline-none appearance-none"
                >
                  <option value="" className="bg-gray-900">Select...</option>
                  {field.options.map((opt) => (
                    <option key={opt} value={opt} className="bg-gray-900">
                      {opt}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  value={formData[field.name] ?? ""}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  placeholder={field.name}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/30 focus:border-violet-400/50 focus:outline-none"
                />
              )}
            </div>
          ))}

          <div className="flex justify-end pt-2">
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-xs font-bold text-white hover:bg-violet-500 transition"
            >
              <Send className="h-3.5 w-3.5" />
              {config.submitLabel}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
