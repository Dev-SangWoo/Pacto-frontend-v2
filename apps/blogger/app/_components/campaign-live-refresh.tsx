"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const CAMPAIGN_REFRESH_INTERVAL_MS = 30_000;

export function CampaignLiveRefresh() {
  const router = useRouter();

  useEffect(() => {
    const refreshCampaignData = () => {
      if (document.visibilityState === "visible") {
        router.refresh();
      }
    };
    const intervalId = window.setInterval(refreshCampaignData, CAMPAIGN_REFRESH_INTERVAL_MS);

    document.addEventListener("visibilitychange", refreshCampaignData);

    return () => {
      window.clearInterval(intervalId);
      document.removeEventListener("visibilitychange", refreshCampaignData);
    };
  }, [router]);

  return null;
}
