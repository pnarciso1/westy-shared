export interface User {
  id: string;
  authProvider: "google" | "password";
  email: string;
  createdAt: string;
  /** Household coordinator by default; extend to shared roles post-v1 */
  role: "coordinator" | "member";
  /** Link to their own Person record */
  personId: string;
}

export interface Household {
  id: string;
  name: string; // e.g. "Carter Household"
  /** User.id of the coordinator */
  primaryUserId: string;
  /** Person.id[] */
  memberIds: string[];
  createdAt: string;
}

export interface Person {
  id: string;
  householdId: string;
  firstName: string;
  /** Independent of household/other members' last names */
  lastName: string;
  dateOfBirth: string; // ISO date
  relationshipToCoordinator?:
    | "self"
    | "spouse"
    | "child"
    | "parent"
    | "dependent"
    | "other";
  /**
   * Governs what a viewer can see of this person's data — enforced at the
   * query layer, not per-screen.
   */
  financialAccess: "self" | "coordinator" | "shared";
  /** Pointer into the FHIR store — see clinical.ts */
  fhirPatientId: string;
}
