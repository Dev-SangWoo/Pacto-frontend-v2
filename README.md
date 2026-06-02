# Pacto Frontend v2

Pacto는 광고주, 광고 대행사, 블로거를 연결하는 B2B2C 에스크로 정산 플랫폼입니다.

이 프론트엔드 프로젝트는 8주 MVP를 가정하고, 세 가지 사용자 경험을 두 개의 앱으로 압축해 설계합니다.

```txt
apps/blogger    # 블로거용 B2C 모바일 웹/PWA
apps/dashboard  # 대행사/광고주용 B2B 대시보드
```

광고주용 전체 서비스는 MVP에서 별도 앱으로 만들지 않고, 결제 링크와 간단 리포트 화면으로 제한합니다.

---

## 핵심 문제

기존 블로그 마케팅 시장에는 다음 문제가 있습니다.

```txt
광고주는 선지급한 예산이 안전하게 사용되는지 알기 어렵다.
블로거는 콘텐츠를 작성하고도 정산 지연이나 누락을 겪을 수 있다.
대행사는 모집, 검수, 정산을 수작업으로 처리해야 한다.
캠페인별 정산 책임과 이력이 불명확하다.
```

Pacto는 에스크로, 지갑, 미션 검수, 조건부 정산 구조로 이 문제를 해결합니다.

---

## MVP 범위

MVP는 다음 흐름을 끝까지 시연 가능하게 만드는 것을 목표로 합니다.

```txt
광고주 예산 예치
-> 대행사 캠페인 등록
-> 블로거 캠페인 지원
-> 대행사 지원자 승인
-> 블로거 미션 제출
-> 대행사 미션 검수
-> 에스크로 정산
-> 블로거 출금 신청
```

상세 MVP 범위는 [프론트엔드 UI/UX 계획](./pacto-frontend-ui-plan.md)의 `7. MVP 우선순위`와 `8. 8주 프론트엔드 개발 계획`을 기준으로 합니다.

---

## 주요 사용자

| 사용자 | 주요 목적 | 화면 |
| --- | --- | --- |
| 블로거 | 캠페인 탐색, 지원, 미션 제출, 정산 확인 | Blogger App |
| 광고 대행사 | 캠페인 등록, 지원자 관리, 미션 검수, 정산 확인 | Dashboard |
| 광고주 | 캠페인 예산 결제, 간단 리포트 확인 | Limited Dashboard View |

---

## 문서

| 문서 | 설명 |
| --- | --- |
| [프론트엔드 UI/UX 계획](./pacto-frontend-ui-plan.md) | 전체 MVP 프론트 전략 |
| [UI/UX 상세 설계](./docs/ui-ux/README.md) | 화면 설계 허브 문서 |
| [Route Map](./docs/ui-ux/route-map.md) | 앱별 라우트와 App Router 구조 |
| [Component Spec](./docs/ui-ux/component-spec.md) | 공통/도메인 컴포넌트 설계 |
| [RBAC Policy](./docs/ui-ux/rbac-policy.md) | 역할 기반 접근 제어 정책 |
| [Status Policy](./docs/ui-ux/status-policy.md) | 상태값과 UI 표시 규칙 |
| [API Strategy](./docs/ui-ux/api-strategy.md) | Swagger 기준 API 연동 전략 |
| [Decision Log](./docs/decision-log.md) | 주요 의사결정 기록 |
| [Git Convention](./docs/git-convention.md) | 브랜치와 작업 흐름 규칙 |
| [Commit Convention](./docs/commit-convention.md) | 커밋 메시지 규칙 |

---

## 기술 스택

| 영역 | 기술 |
| --- | --- |
| Framework | Next.js App Router |
| Language | TypeScript |
| Package Manager | pnpm workspace |
| Styling | Tailwind CSS |
| UI Primitive | Radix UI |
| Icons | lucide-react |
| Server/Client Data | TanStack Query |
| Form | React Hook Form |
| Validation | Zod |
| Mock API | MSW |
| Unit Test | Vitest |
| Component Test | Testing Library |
| E2E Test | Playwright |
| Lint/Format | ESLint, Prettier |
| Git Hooks | Husky, lint-staged, commitlint |
| CI | GitHub Actions |
| Deploy | Vercel |

테스트는 모든 화면에 무리하게 붙이기보다, Pacto의 핵심 도메인 리스크가 있는 영역에 우선 적용합니다.

```txt
상태 매핑
권한 정책
금액 포맷
API adapter
폼 검증 schema
캠페인 지원 버튼 활성화 규칙
미션 제출 버튼 활성화 규칙
지갑 available/locked 표시
```

개발/테스트 기본값은 MSW 기반 mock API로 두고, 실제 API는 별도 모드에서 smoke test로 검증합니다.

---

## API 전략

백엔드 Swagger는 실제 API 계약의 기준으로 사용합니다.

다만 현재 Swagger에는 일부 Campaign/Mission 응답이 `type: object`로 느슨하게 정의되어 있으므로, 프론트엔드는 `mock-first`와 `adapter` 구조를 사용합니다.

```txt
Swagger endpoint 기준으로 service를 만든다.
느슨한 응답은 mock data로 프론트 타입을 먼저 고정한다.
adapter에서 서버 응답을 프론트 타입으로 변환한다.
화면 컴포넌트는 API 원본 응답에 직접 의존하지 않는다.
```

자세한 내용은 [API Strategy](./docs/ui-ux/api-strategy.md)를 참고합니다.

---

## 실행 방법

아직 Next.js 프로젝트 초기화 전입니다.

초기화 후 이 섹션에 설치와 실행 방법을 추가합니다.

```bash
npm install
npm run dev
```

---

## 개발 상태

현재 단계:

```txt
기획 문서 정리
UI/UX 상세 설계
Swagger 기준 API 전략 정리
Git/커밋 컨벤션 정리
```

다음 단계:

```txt
Next.js 프로젝트 초기화
개발 환경 설정
Blogger App 라우팅 구현
Dashboard 라우팅 구현
Mock data 기반 화면 구현
```
