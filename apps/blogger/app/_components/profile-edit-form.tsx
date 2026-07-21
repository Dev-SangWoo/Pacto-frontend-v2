"use client";

import { useActionState } from "react";
import type { BloggerProfile } from "@pacto/types";

import { updateBloggerProfileAction, type ProfileUpdateState } from "../_actions/blogger-actions";

const initialState: ProfileUpdateState = { ok: false };

type ProfileEditFormProps = {
  profile?: BloggerProfile;
};

export function ProfileEditForm({ profile }: ProfileEditFormProps) {
  const [state, formAction, isPending] = useActionState(updateBloggerProfileAction, initialState);

  return (
    <form action={formAction} className="profile-edit-form">
      <div className="profile-form-grid profile-basic-fields">
        <label>
          <span>이름</span>
          <input defaultValue={profile?.name ?? ""} name="name" placeholder="실명" required />
        </label>
        <label>
          <span>활동 닉네임</span>
          <input
            defaultValue={profile?.nickname ?? ""}
            name="nickname"
            placeholder="블로그에서 사용하는 이름"
          />
        </label>
        <label className="profile-form-full">
          <span>블로그 주소</span>
          <input
            defaultValue={profile?.blogUrl ?? ""}
            inputMode="url"
            name="blogUrl"
            placeholder="https://blog.naver.com/..."
            type="url"
          />
        </label>
        <label className="profile-form-full">
          <span>연락처</span>
          <input
            defaultValue={profile?.contact ?? ""}
            inputMode="tel"
            name="contact"
            placeholder="010-0000-0000"
            type="tel"
          />
        </label>
      </div>

      <div className="profile-form-divider" />

      <div className="profile-form-heading">
        <strong>정산 계좌</strong>
        <span>캠페인 보상을 출금할 계좌 정보를 입력해 주세요.</span>
      </div>
      <div className="profile-form-grid profile-payout-fields">
        <label>
          <span>은행</span>
          <input defaultValue={profile?.bankName ?? ""} name="bankName" placeholder="은행명" />
        </label>
        <label>
          <span>예금주</span>
          <input
            defaultValue={profile?.accountHolder ?? ""}
            name="accountHolder"
            placeholder="예금주명"
          />
        </label>
        <label className="profile-form-full">
          <span>계좌번호</span>
          <input
            defaultValue={profile?.accountNumber ?? ""}
            inputMode="numeric"
            name="accountNumber"
            placeholder="하이픈 없이 입력"
          />
        </label>
      </div>

      {state.message != null ? (
        <p
          className={state.ok ? "profile-form-message success" : "profile-form-message error"}
          role="status"
        >
          {state.message}
        </p>
      ) : null}

      <button className="primary-button full-width" disabled={isPending} type="submit">
        {isPending ? "저장 중..." : "프로필 저장"}
      </button>
    </form>
  );
}
