import { getCampaigns } from "@pacto/api";
import type { Campaign, CampaignStatus } from "@pacto/types";
import type { LucideIcon } from "lucide-react";
import { CheckCircle2, Megaphone, Rocket, UsersRound } from "lucide-react";
import {
  formatDeadlineDday,
  formatKoreanDate,
  formatPoint,
  getCampaignStatusView,
} from "@pacto/utils";

import { getDashboardSession } from "../../_lib/session";
import { filterOwnedCampaigns } from "../_lib/owned-campaigns";
import { CampaignTransitionActions } from "./_components/campaign-transition-actions";

type DashboardCampaignsPageProps = {
  searchParams?: Promise<{
    q?: string;
    status?: string;
  }>;
};

const campaignStatusFilters: Array<{ label: string; value: CampaignStatus | "all" }> = [
  { label: "전체", value: "all" },
  { label: "모집 중", value: "open" },
  { label: "모집 마감", value: "closed" },
  { label: "캠페인 진행 중", value: "full" },
  { label: "완료", value: "completed" },
  { label: "취소", value: "cancelled" },
];

const validCampaignStatuses = new Set<CampaignStatus>([
  "draft",
  "open",
  "full",
  "closed",
  "completed",
  "cancelled",
]);

export default async function DashboardCampaignsPage({
  searchParams,
}: DashboardCampaignsPageProps) {
  const params = await searchParams;
  const query = params?.q?.trim() ?? "";
  const activeStatus = normalizeCampaignStatus(params?.status);
  const session = await getDashboardSession();
  const campaigns = await filterOwnedCampaigns(
    await getCampaigns({ page: 0, size: 100, sort: "campaignId,desc" }, session.accessToken),
    session,
  );
  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesStatus = activeStatus === "all" || campaign.status === activeStatus;
    const matchesQuery = matchesCampaignSearch(campaign, query);

    return matchesStatus && matchesQuery;
  });
  const openCount = campaigns.filter((campaign) => campaign.status === "open").length;
  const fullCount = campaigns.filter((campaign) => campaign.status === "full").length;
  const completedCount = campaigns.filter((campaign) => campaign.status === "completed").length;
  const totalApplicants = campaigns.reduce((sum, campaign) => sum + campaign.applicantCount, 0);

  return (
    <>
      <header className="topbar topbar-pro">
        <div>
          <p className="eyebrow">Campaigns</p>
          <h1>캠페인 관리</h1>
          <p className="topbar-copy">
            캠페인의 모집 상태와 운영 현황을 확인하고 필요한 액션을 진행합니다.
          </p>
        </div>
      </header>

      <section className="campaign-management-summary" aria-label="캠페인 운영 요약">
        <SummaryCard
          icon={Megaphone}
          iconTone="blue"
          label="전체 캠페인"
          value={`${campaigns.length}건`}
        >
          생성된 캠페인
        </SummaryCard>
        <SummaryCard icon={Megaphone} iconTone="green" label="모집 중" value={`${openCount}건`}>
          블로거 신청을 받고 있어요
        </SummaryCard>
        <SummaryCard
          icon={Rocket}
          iconTone="yellow"
          label="캠페인 진행 중"
          value={`${fullCount}건`}
        >
          미션 수행과 검수가 진행돼요
        </SummaryCard>
        <SummaryCard
          icon={UsersRound}
          iconTone="blue"
          label="총 지원자"
          value={`${totalApplicants}명`}
        >
          모든 캠페인 누적 지원자
        </SummaryCard>
        <SummaryCard
          icon={CheckCircle2}
          iconTone="green"
          label="완료"
          value={`${completedCount}건`}
        >
          정산까지 마무리된 캠페인
        </SummaryCard>
      </section>

      <section className="panel">
        <div className="panel-heading">
          <div>
            <h2>내 캠페인</h2>
            <p>상태와 모집률을 보면서 다음 액션이 필요한 캠페인을 찾습니다.</p>
          </div>
          <span>{filteredCampaigns.length}건</span>
        </div>

        <div className="campaign-list-toolbar">
          <form className="campaign-search-form" action="/dashboard/campaigns">
            {activeStatus !== "all" ? (
              <input name="status" type="hidden" value={activeStatus} />
            ) : null}
            <input
              aria-label="캠페인 검색"
              defaultValue={query}
              name="q"
              placeholder="캠페인명 또는 브랜드 검색"
              type="search"
            />
            <button type="submit">검색</button>
          </form>
          <nav className="campaign-status-filters" aria-label="캠페인 상태 필터">
            {campaignStatusFilters.map((filter) => (
              <a
                className={filter.value === activeStatus ? "active" : undefined}
                href={getCampaignFilterHref(filter.value, query)}
                key={filter.value}
              >
                {filter.label}
                <span>{getCampaignStatusFilterCount(campaigns, filter.value)}</span>
              </a>
            ))}
          </nav>
        </div>

        {filteredCampaigns.length > 0 ? (
          <div className="table-wrap">
            <table className="campaign-management-table">
              <thead>
                <tr>
                  <th>캠페인</th>
                  <th>상태</th>
                  <th>모집률</th>
                  <th>지원자</th>
                  <th>마감일</th>
                  <th>보상</th>
                  <th>액션</th>
                </tr>
              </thead>
              <tbody>
                {filteredCampaigns.map((campaign) => {
                  const statusView = getCampaignStatusView(campaign.status);
                  const totalSlots = campaign.totalSlots ?? campaign.recruitCount;
                  const approvedSlots = campaign.approvedCount;
                  const remainingSlots =
                    campaign.remainingSlots ?? Math.max(totalSlots - approvedSlots, 0);
                  const isCancelled = campaign.status === "cancelled";
                  const progress = isCancelled ? 0 : getRecruitProgress(approvedSlots, totalSlots);

                  return (
                    <tr key={campaign.id}>
                      <td>
                        <a
                          className="campaign-row-link"
                          href={`/dashboard/campaigns/${campaign.id}`}
                        >
                          <strong>{campaign.title}</strong>
                          <span>{campaign.brandName}</span>
                        </a>
                      </td>
                      <td>
                        <span className={`status-badge ${statusView.tone}`}>
                          {statusView.label}
                        </span>
                      </td>
                      <td>
                        <div className="campaign-progress-cell">
                          <div>
                            {isCancelled ? (
                              <>
                                <strong>모집 종료</strong>
                                <span>취소된 캠페인</span>
                              </>
                            ) : (
                              <>
                                <strong>
                                  {approvedSlots}/{totalSlots}명
                                </strong>
                                <span>남은 모집 {remainingSlots}명</span>
                              </>
                            )}
                          </div>
                          <div className="campaign-progress-track" aria-hidden="true">
                            <span style={{ width: `${progress}%` }} />
                          </div>
                        </div>
                      </td>
                      <td>{campaign.applicantCount}명</td>
                      <td>
                        <span className="date-with-dday">
                          {formatKoreanDate(campaign.deadline)}
                          <em>{formatDeadlineDday(campaign.deadline)}</em>
                        </span>
                      </td>
                      <td>{formatPoint(campaign.rewardPoint)}</td>
                      <td>
                        <div className="table-actions">
                          <CampaignTransitionActions
                            campaignId={campaign.id}
                            redirectTo="/dashboard/campaigns"
                            selectedCount={approvedSlots}
                            status={campaign.status}
                            variant="compact"
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <section className="empty-panel">
            <h2>
              {campaigns.length > 0 ? "조건에 맞는 캠페인이 없어요" : "아직 만든 캠페인이 없어요"}
            </h2>
            <p>
              {campaigns.length > 0
                ? "검색어나 상태 필터를 바꿔서 다시 확인해 주세요."
                : "새 캠페인을 등록하면 이 목록에 표시됩니다."}
            </p>
          </section>
        )}
      </section>

      <a className="floating-campaign-create" href="/dashboard/campaigns/new">
        신규 캠페인 설정 <span aria-hidden="true">+</span>
      </a>
    </>
  );
}

function SummaryCard({
  children,
  icon: Icon,
  iconTone,
  label,
  value,
}: {
  children: React.ReactNode;
  icon: LucideIcon;
  iconTone: "blue" | "green" | "grey" | "yellow";
  label: string;
  value: string;
}) {
  return (
    <article>
      <span>
        <span className={`info-card-icon ${iconTone}`} aria-hidden="true">
          <Icon size={22} strokeWidth={2.1} />
        </span>
        {label}
      </span>
      <strong>{value}</strong>
      <p>{children}</p>
    </article>
  );
}

function normalizeCampaignStatus(status?: string): CampaignStatus | "all" {
  if (!status || status === "all") {
    return "all";
  }

  return validCampaignStatuses.has(status as CampaignStatus) ? (status as CampaignStatus) : "all";
}

function matchesCampaignSearch(campaign: Campaign, query: string) {
  if (!query) {
    return true;
  }

  const lowerQuery = query.toLowerCase();

  return [campaign.title, campaign.brandName, String(campaign.id)].some((value) =>
    value.toLowerCase().includes(lowerQuery),
  );
}

function getCampaignFilterHref(status: CampaignStatus | "all", query: string) {
  const params = new URLSearchParams();

  if (status !== "all") {
    params.set("status", status);
  }

  if (query) {
    params.set("q", query);
  }

  const search = params.toString();

  return search ? `/dashboard/campaigns?${search}` : "/dashboard/campaigns";
}

function getCampaignStatusFilterCount(campaigns: Campaign[], status: CampaignStatus | "all") {
  if (status === "all") {
    return campaigns.length;
  }

  return campaigns.filter((campaign) => campaign.status === status).length;
}

function getRecruitProgress(approvedSlots: number, totalSlots: number) {
  if (totalSlots <= 0) {
    return 0;
  }

  return Math.min(100, Math.round((approvedSlots / totalSlots) * 100));
}
