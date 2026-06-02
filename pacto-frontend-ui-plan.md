# Pacto 프론트엔드 UI/UX 설계 계획

## 1. 문서 목적

이 문서는 Pacto의 8주 MVP를 위한 프론트엔드 설계 방향을 정리한다.

Pacto는 광고주, 광고 대행사, 블로거를 연결하는 B2B2C 에스크로 정산 플랫폼이다. 핵심은 단순히 캠페인을 매칭하는 것이 아니라, 광고주가 캠페인 예산을 안전하게 예치하고, 블로거가 미션 조건을 충족했을 때 Pacto가 정산을 실행하는 거래 흐름을 만드는 것이다.

프론트엔드 관점에서는 세 가지 사용자 경험이 필요하다.

1. 블로거용 B2C 모바일 경험
2. 광고 대행사용 B2B 관리자 경험
3. 광고주용 결제 및 리포트 경험

하지만 8주라는 타이트한 일정과 프론트엔드 개발자 1명이라는 현실을 고려하면, 실제 구현 프로젝트는 2개로 압축하는 것이 맞다.

```txt
apps/blogger
apps/dashboard
```

광고주용 화면은 MVP 단계에서 별도 웹사이트로 만들지 않는다. B2B 대시보드 안에서 제한된 권한 화면으로 처리하고, 필요한 경우 결제 링크 화면만 별도로 제공한다.

---

## 2. 제품 핵심 흐름

Pacto의 핵심 거래 흐름은 다음과 같다.

```txt
광고주가 예산을 예치한다
-> 대행사가 캠페인을 등록한다
-> 블로거가 캠페인에 지원한다
-> 대행사가 지원자를 승인한다
-> 블로거가 미션을 수행한다
-> 대행사가 미션을 검수한다
-> 조건 충족 시 에스크로 정산이 실행된다
-> 블로거가 정산금을 출금한다
```

따라서 모든 주요 프론트엔드 화면은 현재 거래 상태를 명확하게 보여줘야 한다.

- 캠페인 상태
- 지원 상태
- 미션 상태
- 검수 상태
- 에스크로 상태
- 출금 상태

Pacto의 신뢰감은 화려한 UI에서 나오지 않는다. 돈이 어디에 있는지, 누가 다음 행동을 해야 하는지, 어떤 조건이 충족되어야 정산되는지가 명확하게 보이는 화면에서 나온다.

---

## 3. 프론트엔드 아키텍처

## 3.1 권장 프로젝트 구조

```txt
apps/
  blogger/
    # 블로거용 B2C 모바일 웹/PWA

  dashboard/
    # 대행사, 광고주, 내부 운영자용 B2B 대시보드

packages/
  ui/
    # 공통 UI 컴포넌트

  api/
    # API 클라이언트, mock adapter, Swagger 연동 계층

  types/
    # 공통 프론트엔드 타입

  utils/
    # 날짜, 금액, 상태값 포맷터
```

## 3.2 개발 전략

Swagger와 백엔드 API가 확정되기 전까지는 mock-first 방식으로 개발한다.

```txt
1. 라우트와 화면을 먼저 만든다.
2. mock data로 사용자 플로우를 검증한다.
3. 프론트엔드 도메인 타입을 먼저 안정화한다.
4. Swagger가 준비되면 mock adapter를 실제 API adapter로 교체한다.
5. 실제 API를 연결한다.
```

이 방식은 백엔드 스펙이 바뀌는 중에도 프론트엔드 개발을 멈추지 않게 해준다.

---

## 4. 사용자 역할

| 역할            | 설명                                                   | 주요 화면             |
| --------------- | ------------------------------------------------------ | --------------------- |
| Blogger         | 캠페인에 지원하고, 미션을 제출하고, 정산을 받는 사용자 | Blogger App           |
| Agency Admin    | 대행사 전체 캠페인 운영 권한을 가진 관리자             | Dashboard             |
| Agency Operator | 실무 캠페인 운영자                                     | Dashboard             |
| Advertiser      | 캠페인 예산을 결제하고 결과를 확인하는 광고주          | 제한된 Dashboard View |
| Pacto Admin     | Pacto 내부 운영자, MVP 이후 확장 가능                  | Dashboard             |

---

## 5. 앱별 설계

## 5.1 Blogger App

### 목적

Blogger App은 블로거가 캠페인을 탐색하고, 빠르게 지원하고, 미션 결과를 제출하고, 검수 상태와 정산금을 확인할 수 있게 하는 앱이다.

블로거는 대부분 스마트폰으로 접속할 가능성이 높으므로, 이 앱은 철저하게 모바일 우선으로 설계한다.

### 주요 흐름

