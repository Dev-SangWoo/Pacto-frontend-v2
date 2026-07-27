import { getMyWallet } from "@pacto/api";
import { formatPoint } from "@pacto/utils";
import { Landmark, ShieldCheck } from "lucide-react";
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
    <section
      className="screen-stack mobile-system-page withdrawal-system-page"
      aria-labelledby="withdrawals-title"
    >
      <header className="mobile-page-heading">
        <h1 id="withdrawals-title">출금 신청</h1>
        <p>받을 계좌와 금액을 확인하고 출금을 신청해 주세요.</p>
      </header>

      <section className="withdrawal-balance-card" aria-label="출금 가능 잔액">
        <div>
          <span>출금 가능 잔액</span>
          <strong>{formatPoint(wallet.availableBalance)}</strong>
        </div>
        <span className="withdrawal-balance-icon" aria-hidden="true">
          <Landmark size={26} strokeWidth={2} />
        </span>
      </section>

      <WithdrawalForm
        accessToken={session.accessToken}
        availableBalance={wallet.availableBalance}
      />

      <section className="withdrawal-notice" aria-labelledby="withdrawal-notice-title">
        <span className="withdrawal-notice-icon" aria-hidden="true">
          <ShieldCheck size={20} strokeWidth={2.1} />
        </span>
        <div>
          <h2 id="withdrawal-notice-title">신청 전 확인해 주세요</h2>
          <ul>
            <li>예금주와 계좌번호가 정확한지 다시 확인해 주세요.</li>
            <li>출금 신청 후에는 입력한 계좌를 변경할 수 없어요.</li>
          </ul>
        </div>
      </section>
    </section>
  );
}
