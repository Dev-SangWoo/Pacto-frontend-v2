import { getMyMissions } from "@pacto/api";

import { getBloggerSession } from "../../_lib/session";
import { MissionBoard } from "../../_components/mission-board";

export default async function MissionsPage() {
  const session = await getBloggerSession();
  const missions = await getMyMissions({ bloggerId: session.bloggerId });

  return (
    <section className="screen-stack" aria-labelledby="missions-title">
      <div className="page-heading">
        <h1 id="missions-title">미션</h1>
      </div>

      <section className="safety-banner" aria-label="지원과 미션 안내">
        <div>
          <span>진행 순서</span>
          <strong>지원 승인 후 제출</strong>
        </div>
        <p>
          지원한 캠페인은 대행사 승인 전까지 대기 중으로 보여요. 승인되면 제출할 미션으로 이동해요.
        </p>
      </section>

      <MissionBoard missions={missions} />
    </section>
  );
}
