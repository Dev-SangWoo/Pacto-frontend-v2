"use client";

import type { ApplicationStatusResponse } from "@pacto/types";
import Link from "next/link";
import { useState, useTransition } from "react";

import { acceptCampaignAction, submitMissionAction } from "../_actions/blogger-actions";

type CampaignApplyActionProps = {
  applicationStatus?: ApplicationStatusResponse;
  campaignId: number;
  enabled: boolean;
};

export function CampaignApplyAction({
  applicationStatus,
  campaignId,
  enabled,
}: CampaignApplyActionProps) {
  const [currentStatus, setCurrentStatus] = useState<ApplicationStatusResponse | undefined>(
    applicationStatus,
  );
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  if (currentStatus != null) {
    return (
      <div className="cta-stack">
        <button className="primary-button weak-button" disabled type="button">
          {getApplicationCtaLabel(currentStatus)}
        </button>
        <Link className="text-link-button" href="/missions">
          내 미션에서 상태 확인
        </Link>
      </div>
    );
  }

  if (!enabled) {
    return (
      <Link className="primary-button weak-button" href="/campaigns">
        다른 캠페인 보기
      </Link>
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
              setCurrentStatus("PENDING");
            } else {
              setErrorMessage(result.message);
            }
          });
        }}
        type="button"
      >
        {isPending ? "신청 중..." : "캠페인 신청하기"}
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
        <p>리뷰 URL을 제출했어요. 미션 목록에서 검토 상태를 확인할 수 있어요.</p>
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
        {isPending ? "제출 중..." : "리뷰 URL 제출하기"}
      </button>
    </form>
  );
}

function getApplicationCtaLabel(status: ApplicationStatusResponse) {
  switch (status) {
    case "PENDING":
      return "신청 완료";
    case "ACCEPTED":
      return "승인 완료";
    case "REJECTED":
      return "신청 반려";
    case "CANCELLED":
      return "신청 취소";
  }
}
