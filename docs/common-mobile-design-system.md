# Common Mobile Design System

> 두 개의 모바일 참고 화면에서 공통으로 추출한 콘텐츠 독립형 디자인 패턴이다. 문구, 이미지, 업종과 데이터는 자유롭게 교체하고 레이아웃·시각 언어·상태 표현만 재사용한다.

## 1. 디자인 방향

이 시스템은 **밝고 신뢰감 있는 모바일 서비스 UI**를 목표로 한다.

- 흰색을 중심으로 넓은 여백을 사용한다.
- 파란색 하나를 주요 행동, 선택 상태, 핵심 숫자에 일관되게 사용한다.
- 민트, 앰버, 연한 파랑은 상태 전달에만 제한적으로 사용한다.
- 강한 그림자보다 옅은 테두리와 배경색으로 영역을 구분한다.
- 이미지는 작고 선명하게, 정보는 짧은 위계로 정리한다.
- 한 화면에 정보가 많아도 카드마다 같은 읽기 순서를 유지한다.

핵심 인상은 다음 네 단어로 정의한다.

`Clean` · `Friendly` · `Compact` · `Trustworthy`

---

## 2. 기본 화면 기준

| 항목                | 기준               |
| ------------------- | ------------------ |
| 기준 화면           | `390 × 844pt`      |
| 최소 지원 폭        | `320px`            |
| 웹 프리뷰 최대 폭   | `430px`            |
| 페이지 좌우 여백    | `16px`             |
| 좁은 화면 좌우 여백 | `12px`             |
| 상단 앱바           | `52~56px`          |
| 하단 탭바           | `64px + safe-area` |
| 기본 터치 영역      | 최소 `44 × 44px`   |
| 기본 그리드         | `4px`              |

아이폰 외곽 프레임, Dynamic Island와 시스템 상태 바는 앱 UI에 포함하지 않는다. 네이티브 앱에서는 OS safe area를 사용하고, 웹에서는 `env(safe-area-inset-*)`를 사용한다.

```css
.app-shell {
  width: 100%;
  min-height: 100dvh;
  background: var(--color-surface);
}

.page-content {
  padding-inline: var(--space-4);
  padding-bottom: calc(80px + env(safe-area-inset-bottom));
}
```

---

## 3. 디자인 토큰

### 3.1 색상

| 토큰                      | 값        | 용도                              |
| ------------------------- | --------- | --------------------------------- |
| `--color-primary`         | `#1677F2` | 주요 버튼, 선택 상태, 활성 아이콘 |
| `--color-primary-pressed` | `#0D64D5` | 버튼 누름 상태                    |
| `--color-primary-soft`    | `#EEF5FF` | 강조 패널, 선택 배경              |
| `--color-primary-border`  | `#CFE1FF` | 연한 파란 테두리                  |
| `--color-text-strong`     | `#172033` | 제목, 주요 숫자                   |
| `--color-text`            | `#394357` | 본문                              |
| `--color-text-muted`      | `#8A94A6` | 부가 정보, 날짜, 비활성 라벨      |
| `--color-icon-muted`      | `#AAB4C3` | 비활성 아이콘                     |
| `--color-surface`         | `#FFFFFF` | 기본 화면과 카드                  |
| `--color-surface-subtle`  | `#F7F9FC` | 보조 영역                         |
| `--color-border`          | `#E7ECF2` | 카드와 탭 구분선                  |
| `--color-success`         | `#2FC690` | 완료, 정상 상태                   |
| `--color-success-soft`    | `#E8FAF4` | 완료 배지 배경                    |
| `--color-warning`         | `#E9A23B` | 예정, 주의 상태                   |
| `--color-warning-soft`    | `#FFF5DF` | 예정 배지 배경                    |
| `--color-info`            | `#438DF5` | 안내, 처리 상태                   |
| `--color-info-soft`       | `#EAF3FF` | 안내 배지 배경                    |
| `--color-danger`          | `#F05261` | 오류와 알림 점                    |

