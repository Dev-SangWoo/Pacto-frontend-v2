"use client";

import Link from "next/link";

import type {
  ApplicationResponse,
  ApplicationStatusResponse,
  Mission,
  MissionStatus,
} from "@pacto/types";
import {
  formatDeadlineDday,
  formatKoreanDate,
  formatPoint,
  getApplicationStatusView,
  getMissionStatusView,
} from "@pacto/utils";

type MissionBoardProps = {
  applications: EnrichedApplicationResponse[];
  missions: Mission[];
};

type EnrichedApplicationResponse = ApplicationResponse & {
  advertiserId?: number;
  campaignTitle?: string;
  rewardPoint?: number;
  thumbnailUrl?: string;
};

type ApplicationGroupConfig = {
  description: string;
  emptyText: string;
  key: string;
  statuses: ApplicationStatusResponse[];
  title: string;
};

type MissionGroupConfig = {
  description: string;
  emptyText: string;
  key: MissionViewKey;
  statuses: MissionStatus[];
  title: string;
};

type MissionViewKey = "closed" | "in-progress" | "pending-applications" | "settled" | "submitted";

const pendingApplicationGroup: ApplicationGroupConfig = {
  key: "pending-applications",
  title: "승인 대기 중인 신청",
  description: "광고주 승인을 기다리는 캠페인",
  emptyText: "승인 대기 중인 신청이 없어요.",
  statuses: ["PENDING"],
};

const acceptedApplicationGroup: ApplicationGroupConfig = {
  key: "accepted-applications",
  title: "선정 완료된 캠페인",
  description: "미션 제출을 준비할 캠페인",
  emptyText: "선정 완료 후 미션 생성 대기 중인 캠페인이 없어요.",
  statuses: ["ACCEPTED"],
};

const rejectedApplicationGroup: ApplicationGroupConfig = {
  key: "rejected-applications",
  title: "반려/취소된 신청",
  description: "미션으로 이어지지 않은 신청",
  emptyText: "반려되거나 취소된 신청이 없어요.",
  statuses: ["REJECTED", "CANCELLED"],
};

const missionGroups: MissionGroupConfig[] = [
  {
    key: "in-progress",
    title: "리뷰 제출이 필요한 미션",
    description: "콘텐츠 작성 후 리뷰 URL을 등록해야 해요.",
    emptyText: "지금 제출할 미션이 없어요.",
    statuses: ["in_progress"],
  },
  {
    key: "submitted",
    title: "검수 대기 중인 미션",
    description: "리뷰 URL 제출 후 광고주 확인을 기다리고 있어요.",
    emptyText: "검수 대기 중인 미션이 없어요.",
    statuses: ["submitted"],
  },
  {
    key: "settled",
    title: "정산 완료 미션",
    description: "보상 지급이 완료된 미션이에요.",
    emptyText: "정산 완료된 미션이 없어요.",
    statuses: ["approved"],
  },
  {
    key: "closed",
    title: "반려/취소된 미션",
    description: "제출 후 반려되었거나 취소된 미션이에요.",
    emptyText: "반려되거나 취소된 미션이 없어요.",
    statuses: ["rejected", "cancelled"],
  },
];

export function MissionBoard({ applications, missions }: MissionBoardProps) {
  const missionCampaignIds = new Set(missions.map((mission) => mission.campaignId));
  const visibleApplications = applications.filter(
    (application) =>
      application.status !== "ACCEPTED" || !missionCampaignIds.has(application.campaignId),
  );
  const totalItems = visibleApplications.length + missions.length;

  return (
    <section className="mission-board" aria-label="미션 목록">
      <div className="mission-view-panel">
        <ApplicationGroup
          applications={filterApplications(visibleApplications, pendingApplicationGroup.statuses)}
          config={pendingApplicationGroup}
        />
        <ApplicationGroup
          applications={filterApplications(visibleApplications, acceptedApplicationGroup.statuses)}
          config={acceptedApplicationGroup}
        />
        {missionGroups
          .filter((group) => group.key !== "closed")
          .map((group) => (
            <MissionGroup
              config={group}
              key={group.key}
              missions={filterMissions(missions, group.statuses)}
            />
          ))}
        <ClosedMissionGroup applications={visibleApplications} missions={missions} />
      </div>

      {totalItems === 0 ? (
        <div className="empty-state">
          <strong>아직 참여한 미션이 없어요</strong>
          <p>캠페인을 신청하면 승인 대기와 미션 진행 상태가 여기에 모여요.</p>
        </div>
      ) : null}
    </section>
  );
}

type ApplicationGroupProps = {
  applications: EnrichedApplicationResponse[];
  config: ApplicationGroupConfig;
};

function ApplicationGroup({ applications, config }: ApplicationGroupProps) {
  return (
    <section className="mission-group" id={`mission-group-${config.key}`}>
      <GroupHeader
        count={applications.length}
        description={config.description}
        title={config.title}
      />
      {applications.length > 0 ? (
        <div className="mission-list">
          {applications.map((application) => (
            <ApplicationCard application={application} key={application.applicationId} />
          ))}
        </div>
      ) : (
        <div className="empty-state compact">
          <p>{config.emptyText}</p>
        </div>
      )}
    </section>
  );
}

type MissionGroupProps = {
  config: MissionGroupConfig;
  missions: Mission[];
};

function MissionGroup({ config, missions }: MissionGroupProps) {
  return (
    <section className="mission-group" id={`mission-group-${config.key}`}>
      <GroupHeader count={missions.length} description={config.description} title={config.title} />
      {missions.length > 0 ? (
        <div className="mission-list">
          {missions.map((mission) => (
            <MissionCard groupKey={config.key} key={mission.id} mission={mission} />
          ))}
        </div>
      ) : (
        <div className="empty-state compact">
          <p>{config.emptyText}</p>
        </div>
      )}
    </section>
  );
}

