# Marketplace Model

## Marketplace Listings

Marketplace listings are separate from editorial rankings.

### Listing Types

- `hosted` - Managed MCP servers
- `premium` - Commercial servers
- `template` - Server templates
- `plugin` - IDE plugins
- `enterprise` - Enterprise connectors

### Pricing Models

- `free`
- `one-time`
- `subscription`
- `usage-based`
- `contact-sales`

### Listing Fields

- id
- entityId
- providerId
- listingType
- pricingModel
- price
- currency
- trialAvailable
- regions
- sla
- supportLevel
- securityReviewId
- status

## Payments

Use Stripe for payments where relevant.

## Separation of Concerns

Editorial ranking and paid listings are clearly separated.
