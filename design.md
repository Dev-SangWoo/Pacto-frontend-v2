# Pacto Design Direction

## 1. Brand Core

Pacto의 디자인은 로고가 가진 세 가지 인상을 제품 전체로 확장한다.

- **Forward motion**: 심볼의 사선 흐름과 둥근 말단에서 느껴지는 전진감, 빠른 처리감, 캠페인 진행감을 살린다.
- **Clean precision**: 워드마크의 검정, 넓은 자간, 단정한 기하학적 형태처럼 화면은 또렷하고 업무적으로 정돈되어야 한다.
- **Trustworthy energy**: 파란 그라데이션은 밝고 적극적이지만, 전체 UI는 과하게 장식적이지 않고 신뢰감 있게 유지한다.

Pacto는 광고주와 블로거가 돈, 캠페인, 미션 상태를 다루는 서비스다. 따라서 디자인의 우선순위는 예쁜 분위기보다 **상태를 빠르게 읽고, 다음 행동을 확신 있게 누르게 만드는 것**이다.

## 2. Design Keywords

- **Sharp dashboard, soft brand**
- **Blue signal, black confidence**
- **Rounded but not cute**
- **Fast status scanning**
- **Creator-friendly clarity**
- **Operational calm**

사용자가 화면을 보자마자 느껴야 하는 말:

> "깔끔하고 빠르다. 지금 뭘 해야 하는지 바로 보인다."

## 3. Visual Principles

### 3.1 Logo-Inspired Shape Language

로고 심볼은 두꺼운 리본처럼 이어지는 곡선과 사선 흐름을 가진다. UI에서는 이를 다음 방식으로 확장한다.

- 주요 CTA, 진행 바, 선택 상태에는 **왼쪽에서 오른쪽으로 흐르는 블루 그라데이션**을 제한적으로 사용한다.
- 카드와 패널은 기본 `8px` radius를 유지한다. 브랜드 심볼처럼 부드럽지만, 앱 전체가 둥글고 캐주얼해 보이면 안 된다.
- 큰 히어로나 로그인 화면에서는 심볼의 방향감을 닮은 **사선형 레이어, 흐르는 강조선, 단계 진행 구조**를 사용할 수 있다.
- 일반 업무 화면에서는 장식 요소를 줄이고, 데이터와 액션을 먼저 보여준다.

### 3.2 Color Philosophy

Pacto의 색은 로고의 블루를 중심으로 하되, 검정 워드마크의 정밀함을 함께 가져간다.

Primary palette:

| Token            | Hex       | Usage                                     |
| ---------------- | --------- | ----------------------------------------- |
| `pacto-blue-600` | `#145CFF` | Primary CTA, active nav, key progress     |
| `pacto-blue-500` | `#1F7BFF` | Links, active badges, positive highlights |
| `pacto-sky-400`  | `#28B8FF` | Gradient end, hover glow, soft emphasis   |
| `pacto-ink-900`  | `#101318` | Main text, strong dashboard numbers       |
| `pacto-ink-700`  | `#2F3A4A` | Secondary headings, table primary labels  |
| `pacto-grey-600` | `#667085` | Metadata, helper text                     |
| `pacto-grey-100` | `#F2F5F8` | Page background, subtle sections          |
| `pacto-white`    | `#FFFFFF` | Panels, cards, app surfaces               |

Semantic palette:

| Meaning | Hex       | Usage                                |
| ------- | --------- | ------------------------------------ |
| Success | `#00A661` | Approved, settled, completed         |
| Warning | `#F59E0B` | Pending review, attention needed     |
| Danger  | `#F04452` | Rejected, failed, destructive action |
| Neutral | `#8B95A1` | Disabled, inactive, archived         |

Gradient:

```css
--pacto-gradient: linear-gradient(135deg, #145cff 0%, #1f7bff 48%, #28b8ff 100%);
```

Gradient usage rule:

