import Link from "next/link";

import { getMyMissions } from "@pacto/api";
import { formatKoreanDate, formatPoint, getMissionStatusView } from "@pacto/utils";

export default async function MissionsPage() {
  const missions = await getMyMissions();

  return (
    <section className="screen-stack" aria-labelledby="missions-title">
      <div className="page-heading">
        <p className="section-label">내 미션</p>
        <h1 id="missions-title">제출이 필요한 미션을 확인하세요</h1>
        <p>진행 중인 미션과 검수 상태를 한 곳에서 볼 수 있어요.</p>
      </div>

      <section className="list-stack" aria-label="미션 목록">
        {missions.map((mission) => {
          const statusView = getMissionStatusView(mission.status);

          return (
            <Link className="list-card campaign-row" href={`/missions/${mission.id}`} key={mission.id}>
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
