# Pacto API Strategy

## 1. 문서 목적

이 문서는 `swagger-openapi.json` 기준으로 Pacto MVP 프론트엔드의 API 연동 전략을 정의한다.

목표는 다음과 같다.

```txt
실제 백엔드 Swagger 계약을 기준으로 프론트 API 계층을 설계한다.
Swagger 응답이 아직 느슨한 API는 adapter와 mock data로 보완한다.
화면 컴포넌트가 API 응답 구조에 직접 의존하지 않게 한다.
추후 Swagger 변경 시 service와 adapter만 수정하면 되게 한다.
```

---

## 2. Swagger 기준 요약

현재 Swagger는 OpenAPI 3.1.0 형식이며 서버 기본 URL은 다음과 같다.

```txt
http://localhost:8080
```

전역 인증 방식은 JWT Bearer Token이다.

```txt
Authorization: Bearer {accessToken}
```

현재 Swagger에 정의된 주요 API 그룹은 다음과 같다.

```txt
auth
campaign
mission
wallet
escrow
```

아직 별도의 `payment` API는 Swagger에 명확히 분리되어 있지 않다. 광고주 결제 링크와 PortOne 결제 연동은 추후 Swagger가 추가될 때 별도 service로 분리한다.

---

## 3. 실제 API 목록

## 3.1 Auth

| Method | Path                  | operationId | 용도              |
| ------ | --------------------- | ----------- | ----------------- |
| POST   | `/api/v1/auth/signup` | `signup`    | 회원가입          |
| POST   | `/api/v1/auth/login`  | `login`     | 로그인            |
| GET    | `/api/v1/auth/me`     | `me`        | 내 계정 정보 조회 |

로그인 응답은 `CommonResponseLoginResponse` 형태이며, `data.accessToken`을 반환한다.

```txt
response.data.accessToken
```

`me` 응답은 `CommonResponseMeResponse` 형태이며, `data.userId`, `data.email`, `data.role`을 반환한다.

---

## 3.2 Campaign

| Method | Path                                      | operationId            | 용도                  |
| ------ | ----------------------------------------- | ---------------------- | --------------------- |
| GET    | `/api/v1/campaigns`                       | `getCampaigns`         | 캠페인 목록 조회      |
| POST   | `/api/v1/campaigns`                       | `createCampaign`       | 캠페인 생성           |
| GET    | `/api/v1/campaigns/{campaignId}`          | `getCampaign`          | 캠페인 상세 조회      |
| PATCH  | `/api/v1/campaigns/{campaignId}/status`   | `updateCampaignStatus` | 캠페인 상태 변경      |
| POST   | `/api/v1/campaigns/{campaignId}/missions` | `acceptMission`        | 캠페인 미션 수락/참여 |

캠페인 목록의 query parameter:

```txt
status: RECRUITING | IN_PROGRESS | COMPLETED
pageable: Pageable
```

캠페인 생성 요청 `CampaignRequestDto`:

```txt
advertiserId
title
thumbnailUrl
rewardPoint
guidelines
deadline
```

주의:

```txt
getCampaigns, createCampaign, getCampaign 응답 schema가 현재 type: object로 되어 있다.
프론트에서는 mock data와 adapter를 통해 Campaign 타입을 먼저 고정한다.
Swagger가 더 구체화되면 adapter만 실제 응답에 맞게 수정한다.
```

---

## 3.3 Mission

| Method | Path                                   | operationId      | 용도                |
| ------ | -------------------------------------- | ---------------- | ------------------- |
| GET    | `/api/v1/missions/me`                  | `getMyMissions`  | 내 미션 목록 조회   |
| PATCH  | `/api/v1/missions/{missionId}/submit`  | `submitMission`  | 미션 제출           |
| PATCH  | `/api/v1/missions/{missionId}/approve` | `approveMission` | 미션 승인           |
| PATCH  | `/api/v1/missions/{missionId}/cancel`  | `cancelMission`  | 미션 취소 또는 반려 |

`getMyMissions` query parameter:

```txt
bloggerId?: number
status?: IN_PROGRESS | SUBMITTED | APPROVED | REJECTED
```

`MissionRequestDto`:

```txt
submittedUrl
reason
```

주의:

```txt
submitMission과 cancelMission이 같은 MissionRequestDto를 사용한다.
submitMission에서는 submittedUrl을 사용한다.
cancelMission에서는 reason을 사용한다.
approveMission은 request body 없이 missionId만 받는다.
```

---

## 3.4 Wallet

| Method | Path                           | operationId       | 용도                  |
| ------ | ------------------------------ | ----------------- | --------------------- |
| GET    | `/api/v1/wallets/me`           | `getMyWallet`     | 내 지갑 조회          |
| GET    | `/api/v1/wallets/me/histories` | `getMyHistories`  | 포인트 변경 내역 조회 |
| POST   | `/api/v1/wallets/withdraw`     | `requestWithdraw` | 출금 신청             |

`WalletResponse`:

```txt
walletId
balance
lockedBalance
updatedAt
```

프론트 타입 매핑:

```txt
balance -> availableBalance
lockedBalance -> lockedBalance
```

