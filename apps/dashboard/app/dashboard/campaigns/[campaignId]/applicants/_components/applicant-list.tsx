"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { ExternalLink, UserCircle } from "lucide-react";

import type { CampaignApplicant } from "@pacto/types";
import { getApplicationStatusView } from "@pacto/utils";

import {
  approveApplicantAction,
  rejectApplicantAction,
} from "../../../../../_actions/campaign-actions";

type ApplicantListProps = {
  campaignId: number;
  initialApplicants: CampaignApplicant[];
};

export function ApplicantList({ campaignId, initialApplicants }: ApplicantListProps) {
  const [applicants, setApplicants] = useState<CampaignApplicant[]>(initialApplicants);
  const [selectedApplicantId, setSelectedApplicantId] = useState<number | undefined>(
    initialApplicants[0]?.applicationId,
  );
  const [isApprovingAll, startApproveAllTransition] = useTransition();
  const router = useRouter();
  const selectedApplicant =
    applicants.find((applicant) => applicant.applicationId === selectedApplicantId) ??
    applicants[0];
  const pendingCount = applicants.filter((applicant) => applicant.status === "PENDING").length;
  const acceptedCount = applicants.filter((applicant) => applicant.status === "ACCEPTED").length;
  const rejectedCount = applicants.filter((applicant) => applicant.status === "REJECTED").length;

  const handleApprove = async (applicantId: number) => {
    const result = await approveApplicantAction(campaignId, applicantId);

    if (result.ok) {
      setApplicants((prev) =>
        prev.map((applicant) =>
          applicant.applicationId === applicantId
            ? { ...applicant, status: "ACCEPTED" }
            : applicant,
        ),
      );
    } else {
      alert(result.message);
    }
  };

  const handleReject = async (applicantId: number) => {
    const result = await rejectApplicantAction(campaignId, applicantId);

    if (result.ok) {
      setApplicants((prev) =>
        prev.map((applicant) =>
          applicant.applicationId === applicantId
            ? { ...applicant, status: "REJECTED" }
            : applicant,
        ),
      );
    } else {
      alert(result.message);
    }
  };

  const handleApproveAll = () => {
    const pendingApplicants = applicants.filter((applicant) => applicant.status === "PENDING");

    startApproveAllTransition(async () => {
      for (const applicant of pendingApplicants) {
        const result = await approveApplicantAction(campaignId, applicant.applicationId);

        if (!result.ok) {
          alert(result.message);
          return;
        }

        setApplicants((prev) =>
          prev.map((item) =>
            item.applicationId === applicant.applicationId ? { ...item, status: "ACCEPTED" } : item,
          ),
        );
      }

      router.push(`/dashboard/campaigns/${campaignId}/missions`);
    });
  };

  return (
    <section className="panel">
      <div className="panel-heading">
        <div>
          <h2>지원자 심사</h2>
          <p>왼쪽에서 지원자를 선택하고 오른쪽 패널에서 승인 여부를 결정합니다.</p>
        </div>
        <div className="panel-actions">
          <span>{applicants.length}명</span>
          <button
            className="primary-button"
            disabled={
              isApprovingAll || applicants.every((applicant) => applicant.status !== "PENDING")
            }
            onClick={handleApproveAll}
            type="button"
          >
            {isApprovingAll
              ? "\uc2b9\uc778 \ucc98\ub9ac \uc911..."
              : "\uc804\uccb4 \uc2b9\uc778 \ud6c4 \ub2e4\uc74c \ub2e8\uacc4"}
          </button>
        </div>
      </div>
      <div className="applicant-review-summary" aria-label="지원자 상태 요약">
        <div>
          <span>승인 대기</span>
          <strong>{pendingCount}명</strong>
        </div>
        <div>
          <span>승인 완료</span>
          <strong>{acceptedCount}명</strong>
        </div>
        <div>
          <span>반려</span>
          <strong>{rejectedCount}명</strong>
        </div>
      </div>

      <div className="applicant-review-shell">
        <div className="applicant-list-panel" aria-label="지원자 목록">
          {applicants.length > 0 ? (
            applicants.map((applicant) => (
              <button
                className={
                  applicant.applicationId === selectedApplicant?.applicationId
                    ? "applicant-list-item active"
                    : "applicant-list-item"
                }
                key={applicant.applicationId}
                onClick={() => setSelectedApplicantId(applicant.applicationId)}
                type="button"
              >
                <span className="applicant-avatar" aria-hidden="true">
                  <UserCircle size={22} strokeWidth={2.2} />
                </span>
                <span>
                  <strong>{applicant.bloggerName}</strong>
                  <em>#{applicant.applicationId}</em>
                </span>
                <ApplicationStatusBadge status={applicant.status} />
              </button>
            ))
          ) : (
            <div className="applicant-empty-state">
              <strong>아직 지원자가 없어요</strong>
              <p>신청자가 생기면 이곳에서 심사할 수 있습니다.</p>
            </div>
          )}
        </div>

        <aside className="applicant-detail-panel" aria-label="선택한 지원자 상세">
          {selectedApplicant != null ? (
            <>
              <div className="applicant-detail-header">
                <span className="applicant-detail-avatar" aria-hidden="true">
                  <UserCircle size={32} strokeWidth={2.1} />
                </span>
                <div>
                  <p>선택한 지원자</p>
                  <h2>{selectedApplicant.bloggerName}</h2>
                </div>
                <ApplicationStatusBadge status={selectedApplicant.status} />
              </div>

              <div className="applicant-detail-grid">
                <div>
                  <span>지원자 ID</span>
                  <strong>#{selectedApplicant.applicationId}</strong>
                </div>
                <div>
                  <span>블로거 ID</span>
                  <strong>#{selectedApplicant.bloggerId}</strong>
                </div>
                <div>
                  <span>신청일</span>
                  <strong>{formatKoreanDate(selectedApplicant.appliedAt)}</strong>
                </div>
                <div>
                  <span>상태</span>
                  <strong>{getApplicationStatusView(selectedApplicant.status).label}</strong>
                </div>
              </div>

              <div className="applicant-blog-card">
                <span>블로그 URL</span>
                {selectedApplicant.blogUrl != null ? (
                  <a href={selectedApplicant.blogUrl} rel="noreferrer" target="_blank">
                    {selectedApplicant.blogUrl}
                    <ExternalLink size={15} strokeWidth={2.2} />
                  </a>
                ) : (
                  <strong>백엔드 응답에 블로그 URL이 아직 포함되지 않았어요</strong>
                )}
              </div>

              <div className="applicant-decision-panel">
                <div>
                  <h3>심사 결정</h3>
                  <p>승인하면 미션 검수 단계로 넘어가고, 반려하면 신청이 종료됩니다.</p>
                </div>
                {selectedApplicant.status === "PENDING" ? (
                  <div className="applicant-decision-actions">
                    <button
                      className="primary-button"
                      onClick={() => handleApprove(selectedApplicant.applicationId)}
                      type="button"
                    >
                      승인
                    </button>
                    <button
                      className="small-button muted danger"
                      onClick={() => handleReject(selectedApplicant.applicationId)}
                      type="button"
                    >
                      반려
                    </button>
                  </div>
                ) : (
                  <span className="applicant-complete-label">처리 완료</span>
                )}
              </div>
            </>
          ) : (
            <div className="applicant-empty-state">
              <strong>선택된 지원자가 없어요</strong>
              <p>왼쪽 목록에서 지원자를 선택해 주세요.</p>
            </div>
          )}
        </aside>
      </div>
    </section>
  );
}

function ApplicationStatusBadge({ status }: { status: CampaignApplicant["status"] }) {
  const statusView = getApplicationStatusView(status);

  return <span className={`status-badge ${statusView.tone}`}>{statusView.label}</span>;
}

function formatKoreanDate(value: string) {
  return new Date(value).toLocaleDateString("ko-KR", {
    month: "long",
    day: "numeric",
  });
}
