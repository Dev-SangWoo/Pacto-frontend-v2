import { getCampaigns, getMe } from "@pacto/api";
import { formatKoreanDate, formatPoint, getCampaignStatusView } from "@pacto/utils";

import { getDashboardSession } from "../../_lib/session";

export default async function DashboardCampaignsPage() {
  const session = await getDashboardSession();
  const currentUserId =
    session.userId ??
    (session.accessToken != null
      ? await getMe(session.accessToken)
          .then((user) => user.id)
          .catch(() => undefined)
      : undefined);
  const campaigns = await getCampaigns({}, session.accessToken);
  const myCampaigns =
    currentUserId == null
      ? campaigns
      : campaigns.filter((campaign) => campaign.advertiserId === currentUserId);

  return (
    <>
      <header className="topbar topbar-pro">
        <div>
          <p className="eyebrow">Campaigns</p>
          <h1>캠페인 관리</h1>
          <p className="topbar-copy">
            내 계정으로 만든 캠페인의 모집 상태와 운영 현황을 확인합니다.
          </p>
        </div>
        <a className="primary-link" href="/dashboard/campaigns/new">
          신규 캠페인
        </a>
      </header>

      <section className="panel">
        <div className="panel-heading">
          <div>
            <h2>내 캠페인</h2>
            <p>현재는 전체 캠페인을 받은 뒤 로그인 계정의 광고주 ID로 필터링합니다.</p>
          </div>
          <span>{myCampaigns.length}건</span>
        </div>
        {myCampaigns.length > 0 ? (
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
                {myCampaigns.map((campaign) => {
                  const statusView = getCampaignStatusView(campaign.status);
                  const remainingSlots =
                    campaign.remainingSlots ??
                    Math.max(campaign.recruitCount - campaign.approvedCount, 0);
                  const totalSlots = campaign.totalSlots ?? campaign.recruitCount;

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
                      <td>
                        {remainingSlots}/{totalSlots}명 남음
                      </td>
                      <td>{campaign.applicantCount}명</td>
                      <td>{formatKoreanDate(campaign.deadline)}</td>
                      <td>{formatPoint(campaign.rewardPoint)}</td>
                      <td>
                        <a className="table-action" href={`/dashboard/campaigns/${campaign.id}`}>
                          상세 보기
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <section className="empty-panel">
            <h2>아직 만든 캠페인이 없어요</h2>
            <p>새 캠페인을 등록하면 이 목록에 표시됩니다.</p>
          </section>
        )}
      </section>
    </>
  );
}
