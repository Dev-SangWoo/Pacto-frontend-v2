import { notFound } from "next/navigation";

import { getCampaignDetail, getMyEscrows, getMyMissions } from "@pacto/api";
import { formatKoreanDate, formatPoint, getSettlementStatusView } from "@pacto/utils";

import { CampaignStepProgress } from "../_components/campaign-step-progress";

type SettlementsPageProps = {
  params: Promise<{
    campaignId: string;
  }>;
};

export default async function CampaignSettlementsPage({ params }: SettlementsPageProps) {
  const { campaignId } = await params;
  const campaign = await getCampaignDetail(Number(campaignId));

  if (campaign == null) {
    notFound();
  }

  const [escrows, missions] = await Promise.all([getMyEscrows(), getMyMissions()]);
  const campaignEscrows = escrows.filter((escrow) => escrow.campaignId === campaign.id);
  const approvedMissions = missions.filter(
    (mission) => mission.campaignId === campaign.id && mission.status === "approved",
  );
  const settlementReadyAmount = approvedMissions.reduce(
    (sum, mission) => sum + mission.rewardPoint,
    0,
  );

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
          <p>정산 가능</p>
          <strong>{formatPoint(settlementReadyAmount)}</strong>
          <span>미션 최종 승인 기준</span>
        </article>
        <article className="summary-card">
          <p>승인된 제출물</p>
          <strong>{approvedMissions.length}건</strong>
          <span>정산 대상</span>
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
            <p>이 캠페인에서 잠긴 금액과 지급 완료 금액을 확인합니다.</p>
          </div>
          <span>{campaignEscrows.length}건</span>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>정산 ID</th>
                <th>캠페인</th>
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
                    <td>{campaign.title}</td>
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
