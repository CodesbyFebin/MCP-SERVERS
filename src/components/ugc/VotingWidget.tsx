"use client";

import { useState, useCallback } from "react";
import { ThumbsUp, ThumbsDown, Trophy, ChevronUp, Award } from "lucide-react";

export interface VoteOption {
  id: string;
  label: string;
  description?: string;
  votes: number;
  userVoted?: boolean;
}

interface VotingWidgetProps {
  postId: string;
  title?: string;
  options: VoteOption[];
  variant?: "updown" | "poll" | "ranking";
  allowMultiple?: boolean;
}

export default function VotingWidget({
  postId,
  title = "Was this helpful?",
  options: initialOptions,
  variant = "updown",
  allowMultiple = false
}: VotingWidgetProps) {
  const [options, setOptions] = useState<VoteOption[]>(initialOptions);
  const [hasVoted, setHasVoted] = useState(false);

  const totalVotes = options.reduce((sum, o) => sum + o.votes, 0);

  const handleVote = useCallback(
    (optionId: string) => {
      if (variant === "updown") {
        setOptions((prev) =>
          prev.map((o) => {
            if (o.id === optionId) {
              if (o.userVoted) {
                return { ...o, votes: o.votes - 1, userVoted: false };
              }
              return { ...o, votes: o.votes + 1, userVoted: true };
            }
            return o;
          })
        );
        setHasVoted(true);
        return;
      }

      if (!allowMultiple) {
        setOptions((prev) =>
          prev.map((o) => {
            if (o.userVoted && o.id !== optionId) {
              return { ...o, votes: o.votes - 1, userVoted: false };
            }
            if (o.id === optionId && !o.userVoted) {
              return { ...o, votes: o.votes + 1, userVoted: true };
            }
            if (o.id === optionId && o.userVoted) {
              return { ...o, votes: o.votes - 1, userVoted: false };
            }
            return o;
          })
        );
      } else {
        setOptions((prev) =>
          prev.map((o) =>
            o.id === optionId
              ? o.userVoted
                ? { ...o, votes: o.votes - 1, userVoted: false }
                : { ...o, votes: o.votes + 1, userVoted: true }
              : o
          )
        );
      }
      setHasVoted(true);
    },
    [variant, allowMultiple]
  );

  // Simple up/down variant
  if (variant === "updown") {
    const upVotes = options.find((o) => o.id === "up")?.votes ?? 0;
    const downVotes = options.find((o) => o.id === "down")?.votes ?? 0;
    const upVoted = options.find((o) => o.id === "up")?.userVoted ?? false;
    const downVoted = options.find((o) => o.id === "down")?.userVoted ?? false;

    return (
      <section className="mt-8 rounded-xl border border-white/10 bg-white/[0.03] p-5" aria-label="Vote">
        <h3 className="text-sm font-bold text-white/70 mb-4">{title}</h3>
        <div className="flex items-center gap-4">
          <button
            onClick={() => handleVote("up")}
            className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold transition ${
              upVoted
                ? "bg-emerald-500/15 text-emerald-300 border border-emerald-400/20"
                : "bg-white/5 text-white/50 border border-white/10 hover:bg-white/10 hover:text-emerald-300"
            }`}
          >
            <ThumbsUp className="h-4 w-4" />
            Helpful ({upVotes})
          </button>
          <button
            onClick={() => handleVote("down")}
            className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold transition ${
              downVoted
                ? "bg-red-500/15 text-red-300 border border-red-400/20"
                : "bg-white/5 text-white/50 border border-white/10 hover:bg-white/10 hover:text-red-300"
            }`}
          >
            <ThumbsDown className="h-4 w-4" />
            Not helpful ({downVotes})
          </button>
        </div>
        {hasVoted && (
          <p className="mt-3 text-xs text-white/40">Thanks for your feedback!</p>
        )}
      </section>
    );
  }

  // Poll / ranking variant
  const sortedOptions = [...options].sort((a, b) => b.votes - a.votes);

  return (
    <section className="mt-8 rounded-xl border border-white/10 bg-white/[0.03] p-5" aria-label="Poll">
      <div className="flex items-center gap-2 mb-4">
        {variant === "ranking" ? (
          <Trophy className="h-4 w-4 text-amber-300" />
        ) : (
          <Award className="h-4 w-4 text-violet-300" />
        )}
        <h3 className="text-sm font-bold text-white/70">{title}</h3>
        <span className="ml-auto text-[11px] text-white/30">{totalVotes} votes</span>
      </div>

      <div className="space-y-3">
        {sortedOptions.map((option, index) => {
          const percentage = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;
          const isLeading = index === 0 && option.votes > 0;

          return (
            <button
              key={option.id}
              onClick={() => handleVote(option.id)}
              className={`relative w-full text-left rounded-lg border transition overflow-hidden ${
                option.userVoted
                  ? "border-violet-400/30 bg-violet-500/10"
                  : "border-white/10 bg-white/[0.02] hover:border-white/20"
              }`}
            >
              {/* Progress bar background */}
              {hasVoted && totalVotes > 0 && (
                <div
                  className="absolute inset-y-0 left-0 bg-violet-500/8 transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              )}

              <div className="relative flex items-center gap-3 px-4 py-3">
                {isLeading && variant === "ranking" && (
                  <Trophy className="h-4 w-4 text-amber-400 shrink-0" />
                )}
                {isLeading && variant !== "ranking" && (
                  <ChevronUp className="h-4 w-4 text-emerald-400 shrink-0" />
                )}

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-bold text-white truncate">
                      {option.label}
                    </span>
                    {hasVoted && totalVotes > 0 && (
                      <span className="text-xs font-bold text-white/50 shrink-0">
                        {Math.round(percentage)}% ({option.votes})
                      </span>
                    )}
                  </div>
                  {option.description && (
                    <p className="text-[11px] text-white/40 mt-0.5">
                      {option.description}
                    </p>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