- Use gradients for brand moments, primary CTA hover, onboarding/login, progress summaries, and selected highlights.
- Do not use gradients as large decorative backgrounds on every screen.
- Data tables, forms, settings, and repeated cards should mostly use flat white, grey, and single blue accents.

### 3.3 Typography

Default typeface:

- Korean and product UI: `Pretendard Variable`
- Brand fallback for wordmark-like emphasis: `Gilroy`, `Avenir Next`, `Montserrat`, `Pretendard`

Typography rules:

- Dashboard numbers should be bold and compact: `font-weight: 900`, tight line-height.
- Labels and table metadata should be readable but restrained: `12-14px`, `font-weight: 700-850`.
- Headings should feel precise, not editorial. Avoid oversized marketing-style headings inside operational screens.
- Letter spacing should stay `0`; do not create artificial logo-like spacing in normal UI.

Recommended scale:

| Role          | Size      | Weight    | Line height |
| ------------- | --------- | --------- | ----------- |
| Page title    | `26-30px` | `850-900` | `1.2`       |
| Section title | `18-21px` | `850-900` | `1.3`       |
| Card number   | `28-38px` | `900-950` | `1.05-1.15` |
| Body          | `14-16px` | `650-750` | `1.5-1.65`  |
| Metadata      | `12-13px` | `750-850` | `1.35`      |

## 4. Product Surface Direction

### 4.1 Advertiser Dashboard

Dashboard는 Pacto의 "clean precision"을 가장 강하게 보여주는 곳이다. 반복 업무를 빠르게 처리하는 운영 콘솔처럼 보여야 한다.

Dashboard design commands:

- 첫 화면에서 캠페인 상태, 예산, 지원자, 미션 검수, 정산 상태를 즉시 스캔할 수 있게 한다.
- 카드는 정보 묶음의 프레임으로만 사용한다. 마케팅 페이지처럼 카드가 화면을 장식하게 만들지 않는다.
- 메인 액션은 블루, 완료/승인은 그린, 반려/실패는 레드로 고정한다.
- 표와 리스트에서는 줄 간격, 배지, 우측 액션 버튼을 일정하게 유지한다.
- 사이드바는 옅은 블루 계열로 브랜드감을 주되, 작업 영역은 흰색/회색 중심으로 차분하게 둔다.
- KPI 카드는 숫자와 변화량을 먼저 보여주고, 설명 문장은 최소화한다.
- 생성, 승인, 결제, 정산처럼 금전/상태 변경이 있는 액션은 버튼 위계가 분명해야 한다.

Dashboard tone:

- Professional
- Dense but breathable
- Fast scanning
- Low decoration
- High contrast for numbers and status

Avoid:

- 과한 일러스트
- 큰 히어로 카드
- 불필요한 블러/글로우
- 비슷한 블루 톤만 반복되는 단조로운 화면
- 상태 색상 규칙을 깨는 임의 컬러

### 4.2 Blogger App

Blogger 앱은 Pacto의 "trustworthy energy"를 더 많이 보여준다. 모바일 사용자가 캠페인을 발견하고, 보상을 이해하고, 다음 미션을 수행하기 쉽게 만들어야 한다.

Blogger app design commands:

- 상단에는 현재 사용자가 얻을 수 있는 보상, 진행 중 미션, 마감 임박 상태를 명확히 보여준다.
- 캠페인 카드는 사진, 보상, 마감, 조건을 빠르게 비교할 수 있게 만든다.
- 보상 금액과 CTA는 블루를 적극적으로 사용하되, 배경은 밝고 깨끗하게 유지한다.
- 하단 고정 CTA는 현재 화면의 다음 행동을 하나로 압축한다.
- 모바일에서는 정보가 카드 안에 갇혀 보이지 않도록 섹션 간 여백을 충분히 둔다.
- 앱의 친근함은 일러스트보다 문구, 흐름, 보상 가시성에서 나온다.

Blogger app tone:

- Clear
- Reward-forward
- Mobile-native
- Slightly warmer than dashboard
- Still precise and trustworthy

