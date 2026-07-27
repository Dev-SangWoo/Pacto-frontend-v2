"use client";

import { useQuery } from "@tanstack/react-query";

import { getMissionPageDataAction } from "../_actions/blogger-actions";
import { missionPageQueryKey } from "./blogger-query-provider";
import { MainTabLoading } from "./main-tab-loading";
import { MissionBoard } from "./mission-board";

export function MissionPageClient() {
  const missionQuery = useQuery({
    queryFn: getMissionPageDataAction,
    queryKey: missionPageQueryKey,
  });

  if (missionQuery.data == null) {
    if (missionQuery.isError) {
      return (
        <QueryLoadError
          message="미션 현황을 불러오지 못했어요."
          retry={() => void missionQuery.refetch()}
        />
      );
    }

    return <MainTabLoading />;
  }

  const { applications, missions } = missionQuery.data;
  const activeMissionCount = missions.filter(
    (mission) => mission.status === "in_progress" || mission.status === "submitted",
  ).length;
  const pendingApplicationCount = applications.filter(
    (application) => application.status === "PENDING",
  ).length;
  const expectedReward = missions
    .filter((mission) => mission.status === "in_progress" || mission.status === "submitted")
    .reduce((sum, mission) => sum + mission.rewardPoint, 0);

  return (
    <section className="screen-stack mobile-system-page mission-system-page" aria-label="내 미션">
      <MissionBoard
        activeMissionCount={activeMissionCount}
        applications={applications}
        expectedReward={expectedReward}
        missions={missions}
        pendingApplicationCount={pendingApplicationCount}
      />
    </section>
  );
}

type QueryLoadErrorProps = {
  message: string;
  retry: () => void;
};

function QueryLoadError({ message, retry }: QueryLoadErrorProps) {
  return (
    <section className="campaign-discovery-empty query-load-error" role="alert">
      <strong>{message}</strong>
      <p>네트워크 상태를 확인한 뒤 다시 시도해 주세요.</p>
      <button onClick={retry} type="button">
        다시 불러오기
      </button>
    </section>
  );
}
