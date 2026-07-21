import { getMe } from "@pacto/api";

import { AppHeader, BottomNav } from "../_components/app-nav";
import { fallbackOnNonAuthError } from "../_lib/auth-error";
import { getBloggerActivity } from "../_lib/blogger-activity";
import { buildBloggerNotifications, getUnreadNotificationCount } from "../_lib/notifications";
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

  const { applications, missions } = await getBloggerActivity(session.accessToken).catch(
    (error: unknown) => fallbackOnNonAuthError(error, { applications: [], missions: [] }),
  );

  return getUnreadNotificationCount(buildBloggerNotifications({ applications, missions }));
}
