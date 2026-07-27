"use client";

import { useQueryClient } from "@tanstack/react-query";
import type { ApplicationStatusResponse, CampaignStatus, MissionStatus } from "@pacto/types";
import Link from "next/link";
import { useState, useTransition } from "react";
import { createPortal } from "react-dom";

import {
  acceptCampaignAction,
  cancelCampaignApplicationAction,
  submitMissionAction,
} from "../_actions/blogger-actions";
import { FlowCompletion } from "./flow-completion";

type CampaignApplyActionProps = {
  applicationId?: number;
  applicationStatus?: ApplicationStatusResponse;
  campaignStatus: CampaignStatus;
  campaignId: number;
  enabled: boolean;
  missionId?: number;
  missionStatus?: MissionStatus;
};

export function CampaignApplyAction({
  applicationId,
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
  const [isCancelConfirming, setIsCancelConfirming] = useState(false);
  const [isApplicationComplete, setIsApplicationComplete] = useState(false);
  const [isPending, startTransition] = useTransition();

  if (isApplicationComplete) {
    return (
      <FlowCompletion
        actions={
          <>
            <Link className="primary-button" href="/missions">
              신청 상태 확인하기
            </Link>
            <Link className="text-link-button" href="/campaigns">
              다른 캠페인 보기
            </Link>
          </>
        }
        description="광고주가 신청 내용을 확인하면 선정 결과를 알려드릴게요."
        eyebrow="캠페인 신청 완료"
        title="신청이 완료되었습니다!"
        variant="compact"
      />
    );
  }

  if (currentStatus != null) {
    if (currentStatus === "PENDING") {
      return (
        <div className="cta-stack">
          {errorMessage != null ? <p className="form-error">{errorMessage}</p> : null}
          <button className="primary-button weak-button" disabled type="button">
            지원 완료 · 선정 대기 중
          </button>
          {applicationId != null ? (
            <>
              <button
                className="text-link-button application-cancel-button"
                onClick={() => setIsCancelConfirming(true)}
                type="button"
              >
                지원 취소
              </button>
              {isCancelConfirming
                ? createPortal(
                    <div
                      className="application-cancel-modal-backdrop"
                      onClick={() => {
                        if (!isPending) {
                          setIsCancelConfirming(false);
                        }
                      }}
                    >
                      <section
                        aria-labelledby="application-cancel-title"
                        aria-modal="true"
                        className="application-cancel-modal"
                        onClick={(event) => event.stopPropagation()}
                        role="dialog"
                      >
                        <h2 id="application-cancel-title">지원 취소할까요?</h2>
                        <p>지원 취소 후에는 다시 신청하지 못할 수 있어요.</p>
                        <div>
                          <button
                            className="application-cancel-confirm-button"
                            disabled={isPending}
                            onClick={() => {
                              setErrorMessage(undefined);
                              startTransition(async () => {
                                const result = await cancelCampaignApplicationAction(
                                  applicationId,
                                  campaignId,
                                );

                                if (result.ok) {
                                  setCurrentStatus("CANCELLED");
                                  setIsCancelConfirming(false);
                                  await queryClient.invalidateQueries({
                                    queryKey: ["blogger", "missions"],
                                  });
                                } else {
                                  setErrorMessage(result.message);
                                }
                              });
                            }}
                            type="button"
                          >
                            {isPending ? "취소 중..." : "지원 취소하기"}
                          </button>
                          <button
                            className="application-cancel-dismiss-button"
                            disabled={isPending}
                            onClick={() => setIsCancelConfirming(false)}
                            type="button"
                          >
                            유지하기
                          </button>
                        </div>
                      </section>
                    </div>,
                    document.body,
                  )
                : null}
            </>
          ) : null}
        </div>
      );
    }

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
              setIsApplicationComplete(true);
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
      <FlowCompletion
        actions={
          <Link className="primary-button" href="/missions">
            내 미션으로 돌아가기
          </Link>
        }
        description="제출한 리뷰를 검수하면 상태가 업데이트되고 알림으로 알려드릴게요."
        eyebrow="리뷰 제출 완료"
        title="미션 제출이 완료되었습니다!"
        variant="compact"
      />
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
