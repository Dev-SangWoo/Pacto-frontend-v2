import { notFound } from "next/navigation";

import { getMissionDetail } from "@pacto/api";
import { canSubmitMission, formatKoreanDate, formatPoint, getMissionStatusView } from "@pacto/utils";

type MissionDetailPageProps = {
  params: Promise<{
    missionId: string;
  }>;
};

export default async function MissionDetailPage({ params }: MissionDetailPageProps) {
  const { missionId } = await params;
  const mission = await getMissionDetail(Number(missionId));

  if (mission == null) {
    notFound();
  }

  const statusView = getMissionStatusView(mission.status);
  const isSubmitEnabled = canSubmitMission(mission.status);

  return (
    <section className="screen-stack detail-screen" aria-labelledby="mission-detail-title">
      <div className="page-heading">
        <span className={`status-badge ${statusView.tone}`}>{statusView.label}</span>
        <p className="section-label">{mission.brandName}</p>
        <h1 id="mission-detail-title">{mission.campaignTitle}</h1>
      </div>

      <section className="reward-panel" aria-label="미션 보상">
        <span>승인 후 정산 예정</span>
        <strong>{formatPoint(mission.rewardPoint)}</strong>
      </section>

      <section className="info-list" aria-label="미션 정보">
        <div>
          <span>제출 기한</span>
          <strong>{formatKoreanDate(mission.dueDate)}</strong>
        </div>
        <div>
          <span>제출 URL</span>
          <strong>{mission.submittedUrl ?? "아직 제출 전"}</strong>
        </div>
      </section>

      <section className="content-section" aria-labelledby="submit-guide-title">
        <h2 id="submit-guide-title">제출 안내</h2>
        <p>블로그 리뷰 URL을 제출하면 대행사 검수 후 정산 가능 금액으로 이동해요.</p>
      </section>

      <div className="fixed-cta">
        <button className="primary-button" disabled={!isSubmitEnabled} type="button">
          {isSubmitEnabled ? "미션 제출하기" : statusView.label}
        </button>
      </div>
    </section>
  );
}
