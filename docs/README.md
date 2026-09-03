# Pacto Documentation

이 디렉터리는 현재 구현을 이해하는 데 필요한 설계 결정과 검증 근거만 보관합니다. 기능 사용법과 실행 방법은 루트 [README](../README.md)를 먼저 확인하세요.

## 제품과 설계

| 문서                                                     | 내용                                          |
| -------------------------------------------------------- | --------------------------------------------- |
| [Decision Log](./decision-log.md)                        | 앱 분리, MVP 범위, API 전략 등 주요 제품 결정 |
| [Design Direction](./design-direction-rationale.md)      | 역할별 정보 밀도와 시각 방향을 선택한 근거    |
| [Mobile Design System](./common-mobile-design-system.md) | Blogger 앱의 토큰, 레이아웃, 내비게이션 규칙  |

## 도메인과 연동 정책

| 문서                                      | 내용                                      |
| ----------------------------------------- | ----------------------------------------- |
| [API Strategy](./ui-ux/api-strategy.md)   | REST API 경계, adapter, 오류 처리 원칙    |
| [RBAC Policy](./ui-ux/rbac-policy.md)     | 역할별 접근 권한과 라우팅 기준            |
| [Status Policy](./ui-ux/status-policy.md) | 캠페인·미션·정산 상태의 표시 및 행동 규칙 |

## 성능

| 문서                                                                                           | 내용                                     |
| ---------------------------------------------------------------------------------------------- | ---------------------------------------- |
| [Lighthouse Baseline](./performance/lighthouse-baseline-2026-07-13.md)                         | 동일 조건에서 수집한 앱별 모바일 기준선  |
| [Blogger Performance Improvement](./performance/blogger-performance-improvement-2026-07-13.md) | 이미지, 폰트, 중복 요청 개선과 검증 항목 |

## 유지 원칙

- 실제 동작과 README를 문서의 기준으로 삼습니다.
- 완료된 구현 계획과 일회성 작업 메모는 저장소에 남기지 않습니다.
- 원본 Lighthouse HTML처럼 인증 정보가 포함될 수 있는 산출물은 로컬에서만 관리합니다.
- 정책이 바뀌면 관련 코드, 테스트, 문서를 같은 변경에서 갱신합니다.
