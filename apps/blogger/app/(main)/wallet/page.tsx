import { redirect } from "next/navigation";

import { WalletPageClient } from "../../_components/wallet-page-client";
import { getBloggerSession } from "../../_lib/session";

export default async function WalletPage() {
  const session = await getBloggerSession();

  if (session.accessToken == null) {
    redirect("/login");
  }

  return <WalletPageClient />;
}
