# Pacto RBAC Policy

## 1. 문서 목적

이 문서는 Pacto MVP의 역할 기반 접근 제어 정책을 정의한다.

Dashboard는 하나의 프론트엔드 앱으로 만들고, 로그인한 사용자의 역할에 따라 메뉴와 라우트 접근을 제어한다.

---

## 2. 사용자 역할

| Role            | 설명                                          |
| --------------- | --------------------------------------------- |
| Blogger         | 캠페인에 지원하고 미션을 수행하는 사용자      |
| Agency Admin    | 대행사 전체 캠페인 운영 권한을 가진 관리자    |
| Agency Operator | 캠페인 운영 실무자                            |
| Advertiser      | 캠페인 예산을 결제하고 결과를 확인하는 광고주 |
| Pacto Admin     | Pacto 내부 운영자                             |

---

## 3. 앱 접근 기준

| Role            | Blogger App | Dashboard |
| --------------- | ----------- | --------- |
| Blogger         | 가능        | 불가      |
| Agency Admin    | 불가        | 가능      |
| Agency Operator | 불가        | 가능      |
| Advertiser      | 불가        | 제한 가능 |
| Pacto Admin     | 불가        | 가능      |

블로거는 Dashboard에 접근할 수 없다. 광고주는 Dashboard에 접근하더라도 결제와 리포트 중심의 제한 View만 볼 수 있다.

---

## 4. 기능별 권한

| 기능        | Agency Admin | Agency Operator | Advertiser | Pacto Admin |
| ----------- | ------------ | --------------- | ---------- | ----------- |
| 캠페인 목록 | 가능         | 가능            | 제한       | 가능        |
| 캠페인 생성 | 가능         | 가능            | 불가       | 가능        |
| 캠페인 수정 | 가능         | 가능            | 불가       | 가능        |
| 지원자 관리 | 가능         | 가능            | 불가       | 가능        |
| 미션 검수   | 가능         | 가능            | 제한       | 가능        |
| 결제        | 제한         | 불가            | 가능       | 가능        |
| 정산 확인   | 가능         | 제한            | 제한       | 가능        |
| 리포트      | 가능         | 가능            | 가능       | 가능        |
| 설정        | 가능         | 불가            | 불가       | 가능        |

---

## 5. 메뉴 노출 규칙

## 5.1 Agency 메뉴

```txt
대시보드
캠페인
지원자
미션 검수
정산
리포트
설정
```

`Agency Operator`는 설정 메뉴를 보지 않는다.

## 5.2 Advertiser 메뉴

```txt
결제
내 캠페인
리포트
```

광고주는 다음 메뉴를 보지 않는다.

```txt
지원자
미션 검수
정산 원장
캠페인 등록
시스템 설정
```

## 5.3 Pacto Admin 메뉴

```txt
전체 캠페인
사용자
결제
정산
운영 로그
리포트
설정
```

---

## 6. 라우트 접근 규칙

| Route                                 | Blogger | Agency | Advertiser | Pacto Admin |
| ------------------------------------- | ------- | ------ | ---------- | ----------- |
| `/blogger/*`                          | 가능    | 불가   | 불가       | 불가        |
| `/dashboard`                          | 불가    | 가능   | 가능       | 가능        |
| `/dashboard/campaigns`                | 불가    | 가능   | 제한       | 가능        |
| `/dashboard/campaigns/new`            | 불가    | 가능   | 불가       | 가능        |
| `/dashboard/campaigns/:id/applicants` | 불가    | 가능   | 불가       | 가능        |
| `/dashboard/campaigns/:id/missions`   | 불가    | 가능   | 제한       | 가능        |
| `/dashboard/escrow`                   | 불가    | 가능   | 제한       | 가능        |
| `/dashboard/payments`                 | 불가    | 제한   | 가능       | 가능        |
| `/dashboard/reports`                  | 불가    | 가능   | 가능       | 가능        |
| `/dashboard/settings`                 | 불가    | 제한   | 불가       | 가능        |

---

## 7. 권한 없음 처리

허용되지 않은 화면에 접근하면 권한 없음 화면을 보여준다.

문구 예시:

```txt
접근 권한이 없습니다.
현재 계정으로는 이 화면을 볼 수 없습니다.
```

액션:

```txt
이전 화면으로 돌아가기
내 대시보드로 이동
```

---

## 8. 구현 기준

권한 정책은 하드코딩된 조건문이 화면 곳곳에 흩어지지 않도록 관리한다.

권장 구조:

```txt
role
permission
route access map
menu config
```

예시:

```txt
role -> accessibleRoutes
role -> visibleMenus
role -> allowedActions
```

권한 체크는 다음 계층에서 수행한다.

```txt
라우트 진입 시
메뉴 렌더링 시
액션 버튼 렌더링 시
API 요청 전
```
