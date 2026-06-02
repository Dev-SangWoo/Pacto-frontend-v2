# Pacto Git Convention

## 1. 문서 목적

이 문서는 Pacto 프론트엔드 프로젝트의 Git 브랜치 전략과 작업 흐름을 정의한다.

커밋 메시지 규칙은 [Commit Convention](./commit-convention.md)을 따른다.

---

## 2. 기본 브랜치

## 2.1 main

`main`은 안정된 결과만 유지하는 브랜치다.

사용 기준:

```txt
초기 문서 세팅
배포 가능한 상태
마일스톤 완료 결과
```

## 2.2 develop

`develop`은 실제 개발 통합 브랜치다.

사용 기준:

```txt
기능 브랜치 병합
QA 전 통합 확인
main 반영 전 검증
```

## 2.3 feature/\*

기능 단위 작업 브랜치다.

예시:

```txt
feature/blogger-campaign-list
feature/blogger-mission-submit
feature/dashboard-layout
feature/campaign-management
feature/wallet
```

## 2.4 docs/\*

문서 작업 브랜치다.

예시:

```txt
docs/readme
docs/api-strategy
docs/ui-ux-spec
```

## 2.5 chore/\*

설정, 빌드, 도구 관련 작업 브랜치다.

예시:

```txt
chore/init-nextjs
chore/eslint-prettier
chore/husky-commitlint
```

---

## 3. 권장 작업 흐름

초기 MVP 개발은 다음 흐름을 따른다.

```txt
main
-> develop 생성
-> feature/* 또는 docs/*에서 작업
-> develop으로 병합
-> 마일스톤 단위로 main 반영
```

초기 문서와 프로젝트 기본 설정은 `main`에 바로 커밋할 수 있다.  
기능 개발이 시작되면 `develop`과 `feature/*` 흐름을 사용한다.

---

## 4. 브랜치 네이밍 규칙

브랜치 이름은 소문자와 하이픈을 사용한다.

```txt
feature/blogger-campaign-list
feature/dashboard-sidebar
fix/wallet-balance-format
docs/decision-log
chore/nextjs-init
```

피할 예:

```txt
feature/test
new
final
work
상우작업
```

---

## 5. 커밋 규칙

커밋 메시지는 Conventional Commits 형식을 따른다.

```txt
type: 한글 커밋 제목
```

예시:

```txt
feat(blogger): 캠페인 목록 화면 추가
fix(wallet): 출금 가능 금액 표시 오류 수정
docs: 의사결정 기록 문서 추가
chore(config): ESLint 설정 추가
```

자세한 규칙은 [Commit Convention](./commit-convention.md)을 따른다.

---

## 6. PR 규칙

PR 제목은 커밋 메시지와 같은 톤으로 작성한다.

예시:

```txt
feat(blogger): 캠페인 탐색 플로우 구현
feat(dashboard): 역할 기반 사이드바 구현
docs: UI/UX 상세 설계 문서 추가
chore(config): 린트와 포맷 설정 추가
```

PR 설명에는 다음 내용을 포함한다.

```txt
작업 내용
확인 방법
관련 문서 또는 이슈
남은 작업
```

---

## 7. 로컬 전용 파일

공개 GitHub에 올리지 않을 참고자료는 `.local/` 폴더에 보관한다.

예시:

```txt
.local/swagger-openapi.json
.local/portfolio-checklist.md
.local/portfolio-notes.md
```

`.local/`은 `.gitignore`에 포함되어 Git에 올라가지 않는다.

---

## 8. 초기 커밋 흐름 예시

```txt
docs: 프론트엔드 설계와 커밋 컨벤션 추가
docs: UI/UX 상세 설계 문서 분리
docs: Swagger 기준 API 전략 정리
docs: 프로젝트 README 추가
docs: 의사결정 기록과 Git 전략 추가
chore: Git 기본 설정 추가
chore: Next.js 프로젝트 초기화
```
