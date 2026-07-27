"use client";

import { ChevronRight, Download, Smartphone } from "lucide-react";
import { useState } from "react";

import { usePwaInstall } from "./pwa-install-provider";

type PwaInstallSettingProps = {
  compact?: boolean;
};

export function PwaInstallSetting({ compact = false }: PwaInstallSettingProps) {
  const { install, isInstalled, isIos, isPromptAvailable, message } = usePwaInstall();
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  if (compact) {
    return (
      <div className="profile-setting-row-group">
        <button
          aria-label={isInstalled ? "앱 설치 완료" : "앱 설치"}
          className="profile-setting-row"
          onClick={() => {
            if (isPromptAvailable) {
              void install();
              return;
            }

            setIsGuideOpen((open) => !open);
          }}
          type="button"
        >
          <Smartphone aria-hidden="true" size={21} strokeWidth={2.1} />
          <span>
            <strong>앱 설치</strong>
          </span>
          <ChevronRight aria-hidden="true" size={19} />
        </button>
        {!isInstalled && isGuideOpen && !isPromptAvailable ? (
          <p className="profile-setting-guide" role="status">
            {isIos
              ? "Safari 공유 메뉴에서 ‘홈 화면에 추가’를 선택해 주세요."
              : "브라우저 메뉴에서 ‘앱 설치’ 또는 ‘홈 화면에 추가’를 선택해 주세요."}
          </p>
        ) : null}
        {message != null ? (
          <p className="profile-setting-guide" role="status">
            {message}
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <section className="profile-section pwa-install-setting" aria-labelledby="pwa-install-title">
      <div className="section-head">
        <div>
          <p className="section-label">앱 설치</p>
          <h2 id="pwa-install-title">Pacto를 홈 화면에서 열기</h2>
        </div>
        <Smartphone aria-hidden="true" size={22} />
      </div>
      <p>브라우저 주소창 없이 빠르게 열고, 지원되는 기기에서 푸시 알림을 받을 수 있어요.</p>

      {isInstalled ? (
        <div className="pwa-install-status" role="status">
          <span>설치 완료</span>
          <strong>현재 앱 모드로 실행 중이에요.</strong>
        </div>
      ) : isPromptAvailable ? (
        <button
          className="primary-button weak-button full-width"
          onClick={() => {
            void install();
          }}
          type="button"
        >
          <Download aria-hidden="true" size={18} />
          앱으로 설치하기
        </button>
      ) : isIos ? (
        <div className="pwa-install-guide">
          <strong>iPhone · iPad 설치 방법</strong>
          <p>Safari의 공유 버튼을 누른 뒤 ‘홈 화면에 추가’를 선택해 주세요.</p>
        </div>
      ) : (
        <small>브라우저 메뉴에서 ‘앱 설치’ 또는 ‘홈 화면에 추가’를 선택해 주세요.</small>
      )}

      {message != null ? <small role="status">{message}</small> : null}
    </section>
  );
}
