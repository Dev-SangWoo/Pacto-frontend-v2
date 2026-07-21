import { cache } from "react";

import { getMyApplicationResponses, getMyMissions } from "@pacto/api";

export const getBloggerActivity = cache(async (token?: string) => {
  if (token == null) {
    return { applications: [], missions: [] };
  }

  const [missions, applications] = await Promise.all([
    getMyMissions({}, token),
    getMyApplicationResponses(token),
  ]);

  return { applications, missions };
});