Avoid:

- 게임처럼 과하게 귀여운 스타일
- 보상보다 설명이 먼저 보이는 구조
- CTA가 여러 개라 다음 행동이 흐려지는 화면
- 흐릿한 이미지나 낮은 대비의 배지

## 5. Component Rules

### 5.1 Buttons

Primary button:

- Background: `--pacto-gradient` or `pacto-blue-600`
- Text: white
- Radius: `8px`
- Height: dashboard `42-46px`, mobile app `48-52px`
- Weight: `850-900`

Secondary button:

- White background
- Grey border
- Ink text
- Hover/focus uses soft blue background

Danger button:

- Red text or red background depending on risk
- Never use blue for destructive actions

Icon buttons:

- Use familiar icons for navigation, close, search, filter, settings, edit, download.
- Keep icon buttons square or circular only when the surrounding UI expects it.

### 5.2 Cards and Panels

- Radius: `8px`
- Border: `1px solid` soft grey or blue-tinted grey
- Shadow: subtle, never heavy by default
- Dashboard panels should align to grids and have consistent header/body padding.
- Mobile cards may use slightly stronger shadow for tap affordance.
- Do not nest cards inside cards unless it is a modal or repeated list item inside a framed panel.

### 5.3 Badges and Status

Status badge mapping:

| Status                         | Color   | Meaning                    |
| ------------------------------ | ------- | -------------------------- |
| Open / Active / Recruiting     | Blue    | User can act now           |
| Approved / Completed / Settled | Green   | Successfully finished      |
| Pending / Reviewing            | Warning | Waiting or needs attention |
| Rejected / Failed / Cancelled  | Red     | Negative result or blocked |
| Draft / Closed / Archived      | Grey    | Not currently active       |

Badge rules:

- Badges should be compact and readable at a glance.
- Keep status labels consistent across dashboard and app.
- Never use decorative colors for core statuses.

### 5.4 Forms

- Inputs use white surface, grey border, `8px` radius.
- Focus state uses blue border and subtle blue ring.
- Required or invalid states must use clear inline messages.
- Form pages should show a preview or summary when the result affects a campaign/app view.
- Long forms should be broken into logical sections with clear section titles.

### 5.5 Data Tables and Lists

- Use strong row hierarchy: primary label, metadata, status, action.
- Keep row heights stable.
- Align money, counts, and dates consistently.
- Important actions should sit on the right in dashboard lists.
- On mobile, convert tables into stacked list rows rather than squeezing columns.

## 6. Layout System

Spacing scale:

| Token     | Value  | Usage                         |
| --------- | ------ | ----------------------------- |
| `space-1` | `4px`  | Tight icon/text gaps          |
| `space-2` | `8px`  | Badge/card internal gaps      |
| `space-3` | `12px` | Compact component spacing     |
| `space-4` | `16px` | Default section/card padding  |
| `space-5` | `20px` | Mobile hero and panel padding |
| `space-6` | `24px` | Page-level spacing            |
| `space-8` | `32px` | Large dashboard groups        |

Dashboard layout:

- Sidebar: `240-260px`
- Workspace max width should be avoided unless content becomes too wide to scan.
- Primary grid gap: `12-18px`
- Cards should align to common grid tracks.

Mobile app layout:

- Shell max width: `430px`
- Horizontal padding: `16-18px`
- Bottom nav and fixed CTA must not overlap content.
- Repeated cards should keep stable aspect ratios for images.

## 7. UX Patterns

Pacto의 UX 패턴은 사용자가 지금 상태를 빠르게 이해하고, 다음 행동을 확신 있게 수행하도록 돕는 장치다. 모든 패턴은 화면을 꾸미기 위한 요소가 아니라 **상태, 리스크, 다음 행동**을 전달해야 한다.

### 7.1 Floating Guidance Card

하단 플로팅 안내 카드는 모바일 Blogger 앱에서 가장 유용하다. 사용자가 캠페인 탐색, 미션 제출, 출금 신청처럼 다음 행동을 놓치기 쉬운 화면에 사용한다.

