import Link from "next/link";

import { getMyMissions } from "@pacto/api";
import { formatKoreanDate, formatPoint, getMissionStatusView } from "@pacto/utils";

export default async function MissionsPage() {
  const missions = await getMyMissions();

  return (
    <section className="screen-stack" aria-labelledby="missions-title">
      <div className="page-heading">
        <p className="section-label">내 미션</p>
        <h1 id="missions-title">오늘 해야 할 미션을 먼저 확인해요</h1>
        <p>제출 기한과 검수 상태를 한곳에서 보고 다음 행동을 정할 수 있어요.</p>
      </div>

      <section className="safety-banner" aria-label="미션 제출 안내">
        <div>
          <span>제출 기준</span>
          <strong>URL 제출 후 검수</strong>
        </div>
        <p>리뷰 URL을 제출하면 대행사 검수 후 지갑에 정산 예정 금액이 반영돼요.</p>
      </section>

      <section className="list-stack" aria-label="미션 목록">
        {missions.map((mission) => {
          const statusView = getMissionStatusView(mission.status);

          return (
            <Link
              className="list-card campaign-row"
              href={`/missions/${mission.id}`}
              key={mission.id}
            >
              <span className={`status-badge ${statusView.tone}`}>{statusView.label}</span>
              <div>
                <p className="muted-text">{mission.brandName}</p>
                <h2>{mission.campaignTitle}</h2>
              </div>
              <div className="row-meta">
                <strong>{formatPoint(mission.rewardPoint)}</strong>
                <span>{formatKoreanDate(mission.dueDate)}까지 제출</span>
              </div>
            </Link>
          );
        })}
      </section>
    </section>
  );
}
