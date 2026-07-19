"use client";

import { useState, useCallback } from "react";
import {
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  CornerDownRight,
  Send,
  ChevronDown,
  ChevronUp,
  Flag
} from "lucide-react";

export interface Comment {
  id: string;
  author: string;
  avatar?: string;
  content: string;
  timestamp: string;
  votes: number;
  userVote?: "up" | "down";
  replies: Comment[];
  isEdited?: boolean;
  flagged?: boolean;
}

interface CommentSystemProps {
  postId: string;
  initialComments?: Comment[];
  maxDepth?: number;
}

function CommentItem({
  comment,
  depth,
  maxDepth,
  onReply,
  onVote,
  onFlag
}: {
  comment: Comment;
  depth: number;
  maxDepth: number;
  onReply: (parentId: string, content: string) => void;
  onVote: (commentId: string, direction: "up" | "down") => void;
  onFlag: (commentId: string) => void;
}) {
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const isMaxDepth = depth >= maxDepth;

  const handleSubmitReply = () => {
    if (replyContent.trim()) {
      onReply(comment.id, replyContent.trim());
      setReplyContent("");
      setIsReplying(false);
    }
  };

  const avatarLetter = comment.author.charAt(0).toUpperCase();

  return (
    <div className={`${depth > 0 ? "ml-6 sm:ml-10 border-l-2 border-white/5 pl-4 sm:pl-6" : ""}`}>
      <div className="py-4">
        <div className="flex items-start gap-3">
          <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-cyan-400/30 to-violet-500/30 text-xs font-black text-white">
            {avatarLetter}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-bold text-white">{comment.author}</span>
              <span className="text-[11px] text-white/40">{comment.timestamp}</span>
              {comment.isEdited && (
                <span className="text-[10px] text-white/30 italic">(edited)</span>
              )}
            </div>

            {!isCollapsed && (
              <>
                <p className="mt-2 text-sm leading-relaxed text-white/70 whitespace-pre-wrap">
                  {comment.content}
                </p>

                <div className="mt-3 flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onVote(comment.id, "up")}
                      className={`p-1 rounded transition ${
                        comment.userVote === "up"
                          ? "text-cyan-400 bg-cyan-500/10"
                          : "text-white/40 hover:text-cyan-300"
                      }`}
                      aria-label="Upvote"
                    >
                      <ThumbsUp className="h-3.5 w-3.5" />
                    </button>
                    <span
                      className={`text-xs font-bold min-w-[1.5rem] text-center ${
                        comment.votes > 0
                          ? "text-cyan-300"
                          : comment.votes < 0
                          ? "text-red-300"
                          : "text-white/40"
                      }`}
                    >
                      {comment.votes}
                    </span>
                    <button
                      onClick={() => onVote(comment.id, "down")}
                      className={`p-1 rounded transition ${
                        comment.userVote === "down"
                          ? "text-red-400 bg-red-500/10"
                          : "text-white/40 hover:text-red-300"
                      }`}
                      aria-label="Downvote"
                    >
                      <ThumbsDown className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {!isMaxDepth && (
                    <button
                      onClick={() => setIsReplying(!isReplying)}
                      className="flex items-center gap-1 text-xs text-white/40 hover:text-violet-300 transition"
                    >
                      <CornerDownRight className="h-3 w-3" />
                      Reply
                    </button>
                  )}

                  <button
                    onClick={() => onFlag(comment.id)}
                    className="flex items-center gap-1 text-xs text-white/30 hover:text-amber-300 transition ml-auto"
                    aria-label="Flag comment"
                  >
                    <Flag className="h-3 w-3" />
                  </button>
                </div>

                {isReplying && (
                  <div className="mt-3 flex gap-2">
                    <textarea
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      placeholder="Write a reply..."
                      className="flex-1 resize-none rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/30 focus:border-violet-400/50 focus:outline-none focus:ring-1 focus:ring-violet-400/20"
                      rows={2}
                      autoFocus
                    />
                    <button
                      onClick={handleSubmitReply}
                      disabled={!replyContent.trim()}
                      className="self-end rounded-lg bg-violet-600 px-3 py-2 text-xs font-bold text-white disabled:opacity-40 hover:bg-violet-500 transition"
                    >
                      <Send className="h-3.5 w-3.5" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          {comment.replies.length > 0 && (
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1 text-white/30 hover:text-white/60 transition shrink-0"
              aria-label={isCollapsed ? "Expand replies" : "Collapse replies"}
            >
              {isCollapsed ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronUp className="h-4 w-4" />
              )}
            </button>
          )}
        </div>

        {!isCollapsed && comment.replies.length > 0 && (
          <div className="mt-2">
            {comment.replies.map((reply) => (
              <CommentItem
                key={reply.id}
                comment={reply}
                depth={depth + 1}
                maxDepth={maxDepth}
                onReply={onReply}
                onVote={onVote}
                onFlag={onFlag}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function CommentSystem({
  postId,
  initialComments = [],
  maxDepth = 3
}: CommentSystemProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "popular" | "oldest">("newest");

  const addComment = useCallback(
    (parentId: string | null, content: string) => {
      const newCommentObj: Comment = {
        id: `comment-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
        author: "You",
        content,
        timestamp: "Just now",
        votes: 0,
        replies: []
      };

      if (!parentId) {
        setComments((prev) => [newCommentObj, ...prev]);
      } else {
        const addReply = (cs: Comment[]): Comment[] =>
          cs.map((c) =>
            c.id === parentId
              ? { ...c, replies: [...c.replies, newCommentObj] }
              : { ...c, replies: addReply(c.replies) }
          );
        setComments((prev) => addReply(prev));
      }
    },
    []
  );

  const handleVote = useCallback((commentId: string, direction: "up" | "down") => {
    const updateVotes = (cs: Comment[]): Comment[] =>
      cs.map((c) => {
        if (c.id === commentId) {
          const currentVote = c.userVote;
          let voteDelta = 0;
          let newVote: "up" | "down" | undefined = direction;

          if (currentVote === direction) {
            voteDelta = direction === "up" ? -1 : 1;
            newVote = undefined;
          } else {
            voteDelta = direction === "up" ? 1 : -1;
            if (currentVote) voteDelta += direction === "up" ? 1 : -1;
          }

          return { ...c, votes: c.votes + voteDelta, userVote: newVote };
        }
        return { ...c, replies: updateVotes(c.replies) };
      });
    setComments((prev) => updateVotes(prev));
  }, []);

  const handleFlag = useCallback((commentId: string) => {
    const flagComment = (cs: Comment[]): Comment[] =>
      cs.map((c) =>
        c.id === commentId
          ? { ...c, flagged: true }
          : { ...c, replies: flagComment(c.replies) }
      );
    setComments((prev) => flagComment(prev));
  }, []);

  const handleSubmit = () => {
    if (newComment.trim()) {
      addComment(null, newComment.trim());
      setNewComment("");
    }
  };

  const sortedComments = [...comments].sort((a, b) => {
    if (sortBy === "popular") return b.votes - a.votes;
    if (sortBy === "oldest") return 0; // reverse of default
    return 0; // newest first (default array order)
  });
  if (sortBy === "oldest") sortedComments.reverse();

  return (
    <section className="mt-12 border-t border-white/10 pt-8" aria-label="Comments">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-violet-300" />
          <h2 className="text-lg font-black text-white">
            Discussion ({comments.length})
          </h2>
        </div>

        <div className="flex items-center gap-1">
          {(["newest", "popular", "oldest"] as const).map((option) => (
            <button
              key={option}
              onClick={() => setSortBy(option)}
              className={`rounded-md px-3 py-1.5 text-xs font-bold capitalize transition ${
                sortBy === option
                  ? "bg-violet-600 text-white"
                  : "bg-white/5 text-white/50 hover:bg-white/10"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3 mb-8">
        <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-cyan-400/30 to-violet-500/30 text-xs font-black text-white">
          Y
        </div>
        <div className="flex-1 flex gap-2">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Join the discussion..."
            className="flex-1 resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-violet-400/50 focus:outline-none focus:ring-1 focus:ring-violet-400/20"
            rows={3}
          />
          <button
            onClick={handleSubmit}
            disabled={!newComment.trim()}
            className="self-end rounded-xl bg-violet-600 px-4 py-3 text-sm font-bold text-white disabled:opacity-40 hover:bg-violet-500 transition"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="space-y-0">
        {sortedComments.length > 0 ? (
          sortedComments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              depth={0}
              maxDepth={maxDepth}
              onReply={addComment}
              onVote={handleVote}
              onFlag={handleFlag}
            />
          ))
        ) : (
          <div className="text-center py-10">
            <MessageSquare className="h-10 w-10 mx-auto text-white/20 mb-3" />
            <p className="text-sm text-white/40">
              No comments yet. Be the first to share your thoughts!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
