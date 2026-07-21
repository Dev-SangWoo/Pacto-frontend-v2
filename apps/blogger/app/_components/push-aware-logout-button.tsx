"use client";

import { useState, useTransition } from "react";

import { logoutWithPushAction } from "../_actions/auth-actions";
import { getExistingFirebasePushToken } from "../_lib/firebase-client";

export function PushAwareLogoutButton() {
  const [message, setMessage] = useState<string>();
  const [isPending, startTransition] = useTransition();

  return (
    <div className="cta-stack">
      <button
        className="primary-button weak-button full-width"
        disabled={isPending}
        onClick={() => {
          setMessage(undefined);
          startTransition(async () => {
            try {
              const token = await getExistingFirebasePushToken();
              await logoutWithPushAction(token);
            } catch {
              setMessage("로그아웃하지 못했어요. 잠시 후 다시 시도해 주세요.");
            }
          });
        }}
        type="button"
      >
        {isPending ? "로그아웃 중..." : "로그아웃"}
      </button>
      {message != null ? <p className="form-error">{message}</p> : null}
    </div>
  );
}
