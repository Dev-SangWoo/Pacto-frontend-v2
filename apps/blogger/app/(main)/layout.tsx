import { AppHeaderStart, BottomNav, TopActions } from "../_components/app-nav";
import { getMyApplicationResponses, getMyMissions } from "@pacto/api";
import { buildBloggerNotifications, getUnreadNotificationCount } from "../_lib/notifications";
import { getBloggerSession } from "../_lib/session";

type MainLayoutProps = {
  children: React.ReactNode;
};

export default async function MainLayout({ children }: MainLayoutProps) {
  const notificationCount = await getNotificationCount();

  return (
    <main className="mobile-shell">
      <header className="app-top">
        <AppHeaderStart />
        <TopActions notificationCount={notificationCount} />
      </header>
      <div className="screen-content">{children}</div>
      <BottomNav />
    </main>
  );
}

async function getNotificationCount() {
  const session = await getBloggerSession();

  if (session.accessToken == null) {
    return 0;
  }

  const [missions, applications] = await Promise.all([
    getMyMissions({}, session.accessToken).catch(() => []),
    getMyApplicationResponses(session.accessToken).catch(() => []),
  ]);

  return getUnreadNotificationCount(buildBloggerNotifications({ applications, missions }));
}
