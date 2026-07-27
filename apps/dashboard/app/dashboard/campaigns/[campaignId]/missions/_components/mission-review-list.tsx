"use client";

import { useState } from "react";
import { ExternalLink } from "lucide-react";

import type { Mission } from "@pacto/types";
import { formatKoreanDate, getMissionStatusView } from "@pacto/utils";

import {
  approveMissionAction,
  rejectMissionAction,
} from "../../../../../_actions/campaign-actions";

type MissionReviewListProps = {
  campaignId: number;
  initialMissions: Mission[];
};

export function MissionReviewList({ campaignId, initialMissions }: MissionReviewListProps) {
  const [missions, setMissions] = useState<Mission[]>(initialMissions);
  const [isLoading, setIsLoading] = useState(false);

  const handleApprove = async (missionId: number) => {
    if (!confirm("이 미션을 승인하시겠습니까?")) return;

    setIsLoading(true);
    const result = await approveMissionAction(campaignId, missionId);

    if (result.ok) {
      setMissions((prev) =>
        prev.map((mission) =>
          mission.id === missionId ? { ...mission, status: "approved" } : mission,
        ),
      );
    } else {
      alert(result.message);
    }
    setIsLoading(false);
  };

  const handleReject = async (missionId: number) => {
    if (!confirm("이 미션을 반려하시겠습니까?")) return;

    setIsLoading(true);
    const result = await rejectMissionAction(campaignId, missionId);

    if (result.ok) {
      setMissions((prev) =>
        prev.map((mission) =>
          mission.id === missionId ? { ...mission, status: "rejected" } : mission,
        ),
      );
    } else {
      alert(result.message);
    }
    setIsLoading(false);
  };

  return (
    <section className="panel">
      <div className="panel-heading">
        <div>
          <h2>제출물 검수</h2>
          <p>제출 URL을 확인하고 승인 또는 반려 처리합니다.</p>
        </div>
        <span>{missions.length}</span>
      </div>
      <div className="review-list">
        {missions.length > 0 ? (
          missions.map((mission) => {
            const statusView = getMissionStatusView(mission.status);
            const submittedUrl = getExternalUrl(mission.submittedUrl);

            return (
              <article className="review-item" key={mission.id}>
                <div>
                  <span className={`status-badge ${statusView.tone}`}>{statusView.label}</span>
                  <h2>
                    {mission.brandName} (ID: {mission.id})
                  </h2>
                  <p>{formatKoreanDate(mission.dueDate)}까지 제출</p>
                  <div>
                    {submittedUrl != null ? (
                      <a
                        className="submitted-url-link"
                        href={submittedUrl}
                        rel="noreferrer"
                        target="_blank"
                      >
                        <span>{submittedUrl}</span>
                        <ExternalLink aria-hidden="true" size={15} strokeWidth={2.2} />
                      </a>
                    ) : (
                      <strong>{mission.submittedUrl ?? "제출 URL 대기 중"}</strong>
                    )}
                  </div>
                </div>
                <div className="action-row">
                  {mission.status === "submitted" ? (
                    <>
                      <button
                        className="small-button"
                        disabled={isLoading}
                        onClick={() => handleApprove(mission.id)}
                        type="button"
                      >
                        승인
                      </button>
                      <button
                        className="small-button muted"
                        disabled={isLoading}
                        onClick={() => handleReject(mission.id)}
                        type="button"
                      >
                        반려
                      </button>
                    </>
                  ) : null}
                </div>
              </article>
            );
          })
        ) : (
          <div className="empty-panel">검수할 미션이 없습니다.</div>
        )}
      </div>
    </section>
  );
}

function getExternalUrl(value?: string | null) {
  const url = value?.trim();
  if (url == null || url.length === 0) {
    return undefined;
  }

  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:" ? url : undefined;
  } catch {
    return undefined;
  }
}
