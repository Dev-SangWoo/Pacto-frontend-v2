const formRows = [
  { label: "광고주", value: "광고주를 선택하세요" },
  { label: "캠페인명", value: "예: 성수동 브런치 카페 체험단" },
  { label: "보상 포인트", value: "예: 50000" },
  { label: "모집 인원", value: "예: 12" },
  { label: "마감일", value: "YYYY-MM-DD" },
];

export default function NewCampaignPage() {
  return (
    <>
      <header className="topbar">
        <div>
          <p className="eyebrow">New campaign</p>
          <h1>캠페인 등록</h1>
        </div>
      </header>

      <section className="panel form-panel">
        <div className="panel-heading">
          <div>
            <h2>기본 정보</h2>
            <p>Swagger 확정 전까지는 mock-first 폼 구조를 먼저 고정합니다.</p>
          </div>
        </div>
        <div className="form-grid">
          {formRows.map((row) => (
            <label key={row.label}>
              <span>{row.label}</span>
              <input placeholder={row.value} />
            </label>
          ))}
          <label className="full-row">
            <span>미션 가이드</span>
            <textarea placeholder="블로거가 수행해야 할 미션 조건을 입력하세요." rows={6} />
          </label>
        </div>
        <div className="form-actions">
          <a className="secondary-link" href="/dashboard/campaigns">
            취소
          </a>
          <button className="primary-button" type="button">
            임시 저장
          </button>
        </div>
      </section>
    </>
  );
}
