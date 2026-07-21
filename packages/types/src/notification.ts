export type NotificationType =
  | "APPLICATION_ACCEPTED"
  | "APPLICATION_REJECTED"
  | "MISSION_APPROVED"
  | "MISSION_REJECTED";

export type Notification = {
  id: number;
  type: NotificationType;
  title: string;
  content: string;
  targetUrl?: string;
  read: boolean;
  readAt?: string;
  createdAt: string;
};

export type NotificationPage = {
  content: Notification[];
  currentPage: number;
  totalPages: number;
};

export type PushRegistrationType = "FID" | "TOKEN";
