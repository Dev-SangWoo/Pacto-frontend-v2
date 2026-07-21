export default function DashboardForbiddenPage() {
  return (
    <main className="dashboard-login-shell">
      <section className="dashboard-login-panel forbidden-state">
        <div className="dashboard-login-copy">
          <p>권한 없음</p>
          <h1>광고주 계정으로 접근해 주세요</h1>
          <span>
            현재 계정 권한으로는 대시보드를 볼 수 없어요. 광고주 계정으로 다시 로그인해 주세요.
          </span>
        </div>
        <img src="/brand/logo-bg-rm-cropped.png" alt="Pacto" />
        <div className="dashboard-login-form">
          <a className="primary-button wide" href="/logout">
            다시 로그인
          </a>
          <a className="secondary-link" href="/login">
            로그인 화면
          </a>
        </div>
      </section>
    </main>
  );
}
