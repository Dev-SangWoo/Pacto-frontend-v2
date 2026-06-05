type CampaignStep = "overview" | "applicants" | "missions" | "settlements";

type CampaignStepProgressProps = {
  activeStep: CampaignStep;
  campaignId: number;
};

const steps: Array<{
  id: CampaignStep;
  label: string;
  helper: string;
  href: (campaignId: number) => string;
}> = [
  {
    id: "overview",
    label: "개요",
    helper: "조건 확인",
    href: (campaignId) => `/dashboard/campaigns/${campaignId}`,
  },
  {
    id: "applicants",
    label: "지원자",
    helper: "승인/반려",
    href: (campaignId) => `/dashboard/campaigns/${campaignId}/applicants`,
  },
  {
    id: "missions",
    label: "미션 검수",
    helper: "URL 확인",
    href: (campaignId) => `/dashboard/campaigns/${campaignId}/missions`,
  },
  {
    id: "settlements",
    label: "정산",
    helper: "지급 처리",
    href: (campaignId) => `/dashboard/campaigns/${campaignId}/settlements`,
  },
];

export function CampaignStepProgress({ activeStep, campaignId }: CampaignStepProgressProps) {
  const activeIndex = steps.findIndex((step) => step.id === activeStep);

  return (
    <nav className="step-progress" aria-label="캠페인 운영 단계">
      {steps.map((step, index) => {
        const state =
          index < activeIndex ? "completed" : index === activeIndex ? "active" : "upcoming";

        return (
          <a
            aria-current={state === "active" ? "step" : undefined}
            className={`step-progress-item ${state}`}
            href={step.href(campaignId)}
            key={step.id}
          >
            <span className="step-progress-marker">{index + 1}</span>
            <span className="step-progress-copy">
              <strong>{step.label}</strong>
              <em>{step.helper}</em>
            </span>
          </a>
        );
      })}
    </nav>
  );
}
