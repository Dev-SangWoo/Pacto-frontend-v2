import { getMyNotifications } from "@pacto/api";
import type { NotificationType } from "@pacto/types";
import { formatKoreanDate } from "@pacto/utils";
import { redirect } from "next/navigation";

import { readNotificationAction } from "../../_actions/blogger-actions";
import { fallbackOnNonAuthError } from "../../_lib/auth-error";
import { getBloggerSession } from "../../_lib/session";

export const dynamic = "force-dynamic";

type NotificationsPageProps = {
  searchParams: Promise<{
    page?: string;
  }>;
};

export default async function NotificationsPage({ searchParams }: NotificationsPageProps) {
  const session = await getBloggerSession();

  if (session.accessToken == null) {
    redirect("/login");
  }

  const { page: pageParam } = await searchParams;
  const requestedPage = Math.max(Number.parseInt(pageParam ?? "1", 10) || 1, 1);
  const notificationPage = await getMyNotifications(session.accessToken, {
    page: requestedPage,
    size: 20,
  }).catch((error: unknown) =>
    fallbackOnNonAuthError(error, { content: [], currentPage: 1, totalPages: 0 }),
  );
  const notifications = notificationPage.content;

  return (
    <section className="screen-stack" aria-labelledby="notifications-title">
      <section className="profile-title-block">
        <img
          className="notifications-brand-logo"
          src="/brand/logo-bg-rm-cropped.webp"
          alt="Pacto"
        />
        <p className="section-label">알림</p>
        <h1 id="notifications-title">내 활동 알림</h1>
        <p>선정 결과, 제출할 미션, 검수 상태를 한곳에서 확인하세요.</p>
      </section>

      {notifications.length > 0 ? (
        <div className="notification-list">
          {notifications.map((notification) => (
            <form
              action={readNotificationAction.bind(null, notification.id, notification.targetUrl)}
              key={notification.id}
            >
              <button
                className={`notification-card ${getNotificationTone(notification.type)}`}
                type="submit"
              >
                <span>{notification.read ? "확인됨" : "새 알림"}</span>
                <strong>{notification.title}</strong>
                <p>{notification.content}</p>
                <em>{formatKoreanDate(notification.createdAt)}</em>
              </button>
            </form>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <strong>아직 확인할 알림이 없어요</strong>
          <p>캠페인 선정 결과나 제출할 미션이 생기면 여기에 표시돼요.</p>
        </div>
      )}
      {notificationPage.totalPages > 1 ? (
        <nav className="notification-pagination" aria-label="알림 페이지">
          {notificationPage.currentPage > 1 ? (
            <a href={`/notifications?page=${notificationPage.currentPage - 1}`}>이전</a>
          ) : (
            <span aria-disabled="true">이전</span>
          )}
          <strong>
            {notificationPage.currentPage} / {notificationPage.totalPages}
          </strong>
          {notificationPage.currentPage < notificationPage.totalPages ? (
            <a href={`/notifications?page=${notificationPage.currentPage + 1}`}>다음</a>
          ) : (
            <span aria-disabled="true">다음</span>
          )}
        </nav>
      ) : null}
    </section>
  );
}

function getNotificationTone(type: NotificationType) {
  switch (type) {
    case "APPLICATION_ACCEPTED":
    case "MISSION_APPROVED":
      return "green";
    case "APPLICATION_REJECTED":
    case "MISSION_REJECTED":
      return "red";
  }
}
