import type { ReactNode } from "react";

export interface DialogProps {
  open: boolean;
  title: string;
  children?: ReactNode;
  actions?: ReactNode;
  onDismiss?: () => void;
}

/**
 * Used for the AppointmentRequest slot-picker confirmation, EpisodeSuggestion
 * accept/dismiss, and similar propose-then-confirm moments in the domain
 * model — anywhere the user needs to explicitly confirm before an action
 * takes effect.
 */
export function Dialog({ open, title, children, actions, onDismiss }: DialogProps) {
  if (!open) return null;
  return (
    <div className="dialog-backdrop" onClick={onDismiss}>
      <div className="dialog" onClick={(e) => e.stopPropagation()}>
        <div className="dialog-title">{title}</div>
        <div className="dialog-body">{children}</div>
        {actions && <div className="dialog-actions">{actions}</div>}
      </div>
    </div>
  );
}
