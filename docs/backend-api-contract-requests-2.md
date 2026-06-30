# 백엔드 API 계약 수정 요청서 2

이 문서는 2026-06-23 기준 새 `BE_src` 확인 후 추가로 필요한 백엔드 API/DTO 요청을 정리한다.

목표는 프론트가 임시 URL, 가짜 표시값, 여러 API 조합에 의존하지 않고 실제 서버 응답을 기준으로 화면을 구성하는 것이다.

## P0. 대표 이미지 파일 업로드 API

### 배경

현재 캠페인 생성 API는 `thumbnailUrl: string`만 받는다.

프론트 화면에서는 대표 이미지를 URL로 입력하는 방식만 가능하다.
하지만 실제 광고주는 로컬 이미지 파일을 업로드해서 캠페인 대표 이미지로 사용해야 한다.

프론트 단독으로는 로컬 파일을 영구 접근 가능한 URL로 만들 수 없으므로, 백엔드 또는 스토리지 업로드 API가 필요하다.

### 백엔드 작업 범위

- 이미지 저장소는 AWS S3로 확정한다.
- 이미지 저장용 S3 bucket을 만든다.
  - 예: `pacto-images`
- 파일 목적별 prefix를 분리한다.
  - `campaign-thumbnails/`
  - `guideline-images/`
  - `profile-images/`
- public read bucket으로 시작할지, private bucket + CloudFront 또는 presigned read URL로 갈지 결정한다.
- 현재 서비스 이미지 성격상 캠페인 대표 이미지와 가이드라인 이미지는 public read 또는 CloudFront 공개 URL로 시작해도 된다.
- 민감 파일이 생기면 별도 private prefix 또는 별도 private bucket으로 분리한다.
- 백엔드는 업로드 성공 후 프론트가 DB에 저장할 수 있는 접근 URL을 반환한다.

### 요청

이미지 파일을 업로드하고 접근 가능한 URL을 반환하는 API를 추가한다.

제안 엔드포인트:

```http
POST /api/v1/uploads/images
Content-Type: multipart/form-data
Authorization: Bearer {token}
```

요청 필드:

```ts
type ImageUploadRequest = {
  file: File;
  purpose?: "CAMPAIGN_THUMBNAIL" | "GUIDELINE_IMAGE" | "PROFILE_IMAGE";
};
```

제안 응답:

```ts
type ImageUploadResponse = {
  imageUrl: string;
  originalFilename?: string;
  contentType?: string;
  size?: number;
};
```

권장 검증:

- 허용 확장자: `jpg`, `jpeg`, `png`, `webp`
- 허용 MIME: `image/jpeg`, `image/png`, `image/webp`
- 최대 용량: 5MB 또는 10MB
- 이미지 URL은 외부에서 접근 가능해야 한다.
- 실패 시 400 응답으로 명확한 메시지를 반환한다.

예시 실패 응답:

```json
{
  "success": false,
  "message": "지원하지 않는 이미지 형식입니다.",
  "data": {},
  "timestamp": "2026-06-23T10:00:00"
}
```

### 프론트 사용 흐름

```text
1. 사용자가 캠페인 대표 이미지 파일 선택
2. 프론트가 POST /api/v1/uploads/images 호출
3. 응답의 imageUrl을 저장
4. POST /api/v1/campaigns 호출 시 thumbnailUrl에 imageUrl 전달
```

캠페인 생성 요청:

```ts
type CampaignCreateRequest = {
  title: string;
  thumbnailUrl?: string;
  rewardPoint: number;
  guidelines: Record<string, unknown>;
  deadline: string;
  totalSlots: number;
};
```

### AWS S3 기준 구현 메모

프론트가 파일을 직접 S3에 올리는 방식도 가능하지만, 서비스 정책과 파일 검증을 백엔드에서 통제하려면 백엔드 업로드 API를 두는 편이 좋다.

권장 흐름:

```text
프론트 파일 선택
→ 백엔드 POST /api/v1/uploads/images
→ 백엔드가 파일 검증
→ 백엔드가 AWS S3에 업로드
→ 백엔드가 imageUrl 반환
→ 프론트가 campaign.thumbnailUrl 또는 guidelines JSON에 imageUrl 저장
```

S3 object key는 목적별 prefix와 UUID 기반 파일명으로 생성하는 것을 권장한다.

