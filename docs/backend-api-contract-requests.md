# 백엔드 API 계약 수정 요청서

이 문서는 프론트엔드 구현 중 확인된 백엔드 API 계약 수정 요청을 정리한다.

목표는 프론트에서 임시 fallback, 추가 조합 호출, 화면용 가짜 값을 줄이고 실제 백엔드 응답 계약을 기준으로 타입과 UI를 안정화하는 것이다.

## 공통 원칙

- 화면에서 항상 필요한 값은 응답 DTO에 포함한다.
- JPA 엔티티를 그대로 반환하기보다 화면/도메인 목적에 맞는 DTO를 반환한다.
- enum 값은 백엔드와 프론트가 동일한 철자를 사용한다.
- 비즈니스 의미가 있는 값은 프론트에서 임의 생성하지 않는다.
- 누락된 필수 값은 fallback으로 숨기지 않고 API 계약 문제로 드러나게 한다.
- 가능하면 `CommonResponse<T>` 응답 형태를 일관되게 사용한다.

## 현재 BE_src 기준 확인 사항

### 캠페인

- `GET /api/v1/campaigns`, `GET /api/v1/campaigns/{campaignId}`는 public 허용이다.
- 목록/상세 응답은 현재 `Campaign` 엔티티 기반이다.
- `CampaignStatus`는 `RECRUITING | CLOSED | IN_PROGRESS | COMPLETED | CANCELLED`다.
- 상태 전이 API가 존재한다.
  - `PATCH /api/v1/campaigns/{campaignId}/close`
  - `PATCH /api/v1/campaigns/{campaignId}/complete`
  - `PATCH /api/v1/campaigns/{campaignId}/cancel`
- 캠페인 생성 시 `rewardPoint * totalSlots` 기준의 총 예산이 먼저 잠긴다.
- 지원자 승인 시 선택된 블로거 기준 에스크로와 미션이 생성된다.

### 신청, 미션, 에스크로

- `ApplicationStatus`는 `PENDING | ACCEPTED | REJECTED | CANCELLED`다.
- `ApplicationResponse`는 `applicationId`, `campaignId`, `bloggerId`, `bloggerEmail`, `status`, `createdAt`, `updatedAt`를 반환한다.
- `MissionStatus`는 `IN_PROGRESS | SUBMITTED | APPROVED | REJECTED | CANCELLED`다.
- `Mission` 엔티티에는 캠페인명, 썸네일, 보상 포인트, 캠페인 마감일 같은 화면 표시 필드가 없다.
- `EscrowLedgerResponse`는 `escrowId`, `campaignId`, `amount`, `status`, `createdAt`를 반환한다.
- `GET /api/v1/escrows`는 현재 bloggerId 기준 조회다.

### 지갑, 포인트, 결제

- `WalletResponse`는 `walletId`, `balance`, `lockedBalance`, `updatedAt`를 반환한다.
- `PointHistoryResponse`는 `historyId`, `amount`, `type`, `referenceId`, `createdAt`를 반환한다.
- `PaymentStatus`는 `READY | PAID | FAILED | CANCELED`다.
- `GET /api/v1/payments/{paymentId}` 단건 조회 API가 존재한다.

## P0. 광고주 내 캠페인 목록 API

### 문제

대시보드 캠페인 목록에서 public 캠페인 목록을 조회하고 있다.

이 방식은 다음 문제가 있다.

- 다른 광고주의 캠페인이 섞일 수 있다.
- 기본 페이지 크기 때문에 방금 생성한 캠페인이 목록에 바로 보이지 않을 수 있다.
- 광고주 대시보드 전용 상태/통계 필드를 확장하기 어렵다.

### 요청

광고주 본인의 캠페인 목록 전용 API를 추가한다.

제안 엔드포인트:

```http
GET /api/v1/advertiser/campaigns
```

또는:

```http
GET /api/v1/campaigns/me
```

요구사항:

- 로그인한 광고주 ID 기준으로 조회한다.
- 다른 광고주의 캠페인은 포함하지 않는다.
- 최신 생성순으로 정렬한다.
- 응답은 `CampaignResponse` DTO를 사용한다.

제안 응답:

```ts
type AdvertiserCampaignResponse = {
  campaignId: number;
  advertiserId: number;
  title: string;
  brandName: string;
  category: string;
  thumbnailUrl?: string | null;
  rewardPoint: number;
  guidelines: unknown;
  deadline: string;
  totalSlots: number;
  remainingSlots: number;
  status: "RECRUITING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
  createdAt?: string;
  updatedAt?: string;
};
```

### 프론트 영향

