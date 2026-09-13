/**
 * Modeled as a state machine so a user can leave and resume, and so
 * completion never blocks on anything async (document extraction runs in
 * the background after the "connect_or_upload" step, not before it).
 */
export type OnboardingStep =
  | { step: "account"; status: "pending" | "complete" }
  | {
      step: "family_members";
      status: "pending" | "complete";
      addedPersonIds: string[];
    }
  | {
      step: "connect_or_upload";
      status: "pending" | "skipped" | "complete";
      /** Any Connectors initiated in this step */
      connectorIds: string[];
      /** Any Documents uploaded in this step */
      documentIds: string[];
    }
  | { step: "complete" };

export interface OnboardingSession {
  id: string;
  userId: string;
  householdId: string;
  steps: OnboardingStep[];
  startedAt: string;
  completedAt?: string;
}