색상은 의미에 따라 사용한다. 단순 장식 목적으로 여러 상태색을 섞지 않는다.

### 3.2 타이포그래피

```css
font-family:
  Pretendard,
  -apple-system,
  BlinkMacSystemFont,
  "Apple SD Gothic Neo",
  "Noto Sans KR",
  sans-serif;
```

| 스타일      | 크기 / 행간    | 굵기    | 용도                |
| ----------- | -------------- | ------- | ------------------- |
| `title-lg`  | `20 / 28px`    | 700     | 중요한 화면 제목    |
| `title-md`  | `18 / 24px`    | 700     | 앱바 및 섹션 제목   |
| `title-sm`  | `14 / 20px`    | 700     | 카드 제목           |
| `body-md`   | `14 / 21px`    | 400~500 | 일반 본문           |
| `body-sm`   | `12 / 18px`    | 400~600 | 설명과 보조 정보    |
| `label-md`  | `13 / 18px`    | 600     | 칩과 버튼           |
| `label-sm`  | `10~11 / 14px` | 500~600 | 상태, 날짜, 하단 탭 |
| `number-md` | `15~16 / 20px` | 700     | 금액과 핵심 수치    |

숫자는 굵게, 숫자를 설명하는 라벨은 작고 흐리게 표현한다. 한 카드 안에서는 제목 크기를 늘리기보다 굵기와 색으로 위계를 만든다.

### 3.3 간격

| 토큰        | 값     | 대표 용도                |
| ----------- | ------ | ------------------------ |
| `--space-1` | `4px`  | 아이콘과 작은 라벨       |
| `--space-2` | `8px`  | 배지와 제목, 내부 요소   |
| `--space-3` | `12px` | 이미지와 정보, 카드 내부 |
| `--space-4` | `16px` | 페이지 여백, 기본 패딩   |
| `--space-5` | `20px` | 섹션 내부 분리           |
| `--space-6` | `24px` | 카드와 섹션 사이         |
| `--space-8` | `32px` | 큰 섹션 전환             |

### 3.4 모서리·테두리·그림자

| 요소         |    반경 | 표현                |
| ------------ | ------: | ------------------- |
| 작은 배지    | `4~6px` | 색이 있는 연한 배경 |
| 버튼         | `6~8px` | 단색 또는 연한 배경 |
| 썸네일       |   `8px` | 이미지 잘림 허용    |
| 정보 패널    |  `10px` | 연한 색상 배경      |
| 배너·큰 카드 |  `12px` | 가장 큰 반경        |
| 캡슐 칩      | `999px` | 필터와 짧은 선택지  |

```css
--border-default: 1px solid #e7ecf2;
--shadow-card: 0 2px 10px rgba(25, 47, 78, 0.05);
--shadow-nav: 0 -2px 12px rgba(25, 47, 78, 0.04);
```

그림자는 카드의 기본 조건이 아니다. 테두리가 있는 카드에만 매우 약하게 사용한다.

---

## 4. 공통 앱 구조

```text
AppShell
├─ SystemSafeArea
├─ TopBar
├─ OptionalPageTabs
├─ ScrollablePageContent
│  ├─ OptionalHero
│  ├─ OptionalSectionToolbar
│  ├─ OptionalFilters
│  ├─ ContentList
│  └─ OptionalSummaryPanel
└─ BottomNavigation
```

### 스크롤 규칙

- 본문만 세로 스크롤한다.
- 하단 내비게이션은 항상 화면에 고정한다.
- 상단 앱바는 화면 성격에 따라 고정 또는 스크롤을 선택할 수 있지만 한 앱 안에서는 일관성을 유지한다.
- 마지막 콘텐츠가 하단 탭바에 가려지지 않도록 충분한 하단 패딩을 둔다.
- 가로 필터는 줄바꿈하지 않고 가로 스크롤한다.

---

## 5. 상단 앱바

