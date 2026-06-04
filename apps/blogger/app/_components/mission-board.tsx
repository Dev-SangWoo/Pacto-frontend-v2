"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import type { Mission } from "@pacto/types";
import {
  formatKoreanDate,
  formatPoint,
  getMissionStatusView,
  isApplicationMission,
  missionProgressSteps,
} from "@pacto/utils";
import type { MissionProgressStep } from "@pacto/utils";

type MissionBoardProps = {
  missions: Mission[];
};

type ProgressStepWithCount = MissionProgressStep & {
  count: number;
};

export function MissionBoard({ missions }: MissionBoardProps) {
  const [activeStepKey, setActiveStepKey] = useState<MissionProgressStep["key"] | null>(null);

  const progressSteps = useMemo<ProgressStepWithCount[]>(
    () =>
      missionProgressSteps.map((step) => ({
        ...step,
        count: missions.filter((mission) => step.statuses.includes(mission.status)).length,
      })),
    [missions],
  );

  const activeStep = progressSteps.find((step) => step.key === activeStepKey) ?? null;
  const filteredMissions =
    activeStep == null
      ? missions
      : missions.filter((mission) => activeStep.statuses.includes(mission.status));
  const applicationMissions = filteredMissions.filter((mission) =>
    isApplicationMission(mission.status),
  );
  const submissionMissions = filteredMissions.filter(
    (mission) => !isApplicationMission(mission.status),
  );

  function handleProgressClick(stepKey: MissionProgressStep["key"]) {
    setActiveStepKey((currentKey) => (currentKey === stepKey ? null : stepKey));
  }

  return (
    <>
      <section className="mission-progress" aria-label="미션 단계별 현황">
        <div className="mission-progress-bar">
          {progressSteps.map((step) => {
            const isActive = activeStepKey === step.key;

            return (
              <div
                className={`mission-progress-segment ${step.key} ${isActive ? "active" : ""}`}
                key={step.key}
              >
                {step.key !== "application" ? (
                  <button
                    aria-label={`${step.label} 단계 ${step.count}건 보기`}
                    aria-pressed={isActive}
                    className="mission-progress-count"
                    type="button"
                    onClick={() => handleProgressClick(step.key)}
                  >
                    {step.count}건
                  </button>
                ) : null}
                <span>{step.label}</span>
              </div>
            );
          })}
        </div>
      </section>

      {activeStep == null ? (
        <>
          <MissionSection
            emptyText="지원한 캠페인이 아직 없어요."
            id="applications-title"
            missions={applicationMissions}
            mode="application"
            title="지원 내역"
          />
          <MissionSection
            emptyText="제출할 미션이 아직 없어요."
            id="submissions-title"
            missions={submissionMissions}
            mode="submission"
            title="제출할 미션"
          />
        </>
      ) : (
        <section className="mission-section" aria-labelledby="filtered-missions-title">
          <div className="list-header">
            <div>
              <p className="section-label">선택한 단계</p>
              <h2 id="filtered-missions-title">{activeStep.label}</h2>
            </div>
            <button className="text-button" type="button" onClick={() => setActiveStepKey(null)}>
              전체 보기
            </button>
          </div>
          {filteredMissions.length > 0 ? (
            <div className="list-stack">
              {filteredMissions.map((mission) => (
                <MissionCard
                  key={mission.id}
                  mission={mission}
                  mode={isApplicationMission(mission.status) ? "application" : "submission"}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <strong>{getEmptyTitle()}</strong>
              <p>{getEmptyDescription()}</p>
            </div>
          )}
        </section>
      )}
    </>
  );
}

type MissionSectionProps = {
  emptyText: string;
  id: string;
  missions: Mission[];
  mode: "application" | "submission";
  title: string;
};

function MissionSection({ emptyText, id, missions, mode, title }: MissionSectionProps) {
  return (
    <section className="mission-section" aria-labelledby={id}>
      <div className="list-header">
        <h2 id={id}>{title}</h2>
        <span>{missions.length}건</span>
      </div>
      {missions.length > 0 ? (
        <div className="list-stack">
          {missions.map((mission) => (
            <MissionCard key={mission.id} mission={mission} mode={mode} />
          ))}
        </div>
      ) : (
        <div className="empty-state compact">
          <p>{emptyText}</p>
        </div>
      )}
    </section>
  );
}

type MissionCardProps = {
  mission: Mission;
  mode: "application" | "submission";
};

function MissionCard({ mission, mode }: MissionCardProps) {
  const statusView = getMissionStatusView(mission.status);
  const helperText =
    mode === "application"
      ? mission.status === "applied"
        ? "대행사 승인 대기"
        : "지원 결과 확인"
      : `${formatKoreanDate(mission.dueDate)}까지 제출`;

  return (
    <Link className="list-card campaign-row" href={`/missions/${mission.id}`}>
      <div className="mission-row-main">
        <img
          src={mission.thumbnailUrl}
          alt={`${mission.campaignTitle} 대표 이미지`}
          loading="lazy"
        />
        <div>
          <span className={`status-badge ${statusView.tone}`}>{statusView.label}</span>
          <p className="muted-text">{mission.brandName}</p>
          <h2>{mission.campaignTitle}</h2>
        </div>
      </div>
      <div className="row-meta">
        <strong>{formatPoint(mission.rewardPoint)}</strong>
        <span>{helperText}</span>
      </div>
    </Link>
  );
}

function getEmptyTitle() {
  return "이 단계의 미션이 없어요";
}

function getEmptyDescription() {
  return "다른 단계의 말풍선을 누르거나 전체 보기로 돌아가 확인해요.";
}
