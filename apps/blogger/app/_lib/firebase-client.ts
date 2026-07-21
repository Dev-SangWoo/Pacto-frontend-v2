"use client";

import { getApp, getApps, initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
};

export function isFirebasePushConfigured() {
  return Boolean(
    firebaseConfig.apiKey &&
    firebaseConfig.appId &&
    firebaseConfig.messagingSenderId &&
    firebaseConfig.projectId &&
    process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
  );
}

export async function requestFirebasePushToken() {
  if (!isFirebasePushConfigured()) {
    throw new Error("Firebase Web Push 환경변수가 설정되지 않았어요.");
  }

  if (!(await isSupported())) {
    throw new Error("현재 브라우저에서는 웹 푸시를 지원하지 않아요.");
  }

  const permission = await Notification.requestPermission();

  if (permission !== "granted") {
    throw new Error("브라우저 알림 권한이 허용되지 않았어요.");
  }

  const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js");
  const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  const messaging = getMessaging(app);
  const token = await getToken(messaging, {
    serviceWorkerRegistration: registration,
    vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
  });

  if (token.length === 0) {
    throw new Error("푸시 토큰을 발급하지 못했어요. 잠시 후 다시 시도해 주세요.");
  }

  return token;
}

export async function getExistingFirebasePushToken() {
  if (
    !isFirebasePushConfigured() ||
    !(await isSupported()) ||
    Notification.permission !== "granted"
  ) {
    return undefined;
  }

  const registration = await navigator.serviceWorker.getRegistration();

  if (registration == null) {
    return undefined;
  }

  const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  const token = await getToken(getMessaging(app), {
    serviceWorkerRegistration: registration,
    vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
  });

  return token || undefined;
}

export async function listenForForegroundPush(
  listener: (payload: { body?: string; title?: string }) => void,
) {
  if (!isFirebasePushConfigured() || !(await isSupported())) {
    return () => undefined;
  }

  const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  return onMessage(getMessaging(app), (payload) => {
    listener({ body: payload.notification?.body, title: payload.notification?.title });
  });
}
