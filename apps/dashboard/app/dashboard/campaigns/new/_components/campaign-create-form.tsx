"use client";

import { useActionState, useEffect, useMemo, useState } from "react";

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
  const [guidelineImageNames, setGuidelineImageNames] = useState<string[]>([]);
  const [guidelines, setGuidelines] = useState<TiptapGuidelines>(initialGuidelines);
  const lockedBudget = useMemo(
    () => Math.max(rewardPoint, 0) * Math.max(totalSlots, 0),
    [rewardPoint, totalSlots],
  );

  useEffect(
    () => () => {
      if (thumbnailUrl.startsWith("blob:")) {
        URL.revokeObjectURL(thumbnailUrl);
      }
    },
    [thumbnailUrl],
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
            <label className="full-row campaign-image-upload-field">
              <span>대표 이미지</span>
              <input
                accept="image/jpeg,image/png,image/webp,image/gif"
                name="thumbnail"
                onChange={(event) => {
                  const file = event.currentTarget.files?.[0];
                  setThumbnailUrl(file == null ? "" : URL.createObjectURL(file));
                }}
                type="file"
              />
              <small>JPG, PNG, WEBP, GIF · 파일당 최대 10MB</small>
              {thumbnailUrl.length > 0 ? (
                <img
                  className="campaign-upload-preview"
                  src={thumbnailUrl}
                  alt="대표 이미지 미리보기"
                />
              ) : null}
            </label>
            <label className="full-row campaign-image-upload-field">
              <span>가이드 이미지</span>
              <input
                accept="image/jpeg,image/png,image/webp,image/gif"
                multiple
                name="guidelineImages"
                onChange={(event) => {
                  const files = Array.from(event.currentTarget.files ?? []).slice(0, 5);
                  setGuidelineImageNames(files.map((file) => file.name));
                }}
                type="file"
              />
              <small>제품 컷이나 촬영 가이드 이미지를 최대 5장까지 추가할 수 있어요.</small>
              {guidelineImageNames.length > 0 ? (
                <ul className="campaign-upload-file-list">
                  {guidelineImageNames.map((name, index) => (
                    <li key={`${name}-${index}`}>{name}</li>
                  ))}
                </ul>
              ) : null}
            </label>
            <GuidelineEditor onChange={setGuidelines} />
          </div>
          <div className="form-actions">
            {state.message != null ? (
              <p className="form-error inline-error" role="alert">
                {state.message}
                {state.createdCampaignId != null ? (
                  <a href={`/dashboard/campaigns/${state.createdCampaignId}`}>등록된 캠페인 보기</a>
                ) : null}
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
