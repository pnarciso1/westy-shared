export interface Provider {
  id: string;
  name: string;
  type: string;
  inNetwork: boolean;
  practitioners: Practitioner[];
}

export interface Practitioner {
  name: string;
  role: string;
  specialty?: string;
  phone?: string;
}

export interface CareTeamMember {
  /** Whose care team this is */
  personId: string;
  name: string;
  role: string;
  organization?: string;
  phone?: string;
}

/**
 * One Episode entity. Dashboard/calendar are views derived from it, not
 * separate records — this is what fixes the title-string-matching bug from
 * the original prototype (Episode/PrimaryEpisode/CalendarEpisode as three
 * separate entities).
 */
export interface Episode {
  id: string;
  personId: string;
  title: string;
  status: "active" | "closed";
  startedOn: string;
  closedOn?: string;
  totalCost?: number;
  providerIds: string[];
  /** Real foreign keys — no title-string matching */
  documentIds: string[];
  taskIds: string[];
  /** e.g. ER visit + follow-up + cast removal, all under one episode */
  appointmentIds: string[];
  formation: "user_initiated" | "system_suggested";
}

export interface Appointment {
  id: string;
  personId: string;
  providerId: string;
  /** Set once grouped into an episode; may start ungrouped */
  episodeId?: string;
  scheduledFor: string; // ISO datetime
  status: "scheduled" | "completed" | "cancelled" | "no_show";
  reason?: string;
  bookedVia: "manual" | "agent" | "connector_sync";
  /** Set when bookedVia === "agent" — see connector.ts AppointmentRequest */
  appointmentRequestId?: string;
}

/**
 * Forward-looking: the same detect-propose-confirm pattern as Anomaly could
 * propose episode groupings from a pattern of appointments/documents for one
 * person within a time window. A candidate, not a commitment, until accepted.
 */
export interface EpisodeSuggestion {
  id: string;
  personId: string;
  suggestedTitle: string;
  appointmentIds: string[];
  documentIds: string[];
  status: "pending" | "accepted" | "dismissed";
}

/** Derived view — computed from Episode, not stored. */
export interface DashboardEpisodeHighlightView {
  episode: Episode;
  documentsLinkedCount: number;
  tasksLinkedCount: number;
}

/** Derived view — computed from Episode, not stored. */
export interface CalendarEpisodeSpanView {
  episodeId: string;
  startDate: string;
  endDate: string;
}

export interface Document {
  id: string;
  personId: string;
  episodeId?: string;
  type: "insurance_summary" | "eob" | "provider_bill" | "other";
  status: "uploaded" | "processing" | "extracted" | "failed";
  /** Structured OCR output once status === "extracted" */
  extracted?: Record<string, unknown>;
  /** AI-authored prose over the extraction — set isAiGenerated on render */
  explanation?: string;
}

export interface Task {
  id: string;
  personId: string;
  title: string;
  due?: string;
  status: "open" | "complete";
  source: "document" | "bill" | "manual" | "system";
  episodeId?: string;
}
