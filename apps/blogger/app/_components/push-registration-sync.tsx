"use client";

import { useEffect } from "react";

import { registerPushTokenAction } from "../_actions/blogger-actions";
import { getExistingFirebasePushToken } from "../_lib/firebase-client";

export function PushRegistrationSync() {
  useEffect(() => {
    void getExistingFirebasePushToken()
      .then((token) => (token == null ? undefined : registerPushTokenAction(token)))
      .catch(() => undefined);
  }, []);

  return null;
}
