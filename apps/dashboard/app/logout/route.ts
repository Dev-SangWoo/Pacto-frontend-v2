import { redirect } from "next/navigation";

import { clearDashboardSession } from "../_lib/session";

export async function GET() {
  await clearDashboardSession();
  redirect("/login");
}
