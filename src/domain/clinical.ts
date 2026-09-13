/**
 * Clinical data is stored natively in FHIR shape. This file holds the
 * reference-and-relationship shape Westy's domain layer uses to point at
 * FHIR resources — it is NOT a FHIR resource type definition. Use your FHIR
 * library's generated types (e.g. @types/fhir) for the actual resources.
 */
export interface FhirResourceRef {
  resourceType:
    | "Patient"
    | "Condition"
    | "AllergyIntolerance"
    | "MedicationStatement"
    | "Immunization"
    | "FamilyMemberHistory"
    | "Observation"
    | "Encounter"
    | "DocumentReference"
    | "Coverage";
  id: string;
  /** Always resolvable back to a Person */
  subjectPersonId: string;
  /**
   * How this record entered the system — makes manual entry a first-class
   * write path alongside connector sync and document extraction.
   */
  source: "connector_sync" | "document_extraction" | "manual_entry";
  /** Connector.id, Document.id, or User.id depending on source */
  sourceRef?: string;
}

/** Derived, computed on read — never persisted as a separate table. */
export interface PersonClinicalSummaryView {
  personId: string;
  activeConditions: FhirResourceRef[];
  currentMedications: FhirResourceRef[];
  /** Observation subset */
  recentLabs: FhirResourceRef[];
  allergies: FhirResourceRef[];
}

/**
 * Sync boundary — one direction only, PlanContext -> Coverage.
 * Coverage (FHIR) is a synced projection, not authoritative; Westy's own
 * billing logic always reads PlanContext directly, never Coverage.
 */
export interface CoverageSync {
  planContextId: string;
  fhirCoverageId: string;
  lastSyncedAt: string; // ISO 8601
}
