import type { Mission } from "@pacto/types";

import { adaptMission } from "../adapters/mission-adapter";
import { mockMissions } from "../mocks/data";

export async function getMyMissions(): Promise<Mission[]> {
  return mockMissions.map(adaptMission);
}

export async function getMissionDetail(missionId: number): Promise<Mission | undefined> {
  const mission = mockMissions.find((item) => item.id === missionId);

  return mission == null ? undefined : adaptMission(mission);
}
