"use client";

import Link from "next/link";
import { useState } from "react";

type CampaignApplyActionProps = {
  enabled: boolean;
};

export function CampaignApplyAction({ enabled }: CampaignApplyActionProps) {
  const [isApplied, setIsApplied] = useState(false);

  if (!enabled) {
    return (
      <Link className="primary-button weak-button" href="/campaigns">
        다른 캠페인 보기
      </Link>
    );
  }

  if (isApplied) {
    return (
      <div className="cta-stack">
        <p>지원 요청을 기록했어요. 내 미션 화면에서 진행 상태를 확인해요.</p>
        <Link className="primary-button" href="/missions">
          내 미션 확인하기
        </Link>
      </div>
    );
  }

  return (
    <button className="primary-button" onClick={() => setIsApplied(true)} type="button">
      캠페인 지원 요청하기
    </button>
  );
}

type MissionSubmitActionProps = {
  enabled: boolean;
};

export function MissionSubmitAction({ enabled }: MissionSubmitActionProps) {
  const [reviewUrl, setReviewUrl] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const trimmedUrl = reviewUrl.trim();

  if (!enabled) {
    return (
      <Link className="primary-button weak-button" href="/wallet">
        정산 상태 보러 가기
      </Link>
    );
  }

  if (isSubmitted) {
    return (
      <div className="cta-stack">
        <p>리뷰 URL을 제출했어요. 검수 상태는 내 미션에서 확인할 수 있어요.</p>
        <Link className="primary-button" href="/missions">
          내 미션으로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <form
      className="submit-form"
      onSubmit={(event) => {
        event.preventDefault();
        if (trimmedUrl.length > 0) {
          setIsSubmitted(true);
        }
      }}
    >
      <label>
        리뷰 URL
        <input
          inputMode="url"
          onChange={(event) => setReviewUrl(event.target.value)}
          placeholder="https://blog.example.com/review"
          type="url"
          value={reviewUrl}
        />
      </label>
      <button className="primary-button" disabled={trimmedUrl.length === 0} type="submit">
        리뷰 URL 제출하기
      </button>
    </form>
  );
}
