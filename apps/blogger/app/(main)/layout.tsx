import { getMyNotifications } from "@pacto/api";
import type { Notification } from "@pacto/types";

import { BottomNav } from "../_components/app-nav";
import { NotificationExperience } from "../_components/notification-experience";
import { PushRegistrationSync } from "../_components/push-registration-sync";
import { fallbackOnNonAuthError } from "../_lib/auth-error";
import { getBloggerSession } from "../_lib/session";

type MainLayoutProps = {
  children: React.ReactNode;
};

export default async function MainLayout({ children }: MainLayoutProps) {
  const session = await getBloggerSession();
  const unreadNotifications = await getUnreadNotifications(session.accessToken);

  return (
    <main className="mobile-shell">
      <PushRegistrationSync />
      <NotificationExperience initialNotifications={unreadNotifications} />
      <div className="screen-content">{children}</div>
      <BottomNav />
    </main>
  );
}

async function getUnreadNotifications(accessToken?: string): Promise<Notification[]> {
  if (accessToken == null) {
    return [];
  }

  const firstPage = await getMyNotifications(accessToken, { size: 100 }).catch((error: unknown) =>
    fallbackOnNonAuthError(error, { content: [], currentPage: 1, totalPages: 0 }),
  );
  const remainingPages = await Promise.all(
    Array.from({ length: Math.max(firstPage.totalPages - 1, 0) }, (_, index) => index + 2).map(
      (page) =>
        getMyNotifications(accessToken, { page, size: 100 }).catch((error: unknown) =>
          fallbackOnNonAuthError(error, { content: [], currentPage: page, totalPages: 0 }),
        ),
    ),
  );
  const notifications = [firstPage, ...remainingPages].flatMap((page) => page.content);

  return notifications.filter((notification) => !notification.read);
}
