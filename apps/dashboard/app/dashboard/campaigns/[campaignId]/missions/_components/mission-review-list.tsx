"use client";

import { useState } from "react";

import type { Mission } from "@pacto/types";
import { formatKoreanDate, getMissionStatusView } from "@pacto/utils";

type MissionReviewListProps = {
  campaignId: number;
  initialMissions: Mission[];
};

export function MissionReviewList({
  campaignId: _campaignId,
  initialMissions,
}: MissionReviewListProps) {
  const [missions, setMissions] = useState<Mission[]>(initialMissions);
  const [isLoading, setIsLoading] = useState(false);

  const handleApprove = (missionId: number) => {
    setIsLoading(true);
    setMissions((prev) =>
      prev.map((mission) =>
        mission.id === missionId ? { ...mission, status: "approved" } : mission,
      ),
    );
    setIsLoading(false);
  };

  const handleReject = (missionId: number) => {
    setIsLoading(true);
    setMissions((prev) =>
      prev.map((mission) =>
        mission.id === missionId ? { ...mission, status: "rejected" } : mission,
      ),
    );
    setIsLoading(false);
  };

  return (
    <section className="panel">
      <div className="panel-heading">
        <div>
          <h2>제출물 검수</h2>
          <p>제출 URL을 확인하고 승인 또는 반려 처리합니다.</p>
        </div>
        <span>{missions.length}건</span>
      </div>
      <div className="review-list">
        {missions.length > 0 ? (
          missions.map((mission) => {
            const statusView = getMissionStatusView(mission.status);

            return (
              <article className="review-item" key={mission.id}>
                <div>
                  <span className={`status-badge ${statusView.tone}`}>{statusView.label}</span>
                  <h2>
                    {mission.brandName} (ID: {mission.id})
                  </h2>
                  <p>{formatKoreanDate(mission.dueDate)}까지 제출</p>
                  <div>
                    <strong>{mission.submittedUrl ?? "제출 URL 대기 중"}</strong>
                  </div>
                </div>
                <div className="action-row">
                  {mission.status === "submitted" ? (
                    <button
                      className="small-button"
                      disabled={isLoading}
                      onClick={() => handleApprove(mission.id)}
                      type="button"
                    >
                      승인
                    </button>
                  ) : null}
                  <button
                    className="small-button muted"
                    disabled={isLoading}
                    onClick={() => handleReject(mission.id)}
                    type="button"
                  >
                    반려
                  </button>
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
