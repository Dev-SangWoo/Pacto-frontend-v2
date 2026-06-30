이 화면은 **“레이아웃 → 공통 UI → 도메인 컴포넌트 → 데이터”** 네 단계로 나누면 깔끔하게 구현할 수 있어.
Pacto 대행사/광고주 대시보드라고 가정하고 설계해볼게.

# 1. 전체 화면 구조

```txt
DashboardPage
├─ AppSidebar
│  ├─ BrandLogo
│  ├─ SidebarNav
│  │  └─ SidebarNavItem
│  └─ WorkspaceProfile
│     ├─ WorkspaceSelector
│     └─ UserProfile
│
└─ DashboardMain
   ├─ DashboardHeader
   │  ├─ PageTitle
   │  ├─ NotificationButton
   │  └─ CreateCampaignButton
   │
   ├─ DashboardSummary
   │  └─ StatCard × 5
   │
   └─ DashboardGrid
      ├─ CampaignOverviewCard
      │  ├─ SectionHeader
      │  ├─ CampaignFilterTabs
      │  ├─ CampaignList
      │  │  └─ CampaignListItem
      │  └─ ViewAllButton
      │
      ├─ EscrowOverviewCard
      │  ├─ SectionHeader
      │  ├─ AmountSummary
      │  ├─ DonutChart
      │  └─ ChartLegend
      │
      ├─ ContentStatusCard
      │  ├─ SectionHeader
      │  ├─ DonutChart
      │  └─ ChartLegend
      │
      ├─ BloggerOverviewCard
      │  ├─ SectionHeader
      │  ├─ AvatarStack
      │  └─ BloggerMetrics
      │
      └─ SettlementOverviewCard
         ├─ SectionHeader
         ├─ SettlementAmount
         └─ SettlementProgress
```

---

# 2. 레이아웃 설계도

## 데스크톱 구조

```txt
┌──────────────┬──────────────────────────────────────────────────────────┐
│              │ 헤더                                      알림 / 버튼   │
│              ├──────────────────────────────────────────────────────────┤
│              │ KPI 1 │ KPI 2 │ KPI 3 │ KPI 4 │ KPI 5                  │
│   Sidebar    ├────────────────────┬─────────────────┬───────────────────┤
│              │                    │                 │                   │
│              │ 캠페인 관리        │ 예산 선예치     │ 콘텐츠 진행 상태 │
│              │                    │                 │                   │
│              │                    ├─────────────────┼───────────────────┤
│              │                    │ 참여 블로거     │ 정산 진행 현황   │
│              │                    │                 │                   │
└──────────────┴────────────────────┴─────────────────┴───────────────────┘
```

## CSS Grid 구조

```css
.dashboard-layout {
  display: grid;
  grid-template-columns: 272px minmax(0, 1fr);
  min-height: 100vh;
}

.dashboard-content {
  padding: 28px 32px 40px;
  background: #f8fafc;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 18px;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: 1.25fr 1fr 1fr;
  grid-template-areas:
    "campaign escrow content"
    "campaign bloggers settlement";
  gap: 20px;
  margin-top: 24px;
}

.campaign-card {
  grid-area: campaign;
}

.escrow-card {
  grid-area: escrow;
}

.content-card {
  grid-area: content;
}

.bloggers-card {
  grid-area: bloggers;
}

.settlement-card {
  grid-area: settlement;
}
```

왼쪽 캠페인 카드는 두 줄을 차지하고, 나머지 카드 네 개가 2×2로 배치되는 구조야.

---

# 3. 공통 컴포넌트

먼저 대시보드 전용 컴포넌트를 만들기 전에 아래 공통 컴포넌트를 만들어두는 게 좋아.

| 컴포넌트        | 역할                        | 주요 Props                           |
| --------------- | --------------------------- | ------------------------------------ |
| `Card`          | 모든 카드의 공통 외형       | `children`, `className`              |
| `SectionHeader` | 카드 제목과 전체 보기       | `title`, `actionLabel`, `onAction`   |
| `StatCard`      | 상단 KPI 카드               | `icon`, `label`, `value`, `subValue` |
| `Badge`         | 진행 중, 완료, 검토 중 상태 | `variant`, `children`                |
| `ProgressBar`   | 캠페인 진행률               | `value`, `max`                       |
| `Avatar`        | 블로거 프로필 이미지        | `src`, `name`, `size`                |
| `AvatarStack`   | 여러 프로필 겹치기          | `users`, `maxVisible`                |
| `Tabs`          | 전체, 진행 중 등 필터       | `items`, `value`, `onChange`         |
| `IconButton`    | 알림, 메뉴 버튼             | `icon`, `label`, `onClick`           |
| `MoneyText`     | 원화 금액 표시              | `amount`, `size`                     |
| `DonutChart`    | 예산 및 콘텐츠 상태 차트    | `data`, `centerLabel`                |
| `ChartLegend`   | 차트 범례                   | `items`                              |
| `EmptyState`    | 데이터가 없을 때            | `title`, `description`               |
| `Skeleton`      | 로딩 상태                   | `width`, `height`                    |

