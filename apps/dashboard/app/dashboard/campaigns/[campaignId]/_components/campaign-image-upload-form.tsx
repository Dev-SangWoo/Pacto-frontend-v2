"use client";

import { useActionState } from "react";

import {
  uploadCampaignImagesAction,
  type CampaignImageUploadState,
} from "../../../../_actions/campaign-actions";

const initialState: CampaignImageUploadState = { ok: false };

type CampaignImageUploadFormProps = {
  campaignId: number;
  guidelineImageCount: number;
  thumbnailUrl?: string;
};

export function CampaignImageUploadForm({
  campaignId,
  guidelineImageCount,
  thumbnailUrl,
}: CampaignImageUploadFormProps) {
  const [state, action, isPending] = useActionState(
    uploadCampaignImagesAction.bind(null, campaignId),
    initialState,
  );
  const remainingGuidelineCount = Math.max(5 - guidelineImageCount, 0);

  return (
    <form action={action} className="campaign-image-retry-form">
      <div className="campaign-image-retry-preview">
        {thumbnailUrl != null ? <img alt="현재 캠페인 썸네일" src={thumbnailUrl} /> : null}
        <div>
          <strong>캠페인 이미지 관리</strong>
          <p>생성 중 업로드가 실패했거나 이미지를 교체할 때 다시 저장할 수 있어요.</p>
        </div>
      </div>
      <label>
        <span>썸네일 교체</span>
        <input accept="image/gif,image/jpeg,image/png,image/webp" name="thumbnail" type="file" />
      </label>
      <label>
        <span>가이드 이미지 추가 · 남은 {remainingGuidelineCount}장</span>
        <input
          accept="image/gif,image/jpeg,image/png,image/webp"
          disabled={remainingGuidelineCount === 0}
          multiple
          name="guidelineImages"
          type="file"
        />
      </label>
      {state.message != null ? (
        <p className={state.ok ? "form-success" : "form-error"} role="status">
          {state.message}
        </p>
      ) : null}
      <button className="secondary-button" disabled={isPending} type="submit">
        {isPending ? "이미지 저장 중..." : "이미지 저장"}
      </button>
    </form>
  );
}
