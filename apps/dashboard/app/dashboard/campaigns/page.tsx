import { getCampaigns } from "@pacto/api";
import { formatKoreanDate, formatPoint, getCampaignStatusView } from "@pacto/utils";

export default async function DashboardCampaignsPage() {
  const campaigns = await getCampaigns();

  return (
    <>
      <header className="topbar">
        <div>
          <p className="eyebrow">Campaigns</p>
          <h1>캠페인 관리</h1>
        </div>
        <a className="primary-link" href="/dashboard/campaigns/new">
          신규 캠페인
        </a>
      </header>

      <section className="panel">
        <div className="panel-heading">
          <div>
            <h2>전체 캠페인</h2>
            <p>모집 상태와 운영 지표를 기준으로 캠페인을 관리합니다.</p>
          </div>
          <span>{campaigns.length}건</span>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>캠페인</th>
                <th>상태</th>
                <th>모집</th>
                <th>지원자</th>
                <th>마감일</th>
                <th>보상</th>
                <th>액션</th>
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
                      <span className={`status-badge ${statusView.tone}`}>{statusView.label}</span>
                    </td>
                    <td>
                      {campaign.approvedCount}/{campaign.recruitCount}명
                    </td>
                    <td>{campaign.applicantCount}명</td>
                    <td>{formatKoreanDate(campaign.deadline)}</td>
                    <td>{formatPoint(campaign.rewardPoint)}</td>
                    <td>
                      <a className="table-action" href={`/dashboard/campaigns/${campaign.id}`}>
                        상세
                      </a>
                    </td>
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
