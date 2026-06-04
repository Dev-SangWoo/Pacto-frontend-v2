export default function PaymentsPage() {
  return (
    <>
      <header className="topbar">
        <div>
          <p className="eyebrow">Payments</p>
          <h1>결제 내역</h1>
        </div>
      </header>

      <section className="panel empty-panel">
        <h2>결제 API 대기 중</h2>
        <p>
          현재 Swagger에는 결제 전용 API가 없어, 광고주 결제 링크 화면에서 mock 기반으로 먼저
          연결합니다.
        </p>
      </section>
    </>
  );
}