`WithdrawRequest`:

```txt
amount
bankName
accountNumber
```

`WithdrawResponse`:

```txt
withdrawalId
requestedAmount
remainingBalance
status: PENDING | COMPLETED | REJECTED
```

주의:

```txt
현재 WithdrawResponse status는 PENDING, COMPLETED, REJECTED이다.
프론트 status-policy.md의 withdrawal 상태와 맞추기 위해 adapter에서 매핑한다.
```

---

## 3.5 Escrow

| Method | Path              | operationId    | 용도                  |
| ------ | ----------------- | -------------- | --------------------- |
| GET    | `/api/v1/escrows` | `getMyEscrows` | 내 에스크로 내역 조회 |

query parameter:

```txt
status?: LOCKED | RELEASED | CANCELED
page?: number
size?: number
```

`EscrowLedgerResponse`:

```txt
escrowId
campaignId
amount
status: LOCKED | RELEASED | CANCELED
createdAt
```

프론트 타입 매핑:

```txt
LOCKED -> locked
RELEASED -> paid
CANCELED -> cancelled
```

---

## 4. 권장 패키지 구조

```txt
packages/
  api/
    client/
      http-client.ts
      api-error.ts
      auth-token.ts
    adapters/
      auth-adapter.ts
      campaign-adapter.ts
      mission-adapter.ts
      wallet-adapter.ts
      escrow-adapter.ts
    mocks/
      auth.mock.ts
      campaign.mock.ts
      mission.mock.ts
      wallet.mock.ts
      escrow.mock.ts
    services/
      auth-service.ts
      campaign-service.ts
      mission-service.ts
      wallet-service.ts
      escrow-service.ts

  types/
    user.ts
    campaign.ts
    mission.ts
    wallet.ts
    escrow.ts
```

`payment-service.ts`는 아직 Swagger에 결제 API가 없으므로 MVP 초기 구조에서는 만들지 않는다. 광고주 결제 화면은 mock 또는 외부 SDK placeholder로 처리하고, Swagger 추가 후 분리한다.

---

## 5. 응답 형식 처리

현재 Swagger에는 두 종류의 응답이 섞여 있다.

## 5.1 CommonResponse 계열

Auth API는 공통 응답 구조를 사용한다.

```json
{
  "success": true,
  "message": "요청 성공",
  "data": {},
  "timestamp": "2026-05-19T16:00:00"
}
```

적용 API:

```txt
POST /api/v1/auth/signup
POST /api/v1/auth/login
GET /api/v1/auth/me
```

## 5.2 Direct Response 계열

Wallet, Escrow 일부 API는 `WalletResponse`, `WithdrawResponse`, `EscrowLedgerResponse`를 직접 반환한다.

적용 API:

```txt
GET /api/v1/wallets/me
GET /api/v1/wallets/me/histories
POST /api/v1/wallets/withdraw
GET /api/v1/escrows
```

## 5.3 Object Response 계열

Campaign, Mission 일부 API는 Swagger schema가 아직 `type: object`로만 정의되어 있다.

적용 API:

```txt
GET /api/v1/campaigns
POST /api/v1/campaigns
GET /api/v1/campaigns/{campaignId}
PATCH /api/v1/campaigns/{campaignId}/status
POST /api/v1/campaigns/{campaignId}/missions
GET /api/v1/missions/me
PATCH /api/v1/missions/{missionId}/submit
PATCH /api/v1/missions/{missionId}/approve
PATCH /api/v1/missions/{missionId}/cancel
```

전략:

```txt
Object Response API는 mock data를 기준으로 프론트 타입을 먼저 정의한다.
실제 응답을 확인한 뒤 adapter에서 변환 규칙을 확정한다.
화면 컴포넌트는 object 원본에 직접 접근하지 않는다.
```

---

## 6. Service 설계

## 6.1 auth-service

```txt
signup(payload)
login(payload)
getMe()
```

반환 타입:

```txt
login -> { accessToken }
getMe -> User
```

## 6.2 campaign-service

```txt
getCampaigns(params)
getCampaignDetail(campaignId)
createCampaign(payload)
updateCampaignStatus(campaignId, status)
acceptMission(campaignId, bloggerId)
```

주의:

```txt
acceptMission은 path의 campaignId와 query의 bloggerId를 함께 보낸다.
추후 JWT 기반으로 bloggerId를 제거할 수 있는지 백엔드와 확인이 필요하다.
```

## 6.3 mission-service

```txt
getMyMissions(params)
submitMission(missionId, payload)
approveMission(missionId)
cancelMission(missionId, payload)
```

## 6.4 wallet-service

```txt
getMyWallet()
getMyPointHistories(params)
requestWithdraw(payload)
```

## 6.5 escrow-service

```txt
getMyEscrows(params)
```

---

## 7. Adapter 매핑 기준

## 7.1 User

Swagger `MeResponse`:

```txt
userId
email
role
```

프론트 `User`:

```txt
id
email
role
```

매핑:

```txt
userId -> id
```

## 7.2 Wallet

Swagger `WalletResponse`:

```txt
walletId
balance
lockedBalance
updatedAt
```