```txt
로그인
-> 캠페인 목록
-> 캠페인 상세
-> 캠페인 지원
-> 내 미션
-> 미션 제출 URL 등록
-> 검수 상태 확인
-> 지갑
-> 출금 신청
```

### 라우트

```txt
/blogger/login
/blogger/campaigns
/blogger/campaigns/:id
/blogger/missions
/blogger/missions/:id
/blogger/wallet
/blogger/withdrawals
/blogger/profile
```

### 핵심 UI

- 캠페인 카드
- 캠페인 상세 정보
- 보상 금액
- 모집 인원과 남은 슬롯
- 마감 상태
- 선착순 지원 버튼
- 내 미션 상태
- 제출 URL 입력
- 검수 결과
- 지갑 잔액
- 출금 신청 폼

### 주요 상태

```txt
Campaign:
draft
open
full
closed
completed
cancelled

Application:
pending
approved
rejected
cancelled

Mission:
not_started
in_progress
submitted
approved
rejected

Settlement:
locked
ready
paid
cancelled
```

---

## 5.2 B2B Dashboard

### 목적

B2B Dashboard는 대행사가 캠페인을 등록하고, 지원자를 관리하고, 미션을 검수하고, 에스크로 정산 상태를 추적할 수 있게 하는 업무용 화면이다.

이 화면은 PC 우선으로 설계한다. 업무 도구에 가깝기 때문에 정보 밀도, 테이블, 필터, 상태 배지, 빠른 처리 흐름이 중요하다.

### 주요 흐름

```txt
로그인
-> 역할 확인
-> 대시보드 홈
-> 캠페인 목록
-> 캠페인 등록
-> 지원자 관리
-> 블로거 승인
-> 미션 제출물 검수
-> 정산 상태 확인
-> 리포트 확인
```

### 라우트

```txt
/dashboard/login
/dashboard
/dashboard/campaigns
/dashboard/campaigns/new
/dashboard/campaigns/:id
/dashboard/campaigns/:id/applicants
/dashboard/campaigns/:id/missions
/dashboard/escrow
/dashboard/payments
/dashboard/reports
/dashboard/settings
```

### 핵심 UI

- 사이드바
- 상단 헤더
- 캠페인 테이블
- 캠페인 등록 폼
- 지원자 테이블
- 검색, 필터, 정렬
- 승인/반려 액션
- 미션 검수 패널
- 에스크로 상태 배지
- 정산 원장 테이블

---

## 5.3 광고주 View

### MVP 전략

MVP 단계에서는 광고주에게 완전한 캠페인 생성 기능을 제공하지 않는다.

초기에는 블로그라이프 같은 대행사가 광고주를 영업하고 캠페인을 대신 운영할 가능성이 높다. 따라서 광고주용 프론트엔드는 결제와 간단한 리포트 중심으로 최소화한다.

### MVP 라우트

```txt
/advertiser/pay/:campaignId
/advertiser/reports/:campaignId
```

또는 대시보드 내부에서 다음처럼 처리한다.

```txt
/dashboard/payment-link
/dashboard/my-campaigns/:id/report
```

### 핵심 UI

- 결제 금액 확인
- PortOne 결제 버튼
- 에스크로 예치 상태
- 캠페인 진행률
- 간단 성과 리포트
- 캠페인 결과 요약

### MVP 제외 항목

- 광고주 직접 캠페인 생성
- 광고주 직접 가이드라인 설정
- 고급 분석 대시보드
- 광고주용 별도 웹사이트

---

## 6. RBAC 설계

B2B Dashboard는 하나의 프론트엔드 프로젝트로 만든다. 로그인한 사용자의 역할에 따라 메뉴와 접근 가능한 라우트를 다르게 보여준다.

| 기능        | Agency Admin | Agency Operator | Advertiser | Pacto Admin |
| ----------- | ------------ | --------------- | ---------- | ----------- |
| 캠페인 목록 | 가능         | 가능            | 제한       | 가능        |
| 캠페인 생성 | 가능         | 가능            | 불가       | 가능        |
| 지원자 관리 | 가능         | 가능            | 불가       | 가능        |
| 미션 검수   | 가능         | 가능            | 제한       | 가능        |
| 결제        | 제한         | 불가            | 가능       | 가능        |
| 정산 확인   | 가능         | 제한            | 제한       | 가능        |
| 리포트      | 가능         | 가능            | 가능       | 가능        |
| 시스템 설정 | 가능         | 불가            | 불가       | 가능        |

### 메뉴 예시

대행사:

```txt
대시보드
캠페인
지원자
미션 검수
정산
리포트
```

광고주:

```txt
결제
내 캠페인
리포트
```

Pacto 내부 운영자:

```txt
전체 캠페인
사용자
결제
정산
운영 로그
```

---

