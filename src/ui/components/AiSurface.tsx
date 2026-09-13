import type { ReactNode } from "react";

/**
 * The AI-surface treatment, per the design system's own rule: "accent-100
 * fill + accent-300 border + sparkle + 'Westy' label = AI-generated,
 * always." Use this ANYWHERE `isAiGenerated` is true in the domain model —
 * ChatMessage replies, Document.explanation, Anomaly.explanation — not just
 * in the chat overlay. Never build this pattern inline per-screen.
 */
export function AiSurface({ children }: { children?: ReactNode }) {
  return (
    <div className="wz-ai">
      <div className="wz-ai-label">
        <SparkleIcon />
        <span>Westy</span>
      </div>
      <p className="wz-ai-body">{children}</p>
    </div>
  );
}

/**
 * The deliberate visual opposite of AiSurface — a plain, untinted surface
 * for a person's own data (a document, a manually-entered record). Pass a
 * label describing the source, e.g. "From your document" or "You entered
 * this" — mirrors FhirResourceRef.source / Document provenance.
 */
export function ProvenanceSurface({
  label,
  children,
}: {
  label: string;
  children?: ReactNode;
}) {
  return (
    <div className="wz-provenance">
      <div className="wz-provenance-label">
        <DocumentIcon />
        <span>{label}</span>
      </div>
      <p className="wz-ai-body">{children}</p>
    </div>
  );
}

function SparkleIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--color-accent-700)"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--color-text)"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
  );
}
