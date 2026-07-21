export default function MainTabLoading() {
  return (
    <section className="tab-loading" aria-label="화면을 불러오는 중" aria-live="polite">
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
      <span className="sr-only">불러오는 중...</span>
    </section>
  );
}
