"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

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
  shortLabel: string;
  statuses: ApplicationStatusResponse[];
  title: string;
};

type MissionGroupConfig = {
  description: string;
  emptyText: string;
  key: string;
  shortLabel: string;
  statuses: MissionStatus[];
  title: string;
};

type MissionViewKey = "closed" | "in-progress" | "pending-applications" | "settled" | "submitted";

type StatusPanel = {
  count: number;
  description: string;
  key: MissionViewKey;
  label: string;
};

const pendingApplicationGroup: ApplicationGroupConfig = {
  key: "pending-applications",
  shortLabel: "신청",
  title: "신청한 캠페인",
  description: "광고주 승인을 기다리는 신청",
  emptyText: "승인 대기 중인 신청이 없어요.",
  statuses: ["PENDING"],
};

const rejectedApplicationGroup: ApplicationGroupConfig = {
  key: "rejected-applications",
  shortLabel: "신청 반려",
  title: "반려/취소된 신청",
  description: "진행 미션으로 전환되지 않은 신청",
  emptyText: "반려되거나 취소된 신청이 없어요.",
  statuses: ["REJECTED", "CANCELLED"],
};

const missionGroups: MissionGroupConfig[] = [
  {
    key: "in-progress",
    shortLabel: "리뷰 작성",
    title: "리뷰 작성이 필요한 미션",
    description: "콘텐츠 작성 후 리뷰 URL을 등록해야 하는 미션",
    emptyText: "현재 리뷰를 작성할 미션이 없어요.",
    statuses: ["in_progress"],
  },
  {
    key: "submitted",
    shortLabel: "검수 대기",
    title: "검수 대기",
    description: "리뷰 URL 등록 후 광고주 검수와 정산을 기다리는 미션",
    emptyText: "검수 대기 중인 미션이 없어요.",
    statuses: ["submitted"],
  },
  {
    key: "settled",
    shortLabel: "정산",
    title: "정산 완료",
    description: "보상 지급이 완료된 미션",
    emptyText: "정산 완료된 미션이 없어요.",
    statuses: ["approved"],
  },
  {
    key: "closed",
    shortLabel: "미션 반려",
    title: "반려/취소된 미션",
    description: "제출 후 반려되었거나 취소된 미션",
    emptyText: "반려되거나 취소된 미션이 없어요.",
    statuses: ["rejected", "cancelled"],
  },
];

export function MissionBoard({ applications, missions }: MissionBoardProps) {
  const visibleApplications = applications.filter(
    (application) => application.status !== "ACCEPTED",
  );
  const totalItems = visibleApplications.length + missions.length;
  const readyToSubmitCount = filterMissions(missions, ["in_progress"]).length;
  const waitingReviewCount = filterMissions(missions, ["submitted"]).length;
  const settledCount = filterMissions(missions, ["approved"]).length;
  const pendingApplicationCount = filterApplications(visibleApplications, ["PENDING"]).length;
  const closedMissionCount = filterMissions(missions, ["rejected", "cancelled"]).length;
  const closedApplicationCount = filterApplications(visibleApplications, [
    "REJECTED",
    "CANCELLED",
  ]).length;
  const [selectedView, setSelectedView] = useState<MissionViewKey>(
    getInitialView(readyToSubmitCount, waitingReviewCount, pendingApplicationCount),
  );
  const statusPanels = useMemo(
    () =>
      getStatusPanels({
        closedCount: closedMissionCount + closedApplicationCount,
        pendingApplicationCount,
        readyToSubmitCount,
        settledCount,
        waitingReviewCount,
      }),
    [
      closedApplicationCount,
      closedMissionCount,
      pendingApplicationCount,
      readyToSubmitCount,
      settledCount,
      waitingReviewCount,
    ],
  );
  const activePanel = statusPanels.find((panel) => panel.key === selectedView) ?? statusPanels[0];

  return (
    <section className="mission-board" aria-label="미션 목록">
      <section className="mission-journey-panel" aria-label="미션 현황">
        <div>
          <p className="section-label">미션 현황</p>
          <strong>{activePanel.description}</strong>
        </div>
        <div className="journey-strip" role="tablist" aria-label="미션 상태 필터">
          {statusPanels.map((panel) => (
            <button
              aria-selected={selectedView === panel.key}
              className={selectedView === panel.key ? "active" : undefined}
              key={panel.key}
              onClick={() => setSelectedView(panel.key)}
              role="tab"
              type="button"
            >
              <span>{panel.label}</span>
              <strong>{panel.count}</strong>
            </button>
          ))}
        </div>
        <div className="mission-journey-actions">
          <Link href="/campaigns">캠페인 찾으러 가기</Link>
        </div>
      </section>

      <div className="mission-view-panel" role="tabpanel">
        <SelectedMissionView
          applications={visibleApplications}
          missions={missions}
          selectedView={selectedView}
        />
      </div>

      {totalItems === 0 ? (
        <div className="empty-state">
          <strong>아직 참여한 미션이 없어요.</strong>
          <p>캠페인에서 관심 있는 미션을 신청해 보세요.</p>
        </div>
      ) : null}
    </section>
  );
}

