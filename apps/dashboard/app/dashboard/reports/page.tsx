import { getCampaigns } from "@pacto/api";

export default async function ReportsPage() {
  const campaigns = await getCampaigns();
  const totalRecruit = campaigns.reduce((sum, campaign) => sum + campaign.recruitCount, 0);
  const totalApproved = campaigns.reduce((sum, campaign) => sum + campaign.approvedCount, 0);
  const submitRate = Math.round((totalApproved / totalRecruit) * 100);

  return (
    <>
      <header className="topbar">
        <div>
          <p className="eyebrow">Reports</p>
          <h1>성과 리포트</h1>
        </div>
      </header>

      <section className="summary-grid">
        <article className="summary-card">
          <p>미션 진행률</p>
          <strong>{submitRate}%</strong>
          <span>승인 인원 기준</span>
        </article>
        <article className="summary-card">
          <p>운영 캠페인</p>
          <strong>{campaigns.length}건</strong>
          <span>mock-first 데이터</span>
        </article>
        <article className="summary-card">
          <p>승인 블로거</p>
          <strong>{totalApproved}명</strong>
          <span>전체 모집 {totalRecruit}명</span>
        </article>
      </section>

      <section className="panel">
        <div className="panel-heading">
          <div>
            <h2>리포트 메모</h2>
            <p>광고주용 상세 리포트 API 추가 전까지 핵심 수치 중심으로 노출합니다.</p>
          </div>
        </div>
        <div className="panel-body">
          <p>캠페인별 모집, 승인, 미션 제출, 정산 상태를 연결하면 광고주 제한 View와 같은 지표를 재사용할 수 있습니다.</p>
        </div>
      </section>
    </>
  );
}