```text
campaign-thumbnails/{uuid}.webp
guideline-images/{uuid}.webp
profile-images/{uuid}.webp
```

백엔드가 직접 업로드하기 어렵다면 대안으로 S3 presigned upload URL 발급 방식도 가능하다.

```http
POST /api/v1/uploads/images/signed-url
```

```ts
type SignedImageUploadResponse = {
  uploadUrl: string;
  imageUrl: string;
  path: string;
};
```

## P0. 캠페인 생성 실패 응답 구체화

### 배경

새 백엔드 구조에서는 캠페인 생성 시 `rewardPoint * totalSlots` 총 예산이 광고주 지갑에서 잠긴다.

현재 프론트 로그 기준 캠페인 생성 실패 시 다음처럼 generic 500이 내려오는 케이스가 있다.

```json
{
  "success": false,
  "message": "서버 오류가 발생했습니다.",
  "data": {},
  "timestamp": "2026-06-23T07:35:47"
}
```

프론트는 이 메시지만으로 사용자가 고칠 수 있는 문제인지, 서버 문제인지 구분하기 어렵다.

### 요청

캠페인 생성 중 발생 가능한 검증/비즈니스 오류를 400 계열로 명확히 반환한다.

필요한 케이스:

- 광고주 지갑 없음
- 사용 가능 잔액 부족
- 대표 이미지 URL 형식 오류
- `rewardPoint`, `totalSlots`, `deadline`, `title`, `guidelines` 입력값 오류
- 캠페인 생성 후 예산 잠금 실패

예시:

```http
400 Bad Request
```

```json
{
  "success": false,
  "message": "잔액이 부족합니다.",
  "data": {
    "requiredAmount": 500000,
    "availableBalance": 120000
  },
  "timestamp": "2026-06-23T10:00:00"
}
```

### 프론트 영향

프론트는 현재 생성 전 `GET /api/v1/wallets/me`로 잔액을 선확인하고 있다.
하지만 최종 검증은 백엔드가 해야 하므로, 백엔드 오류 메시지가 구체적이면 폼에서 그대로 사용자에게 보여줄 수 있다.

## P0. 가이드라인 JSON 형식 계약

### 배경

현재 캠페인 생성 API의 `guidelines`는 `Map<String, Object>`라서 JSON 저장은 가능하다.

다만 프론트는 현재 textarea를 줄 단위로 쪼개서 다음 형태로 보내고 있다.

```ts
guidelines: {
  items: string[];
}
```

앞으로는 가이드라인에 텍스트, 리스트, 이미지, 링크를 넣을 수 있어야 한다.
이를 위해 프론트는 Tiptap 같은 에디터를 사용하고, 백엔드는 에디터 JSON을 저장/반환하는 계약이 필요하다.

### 요청

`CampaignRequestDto.guidelines`는 현재처럼 JSON object를 받되, 새 표준 형식을 아래처럼 정의한다.

```ts
type CampaignGuidelines = {
  editor: "tiptap";
  version: 1;
  content: {
    type: "doc";
    content?: unknown[];
  };
};
```

예시:

```json
{
  "editor": "tiptap",
  "version": 1,
  "content": {
    "type": "doc",
    "content": [
      {
        "type": "heading",
        "attrs": { "level": 2 },
        "content": [{ "type": "text", "text": "촬영 가이드" }]
      },
      {
        "type": "paragraph",
        "content": [{ "type": "text", "text": "제품이 잘 보이게 촬영해 주세요." }]
      },
      {
        "type": "image",
        "attrs": {
          "src": "https://.../guideline-images/example.png",
          "alt": "촬영 예시"
        }
      }
    ]
  }
}
```

### 백엔드 작업 범위

- `guidelines`를 JSONB로 저장한다.
- 생성/조회 시 `guidelines` JSON을 변형하지 않고 그대로 저장/반환한다.
- 최소 검증만 수행한다.
  - object 여부
  - `editor`, `version`, `content.type` 존재 여부
  - 이미지 node의 `src`가 허용된 이미지 URL인지 여부
- 기존 데이터 호환을 위해 `items: string[]` 형태도 당분간 허용한다.

### 프론트 영향

