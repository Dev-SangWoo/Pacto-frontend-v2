import Link from "next/link";

const trustItems = [
  {
    label: "정산 보호",
    description: "예산과 검수 상태를 분리해서 보여주고, 승인 후 지갑에 반영해요.",
  },
  {
    label: "명확한 다음 행동",
    description: "캠페인 선택, 미션 제출, 출금 신청까지 해야 할 일을 순서대로 안내해요.",
  },
  {
    label: "예상 가능한 CTA",
    description: "버튼을 누르면 어떤 화면으로 이어지는지 바로 알 수 있게 썼어요.",
  },
];

export default function BloggerLoginPage() {
  return (
    <main className="auth-shell">
      <section className="auth-panel" aria-labelledby="login-title">
        <div className="auth-brand">
          <span>P</span>
          <strong>Pacto Creator</strong>
        </div>

        <div className="auth-heading">
          <p className="section-label">블로거 로그인</p>
          <h1 id="login-title">검증된 캠페인을 고르고 미션을 놓치지 마세요</h1>
          <p>
            캠페인 탐색부터 미션 제출, 정산 확인까지 크리에이터가 해야 할 일을 순서대로 관리해요.
          </p>
        </div>

        <form className="login-form" aria-label="블로거 로그인">
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

        <section className="flow-steps" aria-label="이용 흐름">
          <div>
            <span>1</span>
            <strong>캠페인 선택</strong>
            <p>조건과 보상을 비교해요.</p>
          </div>
          <div>
            <span>2</span>
            <strong>미션 제출</strong>
            <p>마감일 전에 리뷰 URL을 제출해요.</p>
          </div>
          <div>
            <span>3</span>
            <strong>정산 확인</strong>
            <p>승인된 금액을 지갑에서 확인해요.</p>
          </div>
        </section>

        <section className="trust-list" aria-label="Pacto 신뢰 장치">
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
