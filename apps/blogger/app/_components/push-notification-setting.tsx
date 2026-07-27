"use client";

import { BellRing, ChevronRight } from "lucide-react";
import { useEffect, useState, useTransition } from "react";

import { registerPushTokenAction } from "../_actions/blogger-actions";
import {
  isFirebasePushConfigured,
  listenForForegroundPush,
  requestFirebasePushToken,
} from "../_lib/firebase-client";
import { isIosDevice, isStandalonePwa } from "../_lib/pwa-client";

type PushNotificationSettingProps = {
  compact?: boolean;
};

export function PushNotificationSetting({ compact = false }: PushNotificationSettingProps) {
  const [message, setMessage] = useState<string>();
  const [requiresHomeScreenInstall, setRequiresHomeScreenInstall] = useState(false);
  const [isPending, startTransition] = useTransition();
  const isConfigured = isFirebasePushConfigured();

  useEffect(() => {
    setRequiresHomeScreenInstall(isIosDevice() && !isStandalonePwa());

    let unsubscribe: () => void = () => undefined;

    void listenForForegroundPush((payload) => {
      setMessage(
        payload.title == null
          ? "새 알림이 도착했어요."
          : `${payload.title}${payload.body == null ? "" : ` · ${payload.body}`}`,
      );
    }).then((stopListening) => {
      unsubscribe = stopListening;
    });

    return () => unsubscribe();
  }, []);

  const enablePushNotifications = () => {
    setMessage(undefined);
    startTransition(async () => {
      try {
        const token = await requestFirebasePushToken();
        const result = await registerPushTokenAction(token);
        setMessage(result.message);
      } catch (error) {
        setMessage(error instanceof Error ? error.message : "푸시 알림을 설정하지 못했어요.");
      }
    });
  };

  if (compact) {
    const isDisabled = !isConfigured || isPending || requiresHomeScreenInstall;

    return (
      <div className="profile-setting-row-group">
        <button
          aria-label={
            isPending
              ? "푸시 알림 설정 중"
              : requiresHomeScreenInstall
                ? "앱 설치 후 푸시 알림 설정 가능"
                : isConfigured
                  ? "푸시 알림 설정"
                  : "푸시 알림 사용 불가"
          }
          className="profile-setting-row"
          disabled={isDisabled}
          onClick={enablePushNotifications}
          type="button"
        >
          <BellRing aria-hidden="true" size={21} strokeWidth={2.1} />
          <span>
            <strong>{isPending ? "푸시 알림 설정 중..." : "푸시 알림"}</strong>
          </span>
          <ChevronRight aria-hidden="true" size={19} />
        </button>
        {message != null ? (
          <p className="profile-setting-guide" role="status">
            {message}
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <section className="profile-section push-setting" aria-labelledby="push-setting-title">
      <div className="section-head">
        <div>
          <p className="section-label">알림</p>
          <h2 id="push-setting-title">선정 결과 바로 받기</h2>
        </div>
        <BellRing aria-hidden="true" size={22} />
      </div>
      <p>캠페인 선정과 미션 검수 결과를 브라우저 알림으로 알려드려요.</p>
      <button
        className="primary-button weak-button full-width"
        disabled={!isConfigured || isPending || requiresHomeScreenInstall}
        onClick={enablePushNotifications}
        type="button"
      >
        {isPending
          ? "알림 설정 중..."
          : requiresHomeScreenInstall
            ? "홈 화면에 추가 후 알림 받기"
            : "푸시 알림 받기"}
      </button>
      {requiresHomeScreenInstall ? (
        <small>iPhone과 iPad에서는 홈 화면에 추가한 Pacto 앱에서 알림을 설정해 주세요.</small>
      ) : null}
      {!isConfigured ? (
        <small>VAPID 키를 포함한 Firebase 환경변수를 설정하면 사용할 수 있어요.</small>
      ) : null}
      {message != null ? <small role="status">{message}</small> : null}
    </section>
  );
}
