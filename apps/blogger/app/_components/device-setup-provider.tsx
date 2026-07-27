"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import { registerPushTokenAction } from "../_actions/blogger-actions";
import { usePwaInstall } from "./pwa-install-provider";

type DeviceSetupStatus = {
  isSetupDismissed: boolean;
  pwaInstalled: boolean;
  pushEnabled: boolean;
};

type DeviceSetupContextValue = {
  dismissSetup: () => void;
  enablePushNotifications: () => Promise<{ message?: string; ok: boolean }>;
  installPwa: () => Promise<"accepted" | "dismissed" | "unavailable">;
  isIos: boolean;
  isPwaInstalled: boolean;
  isPushEnabled: boolean;
  isPushPending: boolean;
  isPushStatusLoading: boolean;
  isReady: boolean;
  isSetupDismissed: boolean;
  isPromptAvailable: boolean;
  pwaMessage?: string;
  pushStatusMessage?: string;
  refreshPushStatus: () => Promise<{ message?: string; ok: boolean }>;
  requiresHomeScreenInstall: boolean;
};

const defaultStatus: DeviceSetupStatus = {
  isSetupDismissed: false,
  pwaInstalled: false,
  pushEnabled: false,
};

const DeviceSetupContext = createContext<DeviceSetupContextValue | undefined>(undefined);

