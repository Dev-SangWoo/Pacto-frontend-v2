"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useState, useTransition } from "react";
import { ChevronRight, LogOut } from "lucide-react";

import { logoutWithPushAction } from "../_actions/auth-actions";
import { getExistingFirebasePushToken } from "../_lib/firebase-client";

type PushAwareLogoutButtonProps = {
  compact?: boolean;
};

export function PushAwareLogoutButton({ compact = false }: PushAwareLogoutButtonProps) {
  const [message, setMessage] = useState<string>();
  const [isPending, startTransition] = useTransition();
  const queryClient = useQueryClient();

  const logout = () => {
    setMessage(undefined);
    startTransition(async () => {
      try {
        const token = await getExistingFirebasePushToken();
        queryClient.clear();
        await logoutWithPushAction(token);
      } catch {
        setMessage("로그아웃하지 못했어요. 잠시 후 다시 시도해 주세요.");
      }
    });
  };

  if (compact) {
    return (
      <div className="profile-setting-row-group profile-logout-row-group">
        <button
          className="profile-setting-row profile-logout-row"
          disabled={isPending}
          onClick={logout}
          type="button"
        >
          <LogOut aria-hidden="true" size={21} strokeWidth={2.1} />
          <span>
            <strong>{isPending ? "로그아웃 중..." : "로그아웃"}</strong>
          </span>
          <ChevronRight aria-hidden="true" size={19} />
        </button>
        {message != null ? <p className="profile-setting-guide error">{message}</p> : null}
      </div>
    );
  }

  return (
    <div className="cta-stack">
      <button
        className="primary-button weak-button full-width"
        disabled={isPending}
        onClick={logout}
        type="button"
      >
        {isPending ? "로그아웃 중..." : "로그아웃"}
      </button>
      {message != null ? <p className="form-error">{message}</p> : null}
    </div>
  );
}
