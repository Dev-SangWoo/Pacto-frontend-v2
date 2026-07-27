"use client";

import { useActionState, useEffect, useMemo, useRef, useState, useTransition } from "react";

import { formatPoint } from "@pacto/utils";

import { createCampaignAction } from "../../../../_actions/campaign-actions";
import type { CampaignCreateState } from "../../../../_actions/campaign-actions";
import {
  compressCampaignImage,
  compressCampaignImages,
} from "../../../../_lib/campaign-image-compression";
import { CampaignMobilePreview } from "./campaign-mobile-preview";
import { GuidelineEditor, type TiptapGuidelines } from "./guideline-editor";

const initialState: CampaignCreateState = {};
const initialGuidelines: TiptapGuidelines = {
  editor: "tiptap",
  version: 1,
  content: {
    type: "doc",
    content: [],
  },
};

export function CampaignCreateForm() {
  const [state, formAction, isPending] = useActionState(createCampaignAction, initialState);
  const [title, setTitle] = useState("");
  const [rewardPoint, setRewardPoint] = useState(0);
  const [totalSlots, setTotalSlots] = useState(1);
  const [deadline, setDeadline] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [compressedThumbnail, setCompressedThumbnail] = useState<File>();
  const [compressedGuidelineImages, setCompressedGuidelineImages] = useState<File[]>([]);
  const [guidelineImageNames, setGuidelineImageNames] = useState<string[]>([]);
  const [thumbnailErrorMessage, setThumbnailErrorMessage] = useState<string>();
  const [guidelineErrorMessage, setGuidelineErrorMessage] = useState<string>();
  const [compressionJobCount, setCompressionJobCount] = useState(0);
  const [isSubmitting, startSubmit] = useTransition();
  const thumbnailSelectionId = useRef(0);
  const guidelineSelectionId = useRef(0);
  const isCompressingImages = compressionJobCount > 0;
  const imageErrorMessage = thumbnailErrorMessage ?? guidelineErrorMessage;
  const [guidelines, setGuidelines] = useState<TiptapGuidelines>(initialGuidelines);
  const lockedBudget = useMemo(
    () => Math.max(rewardPoint, 0) * Math.max(totalSlots, 0),
    [rewardPoint, totalSlots],
  );

  useEffect(
    () => () => {
      if (thumbnailUrl.startsWith("blob:")) {
        URL.revokeObjectURL(thumbnailUrl);
      }
    },
    [thumbnailUrl],
  );

  return (
    <div className="campaign-create-workbench">
      <div className="campaign-create-form-panel">
        <form
          action={formAction}
          onSubmit={(event) => {
            event.preventDefault();

            if (isCompressingImages || imageErrorMessage != null) {
              return;
            }

            const formData = new FormData(event.currentTarget);

            if (compressedThumbnail != null) {
              formData.set("thumbnail", compressedThumbnail);
            }

            formData.delete("guidelineImages");
            compressedGuidelineImages.forEach((image) => {
              formData.append("guidelineImages", image);
            });

            startSubmit(() => {
              formAction(formData);
            });
          }}
        >
          <div className="form-grid">
            <label>
              <span>광고주</span>
              <input disabled placeholder="로그인 계정 기준으로 등록돼요" />
            </label>
            <label>
              <span>캠페인명</span>
              <input
                name="title"
                onChange={(event) => setTitle(event.currentTarget.value)}
                placeholder="예: 성수동 브런치 카페 체험단"
                required
                value={title}
              />
            </label>
            <label>
              <span>보상 포인트</span>
              <input
                min="0"
                name="rewardPoint"
                onChange={(event) => setRewardPoint(Number(event.currentTarget.value))}
                placeholder="50000"
                required
                type="number"
              />
            </label>
            <label>
              <span>모집 인원</span>
              <input
                min="1"
                name="totalSlots"
                onChange={(event) => setTotalSlots(Number(event.currentTarget.value))}
                placeholder="10"
                required
                type="number"
              />
            </label>
            <div className="campaign-budget-preview">
              <span>생성 시 잠금 예산</span>
              <strong>{formatPoint(lockedBudget)}</strong>
              <p>
                백엔드 정책상 캠페인 생성 시 보상 포인트 × 모집 인원만큼 광고주 지갑에서 잠겨요.
              </p>
            </div>
            <label>
              <span>마감일</span>
              <input
                name="deadline"
                onChange={(event) => setDeadline(event.currentTarget.value)}
                required
                type="datetime-local"
                value={deadline}
              />
            </label>
            <label className="full-row campaign-image-upload-field">
              <span>대표 이미지</span>
              <input
                accept="image/*,.heic,.heif"
                name="thumbnail"
                onChange={(event) => {
                  const file = event.currentTarget.files?.[0];
                  const selectionId = ++thumbnailSelectionId.current;
                  setCompressedThumbnail(undefined);
                  setThumbnailErrorMessage(undefined);

                  if (file == null) {
                    setThumbnailUrl("");
                    return;
                  }

                  setCompressionJobCount((count) => count + 1);
                  void compressCampaignImage(file)
                    .then((compressedFile) => {
                      if (selectionId !== thumbnailSelectionId.current) {
                        return;
                      }

                      setCompressedThumbnail(compressedFile);
                      setThumbnailUrl(URL.createObjectURL(compressedFile));
                    })
                    .catch((error: unknown) => {
                      if (selectionId !== thumbnailSelectionId.current) {
                        return;
                      }

                      setThumbnailUrl("");
                      setThumbnailErrorMessage(
                        error instanceof Error ? error.message : "대표 이미지를 압축하지 못했어요.",
                      );
                    })
                    .finally(() => {
                      setCompressionJobCount((count) => Math.max(count - 1, 0));
                    });
                }}
                type="file"
              />
              <small>선택한 사진은 JPG로 자동 최적화해 업로드해요.</small>
              {thumbnailUrl.length > 0 ? (
                <img
                  className="campaign-upload-preview"
                  src={thumbnailUrl}
                  alt="대표 이미지 미리보기"
                />
              ) : null}
            </label>
            <label className="full-row campaign-image-upload-field">
              <span>가이드 이미지</span>
              <input
                accept="image/*,.heic,.heif"
                multiple
                name="guidelineImages"
                onChange={(event) => {
                  const files = Array.from(event.currentTarget.files ?? []).slice(0, 5);
                  const selectionId = ++guidelineSelectionId.current;
                  setGuidelineImageNames(files.map((file) => file.name));
                  setCompressedGuidelineImages([]);
                  setGuidelineErrorMessage(undefined);

                  if (files.length === 0) {
                    return;
                  }

                  setCompressionJobCount((count) => count + 1);
                  void compressCampaignImages(files)
                    .then((compressedFiles) => {
                      if (selectionId === guidelineSelectionId.current) {
                        setCompressedGuidelineImages(compressedFiles);
                      }
                    })
                    .catch((error: unknown) => {
                      if (selectionId !== guidelineSelectionId.current) {
                        return;
                      }

                      setGuidelineErrorMessage(
                        error instanceof Error
                          ? error.message
                          : "가이드 이미지를 압축하지 못했어요.",
                      );
                    })
                    .finally(() => {
                      setCompressionJobCount((count) => Math.max(count - 1, 0));
                    });
                }}
                type="file"
              />
              <small>최대 5장까지 선택할 수 있으며, 업로드 전에 용량을 자동으로 줄여요.</small>
              {guidelineImageNames.length > 0 ? (
                <ul className="campaign-upload-file-list">
                  {guidelineImageNames.map((name, index) => (
                    <li key={`${name}-${index}`}>{name}</li>
                  ))}
                </ul>
              ) : null}
            </label>
            <GuidelineEditor onChange={setGuidelines} />
          </div>
          <div className="form-actions">
            {isCompressingImages ? (
              <p className="form-success inline-error" role="status">
                업로드에 맞게 이미지를 최적화하고 있어요.
              </p>
            ) : null}
            {imageErrorMessage != null ? (
              <p className="form-error inline-error" role="alert">
                {imageErrorMessage}
              </p>
            ) : null}
            {state.message != null ? (
              <p className="form-error inline-error" role="alert">
                {state.message}
                {state.createdCampaignId != null ? (
                  <a href={`/dashboard/campaigns/${state.createdCampaignId}`}>등록된 캠페인 보기</a>
                ) : null}
              </p>
            ) : null}
            <a className="secondary-link" href="/dashboard/campaigns">
              취소
            </a>
            <button
              className="primary-button"
              disabled={
                isPending || isSubmitting || isCompressingImages || imageErrorMessage != null
              }
              type="submit"
            >
              {isCompressingImages
                ? "이미지 최적화 중..."
                : isPending || isSubmitting
                  ? "등록 중..."
                  : "캠페인 등록"}
            </button>
          </div>
        </form>
      </div>
      <CampaignMobilePreview
        deadline={deadline}
        guidelines={guidelines}
        rewardPoint={rewardPoint}
        thumbnailUrl={thumbnailUrl}
        title={title}
        totalSlots={totalSlots}
      />
    </div>
  );
}
