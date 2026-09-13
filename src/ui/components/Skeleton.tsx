export interface SkeletonProps {
  height: number | string;
  width?: number | string;
  style?: React.CSSProperties;
}

/**
 * Loading placeholder — use for any async domain state before it resolves:
 * Document.status === "processing", Connector.status === "pending",
 * AppointmentRequest.status === "searching", etc. Never show a blank space
 * while waiting on these.
 */
export function Skeleton({ height, width = "100%", style }: SkeletonProps) {
  return <div className="wz-skel" style={{ height, width, ...style }} />;
}

export function SectionLabel({ children }: { children?: React.ReactNode }) {
  return <div className="wz-label">{children}</div>;
}
