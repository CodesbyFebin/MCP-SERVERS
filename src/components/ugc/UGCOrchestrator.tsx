"use client";

import { useMemo } from "react";
import CommentSystem, { type Comment } from "./CommentSystem";
import VotingWidget, { type VoteOption } from "./VotingWidget";
import QAForum, { type QAQuestion } from "./QAForum";
import CodeSharing, { type CodeSnippet } from "./CodeSharing";
import UserSubmissionForm from "./UserSubmissionForm";

interface UGCOrchestratorProps {
  postId: string;
  postCategory: string;
  ugcElements: string[];
  comments?: Comment[];
  pollOptions?: VoteOption[];
  questions?: QAQuestion[];
  snippets?: CodeSnippet[];
  submissionType?: "story" | "tutorial" | "resource" | "review" | "config";
}

/**
 * Maps a blog post's `ugcElements` strings to rendered interactive UGC components.
 *
 * Mapping strategy:
 *   "Comment*" / "Voting" / "poll"          → VotingWidget (updown or poll)
 *   "Q&A" / "forum" / "Question*"           → QAForum
 *   "Code" / "Snippet" / "config"           → CodeSharing
 *   "Story" / "tutorial" / "resource"       → UserSubmissionForm
 *   Default fallback                         → CommentSystem
 */
export default function UGCOrchestrator({
  postId,
  postCategory,
  ugcElements,
  comments,
  pollOptions,
  questions,
  snippets,
  submissionType
}: UGCOrchestratorProps) {
  const rendered = useMemo(() => {
    const elements: React.ReactNode[] = [];

    for (const element of ugcElements) {
      const lower = element.toLowerCase();

      if (lower.includes("comment") || lower.includes("debate")) {
        elements.push(
          <CommentSystem key={`comments-${postId}`} postId={postId} initialComments={comments} />
        );
      } else if (
        lower.includes("vote") ||
        lower.includes("poll") ||
        lower.includes("ranking") ||
        lower.includes("comparison")
      ) {
        elements.push(
          <VotingWidget
            key={`vote-${postId}-${element}`}
            postId={postId}
            title={element}
            options={pollOptions ?? defaultPollOptions(element)}
            variant={lower.includes("rank") ? "ranking" : "poll"}
          />
        );
      } else if (
        lower.includes("q&a") ||
        lower.includes("forum") ||
        lower.includes("question")
      ) {
        elements.push(
          <QAForum key={`qa-${postId}`} postId={postId} initialQuestions={questions} />
        );
      } else if (
        lower.includes("code") ||
        lower.includes("snippet") ||
        lower.includes("config") ||
        lower.includes("script")
      ) {
        elements.push(
          <CodeSharing key={`code-${postId}`} postId={postId} initialSnippets={snippets} />
        );
      } else if (
        lower.includes("story") ||
        lower.includes("tutorial") ||
        lower.includes("resource") ||
        lower.includes("review") ||
        lower.includes("submission") ||
        lower.includes("experience")
      ) {
        elements.push(
          <UserSubmissionForm
            key={`submit-${postId}-${element}`}
            postId={postId}
            title={element}
            type={submissionType ?? "story"}
          />
        );
      } else if (lower.includes("benchmark") || lower.includes("result")) {
        elements.push(
          <UserSubmissionForm
            key={`benchmark-${postId}`}
            postId={postId}
            title="Share Your Benchmark Results"
            type="resource"
          />
        );
      } else if (lower.includes("template") || lower.includes("download")) {
        elements.push(
          <CodeSharing
            key={`template-${postId}`}
            postId={postId}
            initialSnippets={snippets}
          />
        );
      }
    }

    // If no specific UGC element matched, render a default comment section
    if (elements.length === 0) {
      elements.push(
        <CommentSystem key={`default-comments-${postId}`} postId={postId} />
      );
    }

    return elements;
  }, [postId, postCategory, ugcElements, comments, pollOptions, questions, snippets, submissionType]);

  return <>{rendered}</>;
}

function defaultPollOptions(elementText: string): VoteOption[] {
  const lower = elementText.toLowerCase();

  if (lower.includes("preference") || lower.includes("method")) {
    return [
      { id: "a", label: "Stdio (local)", votes: 42 },
      { id: "b", label: "SSE (remote)", votes: 78 },
      { id: "c", label: "HTTP direct", votes: 23 },
      { id: "d", label: "WebSocket", votes: 15 }
    ];
  }

  if (lower.includes("auth")) {
    return [
      { id: "a", label: "OAuth 2.0 + PKCE", votes: 56 },
      { id: "b", label: "API Key", votes: 34 },
      { id: "c", label: "JWT Bearer", votes: 28 },
      { id: "d", label: "mTLS", votes: 12 }
    ];
  }

  // Generic helpful poll
  return [
    { id: "up", label: "Yes, very helpful", votes: 0 },
    { id: "down", label: "Somewhat helpful", votes: 0 },
    { id: "neutral", label: "Not what I needed", votes: 0 }
  ];
}