- 캠페인 생성 폼에서 textarea를 Tiptap 에디터로 교체할 수 있다.
- 가이드라인 이미지는 먼저 업로드 API로 `imageUrl`을 받은 뒤 Tiptap image node에 삽입한다.
- 캠페인 상세 화면은 `editor === "tiptap"`이면 Tiptap JSON renderer로 렌더링하고, 기존 `items` 형식이면 기존 리스트로 렌더링한다.

## P1. 지원자 응답 DTO 확장

### 배경

현재 `ApplicationResponse`는 다음 필드만 반환한다.

```ts
type ApplicationResponse = {
  applicationId: number;
  campaignId: number;
  bloggerId: number;
  bloggerEmail: string;
  status: "PENDING" | "ACCEPTED" | "REJECTED" | "CANCELLED";
  createdAt: string;
  updatedAt: string;
};
```

지원자 심사 화면에서는 블로거 이름과 블로그 URL이 필요하다.
현재 프론트는 이메일 앞부분을 이름처럼 표시하고 있으며, 블로그 URL은 표시하지 못한다.

### 요청

`GET /api/v1/applications/campaign/{campaignId}` 응답에 블로거 표시 정보를 포함한다.

제안 응답:

```ts
type CampaignApplicationResponse = {
  applicationId: number;
  campaignId: number;
  bloggerId: number;
  bloggerName: string;
  bloggerEmail?: string;
  blogUrl?: string | null;
  profileImageUrl?: string | null;
  status: "PENDING" | "ACCEPTED" | "REJECTED" | "CANCELLED";
  createdAt: string;
  updatedAt: string;
};
```

### 프론트 영향

지원자 심사 페이지의 오른쪽 상세 패널에서 실제 블로거 이름, 블로그 URL, 프로필 이미지를 표시할 수 있다.

## P1. 미션 응답 DTO 확장

### 배경

현재 미션 API는 `Mission` 엔티티 기반 응답이라 화면 표시 정보가 부족하다.

부족한 값:

- 캠페인명
- 브랜드/광고주명
- 대표 이미지
- 보상 포인트
- 블로거명

### 요청

미션 목록/상세 응답을 DTO로 분리하고 화면 표시 필드를 포함한다.

대상 API:

```http
GET /api/v1/missions/me
GET /api/v1/campaigns/{campaignId}/missions
```

제안 응답:

```ts
type MissionResponse = {
  missionId: number;
  campaignId: number;
  campaignTitle: string;
  brandName?: string;
  thumbnailUrl?: string | null;
  rewardPoint: number;
  bloggerId: number;
  bloggerName?: string;
  escrowId: number;
  submittedUrl?: string | null;
  status: "IN_PROGRESS" | "SUBMITTED" | "APPROVED" | "REJECTED" | "CANCELLED";
  createdAt: string;
  updatedAt: string;
};
```

### 프론트 영향

- 블로거 미션 페이지에서 캠페인 키값 대신 실제 캠페인명을 표시할 수 있다.
- 대시보드 미션 검수 페이지에서 블로거명과 캠페인명을 정확히 표시할 수 있다.
- 지갑 내역에서 referenceId를 별도 캠페인 조회로 보강하는 임시 로직을 줄일 수 있다.

## P1. 광고주 캠페인별 에스크로 목록 API

### 배경

현재 `GET /api/v1/escrows`는 JWT userId를 bloggerId처럼 사용해 내 에스크로 목록을 조회한다.

광고주 대시보드에서는 특정 캠페인의 에스크로/정산 현황을 봐야 한다.
현재 구조로는 광고주가 캠페인별 에스크로 목록을 정확히 조회하기 어렵다.

### 요청

광고주 전용 캠페인별 에스크로 목록 API를 추가한다.

제안 엔드포인트:

```http
GET /api/v1/advertiser/campaigns/{campaignId}/escrows
```

제안 응답:

```ts
type AdvertiserCampaignEscrowResponse = {
  escrowId: number;
  campaignId: number;
  campaignTitle: string;
  bloggerId: number;
  bloggerName: string;
  amount: number;
  status: "LOCKED" | "RELEASED" | "CANCELED";
  createdAt: string;
  updatedAt?: string;
};
```

권한:

- JWT 광고주 ID가 해당 캠페인의 `advertiserId`와 일치해야 한다.
- 일치하지 않으면 403을 반환한다.

### 프론트 영향

대시보드 정산/에스크로 페이지에서 캠페인별 잠금/정산/취소 내역을 정확히 표시할 수 있다.