상단 앱바는 같은 높이와 아이콘 규격을 유지하면서 두 가지 변형을 제공한다.

### A. 브랜드형 앱바

```text
[Logo] 서비스명                         [알림] [검색]
```

- 홈이나 탐색 화면에 사용한다.
- 로고는 `24px`, 제목과 간격은 `8px`이다.
- 오른쪽 액션 아이콘은 `22~24px`이며 실제 버튼 영역은 `44px`이다.
- 새 알림은 아이콘 우측 상단의 `6~8px` 점으로 표시한다.

### B. 페이지 제목형 앱바

```text
페이지 제목                                  [도움말]
```

- 내역, 설정, 관리 화면에 사용한다.
- 제목은 왼쪽 정렬한다.
- 우측에는 현재 화면과 직접 관련된 액션을 최대 두 개까지만 둔다.

```css
.top-bar {
  min-height: 52px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-inline: 16px;
  background: #fff;
}
```

---

## 6. 내비게이션 패턴

### 6.1 텍스트 탭

상태나 기간처럼 동일한 데이터 집합을 나눌 때 사용한다.

```text
전체                 예정                 완료
━━━━
```

- 탭은 동일한 너비를 가진다.
- 높이: `44px`
- 활성 라벨: Primary Blue, `600` 굵기
- 비활성 라벨: Muted Text
- 활성 밑줄: `2px`, 탭 너비의 `50~70%`
- 탭 하단에는 전체 폭 구분선 `1px`를 둔다.

### 6.2 필터 칩

카테고리처럼 빠르게 전환하는 선택지에 사용한다.

- 높이: `30~32px`
- 좌우 패딩: `12~14px`
- 칩 사이: `8px`
- 선택: 파란 배경 + 흰색 라벨
- 미선택: 흰색 배경 + 옅은 테두리
- 선택 방식은 기본적으로 단일 선택이다.

텍스트 탭과 필터 칩을 같은 의미로 동시에 사용하지 않는다. 텍스트 탭은 큰 데이터 상태, 필터 칩은 그 안의 세부 분류에 사용한다.

### 6.3 하단 탭바

```text
[아이콘]   [아이콘]   [아이콘]   [아이콘]   [아이콘]
  라벨       라벨       라벨       라벨       라벨
```

- 탭 수: `4~5개`, 권장 `5개`
- 전체 높이: `64px + safe-area`
- 각 탭 너비는 동일하다.
- 아이콘: `22~24px`, 라벨과 간격 `4px`
- 활성 탭만 Primary Blue를 사용한다.
- 비활성 탭은 `--color-icon-muted`를 사용한다.
- 배경은 불투명한 흰색이며 상단에 옅은 경계선을 둔다.

---

## 7. 히어로 배너

홈이나 탐색 화면에서만 선택적으로 사용한다.

```text
┌────────────────────────────────────┐
│ 짧은 핵심 문구       일러스트/이미지 │
│ 보조 문구                           │
└────────────────────────────────────┘
```

- 높이: `104~120px`, 권장 `112px`
- 반경: `12px`
- 배경: Primary Soft 또는 옅은 그라데이션
- 텍스트 영역: 전체 폭의 약 `50~58%`
- 이미지: 오른쪽 아래 정렬, `object-fit: contain`
- 한 화면에 하나만 사용한다.
- 문구는 최대 세 줄로 제한한다.

히어로는 정보 카드가 아니라 화면의 성격을 설명하는 장치다. 복잡한 수치나 여러 버튼을 넣지 않는다.

---

## 8. 공통 카드 시스템

두 화면의 카드는 같은 정보 골격을 공유하고, 표면 처리만 다르게 한다.

### 8.1 공통 골격: `MediaInfoCard`

```text
┌──────────────────────────────────────┐
│ [상태]                               │
│ [이미지] 제목·설명                액션 │
│          핵심 정보       날짜/보조 정보 │
│──────────────────────────────────────│
│ 안내, 조건 또는 주요 행동 영역        │
└──────────────────────────────────────┘
```

