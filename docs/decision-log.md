# Pacto Decision Log

## 1. 문서 목적

이 문서는 Pacto 프론트엔드 프로젝트의 주요 의사결정을 기록한다.

포트폴리오와 실제 개발 양쪽에서 “왜 이렇게 설계했는지”를 설명할 수 있도록, 결정의 배경과 결과를 남긴다.

---

## 2026-06-02: 세 가지 UX를 두 개의 프론트 앱으로 압축

### Context

Pacto에는 세 가지 사용자 경험이 필요하다.

```txt
블로거용 B2C 모바일 경험
광고 대행사용 B2B 관리자 경험
광고주용 결제/리포트 경험
```

하지만 MVP 기간은 8주이고, 프론트엔드 개발자는 1명이다.

### Decision

실제 프론트엔드 프로젝트는 두 개로 구성한다.

```txt
apps/blogger
apps/dashboard
```

광고주 화면은 별도 앱이 아니라 Dashboard 내부 제한 View 또는 외부 결제 링크 화면으로 처리한다.

### Reason

세 개의 별도 앱을 만들면 구현, QA, 유지보수 비용이 과도하게 증가한다.

MVP에서는 광고주가 직접 캠페인을 운영하는 것보다, 대행사가 캠페인을 운영하고 광고주는 결제와 결과 확인만 하는 흐름이 더 현실적이다.

### Consequence

광고주 self-serve 기능은 MVP 이후로 미룬다.  
Dashboard는 RBAC 기반으로 메뉴와 접근 권한을 제어해야 한다.

---

## 2026-06-02: 광고주 기능을 결제 링크와 간단 리포트로 제한

### Context

광고주는 비용을 지불하고 결과를 기다리는 사용자다. 초기 MVP에서는 대행사가 광고주 영업과 캠페인 운영을 담당한다.

### Decision

광고주용 MVP 화면은 다음으로 제한한다.

```txt
결제 링크
결제 상태 확인
간단 성과 리포트
```

광고주 직접 캠페인 생성, 가이드라인 설정, 고급 분석 화면은 제외한다.

### Reason

광고주 기능을 넓히면 대행사용 운영 기능과 블로거용 미션 플로우 구현이 늦어진다.

Pacto MVP의 핵심은 광고주 self-serve가 아니라, 예치금부터 미션 검수 후 정산까지 이어지는 거래 플로우다.

### Consequence

광고주 경험은 단순하지만 명확해야 한다. 결제 금액, 캠페인명, 에스크로 예치 상태, 진행 결과가 즉시 보여야 한다.

---

## 2026-06-02: mock-first API 전략 선택

### Context

백엔드 Swagger가 존재하지만 일부 Campaign/Mission API 응답이 아직 `type: object`로 느슨하게 정의되어 있다.

### Decision

프론트엔드는 mock-first API 전략을 사용한다.

```txt
Swagger endpoint와 request body를 기준으로 service를 만든다.
느슨한 응답은 mock data로 프론트 타입을 먼저 정의한다.
adapter에서 서버 응답을 프론트 타입으로 변환한다.
```

### Reason

Swagger가 완전히 구체화될 때까지 화면 개발을 멈추면 MVP 일정이 밀린다.

adapter를 두면 서버 응답 구조가 바뀌어도 화면 변경을 최소화할 수 있다.

### Consequence

`packages/api`와 `packages/types`를 분리해야 한다.  
화면 컴포넌트는 API 원본 응답에 직접 접근하지 않는다.

---

## 2026-06-02: 지갑과 에스크로 상태를 분리해서 표현

### Context

Pacto는 돈의 흐름을 다루는 서비스다. 사용자가 출금 가능한 금액과 아직 잠긴 금액을 혼동하면 신뢰도가 떨어진다.

### Decision

지갑 화면에서는 다음 금액을 분리해서 보여준다.

```txt
availableBalance: 출금 가능한 금액
lockedBalance: 검수 또는 정산 대기 중인 금액
```

에스크로 상태는 별도 상태 배지와 원장으로 표현한다.

### Reason

돈의 상태가 명확해야 블로거, 대행사, 광고주 모두 거래를 신뢰할 수 있다.

### Consequence

`WalletBalance`, `SettlementStatusBadge`, `EscrowLedgerTable` 같은 도메인 컴포넌트를 분리해서 재사용한다.

---

## 2026-06-02: UI/UX 문서를 세부 문서로 분리

### Context

초기 `ui-ux-spec.md`에 라우트, 컴포넌트, 권한, 상태, API 전략이 모두 들어가면서 문서가 커졌다.

### Decision

UI/UX 문서를 다음 구조로 분리한다.

```txt
docs/ui-ux/README.md
docs/ui-ux/route-map.md
docs/ui-ux/component-spec.md
docs/ui-ux/rbac-policy.md
docs/ui-ux/status-policy.md
docs/ui-ux/api-strategy.md
```

### Reason

각 문서의 책임을 분리하면 나중에 구현 중 필요한 내용을 빠르게 찾을 수 있다.

### Consequence

`docs/ui-ux/README.md`는 허브 문서 역할을 하고, 세부 정책은 각 문서에서 관리한다.
