export default function DashboardNotFoundPage() {
  return (
    <main className="advertiser-shell">
      <section className="advertiser-card">
        <p className="eyebrow">Not found</p>
        <h1>화면을 찾을 수 없습니다</h1>
        <p>캠페인 또는 운영 리소스가 존재하지 않습니다.</p>
        <a className="primary-link" href="/dashboard">
          대시보드로 이동
        </a>
      </section>
    </main>
  );
}
