import { Bell, Building2, CreditCard, LogOut, ShieldCheck, UserCircle } from "lucide-react";

import { getMe, getMyWallet } from "@pacto/api";
import { formatKoreanDate, formatPoint } from "@pacto/utils";

import { logoutAction } from "../../_actions/auth-actions";
import { getDashboardSession } from "../../_lib/session";

const futureSettings = [
  {
    description: "브랜드명, 사업자 정보, 담당자 연락처를 관리할 수 있도록 확장할 영역입니다.",
    icon: Building2,
    label: "조직 정보",
    state: "준비 중",
  },
  {
    description: "캠페인 신청, 미션 제출, 정산 이벤트 알림 채널을 설정할 영역입니다.",
    icon: Bell,
    label: "알림 설정",
    state: "준비 중",
  },
  {
    description: "환불, 세금계산서, 정산 계좌 정보가 필요해지면 이 영역에 연결합니다.",
    icon: CreditCard,
    label: "정산 정보",
    state: "준비 중",
  },
];

export default async function SettingsPage() {
  const session = await getDashboardSession();
  const [user, wallet] = await Promise.all([
    session.accessToken != null ? getMe(session.accessToken).catch(() => undefined) : undefined,
    session.accessToken != null
      ? getMyWallet(session.accessToken).catch(() => undefined)
      : undefined,
  ]);
  const accountEmail = user?.email ?? session.email ?? "로그인 계정";
  const accountId = user?.id ?? session.userId;
  const accountRole = user?.role ?? session.role;

  return (
    <>
      <header className="topbar settings-topbar">
        <div>
          <p className="eyebrow">Settings</p>
          <h1>설정</h1>
          <p className="topbar-copy">
            현재 로그인 계정 기준으로 확인 가능한 정보만 먼저 보여줍니다.
          </p>
        </div>
        <form action={logoutAction}>
          <button className="settings-logout-button" type="submit">
            <LogOut aria-hidden="true" size={17} />
            로그아웃
          </button>
        </form>
      </header>

      <section className="settings-overview-grid" aria-label="계정 요약">
        <article className="settings-account-card">
          <span className="settings-card-icon blue" aria-hidden="true">
            <UserCircle size={30} strokeWidth={2.1} />
          </span>
          <div>
            <p>계정</p>
            <strong>{accountEmail}</strong>
            <span>{accountId != null ? `사용자 ID ${accountId}` : "사용자 ID 확인 대기"}</span>
          </div>
        </article>
        <article className="settings-account-card">
          <span className="settings-card-icon green" aria-hidden="true">
            <ShieldCheck size={30} strokeWidth={2.1} />
          </span>
          <div>
            <p>권한</p>
            <strong>{getRoleLabel(accountRole)}</strong>
            <span>대시보드 접근 권한 기준</span>
          </div>
        </article>
        <article className="settings-account-card">
          <span className="settings-card-icon yellow" aria-hidden="true">
            <CreditCard size={30} strokeWidth={2.1} />
          </span>
          <div>
            <p>지갑</p>
            <strong>{wallet != null ? formatPoint(wallet.availableBalance) : "확인 대기"}</strong>
            <span>
              {wallet != null
                ? `잠금 ${formatPoint(wallet.lockedBalance)}`
                : "지갑 정보를 불러오지 못했어요"}
            </span>
          </div>
        </article>
      </section>

      <section className="settings-content-grid">
        <article className="panel settings-panel">
          <div className="panel-heading">
            <div>
              <h2>로그인 정보</h2>
              <p>현재 세션과 백엔드 사용자 조회 결과를 함께 확인합니다.</p>
            </div>
          </div>
          <div className="compact-list settings-detail-list">
            <div>
              <span>이메일</span>
              <strong>{accountEmail}</strong>
            </div>
            <div>
              <span>사용자 ID</span>
              <strong>{accountId ?? "-"}</strong>
            </div>
            <div>
              <span>계정 유형</span>
              <strong>{getRoleLabel(accountRole)}</strong>
            </div>
            <div>
              <span>세션 상태</span>
              <strong>{session.accessToken != null ? "활성" : "확인 필요"}</strong>
            </div>
          </div>
        </article>

        <aside className="panel settings-panel">
          <div className="panel-heading">
            <div>
              <h2>운영 상태</h2>
              <p>캠페인 생성과 결제 흐름에 필요한 기본 상태입니다.</p>
            </div>
          </div>
          <div className="settings-readiness-list">
            <ReadinessRow
              description="캠페인 생성과 상태 변경에 사용할 수 있습니다."
              label="광고주 권한"
              ready={accountRole === "ADVERTISER"}
            />
            <ReadinessRow
              description="충전, 예산 잠금, 환불 상태를 조회할 수 있습니다."
              label="지갑 연결"
              ready={wallet != null}
            />
            <ReadinessRow
              description={
                wallet != null
                  ? `마지막 갱신 ${formatKoreanDate(wallet.updatedAt)}`
                  : "지갑 응답에 updatedAt이 들어오면 여기에 표시합니다."
              }
              label="잔액 동기화"
              ready={wallet != null}
            />
          </div>
        </aside>
      </section>

      <section className="panel settings-panel">
        <div className="panel-heading">
          <div>
            <h2>확장 예정 설정</h2>
            <p>백엔드 API가 붙으면 같은 화면 안에서 바로 활성화할 수 있는 영역입니다.</p>
          </div>
        </div>
        <div className="settings-extension-grid">
          {futureSettings.map((item) => {
            const Icon = item.icon;

            return (
              <article className="settings-extension-item" key={item.label}>
                <span className="settings-card-icon grey" aria-hidden="true">
                  <Icon size={24} strokeWidth={2.1} />
                </span>
                <div>
                  <strong>{item.label}</strong>
                  <p>{item.description}</p>
                </div>
                <em>{item.state}</em>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}

function ReadinessRow({
  description,
  label,
  ready,
}: {
  description: string;
  label: string;
  ready: boolean;
}) {
  return (
    <div className="settings-readiness-row">
      <span className={ready ? "ready" : "pending"}>{ready ? "완료" : "대기"}</span>
      <div>
        <strong>{label}</strong>
        <p>{description}</p>
      </div>
    </div>
  );
}

function getRoleLabel(role?: string) {
  if (role === "ADVERTISER") {
    return "광고주";
  }

  if (role === "BLOGGER") {
    return "블로거";
  }

  return "확인 필요";
}
