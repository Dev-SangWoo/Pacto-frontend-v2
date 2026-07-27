"use client";

import type { Notification } from "@pacto/types";
import { BellRing, ChevronRight, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";

import { getUnreadNotificationsAction, readNotificationAction } from "../_actions/blogger-actions";
import { AppHeader } from "./app-nav";

type FloatingNotification = {
  content: string;
  id?: number;
  key: string;
  targetUrl?: string;
  title: string;
};

type NotificationExperienceProps = {
  initialNotifications: Notification[];
};

const AUTO_DISMISS_MS = 5_000;
const POLL_INTERVAL_MS = 60_000;
const DUPLICATE_WINDOW_MS = 60_000;

export function NotificationExperience({ initialNotifications }: NotificationExperienceProps) {
  const router = useRouter();
  const [queue, setQueue] = useState<FloatingNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(initialNotifications.length);
  const [, startTransition] = useTransition();
  const knownNotificationIds = useRef(
    new Set(initialNotifications.map((notification) => notification.id)),
  );
  const recentSignatures = useRef(new Map<string, number>());
  const isSyncingNotifications = useRef(false);
  const currentNotification = queue[0];

  const enqueueNotification = useCallback((notification: Omit<FloatingNotification, "key">) => {
    if (notification.id != null && knownNotificationIds.current.has(notification.id)) {
      return false;
    }

    const signature = getNotificationSignature(notification);
    const now = Date.now();
    const lastSeenAt = recentSignatures.current.get(signature);

    if (lastSeenAt != null && now - lastSeenAt < DUPLICATE_WINDOW_MS) {
      if (notification.id != null) {
        knownNotificationIds.current.add(notification.id);
      }
      return false;
    }

    recentSignatures.current.set(signature, now);

    if (notification.id != null) {
      knownNotificationIds.current.add(notification.id);
    }

    setQueue((currentQueue) => [
      ...currentQueue,
      {
        ...notification,
        key: notification.id == null ? `${signature}:${now}` : `notification:${notification.id}`,
      },
    ]);
    return true;
  }, []);

  const syncServerNotifications = useCallback(async () => {
    if (
      isSyncingNotifications.current ||
      document.visibilityState !== "visible" ||
      !navigator.onLine
    ) {
      return;
    }

    isSyncingNotifications.current = true;

    try {
      const unreadNotifications = await getUnreadNotificationsAction();
      setUnreadCount(unreadNotifications.length);

      unreadNotifications
        .filter((notification) => !knownNotificationIds.current.has(notification.id))
        .sort(
          (left, right) => new Date(left.createdAt).getTime() - new Date(right.createdAt).getTime(),
        )
        .forEach((notification) => {
          enqueueNotification({
            content: notification.content,
            id: notification.id,
            targetUrl: notification.targetUrl,
            title: notification.title,
          });
        });
    } finally {
      isSyncingNotifications.current = false;
    }
  }, [enqueueNotification]);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      void syncServerNotifications();
    }, POLL_INTERVAL_MS);
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        void syncServerNotifications();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.clearInterval(intervalId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [syncServerNotifications]);

  useEffect(() => {
    let unsubscribe: () => void = () => undefined;
    let isCancelled = false;

    void import("../_lib/firebase-client")
      .then(({ listenForForegroundPush }) =>
        listenForForegroundPush((payload) => {
          const didEnqueue = enqueueNotification({
            content: payload.body?.trim() || "새로운 활동 알림이 도착했어요.",
            id: payload.notificationId,
            targetUrl: payload.targetUrl,
            title: payload.title?.trim() || "새 알림",
          });

          if (didEnqueue) {
            setUnreadCount((currentCount) => currentCount + 1);
          }
        }),
      )
      .then((stopListening) => {
        if (isCancelled) {
          stopListening();
          return;
        }

        unsubscribe = stopListening;
      })
      .catch(() => undefined);

    return () => {
      isCancelled = true;
      unsubscribe();
    };
  }, [enqueueNotification, syncServerNotifications]);

  const dismissCurrentNotification = useCallback(() => {
    setQueue((currentQueue) => currentQueue.slice(1));
  }, []);

  useEffect(() => {
    if (currentNotification == null) {
      return;
    }

    const timeoutId = window.setTimeout(dismissCurrentNotification, AUTO_DISMISS_MS);
    return () => window.clearTimeout(timeoutId);
  }, [currentNotification, dismissCurrentNotification]);

  function openCurrentNotification() {
    if (currentNotification == null) {
      return;
    }

    const targetUrl = getSafeTargetUrl(currentNotification.targetUrl);
    dismissCurrentNotification();

    if (currentNotification.id == null) {
      router.push(targetUrl);
      return;
    }

    const notificationId = currentNotification.id;
    setUnreadCount((currentCount) => Math.max(currentCount - 1, 0));
    startTransition(async () => {
      await readNotificationAction(notificationId, targetUrl);
    });
  }

  return (
    <>
      <AppHeader notificationCount={unreadCount} />
      <div className="floating-notification-region" aria-live="polite" aria-atomic="true">
        {currentNotification == null ? null : (
          <aside className="floating-notification-card" key={currentNotification.key} role="status">
            <button
              className="floating-notification-content"
              onClick={openCurrentNotification}
              type="button"
            >
              <span className="floating-notification-icon" aria-hidden="true">
                <BellRing size={19} strokeWidth={2.1} />
              </span>
              <span className="floating-notification-copy">
                <strong>{currentNotification.title}</strong>
                <span>{currentNotification.content}</span>
              </span>
              <ChevronRight
                className="floating-notification-chevron"
                aria-hidden="true"
                size={18}
                strokeWidth={2}
              />
            </button>
            <button
              aria-label="알림 닫기"
              className="floating-notification-close"
              onClick={dismissCurrentNotification}
              type="button"
            >
              <X aria-hidden="true" size={16} strokeWidth={2} />
            </button>
            <span className="floating-notification-timer" aria-hidden="true" />
          </aside>
        )}
      </div>
    </>
  );
}

function getNotificationSignature(notification: {
  content: string;
  targetUrl?: string;
  title: string;
}) {
  return `${notification.title.trim()}|${notification.content.trim()}|${notification.targetUrl ?? ""}`;
}

function getSafeTargetUrl(targetUrl?: string) {
  if (targetUrl?.startsWith("/") && !targetUrl.startsWith("//")) {
    return targetUrl;
  }

  return "/notifications";
}
