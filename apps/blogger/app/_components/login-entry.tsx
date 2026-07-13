"use client";

import { ArrowLeft, ArrowRight, Eye, EyeOff, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { loginAction, signupAction } from "../_actions/auth-actions";

type AuthMode = "login" | "signup";

type LoginEntryProps = {
  sessionMessage?: string;
};

export function LoginEntry({ sessionMessage }: LoginEntryProps) {
  const [authMode, setAuthMode] = useState<AuthMode | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const isSignup = authMode === "signup";

  function openAuth(nextMode: AuthMode) {
    setAuthMode(nextMode);
    setShowPassword(false);
    setErrorMessage(undefined);
  }

  function handleAuthSubmit(formData: FormData) {
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    setErrorMessage(undefined);
    startTransition(async () => {
      const result = isSignup
        ? await signupAction(email, password)
        : await loginAction(email, password);

      if (result.ok) {
        router.push("/campaigns");
        router.refresh();
      } else {
        setErrorMessage(result.message);
      }
    });
  }

  return (
    <section className="auth-studio" aria-labelledby="login-title">
      <div className={`auth-intro ${authMode == null ? "is-visible" : "is-hidden"}`}>
        <div className="identity-mark" aria-hidden="true">
          <img src="/brand/logo-bg-rm-cropped.png" alt="" />
        </div>
        <h1 id="login-title" className="visually-hidden">
          Pacto 안전한 블로그 캠페인
        </h1>
        <div className="identity-copy">
          <ShieldCheck aria-hidden="true" size={18} />
          <span>안전한 블로그 캠페인</span>
        </div>
        {sessionMessage != null ? (
          <p className="form-error auth-session-message">{sessionMessage}</p>
        ) : null}
        <div className="auth-entry-actions" aria-label="계정 시작">
          <button className="primary-button" onClick={() => openAuth("login")} type="button">
            로그인
          </button>
          <button className="text-link-button" onClick={() => openAuth("signup")} type="button">
            회원가입
          </button>
        </div>
      </div>

      <div className={`auth-form-panel ${authMode == null ? "is-hidden" : "is-visible"}`}>
        <button
          aria-label="처음 화면으로 돌아가기"
          className="auth-back-button"
          onClick={() => {
            setAuthMode(null);
            setErrorMessage(undefined);
          }}
          type="button"
        >
          <ArrowLeft aria-hidden="true" size={18} />
        </button>

        <div className="auth-form-heading">
          <p>Pacto Creator</p>
          <h2>{isSignup ? "회원가입" : "로그인"}</h2>
        </div>

        <form
          className="modern-login-form"
          onSubmit={(event) => {
            event.preventDefault();
            handleAuthSubmit(new FormData(event.currentTarget));
          }}
        >
          {errorMessage != null ? <p className="form-error">{errorMessage}</p> : null}

          <label>
            <span>이메일</span>
            <div className="input-shell">
              <Mail aria-hidden="true" size={18} />
              <input
                autoComplete="email"
                inputMode="email"
                name="email"
                placeholder="blogger@pacto.test"
                required
                type="email"
              />
            </div>
          </label>

          <label>
            <span>비밀번호</span>
            <div className="input-shell">
              <LockKeyhole aria-hidden="true" size={18} />
              <input
                autoComplete={isSignup ? "new-password" : "current-password"}
                minLength={isSignup ? 8 : 4}
                name="password"
                placeholder={isSignup ? "8자 이상 입력" : "비밀번호 입력"}
                required
                type={showPassword ? "text" : "password"}
              />
              <button
                aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
                onClick={() => setShowPassword((current) => !current)}
                type="button"
              >
                {showPassword ? (
                  <EyeOff aria-hidden="true" size={18} />
                ) : (
                  <Eye aria-hidden="true" size={18} />
                )}
              </button>
            </div>
          </label>

          <button className="primary-button auth-submit" disabled={isPending} type="submit">
            <span>
              {isPending ? "처리 중" : isSignup ? "가입하고 시작하기" : "캠페인 보러가기"}
            </span>
            <ArrowRight aria-hidden="true" size={18} />
          </button>
        </form>

        <button
          className="text-link-button auth-switch-button"
          onClick={() => openAuth(isSignup ? "login" : "signup")}
          type="button"
        >
          {isSignup ? "이미 계정이 있나요? 로그인" : "처음이신가요? 회원가입"}
        </button>
      </div>
    </section>
  );
}