## P2. 광고주 내 캠페인 목록 API

### 배경

현재 대시보드 캠페인 목록은 public 캠페인 목록 API를 사용한다.

```http
GET /api/v1/campaigns?page=0&size=100&sort=campaignId,desc
```

이 방식은 다른 광고주의 캠페인이 섞일 수 있고, 대시보드 전용 필터/집계 확장이 어렵다.

또한 public 목록을 받은 뒤 프론트에서 `advertiserId`로 필터링하면 페이지네이션이 정확하지 않다.

예를 들어 public 목록 첫 페이지 20개 중 현재 광고주의 캠페인이 1개만 있으면, 실제 내 캠페인이 더 있어도 프론트 화면에는 1개만 있는 것처럼 보일 수 있다.

상태 필터도 같은 문제가 있다. 서버가 전체 캠페인 기준으로 먼저 페이지를 자르고, 프론트가 그 뒤에 내 캠페인만 거르면 `모집 중`, `진행 중`, `완료` 필터 결과와 카운트가 실제 내 캠페인 기준과 달라질 수 있다.

### 요청

광고주 본인 캠페인 목록 API를 추가한다.

제안 엔드포인트:

```http
GET /api/v1/advertiser/campaigns
```

또는:

```http
GET /api/v1/campaigns/me
```

권장 쿼리:

```http
GET /api/v1/advertiser/campaigns?page=0&size=20&sort=campaignId,desc&status=RECRUITING&q=브랜드명
```

쿼리 파라미터:

```ts
type AdvertiserCampaignListQuery = {
  page?: number;
  size?: number;
  sort?: string;
  status?: "RECRUITING" | "CLOSED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
  q?: string;
};
```

제안 응답:

```ts
type AdvertiserCampaignResponse = {
  campaignId: number;
  advertiserId: number;
  title: string;
  thumbnailUrl?: string | null;
  rewardPoint: number;
  guidelines: Record<string, unknown>;
  deadline: string;
  totalSlots: number;
  remainingSlots: number;
  applicantCount: number;
  pendingApplicantCount: number;
  acceptedApplicantCount: number;
  rejectedApplicantCount: number;
  status: "RECRUITING" | "CLOSED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
  createdAt: string;
  updatedAt: string;
};
```

지원자 카운트 기준:

- `applicantCount`: 해당 캠페인에 신청한 전체 지원자 수
- `pendingApplicantCount`: 심사 대기 지원자 수
- `acceptedApplicantCount`: 광고주가 승인한 지원자 수
- `rejectedApplicantCount`: 거절된 지원자 수

현재 프론트는 대시보드 캠페인 목록에서 `applicantCount`를 합산해 `총 지원자`를 표시하려고 한다.
하지만 현재 `GET /api/v1/campaigns` 응답은 `Campaign` 엔티티 기반이라 `applicantCount`가 포함되지 않는다.
그 결과 프론트 어댑터에서 기본값 `0`으로 처리되어, 실제 신청자가 있어도 대시보드 요약 카드의 총 지원자가 `0명`으로 표시될 수 있다.

캠페인 상세/지원자 관리 화면은 `GET /api/v1/applications/campaign/{campaignId}`로 실제 지원자 목록을 조회할 수 있다.
다만 캠페인 목록에서 모든 캠페인의 지원자 수를 표시하기 위해 캠페인마다 지원자 API를 반복 호출하면 N+1 호출이 발생하므로, 목록/요약 화면에 필요한 카운트는 광고주 캠페인 목록 DTO에 포함하는 것이 좋다.

권한:

- JWT 광고주 ID 기준으로 `campaign.advertiserId`가 일치하는 캠페인만 반환한다.
- 다른 광고주의 캠페인은 응답에 포함하지 않는다.
- 광고주 권한이 아니면 403을 반환한다.

권장 구현:

```java
Long advertiserId = (Long) SecurityContextHolder.getContext()
    .getAuthentication().getPrincipal();

Page<Campaign> campaigns = campaignRepository.findByAdvertiserId(advertiserId, pageable);
```

상태 필터가 있으면 `findByAdvertiserIdAndStatus(...)` 또는 Specification/Querydsl 방식으로 처리한다.

### 프론트 영향

