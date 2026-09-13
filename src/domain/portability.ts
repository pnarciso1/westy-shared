import type { HsaTransaction } from "./financial";
import type { Document, Appointment } from "./care";
import type { ChatMessage } from "./chat";

/**
 * Per-person, not per-household — a 5-member family produces 5 independent
 * export bundles. Leaving the platform, or a household split, is then just:
 * generate one PersonalDataExport per Person leaving — no household-level
 * untangling required, because attribution was correct at write time.
 */
export interface PersonalDataExport {
  id: string;
  personId: string;
  requestedAt: string;
  status: "pending" | "ready" | "expired";
  contents: {
    /** Full FHIR Bundle for this person's resources only */
    fhirBundleUrl: string;
    /** Filtered to transactions attributed to this person */
    financialLedger: HsaTransaction[];
    /** Documents where personId matches */
    documents: Document[];
    /** Past and scheduled, this person only */
    appointments: Appointment[];
    /** Threads where personId matches */
    chatHistory: ChatMessage[];
  };
  downloadUrl?: string;
  expiresAt?: string;
}
