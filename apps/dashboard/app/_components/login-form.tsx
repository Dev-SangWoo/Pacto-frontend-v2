"use client";

import { useActionState } from "react";

import { loginAction } from "../_actions/auth-actions";
import type { DashboardLoginState } from "../_actions/auth-actions";

const initialState: DashboardLoginState = {};

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="dashboard-login-form">
      <label>
        <span>이메일</span>
        <input autoComplete="email" name="email" placeholder="admin@pacto.co.kr" type="email" />
      </label>
      <label>
        <span>비밀번호</span>
        <input
          autoComplete="current-password"
          name="password"
          placeholder="비밀번호를 입력하세요"
          type="password"
        />
        <small>베타 기간에는 실제 사용하는 비밀번호 대신 테스트용 비밀번호를 사용해 주세요.</small>
      </label>
      {state.message != null ? (
        <p className="form-error" role="alert">
          {state.message}
        </p>
      ) : null}
      <button className="primary-button wide" disabled={isPending} type="submit">
        {isPending ? "확인 중..." : "대시보드 로그인"}
      </button>
    </form>
  );
}