## Card

```tsx
interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <section className={`rounded-2xl border bg-white shadow-sm ${className}`}>{children}</section>
  );
}
```

카드마다 border, radius, shadow를 새로 작성하면 나중에 UI가 슬금슬금 서로 다른 종족으로 진화한다. 반드시 공통화하는 게 좋다.

---

# 4. 상단 KPI 카드

이미지에서는 총 5개다.

```txt
전체 캠페인
예산 선예치
참여 블로거
진행 중 콘텐츠
정산 대기 금액
```

## 타입 설계

```ts
export interface DashboardStat {
  id: string;
  label: string;
  value: string;
  subLabel: string;
  subValue: string;
  icon: React.ReactNode;
  tone: "blue" | "green" | "purple" | "orange" | "cyan";
}
```

## 사용 예시

```tsx
<StatCard
  label="전체 캠페인"
  value="24"
  subLabel="진행 중"
  subValue="12"
  icon={<FolderIcon />}
  tone="blue"
/>
```

## StatCard 내부 구조

```txt
StatCard
├─ IconContainer
└─ StatContent
   ├─ Label
   ├─ Value
   └─ SubDescription
```

---

# 5. 캠페인 관리 카드

이 카드가 화면에서 가장 복잡하다.

```txt
CampaignOverviewCard
├─ SectionHeader
├─ CampaignFilterTabs
│  ├─ 전체 24
│  ├─ 진행 중 12
│  ├─ 대기 중 4
│  ├─ 완료 8
│  └─ 보류 0
├─ CampaignList
│  └─ CampaignListItem
│     ├─ Thumbnail
│     ├─ CampaignInformation
│     │  ├─ CampaignName
│     │  ├─ CampaignPeriod
│     │  └─ Budget
│     ├─ StatusBadge
│     └─ ProgressInformation
│        ├─ ParticipantCount
│        └─ ProgressBar
└─ ViewAllButton
```

## 캠페인 타입

```ts
export type CampaignStatus = "ACTIVE" | "REVIEWING" | "WAITING" | "COMPLETED" | "ON_HOLD";

export interface Campaign {
  id: string;
  title: string;
  thumbnailUrl: string;
  startDate: string;
  endDate: string;
  budget: number;
  status: CampaignStatus;
  completedCount: number;
  targetCount: number;
}
```

## 상태 표시 매핑

```ts
export const campaignStatusMap = {
  ACTIVE: {
    label: "진행 중",
    variant: "blue",
  },
  REVIEWING: {
    label: "검토 중",
    variant: "orange",
  },
  WAITING: {
    label: "대기 중",
    variant: "gray",
  },
  COMPLETED: {
    label: "완료",
    variant: "green",
  },
  ON_HOLD: {
    label: "보류",
    variant: "red",
  },
} as const;
```

## 진행률

```ts
const progress =
  campaign.targetCount === 0 ? 0 : (campaign.completedCount / campaign.targetCount) * 100;
```

프로그레스바에는 `6 / 10` 같은 숫자와 실제 퍼센트를 함께 전달하면 된다.

---

# 6. 예산 선예치 카드

## 구조

```txt
EscrowOverviewCard
├─ SectionHeader
├─ TotalEscrowAmount
└─ ChartArea
   ├─ DonutChart
   │  ├─ CenterPercentage
   │  └─ CenterAmount
   └─ EscrowLegend
      └─ LegendItem × 4
```

## 데이터 타입

```ts
export type EscrowStatus = "AVAILABLE" | "IN_PROGRESS" | "PENDING_SETTLEMENT" | "SETTLED";

export interface EscrowItem {
  status: EscrowStatus;
  label: string;
  amount: number;
  percentage: number;
  color: string;
}

export interface EscrowSummary {
  totalAmount: number;
  availableAmount: number;
  items: EscrowItem[];
}
```

## 예시 데이터

