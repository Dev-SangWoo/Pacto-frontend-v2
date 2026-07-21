type NavigatorWithStandalone = Navigator & {
  standalone?: boolean;
};

export function isIosDevice() {
  if (typeof navigator === "undefined") {
    return false;
  }

  return (
    /iPad|iPhone|iPod/i.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  );
}

export function isStandalonePwa() {
  if (typeof window === "undefined") {
    return false;
  }

  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (navigator as NavigatorWithStandalone).standalone === true
  );
}
