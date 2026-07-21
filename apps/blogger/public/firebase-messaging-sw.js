/* global firebase, importScripts, self, URL */
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const notificationData = event.notification.data ?? {};
  const requestedTarget =
    notificationData.targetUrl ?? notificationData.FCM_MSG?.data?.targetUrl ?? "/notifications";
  const candidateUrl = new URL(requestedTarget, self.location.origin);
  const targetUrl =
    candidateUrl.origin === self.location.origin
      ? candidateUrl.href
      : new URL("/notifications", self.location.origin).href;

  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(async (clients) => {
      const appClient = clients.find(
        (client) => new URL(client.url).origin === self.location.origin,
      );

      if (appClient != null) {
        await appClient.navigate(targetUrl);
        return appClient.focus();
      }

      return self.clients.openWindow(targetUrl);
    }),
  );
});

importScripts("https://www.gstatic.com/firebasejs/12.16.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/12.16.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyBClKuRlwN4NX0zjEqTu-U9kWN7THA4Z1g",
  authDomain: "pacto-prod-8e5f1.firebaseapp.com",
  projectId: "pacto-prod-8e5f1",
  storageBucket: "pacto-prod-8e5f1.firebasestorage.app",
  messagingSenderId: "926946718943",
  appId: "1:926946718943:web:1d5336bbcb0e7401ed256a",
});

firebase.messaging();