- 대시보드 홈의 캠페인 관리 패널과 `/dashboard/campaigns` 목록에서 public 목록 후처리 필터를 제거할 수 있다.
- 내 캠페인 목록의 페이지네이션, 검색, 상태 필터가 정확해진다.
- 다른 광고주의 캠페인이 대시보드에 노출되는 문제를 원천적으로 막을 수 있다.

## P2. 캠페인 수정 API

### 배경

현재 `BE_src` 기준으로 캠페인 생성 API는 있지만, 생성된 캠페인의 제목, 대표 이미지, 미션 가이드, 마감일 등을 수정하는 API는 없다.

대시보드에서는 광고주가 캠페인 생성 후 오타나 가이드 문구를 수정해야 하는 경우가 있다. 특히 모집 시작 직후에는 아직 지원자/선정자가 없을 수 있으므로, 안전한 범위에서 캠페인 정보를 수정할 수 있는 API가 필요하다.

현재 제공되는 캠페인 상태 변경 API는 아래처럼 운영 상태 전환만 담당한다.

```http
PATCH /api/v1/campaigns/{campaignId}/close
PATCH /api/v1/campaigns/{campaignId}/proceed
PATCH /api/v1/campaigns/{campaignId}/cancel
```

프론트 `packages/api`에는 과거 잔재로 보이는 `PATCH /api/v1/campaigns/{campaignId}/status` 호출 함수가 남아있지만, 현재 `BE_src`에는 해당 엔드포인트가 없다. 캠페인 내용 수정과 상태 변경은 별도 계약으로 분리하는 것이 좋다.

### 요청

광고주 본인 캠페인을 수정하는 API를 추가한다.

제안 엔드포인트:

```http
PATCH /api/v1/campaigns/{campaignId}
Authorization: Bearer {token}
Content-Type: application/json
```

제안 요청:

```ts
type CampaignUpdateRequest = {
  title?: string;
  thumbnailUrl?: string | null;
  guidelines?: Record<string, unknown>;
  deadline?: string;
};
```

선택 정책:

- `rewardPoint`, `totalSlots`는 예산 잠금과 직접 연결되므로 1차 버전에서는 수정 불가로 둔다.
- 꼭 수정이 필요하다면 별도 예산 재계산/추가 잠금/환불 정책을 정의한 후 추가한다.

제안 응답:

```ts
type CampaignUpdateResponse = {
  campaignId: number;
  advertiserId: number;
  title: string;
  thumbnailUrl?: string | null;
  rewardPoint: number;
  guidelines: Record<string, unknown>;
  deadline: string;
  totalSlots: number;
  remainingSlots: number;
  status: "RECRUITING" | "CLOSED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
  createdAt: string;
  updatedAt: string;
};
```

### 권한 및 상태 정책

- JWT 광고주 ID가 `campaign.advertiserId`와 일치해야 한다.
- 일치하지 않으면 403을 반환한다.
- 1차 버전에서는 `RECRUITING` 상태에서만 수정 가능하게 제한한다.
- `CLOSED`, `IN_PROGRESS`, `COMPLETED`, `CANCELLED` 상태에서는 400 또는 409로 명확한 메시지를 반환한다.
- `deadline`은 현재 시각 이후만 허용한다.
- `guidelines`는 캠페인 생성 API와 동일한 JSON 계약을 사용한다.

예시 실패 응답:

```json
{
  "success": false,
  "message": "모집 중인 캠페인만 수정할 수 있습니다.",
  "data": {},
  "timestamp": "2026-06-23T10:00:00"
}
```

### 프론트 영향

- `/dashboard/campaigns/{campaignId}` 또는 별도 수정 페이지에서 캠페인 기본 정보를 수정할 수 있다.
- 수정 가능 상태가 아니면 수정 버튼을 숨기거나 비활성화할 수 있다.
- 대표 이미지 업로드 API가 추가되면 `thumbnailUrl`에는 업로드 후 받은 URL을 전달한다.
- Tiptap 가이드라인 JSON을 생성 API와 동일한 형식으로 전달한다.

## 확인된 백엔드 현재 동작

- 캠페인 생성 시 총 예산이 먼저 잠긴다.
- 지원자 승인 시 선택된 블로거 기준 에스크로와 미션이 생성된다.
- 캠페인 수정 API는 아직 없다.
- 대표 이미지 파일 업로드 API는 아직 없다.
- 지원자, 미션, 에스크로 응답에는 화면용 조인 표시 필드가 아직 부족하다.
