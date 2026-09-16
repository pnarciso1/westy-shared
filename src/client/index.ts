import type {
  User,
  Household,
  Person,
  OnboardingSession,
  OnboardingStep,
  Connector,
  Document as WestyDocument,
  Episode,
  EpisodeSuggestion,
  Appointment,
  AppointmentRequest,
  Bill,
  Charge,
  Anomaly,
  CareTeamMember,
  ChatThread,
  ChatMessage,
  PersonalDataExport,
  Task,
} from "../domain";

/**
 * The contract both `MockWestyClient` (demo repo) and `RealWestyClient`
 * (production repo, backed by SmartEOB) implement. Screens/components in
 * `westy-shared`'s UI package, and in each consuming app, are written
 * against this interface only — never against a concrete implementation.
 *
 * Every method returns a Promise, even where a mock could answer
 * synchronously — this forces loading states to be designed and handled
 * from day one in the demo, not discovered for the first time when a real
 * payer connector takes three seconds to respond.
 */
export interface WestyClient {
  // ── Identity & household ────────────────────────────────────────────
  getCurrentUser(): Promise<User>;
  getHousehold(householdId: string): Promise<Household>;
  getPerson(personId: string): Promise<Person>;
  listHouseholdMembers(householdId: string): Promise<Person[]>;

  // ── Onboarding ───────────────────────────────────────────────────────
  startOnboarding(input: StartOnboardingInput): Promise<OnboardingSession>;
  getOnboardingSession(sessionId: string): Promise<OnboardingSession>;
  addFamilyMember(sessionId: string, input: AddFamilyMemberInput): Promise<OnboardingSession>;
  /** Marks the connect_or_upload step complete, skipped, or still pending based on what was attempted */
  advanceOnboardingStep(sessionId: string, step: OnboardingStep): Promise<OnboardingSession>;
  completeOnboarding(sessionId: string): Promise<OnboardingSession>;

  // ── Dashboard ────────────────────────────────────────────────────────
  getDashboard(personId: string): Promise<DashboardSummary>;

  // ── Connector module ─────────────────────────────────────────────────
  listConnectors(personId: string): Promise<Connector[]>;
  initiateConnector(input: InitiateConnectorInput): Promise<Connector>;
  getConnector(connectorId: string): Promise<Connector>;
  retryConnector(connectorId: string): Promise<Connector>;
  disconnectConnector(connectorId: string): Promise<Connector>;

  // ── Documents ────────────────────────────────────────────────────────
  uploadDocument(input: UploadDocumentInput): Promise<WestyDocument>;
  getDocument(documentId: string): Promise<WestyDocument>;
  listDocuments(personId: string, episodeId?: string): Promise<WestyDocument[]>;

  // ── Episodes ─────────────────────────────────────────────────────────
  listEpisodes(personId: string): Promise<Episode[]>;
  getEpisode(episodeId: string): Promise<Episode>;
  listEpisodeSuggestions(personId: string): Promise<EpisodeSuggestion[]>;
  acceptEpisodeSuggestion(suggestionId: string): Promise<Episode>;
  dismissEpisodeSuggestion(suggestionId: string): Promise<void>;

  // ── Appointments & agentic scheduling ────────────────────────────────
  listAppointments(personId: string): Promise<Appointment[]>;
  requestAppointment(input: RequestAppointmentInput): Promise<AppointmentRequest>;
  getAppointmentRequest(requestId: string): Promise<AppointmentRequest>;
  /** Confirms one of AppointmentRequest.proposedSlots — this is the only path that creates a bookedVia: "agent" Appointment */
  confirmAppointmentSlot(requestId: string, slot: ProposedSlot): Promise<Appointment>;

  // ── Billing ──────────────────────────────────────────────────────────
  listBills(personId: string): Promise<Bill[]>;
  getBill(billId: string): Promise<Bill>;
  getCharges(chargeIds: string[]): Promise<Charge[]>;
  getAnomaly(anomalyId: string): Promise<Anomaly>;
  payBill(billId: string): Promise<Bill>;
  disputeBill(billId: string, reason?: string): Promise<Bill>;

  // ── Care team & tasks ────────────────────────────────────────────────
  listCareTeam(personId: string): Promise<CareTeamMember[]>;
  addCareTeamMember(input: AddCareTeamMemberInput): Promise<CareTeamMember>;
  updateCareTeamMember(memberId: string, input: Partial<AddCareTeamMemberInput>): Promise<CareTeamMember>;
  removeCareTeamMember(memberId: string): Promise<void>;
  listTasks(personId: string): Promise<Task[]>;
  completeTask(taskId: string): Promise<Task>;

  // ── Ask Westy ────────────────────────────────────────────────────────
  getChatThread(personId: string): Promise<ChatThread>;
  /** Returns the assistant's reply message — the caller appends it to the thread */
  sendChatMessage(personId: string, text: string): Promise<ChatMessage>;

  // ── Data portability ─────────────────────────────────────────────────
  requestDataExport(personId: string): Promise<PersonalDataExport>;
  getDataExport(exportId: string): Promise<PersonalDataExport>;
}

// ── Input shapes ─────────────────────────────────────────────────────────

export interface StartOnboardingInput {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  authProvider: "google" | "password";
  email: string;
}

export interface AddFamilyMemberInput {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  relationshipToCoordinator?: Person["relationshipToCoordinator"];
}

export interface AddCareTeamMemberInput {
  personId: string;
  name: string;
  role: string;
  organization?: string;
  phone?: string;
  email?: string;
  website?: string;
  address?: string;
}

export interface InitiateConnectorInput {
  ownerPersonId: string;
  type: Connector["type"];
  vendor: string;
}

export interface UploadDocumentInput {
  personId: string;
  type: WestyDocument["type"];
  /** The demo simulates extraction on this; production sends it to real OCR */
  file: File | Blob;
}

export interface RequestAppointmentInput {
  personId: string;
  requestedByUserId: string;
  providerId?: string;
  reason: string;
  constraints: AppointmentRequest["constraints"];
}

export type ProposedSlot = NonNullable<AppointmentRequest["proposedSlots"]>[number];

/**
 * Aggregated dashboard view — this is the one place the client composes
 * data across entities, since a dashboard is inherently a cross-cutting
 * read. Everything here is still just a projection of the domain types;
 * nothing new is invented.
 */
export interface DashboardSummary {
  household: Household;
  members: Person[];
  flaggedBills: Bill[];
  openTasks: Task[];
  highlightedEpisodes: Episode[];
  pendingConnectors: Connector[];
  pendingEpisodeSuggestions: EpisodeSuggestion[];
}