읽기 순서는 항상 다음과 같다.

1. 상태
2. 제목
3. 짧은 설명 또는 메타데이터
4. 핵심 숫자·기간·진행 정보
5. 보조 안내 또는 주요 행동

### 8.2 크기와 정렬

- 이미지: `72~80px` 정사각형
- 이미지 반경: `8px`
- 이미지와 정보 간격: `12px`
- 카드 내부 패딩: `12px`
- 제목: 한 줄, 필요하면 말줄임
- 설명: 최대 두 줄
- 우측 액션 영역: 최소 `32px` 확보
- 작은 지표가 여러 개면 `2~3열 grid`를 사용한다.

```css
.media-info-card__main {
  display: grid;
  grid-template-columns: 80px minmax(0, 1fr);
  gap: 12px;
}

.media-info-card__image {
  width: 80px;
  aspect-ratio: 1;
  border-radius: 8px;
  object-fit: cover;
}

.media-info-card__metrics {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
}
```

### 8.3 카드 표면 변형

#### `flat`

탐색·추천 목록에 사용한다.

- 외곽선과 그림자를 생략한다.
- 카드끼리는 `20~24px` 여백으로 구분한다.
- 하단에 연한 정보 패널과 주요 버튼을 연결할 수 있다.

#### `outlined`

내역·상태 목록에 사용한다.

- `1px` 옅은 테두리
- `12px` 반경
- 선택적으로 매우 약한 그림자
- 카드 사이 간격은 `10~12px`
- 하단 안내 영역은 구분선으로 본문과 나눈다.

```css
.card--outlined {
  border: 1px solid var(--color-border);
  border-radius: 12px;
  box-shadow: var(--shadow-card);
}
```

### 8.4 카드 하단 변형

#### 정보 패널

- 배경: Primary Soft 또는 Surface Subtle
- 반경: `8~10px`
- 텍스트 중 라벨이나 핵심 단어만 파란색으로 강조한다.
- 패널 내부에 전체 폭 주요 버튼을 둘 수 있다.

#### 상태 안내 행

- 카드 본문과 `1px` 선으로 구분한다.
- 좌측에 `14~16px` 의미 아이콘을 둔다.
- 한 문장으로 현재 상태나 다음 단계를 설명한다.
- 성공은 민트, 진행은 파랑, 예정은 앰버를 사용한다.

---

## 9. 상태 배지

배지는 짧은 상태만 표현하고 카테고리 이름과 혼용하지 않는다.

| 상태 계열 | 배경                     | 텍스트·아이콘        | 의미                  |
| --------- | ------------------------ | -------------------- | --------------------- |
| Info      | `--color-info-soft`      | `--color-info`       | 신규, 처리, 안내      |
| Success   | `--color-success-soft`   | `--color-success`    | 완료, 정상            |
| Warning   | `--color-warning-soft`   | `--color-warning`    | 예정, 임박, 확인 필요 |
| Neutral   | `--color-surface-subtle` | `--color-text-muted` | 비활성, 종료          |

- 높이: `20~22px`
- 좌우 패딩: `6~8px`
- 글자: `10~11px / 600`
- 반경: `4~6px`
- 한 카드에 핵심 상태 배지는 하나만 노출한다.

색상만으로 상태를 전달하지 않고 반드시 텍스트나 아이콘을 함께 제공한다.

---

## 10. 버튼과 아이콘 액션

### Primary Button

- 전체 폭 사용 가능
- 시각 높이: `36~40px`
- 최소 터치 높이: `44px`
- 파란 배경, 흰색 라벨
- 카드 안에서는 하나만 사용한다.

### Secondary / Soft Button

- Primary Soft 배경
- Primary 색상 아이콘 또는 라벨
- 요약 패널의 보조 이동 등에 사용한다.

### Icon Button

