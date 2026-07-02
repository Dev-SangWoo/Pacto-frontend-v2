import { notFound, redirect } from "next/navigation";

import { getCampaignDetail, getMissionDetail } from "@pacto/api";
import {
  canSubmitMission,
  formatDeadlineDday,
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

  if (session.accessToken == null) {
    redirect("/login");
  }

  const mission = await getMissionDetail(Number(missionId), {}, session.accessToken);

  if (mission == null) {
    notFound();
  }

  const campaign = await getCampaignDetail(mission.campaignId, session.accessToken).catch(
    () => undefined,
  );
  const displayMission =
    campaign == null
      ? mission
      : {
          ...mission,
          brandName: campaign.brandName,
          campaignTitle: campaign.title,
          dueDate: campaign.deadline,
          rewardPoint: campaign.rewardPoint,
          thumbnailUrl: campaign.thumbnailUrl ?? mission.thumbnailUrl,
        };
  const statusView = getMissionStatusView(displayMission.status);
  const isSubmitEnabled = canSubmitMission(displayMission.status);

  return (
    <section className="screen-stack detail-screen" aria-labelledby="mission-detail-title">
      <section className="task-hero">
        <span className={`status-badge ${statusView.tone}`}>{statusView.label}</span>
        <p className="section-label">{displayMission.brandName}</p>
        <h1 id="mission-detail-title">{displayMission.campaignTitle}</h1>
      </section>

      <section className="mission-command" aria-label="미션 수행 정보">
        <article>
          <span>리뷰 등록 마감</span>
          <strong>{formatKoreanDate(displayMission.dueDate)}</strong>
          <em>{formatDeadlineDday(displayMission.dueDate)}</em>
        </article>
        <article>
          <span>목표 포인트</span>
          <strong>{formatPoint(displayMission.rewardPoint)}</strong>
        </article>
      </section>

      <section className="section-block">
        <div className="section-head">
          <div>
            <p className="section-label">리뷰 등록 상태</p>
            <h2>리뷰 URL</h2>
          </div>
        </div>
        <p className="body-copy">{displayMission.submittedUrl ?? "아직 등록 전입니다."}</p>
      </section>

      <div className="fixed-cta">
        <MissionSubmitAction enabled={isSubmitEnabled} missionId={displayMission.id} />
      </div>
    </section>
  );
}