현재 프론트는 임시로 public 목록을 `page=0&size=100&sort=campaignId,desc`로 조회한다.
전용 API가 생기면 대시보드 캠페인 목록과 생성 후 복귀 로직을 해당 API로 교체한다.

## P0. 광고주 대시보드 홈 DTO 확장

### 문제

대시보드 홈은 `docs/dasboard.md` 설계 기준으로 다음 카드들을 한 번에 구성해야 한다.

- 상단 KPI 5개
- 캠페인 관리 카드
- 예산 선예치 카드
- 콘텐츠 진행 상태 카드
- 참여 블로거 카드
- 정산 진행 현황 카드
- 최근 지원자/최근 포인트 흐름

현재 `GET /api/v1/advertiser/dashboard`는 집계 일부를 제공하지만, 카드 렌더링에 필요한 표시 데이터가 부족하다.

현재 프론트 임시 처리:

- 캠페인 관리 카드는 별도 `GET /api/v1/campaigns` 호출로 보강한다.
- 참여 블로거 프로필, 평균 등급은 목업으로 표시한다.
- 최근 포인트 흐름은 금액/타입만 표시하고 캠페인명은 표시하지 못한다.
- 정산 진행 단계는 `escrowSummary`를 프론트에서 재구성한다.

### 요청

대시보드 홈 전용 응답 DTO에 화면 구성 데이터를 포함한다.

제안 엔드포인트:

```http
GET /api/v1/advertiser/dashboard
```

제안 응답:

```ts
type AdvertiserDashboardResponse = {
  wallet: {
    balance: number;
    lockedBalance: number;
  };
  campaignSummary: {
    totalCampaigns: number;
    recruitingCampaigns: number;
    inProgressCampaigns: number;
    completedCampaigns: number;
    cancelledCampaigns?: number;
  };
  applicationSummary: {
    pendingApplications: number;
    acceptedApplications: number;
  };
  missionSummary: {
    submittedMissions: number;
    approvedMissions: number;
    rejectedMissions: number;
  };
  escrowSummary: {
    lockedEscrows: number;
    releasedEscrows: number;
    canceledEscrows: number;
    lockedAmount: number;
    releasedAmount: number;
    canceledAmount: number;
  };
  recentCampaigns: Array<{
    campaignId: number;
    title: string;
    brandName: string;
    thumbnailUrl?: string | null;
    rewardPoint: number;
    deadline: string;
    totalSlots: number;
    approvedCount: number;
    remainingSlots: number;
    status: "RECRUITING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
  }>;
  bloggerSummary: {
    totalBloggers: number;
    newBloggers: number;
    activeBloggers: number;
    averageRating?: number | null;
    previews: Array<{
      bloggerId: number;
      bloggerName: string;
      profileImageUrl?: string | null;
    }>;
  };
  recentApplications: Array<{
    applicationId: number;
    campaignId: number;
    campaignTitle: string;
    bloggerId: number;
    bloggerName: string;
    bloggerEmail?: string;
    status: "PENDING" | "ACCEPTED" | "REJECTED" | "CANCELLED";
    createdAt: string;
  }>;
  pendingMissions: Array<{
    missionId: number;
    campaignId: number;
    campaignTitle: string;
    bloggerId: number;
    bloggerName?: string;
    submittedUrl?: string | null;
    status: "SUBMITTED";
    createdAt: string;
  }>;
  recentPointHistories: Array<{
    historyId: number;
    amount: number;
    type: "CHARGE" | "LOCK" | "RELEASE" | "REFUND" | "WITHDRAW";
    referenceId?: number | null;
    referenceType?: "CAMPAIGN" | "ESCROW" | "PAYMENT" | "WITHDRAWAL";
    campaignId?: number | null;
    campaignTitle?: string | null;
    createdAt: string;
  }>;
};
```

### 프론트 영향

이 응답이 제공되면 대시보드 홈에서 다음 임시 처리를 제거한다.

- public 캠페인 목록 추가 호출
- 블로거 프로필/평균 등급 목업
- 포인트 내역의 캠페인명 누락
- 미션/지원자 행의 `캠페인 #id` fallback

## P0. 미션 목록/상세 표시 DTO

### 문제

블로거 미션 목록/상세에서 미션 자체 정보만으로는 화면을 구성할 수 없다.

현재 미션 엔티티에는 다음 값이 없다.

- 캠페인명
- 썸네일
- 보상 포인트
- 캠페인 마감일

프론트는 이를 보완하기 위해 미션마다 캠페인 상세 API를 추가 호출하고 있다.

### 요청

미션 응답을 엔티티 그대로 반환하지 말고 표시용 DTO로 반환한다.

적용 대상:

