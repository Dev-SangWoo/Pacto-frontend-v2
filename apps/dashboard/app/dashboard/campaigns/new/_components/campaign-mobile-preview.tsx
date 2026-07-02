import { formatKoreanDate, formatPoint } from "@pacto/utils";

import type { TiptapGuidelines } from "./guideline-editor";
import { GuidelinePreview } from "./guideline-preview";

type CampaignMobilePreviewProps = {
  deadline: string;
  guidelines: TiptapGuidelines;
  rewardPoint: number;
  thumbnailUrl: string;
  title: string;
  totalSlots: number;
};

const fallbackImage = "/campaigns/seongsu-brunch-cafe.png";

export function CampaignMobilePreview({
  deadline,
  guidelines,
  rewardPoint,
  thumbnailUrl,
  title,
  totalSlots,
}: CampaignMobilePreviewProps) {
  const displayTitle = title.trim().length > 0 ? title : "새 캠페인 제목";
  const displayDeadline = deadline.length > 0 ? formatKoreanDate(deadline) : "마감일 선택";
  const displayImage = thumbnailUrl.trim().length > 0 ? thumbnailUrl : fallbackImage;

  return (
    <aside className="campaign-preview-panel" aria-label="블로거 상세 화면 미리보기">
      <div className="campaign-preview-copy">
        <span>Mobile preview</span>
        <strong>블로거가 보게 될 화면</strong>
      </div>
      <div className="phone-frame">
        <div className="phone-statusbar">
          <span>9:41</span>
          <span>PACTO</span>
        </div>
        <div className="phone-screen">
          <div className="phone-hero">
            <img alt={`${displayTitle} 대표 이미지 미리보기`} src={displayImage} />
            <span>모집 중</span>
          </div>
          <section className="phone-campaign-body">
            <p>광고주 캠페인</p>
            <h2>{displayTitle}</h2>
            <div className="phone-reward-row">
              <strong>{formatPoint(Math.max(rewardPoint, 0))}</strong>
              <span>{Math.max(totalSlots, 0)}명 모집</span>
            </div>
            <div className="phone-info-grid">
              <div>
                <span>마감</span>
                <strong>{displayDeadline}</strong>
              </div>
              <div>
                <span>상태</span>
                <strong>신청 가능</strong>
              </div>
            </div>
            <section className="phone-guideline-section">
              <h3>미션 가이드</h3>
              <GuidelinePreview guidelines={guidelines} />
            </section>
          </section>
          <div className="phone-apply-bar">
            <button type="button">캠페인 신청하기</button>
          </div>
        </div>
      </div>
    </aside>
  );
}
