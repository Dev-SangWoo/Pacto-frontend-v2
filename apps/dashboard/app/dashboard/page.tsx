import { getCampaigns } from "@pacto/api";
import { formatKoreanDate, formatPoint, getCampaignStatusView } from "@pacto/utils";

const operationQueues = [
  { label: "지원자 승인 대기", count: 32, href: "/dashboard/campaigns/1/applicants" },
  { label: "미션 검수 대기", count: 14, href: "/dashboard/campaigns/1/missions" },
  { label: "정산 실행 가능", count: 3, href: "/dashboard/campaigns/1/settlements" },
];

export default async function DashboardHomePage() {
  const campaigns = await getCampaigns();
  const openCampaignCount = campaigns.filter((campaign) => campaign.status === "open").length;
  const totalApplicants = campaigns.reduce((sum, campaign) => sum + campaign.applicantCount, 0);
  const escrowAmount = campaigns.reduce(
    (sum, campaign) => sum + campaign.rewardPoint * campaign.recruitCount,
    0,
  );

  return (
    <>
      <header className="topbar topbar-pro">
        <div>
          <p className="eyebrow">Agency workspace</p>
          <h1>캠페인 운영 현황</h1>
          <p className="topbar-copy">모집, 검수, 정산 흐름을 한 화면에서 점검합니다.</p>
        </div>
        <a className="primary-link" href="/dashboard/campaigns/new">
          캠페인 등록
        </a>
      </header>

      <section className="summary-grid summary-grid-pro" aria-label="운영 요약">
        <article className="summary-card">
          <p>모집 중 캠페인</p>
          <strong>{openCampaignCount}건</strong>
          <span>오늘 확인 필요</span>
        </article>
        <article className="summary-card">
          <p>누적 지원자</p>
          <strong>{totalApplicants}명</strong>
          <span>승인/반려 대기 포함</span>
        </article>
        <article className="summary-card emphasis">
          <p>예치 예정 총액</p>
          <strong>{formatPoint(escrowAmount)}</strong>
          <span>캠페인 보상 기준</span>
        </article>
      </section>

      <section className="content-grid">
        <article className="panel campaign-panel">
          <div className="panel-heading">
            <div>
              <h2>캠페인 운영 테이블</h2>
              <p>상태, 지원자, 승인 인원, 보상 금액을 기준으로 우선순위를 판단합니다.</p>
            </div>
            <a href="/dashboard/campaigns">전체 보기</a>
          </div>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>캠페인</th>
                  <th>상태</th>
                  <th>지원자</th>
                  <th>승인</th>
                  <th>마감</th>
                  <th>보상</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((campaign) => {
                  const statusView = getCampaignStatusView(campaign.status);

                  return (
                    <tr key={campaign.id}>
                      <td>
                        <strong>{campaign.title}</strong>
                        <span>{campaign.brandName}</span>
                      </td>
                      <td>
                        <span className={`status-badge ${statusView.tone}`}>
                          {statusView.label}
                        </span>
                      </td>
                      <td>{campaign.applicantCount}명</td>
                      <td>
                        {campaign.approvedCount}/{campaign.recruitCount}명
                      </td>
                      <td>{formatKoreanDate(campaign.deadline)}</td>
                      <td>{formatPoint(campaign.rewardPoint)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </article>

        <aside className="panel queue-panel" aria-labelledby="queue-title">
          <div className="panel-heading compact">
            <div>
              <h2 id="queue-title">오늘의 운영 큐</h2>
              <p>처리가 늦어지면 정산도 밀립니다.</p>
            </div>
            <span>우선 처리</span>
          </div>
          <div className="queue-list">
            {operationQueues.map((queue) => (
              <a href={queue.href} key={queue.label}>
                <span>{queue.label}</span>
                <strong>{queue.count}건</strong>
              </a>
            ))}
          </div>
        </aside>
      </section>
    </>
  );
}
