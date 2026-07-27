const fallbackCampaignThumbnails = [
  "/campaigns/seongsu-brunch-cafe.webp",
  "/campaigns/hongdae-nail-studio.webp",
  "/campaigns/jamsil-fitness-lounge.webp",
] as const;

export function getFallbackCampaignThumbnail(id?: number): string {
  const index = id == null ? 0 : Math.abs(id - 1) % fallbackCampaignThumbnails.length;
  return fallbackCampaignThumbnails[index] ?? fallbackCampaignThumbnails[0];
}
