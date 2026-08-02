import type { CampaignStatus } from "@pacto/types";
import { getCampaignStatusView } from "@pacto/utils";

import { CampaignTransitionActions } from "../../_components/campaign-transition-actions";

type CampaignStatusManagerProps = {
  campaignId: number;
  selectedCount: number;
  status: CampaignStatus;
};

export function CampaignStatusManager({
  campaignId,
  selectedCount,
  status,
}: CampaignStatusManagerProps) {
  const statusView = getCampaignStatusView(status);
  const hasTransitionAction = status === "open" || status === "closed";

  return (
    <aside className="campaign-state-dock" aria-label="캠페인 상태 관리">
      <div className="campaign-state-dock-head">
        <div>
          <span>상태 관리</span>
          <strong>다음 운영 단계로 전환</strong>
        </div>
        <span className={`status-badge ${statusView.tone}`}>{statusView.label}</span>
      </div>

      <CampaignStatusProcess status={status} />

      <div className="campaign-state-dock-actions">
        {hasTransitionAction ? (
          <CampaignTransitionActions
            campaignId={campaignId}
            redirectTo={`/dashboard/campaigns/${campaignId}`}
            selectedCount={selectedCount}
            status={status}
            variant="floating"
          />
        ) : (
          <p>현재 상태에서 바로 전환할 다음 단계가 없습니다.</p>
        )}
      </div>
    </aside>
  );
}

function CampaignStatusProcess({ status }: { status: CampaignStatus }) {
  const activeIndex = getCampaignStatusProcessIndex(status);
  const steps =
    status === "cancelled"
      ? [
          { helper: "시작", label: "모집" },
          { helper: "종료", label: "취소" },
        ]
      : [
          { helper: "신청 접수", label: "모집" },
          { helper: "지원자 확정", label: "선정" },
          { helper: "미션 수행", label: "진행" },
          { helper: "정산 종료", label: "완료" },
        ];

  return (
    <ol className="campaign-state-process">
      {steps.map((step, index) => {
        const state =
          index < activeIndex ? "completed" : index === activeIndex ? "active" : "upcoming";

        return (
          <li className={state} key={step.label}>
            <span>{index + 1}</span>
            <div>
              <strong>{step.label}</strong>
              <em>{step.helper}</em>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function getCampaignStatusProcessIndex(status: CampaignStatus) {
  switch (status) {
    case "draft":
    case "open":
      return 0;
    case "closed":
      return 1;
    case "in_progress":
      return 2;
    case "completed":
      return 3;
    case "cancelled":
      return 1;
  }
}
