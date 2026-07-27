"use client";

import { useQueryClient } from "@tanstack/react-query";
import type { ApplicationStatusResponse, CampaignStatus, MissionStatus } from "@pacto/types";
import Link from "next/link";
import { useState, useTransition } from "react";

import { acceptCampaignAction, submitMissionAction } from "../_actions/blogger-actions";

type CampaignApplyActionProps = {
  applicationStatus?: ApplicationStatusResponse;
  campaignStatus: CampaignStatus;
  campaignId: number;
  enabled: boolean;
  missionId?: number;
  missionStatus?: MissionStatus;
};

export function CampaignApplyAction({
  applicationStatus,
  campaignStatus,
  campaignId,
  enabled,
  missionId,
  missionStatus,
}: CampaignApplyActionProps) {
  const queryClient = useQueryClient();
  const [currentStatus, setCurrentStatus] = useState<ApplicationStatusResponse | undefined>(
    applicationStatus,
  );
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  if (currentStatus != null) {
    if (currentStatus === "ACCEPTED") {
      const missionHref = missionId == null ? "/missions" : `/missions/${missionId}`;

      if (campaignStatus === "closed") {
        return (
          <div className="cta-stack">
            <Link className="primary-button weak-button" href={missionHref}>
              선정 완료 · 미션 시작 대기
            </Link>
            <p>광고주가 캠페인을 시작하면 리뷰 URL을 제출할 수 있어요.</p>
          </div>
        );
      }

      if (campaignStatus !== "in_progress" || missionStatus !== "in_progress") {
        return (
          <div className="cta-stack">
            <Link className="primary-button weak-button" href={missionHref}>
              미션 상태 확인하기
            </Link>
            <p>선정된 캠페인의 진행 및 정산 상태를 확인해 주세요.</p>
          </div>
        );
      }

      return (
        <div className="cta-stack">
          <Link className="primary-button" href={missionHref}>
            미션 제출하기
          </Link>
          <p>선정이 완료됐어요. 리뷰 URL을 제출해 주세요.</p>
        </div>
      );
    }

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
      {errorMessage != null ? <p className="form-error">{errorMessage}</p> : null}
      <button
        className="primary-button"
        disabled={isPending}
        onClick={() => {
          setErrorMessage(undefined);
          startTransition(async () => {
            const result = await acceptCampaignAction(campaignId);

            if (result.ok) {
              setCurrentStatus("PENDING");
              await queryClient.invalidateQueries({ queryKey: ["blogger", "missions"] });
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
  const queryClient = useQueryClient();
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
        <p>리뷰 URL을 제출했어요. 미션 목록에서 검수 상태를 확인할 수 있어요.</p>
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
              await Promise.all([
                queryClient.invalidateQueries({ queryKey: ["blogger", "missions"] }),
                queryClient.invalidateQueries({ queryKey: ["blogger", "wallet"] }),
              ]);
            } else {
              setErrorMessage(result.message);
            }
          });
        }
      }}
    >
      {errorMessage != null ? <p className="form-error">{errorMessage}</p> : null}
      <label>
        리뷰 URL
        <input
          inputMode="url"
          onChange={(event) => setReviewUrl(event.target.value)}
          placeholder="https://blog.example.com/review 또는 Notion URL"
          type="url"
          value={reviewUrl}
        />
        <span className="field-help">블로그 글 URL이나 공개된 Notion URL을 제출할 수 있어요.</span>
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
      return "승인 대기 중";
    case "ACCEPTED":
      return "승인 완료";
    case "REJECTED":
      return "이번 캠페인에는 선정되지 않았어요";
    case "CANCELLED":
      return "신청 취소";
  }
}
