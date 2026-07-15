import Link from "next/link";
import { Topic } from "../data/topics";
import { FileText, ArrowRight } from "lucide-react";

export interface TopicCardProps {
  topic: Topic;
}

export default function TopicCard({ topic }: TopicCardProps) {
  return (
    <div className="rounded-xl bg-gray-900/20 border border-gray-900 hover:border-blue-500/10 p-5 flex flex-col justify-between transition-all duration-300 group">
      <div>
        {/* Intent Badge */}
        <div className="flex items-center justify-between gap-2 text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-3">
          <span>{topic.pillar.replace("-", " ")}</span>
          <span className="px-2 py-0.5 rounded bg-gray-950 text-blue-400 text-[10px]">
            {topic.intent}
          </span>
        </div>

        {/* Title */}
        <h4 className="text-sm font-sans font-bold text-gray-100 group-hover:text-blue-400 transition-colors flex items-start gap-2 leading-tight">
          <FileText className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
          <span>{topic.title}</span>
        </h4>

        {/* Short answer */}
        <p className="mt-2 text-xs text-gray-400 leading-relaxed line-clamp-3">
          {topic.shortAnswer}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-gray-950 flex justify-end text-xs font-semibold text-blue-400">
        <Link
          href={`/topics/${topic.slug}`}
          className="inline-flex items-center gap-1 text-gray-400 group-hover:text-blue-400 transition-colors"
        >
          <span>Read Article</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
