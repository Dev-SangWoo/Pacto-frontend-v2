"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { loginAction, signupAction } from "../_actions/auth-actions";

type AuthStep = "login" | "signup" | null;

export function LoginEntry() {
  const [authStep, setAuthStep] = useState<AuthStep>(null);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleAuthSubmit(formData: FormData, mode: Exclude<AuthStep, null>) {
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    setErrorMessage(undefined);
    startTransition(async () => {
      const result =
        mode === "login" ? await loginAction(email, password) : await signupAction(email, password);

      if (result.ok) {
        router.push("/campaigns");
      } else {
        setErrorMessage(result.message);
      }
    });
  }

  return (
    <section className="auth-panel auth-panel-hero" aria-labelledby="login-title">
      <div className="auth-brand">
        <span aria-hidden="true">P</span>
        <strong>PACTO</strong>
      </div>

      <div className="auth-hero-card" aria-label="오늘의 캠페인 미리보기">
        <img src="/campaigns/seongsu-brunch-cafe.png" alt="성수 브런치 카페 캠페인" />
        <div className="auth-hero-overlay">
          <span>오늘 추천</span>
          <strong>성수 브런치 카페 체험단</strong>
          <p>50,000P</p>
        </div>
      </div>

      <div className="auth-heading">
        <h1 id="login-title">내 리뷰가 수익이 되는 캠페인</h1>
        <p>지원부터 미션 제출, 정산까지 한 화면에서 이어져요.</p>
      </div>

      {authStep === "login" ? (
        <div className="auth-login-step">
          <div className="auth-step-heading">
            <strong>계정으로 로그인</strong>
            <p>가입한 이메일과 비밀번호를 입력해요.</p>
          </div>
          <form
            className="login-form"
            aria-label="블로거 로그인"
            onSubmit={(event) => {
              event.preventDefault();
              handleAuthSubmit(new FormData(event.currentTarget), "login");
            }}
          >
            {errorMessage != null ? <p>{errorMessage}</p> : null}
            <label>
              이메일
              <input
                autoComplete="email"
                inputMode="email"
                name="email"
                placeholder="blogger@pacto.test"
                type="email"
              />
            </label>
            <label>
              비밀번호
              <input
                autoComplete="current-password"
                name="password"
                placeholder="비밀번호를 입력하세요"
                type="password"
              />
            </label>
            <button className="primary-button" disabled={isPending} type="submit">
              {isPending ? "로그인 중" : "로그인하고 캠페인 보기"}
            </button>
          </form>

          <button className="text-button" onClick={() => setAuthStep(null)} type="button">
            처음 화면으로 돌아가기
          </button>
        </div>
      ) : authStep === "signup" ? (
        <div className="auth-login-step">
          <div className="auth-step-heading">
            <strong>크리에이터 가입</strong>
            <p>캠페인 안내와 정산 알림을 받을 정보를 입력해요.</p>
          </div>
          <form
            className="login-form"
            aria-label="블로거 회원가입"
            onSubmit={(event) => {
              event.preventDefault();
              handleAuthSubmit(new FormData(event.currentTarget), "signup");
            }}
          >
            {errorMessage != null ? <p>{errorMessage}</p> : null}
            <label>
              이메일
              <input
                autoComplete="email"
                inputMode="email"
                name="email"
                placeholder="이메일을 입력하세요"
                type="email"
              />
            </label>
            <label>
              비밀번호
              <input
                autoComplete="new-password"
                name="password"
                placeholder="8자 이상 입력하세요"
                type="password"
              />
            </label>
            <label>
              블로그 주소
              <input
                autoComplete="url"
                inputMode="url"
                placeholder="https://blog.example.com"
                type="url"
              />
            </label>
            <button className="primary-button" disabled={isPending} type="submit">
              {isPending ? "가입 중" : "가입하고 캠페인 보기"}
            </button>
          </form>

          <button className="text-button" onClick={() => setAuthStep(null)} type="button">
            처음 화면으로 돌아가기
          </button>
        </div>
      ) : (
        <div className="auth-actions">
          <Link className="kakao-button" href="/campaigns">
            카카오로 3초 만에 시작하기
          </Link>
          <button className="primary-button" onClick={() => setAuthStep("login")} type="button">
            이메일로 로그인
          </button>
          <div className="auth-secondary-actions">
            <button type="button" onClick={() => setAuthStep("signup")}>
              회원가입
            </button>
            <span aria-hidden="true" />
            <button type="button" onClick={() => setAuthStep("login")}>
              비밀번호 찾기
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
