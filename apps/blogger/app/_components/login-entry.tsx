"use client";

import { Eye, EyeOff, LockKeyhole, Mail, ShieldCheck, UserRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { loginAction, signupAction } from "../_actions/auth-actions";
import { FlowCompletion } from "./flow-completion";

type AuthMode = "login" | "signup";

type LoginEntryProps = {
  sessionMessage?: string;
};

export function LoginEntry({ sessionMessage }: LoginEntryProps) {
  const [authMode, setAuthMode] = useState<AuthMode | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [isSignupComplete, setIsSignupComplete] = useState(false);
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
    const name = String(formData.get("name") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    setErrorMessage(undefined);
    startTransition(async () => {
      const result = isSignup
        ? await signupAction(email, password, name)
        : await loginAction(email, password);

      if (result.ok) {
        if (isSignup) {
          setIsSignupComplete(true);
          return;
        }

        router.push("/campaigns");
        router.refresh();
      } else {
        setErrorMessage(result.message);
      }
    });
  }

  if (isSignupComplete) {
    return (
      <section className="auth-studio">
        <FlowCompletion
          actions={
            <button
              className="primary-button full-width"
              onClick={() => {
                router.push("/campaigns");
                router.refresh();
              }}
              type="button"
            >
              캠페인 둘러보기
            </button>
          }
          description="가입한 계정으로 로그인되었어요. 이제 참여할 캠페인을 확인해 보세요."
          eyebrow="Pacto 가입 완료"
          title="회원가입이 완료되었습니다!"
        />
      </section>
    );
  }

  return (
    <section className="auth-studio" aria-labelledby="login-title">
      <div className={`auth-intro ${authMode == null ? "is-visible" : "is-hidden"}`}>
        <div className="identity-mark" aria-hidden="true">
          <img src="/brand/logo-bg-rm-cropped.webp" alt="" />
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

          {isSignup ? (
            <label>
              <span className="auth-label-with-help">
                이름
                <small>‘PJT_26반_4팀_홍길동’ 형식으로 입력해 주세요.</small>
              </span>
              <div className="input-shell">
                <UserRound aria-hidden="true" size={18} />
                <input
                  autoComplete="name"
                  name="name"
                  placeholder="PJT_26반_4팀_홍길동"
                  required
                  type="text"
                />
              </div>
            </label>
          ) : null}

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
            <span className={isSignup ? "auth-label-with-help" : undefined}>
              비밀번호
              {isSignup ? <small>베타 기간에는 테스트용 비밀번호를 사용해 주세요.</small> : null}
            </span>
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
            {isPending ? "처리 중" : isSignup ? "가입하고 시작하기" : "캠페인 보러가기"}
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
