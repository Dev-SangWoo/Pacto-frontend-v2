import { notFound } from "next/navigation";

import { getMissionDetail } from "@pacto/api";
import {
  canSubmitMission,
  formatKoreanDate,
  formatPoint,
  getMissionStatusView,
} from "@pacto/utils";

import { MissionSubmitAction } from "../../../_components/mock-actions";

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

      <div className="mission-detail-brief">
        <img src={mission.thumbnailUrl} alt={`${mission.campaignTitle} 대표 이미지`} />
        <div>
          <span>연결된 캠페인</span>
          <strong>{mission.brandName}</strong>
        </div>
      </div>

      <section className="reward-panel" aria-label="미션 보상">
        <span>검수 승인 후 정산 예정</span>
        <strong>{formatPoint(mission.rewardPoint)}</strong>
        <p>제출 URL이 승인되면 지갑의 출금 가능 금액으로 이동해요.</p>
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
        <p>블로그 리뷰 URL을 제출하면 대행사가 가이드 충족 여부를 확인해요.</p>
      </section>

      <section className="content-section checklist-section" aria-labelledby="mission-check-title">
        <h2 id="mission-check-title">제출 전에 확인해요</h2>
        <ul>
          <li>리뷰 본문에 방문 경험과 사진이 충분히 들어가 있어요.</li>
          <li>캠페인 가이드의 필수 문구와 조건을 반영했어요.</li>
          <li>제출 URL이 공개 상태라 검수자가 열람할 수 있어요.</li>
        </ul>
      </section>

      <div className="fixed-cta">
        <MissionSubmitAction enabled={isSubmitEnabled} />
      </div>
    </section>
  );
}
