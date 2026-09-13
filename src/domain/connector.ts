export interface Connector {
  id: string;
  /** Household-level connections (e.g. a family plan) still resolve to a person for consent */
  ownerPersonId: string;
  /** e.g. MyChart, Oracle Health for "phr_ehr" */
  type: "payer" | "hsa_fsa_card" | "provider_portal" | "phr_ehr";
  vendor: string; // e.g. "Acme Health Plan", "Epic MyChart"
  status: "pending" | "connected" | "error" | "disconnected";
  /** Pointer into a secrets vault — never store tokens on this record */
  credentialRef: string;
  lastSyncedAt?: string;
  syncError?: string;
}

export interface SyncJob {
  id: string;
  connectorId: string;
  startedAt: string;
  finishedAt?: string;
  result: "success" | "partial" | "failed";
  recordsWritten?: { resourceType: string; count: number }[];
}

/**
 * Agentic scheduling — propose, then confirm. The agent searches and ranks
 * candidate slots through a "provider_portal" Connector; it never books
 * without the user explicitly accepting a proposed slot. Full autonomous
 * booking is a possible future per-connector trust setting, not a default.
 */
export interface AppointmentRequest {
  id: string;
  /** Who the appointment is for — not necessarily who's asking */
  personId: string;
  requestedByUserId: string;
  /** May be unset — e.g. "find a pediatrician" with no provider chosen yet */
  providerId?: string;
  reason: string;
  constraints: {
    earliestDate?: string;
    latestDate?: string;
    preferredTimeOfDay?: "morning" | "afternoon" | "evening";
    excludeDates?: string[];
  };
  status:
    | "submitted"
    | "searching"
    | "proposed"
    | "confirmed"
    | "failed"
    | "expired";
  /** Agent's ranked candidates, shown for user confirmation */
  proposedSlots?: { providerId: string; datetime: string }[];
  /** Set once a proposed slot is confirmed, creating an Appointment with bookedVia: "agent" */
  resultingAppointmentId?: string;
}