```ts
const escrowData: EscrowSummary = {
  totalAmount: 45_600_000,
  availableAmount: 12_850_000,
  items: [
    {
      status: "AVAILABLE",
      label: "사용 가능",
      amount: 12_850_000,
      percentage: 28,
      color: "#2563eb",
    },
    {
      status: "IN_PROGRESS",
      label: "진행 중",
      amount: 21_300_000,
      percentage: 47,
      color: "#22c55e",
    },
    {
      status: "PENDING_SETTLEMENT",
      label: "정산 대기",
      amount: 7_450_000,
      percentage: 16,
      color: "#93c5fd",
    },
    {
      status: "SETTLED",
      label: "정산 완료",
      amount: 4_000_000,
      percentage: 9,
      color: "#d1d5db",
    },
  ],
};
```

차트 라이브러리는 `Recharts`의 `PieChart`를 사용하면 구현이 편하다. 다만 중앙 텍스트는 차트 라이브러리 안에서 해결하려 하지 말고, 차트 위에 절대 위치로 얹는 게 관리하기 쉽다.

---

# 7. 콘텐츠 진행 상태 카드

예산 차트와 사실상 UI 구조가 같다.

따라서 다음처럼 재사용해야 한다.

```tsx
<DonutStatusCard
  title="콘텐츠 진행 상태"
  totalLabel="전체 콘텐츠"
  totalValue={78}
  data={contentStatusData}
/>
```

## 데이터 타입

```ts
export type ContentStatus =
  | "WRITING"
  | "SUBMITTED"
  | "REVIEWING"
  | "REVISION_REQUESTED"
  | "APPROVED";

export interface ContentStatusItem {
  status: ContentStatus;
  label: string;
  count: number;
  percentage: number;
  color: string;
}
```

```ts
const contentStatusData: ContentStatusItem[] = [
  {
    status: "WRITING",
    label: "작성 중",
    count: 18,
    percentage: 23,
    color: "#2563eb",
  },
  {
    status: "SUBMITTED",
    label: "제출 완료",
    count: 20,
    percentage: 26,
    color: "#10b981",
  },
  {
    status: "REVIEWING",
    label: "검토 중",
    count: 16,
    percentage: 21,
    color: "#fb923c",
  },
  {
    status: "REVISION_REQUESTED",
    label: "수정 요청",
    count: 8,
    percentage: 10,
    color: "#ef4444",
  },
  {
    status: "APPROVED",
    label: "승인 완료",
    count: 16,
    percentage: 20,
    color: "#e5e7eb",
  },
];
```

---

# 8. 참여 블로거 카드

## 구조

```txt
BloggerOverviewCard
├─ SectionHeader
├─ AvatarStack
└─ MetricGrid
   ├─ 신규 참여
   ├─ 활성 블로거
   └─ 리뷰어 평균 등급
```

## 타입

```ts
export interface BloggerPreview {
  id: string;
  name: string;
  profileImageUrl: string;
}

export interface BloggerSummary {
  bloggers: BloggerPreview[];
  totalCount: number;
  newCount: number;
  activeCount: number;
  averageRating: number;
}
```

## AvatarStack

```tsx
interface AvatarStackProps {
  users: BloggerPreview[];
  totalCount: number;
  maxVisible?: number;
}
```

렌더링 방식은 다음과 같다.

```txt
[프로필][프로필][프로필][프로필][프로필][+63]
```

각 아바타에 다음 CSS를 적용하면 된다.

```css
.avatar-stack-item {
  margin-left: -10px;
  border: 3px solid white;
}
```

---

# 9. 정산 진행 현황 카드

## 구조

```txt
SettlementOverviewCard
├─ SectionHeader
├─ SettlementAmount
│  ├─ Label
│  ├─ Amount
│  └─ CampaignCount
└─ SettlementTimeline
   ├─ SettlementStep
   │  ├─ StepIcon
   │  ├─ StepLabel
   │  ├─ Amount
   │  └─ Count
   ├─ ConnectorLine
   ├─ SettlementStep
   ├─ ConnectorLine
   └─ SettlementStep
```

## 타입

```ts
export type SettlementStatus = "WAITING" | "PROCESSING" | "COMPLETED";

export interface SettlementStep {
  status: SettlementStatus;
  label: string;
  amount: number;
  campaignCount: number;
  active: boolean;
}

export interface SettlementSummary {
  pendingAmount: number;
  pendingCampaignCount: number;
  steps: SettlementStep[];
}
```

## 컴포넌트 예시

```tsx
<SettlementProgress
  steps={[
    {
      status: "WAITING",
      label: "정산 대기",
      amount: 15_750_000,
      campaignCount: 7,
      active: true,
    },
    {
      status: "PROCESSING",
      label: "정산 진행 중",
      amount: 8_120_000,
      campaignCount: 3,
      active: false,
    },
    {
      status: "COMPLETED",
      label: "정산 완료",
      amount: 23_680_000,
      campaignCount: 11,
      active: false,
    },
  ]}
/>
```