Use when:

- 신청 조건, 마감, 보상, 제출 주의사항처럼 행동 직전에 알아야 하는 정보가 있다.
- 사용자가 현재 화면에서 다음 CTA를 누르기 전에 한 번 더 확인해야 한다.
- 전체 화면 알림은 과하고, 작은 인라인 문구는 놓치기 쉬운 상황이다.

Design:

- Position: bottom nav 또는 fixed CTA 위
- Width: mobile shell 기준 좌우 `16px` 여백
- Radius: `8px`
- Background: white with slight translucency, `backdrop-filter: blur(12-14px)`
- Border: soft blue or grey line
- Shadow: subtle elevated shadow
- Layout: text + close icon, optional small action link

Content rules:

- 1-2줄 안에 끝낸다.
- 사용자가 해야 할 행동을 명확히 쓴다.
- 정보성은 blue, 주의는 amber, 위험은 red로 구분한다.
- 같은 화면에서 반복 노출하지 않는다. 닫으면 세션 동안 유지한다.

Examples:

- "마감 3시간 전이에요. 제출 URL을 미리 준비해 주세요."
- "신청 전 방문 가능 날짜를 확인해 주세요."
- "정산 계좌가 등록되어야 출금 신청을 할 수 있어요."

### 7.2 Notification Indicator

알림 표시는 단순한 빨간 점이 아니라, 사용자가 놓치면 손해가 생기는 상태를 알려야 한다.

Use for:

- 지원자 승인 대기
- 미션 검수 요청
- 결제 실패 또는 충전 필요
- 정산 완료/반려
- 캠페인 마감 임박

Rules:

- 미확인 알림은 small dot 또는 count badge로 표시한다.
- 위험/실패 알림만 red를 사용한다.
- 일반 새 소식은 blue dot, 대기/주의는 amber dot을 사용한다.
- 알림을 누르면 관련 화면으로 바로 이동해야 한다.
- 읽음 처리 후에는 dot/count를 즉시 제거한다.

Dashboard placement:

- Sidebar nav item 옆 count badge
- Topbar 우측 notification icon
- 캠페인/미션 리스트 row 안의 상태 badge

Blogger app placement:

- Bottom nav item 위 small dot
- 상단 profile/notification icon 옆 dot
- 미션 카드 상단의 status badge

### 7.3 Action Nudge

Action nudge는 사용자가 다음 행동을 몰라 멈추는 순간을 줄이는 작은 안내다.

Types:

- **Primary nudge**: 지금 가장 중요한 행동. CTA 근처에 배치한다.
- **Context nudge**: 특정 상태의 이유나 조건을 설명한다.
- **Recovery nudge**: 실패 후 다시 시도할 방법을 알려준다.

Rules:

- CTA와 같은 방향의 행동만 안내한다.
- 설명보다 결과를 먼저 말한다.
- 한 화면에 1개의 primary nudge만 둔다.
- nudge가 많아지면 화면 설계가 잘못된 것으로 보고 구조를 다시 정리한다.

Examples:

- "지원자가 4명 대기 중이에요. 오늘 승인하면 모집 속도가 빨라져요."
- "예산이 부족해 캠페인을 시작할 수 없어요. 먼저 충전해 주세요."
- "제출 링크를 확인할 수 없어요. URL을 다시 입력해 주세요."

### 7.4 Fixed CTA

Fixed CTA는 모바일에서 사용자가 스크롤 중에도 핵심 행동을 잃지 않게 하는 장치다.

Use for:

- 캠페인 신청
- 미션 제출
- 출금 신청
- 결제/충전
- 최종 저장 또는 발행

Rules:

- 한 화면에 하나의 primary fixed CTA만 둔다.
- secondary action이 필요하면 CTA 위 텍스트 링크나 약한 버튼으로 둔다.
- disabled 상태에서는 왜 비활성인지 가까운 곳에 설명한다.
- bottom nav와 겹치지 않도록 `bottom-nav-height + gap`을 기준으로 배치한다.

