export default function BloggerForbiddenPage() {
  return (
    <main className="auth-shell">
      <section className="auth-studio forbidden-state">
        <div className="identity-mark" aria-hidden="true">
          <img src="/brand/logo-bg-rm-cropped.webp" alt="" />
        </div>
        <p className="section-label">권한 없음</p>
        <h1>블로거 계정으로 접근해 주세요</h1>
        <p>현재 계정 권한으로는 이 화면을 볼 수 없어요. 올바른 계정으로 다시 로그인해 주세요.</p>
        <div className="auth-entry-actions">
          <a className="primary-button" href="/logout">
            다시 로그인
          </a>
          <a className="text-link-button" href="/campaigns">
            캠페인으로 돌아가기
          </a>
        </div>
      </section>
    </main>
  );
}
