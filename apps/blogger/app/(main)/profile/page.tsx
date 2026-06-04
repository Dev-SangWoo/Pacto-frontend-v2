const profileItems = [
  { label: "이메일", value: "blogger@pacto.test" },
  { label: "역할", value: "블로거" },
  { label: "정산 계좌", value: "등록하면 출금할 수 있어요" },
];

export default function ProfilePage() {
  return (
    <section className="screen-stack" aria-labelledby="profile-title">
      <div className="page-heading">
        <p className="section-label">프로필</p>
        <h1 id="profile-title">정산에 필요한 정보를 확인해요</h1>
        <p>출금 신청 전 계좌 정보와 연락처가 정확한지 확인할 수 있어요.</p>
      </div>

      <section className="info-list" aria-label="프로필 정보">
        {profileItems.map((item) => (
          <div key={item.label}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </div>
        ))}
      </section>

      <section className="content-section" aria-labelledby="profile-helper-title">
        <h2 id="profile-helper-title">계좌 등록이 필요해요</h2>
        <p>계좌 등록 기능이 연결되면 출금 신청 화면에서 바로 신청할 수 있어요.</p>
      </section>
    </section>
  );
}
