export default function BloggerNotFoundPage() {
  return (
    <main className="mobile-shell">
      <section className="screen-content">
        <div className="screen-stack">
          <div className="page-heading">
            <p className="section-label">Not found</p>
            <h1>화면을 찾을 수 없어요</h1>
            <p>캠페인이나 미션 정보가 삭제되었을 수 있습니다.</p>
          </div>
          <a className="primary-button cta-link" href="/campaigns">
            캠페인으로 돌아가기
          </a>
        </div>
      </section>
    </main>
  );
}
