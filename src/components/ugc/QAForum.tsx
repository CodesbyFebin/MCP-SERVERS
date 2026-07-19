"use client";

import { useState, useCallback } from "react";
import {
  MessageCircleQuestion,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Search,
  Plus,
  Send,
  ThumbsUp
} from "lucide-react";

export interface QAQuestion {
  id: string;
  author: string;
  question: string;
  timestamp: string;
  votes: number;
  answers: QAAnswer[];
  isResolved: boolean;
  tags?: string[];
}

export interface QAAnswer {
  id: string;
  author: string;
  answer: string;
  timestamp: string;
  votes: number;
  isAccepted: boolean;
}

interface QAForumProps {
  postId: string;
  initialQuestions?: QAQuestion[];
  allowNewQuestions?: boolean;
}

export default function QAForum({
  postId,
  initialQuestions = [],
  allowNewQuestions = true
}: QAForumProps) {
  const [questions, setQuestions] = useState<QAQuestion[]>(initialQuestions);
  const [showNewQuestion, setShowNewQuestion] = useState(false);
  const [newQuestionTitle, setNewQuestionTitle] = useState("");
  const [newQuestionBody, setNewQuestionBody] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredQuestions = searchQuery
    ? questions.filter(
        (q) =>
          q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : questions;

  const handleAskQuestion = useCallback(() => {
    if (newQuestionTitle.trim() && newQuestionBody.trim()) {
      const newQ: QAQuestion = {
        id: `q-${Date.now()}`,
        author: "You",
        question: `${newQuestionTitle.trim()}\n\n${newQuestionBody.trim()}`,
        timestamp: "Just now",
        votes: 0,
        answers: [],
        isResolved: false
      };
      setQuestions((prev) => [newQ, ...prev]);
      setNewQuestionTitle("");
      setNewQuestionBody("");
      setShowNewQuestion(false);
    }
  }, [newQuestionTitle, newQuestionBody]);

  const handleVoteQuestion = useCallback((questionId: string) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId ? { ...q, votes: q.votes + 1 } : q
      )
    );
  }, []);

  const handleAcceptAnswer = useCallback(
    (questionId: string, answerId: string) => {
      setQuestions((prev) =>
        prev.map((q) =>
          q.id === questionId
            ? {
                ...q,
                isResolved: true,
                answers: q.answers.map((a) =>
                  a.id === answerId ? { ...a, isAccepted: true } : { ...a, isAccepted: false }
                )
              }
            : q
        )
      );
    },
    []
  );

  const handleVoteAnswer = useCallback(
    (questionId: string, answerId: string) => {
      setQuestions((prev) =>
        prev.map((q) =>
          q.id === questionId
            ? {
                ...q,
                answers: q.answers.map((a) =>
                  a.id === answerId ? { ...a, votes: a.votes + 1 } : a
                )
              }
            : q
        )
      );
    },
    []
  );

  const handleAddAnswer = useCallback(
    (questionId: string, answerText: string) => {
      const newAnswer: QAAnswer = {
        id: `a-${Date.now()}`,
        author: "You",
        answer: answerText.trim(),
        timestamp: "Just now",
        votes: 0,
        isAccepted: false
      };
      setQuestions((prev) =>
        prev.map((q) =>
          q.id === questionId
            ? { ...q, answers: [...q.answers, newAnswer] }
            : q
        )
      );
    },
    []
  );

  return (
    <section className="mt-12 border-t border-white/10 pt-8" aria-label="Q&A Forum">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <MessageCircleQuestion className="h-5 w-5 text-cyan-300" />
          <h2 className="text-lg font-black text-white">
            Community Q&A ({questions.length} questions)
          </h2>
        </div>

        {allowNewQuestions && (
          <button
            onClick={() => setShowNewQuestion(!showNewQuestion)}
            className="flex items-center gap-1.5 rounded-lg bg-violet-600 px-3 py-2 text-xs font-bold text-white hover:bg-violet-500 transition"
          >
            <Plus className="h-3.5 w-3.5" />
            Ask Question
          </button>
        )}
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search questions..."
          className="w-full rounded-lg border border-white/10 bg-white/5 pl-10 pr-4 py-2.5 text-sm text-white placeholder-white/30 focus:border-cyan-400/50 focus:outline-none focus:ring-1 focus:ring-cyan-400/20"
        />
      </div>

      {/* New Question Form */}
      {showNewQuestion && (
        <div className="mb-6 rounded-xl border border-violet-400/20 bg-violet-500/5 p-5">
          <h3 className="text-sm font-bold text-white mb-3">Ask a Question</h3>
          <input
            type="text"
            value={newQuestionTitle}
            onChange={(e) => setNewQuestionTitle(e.target.value)}
            placeholder="Question title..."
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/30 mb-3 focus:border-violet-400/50 focus:outline-none"
          />
          <textarea
            value={newQuestionBody}
            onChange={(e) => setNewQuestionBody(e.target.value)}
            placeholder="Provide details..."
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/30 resize-none focus:border-violet-400/50 focus:outline-none"
            rows={4}
          />
          <div className="mt-3 flex justify-end gap-2">
            <button
              onClick={() => setShowNewQuestion(false)}
              className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-white/60 hover:bg-white/10 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleAskQuestion}
              disabled={!newQuestionTitle.trim() || !newQuestionBody.trim()}
              className="rounded-lg bg-violet-600 px-4 py-2 text-xs font-bold text-white disabled:opacity-40 hover:bg-violet-500 transition"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map((q) => (
            <QuestionCard
              key={q.id}
              question={q}
              isExpanded={expandedId === q.id}
              onToggle={() =>
                setExpandedId(expandedId === q.id ? null : q.id)
              }
              onVote={handleVoteQuestion}
              onAcceptAnswer={handleAcceptAnswer}
              onVoteAnswer={handleVoteAnswer}
              onAddAnswer={handleAddAnswer}
            />
          ))
        ) : (
          <div className="text-center py-10">
            <MessageCircleQuestion className="h-10 w-10 mx-auto text-white/20 mb-3" />
            <p className="text-sm text-white/40">
              {searchQuery
                ? "No questions match your search."
                : "No questions yet. Ask the first one!"}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function QuestionCard({
  question,
  isExpanded,
  onToggle,
  onVote,
  onAcceptAnswer,
  onVoteAnswer,
  onAddAnswer
}: {
  question: QAQuestion;
  isExpanded: boolean;
  onToggle: () => void;
  onVote: (id: string) => void;
  onAcceptAnswer: (qId: string, aId: string) => void;
  onVoteAnswer: (qId: string, aId: string) => void;
  onAddAnswer: (qId: string, answer: string) => void;
}) {
  const [answerText, setAnswerText] = useState("");

  const handleSubmitAnswer = () => {
    if (answerText.trim()) {
      onAddAnswer(question.id, answerText.trim());
      setAnswerText("");
    }
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full text-left px-5 py-4 flex items-start gap-3"
      >
        <div className="flex flex-col items-center gap-1 shrink-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onVote(question.id);
            }}
            className="p-1 text-white/40 hover:text-cyan-300 transition"
          >
            <ChevronUp className="h-5 w-5" />
          </button>
          <span
            className={`text-sm font-bold ${
              question.votes > 0 ? "text-cyan-300" : "text-white/40"
            }`}
          >
            {question.votes}
          </span>
          {question.isResolved && (
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold text-white">{question.question.split("\n")[0]}</h3>
          <div className="mt-2 flex items-center gap-3 text-[11px] text-white/40">
            <span>by {question.author}</span>
            <span>{question.timestamp}</span>
            <span>{question.answers.length} answer{question.answers.length !== 1 ? "s" : ""}</span>
          </div>
          {question.tags && question.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {question.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded bg-white/5 px-2 py-0.5 text-[10px] font-bold text-violet-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {isExpanded ? (
          <ChevronUp className="h-4 w-4 text-white/30 shrink-0" />
        ) : (
          <ChevronDown className="h-4 w-4 text-white/30 shrink-0" />
        )}
      </button>

      {isExpanded && (
        <div className="border-t border-white/5 px-5 py-4">
          {/* Full question */}
          <p className="text-sm text-white/60 whitespace-pre-wrap mb-4">
            {question.question}
          </p>

          {/* Answers */}
          {question.answers.length > 0 && (
            <div className="space-y-4 mb-6">
              <h4 className="text-xs font-bold text-white/60">
                {question.answers.length} Answer
                {question.answers.length !== 1 ? "s" : ""}
              </h4>
              {question.answers.map((answer) => (
                <div
                  key={answer.id}
                  className={`rounded-lg border p-4 ${
                    answer.isAccepted
                      ? "border-emerald-400/20 bg-emerald-500/5"
                      : "border-white/10 bg-white/[0.02]"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex flex-col items-center gap-1 shrink-0">
                      <button
                        onClick={() => onVoteAnswer(question.id, answer.id)}
                        className="p-1 text-white/40 hover:text-cyan-300 transition"
                      >
                        <ThumbsUp className="h-4 w-4" />
                      </button>
                      <span className="text-xs font-bold text-white/40">
                        {answer.votes}
                      </span>
                      {answer.isAccepted && (
                        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-white/60 whitespace-pre-wrap">
                        {answer.answer}
                      </p>
                      <div className="mt-2 text-[11px] text-white/40">
                        by {answer.author} · {answer.timestamp}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Answer input */}
          <div className="flex gap-2">
            <textarea
              value={answerText}
              onChange={(e) => setAnswerText(e.target.value)}
              placeholder="Write your answer..."
              className="flex-1 resize-none rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/30 focus:border-cyan-400/50 focus:outline-none"
              rows={3}
            />
            <button
              onClick={handleSubmitAnswer}
              disabled={!answerText.trim()}
              className="self-end rounded-lg bg-cyan-600 px-3 py-2 text-xs font-bold text-white disabled:opacity-40 hover:bg-cyan-500 transition"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
