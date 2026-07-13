import type { ApplicationResponse, Campaign, Mission } from "@pacto/types";

export type BloggerNotification = {
  createdAt: string;
  href: string;
  id: string;
  isUnread: boolean;
  message: string;
  title: string;
  tone: "amber" | "blue" | "green" | "red";
};

export function buildBloggerNotifications({
  applications,
  campaignMap = new Map(),
  missions,
}: {
  applications: ApplicationResponse[];
  campaignMap?: Map<number, Campaign>;
  missions: Mission[];
}): BloggerNotification[] {
  const missionCampaignIds = new Set(missions.map((mission) => mission.campaignId));
  const applicationNotifications = applications
    .filter((application) => application.status !== "PENDING")
    .map((application) => {
      const campaign = campaignMap.get(application.campaignId);
      const campaignTitle = campaign?.title ?? `캠페인 #${application.campaignId}`;
      const mission = missions.find((item) => item.campaignId === application.campaignId);

      if (application.status === "ACCEPTED") {
        return {
          createdAt: application.updatedAt,
          href: mission == null ? "/missions" : `/missions/${mission.id}`,
          id: `application-${application.applicationId}`,
          isUnread:
            mission?.status === "in_progress" || !missionCampaignIds.has(application.campaignId),
          message: "선정이 완료됐어요. 미션 제출 화면에서 리뷰 URL을 등록해 주세요.",
          title: `${campaignTitle} 선정 완료`,
          tone: "green" as const,
        };
      }

      if (application.status === "REJECTED") {
        return {
          createdAt: application.updatedAt,
          href: `/campaigns/${application.campaignId}`,
          id: `application-${application.applicationId}`,
          isUnread: true,
          message: "이번 캠페인에는 선정되지 않았어요. 다른 캠페인을 확인해 보세요.",
          title: `${campaignTitle} 미선정 안내`,
          tone: "red" as const,
        };
      }

      return {
        createdAt: application.updatedAt,
        href: `/campaigns/${application.campaignId}`,
        id: `application-${application.applicationId}`,
        isUnread: true,
        message: "신청이 취소되어 이 캠페인은 더 이상 진행하지 않아요.",
        title: `${campaignTitle} 신청 취소`,
        tone: "red" as const,
      };
    });

  const missionNotifications = missions
    .filter((mission) => mission.status === "in_progress" || mission.status === "submitted")
    .map((mission) => {
      if (mission.status === "in_progress") {
        return {
          createdAt: mission.dueDate,
          href: `/missions/${mission.id}`,
          id: `mission-${mission.id}`,
          isUnread: true,
          message: "리뷰 URL 제출이 필요한 미션이에요.",
          title: `${mission.campaignTitle} 제출 필요`,
          tone: "amber" as const,
        };
      }

      return {
        createdAt: mission.dueDate,
        href: `/missions/${mission.id}`,
        id: `mission-${mission.id}`,
        isUnread: false,
        message: "리뷰 URL 제출이 완료되어 광고주 검수를 기다리고 있어요.",
        title: `${mission.campaignTitle} 검수 대기`,
        tone: "blue" as const,
      };
    });

  return [...missionNotifications, ...applicationNotifications].sort(
    (left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime(),
  );
}

export function getUnreadNotificationCount(notifications: BloggerNotification[]) {
  return notifications.filter((notification) => notification.isUnread).length;
}
