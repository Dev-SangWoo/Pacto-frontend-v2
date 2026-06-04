import Link from "next/link";

const trustItems = [
  {
    label: "에스크로 보호",
    description: "캠페인 예산이 먼저 예치된 건만 노출해요.",
  },
  {
    label: "미션 가이드",
    description: "방문 조건과 제출 기준을 지원 전에 확인할 수 있어요.",
  },
  {
    label: "정산 추적",
    description: "승인, 검수, 출금 가능 금액을 한 화면에서 확인해요.",
  },
];

export default function BloggerLoginPage() {
  return (
    <main className="auth-shell">
      <section className="auth-panel" aria-labelledby="login-title">
        <div className="auth-brand">
          <span>Pacto</span>
          <strong>Creator</strong>
        </div>

        <div className="auth-heading">
          <p className="section-label">블로거 로그인</p>
          <h1 id="login-title">검증된 캠페인만 골라 안전하게 참여하세요</h1>
          <p>
            캠페인 탐색부터 미션 제출, 정산 확인까지 크리에이터가 놓치기 쉬운 단계를 한 흐름으로
            관리합니다.
          </p>
        </div>

        <form className="login-form" aria-label="블로거 로그인 폼">
          <label>
            이메일
            <input
              autoComplete="email"
              inputMode="email"
              placeholder="blogger@pacto.test"
              type="email"
            />
          </label>
          <label>
            비밀번호
            <input
              autoComplete="current-password"
              placeholder="비밀번호를 입력하세요"
              type="password"
            />
          </label>
          <Link className="primary-button" href="/campaigns">
            로그인하고 캠페인 보기
          </Link>
        </form>

        <section className="trust-list" aria-label="Pacto 신뢰 정책">
          {trustItems.map((item) => (
            <article key={item.label}>
              <strong>{item.label}</strong>
              <p>{item.description}</p>
            </article>
          ))}
        </section>

        <p className="auth-helper">
          현재 화면은 MVP용 UI이며, 실제 인증 API 연결 전 목업 흐름입니다.
        </p>
      </section>
    </main>
  );
}
