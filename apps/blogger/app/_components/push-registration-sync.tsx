"use client";

import { useEffect } from "react";

import { registerPushTokenAction } from "../_actions/blogger-actions";

export function PushRegistrationSync() {
  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void import("../_lib/firebase-client")
        .then(({ getExistingFirebasePushToken }) => getExistingFirebasePushToken())
        .then((token) => (token == null ? undefined : registerPushTokenAction(token)))
        .catch(() => undefined);
    }, 1_500);

    return () => window.clearTimeout(timeoutId);
  }, []);

  return null;
}
