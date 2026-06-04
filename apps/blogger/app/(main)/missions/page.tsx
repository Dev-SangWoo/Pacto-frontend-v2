import { getMyMissions } from "@pacto/api";

import { MissionBoard } from "../../_components/mission-board";
import { getBloggerSession } from "../../_lib/session";

export default async function MissionsPage() {
  const session = await getBloggerSession();
  const missions = await getMyMissions({}, session.accessToken);

  return (
    <section className="screen-stack" aria-labelledby="missions-title">
      <section className="mission-brief">
        <p className="section-label">미션 관리</p>
        <h1 id="missions-title">미션</h1>
      </section>

      <MissionBoard missions={missions} />
    </section>
  );
}