---

# 10. 사이드바 설계

## 메뉴 데이터

사이드바 메뉴를 JSX로 하나씩 박아 넣지 말고 배열로 관리하는 게 좋다.

```ts
export const dashboardNavigation = [
  {
    label: "대시보드",
    href: "/dashboard",
    icon: "home",
  },
  {
    label: "캠페인 관리",
    href: "/campaigns",
    icon: "campaign",
  },
  {
    label: "블로거 관리",
    href: "/bloggers",
    icon: "users",
  },
  {
    label: "예산 관리",
    href: "/budgets",
    icon: "budget",
  },
  {
    label: "콘텐츠 관리",
    href: "/contents",
    icon: "content",
  },
  {
    label: "정산 관리",
    href: "/settlements",
    icon: "settlement",
  },
  {
    label: "리포트",
    href: "/reports",
    icon: "chart",
  },
  {
    label: "메시지",
    href: "/messages",
    icon: "message",
  },
  {
    label: "설정",
    href: "/settings",
    icon: "settings",
  },
] as const;
```

## 사이드바 컴포넌트 구조

```txt
AppSidebar
├─ SidebarBrand
├─ SidebarNavigation
│  └─ SidebarItem
├─ Spacer
└─ SidebarAccountCard
   ├─ WorkspaceSelector
   ├─ Divider
   └─ UserProfileMenu
```

---

# 11. 최종 대시보드 데이터 타입

페이지에서 각각 따로 요청하기보다는 첫 진입 시 하나의 대시보드 집계 API를 받는 게 좋다.

```ts
export interface DashboardData {
  stats: {
    totalCampaigns: number;
    activeCampaigns: number;

    totalEscrowAmount: number;
    availableEscrowAmount: number;

    totalBloggers: number;
    activeBloggers: number;

    activeContents: number;
    totalContents: number;

    pendingSettlementAmount: number;
    pendingSettlementCampaigns: number;
  };

  campaigns: Campaign[];

  escrow: EscrowSummary;

  contentStatus: ContentStatusItem[];

  bloggers: BloggerSummary;

  settlements: SettlementSummary;
}
```

## API 예시

```txt
GET /api/dashboard
```

```json
{
  "stats": {
    "totalCampaigns": 24,
    "activeCampaigns": 12,
    "totalEscrowAmount": 45600000,
    "availableEscrowAmount": 12850000,
    "totalBloggers": 68,
    "activeBloggers": 58,
    "activeContents": 36,
    "totalContents": 78,
    "pendingSettlementAmount": 15750000,
    "pendingSettlementCampaigns": 7
  },
  "campaigns": [],
  "escrow": {},
  "contentStatus": [],
  "bloggers": {},
  "settlements": {}
}
```

대시보드 하나를 띄우는데 API를 5~6번 호출하면 로딩 상태와 에러 처리가 귀찮아진다. 초기 화면은 집계 API 하나로 받고, 이후 새로고침이 필요한 카드만 개별 API로 분리하는 방식이 적당하다.

---

# 12. Next.js 폴더 구조

```txt
src
├─ app
│  └─ (dashboard)
│     ├─ layout.tsx
│     └─ dashboard
│        ├─ page.tsx
│        ├─ loading.tsx
│        └─ error.tsx
│
├─ components
│  ├─ ui
│  │  ├─ card.tsx
│  │  ├─ badge.tsx
│  │  ├─ button.tsx
│  │  ├─ tabs.tsx
│  │  ├─ avatar.tsx
│  │  ├─ progress-bar.tsx
│  │  └─ skeleton.tsx
│  │
│  └─ layout
│     ├─ app-sidebar.tsx
│     ├─ sidebar-nav-item.tsx
│     ├─ dashboard-header.tsx
│     └─ workspace-profile.tsx
│
├─ features
│  └─ dashboard
│     ├─ components
│     │  ├─ dashboard-summary.tsx
│     │  ├─ stat-card.tsx
│     │  ├─ campaign-overview-card.tsx
│     │  ├─ campaign-list-item.tsx
│     │  ├─ escrow-overview-card.tsx
│     │  ├─ content-status-card.tsx
│     │  ├─ blogger-overview-card.tsx
│     │  ├─ settlement-overview-card.tsx
│     │  ├─ donut-chart.tsx
│     │  └─ chart-legend.tsx
│     ├─ api
│     │  └─ get-dashboard.ts
│     ├─ mocks
│     │  └─ dashboard.mock.ts
│     ├─ types
│     │  └─ dashboard.types.ts
│     └─ utils
│        └─ dashboard.mapper.ts
│
└─ lib
   ├─ format-currency.ts
   ├─ format-date.ts
   └─ cn.ts
```

