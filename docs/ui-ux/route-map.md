# Pacto Route Map

## 1. 문서 목적

이 문서는 Pacto MVP 프론트엔드의 라우트 구조를 정의한다.

Next.js App Router 구조를 만들 때 이 문서를 기준으로 앱, route group, layout, page를 설계한다.

---

## 2. 앱 구성

Pacto 프론트엔드는 두 개의 앱으로 구성한다.

```txt
apps/blogger
apps/dashboard
```

각 앱의 목적은 다음과 같다.

| 앱 | 사용자 | 기준 화면 |
| --- | --- | --- |
| blogger | 블로거 | 모바일 우선 |
| dashboard | 대행사, 광고주, 내부 운영자 | PC 우선 |

광고주 화면은 MVP에서 별도 앱으로 분리하지 않는다. 결제 링크와 리포트 화면만 제한 View로 제공한다.

---

## 3. Blogger App 라우트

## 3.1 라우트 목록

| Route | 화면 | 목적 | 인증 |
| --- | --- | --- | --- |
| `/blogger/login` | 로그인 | 블로거 로그인 | 비인증 |
| `/blogger/campaigns` | 캠페인 목록 | 참여 가능한 캠페인 탐색 | 필요 |
| `/blogger/campaigns/:id` | 캠페인 상세 | 캠페인 조건 확인과 지원 | 필요 |
| `/blogger/missions` | 내 미션 목록 | 참여 중인 미션 확인 | 필요 |
| `/blogger/missions/:id` | 미션 상세/제출 | 미션 가이드 확인과 제출 | 필요 |
| `/blogger/wallet` | 지갑 | 정산금과 출금 가능 금액 확인 | 필요 |
| `/blogger/withdrawals` | 출금 신청 | 출금 요청 생성 | 필요 |
| `/blogger/profile` | 프로필 | 내 정보 확인과 수정 | 필요 |

## 3.2 권장 App Router 구조

```txt
apps/blogger/app/
  (auth)/
    login/
      page.tsx

  (main)/
    layout.tsx
    campaigns/
      page.tsx
      [campaignId]/
        page.tsx
    missions/
      page.tsx
      [missionId]/
        page.tsx
    wallet/
      page.tsx
    withdrawals/
      page.tsx
    profile/
      page.tsx
```

## 3.3 Blogger Layout

`(main)/layout.tsx`는 모바일 앱 형태의 공통 레이아웃을 제공한다.

포함 요소:

```txt
상단 헤더
콘텐츠 영역
하단 내비게이션
토스트 영역
```

하단 내비게이션 항목:

```txt
캠페인
내 미션
지갑
프로필
```

---

## 4. Dashboard 라우트

## 4.1 라우트 목록

| Route | 화면 | 목적 | 주요 역할 |
| --- | --- | --- | --- |
| `/dashboard/login` | 로그인 | B2B 사용자 로그인 | 비인증 |
| `/dashboard` | 대시보드 홈 | 운영 현황 요약 | Agency, Advertiser, Admin |
| `/dashboard/campaigns` | 캠페인 목록 | 캠페인 검색과 관리 | Agency, Admin |
| `/dashboard/campaigns/new` | 캠페인 등록 | 신규 캠페인 생성 | Agency, Admin |
| `/dashboard/campaigns/:id` | 캠페인 상세 | 캠페인 운영 상태 확인 | Agency, Admin |
| `/dashboard/campaigns/:id/applicants` | 지원자 관리 | 지원자 승인/반려 | Agency, Admin |
| `/dashboard/campaigns/:id/missions` | 미션 검수 | 제출물 검수 | Agency, Admin |
| `/dashboard/escrow` | 정산/에스크로 | 정산 원장 확인 | Agency, Admin |
| `/dashboard/payments` | 결제 | 결제 내역 확인 | Advertiser, Admin |
| `/dashboard/reports` | 리포트 | 캠페인 성과 확인 | Agency, Advertiser, Admin |
| `/dashboard/settings` | 설정 | 계정/조직 설정 | Agency Admin, Admin |

## 4.2 권장 App Router 구조

```txt
apps/dashboard/app/
  (auth)/
    login/
      page.tsx

  (dashboard)/
    layout.tsx
    page.tsx
    campaigns/
      page.tsx
      new/
        page.tsx
      [campaignId]/
        page.tsx
        applicants/
          page.tsx
        missions/
          page.tsx
    escrow/
      page.tsx
    payments/
      page.tsx
    reports/
      page.tsx
    settings/
      page.tsx
```

## 4.3 Dashboard Layout

`(dashboard)/layout.tsx`는 PC 업무용 대시보드 레이아웃을 제공한다.

포함 요소:

```txt
사이드바
상단 헤더
페이지 콘텐츠 영역
토스트 영역
권한 없음 처리
```

사이드바 메뉴는 로그인 사용자의 role에 따라 다르게 노출한다.

---

## 5. Advertiser View 라우트

광고주 화면은 MVP에서 최소화한다.

## 5.1 외부 링크형 라우트

| Route | 화면 | 목적 |
| --- | --- | --- |
| `/advertiser/pay/:campaignId` | 결제 링크 | 캠페인 예산 결제 |
| `/advertiser/reports/:campaignId` | 캠페인 리포트 | 간단 성과 확인 |

## 5.2 Dashboard 내부 라우트

| Route | 화면 | 목적 |
| --- | --- | --- |
| `/dashboard/payment-link` | 결제 링크 관리 | 광고주에게 전달할 결제 링크 확인 |
| `/dashboard/my-campaigns/:id/report` | 내 캠페인 리포트 | 광고주용 결과 확인 |

초기 MVP에서는 외부 링크형 라우트를 우선 고려한다. 광고주가 복잡한 대시보드에 로그인하지 않아도 결제와 결과 확인을 할 수 있기 때문이다.

---

## 6. 접근 제어 기준

라우트 접근 제어는 [rbac-policy.md](./rbac-policy.md)를 따른다.

기본 규칙:

```txt
비로그인 사용자는 auth route만 접근할 수 있다.
로그인 사용자는 자신의 role에 허용된 route만 접근할 수 있다.
허용되지 않은 route 접근 시 권한 없음 화면을 보여준다.
광고주는 대행사 운영 메뉴를 볼 수 없다.
블로거는 dashboard route에 접근할 수 없다.
```

---

## 7. 라우트별 상태 처리

라우트별 공통 상태는 다음과 같이 처리한다.

```txt
loading.tsx: 데이터 로딩 중
error.tsx: 화면 단위 에러
not-found.tsx: 존재하지 않는 리소스
unauthorized: 권한 없음
empty state: 데이터 없음
```

상태 표현 기준은 [status-policy.md](./status-policy.md)를 따른다.

---

## 8. 구현 우선순위

라우트 구현 우선순위는 다음과 같다.

```txt
1. /blogger/campaigns
2. /blogger/campaigns/:id
3. /blogger/missions
4. /blogger/missions/:id
5. /blogger/wallet
6. /dashboard
7. /dashboard/campaigns
8. /dashboard/campaigns/new
9. /dashboard/campaigns/:id/applicants
10. /dashboard/campaigns/:id/missions
11. /advertiser/pay/:campaignId
12. /advertiser/reports/:campaignId
```