- 아이콘: `20~24px`
- 버튼 영역: `44 × 44px`
- 기본 상태에서는 배경이 없다.
- 선택되면 아이콘을 채우거나 연한 원형 배경을 추가한다.

아이콘 스타일은 모두 `1.7~2px`의 둥근 아웃라인으로 통일한다. 서로 다른 아이콘 라이브러리를 혼용하지 않는다.

---

## 11. 요약 패널

내역 화면 하단 또는 섹션 마지막에 여러 핵심 수치를 요약할 때 사용한다.

```text
┌──────────────────────────────────────┐
│ 라벨          라벨              [이동] │
│ 핵심 수치     핵심 수치                │
└──────────────────────────────────────┘
```

- 배경: Primary Soft 또는 아주 옅은 파란 그라데이션
- 반경: `10~12px`
- 패딩: `12~16px`
- 숫자: Primary Blue, 굵은 글자
- 각 수치 사이에 충분한 간격을 둔다.
- 우측 이동 버튼은 `36~40px`의 연한 원형 또는 둥근 사각형으로 만든다.

요약 패널은 하단 탭바 바로 위에 고정하거나 목록의 마지막 요소로 사용할 수 있다. 고정할 경우 본문 하단 패딩에 패널 높이까지 포함한다.

---

## 12. 화면 템플릿

### Template A: 탐색형 화면

```text
Brand Top Bar
Hero Banner
Section Title + More Action
Horizontal Filter Chips
Flat MediaInfoCard List
Fixed Bottom Navigation
```

적합한 용도: 추천, 검색 결과, 콘텐츠 탐색, 상품 또는 프로그램 목록.

### Template B: 내역형 화면

```text
Title Top Bar
Equal-width Text Tabs
Outlined MediaInfoCard List
Summary Panel
Fixed Bottom Navigation
```

적합한 용도: 활동 내역, 상태 추적, 주문·신청·처리 기록, 관리 화면.

두 템플릿은 상단 구조와 카드 표면만 다르며 색상, 타이포그래피, 이미지 규격, 상태 배지, 하단 내비게이션은 공유한다.

---

## 13. 반응형 규칙

### `320~359px`

- 페이지 여백을 `12px`로 줄인다.
- 카드 이미지를 `72px`로 줄인다.
- 카드 지표가 좁으면 핵심 두 개만 노출하거나 두 줄로 배치한다.
- 제목과 설명은 말줄임을 우선한다.

### `360~430px`

- 기본 토큰을 그대로 사용한다.
- 이미지는 `80px`, 페이지 여백은 `16px`이다.

### `431px 이상`

- 모바일 앱 프리뷰는 `max-width: 430px`로 제한한다.
- 큰 화면에 맞춰 카드 폭을 무제한으로 늘리지 않는다.

---

## 14. 상호작용 상태

모든 상호작용 요소는 다음 상태를 제공한다.

- `default`
- `pressed`
- `selected`
- `disabled`
- `loading`
- `error` 또는 `unavailable`

### 권장 동작

- 탭 선택 시 밑줄과 라벨 색상이 동시에 변한다.
- 필터 변경 시 목록에 짧은 페이드 또는 위치 유지 갱신을 적용한다.
- 찜과 같은 즉시 행동은 낙관적으로 반영하되 실패 시 원상 복구한다.
- 버튼 로딩 중에는 중복 클릭을 막고 라벨 또는 스피너로 상태를 알린다.
- 목록 데이터 로딩 시 실제 카드 비율과 같은 스켈레톤을 사용한다.

---

## 15. 접근성

- 모든 터치 대상은 최소 `44 × 44px`로 만든다.
- 본문 텍스트는 가능하면 `12px`보다 작게 만들지 않는다.
- 상태는 색상만으로 표현하지 않는다.
- 아이콘 버튼에 접근성 이름을 제공한다.
- 제목은 한 줄 말줄임을 사용할 수 있지만 전체 이름을 스크린 리더가 읽을 수 있어야 한다.
- 선택 탭에는 `aria-selected`, 현재 하단 경로에는 `aria-current="page"`를 제공한다.
- 콘텐츠 이미지에는 의미 있는 대체 텍스트를 사용하고 장식 이미지는 읽기에서 제외한다.
- 고정 하단 UI가 확대된 텍스트나 마지막 카드의 액션을 가리지 않도록 한다.