## 7. MVP 우선순위

## 7.1 반드시 필요한 기능

```txt
회원가입/로그인
역할 기반 진입 분기
블로거 캠페인 목록
블로거 캠페인 상세
블로거 캠페인 지원
블로거 내 미션 목록
블로거 미션 제출
블로거 지갑 잔액 확인
블로거 출금 신청

대행사 캠페인 목록
대행사 캠페인 등록
대행사 지원자 목록
대행사 지원자 승인/반려
대행사 미션 검수
대행사 정산 상태 확인

광고주 결제 링크
광고주 간단 리포트
```

## 7.2 가능하면 포함할 기능

```txt
캠페인 필터 고도화
지원자 상세 프로필
미션 검수 히스토리
정산 로그 상세
알림 UI
기본 통계 카드
```

## 7.3 MVP 이후로 미룰 기능

```txt
3D 상권 트래픽 맵
고급 통계 대시보드
AI 초안 어시스턴트
WebSocket 실시간 알림
Kafka 기반 이벤트 UI
Elasticsearch 기반 고급 검색
광고주 직접 캠페인 생성
복잡한 조직/권한 관리
```

---

## 8. 8주 프론트엔드 개발 계획

## 1주차: 기반 세팅

```txt
- 프론트엔드 기술 스택 확정
- apps/blogger 생성
- apps/dashboard 생성
- 공통 UI 패키지 구성
- 공통 프론트엔드 타입 정의
- mock data 작성
- 라우팅 구조 작성
```

## 2주차: 블로거 캠페인 탐색

```txt
- 모바일 레이아웃
- 하단 내비게이션
- 캠페인 목록
- 캠페인 상세
- 캠페인 지원 버튼
- 선착순/마감/모집 완료 상태 UI
```

## 3주차: 블로거 미션과 지갑

```txt
- 내 미션 목록
- 미션 상세
- 제출 URL 입력
- 제출 상태 표시
- 지갑 잔액
- 출금 신청 화면
```

## 4주차: B2B 대시보드 기반

```txt
- 대시보드 레이아웃
- 사이드바
- 캠페인 목록
- 캠페인 상세
- 캠페인 등록 폼
- 역할별 메뉴 노출
```

## 5주차: 지원자와 미션 관리

```txt
- 지원자 목록
- 지원자 필터
- 승인/반려 액션
- 미션 제출물 목록
- 미션 검수 상세
- 미션 승인/반려 액션
```

## 6주차: 결제와 리포트

```txt
- 광고주 결제 링크 화면
- PortOne 연동 자리 구성
- 결제 성공/실패 화면
- 간단 성과 리포트
- 에스크로 상태 표시
```

## 7주차: API 연동

```txt
- Swagger 기반 API client 구성
- mock adapter 단계적 제거
- 로그인 API 연동
- 캠페인 API 연동
- 미션 API 연동
- 지갑/정산 API 연동
- 에러/로딩/빈 상태 처리
```

## 8주차: QA와 출시 준비

```txt
- 모바일 반응형 QA
- 역할별 메뉴 QA
- 주요 플로우 E2E QA
- 결제 플로우 QA
- 상태값 표시 QA
- 데모 계정 구성
- MVP 배포
```

---

## 9. 공통 컴포넌트 설계

## 9.1 UI 컴포넌트

```txt
Button
IconButton
Input
Textarea
Select
Checkbox
Switch
Modal
Drawer
Tabs
Badge
Toast
Table
Pagination
DatePicker
EmptyState
LoadingState
ErrorState
```

## 9.2 도메인 컴포넌트

```txt
CampaignCard
CampaignStatusBadge
CampaignSummary
ApplicationStatusBadge
MissionStatusBadge
SettlementStatusBadge
WalletBalance
WithdrawalForm
ApplicantTable
MissionReviewPanel
EscrowLedgerTable
PaymentSummary
ReportSummary
```

---

## 10. 프론트엔드 데이터 모델 초안

핵심 프론트엔드 타입은 다음과 같다.

```txt
User
Role
Campaign
Application
Mission
Wallet
Payment
EscrowLedger
Withdrawal
Report
```

### Campaign

```txt
id
title
brandName
agencyId
advertiserId
rewardAmount
recruitCount
approvedCount
deadline
status
guidelines
createdAt
updatedAt
```

### Mission

```txt
id
campaignId
bloggerId
submissionUrl
status
reviewComment
submittedAt
reviewedAt
```

### Wallet

```txt
id
userId
availableBalance
lockedBalance
totalEarned
updatedAt
```

### EscrowLedger

```txt
id
campaignId
fromUserId
toUserId
amount
feeAmount
status
reason
createdAt
```

---

## 11. API 연동 원칙

