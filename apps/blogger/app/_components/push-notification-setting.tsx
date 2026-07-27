"use client";

import { BellRing, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

import { isFirebasePushConfigured, listenForForegroundPush } from "../_lib/firebase-client";
import { useDeviceSetup } from "./device-setup-provider";

type PushNotificationSettingProps = {
  compact?: boolean;
};

export function PushNotificationSetting({ compact = false }: PushNotificationSettingProps) {
  const [message, setMessage] = useState<string>();
  const {
    enablePushNotifications: requestPushNotifications,
    isPushEnabled,
    isPushPending,
    isPushStatusLoading,
    pushStatusMessage,
    refreshPushStatus,
    requiresHomeScreenInstall,
  } = useDeviceSetup();
  const isConfigured = isFirebasePushConfigured();

  useEffect(() => {
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

  const handleEnablePushNotifications = () => {
    setMessage(undefined);
    void requestPushNotifications().then((result) =>
      setMessage(
        result.message ??
          (result.ok ? "푸시 알림을 설정했어요." : "푸시 알림을 설정하지 못했어요."),
      ),
    );
  };
  const visibleMessage = message ?? pushStatusMessage;

  if (compact) {
    const isDisabled =
      !isConfigured ||
      isPushPending ||
      isPushStatusLoading ||
      requiresHomeScreenInstall ||
      isPushEnabled;

    return (
      <div className="profile-setting-row-group">
        <button
          aria-label={
            isPushStatusLoading
              ? "푸시 상태 확인 중"
              : isPushPending
                ? "푸시 알림 설정 중"
                : isPushEnabled
                  ? "푸시 알림 등록 완료"
                  : requiresHomeScreenInstall
                    ? "앱 설치 후 푸시 알림 설정 가능"
                    : isConfigured
                      ? "푸시 알림 설정"
                      : "푸시 알림 사용 불가"
          }
          className="profile-setting-row"
          disabled={isDisabled}
          onClick={handleEnablePushNotifications}
          type="button"
        >
          <BellRing aria-hidden="true" size={21} strokeWidth={2.1} />
          <span>
            <strong>
              {isPushStatusLoading
                ? "푸시 상태 확인 중..."
                : isPushPending
                  ? "푸시 알림 설정 중..."
                  : isPushEnabled
                    ? "푸시 알림 등록 완료"
                    : visibleMessage != null
                      ? "푸시 알림 다시 시도"
                      : "푸시 알림"}
            </strong>
          </span>
          <ChevronRight aria-hidden="true" size={19} />
        </button>
        {visibleMessage != null ? (
          <div className="profile-push-status-message" role="status">
            <p className="profile-setting-guide">{visibleMessage}</p>
            {!isPushEnabled && isConfigured && !requiresHomeScreenInstall ? (
              <button
                className="text-link-button"
                disabled={isPushStatusLoading || isPushPending}
                onClick={() => void refreshPushStatus()}
                type="button"
              >
                상태 다시 확인
              </button>
            ) : null}
          </div>
        ) : !isPushEnabled && isConfigured && !requiresHomeScreenInstall ? (
          <button
            className="text-link-button"
            disabled={isPushStatusLoading || isPushPending}
            onClick={() => void refreshPushStatus()}
            type="button"
          >
            상태 다시 확인
          </button>
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
        disabled={
          !isConfigured ||
          isPushPending ||
          isPushStatusLoading ||
          requiresHomeScreenInstall ||
          isPushEnabled
        }
        onClick={handleEnablePushNotifications}
        type="button"
      >
        {isPushStatusLoading
          ? "푸시 상태 확인 중..."
          : isPushPending
            ? "알림 설정 중..."
            : isPushEnabled
              ? "푸시 알림 등록 완료"
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
      {visibleMessage != null ? (
        <div className="push-status-message" role="status">
          <small>{visibleMessage}</small>
          {!isPushEnabled && isConfigured && !requiresHomeScreenInstall ? (
            <button
              className="text-link-button"
              disabled={isPushStatusLoading || isPushPending}
              onClick={() => void refreshPushStatus()}
              type="button"
            >
              상태 다시 확인
            </button>
          ) : null}
        </div>
      ) : !isPushEnabled && isConfigured && !requiresHomeScreenInstall ? (
        <button
          className="text-link-button"
          disabled={isPushStatusLoading || isPushPending}
          onClick={() => void refreshPushStatus()}
          type="button"
        >
          상태 다시 확인
        </button>
      ) : null}
    </section>
  );
}