---

## 16. CSS 변수 시작점

```css
:root {
  --color-primary: #1677f2;
  --color-primary-pressed: #0d64d5;
  --color-primary-soft: #eef5ff;
  --color-text-strong: #172033;
  --color-text: #394357;
  --color-text-muted: #8a94a6;
  --color-icon-muted: #aab4c3;
  --color-surface: #ffffff;
  --color-surface-subtle: #f7f9fc;
  --color-border: #e7ecf2;
  --color-info: #438df5;
  --color-info-soft: #eaf3ff;
  --color-success: #2fc690;
  --color-success-soft: #e8faf4;
  --color-warning: #e9a23b;
  --color-warning-soft: #fff5df;
  --color-danger: #f05261;

  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;

  --radius-xs: 4px;
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 10px;
  --radius-xl: 12px;
  --radius-pill: 999px;

  --border-default: 1px solid #e7ecf2;
  --shadow-card: 0 2px 10px rgba(25, 47, 78, 0.05);
  --shadow-nav: 0 -2px 12px rgba(25, 47, 78, 0.04);
}
```

---

## 17. 구현용 컴포넌트 구조

```tsx
<AppShell>
  <TopBar variant="brand | title" />

  <PageTabs items={tabs} />

  <ScrollableContent>
    <HeroBanner />
    <SectionToolbar />
    <FilterChips />

    <ContentList>
      <MediaInfoCard
        variant="flat | outlined"
        badge={status}
        image={image}
        title={title}
        description={description}
        metrics={metrics}
        footer={<CardFooter />}
      />
    </ContentList>

    <SummaryPanel />
  </ScrollableContent>

  <BottomNavigation />
</AppShell>
```

화면마다 새 카드 컴포넌트를 만들기보다 `MediaInfoCard`의 슬롯과 변형으로 해결한다.

권장 슬롯은 다음과 같다.

- `badge`
- `image`
- `title`
- `description`
- `metadata`
- `metrics`
- `trailingAction`
- `footer`

---

## 18. 최종 체크리스트

- [ ] 페이지 좌우 여백이 모든 화면에서 동일한가?
- [ ] Primary Blue가 선택과 주요 행동에만 사용되는가?
- [ ] 카드 이미지 크기와 반경이 통일되어 있는가?
- [ ] 상태 배지가 의미별 색상 규칙을 따르는가?
- [ ] 탐색 카드는 `flat`, 내역 카드는 `outlined` 변형을 사용하는가?
- [ ] 제목 → 설명 → 핵심 정보 → 안내/행동 순서가 유지되는가?
- [ ] 하단 탭바가 마지막 콘텐츠를 가리지 않는가?
- [ ] 모든 터치 영역이 최소 `44px`인가?
- [ ] 긴 제목, 빈 목록, 로딩, 오류 상태를 처리했는가?
- [ ] 화면 폭이 커져도 모바일 콘텐츠 폭이 과도하게 늘어나지 않는가?

---

## 요약

이 공동 디자인의 중심은 다음과 같다.

1. **흰색 화면과 파란색 포인트**
2. **이미지와 정보가 결합된 조밀한 카드**
3. **의미가 분명한 파스텔 상태 배지**
4. **탐색은 필터 칩, 내역은 텍스트 탭**
5. **`flat`과 `outlined`로 변형되는 하나의 공통 카드**
6. **항상 유지되는 5분할 하단 내비게이션**

콘텐츠를 바꾸더라도 이 여섯 가지 원칙과 토큰을 유지하면 두 참고 화면과 같은 제품군의 UI로 보인다.
