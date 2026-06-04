import { logoutAction } from "../../_actions/auth-actions";
import { getBloggerSession } from "../../_lib/session";

export default async function ProfilePage() {
  const session = await getBloggerSession();
  const profileItems = [
    { label: "이메일", value: session.email ?? "로그인이 필요해요" },
    { label: "역할", value: "블로거" },
    { label: "정산 계좌", value: "등록하면 출금할 수 있어요" },
  ];

  return (
    <section className="screen-stack" aria-labelledby="profile-title">
      <div className="page-heading">
        <h1 id="profile-title">프로필</h1>
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
        <p>계좌 등록 기능이 연결되면 출금 신청 화면에서 바로 정산을 요청할 수 있어요.</p>
      </section>

      <form action={logoutAction}>
        <button className="primary-button weak-button full-width" type="submit">
          로그아웃
        </button>
      </form>
    </section>
  );
}
