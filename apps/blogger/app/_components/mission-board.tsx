import Link from "next/link";

import type { Mission, MissionStatus } from "@pacto/types";
import { formatKoreanDate, formatPoint, getMissionStatusView } from "@pacto/utils";

type MissionBoardProps = {
  missions: Mission[];
};

type MissionGroupConfig = {
  description: string;
  emptyText: string;
  key: string;
  shortLabel: string;
  statuses: MissionStatus[];
  title: string;
};

const missionGroups: MissionGroupConfig[] = [
  {
    key: "applied",
    shortLabel: "신청",
    title: "신청한 미션",
    description: "광고주 승인을 기다리는 미션",
    emptyText: "승인 대기 중인 신청 미션이 없어요.",
    statuses: ["applied"],
  },
  {
    key: "rejected",
    shortLabel: "반려",
    title: "반려당한 미션",
    description: "신청 또는 제출이 반려된 미션",
    emptyText: "반려된 미션이 없어요.",
    statuses: ["application_rejected", "rejected"],
  },
  {
    key: "approved",
    shortLabel: "승인",
    title: "승인받은 미션",
    description: "완료 마감일까지 리뷰를 제출해야 하는 미션",
    emptyText: "아직 승인받은 미션이 없어요.",
    statuses: ["not_started", "in_progress"],
  },
  {
    key: "submitted",
    shortLabel: "제출",
    title: "제출완료한 미션",
    description: "검수와 정산을 기다리는 미션",
    emptyText: "제출 완료한 미션이 없어요.",
    statuses: ["submitted"],
  },
  {
    key: "settled",
    shortLabel: "정산",
    title: "정산까지 끝난 미션",
    description: "보상 지급이 완료된 미션",
    emptyText: "정산 완료된 미션이 없어요.",
    statuses: ["approved"],
  },
];

export function MissionBoard({ missions }: MissionBoardProps) {
  return (
    <section className="mission-board" aria-label="미션 목록">
      <div className="mission-status-summary" aria-label="미션 상태 요약">
        {missionGroups.map((group) => (
          <a href={`#mission-group-${group.key}`} key={group.key}>
            <span>{group.shortLabel}</span>
            <strong>{filterMissions(missions, group.statuses).length}</strong>
          </a>
        ))}
      </div>

      {missionGroups.map((group) => (
        <MissionGroup
          config={group}
          key={group.key}
          missions={filterMissions(missions, group.statuses)}
        />
      ))}

      {missions.length === 0 ? (
        <div className="empty-state">
          <strong>아직 참여한 미션이 없어요.</strong>
          <p>캠페인에서 관심 있는 미션을 신청해 보세요.</p>
        </div>
      ) : null}
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
      <div className="section-head mission-group-head">
        <div>
          <p className="section-label">{config.description}</p>
          <h2>{config.title}</h2>
        </div>
        <span>{missions.length}개</span>
      </div>

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

function filterMissions(missions: Mission[], statuses: MissionStatus[]) {
  return missions.filter((mission) => statuses.includes(mission.status));
}

function getMissionSchedule(groupKey: string, mission: Mission) {
  if (groupKey === "applied") {
    return {
      label: "승인 예정",
      value: mission.approvalDueDate
        ? `${formatKoreanDate(mission.approvalDueDate)}까지`
        : "1~2일 내",
    };
  }

  if (groupKey === "approved") {
    return {
      label: "완료 마감",
      value: `${formatKoreanDate(mission.dueDate)}까지`,
    };
  }

  if (groupKey === "submitted") {
    return {
      label: "검수 대기",
      value: `${formatKoreanDate(mission.dueDate)} 제출`,
    };
  }

  if (groupKey === "settled") {
    return {
      label: "정산 완료",
      value: mission.settledAt ? formatKoreanDate(mission.settledAt) : "완료",
    };
  }

  return {
    label: "반려 사유",
    value: mission.reason ?? "조건을 확인해 주세요",
  };
}
