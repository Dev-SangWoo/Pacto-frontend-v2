import { notFound } from "next/navigation";

import { getMissionDetail } from "@pacto/api";
import {
  canSubmitMission,
  formatKoreanDate,
  formatPoint,
  getMissionStatusView,
} from "@pacto/utils";

import { MissionSubmitAction } from "../../../_components/mock-actions";
import { getBloggerSession } from "../../../_lib/session";

type MissionDetailPageProps = {
  params: Promise<{
    missionId: string;
  }>;
};

export default async function MissionDetailPage({ params }: MissionDetailPageProps) {
  const { missionId } = await params;
  const session = await getBloggerSession();
  const mission = await getMissionDetail(Number(missionId), {}, session.accessToken);

  if (mission == null) {
    notFound();
  }

  const statusView = getMissionStatusView(mission.status);
  const isSubmitEnabled = canSubmitMission(mission.status);

  return (
    <section className="screen-stack detail-screen" aria-labelledby="mission-detail-title">
      <section className="task-hero">
        <span className={`status-badge ${statusView.tone}`}>{statusView.label}</span>
        <p className="section-label">{mission.brandName}</p>
        <h1 id="mission-detail-title">{mission.campaignTitle}</h1>
      </section>

      <section className="mission-command" aria-label="미션 실행 정보">
        <article>
          <span>제출 마감</span>
          <strong>{formatKoreanDate(mission.dueDate)}</strong>
        </article>
        <article>
          <span>정산 예정</span>
          <strong>{formatPoint(mission.rewardPoint)}</strong>
        </article>
      </section>

      <section className="section-block">
        <div className="section-head">
          <div>
            <p className="section-label">제출 상태</p>
            <h2>리뷰 URL</h2>
          </div>
        </div>
        <p className="body-copy">{mission.submittedUrl ?? "아직 제출 전입니다."}</p>
      </section>

      <div className="fixed-cta">
        <MissionSubmitAction enabled={isSubmitEnabled} missionId={mission.id} />
      </div>
    </section>
  );
}
