import type {
  Notification,
  NotificationPage,
  NotificationType,
  PushRegistrationType,
} from "@pacto/types";

import { apiRequest, unwrapCommonResponse } from "../client/http-client";
import type { CommonResponse } from "../client/http-client";

type NotificationResponse = {
  notificationId: number;
  type: NotificationType;
  title: string;
  content: string;
  targetUrl?: string | null;
  read: boolean;
  readAt?: string | null;
  createdAt: string;
};

type NotificationPageResponse = {
  content: NotificationResponse[];
  currentPage: number;
  totalPages: number;
};

export async function getMyNotifications(
  token?: string,
  { page = 1, size = 20 }: { page?: number; size?: number } = {},
): Promise<NotificationPage> {
  const response = await apiRequest<
    CommonResponse<NotificationPageResponse> | NotificationPageResponse
  >("/api/v1/notifications", {
    query: { page, size },
    token,
  });
  const result = unwrapCommonResponse<NotificationPageResponse>(response);

  return {
    ...result,
    content: result.content.map(adaptNotification),
  };
}

export async function markNotificationAsRead(
  notificationId: number,
  token?: string,
): Promise<Notification> {
  const response = await apiRequest<CommonResponse<NotificationResponse> | NotificationResponse>(
    `/api/v1/notifications/${notificationId}/read`,
    {
      method: "PATCH",
      token,
    },
  );

  return adaptNotification(unwrapCommonResponse<NotificationResponse>(response));
}

export async function registerPushSubscription(
  registrationId: string,
  token?: string,
  registrationType: PushRegistrationType = "TOKEN",
): Promise<void> {
  await apiRequest("/api/v1/notifications/subscriptions", {
    body: { registrationId, registrationType },
    method: "POST",
    token,
  });
}

export async function unregisterPushSubscription(
  registrationId: string,
  token?: string,
  registrationType: PushRegistrationType = "TOKEN",
): Promise<void> {
  await apiRequest("/api/v1/notifications/subscriptions", {
    body: { registrationId, registrationType },
    method: "DELETE",
    token,
  });
}

function adaptNotification(response: NotificationResponse): Notification {
  return {
    id: response.notificationId,
    type: response.type,
    title: response.title,
    content: response.content,
    targetUrl: response.targetUrl ?? undefined,
    read: response.read,
    readAt: response.readAt ?? undefined,
    createdAt: response.createdAt,
  };
}
