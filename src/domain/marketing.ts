/**
 * Not part of the authenticated data domain — no Household/Person records
 * exist yet at this point. Everything else on the homepage (copy,
 * testimonials, pricing) is content, not domain state.
 */
export interface MarketingLead {
  id: string;
  email: string;
  capturedAt: string;
  /** Campaign/referral tracking */
  source?: string;
}
