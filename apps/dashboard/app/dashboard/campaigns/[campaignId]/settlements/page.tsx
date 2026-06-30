import { notFound } from "next/navigation";

import { getCampaignDetail, getCampaignEscrows, getCampaignMissions } from "@pacto/api";
import type { EscrowLedger, Mission, SettlementStatus } from "@pacto/types";
import { formatKoreanDate, formatPoint, getSettlementStatusView } from "@pacto/utils";

import { getDashboardSession } from "../../../../_lib/session";
import { isOwnedCampaign } from "../../_lib/campaign-ownership";
import { CampaignStepProgress } from "../_components/campaign-step-progress";

type SettlementsPageProps = {
  params: Promise<{
    campaignId: string;
  }>;
};

type SettlementRow = {
  amount: number;
  bloggerName: string;
  createdAt: string;
  id: number;
  missionStatus?: Mission["status"];
  status: SettlementStatus;
};

export default async function CampaignSettlementsPage({ params }: SettlementsPageProps) {
  const { campaignId } = await params;
  const session = await getDashboardSession();
  const campaign = await getCampaignDetail(Number(campaignId), session.accessToken);

  if (campaign == null || !(await isOwnedCampaign(campaign, session))) {
    notFound();
  }

  const [escrows, missions] = await Promise.all([
    getCampaignEscrows(Number(campaignId), session.accessToken).catch(() => []),
    getCampaignMissions(Number(campaignId), session.accessToken).catch(() => []),
  ]);
  const settlementRows =
    escrows.length > 0 ? escrows.map(toEscrowSettlementRow) : missions.map(toMissionSettlementRow);
  const lockedAmount = settlementRows
    .filter((row) => row.status === "locked")
    .reduce((sum, row) => sum + row.amount, 0);
  const paidAmount = settlementRows
    .filter((row) => row.status === "paid")
    .reduce((sum, row) => sum + row.amount, 0);
  const cancelledAmount = settlementRows
    .filter((row) => row.status === "cancelled")
    .reduce((sum, row) => sum + row.amount, 0);

  return (
    <>
      <header className="campaign-page-header">
        <div className="topbar">
          <div>
            <p className="eyebrow">{campaign.title}</p>
            <h1>정산 추적</h1>
            <p className="topbar-copy">
              지원자를 승인하면 1명분 보상액이 광고주 지갑에서 에스크로로 잠기고, 미션을 승인하면
              블로거의 출금 가능 잔액으로 지급됩니다.
            </p>
          </div>
        </div>
        <CampaignStepProgress activeStep="settlements" campaignId={campaign.id} />
      </header>

      <section className="summary-grid">
        <article className="summary-card">
          <p>에스크로 잠금</p>
          <strong>{formatPoint(lockedAmount)}</strong>
          <span>승인된 지원자 중 미션 정산 전 금액</span>
        </article>
        <article className="summary-card">
          <p>지급 완료</p>
          <strong>{formatPoint(paidAmount)}</strong>
          <span>미션 승인으로 블로거에게 지급된 금액</span>
        </article>
        <article className="summary-card">
          <p>취소/환불</p>
          <strong>{formatPoint(cancelledAmount)}</strong>
          <span>취소 처리되어 잠금 해제된 금액</span>
        </article>
      </section>

      <section className="panel">
        <div className="panel-heading">
          <div>
            <h2>미션별 정산 상태</h2>
            <p>
              캠페인별 에스크로 내역을 우선 표시하고, 아직 응답이 없으면 미션 상태를 기준으로 정산
              흐름을 보조 표시합니다.
            </p>
          </div>
          <span>{settlementRows.length}건</span>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>미션 ID</th>
                <th>블로거</th>
                <th>금액</th>
                <th>정산 상태</th>
                <th>미션 상태</th>
                <th>기준일</th>
              </tr>
            </thead>
            <tbody>
              {settlementRows.length > 0 ? (
                settlementRows.map((row) => {
                  const statusView = getSettlementStatusView(row.status);

                  return (
                    <tr key={row.id}>
                      <td>#{row.id}</td>
                      <td>{row.bloggerName}</td>
                      <td>{formatPoint(row.amount)}</td>
                      <td>
                        <span className={`status-badge ${statusView.tone}`}>
                          {statusView.label}
                        </span>
                      </td>
                      <td>
                        {row.missionStatus == null
                          ? "에스크로 기준"
                          : getMissionStatusLabel(row.missionStatus)}
                      </td>
                      <td>{formatKoreanDate(row.createdAt)}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6}>승인된 지원자 또는 생성된 미션이 아직 없습니다.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

function toEscrowSettlementRow(escrow: EscrowLedger): SettlementRow {
  return {
    amount: escrow.amount,
    bloggerName: escrow.bloggerName ?? `에스크로 #${escrow.id}`,
    createdAt: escrow.createdAt,
    id: escrow.id,
    status: escrow.status,
  };
}

function toMissionSettlementRow(mission: Mission): SettlementRow {
  return {
    amount: mission.rewardPoint,
    bloggerName: `블로거 #${mission.bloggerId}`,
    createdAt: mission.settledAt ?? mission.dueDate,
    id: mission.id,
    missionStatus: mission.status,
    status: mapMissionToSettlementStatus(mission.status),
  };
}

function mapMissionToSettlementStatus(status: Mission["status"]): SettlementStatus {
  switch (status) {
    case "approved":
      return "paid";
    case "cancelled":
      return "cancelled";
    case "in_progress":
    case "submitted":
    case "rejected":
      return "locked";
  }
}

function getMissionStatusLabel(status: Mission["status"]) {
  switch (status) {
    case "in_progress":
      return "진행 중";
    case "submitted":
      return "검토 대기";
    case "approved":
      return "승인 완료";
    case "rejected":
      return "반려";
    case "cancelled":
      return "취소";
  }
}
