"use client";

import {
  CalendarDays,
  Coins,
  House,
  Target,
  UserCircle,
  UsersRound,
  WalletCards,
  X,
} from "lucide-react";
import { useState } from "react";

import type { TiptapGuidelines } from "../../new/_components/guideline-editor";
import { GuidelinePreview } from "../../new/_components/guideline-preview";

type CampaignGuideModalProps = {
  brandName: string;
  deadlineLabel: string;
  guidelineImageUrls: string[];
  guidelines: TiptapGuidelines;
  rewardLabel: string;
  thumbnailUrl?: string;
  title: string;
};

export function CampaignGuideModal({
  brandName,
  deadlineLabel,
  guidelineImageUrls,
  guidelines,
  rewardLabel,
  thumbnailUrl,
  title,
}: CampaignGuideModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button className="campaign-guide-open-button" onClick={() => setIsOpen(true)} type="button">
        모바일 화면 보러가기
      </button>
      {isOpen ? (
        <div
          className="campaign-guide-modal-backdrop"
          role="presentation"
          onMouseDown={() => setIsOpen(false)}
        >
          <section
            aria-label="모바일 미션 가이드 미리보기"
            aria-modal="true"
            className="campaign-guide-modal"
            onMouseDown={(event) => event.stopPropagation()}
            role="dialog"
          >
            <header>
              <div>
                <p>블로거 화면 미리보기</p>
                <h2>미션 가이드</h2>
              </div>
              <button aria-label="미션 가이드 닫기" onClick={() => setIsOpen(false)} type="button">
                <X size={19} />
              </button>
            </header>
            <div className="campaign-guide-modal-phone">
              <div className="campaign-guide-phone-status" aria-hidden="true">
                <span>9:41</span>
                <span className="campaign-guide-phone-island" />
                <span>5G&nbsp;&nbsp;▰</span>
              </div>
              <div className="campaign-guide-phone-bar">
                <span>PACTO</span>
                <strong>캠페인 상세</strong>
              </div>
              <div className="campaign-guide-phone-content">
                {thumbnailUrl ? (
                  <img alt="" className="campaign-guide-phone-cover" src={thumbnailUrl} />
                ) : null}
                <div className="campaign-guide-phone-hero">
                  <p>{brandName}</p>
                  <div>
                    <h3>{title}</h3>
                    <span>
                      <Coins size={14} />
                      {rewardLabel}
                    </span>
                  </div>
                </div>
                <div className="campaign-guide-phone-metrics">
                  <span>
                    <UsersRound size={14} />
                    모집 중
                  </span>
                  <span>
                    <CalendarDays size={14} />
                    {deadlineLabel}
                  </span>
                </div>
                <section className="phone-guideline-section">
                  <h4>미션 가이드</h4>
                  <GuidelinePreview guidelines={guidelines} />
                  {guidelineImageUrls.map((imageUrl, index) => (
                    <img alt={`가이드 이미지 ${index + 1}`} key={imageUrl} src={imageUrl} />
                  ))}
                </section>
              </div>
              <nav className="campaign-guide-phone-bottom-nav" aria-label="모바일 하단 메뉴">
                <span>
                  <House size={17} strokeWidth={2.25} />
                  <small>홈</small>
                </span>
                <span className="active">
                  <Target size={17} strokeWidth={2.25} />
                  <small>미션</small>
                </span>
                <span>
                  <WalletCards size={17} strokeWidth={2.25} />
                  <small>지갑</small>
                </span>
                <span>
                  <UserCircle size={18} strokeWidth={2.25} />
                  <small>내 정보</small>
                </span>
              </nav>
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}