```http
GET /api/v1/missions/me
GET /api/v1/missions/{missionId}
GET /api/v1/campaigns/{campaignId}/missions
```

제안 응답:

```ts
type MissionResponse = {
  missionId: number;
  campaignId: number;
  bloggerId: number;
  escrowId: number;
  submittedUrl?: string | null;
  status: "IN_PROGRESS" | "SUBMITTED" | "APPROVED" | "REJECTED" | "CANCELLED";
  createdAt: string;
  updatedAt: string;
  campaignTitle: string;
  campaignThumbnailUrl?: string | null;
  rewardPoint: number;
  campaignDeadline: string;
};
```

### 프론트 영향

응답 DTO가 정리되면 프론트에서 다음 임시 처리를 제거한다.

- `Campaign #id` 같은 임시 제목
- rewardPoint `0` fallback
- 미션별 캠페인 상세 추가 호출
- 썸네일/마감일 fallback

## P0. 에스크로/정산 표시 DTO

### 문제

에스크로 응답에 화면 표시용 조인 데이터가 부족하다.

현재 `EscrowLedgerResponse`에는 다음 값이 없다.

- 캠페인명
- 블로거 이름 또는 이메일

또한 현재 에스크로 목록 API는 bloggerId 기준이라 광고주 대시보드에서 캠페인별 정산 내역을 보기 어렵다.

### 요청

광고주용 캠페인 에스크로 조회 API를 추가한다.

제안 엔드포인트:

```http
GET /api/v1/advertiser/campaigns/{campaignId}/escrows
```

요구사항:

- 로그인 광고주가 소유한 캠페인인지 검증한다.
- `campaignId` 기준 에스크로 목록을 조회한다.
- 캠페인명과 블로거 표시명을 조인해서 반환한다.

제안 응답:

```ts
type EscrowLedgerResponse = {
  escrowId: number;
  campaignId: number;
  campaignTitle: string;
  bloggerId: number;
  bloggerName: string;
  bloggerEmail?: string;
  amount: number;
  status: "LOCKED" | "RELEASED" | "CANCELED";
  createdAt: string;
};
```

### 프론트 영향

프론트 타입에서는 `campaignTitle`, `bloggerName`을 required로 두는 방향이다.
백엔드에서 값이 내려오면 fallback 없이 정산/에스크로 화면에 바로 표시한다.

## P0. 캠페인 생성 전 예산 검증

### 문제

현재 캠페인 생성 시점에는 총 예산 검증이 없다.

현재 흐름:

1. 광고주가 캠페인을 생성한다.
2. 블로거가 신청한다.
3. 광고주가 신청자를 승인한다.
4. 승인 시점에 1명분 `rewardPoint`가 에스크로로 잠긴다.

이 구조에서는 캠페인 생성은 성공했지만 이후 승인 시점에 광고주 잔고 부족으로 실패할 수 있다.

### 요청

캠페인 생성 시 다음 값을 기준으로 광고주 지갑 잔고를 검증한다.

```ts
requiredBudget = rewardPoint * totalSlots;
```

요구사항:

- 최소한 생성 시점에 `balance >= requiredBudget`인지 검증한다.
- 잔고 부족 시 명확한 에러 코드와 메시지를 반환한다.
- 실제 락을 생성 시점에 할지, 승인 시점에 할지는 백엔드 정책으로 결정하되 API 문서에 명시한다.

제안 에러:

```json
{
  "code": "INSUFFICIENT_BALANCE",
  "message": "캠페인 총 예산보다 광고주 잔고가 부족합니다."
}
```

### 프론트 영향

프론트는 생성 폼에서 예상 예산을 보여줄 수 있다.
최종 검증은 백엔드 응답을 기준으로 처리한다.

## P1. 캠페인 목록/상세에 브랜드명과 카테고리 포함

### 문제

블로거 캠페인 목록/상세 화면에서 회사명과 카테고리가 필요하다.

현재 프론트는 회사명 자리에 임시 값 또는 광고주 ID 기반 문구를 표시하고 있고, 카테고리 필터도 정확한 백엔드 필드 없이 임시 처리 중이다.

### 요청

캠페인 목록/상세 응답에 다음 필드를 추가한다.

```ts
type CampaignResponse = {
  campaignId: number;
  advertiserId: number;
  brandName: string;
  category: string;
  title: string;
  thumbnailUrl?: string | null;
  rewardPoint: number;
  guidelines: unknown;
  deadline: string;
  totalSlots: number;
  remainingSlots: number;
  status: "RECRUITING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
};
```

권장사항:

- `brandName`과 `category`는 목록/상세에서 동일하게 제공한다.
- `category`가 enum이면 가능한 값 목록을 문서화한다.

