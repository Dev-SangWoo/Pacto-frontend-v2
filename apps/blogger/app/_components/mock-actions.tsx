"use client";

import Link from "next/link";
import { useState, useTransition } from "react";

import { acceptCampaignAction, submitMissionAction } from "../_actions/blogger-actions";

type CampaignApplyActionProps = {
  campaignId: number;
  enabled: boolean;
};

export function CampaignApplyAction({ campaignId, enabled }: CampaignApplyActionProps) {
  const [isApplied, setIsApplied] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

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
        <p>신청이 접수됐어요. 미션 화면에서 승인 대기 상태를 확인할 수 있어요.</p>
        <Link className="primary-button" href="/missions">
          신청한 미션 확인
        </Link>
      </div>
    );
  }

  return (
    <div className="cta-stack">
      {errorMessage != null ? <p>{errorMessage}</p> : null}
      <button
        className="primary-button"
        disabled={isPending}
        onClick={() => {
          setErrorMessage(undefined);
          startTransition(async () => {
            const result = await acceptCampaignAction(campaignId);

            if (result.ok) {
              setIsApplied(true);
            } else {
              setErrorMessage(result.message);
            }
          });
        }}
        type="button"
      >
        {isPending ? "신청 중" : "이 캠페인 신청하기"}
      </button>
    </div>
  );
}

type MissionSubmitActionProps = {
  enabled: boolean;
  missionId: number;
};

export function MissionSubmitAction({ enabled, missionId }: MissionSubmitActionProps) {
  const [reviewUrl, setReviewUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPending, startTransition] = useTransition();
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
        <p>리뷰 URL을 제출했어요. 검수 상태는 미션에서 확인할 수 있어요.</p>
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
          setErrorMessage(undefined);
          startTransition(async () => {
            const result = await submitMissionAction(missionId, trimmedUrl);

            if (result.ok) {
              setIsSubmitted(true);
            } else {
              setErrorMessage(result.message);
            }
          });
        }
      }}
    >
      {errorMessage != null ? <p>{errorMessage}</p> : null}
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
      <button
        className="primary-button"
        disabled={trimmedUrl.length === 0 || isPending}
        type="submit"
      >
        {isPending ? "제출 중" : "리뷰 URL 제출하기"}
      </button>
    </form>
  );
}
