import { notFound } from "next/navigation";

import { getCampaignDetail } from "@pacto/api";

import { CampaignStepProgress } from "../_components/campaign-step-progress";

const applicants = [
  { id: 1, name: "김하린", blogUrl: "blog.naver.com/harin", status: "승인 대기", fitScore: "높음" },
  { id: 2, name: "이도윤", blogUrl: "blog.naver.com/doyoon", status: "승인됨", fitScore: "보통" },
  { id: 3, name: "박서아", blogUrl: "blog.naver.com/seoa", status: "반려 검토", fitScore: "낮음" },
];

type ApplicantsPageProps = {
  params: Promise<{
    campaignId: string;
  }>;
};

export default async function ApplicantsPage({ params }: ApplicantsPageProps) {
  const { campaignId } = await params;
  const campaign = await getCampaignDetail(Number(campaignId));

  if (campaign == null) {
    notFound();
  }

  return (
    <>
      <header className="campaign-page-header">
        <div className="topbar">
          <div>
            <p className="eyebrow">{campaign.title}</p>
            <h1>지원자 관리</h1>
          </div>
        </div>
        <CampaignStepProgress activeStep="applicants" campaignId={campaign.id} />
      </header>

      <section className="panel">
        <div className="panel-heading">
          <div>
            <h2>지원자 목록</h2>
            <p>지원자를 승인하거나 반려해서 미션 수행 대상을 확정합니다.</p>
          </div>
          <span>{applicants.length}명</span>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>블로거</th>
                <th>블로그 URL</th>
                <th>상태</th>
                <th>예상 적합도</th>
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
                    <span className="status-badge blue">{applicant.status}</span>
                  </td>
                  <td>{applicant.fitScore}</td>
                  <td>
                    <div className="action-row">
                      <button className="small-button" type="button">
                        승인
                      </button>
                      <button className="small-button muted" type="button">
                        반려
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
