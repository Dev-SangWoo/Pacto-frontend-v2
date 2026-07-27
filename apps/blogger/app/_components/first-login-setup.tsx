"use client";

import { BellRing, Check, Download, Smartphone, X } from "lucide-react";
import { useEffect, useMemo, useState, useTransition } from "react";

import { registerPushTokenAction } from "../_actions/blogger-actions";
import { usePwaInstall } from "./pwa-install-provider";

type FirstLoginSetupProps = {
  bloggerId: number;
};

export function FirstLoginSetup({ bloggerId }: FirstLoginSetupProps) {
  const { install, isInstalled, isIos, isPromptAvailable } = usePwaInstall();
  const [isOpen, setIsOpen] = useState(false);
  const [installAccepted, setInstallAccepted] = useState(false);
  const [notificationEnabled, setNotificationEnabled] = useState(false);
  const [message, setMessage] = useState<string>();
  const [isInstalling, startInstall] = useTransition();
  const [isEnablingNotifications, startNotifications] = useTransition();
  const storageKey = useMemo(() => `pacto:first-login-setup:v1:${bloggerId}`, [bloggerId]);
  const isInstallComplete = isInstalled || installAccepted;

  useEffect(() => {
    const permissionGranted =
      typeof Notification !== "undefined" && Notification.permission === "granted";
    setNotificationEnabled(permissionGranted);

    if (window.localStorage.getItem(storageKey) === "done") {
      return;
    }

    const openTimer = window.setTimeout(() => {
      setIsOpen(true);
    }, 600);

    return () => {
      window.clearTimeout(openTimer);
    };
  }, [storageKey]);

  useEffect(() => {
    if (isOpen && isInstallComplete && notificationEnabled) {
      window.localStorage.setItem(storageKey, "done");
      setIsOpen(false);
    }
  }, [isInstallComplete, isOpen, notificationEnabled, storageKey]);

  function closeSetup() {
    window.localStorage.setItem(storageKey, "done");
    setIsOpen(false);
  }

  function requestInstall() {
    setMessage(undefined);
    startInstall(async () => {
      const outcome = await install();

      if (outcome === "accepted") {
        setInstallAccepted(true);
        setMessage("앱 설치를 시작했어요. 이어서 알림도 설정해 주세요.");
        return;
      }

      if (outcome === "dismissed") {
        setMessage("설치를 취소했어요. 내 정보에서 언제든 다시 설치할 수 있어요.");
        return;
      }

      setMessage(
        isIos
          ? "Safari 공유 메뉴에서 ‘홈 화면에 추가’를 선택해 주세요."
          : "브라우저 메뉴에서 ‘앱 설치’ 또는 ‘홈 화면에 추가’를 선택해 주세요.",
      );
    });
  }

  function enableNotifications() {
    setMessage(undefined);
    startNotifications(async () => {
      try {
        const { requestFirebasePushToken } = await import("../_lib/firebase-client");
        const token = await requestFirebasePushToken();
        const result = await registerPushTokenAction(token);

        if (!result.ok) {
          setMessage(result.message ?? "알림을 설정하지 못했어요.");
          return;
        }

        setNotificationEnabled(true);
        setMessage("알림 설정이 완료됐어요.");
      } catch (error) {
        setMessage(error instanceof Error ? error.message : "알림을 설정하지 못했어요.");
      }
    });
  }

  if (!isOpen) {
    return null;
  }

  const requiresIosInstall = isIos && !isInstallComplete;

  return (
    <div className="first-login-setup-backdrop">
      <section
        aria-labelledby="first-login-setup-title"
        aria-modal="true"
        className="first-login-setup"
        role="dialog"
      >
        <button
          aria-label="초기 설정 나중에 하기"
          className="first-login-setup-close"
          onClick={closeSetup}
          type="button"
        >
          <X aria-hidden="true" size={19} />
        </button>

        <div className="first-login-setup-heading">
          <span aria-hidden="true">
            <Smartphone size={25} strokeWidth={2.1} />
          </span>
          <p>처음 오셨군요</p>
          <h2 id="first-login-setup-title">Pacto를 앱처럼 사용해 보세요</h2>
          <small>홈 화면에 설치하고 중요한 캠페인 소식을 바로 받을 수 있어요.</small>
        </div>

        <div className="first-login-setup-options">
          <article className={isInstallComplete ? "is-complete" : undefined}>
            <span aria-hidden="true">
              {isInstallComplete ? <Check size={20} /> : <Download size={20} />}
            </span>
            <div>
              <strong>{isInstallComplete ? "앱 설치 완료" : "홈 화면에 앱 설치"}</strong>
              <p>
                {isInstallComplete
                  ? "주소창 없이 Pacto를 빠르게 열 수 있어요."
                  : "브라우저를 다시 찾지 않고 바로 접속할 수 있어요."}
              </p>
            </div>
            {!isInstallComplete ? (
              <button disabled={isInstalling} onClick={requestInstall} type="button">
                {isInstalling ? "설치 확인 중" : isPromptAvailable ? "설치하기" : "설치 방법"}
              </button>
            ) : null}
          </article>

          <article className={notificationEnabled ? "is-complete" : undefined}>
            <span aria-hidden="true">
              {notificationEnabled ? <Check size={20} /> : <BellRing size={20} />}
            </span>
            <div>
              <strong>{notificationEnabled ? "알림 설정 완료" : "중요 알림 받기"}</strong>
              <p>선정 결과와 미션 검수 상태를 놓치지 않도록 알려드려요.</p>
            </div>
            {!notificationEnabled ? (
              <button
                disabled={isEnablingNotifications || requiresIosInstall}
                onClick={enableNotifications}
                type="button"
              >
                {isEnablingNotifications
                  ? "설정 중"
                  : requiresIosInstall
                    ? "설치 후 가능"
                    : "알림 허용"}
              </button>
            ) : null}
          </article>
        </div>

        {message != null ? (
          <p className="first-login-setup-message" role="status">
            {message}
          </p>
        ) : null}

        <button className="first-login-setup-later" onClick={closeSetup} type="button">
          다음에 할게요
        </button>
      </section>
    </div>
  );
}
