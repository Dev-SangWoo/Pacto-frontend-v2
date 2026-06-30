"use client";

import { useActionState } from "react";

import type { CampaignStatus } from "@pacto/types";

import {
  transitionCampaignAction,
  type CampaignTransitionState,
} from "../../../_actions/campaign-actions";

type CampaignTransitionActionsProps = {
  campaignId: number;
  redirectTo: string;
  selectedCount?: number;
  status: CampaignStatus;
  variant?: "compact" | "panel";
};

type CampaignTransitionButton = {
  action: "cancel" | "close" | "complete" | "proceed";
  className: string;
  confirmMessage: string;
  label: string;
};

const initialState: CampaignTransitionState = {};

export function CampaignTransitionActions({
  campaignId,
  redirectTo,
  selectedCount = 0,
  status,
  variant = "panel",
}: CampaignTransitionActionsProps) {
  const [state, formAction, isPending] = useActionState(
    transitionCampaignAction.bind(null, campaignId),
    initialState,
  );
  const buttons = getTransitionButtons(status, selectedCount);
  const emptySelectionMessage =
    status === "closed" && selectedCount <= 0
      ? "선정된 블로거가 없어 진행할 미션이 없습니다. 현재 백엔드 정책상 빈 캠페인은 진행 전환 대신 취소로 정리해 주세요."
      : undefined;

  if (buttons.length === 0 && emptySelectionMessage == null) {
    return null;
  }

  return (
    <form
      action={formAction}
      className={`campaign-transition-actions ${variant}`}
      onSubmit={(event) => {
        const submitter = event.nativeEvent.submitter;

        if (!(submitter instanceof HTMLButtonElement)) {
          return;
        }

        const message = submitter.dataset.confirmMessage;

        if (message != null && !window.confirm(message)) {
          event.preventDefault();
        }
      }}
    >
      <input name="redirectTo" type="hidden" value={redirectTo} />
      {emptySelectionMessage != null ? (
        <span
          aria-label={emptySelectionMessage}
          className="campaign-transition-note"
          data-tooltip={emptySelectionMessage}
          role="note"
          tabIndex={0}
        >
          i
        </span>
      ) : null}
      {buttons.map((button) => (
        <button
          className={button.className}
          data-confirm-message={button.confirmMessage}
          disabled={isPending}
          key={button.action}
          name="action"
          type="submit"
          value={button.action}
        >
          {button.label}
        </button>
      ))}
      {state.message != null ? <p className="form-error inline-error">{state.message}</p> : null}
    </form>
  );
}

function getTransitionButtons(
  status: CampaignStatus,
  selectedCount: number,
): CampaignTransitionButton[] {
  if (status === "open") {
    return [
      {
        action: "close",
        className: "small-button",
        confirmMessage:
          "모집을 마감하고 최종 선정 단계로 전환할까요? 신규 신청은 더 이상 받을 수 없습니다.",
        label: "모집 마감",
      },
      {
        action: "cancel",
        className: "small-button muted danger",
        confirmMessage: "캠페인을 취소할까요? 이 작업은 운영 흐름에 영향을 줍니다.",
        label: "취소",
      },
    ];
  }

  if (status === "closed") {
    if (selectedCount <= 0) {
      return [
        {
          action: "cancel",
          className: "small-button muted danger",
          confirmMessage: "선정된 블로거가 없는 캠페인을 취소할까요? 남은 예산은 환불됩니다.",
          label: "취소",
        },
      ];
    }

    return [
      {
        action: "proceed",
        className: "small-button",
        confirmMessage:
          "선정을 확정하고 미션 진행 단계로 전환할까요? 대기 중인 신청은 반려되고 남은 예산은 환불됩니다.",
        label: "미션 진행",
      },
      {
        action: "cancel",
        className: "small-button muted danger",
        confirmMessage: "캠페인을 취소할까요? 이 작업은 운영 흐름에 영향을 줍니다.",
        label: "취소",
      },
    ];
  }

  return [];
}
