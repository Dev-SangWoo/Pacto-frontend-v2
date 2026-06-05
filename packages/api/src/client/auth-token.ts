import { getApiEnv } from "./env";

export function getServerAccessToken(): string | undefined {
  return getApiEnv("PACTO_ACCESS_TOKEN");
}
