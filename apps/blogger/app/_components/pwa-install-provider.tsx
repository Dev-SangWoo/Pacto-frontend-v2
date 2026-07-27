"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { isIosDevice, isStandalonePwa } from "../_lib/pwa-client";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
};

type PwaInstallContextValue = {
  install: () => Promise<"accepted" | "dismissed" | "unavailable">;
  isInstalled: boolean;
  isIos: boolean;
  isPromptAvailable: boolean;
  message?: string;
};

const PwaInstallContext = createContext<PwaInstallContextValue | undefined>(undefined);

export function PwaInstallProvider({ children }: { children: React.ReactNode }) {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent>();
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [message, setMessage] = useState<string>();

  useEffect(() => {
    setIsInstalled(isStandalonePwa());
    setIsIos(isIosDevice());

    if ("serviceWorker" in navigator) {
      void navigator.serviceWorker.register("/firebase-messaging-sw.js").catch(() => undefined);
    }

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as BeforeInstallPromptEvent);
    };
    const handleAppInstalled = () => {
      setInstallPrompt(undefined);
      setIsInstalled(true);
      setMessage("Pacto가 앱으로 설치됐어요.");
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const value = useMemo<PwaInstallContextValue>(
    () => ({
      install: async () => {
        if (installPrompt == null) {
          return "unavailable";
        }

        await installPrompt.prompt();
        const choice = await installPrompt.userChoice;
        setInstallPrompt(undefined);
        setMessage(
          choice.outcome === "accepted"
            ? "설치를 시작했어요."
            : "설치가 취소됐어요. 브라우저 메뉴에서 다시 설치할 수 있어요.",
        );
        return choice.outcome;
      },
      isInstalled,
      isIos,
      isPromptAvailable: installPrompt != null,
      message,
    }),
    [installPrompt, isInstalled, isIos, message],
  );

  return <PwaInstallContext.Provider value={value}>{children}</PwaInstallContext.Provider>;
}

export function usePwaInstall() {
  const context = useContext(PwaInstallContext);

  if (context == null) {
    throw new Error("usePwaInstall은 PwaInstallProvider 안에서 사용해야 합니다.");
  }

  return context;
}
