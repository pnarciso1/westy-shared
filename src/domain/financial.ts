export interface Charge {
  id: string;
  personId: string;
  providerId: string;
  serviceDate: string;
  cptCode?: string;
  billedAmount: number;
  allowedAmount?: number;
  carcCodes?: string[];
  rarcCodes?: string[];
}

export interface PlanContext {
  id: string;
  householdId: string;
  hiosPlanId: string;
  deductibleTotal: number;
  deductibleUsed: number;
  oopTotal: number;
  oopUsed: number;
}

export interface Accumulator {
  id: string;
  planContextId: string;
  personId: string;
  category: "deductible" | "out_of_pocket";
  amount: number;
  asOf: string;
}

/**
 * Generated deterministically from Charge/PlanContext/Accumulator — this is
 * the general mechanism that replaces any per-bill hardcoded context lookup.
 */
export interface Anomaly {
  id: string;
  chargeIds: string[];
  planContextId: string;
  accumulatorIds: string[];
  type:
    | "balance_bill"
    | "duplicate_charge"
    | "out_of_network_surprise"
    | "coding_mismatch"
    | "other";
  severity: "info" | "review" | "action_needed";
  /** LLM-authored prose over structured findings — never the detector itself */
  explanation: string;
  suggestedAction?:
    | "draft_appeal_email"
    | "call_provider"
    | "pay_now"
    | "dispute_with_payer";
}

export interface Bill {
  id: string;
  personId: string;
  chargeIds: string[];
  /** Present only if Anomaly detection flagged something */
  anomalyId?: string;
  status: "pending" | "flagged" | "paid" | "disputed";
  claimId?: string;
}

export interface Claim {
  id: string;
  chargeIds: string[];
  patientResponsibility: number;
  payerPaid: number;
  status: "submitted" | "adjudicated" | "denied" | "appealed";
}

export interface HsaAccount {
  id: string;
  householdId: string;
  balance: number;
  // Joint account — ownership vs. attribution are separate, see HsaTransaction
}

export interface HsaTransaction {
  id: string;
  hsaAccountId: string;
  /** Attributed to who the spend was for, not the account owner */
  personId: string;
  date: string;
  amount: number;
  category: string;
  billId?: string;
}
