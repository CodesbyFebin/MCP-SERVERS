export interface EditorialReview {
  id: string
  entityId: string
  route: string
  contentType: string
  contentHash: string
  status: "pending" | "approved" | "rejected"
  reviewerId: string | null
  reviewedAt: string | null
  notes: string
  createdAt: string
}

export function createEditorialReview(overrides: Partial<EditorialReview> = {}): EditorialReview {
  return {
    id: crypto.randomUUID(),
    entityId: "",
    route: "",
    contentType: "",
    contentHash: "",
    status: "pending",
    reviewerId: null,
    reviewedAt: null,
    notes: "",
    createdAt: new Date().toISOString(),
    ...overrides,
  }
}

export function approveReview(review: EditorialReview, reviewerId: string, notes = ""): EditorialReview {
  return {
    ...review,
    status: "approved",
    reviewerId,
    reviewedAt: new Date().toISOString(),
    notes: notes || review.notes,
  }
}

export function rejectReview(review: EditorialReview, reviewerId: string, notes = ""): EditorialReview {
  return {
    ...review,
    status: "rejected",
    reviewerId,
    reviewedAt: new Date().toISOString(),
    notes: notes || review.notes,
  }
}

declare const crypto: {
  randomUUID(): string
}
