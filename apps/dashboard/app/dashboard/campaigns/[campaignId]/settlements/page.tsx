import { notFound } from "next/navigation";

import { getCampaignDetail } from "@pacto/api";
import type { Campaign, EscrowLedger } from "@pacto/types";
import { formatKoreanDate, formatPoint, getSettlementStatusView } from "@pacto/utils";

import { getDashboardSession } from "../../../../_lib/session";
import { CampaignStepProgress } from "../_components/campaign-step-progress";

type SettlementsPageProps = {
  params: Promise<{
    campaignId: string;
  }>;
};

export default async function CampaignSettlementsPage({ params }: SettlementsPageProps) {
  const { campaignId } = await params;
  const session = await getDashboardSession();
  const campaign = await getCampaignDetail(Number(campaignId), session.accessToken);

  if (campaign == null) {
    notFound();
  }

  const campaignEscrows = buildMockEscrows(campaign);
  const settlementReadyAmount = campaignEscrows
    .filter((escrow) => escrow.status === "locked")
    .reduce((sum, escrow) => sum + escrow.amount, 0);
  const paidAmount = campaignEscrows
    .filter((escrow) => escrow.status === "paid")
    .reduce((sum, escrow) => sum + escrow.amount, 0);

  return (
    <>
      <header className="campaign-page-header">
        <div className="topbar">
          <div>
            <p className="eyebrow">{campaign.title}</p>
            <h1>정산</h1>
          </div>
        </div>
        <CampaignStepProgress activeStep="settlements" campaignId={campaign.id} />
      </header>

      <section className="summary-grid">
        <article className="summary-card">
          <p>정산 대기</p>
          <strong>{formatPoint(settlementReadyAmount)}</strong>
          <span>최종 승인된 제출물 기준</span>
        </article>
        <article className="summary-card">
          <p>지급 완료</p>
          <strong>{formatPoint(paidAmount)}</strong>
          <span>완료 처리된 정산 금액</span>
        </article>
        <article className="summary-card">
          <p>에스크로 기록</p>
          <strong>{campaignEscrows.length}건</strong>
          <span>이 캠페인 기준</span>
        </article>
      </section>

      <section className="panel">
        <div className="panel-heading">
          <div>
            <h2>정산 내역</h2>
            <p>이 캠페인에 잠긴 금액과 지급 완료 금액을 확인합니다.</p>
          </div>
          <span>{campaignEscrows.length}건</span>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>정산 ID</th>
                <th>블로거</th>
                <th>금액</th>
                <th>상태</th>
                <th>생성일</th>
              </tr>
            </thead>
            <tbody>
              {campaignEscrows.map((escrow) => {
                const statusView = getSettlementStatusView(escrow.status);

                return (
                  <tr key={escrow.id}>
                    <td>#{escrow.id}</td>
                    <td>{escrow.bloggerName}</td>
                    <td>{formatPoint(escrow.amount)}</td>
                    <td>
                      <span className={`status-badge ${statusView.tone}`}>{statusView.label}</span>
                    </td>
                    <td>{formatKoreanDate(escrow.createdAt)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

function buildMockEscrows(campaign: Campaign): EscrowLedger[] {
  return [
    {
      id: campaign.id * 1000 + 1,
      campaignId: campaign.id,
      campaignTitle: campaign.title,
      bloggerName: "감성리뷰어 하루",
      amount: campaign.rewardPoint,
      status: "locked",
      createdAt: "2026-06-05T11:00:00",
    },
    {
      id: campaign.id * 1000 + 2,
      campaignId: campaign.id,
      campaignTitle: campaign.title,
      bloggerName: "라이프로그 수아",
      amount: campaign.rewardPoint,
      status: "paid",
      createdAt: "2026-06-04T14:30:00",
    },
    {
      id: campaign.id * 1000 + 3,
      campaignId: campaign.id,
      campaignTitle: campaign.title,
      bloggerName: "맛집기록 민",
      amount: campaign.rewardPoint,
      status: "locked",
      createdAt: "2026-06-03T09:15:00",
    },
  ];
}
