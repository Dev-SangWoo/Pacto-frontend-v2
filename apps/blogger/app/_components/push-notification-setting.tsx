"use client";

import { BellRing } from "lucide-react";
import { useEffect, useState, useTransition } from "react";

import { registerPushTokenAction } from "../_actions/blogger-actions";
import {
  isFirebasePushConfigured,
  listenForForegroundPush,
  requestFirebasePushToken,
} from "../_lib/firebase-client";

export function PushNotificationSetting() {
  const [message, setMessage] = useState<string>();
  const [isPending, startTransition] = useTransition();
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
        disabled={!isConfigured || isPending}
        onClick={() => {
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
        }}
        type="button"
      >
        {isPending ? "알림 설정 중..." : "푸시 알림 받기"}
      </button>
      {!isConfigured ? (
        <small>VAPID 키를 포함한 Firebase 환경변수를 설정하면 사용할 수 있어요.</small>
      ) : null}
      {message != null ? <small role="status">{message}</small> : null}
    </section>
  );
}