### 7.5 Progress and Stepper

Pacto는 캠페인과 미션의 상태 흐름이 중요하므로 단계 진행 UI를 적극 활용한다.

Use for:

- 캠페인 생성 단계
- 모집 -> 선정 -> 미션 -> 검수 -> 정산
- 미션 제출 진행
- 결제/정산 상태

Rules:

- 현재 단계는 blue, 완료 단계는 green, 막힌 단계는 red 또는 amber로 표시한다.
- 단계명은 짧게 유지한다.
- 단계 UI는 클릭 가능한 경우와 단순 표시인 경우를 시각적으로 구분한다.
- 대시보드에서는 가로 stepper나 compact timeline을, 모바일에서는 vertical 또는 swipe-friendly stepper를 우선한다.

### 7.6 Empty State

빈 상태는 단순히 "없음"을 말하지 않고, 다음에 할 수 있는 행동을 제안해야 한다.

Structure:

1. 현재 상태: 무엇이 없는지
2. 의미: 왜 비어 있는지
3. 다음 행동: 무엇을 하면 되는지

Examples:

- "아직 생성한 캠페인이 없어요. 첫 캠페인을 만들고 지원자를 모집해 보세요."
- "검수 대기 미션이 없어요. 새 제출이 들어오면 여기에서 확인할 수 있어요."
- "출금 내역이 없어요. 보상이 적립되면 출금을 신청할 수 있어요."

Design:

- Dashboard: panel 안에 compact empty state
- Blogger app: card 형태의 friendly empty state
- Empty state는 일러스트보다 텍스트와 CTA가 우선이다.

### 7.7 Toast and Inline Feedback

Toast는 완료된 짧은 피드백에만 사용한다. 사용자가 반드시 읽어야 하는 정보는 toast가 아니라 inline alert 또는 modal을 사용한다.

Toast use:

- 저장 완료
- 신청 완료
- 복사 완료
- 임시 저장 완료

Inline feedback use:

- 입력 오류
- 결제 실패
- 권한 부족
- 제출 조건 미충족

Rules:

- 성공 toast는 green 또는 blue를 사용한다.
- 실패는 toast만으로 끝내지 말고 문제가 발생한 위치 근처에 inline error를 표시한다.
- Toast duration은 `2.5-3.5s`로 유지한다.
- 중요한 금전/정산 결과는 toast와 상세 화면 상태를 함께 갱신한다.

### 7.8 Modal, Bottom Sheet, Dialog

Use modal/dialog for:

- 삭제, 취소, 반려처럼 되돌리기 어려운 행동 확인
- 결제/충전처럼 집중이 필요한 단일 작업
- 상세 검토 후 승인/반려해야 하는 업무

Use bottom sheet for mobile:

- 필터 선택
- 정렬 선택
- 캠페인 신청 조건 확인
- 미션 제출 전 체크리스트

Rules:

- 파괴적 행동은 제목에 결과를 명확히 쓴다.
- 확인 버튼은 action color를 따른다. 삭제/반려는 red.
- 취소 버튼은 항상 왼쪽 또는 secondary 위치에 둔다.
- Dialog 안에 과도한 스크롤을 만들지 않는다.

### 7.9 Campaign Card UX

Campaign card는 Pacto에서 가장 자주 재사용되는 정보 단위다.

Required information:

- 이미지 또는 브랜드/장소 시그널
- 캠페인명
- 보상
- 마감 또는 진행 상태
- 신청/검토/상세 액션

Dashboard variant:

- 더 많은 메타데이터를 보여준다.
- 상태와 운영 액션을 우측에 정렬한다.
- 이미지보다 캠페인 상태와 숫자를 우선한다.

Blogger variant:

