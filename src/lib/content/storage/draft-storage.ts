import type { Draft, SectionDraft } from "../drafts/draft-manager"
import { createDraft, createSectionDraft } from "../drafts/draft-manager"

const DRAFTS_KEY = "content-drafts"

export function loadDrafts(): Draft[] {
  if (typeof window === "undefined") return []
  try {
    const stored = localStorage.getItem(DRAFTS_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

export function saveDrafts(drafts: Draft[]): void {
  if (typeof window === "undefined") return
  localStorage.setItem(DRAFTS_KEY, JSON.stringify(drafts))
}

export function addDraft(draft: Draft): Draft[] {
  const drafts = loadDrafts()
  drafts.push(draft)
  saveDrafts(drafts)
  return drafts
}

export function updateDraft(draftId: string, updates: Partial<Draft>): Draft[] {
  const drafts = loadDrafts()
  const index = drafts.findIndex((d) => d.id === draftId)
  if (index === -1) return drafts
  drafts[index] = { ...drafts[index], ...updates, updatedAt: new Date().toISOString() }
  saveDrafts(drafts)
  return drafts
}

export function deleteDraft(draftId: string): Draft[] {
  const drafts = loadDrafts().filter((d) => d.id !== draftId)
  saveDrafts(drafts)
  return drafts
}

export function getDraftById(draftId: string): Draft | undefined {
  return loadDrafts().find((d) => d.id === draftId)
}