### 프론트 영향

브랜드명 fallback을 제거하고 카테고리 필터를 실제 필드 기준으로 전환한다.

## P1. 포인트 히스토리 표시 DTO

### 문제

월렛 포인트 내역에서 “어떤 캠페인/에스크로/결제로 발생한 내역인지”를 표시하기 어렵다.

현재는 `referenceId`만 내려오기 때문에 프론트가 미션/에스크로 데이터를 추가로 조합해야 한다.

### 요청

포인트 히스토리 응답에 참조 타입과 표시용 필드를 추가한다.

제안 응답:

```ts
type PointHistoryResponse = {
  historyId: number;
  amount: number;
  type: "CHARGE" | "LOCK" | "RELEASE" | "REFUND" | "WITHDRAW";
  referenceId?: number | null;
  referenceType?: "CAMPAIGN" | "ESCROW" | "PAYMENT" | "WITHDRAWAL";
  campaignId?: number | null;
  campaignTitle?: string | null;
  createdAt: string;
};
```

### 프론트 영향

월렛 내역에서 `#referenceId` 대신 캠페인명을 표시할 수 있다.
미션 목록과 포인트 내역을 억지로 매칭하는 임시 로직을 제거한다.

## P1. 지원자 목록 프로필 필드

### 문제

대시보드 지원자 목록에서 블로거 이름/블로그 URL이 필요할 수 있다.

현재 `ApplicationResponse`에는 `bloggerEmail`만 있다.
프론트에서 이메일 앞부분으로 이름이나 블로그 URL을 임의 생성하는 것은 정확하지 않다.

### 요청

지원자 목록 응답에 블로거 프로필 표시 필드를 추가한다.

제안 응답:

```ts
type ApplicationResponse = {
  applicationId: number;
  campaignId: number;
  bloggerId: number;
  bloggerEmail: string;
  bloggerName?: string | null;
  blogUrl?: string | null;
  status: "PENDING" | "ACCEPTED" | "REJECTED" | "CANCELLED";
  createdAt: string;
  updatedAt: string;
};
```

### 프론트 영향

이름/블로그 URL 임시 생성 로직을 제거하고 백엔드 응답값만 표시한다.
`fitScore`는 백엔드에서 실제 점수 모델을 제공하기 전까지 사용하지 않는다.

## P2. 결제 단건 조회 API

### 문제

프론트 API 패키지에는 결제 단건 조회 함수가 있었지만, 현재 BE_src에는 대응되는 GET API가 없다.

현재 백엔드 결제 API:

```http
POST /api/v1/payments
POST /api/v1/payments/verify
```

### 요청

결제 상세 화면 또는 결제 상태 조회가 필요하다면 단건 조회 API를 추가한다.

제안 엔드포인트:

```http
GET /api/v1/payments/{paymentId}
```

제안 응답:

```ts
type PaymentResponse = {
  paymentId: number;
  amount: number;
  status: "READY" | "PAID" | "FAILED" | "CANCELED";
  orderId?: string;
  createdAt: string;
  updatedAt?: string;
};
```

### 프론트 영향

단건 조회 API가 없다면 프론트의 `getPayment(paymentId)`는 사용하지 않는다.
필요 화면이 생기면 위 API 추가 후 연결한다.

## 프론트 반영 완료/결정 사항

### enum 정렬

- 캠페인 상태는 `CANCELLED`를 사용한다.
- 신청 상태는 `PENDING | ACCEPTED | REJECTED | CANCELLED`를 사용한다.
- 미션 상태는 `IN_PROGRESS | SUBMITTED | APPROVED | REJECTED | CANCELLED`를 사용한다.
- 결제 상태는 백엔드 철자에 맞춰 `CANCELED`를 사용한다.

### 인증 role

- 현재 백엔드 role은 `BLOGGER | ADVERTISER`다.
- 프론트도 동일하게 유지한다.
- 추후 role이 늘어나면 백엔드 enum, API 문서, 프론트 `UserRole`을 함께 수정한다.

### 지갑 누적 금액

- `WalletResponse`에는 `totalEarned`가 없다.
- 누적 수익은 필요 시 포인트 히스토리를 기준으로 프론트에서 계산한다.
- 다만 월렛 화면에서 정확한 캠페인명을 표시하려면 `PointHistoryResponse` 개선이 필요하다.

### 캠페인 상태 전이 API

프론트 API 패키지에 다음 함수를 추가했다.

```ts
closeCampaign(campaignId, token?)
completeCampaign(campaignId, token?)
cancelCampaign(campaignId, token?)
```

대시보드 화면에서 실제 버튼으로 연결할지는 UX 정책 확정 후 진행한다.
