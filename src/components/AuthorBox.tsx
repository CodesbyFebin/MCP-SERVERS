import { Calendar, User, ExternalLink, ShieldCheck } from "lucide-react";

export interface AuthorBoxProps {
  authorName: string;
  authorRole?: string;
  authorAvatar?: string;
  publishedDate?: string;
  updatedDate?: string;
  citations?: { label: string; url: string }[];
  className?: string;
}

export default function AuthorBox({
  authorName,
  authorRole = "Principal Search Architect",
  authorAvatar,
  publishedDate = "2026-07-01",
  updatedDate = "2026-07-09",
  citations = [],
  className = "",
}: AuthorBoxProps) {
  return (
    <div
      id="eeat-author-box"
      className={`p-5 my-8 bg-gray-900/30 rounded-2xl border border-gray-800/80 backdrop-blur-sm ${className}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-800/60 pb-4">
        {/* Author Bio */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-white font-sans font-bold text-sm shadow-md shrink-0">
            {authorAvatar ? (
              <img src={authorAvatar} alt={authorName} className="w-full h-full rounded-full object-cover" />
            ) : (
              authorName.charAt(0)
            )}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-semibold text-white font-sans">{authorName}</span>
              <span title="Expert Reviewed">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
              </span>
            </div>
            <p className="text-xs text-gray-400 font-sans">{authorRole}</p>
          </div>
        </div>

        {/* Dates metadata */}
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>Published: {publishedDate}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-cyan-500/80" />
            <span>Updated: {updatedDate}</span>
          </div>
        </div>
      </div>

      {/* Citations / Academic References for Search Engine Trust */}
      {citations && citations.length > 0 && (
        <div className="mt-4">
          <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
            References & Technical Specifications
          </h4>
          <ul className="space-y-1.5" role="list">
            {citations.map((citation, idx) => (
              <li key={idx} className="flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 transition-colors">
                <ExternalLink className="w-3 h-3 text-cyan-500 shrink-0" />
                <a
                  href={citation.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline flex items-center gap-0.5"
                >
                  {citation.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