프론트 `Wallet`:

```txt
id
availableBalance
lockedBalance
updatedAt
```

매핑:

```txt
walletId -> id
balance -> availableBalance
```

## 7.3 Escrow

Swagger `EscrowLedgerResponse.status`:

```txt
LOCKED
RELEASED
CANCELED
```

프론트 `SettlementStatus`:

```txt
locked
paid
cancelled
```

매핑:

```txt
LOCKED -> locked
RELEASED -> paid
CANCELED -> cancelled
```

## 7.4 Withdrawal

Swagger `WithdrawResponse.status`:

```txt
PENDING
COMPLETED
REJECTED
```

프론트 `WithdrawalStatus`:

```txt
requested
completed
failed
```

매핑:

```txt
PENDING -> requested
COMPLETED -> completed
REJECTED -> failed
```

---

## 8. 인증 처리

Swagger 전역 security는 `jwtAuth`이며 bearer token 방식이다.

프론트엔드 기준:

```txt
로그인 성공 시 data.accessToken 저장
요청 시 Authorization header 추가
401 발생 시 로그인 화면으로 이동
403 발생 시 권한 없음 화면 표시
GET /api/v1/auth/me로 사용자 role 확인
```

토큰 저장 방식은 구현 시점에 보안 정책을 다시 확정한다.

MVP 기본안:

```txt
브라우저 저장소 사용은 구현 난이도가 낮다.
보안 강화가 필요하면 httpOnly cookie 전략을 백엔드와 협의한다.
```

---

## 9. 에러 처리

API 에러는 공통 `ApiError` 형태로 변환한다.

```txt
message
statusCode
code
details
```

화면별 처리:

```txt
폼 입력 오류: inline error
일시적 요청 실패: toast error
상세/목록 로딩 실패: page error
401: 로그인 이동
403: 권한 없음 화면
404: not-found 화면
```

주의:

```txt
현재 Swagger에는 실패 응답 schema가 상세히 정의되어 있지 않다.
백엔드 실제 에러 응답을 확인한 뒤 ApiError 변환 규칙을 보완한다.
```

---

## 10. Mock-first 전략

Swagger가 존재하더라도 일부 응답 schema가 아직 느슨하므로 mock-first 전략은 유지한다.

진행 순서:

```txt
1. Swagger endpoint와 request body를 기준으로 service 함수를 만든다.
2. Object Response API는 mock response를 먼저 정의한다.
3. adapter에서 mock response를 프론트 타입으로 변환한다.
4. 화면은 service가 반환하는 프론트 타입만 사용한다.
5. 실제 API 연결 후 adapter만 조정한다.
```

mock data는 다음 항목을 반드시 포함한다.

```txt
캠페인 상태별 데이터
미션 상태별 데이터
지갑 available/locked 금액
에스크로 LOCKED/RELEASED/CANCELED 데이터
출금 PENDING/COMPLETED/REJECTED 데이터
```

---

## 11. API 연동 우선순위

실제 Swagger 기준 연동 우선순위는 다음과 같다.

```txt
1. POST /api/v1/auth/login
2. GET /api/v1/auth/me
3. GET /api/v1/campaigns
4. GET /api/v1/campaigns/{campaignId}
5. POST /api/v1/campaigns/{campaignId}/missions
6. GET /api/v1/missions/me
7. PATCH /api/v1/missions/{missionId}/submit
8. GET /api/v1/wallets/me
9. GET /api/v1/wallets/me/histories
10. POST /api/v1/wallets/withdraw
11. POST /api/v1/campaigns
12. PATCH /api/v1/missions/{missionId}/approve
13. PATCH /api/v1/missions/{missionId}/cancel
14. GET /api/v1/escrows
15. PATCH /api/v1/campaigns/{campaignId}/status
```

광고주 결제 링크와 리포트는 현재 Swagger에 명확한 전용 API가 없으므로 mock 기반으로 화면을 먼저 만든 뒤, 결제 관련 Swagger가 추가되면 연동한다.

---

## 12. 백엔드와 확인할 사항

현재 Swagger 기준으로 프론트 개발 전 확인하면 좋은 항목은 다음과 같다.

```txt
Campaign/Mission API의 object 응답 상세 schema
GET /api/v1/campaigns pageable query 전달 방식
POST /api/v1/campaigns/{campaignId}/missions에서 bloggerId query가 필요한 이유
Mission cancel이 반려인지 취소인지 명확한 의미
WithdrawResponse status의 REJECTED를 프론트에서 failed로 봐도 되는지
Escrow RELEASED를 정산 완료 paid로 봐도 되는지
광고주 결제/PortOne 관련 API 추가 예정 여부
리포트 API 추가 예정 여부
실패 응답 공통 schema
role enum 값 목록
```

---

## 13. Swagger 변경 대응

Swagger가 변경되면 다음 순서로 반영한다.

```txt
1. 변경된 endpoint와 request/response 확인
2. packages/types 수정
3. adapter 수정
4. service 수정
5. mock data 업데이트
6. 화면 영향 확인
```

화면 컴포넌트 수정이 반복된다면 API 계층 분리가 부족하다는 신호로 본다.
