import { CircleCheck } from "lucide-react";
import type { ReactNode } from "react";

type FlowCompletionProps = {
  actions: ReactNode;
  description: string;
  detail?: ReactNode;
  eyebrow?: string;
  title: string;
  variant?: "compact" | "page";
};

export function FlowCompletion({
  actions,
  description,
  detail,
  eyebrow = "처리가 완료됐어요",
  title,
  variant = "page",
}: FlowCompletionProps) {
  return (
    <section
      aria-live="polite"
      className={`flow-completion flow-completion-${variant}`}
      role="status"
    >
      <span className="flow-completion-icon" aria-hidden="true">
        <CircleCheck size={34} strokeWidth={2.1} />
      </span>
      <div className="flow-completion-copy">
        <p>{eyebrow}</p>
        <h2>{title}</h2>
        <span>{description}</span>
      </div>
      {detail != null ? <div className="flow-completion-detail">{detail}</div> : null}
      <div className="flow-completion-actions">{actions}</div>
    </section>
  );
}
