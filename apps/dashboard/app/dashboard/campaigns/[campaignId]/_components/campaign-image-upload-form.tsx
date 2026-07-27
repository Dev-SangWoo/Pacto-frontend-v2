"use client";

import { useActionState, useRef, useState, useTransition } from "react";

import {
  uploadCampaignImagesAction,
  type CampaignImageUploadState,
} from "../../../../_actions/campaign-actions";
import {
  compressCampaignImage,
  compressCampaignImages,
} from "../../../../_lib/campaign-image-compression";

const initialState: CampaignImageUploadState = { ok: false };

type CampaignImageUploadFormProps = {
  campaignId: number;
  guidelineImageCount: number;
  thumbnailUrl?: string;
};

export function CampaignImageUploadForm({
  campaignId,
  guidelineImageCount,
  thumbnailUrl,
}: CampaignImageUploadFormProps) {
  const [state, action, isPending] = useActionState(
    uploadCampaignImagesAction.bind(null, campaignId),
    initialState,
  );
  const [compressedThumbnail, setCompressedThumbnail] = useState<File>();
  const [compressedGuidelineImages, setCompressedGuidelineImages] = useState<File[]>([]);
  const [thumbnailErrorMessage, setThumbnailErrorMessage] = useState<string>();
  const [guidelineErrorMessage, setGuidelineErrorMessage] = useState<string>();
  const [compressionJobCount, setCompressionJobCount] = useState(0);
  const [isSubmitting, startSubmit] = useTransition();
  const thumbnailSelectionId = useRef(0);
  const guidelineSelectionId = useRef(0);
  const isCompressingImages = compressionJobCount > 0;
  const imageErrorMessage = thumbnailErrorMessage ?? guidelineErrorMessage;
  const remainingGuidelineCount = Math.max(5 - guidelineImageCount, 0);

  return (
    <form
      action={action}
      className="campaign-image-retry-form"
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
          action(formData);
        });
      }}
    >
      <div className="campaign-image-retry-preview">
        {thumbnailUrl != null ? <img alt="현재 캠페인 썸네일" src={thumbnailUrl} /> : null}
        <div>
          <strong>캠페인 이미지 관리</strong>
          <p>생성 중 업로드가 실패했거나 이미지를 교체할 때 다시 저장할 수 있어요.</p>
        </div>
      </div>
      <label>
        <span>썸네일 교체</span>
        <input
          accept="image/*,.heic,.heif"
          name="thumbnail"
          onChange={(event) => {
            const file = event.currentTarget.files?.[0];
            const selectionId = ++thumbnailSelectionId.current;
            setCompressedThumbnail(undefined);
            setThumbnailErrorMessage(undefined);

            if (file == null) {
              return;
            }

            setCompressionJobCount((count) => count + 1);
            void compressCampaignImage(file)
              .then((compressedFile) => {
                if (selectionId === thumbnailSelectionId.current) {
                  setCompressedThumbnail(compressedFile);
                }
              })
              .catch((error: unknown) => {
                if (selectionId !== thumbnailSelectionId.current) {
                  return;
                }

                setThumbnailErrorMessage(
                  error instanceof Error ? error.message : "썸네일을 압축하지 못했어요.",
                );
              })
              .finally(() => {
                setCompressionJobCount((count) => Math.max(count - 1, 0));
              });
          }}
          type="file"
        />
      </label>
      <label>
        <span>가이드 이미지 추가 · 남은 {remainingGuidelineCount}장</span>
        <input
          accept="image/*,.heic,.heif"
          disabled={remainingGuidelineCount === 0}
          multiple
          name="guidelineImages"
          onChange={(event) => {
            const files = Array.from(event.currentTarget.files ?? []).slice(
              0,
              remainingGuidelineCount,
            );
            const selectionId = ++guidelineSelectionId.current;
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
                  error instanceof Error ? error.message : "가이드 이미지를 압축하지 못했어요.",
                );
              })
              .finally(() => {
                setCompressionJobCount((count) => Math.max(count - 1, 0));
              });
          }}
          type="file"
        />
      </label>
      <small>선택한 이미지는 업로드 전에 JPG로 자동 최적화해요.</small>
      {isCompressingImages ? (
        <p className="form-success" role="status">
          이미지를 최적화하고 있어요.
        </p>
      ) : null}
      {imageErrorMessage != null ? (
        <p className="form-error" role="alert">
          {imageErrorMessage}
        </p>
      ) : null}
      {state.message != null ? (
        <p className={state.ok ? "form-success" : "form-error"} role="status">
          {state.message}
        </p>
      ) : null}
      <button
        className="secondary-button"
        disabled={isPending || isSubmitting || isCompressingImages || imageErrorMessage != null}
        type="submit"
      >
        {isCompressingImages
          ? "이미지 최적화 중..."
          : isPending || isSubmitting
            ? "이미지 저장 중..."
            : "이미지 저장"}
      </button>
    </form>
  );
}