---

# 13. DashboardPage 조립 예시

```tsx
export default async function DashboardPage() {
  const dashboard = await getDashboard();

  return (
    <div className="space-y-6">
      <DashboardHeader />

      <DashboardSummary stats={dashboard.stats} />

      <div className="dashboard-grid">
        <CampaignOverviewCard className="campaign-card" campaigns={dashboard.campaigns} />

        <EscrowOverviewCard className="escrow-card" escrow={dashboard.escrow} />

        <ContentStatusCard className="content-card" data={dashboard.contentStatus} />

        <BloggerOverviewCard className="bloggers-card" data={dashboard.bloggers} />

        <SettlementOverviewCard className="settlement-card" data={dashboard.settlements} />
      </div>
    </div>
  );
}
```

`page.tsx`에서는 조립만 하고, 카드 내부 마크업이나 계산 로직은 넣지 않는 게 핵심이다.

---

# 14. 디자인 토큰

이미지와 비슷한 느낌으로 잡으면 다음 정도다.

```css
:root {
  --color-primary: #1f6bff;
  --color-primary-light: #eaf1ff;

  --color-success: #20b982;
  --color-warning: #ff922b;
  --color-danger: #ef4444;

  --color-text-primary: #182033;
  --color-text-secondary: #697386;
  --color-text-muted: #98a2b3;

  --color-border: #e7eaf0;
  --color-background: #f8fafc;
  --color-surface: #ffffff;

  --radius-card: 16px;
  --radius-button: 10px;

  --shadow-card: 0 1px 2px rgba(16, 24, 40, 0.03), 0 4px 12px rgba(16, 24, 40, 0.04);
}
```

## 주요 크기

```txt
사이드바 너비: 272px
콘텐츠 최대 너비: 제한 없음 또는 1600px
메인 좌우 패딩: 32px
카드 내부 패딩: 20~24px
카드 간격: 18~20px
카드 둥글기: 16px
상단 KPI 카드 높이: 약 130px
본문 카드 최소 높이: 약 280px
```

---

# 15. 반응형 설계

## 1280px 이하

```css
@media (max-width: 1280px) {
  .summary-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .dashboard-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-template-areas:
      "campaign campaign"
      "escrow content"
      "bloggers settlement";
  }
}
```

## 768px 이하

```css
@media (max-width: 768px) {
  .dashboard-layout {
    display: block;
  }

  .app-sidebar {
    display: none;
  }

  .dashboard-content {
    padding: 20px 16px;
  }

  .summary-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .dashboard-grid {
    grid-template-columns: 1fr;
    grid-template-areas:
      "campaign"
      "escrow"
      "content"
      "bloggers"
      "settlement";
  }
}
```

모바일에서는 사이드바를 없애는 것이 아니라 햄버거 버튼으로 열리는 `Drawer` 형태로 바꾸면 된다.

---

# 16. 상태 관리 기준

전역 상태 관리 도구를 처음부터 마구 투입할 필요는 없다.

```txt
서버에서 가져오는 데이터
→ Server Component 또는 React Query

캠페인 탭 필터
→ useState

사이드바 접힘 상태
→ Context 또는 Zustand

알림 개수
→ 서버 상태

캠페인 생성 모달
→ useState 또는 URL searchParams
```

캠페인 필터를 선택했을 때:

```tsx
const [status, setStatus] = useState<CampaignStatus | "ALL">("ALL");

const filteredCampaigns =
  status === "ALL" ? campaigns : campaigns.filter((campaign) => campaign.status === status);
```

---

# 17. 구현 순서

이 순서로 만들면 중간에 구조를 갈아엎을 가능성이 적다.

```txt
1. 디자인 토큰 설정
2. AppSidebar + DashboardLayout
3. Card, Badge, ProgressBar 등 공통 UI
4. DashboardHeader
5. StatCard 5개
6. CampaignOverviewCard
7. 공통 DonutChart
8. EscrowOverviewCard
9. ContentStatusCard
10. BloggerOverviewCard
11. SettlementOverviewCard
12. Mock 데이터 연결
13. 실제 API 연결
14. 로딩·에러·빈 상태
15. 반응형 처리
```

핵심은 **카드별로 바로 만들기 전에 `Card`, `SectionHeader`, `Badge`, `DonutChart`, `ChartLegend`를 먼저 공통화하는 것**이다. 이 구조대로 가면 화면은 5개 카드지만 실제 개발 난이도는 공통 컴포넌트 조립 수준으로 내려간다.
