import { getCampaignDetail } from "@pacto/api";
import type { ApplicationResponse, Campaign, Mission } from "@pacto/types";
import { formatKoreanDate } from "@pacto/utils";
import { redirect } from "next/navigation";

import { getBloggerActivity } from "../../_lib/blogger-activity";
import { fallbackOnNonAuthError } from "../../_lib/auth-error";
import { buildBloggerNotifications } from "../../_lib/notifications";
import { getBloggerSession } from "../../_lib/session";

export const dynamic = "force-dynamic";

export default async function NotificationsPage() {
  const session = await getBloggerSession();

  if (session.accessToken == null) {
    redirect("/login");
  }

  const { applications, missions } = await getBloggerActivity(session.accessToken).catch(
    (error: unknown) => fallbackOnNonAuthError(error, { applications: [], missions: [] }),
  );
  const campaignMap = await getCampaignMap([...missions, ...applications], session.accessToken);
  const notifications = buildBloggerNotifications({ applications, campaignMap, missions });

  return (
    <section className="screen-stack" aria-labelledby="notifications-title">
      <section className="profile-title-block">
        <p className="section-label">알림</p>
        <h1 id="notifications-title">내 활동 알림</h1>
        <p>선정 결과, 제출할 미션, 검수 상태를 한곳에서 확인하세요.</p>
      </section>

      {notifications.length > 0 ? (
        <div className="notification-list">
          {notifications.map((notification) => (
            <a
              className={`notification-card ${notification.tone}`}
              href={notification.href}
              key={notification.id}
            >
              <span>{notification.isUnread ? "새 알림" : "확인됨"}</span>
              <strong>{notification.title}</strong>
              <p>{notification.message}</p>
              <em>{formatKoreanDate(notification.createdAt)}</em>
            </a>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <strong>아직 확인할 알림이 없어요</strong>
          <p>캠페인 선정 결과나 제출할 미션이 생기면 여기에 표시돼요.</p>
        </div>
      )}
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