function SelectedMissionView({
  applications,
  missions,
  selectedView,
}: {
  applications: EnrichedApplicationResponse[];
  missions: Mission[];
  selectedView: MissionViewKey;
}) {
  if (selectedView === "pending-applications") {
    return (
      <ApplicationGroup
        applications={filterApplications(applications, pendingApplicationGroup.statuses)}
        config={pendingApplicationGroup}
      />
    );
  }

  if (selectedView === "closed") {
    const closedMissions = filterMissions(missions, ["rejected", "cancelled"]);
    const closedApplications = filterApplications(applications, rejectedApplicationGroup.statuses);

    return (
      <section className="mission-group" id="mission-group-closed">
        <GroupHeader
          count={closedMissions.length + closedApplications.length}
          description="거절되었거나 반려된 신청과 미션"
          title="거절/반려된 항목"
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
            <p>거절되거나 반려된 항목이 없어요.</p>
          </div>
        )}
      </section>
    );
  }

  const group = missionGroups.find((item) => item.key === selectedView);

  if (!group) {
    return null;
  }

  return <MissionGroup config={group} missions={filterMissions(missions, group.statuses)} />;
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

type MissionCardProps = {
  groupKey: string;
  mission: Mission;
};

function MissionCard({ groupKey, mission }: MissionCardProps) {
  const statusView = getMissionStatusView(mission.status);
  const schedule = getMissionSchedule(groupKey, mission);

  return (
    <Link className="mission-card" href={`/missions/${mission.id}`}>
      <img src={mission.thumbnailUrl} alt={`${mission.campaignTitle}`} loading="lazy" />
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
      label: "완료 마감",
      value: `${formatKoreanDate(mission.dueDate)} · ${formatDeadlineDday(mission.dueDate)}`,
    };
  }

  if (groupKey === "submitted") {
    return {
      label: "검수 대기",
      value: `등록 완료 · ${formatDeadlineDday(mission.dueDate)}`,
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

function getInitialView(
  readyToSubmitCount: number,
  waitingReviewCount: number,
  pendingApplicationCount: number,
): MissionViewKey {
  if (readyToSubmitCount > 0) {
    return "in-progress";
  }

  if (waitingReviewCount > 0) {
    return "submitted";
  }

  if (pendingApplicationCount > 0) {
    return "pending-applications";
  }

  return "pending-applications";
}

function getStatusPanels({
  closedCount,
  pendingApplicationCount,
  readyToSubmitCount,
  settledCount,
  waitingReviewCount,
}: {
  closedCount: number;
  pendingApplicationCount: number;
  readyToSubmitCount: number;
  settledCount: number;
  waitingReviewCount: number;
}): StatusPanel[] {
  return [
    {
      count: pendingApplicationCount,
      description: "승인 대기 중인 캠페인 신청",
      key: "pending-applications",
      label: "신청",
    },
    {
      count: readyToSubmitCount,
      description: "리뷰 작성과 URL 등록이 필요한 미션",
      key: "in-progress",
      label: "리뷰 작성",
    },
    {
      count: waitingReviewCount,
      description: "리뷰 URL 등록 후 광고주 검수를 기다리는 미션",
      key: "submitted",
      label: "검수",
    },
    {
      count: settledCount,
      description: "보상 지급이 완료된 미션",
      key: "settled",
      label: "정산",
    },
    {
      count: closedCount,
      description: "거절되었거나 반려된 항목",
      key: "closed",
      label: "거절/반려",
    },
  ];
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
