"use client";

import { useActionState, useEffect, useState } from "react";
import type { BloggerProfile } from "@pacto/types";

import { updateBloggerProfileAction, type ProfileUpdateState } from "../_actions/blogger-actions";
import { KOREAN_BANKS } from "../_lib/banks";

const initialState: ProfileUpdateState = { ok: false };

type ProfileEditFormProps = {
  profile?: BloggerProfile;
};

export function ProfileEditForm({ profile }: ProfileEditFormProps) {
  const [state, formAction, isPending] = useActionState(updateBloggerProfileAction, initialState);
  const [localImagePreviewUrl, setLocalImagePreviewUrl] = useState<string>();
  const [selectedImageName, setSelectedImageName] = useState("");
  const profileImageUrl = profile?.profileImageDownloadUrl ?? profile?.profileImageUrl;
  const imagePreviewUrl = localImagePreviewUrl ?? profileImageUrl;
  const currentBankName = profile?.bankName ?? "";
  const hasUnlistedBank =
    currentBankName.length > 0 &&
    !KOREAN_BANKS.includes(currentBankName as (typeof KOREAN_BANKS)[number]);

  useEffect(() => {
    return () => {
      if (localImagePreviewUrl != null) {
        URL.revokeObjectURL(localImagePreviewUrl);
      }
    };
  }, [localImagePreviewUrl]);

  const previewProfileImage = (file: File | undefined) => {
    if (file == null) {
      setLocalImagePreviewUrl(undefined);
      setSelectedImageName("");
      return;
    }

    setLocalImagePreviewUrl(URL.createObjectURL(file));
    setSelectedImageName(file.name);
  };

  return (
    <form action={formAction} className="profile-edit-form">
      <section className="profile-image-field" aria-labelledby="profile-image-field-title">
        {imagePreviewUrl != null && imagePreviewUrl.length > 0 ? (
          <img
            className="profile-image-field-preview"
            src={imagePreviewUrl}
            alt="프로필 사진 미리보기"
          />
        ) : (
          <span className="profile-image-field-placeholder" aria-hidden="true">
            사진
          </span>
        )}
        <div className="profile-image-field-content">
          <div className="profile-image-field-copy">
            <strong id="profile-image-field-title">프로필 사진</strong>
            <small id="profile-image-field-hint">JPG, PNG, WEBP, GIF · 최대 10MB</small>
          </div>
          <label className="profile-image-select-button" htmlFor="profileImage">
            {selectedImageName.length > 0 ? "사진 다시 선택" : "사진 선택"}
          </label>
          <input
            accept="image/gif,image/jpeg,image/png,image/webp"
            aria-describedby="profile-image-field-hint"
            className="visually-hidden"
            id="profileImage"
            name="profileImage"
            onChange={(event) => previewProfileImage(event.currentTarget.files?.[0])}
            type="file"
          />
          {selectedImageName.length > 0 ? (
            <span className="profile-image-file-name">{selectedImageName}</span>
          ) : null}
        </div>
      </section>

      <p className="profile-form-intro">
        이름만 필수예요. 나머지는 활동과 정산에 필요한 정보만 입력해 주세요.
      </p>

      <fieldset className="profile-form-section">
        <legend>기본 정보</legend>
        <p>프로필과 캠페인 활동에 표시되는 정보예요.</p>
        <div className="profile-form-grid profile-basic-fields">
          <label htmlFor="profileName">
            <span>
              이름 <em>필수</em>
            </span>
            <input
              autoComplete="name"
              defaultValue={profile?.name ?? ""}
              id="profileName"
              name="name"
              placeholder="실명"
              required
            />
          </label>
          <label htmlFor="profileNickname">
            <span>활동 닉네임</span>
            <input
              defaultValue={profile?.nickname ?? ""}
              id="profileNickname"
              name="nickname"
              placeholder="블로그에서 사용하는 이름"
            />
          </label>
          <label className="profile-form-full" htmlFor="profileBlogUrl">
            <span>블로그 주소</span>
            <input
              defaultValue={profile?.blogUrl ?? ""}
              id="profileBlogUrl"
              inputMode="url"
              name="blogUrl"
              placeholder="https://blog.naver.com/..."
              type="url"
            />
          </label>
          <label className="profile-form-full" htmlFor="profileContact">
            <span>연락처</span>
            <input
              autoComplete="tel"
              defaultValue={profile?.contact ?? ""}
              id="profileContact"
              inputMode="tel"
              name="contact"
              placeholder="010-0000-0000"
              type="tel"
            />
          </label>
        </div>
      </fieldset>

      <fieldset className="profile-form-section">
        <legend>정산 계좌</legend>
        <p>캠페인 보상을 출금할 본인 명의 계좌를 입력해 주세요.</p>
        <div className="profile-form-grid profile-payout-fields">
          <label htmlFor="profileBankName">
            <span>은행</span>
            <select defaultValue={profile?.bankName ?? ""} id="profileBankName" name="bankName">
              <option value="">은행을 선택해 주세요</option>
              {hasUnlistedBank ? <option value={currentBankName}>{currentBankName}</option> : null}
              {KOREAN_BANKS.map((bank) => (
                <option key={bank} value={bank}>
                  {bank}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="profileAccountHolder">
            <span>예금주</span>
            <input
              autoComplete="off"
              defaultValue={profile?.accountHolder ?? ""}
              id="profileAccountHolder"
              name="accountHolder"
              placeholder="예금주명"
            />
          </label>
          <label className="profile-form-full" htmlFor="profileAccountNumber">
            <span>계좌번호</span>
            <input
              autoComplete="off"
              defaultValue={profile?.accountNumber ?? ""}
              id="profileAccountNumber"
              inputMode="numeric"
              name="accountNumber"
              placeholder="하이픈 없이 입력"
            />
          </label>
        </div>
      </fieldset>

      {state.message != null ? (
        <p
          className={state.ok ? "profile-form-message success" : "profile-form-message error"}
          role={state.ok ? "status" : "alert"}
        >
          {state.message}
        </p>
      ) : null}

      <button className="primary-button full-width" disabled={isPending} type="submit">
        {isPending ? "저장 중..." : "변경사항 저장"}
      </button>
    </form>
  );
}
