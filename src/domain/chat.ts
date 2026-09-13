export interface ChatThread {
  /** Whose context the thread is grounded in */
  personId: string;
  id: string;
  messages: ChatMessage[];
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
  /**
   * Drives the AI-surface visual treatment; always true for role: "assistant".
   * Also used on other AI-authored content (e.g. Document.explanation,
   * Anomaly.explanation) so the treatment applies consistently everywhere,
   * not just in this chat overlay.
   */
  isAiGenerated: boolean;
  /** Provenance, once this moves beyond keyword matching */
  groundedInDocumentIds?: string[];
}