function ClosedMissionGroup({
  applications,
  missions,
}: {
  applications: EnrichedApplicationResponse[];
  missions: Mission[];
}) {
  const closedMissions = filterMissions(missions, ["rejected", "cancelled"]);
  const closedApplications = filterApplications(applications, rejectedApplicationGroup.statuses);

  return (
    <section className="mission-group" id="mission-group-closed">
      <GroupHeader
        count={closedMissions.length + closedApplications.length}
        description="진행이 종료된 신청과 미션"
        title="종료된 항목"
      />
      {closedMissions.length > 0 || closedApplications.length > 0 ? (
        <div className="mission-list">
          {closedMissions.map((mission) => (
            <MissionCard groupKey="closed" key={mission.id} mission={mission} />
          ))}
          {closedApplications.map((application) => (
            <ApplicationCard application={application} key={application.applicationId} />
          ))}
        </div>
      ) : (
        <div className="empty-state compact">
          <p>종료된 항목이 없어요.</p>
        </div>
      )}
    </section>
  );
}

function GroupHeader({
  count,
  description,
  title,
}: {
  count: number;
  description: string;
  title: string;
}) {
  return (
    <div className="section-head mission-group-head">
      <div>
        <p className="section-label">{description}</p>
        <h2>{title}</h2>
      </div>
      <span>{count}개</span>
    </div>
  );
}

function ApplicationCard({ application }: { application: EnrichedApplicationResponse }) {
  const statusView = getApplicationStatusView(application.status);
  const campaignTitle = application.campaignTitle ?? `캠페인 #${application.campaignId}`;
  const applicationGuide = getApplicationGuide(application.status);

  return (
    <Link className="mission-card" href={`/campaigns/${application.campaignId}`}>
      <img
        src={application.thumbnailUrl ?? getFallbackThumbnail(application.campaignId)}
        alt={`${campaignTitle} 대표 이미지`}
        loading="lazy"
      />
      <div>
        <div className="ticket-topline">
          <span className={`status-badge ${statusView.tone}`}>{statusView.label}</span>
          <strong>
            {application.rewardPoint == null ? "보상 확인" : formatPoint(application.rewardPoint)}
          </strong>
        </div>
        <p>
          {application.advertiserId == null
            ? "광고주 확인 중"
            : `광고주 ID #${application.advertiserId}`}
        </p>
        <h3>{campaignTitle}</h3>
        {applicationGuide != null ? <p>{applicationGuide}</p> : null}
        <dl className="mission-facts">
          <div>
            <dt>신청일</dt>
            <dd>{formatKoreanDate(application.createdAt)}</dd>
          </div>
        </dl>
      </div>
    </Link>
  );
}

function getApplicationGuide(status: ApplicationResponse["status"]) {
  switch (status) {
    case "PENDING":
      return "광고주가 신청을 검토하고 있어요.";
    case "ACCEPTED":
      return "선정이 완료됐어요. 미션 제출 화면에서 리뷰 URL을 등록해 주세요.";
    case "REJECTED":
      return "이번 캠페인에는 선정되지 않았어요.";
    case "CANCELLED":
      return "취소된 신청이에요.";
  }
}

type MissionCardProps = {
  groupKey: string;
  mission: Mission;
};

function MissionCard({ groupKey, mission }: MissionCardProps) {
  const statusView = getMissionStatusView(mission.status);
  const schedule = getMissionSchedule(groupKey, mission);

  return (
    <Link className="mission-card" href={`/missions/${mission.id}`}>
      <img src={mission.thumbnailUrl} alt={`${mission.campaignTitle} 대표 이미지`} loading="lazy" />
      <div>
        <div className="ticket-topline">
          <span className={`status-badge ${statusView.tone}`}>{statusView.label}</span>
          <strong>{formatPoint(mission.rewardPoint)}</strong>
        </div>
        <p>{mission.brandName}</p>
        <h3>{mission.campaignTitle}</h3>
        <dl className="mission-facts">
          <div>
            <dt>{schedule.label}</dt>
            <dd>{schedule.value}</dd>
          </div>
        </dl>
      </div>
    </Link>
  );
}

function filterApplications(
  applications: ApplicationResponse[],
  statuses: ApplicationStatusResponse[],
) {
  return applications.filter((application) => statuses.includes(application.status));
}

function filterMissions(missions: Mission[], statuses: MissionStatus[]) {
  return missions.filter((mission) => statuses.includes(mission.status));
}

function getMissionSchedule(groupKey: string, mission: Mission) {
  if (groupKey === "in-progress") {
    return {
      label: "제출 마감",
      value: `${formatKoreanDate(mission.dueDate)} · ${formatDeadlineDday(mission.dueDate)}`,
    };
  }

  if (groupKey === "submitted") {
    return {
      label: "검수 상태",
      value: `제출 완료 · ${formatDeadlineDday(mission.dueDate)}`,
    };
  }

  if (groupKey === "settled") {
    return {
      label: "정산 완료",
      value: mission.settledAt ? formatKoreanDate(mission.settledAt) : "완료",
    };
  }

  return {
    label: "상태",
    value: mission.reason ?? getMissionStatusView(mission.status).label,
  };
}

function getFallbackThumbnail(id?: number): string {
  const thumbnails = [
    "/campaigns/seongsu-brunch-cafe.png",
    "/campaigns/hongdae-nail-studio.png",
    "/campaigns/jamsil-fitness-lounge.png",
  ];
  const index = id == null ? 0 : Math.abs(id - 1) % thumbnails.length;

  return thumbnails[index] ?? thumbnails[0];
}
