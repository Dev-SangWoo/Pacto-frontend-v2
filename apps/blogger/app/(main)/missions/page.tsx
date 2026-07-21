import { getCampaignDetail } from "@pacto/api";
import type { ApplicationResponse, Campaign, Mission } from "@pacto/types";
import { formatPoint } from "@pacto/utils";
import { redirect } from "next/navigation";

import { MissionBoard } from "../../_components/mission-board";
import { fallbackOnNonAuthError } from "../../_lib/auth-error";
import { getBloggerActivity } from "../../_lib/blogger-activity";
import { getBloggerSession } from "../../_lib/session";

export const dynamic = "force-dynamic";

export default async function MissionsPage() {
  const session = await getBloggerSession();

  if (session.accessToken == null) {
    redirect("/login");
  }

  const { applications, missions } = await getBloggerActivity(session.accessToken).catch(
    (error: unknown) =>
      fallbackOnNonAuthError<{ applications: ApplicationResponse[]; missions: Mission[] }>(error, {
        applications: [],
        missions: [],
      }),
  );
  const campaignMap = await getCampaignMap([...missions, ...applications], session.accessToken);
  const enrichedMissions = missions.map((mission) => enrichMission(mission, campaignMap));
  const enrichedApplications = applications.map((application) =>
    enrichApplication(application, campaignMap),
  );
  const activeMissionCount = enrichedMissions.filter(
    (mission) => mission.status === "in_progress" || mission.status === "submitted",
  ).length;
  const pendingApplicationCount = enrichedApplications.filter(
    (application) => application.status === "PENDING",
  ).length;
  const expectedReward = enrichedMissions
    .filter((mission) => mission.status === "in_progress" || mission.status === "submitted")
    .reduce((sum, mission) => sum + mission.rewardPoint, 0);

  return (
    <section
      className="screen-stack mobile-system-page mission-system-page"
      aria-labelledby="missions-title"
    >
      <header className="mobile-page-heading">
        <p className="section-label">미션 관리</p>
        <h1 id="missions-title">내 미션</h1>
        <p>신청부터 제출, 정산까지 진행 상태를 확인하세요.</p>
      </header>
      <section className="mobile-summary-panel mission-summary-panel" aria-label="미션 요약">
        <div className="mobile-summary-grid">
          <span>
            진행 중<strong>{activeMissionCount}건</strong>
          </span>
          <span>
            예상 보상 <strong>{formatPoint(expectedReward)}</strong>
          </span>
          <span>
            승인 대기<strong>{pendingApplicationCount}건</strong>
          </span>
        </div>
        <img
          alt=""
          aria-hidden="true"
          className="mobile-summary-illustration mission-summary-illustration"
          src="/illustrations/mission-cta-action.webp"
        />
      </section>
      <MissionBoard applications={enrichedApplications} missions={enrichedMissions} />
    </section>
  );
}

function getCampaignId(item: Mission | ApplicationResponse) {
  return item.campaignId;
}

async function getCampaignMap(
  items: Array<Mission | ApplicationResponse>,
  token?: string,
): Promise<Map<number, Campaign>> {
  const campaignIds = Array.from(new Set(items.map(getCampaignId).filter((id) => id > 0)));
  const campaigns = await Promise.all(
    campaignIds.map((campaignId) => getCampaignDetail(campaignId, token).catch(() => undefined)),
  );

  return new Map(
    campaigns
      .filter((campaign): campaign is Campaign => campaign != null)
      .map((campaign) => [campaign.id, campaign]),
  );
}

function enrichMission(mission: Mission, campaignMap: Map<number, Campaign>): Mission {
  const campaign = campaignMap.get(mission.campaignId);

  if (campaign == null) {
    return mission;
  }

  return {
    ...mission,
    brandName: campaign.brandName,
    campaignTitle: campaign.title,
    dueDate: campaign.deadline,
    rewardPoint: campaign.rewardPoint,
    thumbnailUrl: campaign.thumbnailUrl ?? mission.thumbnailUrl,
  };
}

function enrichApplication(
  application: ApplicationResponse,
  campaignMap: Map<number, Campaign>,
): ApplicationResponse & {
  advertiserId?: number;
  campaignTitle?: string;
  rewardPoint?: number;
  thumbnailUrl?: string;
} {
  const campaign = campaignMap.get(application.campaignId);

  if (campaign == null) {
    return application;
  }

  return {
    ...application,
    advertiserId: campaign.advertiserId,
    campaignTitle: campaign.title,
    rewardPoint: campaign.rewardPoint,
    thumbnailUrl: campaign.thumbnailUrl,
  };
}
