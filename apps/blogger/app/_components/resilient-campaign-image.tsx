"use client";

import { useState } from "react";

import { getFreshCampaignThumbnailAction } from "../_actions/blogger-actions";

type ResilientCampaignImageProps = {
  alt: string;
  campaignId: number;
  className?: string;
  decoding?: "async" | "auto" | "sync";
  fallbackSrc: string;
  fetchPriority?: "auto" | "high" | "low";
  loading?: "eager" | "lazy";
  src: string;
};

const pendingThumbnailRequests = new Map<number, Promise<string | undefined>>();

function requestFreshThumbnail(campaignId: number) {
  const pendingRequest = pendingThumbnailRequests.get(campaignId);

  if (pendingRequest != null) {
    return pendingRequest;
  }

  const request = getFreshCampaignThumbnailAction(campaignId).finally(() => {
    pendingThumbnailRequests.delete(campaignId);
  });

  pendingThumbnailRequests.set(campaignId, request);
  return request;
}

export function ResilientCampaignImage({
  alt,
  campaignId,
  className,
  decoding,
  fallbackSrc,
  fetchPriority,
  loading,
  src,
}: ResilientCampaignImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [hasRetried, setHasRetried] = useState(false);

  async function handleError() {
    if (hasRetried || currentSrc === fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      return;
    }

    setHasRetried(true);
    const freshSrc = await requestFreshThumbnail(campaignId);
    setCurrentSrc(freshSrc != null && freshSrc !== currentSrc ? freshSrc : fallbackSrc);
  }

  return (
    <img
      alt={alt}
      className={className}
      decoding={decoding}
      fetchPriority={fetchPriority}
      loading={loading}
      onError={handleError}
      src={currentSrc}
    />
  );
}
