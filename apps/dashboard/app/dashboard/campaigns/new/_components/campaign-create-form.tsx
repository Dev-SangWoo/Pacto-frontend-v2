"use client";

import { useActionState, useMemo, useState } from "react";

import { formatPoint } from "@pacto/utils";

import { createCampaignAction } from "../../../../_actions/campaign-actions";
import type { CampaignCreateState } from "../../../../_actions/campaign-actions";
import { CampaignMobilePreview } from "./campaign-mobile-preview";
import { GuidelineEditor, type TiptapGuidelines } from "./guideline-editor";

const initialState: CampaignCreateState = {};
const initialGuidelines: TiptapGuidelines = {
  editor: "tiptap",
  version: 1,
  content: {
    type: "doc",
    content: [],
  },
};

export function CampaignCreateForm() {
  const [state, formAction, isPending] = useActionState(createCampaignAction, initialState);
  const [title, setTitle] = useState("");
  const [rewardPoint, setRewardPoint] = useState(0);
  const [totalSlots, setTotalSlots] = useState(1);
  const [deadline, setDeadline] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [guidelines, setGuidelines] = useState<TiptapGuidelines>(initialGuidelines);
  const lockedBudget = useMemo(
    () => Math.max(rewardPoint, 0) * Math.max(totalSlots, 0),
    [rewardPoint, totalSlots],
  );

  return (
    <div className="campaign-create-workbench">
      <div className="campaign-create-form-panel">
        <form action={formAction}>
          <div className="form-grid">
            <label>
              <span>광고주</span>
              <input disabled placeholder="로그인 계정 기준으로 등록돼요" />
            </label>
            <label>
              <span>캠페인명</span>
              <input
                name="title"
                onChange={(event) => setTitle(event.currentTarget.value)}
                placeholder="예: 성수동 브런치 카페 체험단"
                required
                value={title}
              />
            </label>
            <label>
              <span>보상 포인트</span>
              <input
                min="0"
                name="rewardPoint"
                onChange={(event) => setRewardPoint(Number(event.currentTarget.value))}
                placeholder="50000"
                required
                type="number"
              />
            </label>
            <label>
              <span>모집 인원</span>
              <input
                min="1"
                name="totalSlots"
                onChange={(event) => setTotalSlots(Number(event.currentTarget.value))}
                placeholder="10"
                required
                type="number"
              />
            </label>
            <div className="campaign-budget-preview">
              <span>생성 시 잠금 예산</span>
              <strong>{formatPoint(lockedBudget)}</strong>
              <p>
                백엔드 정책상 캠페인 생성 시 보상 포인트 × 모집 인원만큼 광고주 지갑에서 잠겨요.
              </p>
            </div>
            <label>
              <span>마감일</span>
              <input
                name="deadline"
                onChange={(event) => setDeadline(event.currentTarget.value)}
                required
                type="datetime-local"
                value={deadline}
              />
            </label>
            <label className="full-row">
              <span>대표 이미지 URL</span>
              <input
                name="thumbnailUrl"
                onChange={(event) => setThumbnailUrl(event.currentTarget.value)}
                placeholder="https://example.com/campaign-thumbnail.jpg"
                type="url"
                value={thumbnailUrl}
              />
            </label>
            <GuidelineEditor onChange={setGuidelines} />
          </div>
          <div className="form-actions">
            {state.message != null ? (
              <p className="form-error inline-error" role="alert">
                {state.message}
              </p>
            ) : null}
            <a className="secondary-link" href="/dashboard/campaigns">
              취소
            </a>
            <button className="primary-button" disabled={isPending} type="submit">
              {isPending ? "등록 중..." : "캠페인 등록"}
            </button>
          </div>
        </form>
      </div>
      <CampaignMobilePreview
        deadline={deadline}
        guidelines={guidelines}
        rewardPoint={rewardPoint}
        thumbnailUrl={thumbnailUrl}
        title={title}
        totalSlots={totalSlots}
      />
    </div>
  );
}
