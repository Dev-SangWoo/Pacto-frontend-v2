import { getMyWallet } from "@pacto/api";
import { formatPoint } from "@pacto/utils";
import { redirect } from "next/navigation";

import { redirectOnAuthError } from "../../_lib/auth-error";
import { getBloggerSession } from "../../_lib/session";
import { WithdrawalForm } from "./_components/withdrawal-form";

export default async function WithdrawalsPage() {
  const session = await getBloggerSession();

  if (session.accessToken == null) {
    redirect("/login");
  }

  const wallet = await getMyWallet(session.accessToken).catch(redirectOnAuthError);

  return (
    <section className="screen-stack detail-screen" aria-labelledby="withdrawals-title">
      <section className="money-hero compact-hero">
        <p className="section-label">출금 신청</p>
        <h1 id="withdrawals-title">출금 가능 잔액</h1>
        <strong>{formatPoint(wallet.availableBalance)}</strong>
      </section>

      <WithdrawalForm
        accessToken={session.accessToken}
        availableBalance={wallet.availableBalance}
      />

      <section className="section-block" aria-labelledby="account-title">
        <div className="section-head">
          <div>
            <p className="section-label">계정 정보</p>
            <h2 id="account-title">로그인 정보</h2>
          </div>
        </div>
        <div className="info-list">
          <div>
            <span>이메일</span>
            <strong>{session.email ?? "로그인이 필요해요"}</strong>
          </div>
          <div>
            <span>사용자 유형</span>
            <strong>블로거</strong>
          </div>
        </div>
      </section>
    </section>
  );
}
