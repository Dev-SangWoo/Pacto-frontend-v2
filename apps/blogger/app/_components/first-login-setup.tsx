"use client";

import { BellRing, Check, Download, Smartphone, X } from "lucide-react";
import { useEffect, useState } from "react";

import { useDeviceSetup } from "./device-setup-provider";

export function FirstLoginSetup() {
  const {
    dismissSetup,
    enablePushNotifications,
    installPwa,
    isIos,
    isPwaInstalled,
    isPushEnabled,
    isPushPending,
    isPromptAvailable,
    isReady,
    isSetupDismissed,
    requiresHomeScreenInstall,
  } = useDeviceSetup();
  const [message, setMessage] = useState<string>();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isReady || isSetupDismissed) {
      setIsVisible(false);
      return;
    }

    const openTimer = window.setTimeout(() => setIsVisible(true), 600);
    return () => window.clearTimeout(openTimer);
  }, [isReady, isSetupDismissed]);

  useEffect(() => {
    if (isReady && !isSetupDismissed && isPwaInstalled && isPushEnabled) {
      dismissSetup();
    }
  }, [dismissSetup, isPwaInstalled, isPushEnabled, isReady, isSetupDismissed]);

  function closeSetup() {
    dismissSetup();
  }

  async function requestInstall() {
    setMessage(undefined);
    const outcome = await installPwa();

    if (outcome === "accepted") {
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
  }

  async function enableNotifications() {
    setMessage(undefined);
    const result = await enablePushNotifications();
    setMessage(
      result.ok ? "알림 등록이 완료됐어요." : (result.message ?? "알림을 설정하지 못했어요."),
    );
  }

  if (!isReady || isSetupDismissed || !isVisible) {
    return null;
  }

  const isInstallComplete = isPwaInstalled;
  const notificationEnabled = isPushEnabled;

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
              <button onClick={() => void requestInstall()} type="button">
                {isPromptAvailable ? "설치하기" : "설치 방법"}
              </button>
            ) : null}
          </article>

          {!isInstallComplete ? (
            <div className="first-login-install-guides" aria-label="기기별 앱 설치 방법">
              <div>
                <strong>iPhone · iPad</strong>
                <p>Safari 하단의 공유 버튼을 누르고 ‘홈 화면에 추가’를 선택해 주세요.</p>
              </div>
              <div>
                <strong>Galaxy · Android</strong>
                <p>Chrome 오른쪽 위 메뉴에서 ‘앱 설치’ 또는 ‘홈 화면에 추가’를 선택해 주세요.</p>
              </div>
            </div>
          ) : null}

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
                disabled={isPushPending || requiresHomeScreenInstall}
                onClick={() => void enableNotifications()}
                type="button"
              >
                {isPushPending
                  ? "설정 중"
                  : requiresHomeScreenInstall
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
