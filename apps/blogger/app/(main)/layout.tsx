import { getMe, getMyNotifications } from "@pacto/api";

import { AppHeader, BottomNav } from "../_components/app-nav";
import { PushRegistrationSync } from "../_components/push-registration-sync";
import { fallbackOnNonAuthError } from "../_lib/auth-error";
import { getBloggerSession } from "../_lib/session";

type MainLayoutProps = {
  children: React.ReactNode;
};

export default async function MainLayout({ children }: MainLayoutProps) {
  const [bloggerName, notificationCount] = await Promise.all([
    getBloggerName(),
    getNotificationCount(),
  ]);

  return (
    <main className="mobile-shell">
      <PushRegistrationSync />
      <AppHeader bloggerName={bloggerName} notificationCount={notificationCount} />
      <div className="screen-content">{children}</div>
      <BottomNav />
    </main>
  );
}

async function getBloggerName() {
  const session = await getBloggerSession();

  if (session.accessToken == null) {
    return undefined;
  }

  const user = await getMe(session.accessToken).catch(() => undefined);
  const name = user?.bloggerProfile?.nickname?.trim() || user?.bloggerProfile?.name?.trim();

  return name || undefined;
}

async function getNotificationCount() {
  const session = await getBloggerSession();

  if (session.accessToken == null) {
    return 0;
  }

  const firstPage = await getMyNotifications(session.accessToken, { size: 100 }).catch(
    (error: unknown) =>
      fallbackOnNonAuthError(error, { content: [], currentPage: 1, totalPages: 0 }),
  );
  const remainingPages = await Promise.all(
    Array.from({ length: Math.max(firstPage.totalPages - 1, 0) }, (_, index) => index + 2).map(
      (page) =>
        getMyNotifications(session.accessToken, { page, size: 100 }).catch((error: unknown) =>
          fallbackOnNonAuthError(error, { content: [], currentPage: page, totalPages: 0 }),
        ),
    ),
  );
  const notifications = [firstPage, ...remainingPages].flatMap((page) => page.content);

  return notifications.filter((notification) => !notification.read).length;
}
