"use client";

import { useActionState } from "react";
import type { AdvertiserProfile } from "@pacto/types";

import {
  updateAdvertiserProfileAction,
  type AdvertiserProfileUpdateState,
} from "../../../_actions/profile-actions";

const initialState: AdvertiserProfileUpdateState = { ok: false };

export function AdvertiserProfileForm({ profile }: { profile?: AdvertiserProfile }) {
  const [state, formAction, isPending] = useActionState(
    updateAdvertiserProfileAction,
    initialState,
  );

  return (
    <form action={formAction} className="settings-profile-form">
      <div className="settings-profile-grid">
        <ProfileField
          defaultValue={profile?.companyName}
          label="회사명"
          name="companyName"
          placeholder="회사 또는 사업체명"
        />
        <ProfileField
          defaultValue={profile?.brandName}
          label="브랜드명"
          name="brandName"
          placeholder="캠페인에 표시할 브랜드"
        />
        <ProfileField
          defaultValue={profile?.managerName}
          label="담당자명"
          name="managerName"
          placeholder="담당자 이름"
        />
        <ProfileField
          defaultValue={profile?.contact}
          label="담당자 연락처"
          name="contact"
          placeholder="010-0000-0000"
          type="tel"
        />
        <ProfileField
          className="full-row"
          defaultValue={profile?.businessNumber}
          label="사업자등록번호"
          name="businessNumber"
          placeholder="하이픈 없이 입력"
        />
      </div>

      <div className="settings-form-divider" />
      <div className="settings-form-heading">
        <strong>정산 계좌</strong>
        <span>환불 및 정산 처리에 사용할 계좌 정보입니다.</span>
      </div>
      <div className="settings-profile-grid three-columns">
        <ProfileField
          defaultValue={profile?.bankName}
          label="은행"
          name="bankName"
          placeholder="은행명"
        />
        <ProfileField
          defaultValue={profile?.accountHolder}
          label="예금주"
          name="accountHolder"
          placeholder="예금주명"
        />
        <ProfileField
          defaultValue={profile?.accountNumber}
          label="계좌번호"
          name="accountNumber"
          placeholder="하이픈 없이 입력"
        />
      </div>

      <div className="settings-form-actions">
        {state.message != null ? (
          <p
            className={state.ok ? "settings-save-message success" : "settings-save-message error"}
            role="status"
          >
            {state.message}
          </p>
        ) : null}
        <button className="primary-button" disabled={isPending} type="submit">
          {isPending ? "저장 중..." : "설정 저장"}
        </button>
      </div>
    </form>
  );
}

function ProfileField({
  className,
  defaultValue,
  label,
  name,
  placeholder,
  type = "text",
}: {
  className?: string;
  defaultValue?: string;
  label: string;
  name: string;
  placeholder: string;
  type?: "tel" | "text";
}) {
  return (
    <label className={className}>
      <span>{label}</span>
      <input defaultValue={defaultValue ?? ""} name={name} placeholder={placeholder} type={type} />
    </label>
  );
}
