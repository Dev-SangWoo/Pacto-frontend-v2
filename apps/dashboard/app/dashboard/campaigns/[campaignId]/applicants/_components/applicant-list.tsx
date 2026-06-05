"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import type { Applicant } from "@pacto/types";

type ApplicantListProps = {
  campaignId: number;
  initialApplicants: Applicant[];
};

export function ApplicantList({ campaignId, initialApplicants }: ApplicantListProps) {
  const [applicants, setApplicants] = useState<Applicant[]>(initialApplicants);
  const router = useRouter();

  const handleApprove = (applicantId: number) => {
    setApplicants((prev) =>
      prev.map((applicant) =>
        applicant.id === applicantId ? { ...applicant, status: "approved" } : applicant,
      ),
    );
  };

  const handleReject = (applicantId: number) => {
    setApplicants((prev) =>
      prev.map((applicant) =>
        applicant.id === applicantId ? { ...applicant, status: "rejected" } : applicant,
      ),
    );
  };

  const handleApproveAll = () => {
    setApplicants((prev) => prev.map((applicant) => ({ ...applicant, status: "approved" })));
    router.push(`/dashboard/campaigns/${campaignId}/missions`);
  };

  return (
    <section className="panel">
      <div className="panel-heading">
        <div>
          <h2>지원자 목록</h2>
          <p>지원자 API가 연결되기 전까지 목업 데이터로 승인/반려 흐름을 확인합니다.</p>
        </div>
        <div className="panel-actions">
          <span>{applicants.length}명</span>
          <button className="primary-button" onClick={handleApproveAll} type="button">
            전체 승인 후 다음 단계
          </button>
        </div>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>블로거</th>
              <th>블로그 URL</th>
              <th>상태</th>
              <th>예상 적합도</th>
              <th>신청일</th>
              <th>액션</th>
            </tr>
          </thead>
          <tbody>
            {applicants.map((applicant) => (
              <tr key={applicant.id}>
                <td>
                  <strong>{applicant.name}</strong>
                  <span>지원 #{applicant.id}</span>
                </td>
                <td>{applicant.blogUrl}</td>
                <td>
                  <span className={`status-badge ${getApplicantStatusTone(applicant.status)}`}>
                    {getApplicantStatusLabel(applicant.status)}
                  </span>
                </td>
                <td>{applicant.fitScore}</td>
                <td>{new Date(applicant.appliedAt).toLocaleDateString("ko-KR")}</td>
                <td>
                  <div className="action-row">
                    {applicant.status === "pending" ? (
                      <>
                        <button
                          className="small-button"
                          onClick={() => handleApprove(applicant.id)}
                          type="button"
                        >
                          승인
                        </button>
                        <button
                          className="small-button muted"
                          onClick={() => handleReject(applicant.id)}
                          type="button"
                        >
                          반려
                        </button>
                      </>
                    ) : (
                      <span>처리 완료</span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function getApplicantStatusLabel(status: Applicant["status"]) {
  switch (status) {
    case "pending":
      return "승인 대기";
    case "approved":
      return "승인됨";
    case "rejected":
      return "반려됨";
  }
}

function getApplicantStatusTone(status: Applicant["status"]) {
  switch (status) {
    case "pending":
      return "grey";
    case "approved":
      return "blue";
    case "rejected":
      return "red";
  }
}
