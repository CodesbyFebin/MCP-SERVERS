export type MarketplaceListingStatus = "draft" | "review" | "published" | "suspended"

export interface MarketplaceListing {
  id: string
  entityId: string
  providerId: string
  listingType: "hosted" | "premium" | "template" | "plugin" | "enterprise"
  pricingModel: "free" | "one-time" | "subscription" | "usage-based" | "contact-sales"
  price: number | null
  currency: string | null
  trialAvailable: boolean
  regions: string[]
  sla: string | null
  supportLevel: string | null
  securityReviewId: string | null
  status: MarketplaceListingStatus
}

export function createMarketplaceListing(
  overrides: Partial<MarketplaceListing> = {}
): MarketplaceListing {
  return {
    id: crypto.randomUUID(),
    entityId: "",
    providerId: "",
    listingType: "hosted",
    pricingModel: "free",
    price: null,
    currency: null,
    trialAvailable: false,
    regions: [],
    sla: null,
    supportLevel: null,
    securityReviewId: null,
    status: "draft",
    ...overrides,
  }
}

declare const crypto: {
  randomUUID(): string
}
