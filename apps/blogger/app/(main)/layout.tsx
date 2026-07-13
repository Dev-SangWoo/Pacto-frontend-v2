import { AppHeaderStart, BottomNav, TopActions } from "../_components/app-nav";
import { getBloggerActivity } from "../_lib/blogger-activity";
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

  const { applications, missions } = await getBloggerActivity(session.accessToken);

  return getUnreadNotificationCount(buildBloggerNotifications({ applications, missions }));
}
