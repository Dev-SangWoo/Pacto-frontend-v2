"use server";

import { ApiError, updateMyProfile } from "@pacto/api";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { getDashboardSession } from "../_lib/session";

export type AdvertiserProfileUpdateState = {
  message?: string;
  ok: boolean;
};

export async function updateAdvertiserProfileAction(
  _previousState: AdvertiserProfileUpdateState,
  formData: FormData,
): Promise<AdvertiserProfileUpdateState> {
  const session = await getDashboardSession();

  if (session.accessToken == null) {
    redirect("/login");
  }

  try {
    await updateMyProfile(
      {
        advertiserProfile: {
          accountHolder: readText(formData, "accountHolder"),
          accountNumber: readText(formData, "accountNumber"),
          bankName: readText(formData, "bankName"),
          brandName: readText(formData, "brandName"),
          businessNumber: readText(formData, "businessNumber"),
          companyName: readText(formData, "companyName"),
          contact: readText(formData, "contact"),
          managerName: readText(formData, "managerName"),
        },
      },
      session.accessToken,
    );
    revalidatePath("/dashboard/settings");

    return { message: "광고주 정보를 저장했어요.", ok: true };
  } catch (error) {
    if (error instanceof ApiError && error.statusCode === 401) {
      redirect("/login");
    }

    return {
      message:
        error instanceof Error && error.message.length > 0
          ? error.message
          : "광고주 정보를 저장하지 못했어요.",
      ok: false,
    };
  }
}

function readText(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}
