"use client";

import { useEffect } from "react";

const READY_CLASS = "suit-font-ready";
// LCP 후보가 이 시간 동안 더 나오지 않으면 첫 화면이 끝난 것으로 본다.
const LCP_SETTLE_MS = 1000;
const MAX_WAIT_MS = 5000;

export function SuitFontLoader() {
  useEffect(() => {
    const root = document.documentElement;
    let settleTimer: number | undefined;
    let observer: PerformanceObserver | undefined;

    const applyFont = () => {
      observer?.disconnect();
      window.clearTimeout(settleTimer);
      window.clearTimeout(maxWaitTimer);
      root.classList.add(READY_CLASS);
    };
    const scheduleApply = () => {
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(applyFont, LCP_SETTLE_MS);
    };
    const maxWaitTimer = window.setTimeout(applyFont, MAX_WAIT_MS);

    if (PerformanceObserver.supportedEntryTypes?.includes("largest-contentful-paint")) {
      observer = new PerformanceObserver(scheduleApply);
      observer.observe({ type: "largest-contentful-paint", buffered: true });
    }

    scheduleApply();
    window.addEventListener("pointerdown", applyFont, { once: true });

    return () => {
      observer?.disconnect();
      window.clearTimeout(settleTimer);
      window.clearTimeout(maxWaitTimer);
      window.removeEventListener("pointerdown", applyFont);
    };
  }, []);

  return null;
}
