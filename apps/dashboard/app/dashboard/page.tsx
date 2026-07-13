import { redirect } from "next/navigation";
import { Clock3, FileCheck2, Megaphone, UsersRound, WalletCards } from "lucide-react";

import {
  ApiError,
  getAdvertiserDashboard,
  getCampaigns,
  type AdvertiserDashboardSummary,
} from "@pacto/api";
import type { CampaignApplicant, PointHistory } from "@pacto/types";
import {
  formatKoreanDate,
  formatPoint,
  getApplicationStatusView,
  getMissionStatusView,
} from "@pacto/utils";

import { getDashboardSession } from "../_lib/session";
import { DashboardCampaignPanel } from "./_components/dashboard-campaign-panel";
import { filterOwnedCampaigns } from "./_lib/owned-campaigns";

type DonutItem = {
  amount?: number;
  color: string;
  count?: number;
  label: string;
  value: number;
};

export default async function DashboardHomePage() {
  const session = await getDashboardSession();

  if (session.accessToken == null) {
    redirect("/login");
  }

  const dashboard = await getAdvertiserDashboard(session.accessToken).catch((error: unknown) => {
    if (error instanceof ApiError && (error.statusCode === 401 || error.statusCode === 403)) {
      redirect("/logout");
    }

    throw error;
  });
  const campaigns = await filterOwnedCampaigns(
    await getCampaigns({ page: 0, size: 100, sort: "campaignId,desc" }, session.accessToken).catch(
      () => [],
    ),
    session,
  );

  const viewModel = createDashboardViewModel(dashboard);
  const acceptedBloggers = getAcceptedBloggerPreviews(dashboard.recentApplications);
  const hiddenAcceptedBloggerCount = Math.max(
    dashboard.applicationSummary.acceptedApplications - acceptedBloggers.length,
    0,
  );

  return (
    <>
      <header className="topbar topbar-pro">
        <div>
          <p className="eyebrow">Advertiser workspace</p>
          <h1>대시보드</h1>
          <p className="topbar-copy">
            캠페인 모집, 예산 잠금, 콘텐츠 검수, 정산 대기 흐름을 한 화면에서 확인합니다.
          </p>
        </div>
        <div className="dashboard-header-actions">
          <a className="secondary-link" href="/dashboard/payments">
            예산 관리
          </a>
        </div>
      </header>

      <section className="dashboard-kpi-grid" aria-label="광고주 운영 요약">
        {viewModel.stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <article
              className={`dashboard-kpi-card ${stat.emphasis ? "emphasis" : ""}`}
              key={stat.id}
            >
              <span>
                <span className={`info-card-icon ${stat.iconTone}`} aria-hidden="true">
                  <Icon size={22} strokeWidth={2.1} />
                </span>
                {stat.label}
              </span>
              <strong>{stat.value}</strong>
              <p>{stat.subValue}</p>
            </article>
          );
        })}
      </section>

      <section className="dashboard-board-grid">
        <DashboardCampaignPanel campaigns={campaigns} />

        <DonutStatusCard
          actionHref="/dashboard/payments"
          actionLabel="내역 보기"
          centerLabel="잠금 예산"
          centerValue={formatPoint(dashboard.escrowSummary.lockedAmount)}
          className="dashboard-escrow-panel"
          items={viewModel.escrowItems}
          title="예산 예치"
          totalLabel="지갑 잔액"
          totalValue={formatPoint(dashboard.wallet.balance)}
        />

        <DonutStatusCard
          actionHref="/dashboard/campaigns"
          actionLabel="검수 보기"
          centerLabel="전체 미션"
          centerValue={String(viewModel.totalMissions)}
          className="dashboard-content-panel"
          items={viewModel.contentItems}
          title="콘텐츠 진행 상태"
          totalLabel="검수 대기"
          totalValue={String(dashboard.missionSummary.submittedMissions)}
        />

        <article className="panel dashboard-blogger-panel">
          <div className="panel-heading compact">
            <div>
              <h2>참여 블로거</h2>
              <p>승인된 참여자 기준 집계입니다.</p>
            </div>
            <a href="/dashboard/campaigns">전체 보기</a>
          </div>
          <div className="dashboard-blogger-body">
            <div className="avatar-stack" aria-label="참여 블로거 미리보기">
              {acceptedBloggers.length > 0 ? (
                acceptedBloggers.map((blogger) => (
                  <span className="avatar-stack-item" key={blogger.id} title={blogger.name}>
                    {getInitial(blogger.name)}
                  </span>
                ))
              ) : (
                <span className="avatar-stack-empty">아직 승인된 블로거가 없어요</span>
              )}
              {hiddenAcceptedBloggerCount > 0 ? (
                <span className="avatar-stack-item muted">+{hiddenAcceptedBloggerCount}</span>
              ) : null}
            </div>
            <div className="dashboard-mini-metrics">
              <MetricCell
                label="전체 참여"
                value={String(dashboard.applicationSummary.acceptedApplications)}
              />
              <MetricCell
                label="신규 신청"
                value={String(dashboard.applicationSummary.pendingApplications)}
              />
              <MetricCell label="최근 승인" value={String(acceptedBloggers.length)} />
            </div>
          </div>
        </article>

        <article className="panel dashboard-settlement-panel">
          <div className="panel-heading compact">
            <div>
              <h2>정산 진행 현황</h2>
              <p>에스크로 상태별 금액을 기준으로 표시합니다.</p>
            </div>
            <a href="/dashboard/payments">정산 보기</a>
          </div>
          <div className="settlement-highlight">
            <span>정산 대기 금액</span>
            <strong>{formatPoint(dashboard.escrowSummary.lockedAmount)}</strong>
            <p>{dashboard.escrowSummary.lockedEscrows}건이 잠금 상태입니다.</p>
          </div>
          <div className="settlement-steps">
            <SettlementStep
              active={dashboard.escrowSummary.lockedEscrows > 0}
              amount={dashboard.escrowSummary.lockedAmount}
              count={dashboard.escrowSummary.lockedEscrows}
              label="정산 대기"
            />
            <SettlementStep
              active={false}
              amount={dashboard.escrowSummary.releasedAmount}
              count={dashboard.escrowSummary.releasedEscrows}
              label="정산 완료"
            />
            <SettlementStep
              active={false}
              amount={dashboard.escrowSummary.canceledAmount}
              count={dashboard.escrowSummary.canceledEscrows}
              label="환불/취소"
            />
          </div>
        </article>
      </section>

      <section className="dashboard-main-grid dashboard-main-grid-wide">
        <RecentApplicationsPanel dashboard={dashboard} />
        <RecentActivityPanel
          histories={dashboard.recentPointHistories}
          missions={dashboard.pendingMissions}
        />
      </section>

      <a className="floating-campaign-create" href="/dashboard/campaigns/new">
        신규 캠페인 설정 <span aria-hidden="true">+</span>
      </a>
    </>
  );
}

