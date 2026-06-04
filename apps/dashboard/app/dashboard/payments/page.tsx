export default function PaymentsPage() {
  return (
    <>
      <header className="topbar topbar-pro">
        <div>
          <p className="eyebrow">Payments</p>
          <h1>결제 내역</h1>
          <p className="topbar-copy">광고주 결제 링크와 예치 상태를 연결할 준비 화면입니다.</p>
        </div>
      </header>

      <section className="panel empty-panel empty-panel-pro">
        <p className="eyebrow">Mock-first</p>
        <h2>결제 API 연동 대기 중</h2>
        <p>
          현재 Swagger에는 결제 전용 API가 없어 광고주 결제 링크 화면에서 mock 기반으로 먼저
          연결합니다. API가 확정되면 결제 성공, 예치 생성, 정산 가능 상태까지 같은 테이블 흐름으로
          이어집니다.
        </p>
      </section>
    </>
  );
}
