# Pacto UI/UX 상세 설계

## 1. 문서 목적

이 문서는 Pacto MVP 프론트엔드의 UI/UX 상세 설계를 안내하는 상위 문서다.

기능 명세가 “무엇을 만들 것인가”를 설명한다면, UI/UX 상세 설계는 “사용자가 어떤 화면에서 어떤 순서로 행동하고, 화면은 어떤 방식으로 반응해야 하는가”를 설명한다.

세부 내용은 아래 문서로 나누어 관리한다.

```txt
docs/ui-ux/route-map.md
docs/ui-ux/component-spec.md
docs/ui-ux/rbac-policy.md
docs/ui-ux/status-policy.md
docs/ui-ux/api-strategy.md
```

---

## 2. MVP 설계 목표

Pacto MVP의 프론트엔드 목표는 세 가지다.

```txt
1. 블로거가 모바일에서 캠페인을 찾고 미션을 제출할 수 있게 한다.
2. 대행사가 PC 대시보드에서 캠페인과 지원자를 운영할 수 있게 한다.
3. 광고주가 결제와 간단한 성과 확인만 할 수 있게 한다.
```

Pacto는 단순 캠페인 매칭 서비스가 아니라 에스크로 정산 플랫폼이다. 따라서 모든 주요 화면은 다음 질문에 답할 수 있어야 한다.

```txt
지금 캠페인은 어떤 상태인가?
누가 다음 행동을 해야 하는가?
돈은 예치되어 있는가?
미션은 제출되었는가?
검수는 끝났는가?
정산 가능한 상태인가?
출금 가능한 금액은 얼마인가?
```

---

## 3. 설계 원칙

## 3.1 제품 원칙

```txt
상태를 명확하게 보여준다.
다음 행동을 분명하게 보여준다.
금액 정보는 절대 헷갈리지 않게 보여준다.
블로거 앱은 모바일 우선으로 설계한다.
B2B 대시보드는 업무 도구처럼 밀도 있게 설계한다.
광고주 화면은 결제와 결과 확인에 집중한다.
```

## 3.2 MVP 원칙

```txt
광고주 직접 캠페인 생성은 제외한다.
고급 통계와 3D 지도는 제외한다.
실시간 알림은 UI 자리만 고려하고 MVP에서는 polling 또는 정적 상태로 처리한다.
API 확정 전에는 mock data로 화면을 먼저 구현한다.
```

---

## 4. 문서 구성

## 4.1 Route Map

[route-map.md](./route-map.md)

앱별 라우트, 화면 목적, 접근 권한, 레이아웃 그룹을 정의한다. Next.js App Router 구조를 만들 때 기준 문서로 사용한다.

주요 내용:

```txt
Blogger App 라우트
Dashboard 라우트
Advertiser View 라우트
역할별 접근 가능 화면
라우트별 레이아웃 기준
```

## 4.2 Component Spec

[component-spec.md](./component-spec.md)

공통 UI 컴포넌트와 Pacto 도메인 컴포넌트를 정의한다. 화면 구현 시 어떤 컴포넌트를 재사용할지 판단하는 기준 문서로 사용한다.

주요 내용:

```txt
공통 UI 컴포넌트
도메인 컴포넌트
컴포넌트 책임 범위
컴포넌트 네이밍 기준
화면별 사용 컴포넌트
```

## 4.3 RBAC Policy

[rbac-policy.md](./rbac-policy.md)

역할 기반 접근 제어 정책을 정의한다. 대행사, 광고주, 블로거, 내부 운영자의 메뉴 노출과 라우트 접근 기준으로 사용한다.

주요 내용:

```txt
사용자 역할
역할별 메뉴
역할별 라우트 접근
권한 없음 처리
Dashboard 메뉴 노출 규칙
```

## 4.4 Status Policy

[status-policy.md](./status-policy.md)

캠페인, 지원, 미션, 정산, 출금 상태의 표시 규칙을 정의한다. 상태 배지, 버튼 활성화, 다음 액션을 일관되게 만들기 위한 기준 문서다.

주요 내용:

```txt
Campaign 상태
Application 상태
Mission 상태
Settlement 상태
Withdrawal 상태
상태별 배지 문구
상태별 가능한 액션
```

## 4.5 API Strategy

[api-strategy.md](./api-strategy.md)

API 연동 전략을 정의한다. Swagger 확정 전 mock-first 개발, API adapter, 에러 처리, 데이터 변환 기준을 다룬다.

주요 내용:

```txt
mock-first 전략
Swagger 연동 원칙
API client 위치
응답 형식
에러 처리
서버 응답과 프론트 타입 변환
```

---

## 5. 앱 구조 요약

Pacto 프론트엔드는 두 개의 앱으로 구성한다.

```txt
apps/
  blogger/
    # 블로거용 B2C 모바일 웹/PWA

  dashboard/
    # 대행사, 광고주, 내부 운영자용 B2B 대시보드
```

역할별 화면은 다음과 같이 나눈다.

| 사용자       | 앱                  | 설계 방향                                 |
| ------------ | ------------------- | ----------------------------------------- |
| 블로거       | Blogger App         | 모바일 우선, 캠페인 탐색과 미션 제출 중심 |
| 대행사       | Dashboard           | PC 우선, 테이블과 운영 액션 중심          |
| 광고주       | Dashboard 제한 View | 결제 링크와 간단 리포트 중심              |
| Pacto 운영자 | Dashboard           | MVP 이후 확장                             |

---

## 6. 디자인 톤앤매너 요약

## 6.1 Blogger App

```txt
모바일 앱처럼 가볍고 빠른 느낌
보상 금액과 CTA가 명확한 구조
카드는 간결하게
과한 장식보다 정보 우선
```

## 6.2 Dashboard

```txt
업무용 SaaS 도구 같은 차분한 느낌
테이블과 필터 중심
색상은 상태 표현에 우선 사용
넓은 여백보다 정보 밀도 우선
```

## 6.3 Advertiser View

```txt
결제와 결과 확인에 집중
불필요한 메뉴 제거
금액과 캠페인명이 가장 먼저 보이게 구성
```

---

## 7. MVP 제외 UI

다음 화면과 패턴은 MVP에서 제외한다.

```txt
3D 상권 트래픽 지도
고급 통계 차트
광고주 직접 캠페인 등록
복잡한 조직 관리
실시간 채팅
실시간 WebSocket 알림
AI 초안 어시스턴트
고급 검색 DSL
```

MVP에서는 광고 예치부터 블로거 정산까지 이어지는 핵심 거래 흐름을 먼저 완성한다.

---

## 8. 다음 작업

문서 작성 우선순위는 다음과 같다.

```txt
1. route-map.md
2. status-policy.md
3. rbac-policy.md
4. component-spec.md
5. api-strategy.md
```

이후 실제 구현 단계에서는 위 문서를 기준으로 이슈와 기능 브랜치를 생성한다.