function DonutStatusCard({
  actionHref,
  actionLabel,
  centerLabel,
  centerValue,
  className,
  items,
  title,
  totalLabel,
  totalValue,
}: {
  actionHref: string;
  actionLabel: string;
  centerLabel: string;
  centerValue: string;
  className: string;
  items: DonutItem[];
  title: string;
  totalLabel: string;
  totalValue: string;
}) {
  return (
    <article className={`panel dashboard-donut-card ${className}`}>
      <div className="panel-heading compact">
        <div>
          <h2>{title}</h2>
          <p>{totalLabel}</p>
        </div>
        <a href={actionHref}>{actionLabel}</a>
      </div>
      <div className="dashboard-donut-body">
        <div className="dashboard-donut" style={{ background: getDonutGradient(items) }}>
          <div>
            <span>{centerLabel}</span>
            <strong>{centerValue}</strong>
          </div>
        </div>
        <div className="chart-legend">
          <strong>{totalValue}</strong>
          {items.map((item) => (
            <div key={item.label}>
              <span style={{ background: item.color }} />
              <p>{item.label}</p>
              <em>{item.amount == null ? (item.count ?? 0) : formatPoint(item.amount)}</em>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

function RecentApplicationsPanel({ dashboard }: { dashboard: AdvertiserDashboardSummary }) {
  return (
    <article className="panel">
      <div className="panel-heading">
        <div>
          <h2>최근 지원자</h2>
          <p>최근 들어온 지원자를 확인하고 승인 화면으로 이동합니다.</p>
        </div>
        <span>{dashboard.recentApplications.length}</span>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>지원자</th>
              <th>캠페인</th>
              <th>상태</th>
              <th>신청일</th>
            </tr>
          </thead>
          <tbody>
            {dashboard.recentApplications.length > 0 ? (
              dashboard.recentApplications.map((application) => {
                const statusView = getApplicationStatusView(application.status);

                return (
                  <tr key={application.applicationId}>
                    <td>
                      <strong>{application.bloggerName}</strong>
                      <span>지원 #{application.applicationId}</span>
                    </td>
                    <td>
                      {application.campaignId == null ? (
                        "-"
                      ) : (
                        <a href={`/dashboard/campaigns/${application.campaignId}/applicants`}>
                          캠페인 #{application.campaignId}
                        </a>
                      )}
                    </td>
                    <td>
                      <span className={`status-badge ${statusView.tone}`}>{statusView.label}</span>
                    </td>
                    <td>{formatKoreanDate(application.appliedAt)}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={4}>최근 지원자가 없습니다.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </article>
  );
}

function RecentActivityPanel({
  histories,
  missions,
}: {
  histories: PointHistory[];
  missions: AdvertiserDashboardSummary["pendingMissions"];
}) {
  return (
    <aside className="dashboard-side-grid">
      <article className="panel">
        <div className="panel-heading compact">
          <div>
            <h2>검수 대기 미션</h2>
            <p>블로거가 URL을 제출한 미션입니다.</p>
          </div>
          <span>{missions.length}</span>
        </div>
        <div className="dashboard-card-list">
          {missions.length > 0 ? (
            missions.slice(0, 5).map((mission) => {
              const statusView = getMissionStatusView(mission.status);

              return (
                <a
                  className="dashboard-card-row"
                  href={`/dashboard/campaigns/${mission.campaignId}/missions`}
                  key={mission.id}
                >
                  <div>
                    <strong>{mission.campaignTitle}</strong>
                    <span>미션 #{mission.id}</span>
                  </div>
                  <span className={`status-badge ${statusView.tone}`}>{statusView.label}</span>
                </a>
              );
            })
          ) : (
            <div className="empty-panel">검수 대기 미션이 없습니다.</div>
          )}
        </div>
      </article>

      <article className="panel">
        <div className="panel-heading compact">
          <div>
            <h2>최근 포인트 흐름</h2>
            <p>광고주 지갑의 최근 내역입니다.</p>
          </div>
        </div>
        <div className="queue-list">
          {histories.length > 0 ? (
            histories.map((history) => (
              <a href="/dashboard/payments" key={history.id}>
                <span>{getPointHistoryLabel(history.type)}</span>
                <strong>{formatPoint(history.amount)}</strong>
              </a>
            ))
          ) : (
            <div className="empty-panel">최근 포인트 내역이 없습니다.</div>
          )}
        </div>
      </article>
    </aside>
  );
}

function MetricCell({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function SettlementStep({
  active,
  amount,
  count,
  label,
}: {
  active: boolean;
  amount: number;
  count: number;
  label: string;
}) {
  return (
    <div className={active ? "active" : ""}>
      <span />
      <p>{label}</p>
      <strong>{formatPoint(amount)}</strong>
      <em>{count}</em>
    </div>
  );
}

function createDashboardViewModel(dashboard: AdvertiserDashboardSummary) {
  const totalMissions =
    dashboard.missionSummary.submittedMissions +
    dashboard.missionSummary.approvedMissions +
    dashboard.missionSummary.rejectedMissions;

  return {
    contentItems: [
      {
        color: "#3182f6",
        count: dashboard.missionSummary.submittedMissions,
        label: "검수 대기",
        value: dashboard.missionSummary.submittedMissions,
      },
      {
        color: "#00a661",
        count: dashboard.missionSummary.approvedMissions,
        label: "승인 완료",
        value: dashboard.missionSummary.approvedMissions,
      },
      {
        color: "#f04452",
        count: dashboard.missionSummary.rejectedMissions,
        label: "반려",
        value: dashboard.missionSummary.rejectedMissions,
      },
    ],
    escrowItems: [
      {
        amount: dashboard.escrowSummary.lockedAmount,
        color: "#3182f6",
        label: "잠금",
        value: dashboard.escrowSummary.lockedAmount,
      },
      {
        amount: dashboard.escrowSummary.releasedAmount,
        color: "#00a661",
        label: "정산 완료",
        value: dashboard.escrowSummary.releasedAmount,
      },
      {
        amount: dashboard.escrowSummary.canceledAmount,
        color: "#f04452",
        label: "취소",
        value: dashboard.escrowSummary.canceledAmount,
      },
    ],
    stats: [
      {
        emphasis: true,
        icon: Megaphone,
        iconTone: "blue",
        id: "campaigns",
        label: "전체 캠페인",
        subValue: `모집 중 ${dashboard.campaignSummary.recruitingCampaigns}`,
        value: String(dashboard.campaignSummary.totalCampaigns),
      },
      {
        icon: WalletCards,
        iconTone: "green",
        id: "escrow",
        label: "예산 예치",
        subValue: `사용 가능 ${formatPoint(dashboard.wallet.balance)}`,
        value: formatPoint(dashboard.wallet.lockedBalance || dashboard.escrowSummary.lockedAmount),
      },
      {
        icon: UsersRound,
        iconTone: "yellow",
        id: "bloggers",
        label: "참여 블로거",
        subValue: `승인 대기 ${dashboard.applicationSummary.pendingApplications}`,
        value: String(dashboard.applicationSummary.acceptedApplications),
      },
      {
        icon: FileCheck2,
        iconTone: "blue",
        id: "contents",
        label: "진행 중 콘텐츠",
        subValue: `검수 대기 ${dashboard.missionSummary.submittedMissions}`,
        value: String(totalMissions),
      },
      {
        icon: Clock3,
        iconTone: "yellow",
        id: "settlement",
        label: "정산 대기 금액",
        subValue: `${dashboard.escrowSummary.lockedEscrows} 대기`,
        value: formatPoint(dashboard.escrowSummary.lockedAmount),
      },
    ],
    totalMissions,
  };
}

function getDonutGradient(items: DonutItem[]) {
  const total = items.reduce((sum, item) => sum + item.value, 0);

  if (total <= 0) {
    return "conic-gradient(#e5e8eb 0deg 360deg)";
  }

  let cursor = 0;
  const stops = items.map((item) => {
    const start = cursor;
    const size = (item.value / total) * 360;
    cursor += size;
    return `${item.color} ${start}deg ${cursor}deg`;
  });

  return `conic-gradient(${stops.join(", ")})`;
}

function getInitial(name: string) {
  return name.slice(0, 1);
}

function getAcceptedBloggerPreviews(applications: CampaignApplicant[]) {
  const bloggers = new Map<number, { id: number; name: string }>();

  for (const application of applications) {
    if (application.status !== "ACCEPTED" || bloggers.has(application.bloggerId)) {
      continue;
    }

    bloggers.set(application.bloggerId, {
      id: application.bloggerId,
      name: application.bloggerName,
    });
  }

  return Array.from(bloggers.values()).slice(0, 5);
}

function getPointHistoryLabel(type: PointHistory["type"]) {
  const labelMap: Record<PointHistory["type"], string> = {
    CHARGE: "충전",
    LOCK: "예산 잠금",
    REFUND: "환불",
    RELEASE: "정산 지급",
    WITHDRAW: "출금",
  };

  return labelMap[type];
}