export function DeviceSetupProvider({
  bloggerId,
  children,
}: {
  bloggerId: number;
  children: React.ReactNode;
}) {
  const { install, isInstalled, isIos, isPromptAvailable, message: pwaMessage } = usePwaInstall();
  const storageKey = `pacto:device-setup:v1:${bloggerId}`;
  const legacyStorageKey = `pacto:first-login-setup:v1:${bloggerId}`;
  const [status, setStatus] = useState<DeviceSetupStatus>(defaultStatus);
  const [isStorageReady, setIsStorageReady] = useState(false);
  const [isPushPending, setIsPushPending] = useState(false);
  const [isPushStatusLoading, setIsPushStatusLoading] = useState(true);
  const [pushStatusMessage, setPushStatusMessage] = useState<string>();

  const updateStatus = useCallback(
    (update: (current: DeviceSetupStatus) => DeviceSetupStatus) => {
      setStatus((current) => {
        const next = update(current);
        window.localStorage.setItem(storageKey, JSON.stringify(next));
        return next;
      });
    },
    [storageKey],
  );

  const refreshPushStatus = useCallback(async () => {
    setIsPushStatusLoading(true);
    setPushStatusMessage(undefined);

    try {
      const { getExistingFirebasePushToken, isFirebasePushConfigured } =
        await import("../_lib/firebase-client");

      if (!isFirebasePushConfigured()) {
        const message = "푸시 알림 환경이 아직 준비되지 않았어요.";
        updateStatus((current) => ({ ...current, pushEnabled: false }));
        setPushStatusMessage(message);
        return { message, ok: false };
      }

      const token = await getExistingFirebasePushToken();
      if (token == null) {
        const message = "알림 권한 또는 푸시 토큰을 확인하지 못했어요.";
        updateStatus((current) => ({ ...current, pushEnabled: false }));
        setPushStatusMessage(message);
        return { message, ok: false };
      }

      const result = await registerPushTokenAction(token);
      updateStatus((current) => ({ ...current, pushEnabled: result.ok }));
      setPushStatusMessage(result.ok ? undefined : result.message);
      return result;
    } catch (error) {
      const message = error instanceof Error ? error.message : "푸시 상태를 확인하지 못했어요.";
      updateStatus((current) => ({ ...current, pushEnabled: false }));
      setPushStatusMessage(message);
      return { message, ok: false };
    } finally {
      setIsPushStatusLoading(false);
    }
  }, [updateStatus]);

  useEffect(() => {
    const stored = readStoredStatus(storageKey);
    const wasPreviouslyDismissed = window.localStorage.getItem(legacyStorageKey) === "done";

    const next = {
      ...stored,
      isSetupDismissed: stored.isSetupDismissed || wasPreviouslyDismissed,
      pwaInstalled: stored.pwaInstalled || isInstalled,
    };

    window.localStorage.setItem(storageKey, JSON.stringify(next));
    setStatus(next);
    setIsStorageReady(true);

    const syncFromStorage = (event: StorageEvent) => {
      if (event.key === storageKey) {
        setStatus(readStoredStatus(storageKey));
      }
    };

    window.addEventListener("storage", syncFromStorage);
    return () => window.removeEventListener("storage", syncFromStorage);
  }, [isInstalled, legacyStorageKey, storageKey]);

  useEffect(() => {
    if (!isStorageReady) {
      return;
    }

    void refreshPushStatus();

    const refreshOnFocus = () => void refreshPushStatus();
    window.addEventListener("focus", refreshOnFocus);
    return () => window.removeEventListener("focus", refreshOnFocus);
  }, [isStorageReady, refreshPushStatus]);

  useEffect(() => {
    if (isInstalled && !status.pwaInstalled) {
      updateStatus((current) => ({ ...current, pwaInstalled: true }));
    }
  }, [isInstalled, status.pwaInstalled, updateStatus]);

  const isPwaInstalled = isInstalled || status.pwaInstalled;
  const requiresHomeScreenInstall = isIos && !isPwaInstalled;

  const installPwa = useCallback(async () => {
    const outcome = await install();

    if (outcome === "accepted") {
      updateStatus((current) => ({ ...current, pwaInstalled: true }));
    }

    return outcome;
  }, [install, updateStatus]);

  const enablePushNotifications = useCallback(async () => {
    setIsPushPending(true);

    try {
      const { requestFirebasePushToken } = await import("../_lib/firebase-client");
      const token = await requestFirebasePushToken();
      const result = await registerPushTokenAction(token);

      if (result.ok) {
        updateStatus((current) => ({ ...current, pushEnabled: true }));
        setPushStatusMessage(undefined);
      } else {
        updateStatus((current) => ({ ...current, pushEnabled: false }));
        setPushStatusMessage(result.message);
      }

      return result;
    } catch (error) {
      const message = error instanceof Error ? error.message : "푸시 알림을 설정하지 못했어요.";
      updateStatus((current) => ({ ...current, pushEnabled: false }));
      setPushStatusMessage(message);
      return {
        message,
        ok: false,
      };
    } finally {
      setIsPushPending(false);
    }
  }, [updateStatus]);

  const value = useMemo<DeviceSetupContextValue>(
    () => ({
      dismissSetup: () => updateStatus((current) => ({ ...current, isSetupDismissed: true })),
      enablePushNotifications,
      installPwa,
      isIos,
      isPwaInstalled,
      isPushEnabled: !isPushStatusLoading && status.pushEnabled,
      isPushPending,
      isPushStatusLoading,
      isPromptAvailable,
      isReady: isStorageReady && !isPushStatusLoading,
      isSetupDismissed: status.isSetupDismissed,
      pwaMessage,
      pushStatusMessage,
      refreshPushStatus,
      requiresHomeScreenInstall,
    }),
    [
      enablePushNotifications,
      installPwa,
      isIos,
      isPromptAvailable,
      isPwaInstalled,
      isPushPending,
      isPushStatusLoading,
      isStorageReady,
      pwaMessage,
      pushStatusMessage,
      refreshPushStatus,
      requiresHomeScreenInstall,
      status.isSetupDismissed,
      status.pushEnabled,
      updateStatus,
    ],
  );

  return <DeviceSetupContext.Provider value={value}>{children}</DeviceSetupContext.Provider>;
}

export function useDeviceSetup() {
  const context = useContext(DeviceSetupContext);

  if (context == null) {
    throw new Error("useDeviceSetup은 DeviceSetupProvider 안에서 사용해야 합니다.");
  }

  return context;
}

function readStoredStatus(storageKey: string): DeviceSetupStatus {
  try {
    const raw = window.localStorage.getItem(storageKey);
    if (raw == null) {
      return defaultStatus;
    }

    const parsed = JSON.parse(raw) as Partial<DeviceSetupStatus>;
    return {
      isSetupDismissed: parsed.isSetupDismissed === true,
      pwaInstalled: parsed.pwaInstalled === true,
      pushEnabled: parsed.pushEnabled === true,
    };
  } catch {
    return defaultStatus;
  }
}
