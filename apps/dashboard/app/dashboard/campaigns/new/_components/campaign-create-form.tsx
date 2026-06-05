"use client";

import { useActionState } from "react";

import { createCampaignAction } from "../../../../_actions/campaign-actions";
import type { CampaignCreateState } from "../../../../_actions/campaign-actions";

const initialState: CampaignCreateState = {};

export function CampaignCreateForm() {
  const [state, formAction, isPending] = useActionState(createCampaignAction, initialState);

  return (
    <form action={formAction}>
      <div className="form-grid">
        <label>
          <span>광고주</span>
          <input disabled placeholder="로그인 계정 기준으로 등록돼요" />
        </label>
        <label>
          <span>캠페인명</span>
          <input name="title" placeholder="예: 성수동 브런치 카페 체험단" required />
        </label>
        <label>
          <span>보상 포인트</span>
          <input min="0" name="rewardPoint" placeholder="50000" required type="number" />
        </label>
        <label>
          <span>모집 인원</span>
          <input min="1" name="totalSlots" placeholder="10" required type="number" />
        </label>
        <label>
          <span>마감일</span>
          <input name="deadline" required type="datetime-local" />
        </label>
        <label className="full-row">
          <span>대표 이미지 URL</span>
          <input
            name="thumbnailUrl"
            placeholder="https://example.com/campaign-thumbnail.jpg"
            type="url"
          />
        </label>
        <label className="full-row">
          <span>미션 가이드</span>
          <textarea
            name="guidelines"
            placeholder="블로거가 수행해야 할 미션 조건을 입력하세요."
            required
            rows={6}
          />
        </label>
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
  );
}
