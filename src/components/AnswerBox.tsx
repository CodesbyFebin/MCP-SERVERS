import { CheckCircle2 } from "lucide-react";

export interface AnswerBoxProps {
  question: string;
  answer: string;
  keyTakeaways?: string[];
  className?: string;
}

export default function AnswerBox({
  question,
  answer,
  keyTakeaways,
  className = "",
}: AnswerBoxProps) {
  return (
    <div
      id="aeo-answer-box"
      className={`p-6 my-6 bg-gradient-to-br from-cyan-950/10 to-indigo-950/10 border-l-4 border-cyan-500 rounded-r-2xl bg-gray-900/30 border border-gray-800/50 backdrop-blur-sm shadow-xl ${className}`}
      itemScope
      itemType="https://schema.org/Question"
    >
      <h3 className="text-sm font-sans font-semibold text-cyan-400 mb-2 uppercase tracking-wider" itemProp="name">
        Quick Answer / TL;DR
      </h3>
      <div className="text-sm text-gray-200 font-medium leading-relaxed mb-4" itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
        <p itemProp="text" className="text-gray-100 font-sans leading-relaxed text-sm md:text-base">
          {answer}
        </p>
      </div>

      {keyTakeaways && keyTakeaways.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-800/60">
          <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
            Key Takeaways
          </h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-300" role="list">
            {keyTakeaways.map((takeaway, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                <span>{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