Swagger를 API 계약의 Single Source of Truth로 둔다.

성공 응답은 다음 형태를 기준으로 한다.

```json
{
  "success": true,
  "message": "요청 성공",
  "data": {},
  "timestamp": "2026-05-19T16:00:00"
}
```

실패 응답은 다음 형태를 기준으로 한다.

```json
{
  "success": false,
  "message": "요청 실패",
  "data": null,
  "timestamp": "2026-05-19T16:00:00"
}
```

프론트엔드는 다음 원칙을 따른다.

```txt
- API client는 packages/api에 모은다.
- 화면 컴포넌트에서 fetch를 직접 호출하지 않는다.
- Swagger 변경 시 타입과 adapter를 먼저 수정한다.
- mock data와 실제 API 응답 구조를 최대한 맞춘다.
- 에러는 공통 Toast 또는 Inline Alert로 처리한다.
```

---

## 12. UX 원칙

## 12.1 Blogger App

```txt
- 모바일에서 한 손으로 사용하기 쉬워야 한다.
- 보상 금액, 모집 인원, 마감일이 즉시 보여야 한다.
- 캠페인 지원 버튼은 빠르고 명확해야 한다.
- 미션 상태와 정산 상태가 헷갈리면 안 된다.
- 출금 가능 금액과 잠긴 금액을 시각적으로 분리한다.
```

## 12.2 B2B Dashboard

```txt
- 대시보드는 업무용 도구처럼 조용하고 밀도 있게 설계한다.
- 테이블, 필터, 상태 배지를 핵심 UI 패턴으로 사용한다.
- 캠페인 운영자가 매일 반복해서 쓰는 화면이라는 전제로 만든다.
- 승인/반려 같은 액션은 명확한 확인 절차를 둔다.
- 광고주 계정에는 불필요한 대행사 메뉴를 보여주지 않는다.
```

## 12.3 Advertiser View

```txt
- 결제 금액과 캠페인 목적이 명확해야 한다.
- 결제 후 에스크로 예치 상태를 즉시 보여준다.
- 리포트는 복잡한 테이블보다 진행률과 결과 중심으로 보여준다.
```

---

## 13. 리스크와 대응

## 13.1 프론트엔드 범위 과확장

리스크:

```txt
- 사용자 유형이 3개라 화면 수가 쉽게 늘어날 수 있다.
- 광고주용 별도 웹사이트까지 만들면 8주 MVP 일정이 깨질 수 있다.
```

대응:

```txt
- 프론트엔드 프로젝트는 2개만 유지한다.
- 광고주는 제한된 대시보드 권한으로 처리한다.
- 광고주 직접 캠페인 생성은 MVP에서 제외한다.
```

## 13.2 API 계약 변경

리스크:

```txt
- ERD, API 필드, 프론트 필드명이 서로 어긋날 수 있다.
- Swagger 확정 전까지 프론트 개발이 막힐 수 있다.
```

대응:

```txt
- mock-first 방식으로 화면을 먼저 구현한다.
- 프론트엔드 도메인 타입은 packages/types에 둔다.
- 서버 응답은 API adapter에서 프론트 타입으로 변환한다.
```

## 13.3 결제와 정산 상태 혼란

리스크:

```txt
- 결제 성공 후 지갑 반영이 누락될 수 있다.
- 미션 승인 상태와 정산 상태가 불일치할 수 있다.
- 출금 가능 금액과 잠긴 금액이 혼동될 수 있다.
```

대응:

```txt
- Wallet, Escrow, Settlement를 별도 개념으로 표시한다.
- 금액 UI에서는 available과 locked를 항상 분리한다.
- 정산 관련 화면에는 상태 변경 로그를 보여준다.
```

---

## 14. 최종 구현 방향

Pacto 프론트엔드는 다음 방향으로 구현한다.

```txt
B2C Blogger App:
모바일 우선 캠페인 탐색, 지원, 미션 제출, 지갑, 출금

B2B Dashboard:
대행사 중심 캠페인 운영, 지원자 관리, 미션 검수, 정산 추적

Advertiser View:
별도 앱이 아니라 제한된 결제 링크와 간단 리포트
```

8주 MVP의 목표는 다음이다.

```txt
광고주가 돈을 예치하고
대행사가 캠페인을 운영하고
블로거가 미션을 수행하고
Pacto가 검수 후 정산을 실행하는 흐름을
처음부터 끝까지 시연 가능하게 만드는 것
```

MVP에서는 고급 기능보다 거래 흐름의 명확성이 더 중요하다.

```txt
첫째, 돈의 흐름을 안전하게 보여준다.
둘째, 캠페인 운영을 관리 가능하게 만든다.
셋째, 분석과 자동화는 이후에 붙인다.
```
