"use client";

import { useActionState, useState } from "react";
import type { FocusEvent } from "react";
import type { BloggerProfile } from "@pacto/types";

import { updateBloggerProfileAction, type ProfileUpdateState } from "../_actions/blogger-actions";

const initialState: ProfileUpdateState = { ok: false };
const PROFILE_FIELD_COUNT = 7;

type ProfileEditFormProps = {
  profile?: BloggerProfile;
};

export function ProfileEditForm({ profile }: ProfileEditFormProps) {
  const [state, formAction, isPending] = useActionState(updateBloggerProfileAction, initialState);
  const [revealedStep, setRevealedStep] = useState(0);

  const revealNextField = (step: number, event: FocusEvent<HTMLInputElement>) => {
    const input = event.currentTarget;

    if (!input.validity.valid || (input.required && input.value.trim().length === 0)) {
      return;
    }

    setRevealedStep((currentStep) => Math.max(currentStep, step + 1));
  };

  return (
    <form action={formAction} className="profile-edit-form">
      <div className="profile-form-progress">
        <span>
          <strong>{Math.min(revealedStep + 1, PROFILE_FIELD_COUNT)}</strong>/{PROFILE_FIELD_COUNT}
        </span>
        <p>입력을 마치면 다음 항목이 열려요.</p>
        {revealedStep < PROFILE_FIELD_COUNT ? (
          <button onClick={() => setRevealedStep(PROFILE_FIELD_COUNT)} type="button">
            전체 펼치기
          </button>
        ) : null}
      </div>

      <div className="profile-form-grid profile-basic-fields">
        <label>
          <span>이름</span>
          <input
            defaultValue={profile?.name ?? ""}
            name="name"
            onBlur={(event) => revealNextField(0, event)}
            placeholder="실명"
            required
          />
        </label>
        {revealedStep >= 1 ? (
          <label>
            <span>활동 닉네임</span>
            <input
              defaultValue={profile?.nickname ?? ""}
              name="nickname"
              onBlur={(event) => revealNextField(1, event)}
              placeholder="블로그에서 사용하는 이름"
            />
          </label>
        ) : null}
        {revealedStep >= 2 ? (
          <label className="profile-form-full">
            <span>블로그 주소</span>
            <input
              defaultValue={profile?.blogUrl ?? ""}
              inputMode="url"
              name="blogUrl"
              onBlur={(event) => revealNextField(2, event)}
              placeholder="https://blog.naver.com/..."
              type="url"
            />
          </label>
        ) : null}
        {revealedStep >= 3 ? (
          <label className="profile-form-full">
            <span>연락처</span>
            <input
              defaultValue={profile?.contact ?? ""}
              inputMode="tel"
              name="contact"
              onBlur={(event) => revealNextField(3, event)}
              placeholder="010-0000-0000"
              type="tel"
            />
          </label>
        ) : null}
      </div>

      {revealedStep >= 4 ? (
        <>
          <div className="profile-form-divider" />
          <div className="profile-form-heading">
            <strong>정산 계좌</strong>
            <span>캠페인 보상을 출금할 계좌 정보를 입력해 주세요.</span>
          </div>
          <div className="profile-form-grid profile-payout-fields">
            <label>
              <span>은행</span>
              <input
                defaultValue={profile?.bankName ?? ""}
                name="bankName"
                onBlur={(event) => revealNextField(4, event)}
                placeholder="은행명"
              />
            </label>
            {revealedStep >= 5 ? (
              <label>
                <span>예금주</span>
                <input
                  defaultValue={profile?.accountHolder ?? ""}
                  name="accountHolder"
                  onBlur={(event) => revealNextField(5, event)}
                  placeholder="예금주명"
                />
              </label>
            ) : null}
            {revealedStep >= 6 ? (
              <label className="profile-form-full">
                <span>계좌번호</span>
                <input
                  defaultValue={profile?.accountNumber ?? ""}
                  inputMode="numeric"
                  name="accountNumber"
                  onBlur={(event) => revealNextField(6, event)}
                  placeholder="하이픈 없이 입력"
                />
              </label>
            ) : null}
          </div>
        </>
      ) : null}

      {state.message != null ? (
        <p
          className={state.ok ? "profile-form-message success" : "profile-form-message error"}
          role="status"
        >
          {state.message}
        </p>
      ) : null}

      {revealedStep >= PROFILE_FIELD_COUNT ? (
        <button className="primary-button full-width" disabled={isPending} type="submit">
          {isPending ? "저장 중..." : "프로필 저장"}
        </button>
      ) : null}
    </form>
  );
}
