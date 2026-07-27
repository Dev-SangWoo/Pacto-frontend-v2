export function MainTabLoading() {
  return (
    <section className="tab-loading" aria-label="화면을 불러오는 중" aria-live="polite">
      <div className="tab-loading-copy">
        <strong>잠시만요, 화면을 준비하고 있어요</strong>
        <p>최신 정보를 안전하게 불러오는 중이에요.</p>
      </div>
      <div className="tab-loading-hero" />
      <div className="tab-loading-tabs" />
      {Array.from({ length: 3 }, (_, index) => (
        <div className="tab-loading-card" key={index}>
          <span />
          <div>
            <i />
            <i />
            <i />
          </div>
        </div>
      ))}
    </section>
  );
}
