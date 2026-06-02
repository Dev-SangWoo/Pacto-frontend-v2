# Pacto 커밋 메시지 컨벤션

## 1. 기본 원칙

Pacto의 커밋 메시지는 Conventional Commits 형식을 따른다.

커밋 타입은 영어로 작성하고, 커밋 제목과 본문은 한글로 작성한다.

```txt
type: 한글 커밋 제목
```

예시:

```txt
feat: 블로거 캠페인 목록 화면 추가
fix: 캠페인 지원 중복 요청 방지
docs: 프론트엔드 MVP 설계 문서 추가
chore: 프로젝트 기본 설정 추가
```

---

## 2. 커밋 메시지 형식

## 2.1 기본 형식

```txt
type: 변경 내용을 한글로 요약
```

## 2.2 선택 형식

변경 범위를 명확하게 보여주고 싶을 때는 scope를 사용한다.

```txt
type(scope): 변경 내용을 한글로 요약
```

예시:

```txt
feat(blogger): 캠페인 상세 화면 추가
feat(dashboard): 역할 기반 사이드바 추가
fix(wallet): 출금 가능 금액 표시 오류 수정
docs(readme): 프로젝트 실행 방법 추가
```

## 2.3 본문이 필요한 경우

변경 이유나 주의할 점이 있으면 한 줄을 비우고 본문을 작성한다.

```txt
feat(blogger): 캠페인 지원 플로우 추가

블로거가 캠페인 상세 화면에서 지원할 수 있도록 지원 버튼과 상태 표시를 추가했다.
API 연동 전까지는 mock adapter를 사용한다.
```

---

## 3. 커밋 타입

| 타입     | 용도                                  |
| -------- | ------------------------------------- |
| feat     | 새로운 기능 추가                      |
| fix      | 버그 수정                             |
| docs     | 문서 추가 또는 수정                   |
| style    | 코드 동작 변경 없는 포맷, 스타일 수정 |
| refactor | 기능 변경 없는 코드 구조 개선         |
| test     | 테스트 추가 또는 수정                 |
| chore    | 빌드, 설정, 패키지 관리 등 기타 작업  |
| perf     | 성능 개선                             |
| ci       | CI/CD 설정 변경                       |
| build    | 빌드 시스템 또는 외부 의존성 변경     |
| revert   | 이전 커밋 되돌리기                    |

---

## 4. 제목 작성 규칙

- 커밋 제목은 한글로 작성한다.
- 제목은 50자 안팎으로 짧게 작성한다.
- 마침표를 붙이지 않는다.
- 무엇을 했는지 명확하게 쓴다.
- 너무 추상적인 표현은 피한다.

좋은 예:

```txt
feat: 블로거 캠페인 목록 화면 추가
fix: 지갑 잔액 천 단위 포맷 오류 수정
docs: Git 커밋 컨벤션 문서 추가
refactor: 캠페인 상태 배지 컴포넌트 분리
```

피할 예:

```txt
feat: 작업함
fix: 수정
docs: 문서
chore: 이것저것 정리
```

---

## 5. Scope 작성 규칙

scope는 변경 범위가 명확할 때만 사용한다.

권장 scope:

```txt
blogger
dashboard
advertiser
campaign
mission
wallet
payment
escrow
auth
ui
api
docs
config
```

예시:

```txt
feat(campaign): 캠페인 상태 필터 추가
fix(payment): 결제 실패 메시지 표시 오류 수정
refactor(ui): 공통 버튼 컴포넌트 구조 개선
chore(config): ESLint 설정 추가
```

---

## 6. 커밋 단위

커밋은 하나의 의도만 담는다.

좋은 단위:

```txt
docs: 프론트엔드 MVP 설계 문서 추가
chore: Next.js 프로젝트 초기 설정 추가
feat(blogger): 캠페인 목록 화면 추가
feat(blogger): 캠페인 상세 화면 추가
fix(wallet): 잠긴 금액 표시 조건 수정
```

피할 단위:

```txt
feat: 로그인, 캠페인, 지갑, 리포트, 문서 전부 추가
```

큰 기능은 여러 커밋으로 나눈다.

```txt
feat(dashboard): 기본 레이아웃 추가
feat(dashboard): 역할 기반 메뉴 구성 추가
feat(campaign): 캠페인 테이블 추가
feat(campaign): 캠페인 등록 폼 추가
```

---

## 7. 포트폴리오용 커밋 흐름 예시

초기 프로젝트 히스토리는 다음과 같이 쌓는다.

```txt
docs: 프론트엔드 MVP 설계 문서 추가
docs: 커밋 메시지 컨벤션 문서 추가
chore: Next.js 워크스페이스 초기화
chore(config): ESLint와 Prettier 설정 추가
feat(blogger): 모바일 앱 기본 라우팅 추가
feat(blogger): 캠페인 목록 화면 추가
feat(dashboard): 대시보드 기본 레이아웃 추가
feat(dashboard): 역할 기반 사이드바 추가
```

이 흐름은 포트폴리오에서 프로젝트가 어떻게 설계되고 성장했는지 보여주기 좋다.

---

## 8. 최종 규칙 요약

```txt
커밋 타입은 영어
커밋 제목은 한글
필요하면 scope 사용
한 커밋에는 하나의 의도만 담기
포트폴리오에 보여줘도 부끄럽지 않은 메시지로 작성하기
```
