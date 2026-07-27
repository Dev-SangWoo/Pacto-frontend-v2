import { getMyNotifications } from "@pacto/api";
import type { Notification } from "@pacto/types";

import { BottomNav } from "../_components/app-nav";
import { BloggerQueryProvider } from "../_components/blogger-query-provider";
import { DeviceSetupProvider } from "../_components/device-setup-provider";
import { FirstLoginSetup } from "../_components/first-login-setup";
import { NotificationExperience } from "../_components/notification-experience";
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
      <BloggerQueryProvider>
        <DeviceSetupProvider bloggerId={session.bloggerId}>
          <FirstLoginSetup />
          <NotificationExperience initialNotifications={unreadNotifications} />
          <div className="screen-content">{children}</div>
          <BottomNav />
        </DeviceSetupProvider>
      </BloggerQueryProvider>
    </main>
  );
}

async function getUnreadNotifications(accessToken?: string): Promise<Notification[]> {
  if (accessToken == null) {
    return [];
  }

  const notificationPage = await getMyNotifications(accessToken, { size: 100 }).catch(
    (error: unknown) =>
      fallbackOnNonAuthError(error, { content: [], currentPage: 1, totalPages: 0 }),
  );

  return notificationPage.content.filter((notification) => !notification.read);
}
