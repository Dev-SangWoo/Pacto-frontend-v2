const summaryCards = [
  {
    label: "진행 캠페인",
    value: "18건",
    caption: "오늘 승인 대기 6건",
  },
  {
    label: "지원자",
    value: "248명",
    caption: "검토 필요 32명",
  },
  {
    label: "에스크로 잔액",
    value: "12,400,000원",
    caption: "출금 예정 3건",
  },
];

const operationQueues = [
  "신규 캠페인 가이드라인 검수",
  "선착순 캠페인 지원자 승인",
  "미션 제출물 확인",
  "광고주 결제 링크 발송",
];

export default function DashboardHomePage() {
  return (
    <main className="dashboard-shell">
      <aside className="sidebar" aria-label="대시보드 메뉴">
        <div className="brand-block">
          <p>Pacto</p>
          <strong>Dashboard</strong>
        </div>
        <nav>
          <a className="active" href="/dashboard">
            대시보드
          </a>
          <a href="/dashboard/campaigns">캠페인</a>
          <a href="/dashboard/escrow">정산</a>
          <a href="/dashboard/reports">리포트</a>
          <a href="/dashboard/settings">설정</a>
        </nav>
      </aside>

      <section className="workspace" aria-labelledby="dashboard-title">
        <header className="topbar">
          <div>
            <p className="eyebrow">Agency workspace</p>
            <h1 id="dashboard-title">캠페인 운영 현황</h1>
          </div>
          <button type="button">캠페인 등록</button>
        </header>

        <section className="summary-grid" aria-label="운영 요약">
          {summaryCards.map((card) => (
            <article className="summary-card" key={card.label}>
              <p>{card.label}</p>
              <strong>{card.value}</strong>
              <span>{card.caption}</span>
            </article>
          ))}
        </section>

        <section className="content-grid">
          <article className="panel">
            <div className="panel-heading">
              <h2>오늘의 운영 큐</h2>
              <span>4개 업무</span>
            </div>
            <ul className="queue-list">
              {operationQueues.map((queue) => (
                <li key={queue}>
                  <span aria-hidden="true" />
                  {queue}
                </li>
              ))}
            </ul>
          </article>

          <article className="panel report-panel">
            <div className="panel-heading">
              <h2>성과 리포트</h2>
              <span>이번 주</span>
            </div>
            <div className="report-metric">
              <strong>72%</strong>
              <p>캠페인 평균 미션 제출률</p>
            </div>
          </article>
        </section>
      </section>
    </main>
  );
}