- 이미지와 보상이 먼저 보여야 한다.
- 신청 가능 여부와 마감을 즉시 알 수 있어야 한다.
- 모바일 리스트/그리드 전환이 가능하면 정보 밀도를 다르게 조절한다.

### 7.10 Money and Trust UX

금액, 결제, 출금, 정산 화면은 Pacto 신뢰의 핵심이다.

Rules:

- 금액은 항상 가장 강한 텍스트 계층으로 보여준다.
- 금액 변경 전후에는 잔액, 잠긴 금액, 예상 차감/입금을 함께 보여준다.
- 실패 상태는 원인과 복구 행동을 함께 제시한다.
- 결제/출금 CTA 주변에는 수수료, 처리 예정일, 정산 조건을 짧게 표시한다.
- 금전 관련 성공 화면은 결과 금액과 다음 상태를 명확히 보여준다.

Examples:

- "충전 후 사용 가능 예산"
- "미션 승인 후 정산 예정"
- "출금 신청 후 영업일 기준 1-2일 내 처리"

## 8. Motion and Interaction

Pacto motion should feel fast and controlled.

- Hover lift: `translateY(-1px)` only for buttons/cards that are clearly interactive.
- Transition duration: `140-220ms`
- Easing: `cubic-bezier(0.2, 0.8, 0.2, 1)`
- Loading skeletons should use soft grey shimmer, not bright blue.
- Progress transitions can use the brand gradient to reinforce forward movement.

Avoid:

- Bouncy animation
- Slow decorative reveals
- Large parallax effects
- Motion that delays task completion

## 9. Writing Tone

Pacto copy should be short, direct, and action-oriented.

Dashboard:

- "검수 대기"
- "정산 완료"
- "캠페인 만들기"
- "지원자 승인"
- "예산 충전"

Blogger app:

- "오늘 신청 가능한 캠페인"
- "미션 제출하기"
- "예상 보상"
- "마감 전 확인하기"

Writing rules:

- Explain the next action, not the feature.
- Use Korean UI labels that are natural for product screens.
- Avoid long instructional paragraphs inside core flows.
- Empty states should tell users what happened and what they can do next.

## 10. Implementation Guide

When updating Pacto UI, follow this order:

1. Define or reuse design tokens first: color, spacing, radius, typography.
2. Update global surfaces: page background, panel, card, button, badge, input.
3. Align dashboard and blogger app to shared tokens.
4. Let each product surface keep its own density:
   - Dashboard: denser, operational, table/list-heavy.
   - Blogger app: more spacious, reward-forward, mobile-first.
5. Verify core flows at desktop and mobile widths.
6. Check that text does not overflow buttons, cards, badges, or table cells.

## 11. AI Design Command

Use this command when asking an AI agent to redesign or extend Pacto screens:

> Redesign this Pacto screen using the Pacto logo as the source of truth: a fast, rounded blue gradient symbol paired with a precise black wordmark. Keep the UI clean, operational, and trustworthy. Use blue as the primary action and progress signal, black/ink for confident hierarchy, white and soft grey for surfaces, green for success, red for failure, and warning amber for pending attention. Cards should have 8px radius, subtle borders, restrained shadows, strong typography, and clear status/action hierarchy. Dashboard screens should feel like a fast advertiser operations console. Blogger app screens should feel mobile-native, reward-forward, and creator-friendly while staying precise. Avoid decorative gradients everywhere, oversized marketing hero sections, cute styling, and unclear CTAs.

## 12. Quick Checklist

Before shipping a Pacto UI change, check:

- Does the screen clearly show the most important status or next action?
- Does blue mean action/progress consistently?
- Are success, warning, danger, and neutral states mapped correctly?
- Are cards and panels using `8px` radius and restrained shadows?
- Is the dashboard dense enough for repeated work?
- Is the blogger app clear enough for quick mobile decisions?
- Does the screen feel connected to the logo without copying it literally?
- Are text, badges, buttons, and numbers readable on small screens?
- Are floating guidance cards, notification indicators, nudges, and fixed CTAs used only when they clarify the next action?
