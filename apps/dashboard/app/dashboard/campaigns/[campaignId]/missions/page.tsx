import { notFound } from "next/navigation";

import { getCampaignDetail, getMyMissions } from "@pacto/api";
import { formatKoreanDate, getMissionStatusView } from "@pacto/utils";

type MissionReviewPageProps = {
  params: Promise<{
    campaignId: string;
  }>;
};

export default async function MissionReviewPage({ params }: MissionReviewPageProps) {
  const { campaignId } = await params;
  const campaign = await getCampaignDetail(Number(campaignId));

  if (campaign == null) {
    notFound();
  }

  const missions = (await getMyMissions()).filter((mission) => mission.campaignId === campaign.id);

  return (
    <>
      <header className="topbar">
        <div>
          <p className="eyebrow">{campaign.title}</p>
          <h1>미션 검수</h1>
        </div>
      </header>

      <section className="panel">
        <div className="panel-heading">
          <div>
            <h2>제출물 검수</h2>
            <p>제출 URL을 확인하고 승인 또는 반려 처리합니다.</p>
          </div>
          <span>{missions.length}건</span>
        </div>
        <div className="review-list">
          {missions.map((mission) => {
            const statusView = getMissionStatusView(mission.status);

            return (
              <article className="review-item" key={mission.id}>
                <div>
                  <span className={`status-badge ${statusView.tone}`}>{statusView.label}</span>
                  <h2>{mission.brandName}</h2>
                  <p>{formatKoreanDate(mission.dueDate)}까지 제출</p>
                  <strong>{mission.submittedUrl ?? "제출 URL 대기 중"}</strong>
                </div>
                <div className="action-row">
                  <button className="small-button" type="button">
                    승인
                  </button>
                  <button className="small-button muted" type="button">
                    반려
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
