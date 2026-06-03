const profileItems = [
  { label: "이메일", value: "blogger@pacto.test" },
  { label: "역할", value: "블로거" },
  { label: "정산 계좌", value: "등록 필요" },
];

export default function ProfilePage() {
  return (
    <section className="screen-stack" aria-labelledby="profile-title">
      <div className="page-heading">
        <p className="section-label">프로필</p>
        <h1 id="profile-title">내 정보를 확인하세요</h1>
        <p>출금 신청 전 계좌 정보와 연락처를 확인해 주세요.</p>
      </div>

      <section className="info-list" aria-label="프로필 정보">
        {profileItems.map((item) => (
          <div key={item.label}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </div>
        ))}
      </section>
    </section>
  );
}
