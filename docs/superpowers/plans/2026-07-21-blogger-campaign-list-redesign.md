# Blogger Campaign List Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the blogger `/campaigns` screen as a compact mobile campaign discovery list with a working search app bar, promotional banner, category chips, decision-friendly metrics, mission summaries, and accessible CTAs.

**Architecture:** Keep the existing server component/API data flow and route destinations. Add pure campaign discovery presentation policies to `@pacto/utils`, filter URL search on the server, keep category selection local to `CampaignExplorer`, and limit all new tokens and layout styles to the campaign discovery screen and `/campaigns` app-bar state.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, CSS, Lucide React, Vitest, pnpm.

## Global Constraints

- Only redesign `/campaigns`; do not change the visual system of missions, wallet, profile, login, or campaign detail screens.
- Keep existing API requests, session cookies, server actions, and `/campaigns/[campaignId]` navigation.
- Use `#1478F5` primary, `#0967DD` pressed, `#F0F6FF` promotion, `#F3F7FF` mission, `#182033` text, `#8A94A6` secondary, `#A9B2C0` inactive, `#E8EDF3` border, `#4798FF` new, `#36C995` active, `#FFB85C` closing, and `#FF4D5E` notification.
- Use the existing Pretendard font stack.
- Do not show a fake favorite control or a fake `신규` badge; the current API has neither favorite state nor campaign creation time.
- Use the provided `assets/woman-social-tablet-hd-transparent-refined.png` as the promotion illustration.
- Keep icon and CTA hit areas at least 44×44px and ensure the last CTA scrolls above the fixed bottom navigation.
- Preserve unrelated user changes already present in the worktree.

## File Map

- Create `packages/utils/src/campaign/discovery.ts`: pure category, search, badge, and copy policies.
- Create `packages/utils/src/campaign/discovery.test.ts`: unit coverage for the presentation policies.
- Modify `packages/utils/src/index.ts`: export the discovery policies and types.
- Modify `apps/blogger/app/(main)/campaigns/page.tsx`: read `q`, filter server data, and pass the active query.
- Modify `apps/blogger/app/_components/app-nav.tsx`: campaign-route title, notification dot, and expandable GET search form.
- Modify `apps/blogger/app/_components/campaign-explorer.tsx`: banner, chips, list cards, mission panel, and accessible empty state.
- Modify `apps/blogger/app/globals.css`: scoped campaign design tokens and responsive layout.
- Create `apps/blogger/public/illustrations/woman-social-tablet-hd-transparent-refined.png`: web-served copy of the approved source asset.

---

### Task 1: Campaign discovery presentation policies

**Files:**

- Create: `packages/utils/src/campaign/discovery.test.ts`
- Create: `packages/utils/src/campaign/discovery.ts`
- Modify: `packages/utils/src/index.ts`

**Interfaces:**

- Consumes: `Campaign` from `@pacto/types`.
- Produces: `CAMPAIGN_DISCOVERY_CATEGORIES`, `CampaignDiscoveryCategory`, `getCampaignDiscoveryBadge(campaign, now?)`, `getCampaignSummaryText(guidelines)`, `matchesCampaignDiscoveryCategory(campaign, category)`, and `matchesCampaignSearch(campaign, query)`.

- [ ] **Step 1: Write the failing policy tests**

```ts
import { describe, expect, it } from "vitest";

import type { Campaign } from "@pacto/types";

import {
  getCampaignDiscoveryBadge,
  getCampaignSummaryText,
  matchesCampaignDiscoveryCategory,
  matchesCampaignSearch,
} from "./discovery";

const campaign: Campaign = {
  id: 1,
  advertiserId: 7,
  brandName: "성수 브런치",
  title: "주말 카페 리뷰 체험단",
  thumbnailUrl: "/campaigns/seongsu-brunch-cafe.webp",
  rewardPoint: 80000,
  recruitCount: 50,
  approvedCount: 12,
  applicantCount: 23,
  totalSlots: 50,
  remainingSlots: 38,
  guidelines:
    "매장 방문 후 사진 10장과 1,500자 이상의 블로그 리뷰를 작성해 주세요.\n필수 키워드를 포함해 주세요.",
  deadline: "2026-07-27T23:59:59",
  status: "open",
};

describe("campaign discovery presentation", () => {
  it("마감까지 7일 이하면 마감 임박 배지를 반환한다", () => {
    expect(getCampaignDiscoveryBadge(campaign, new Date("2026-07-21T00:00:00+09:00"))).toEqual({
      label: "마감 임박",
      tone: "closing",
    });
  });

  it("마감 임박이 아니면 진행중 배지를 반환한다", () => {
    expect(
      getCampaignDiscoveryBadge(
        { ...campaign, deadline: "2026-08-20T23:59:59" },
        new Date("2026-07-21T00:00:00+09:00"),
      ),
    ).toEqual({ label: "진행중", tone: "active" });
  });

  it("가이드 첫 문장을 카드 설명으로 정리한다", () => {
    expect(getCampaignSummaryText(campaign.guidelines)).toBe(
      "매장 방문 후 사진 10장과 1,500자 이상의 블로그 리뷰를 작성해 주세요.",
    );
  });

  it("빈 가이드는 안전한 기본 미션 문구를 반환한다", () => {
    expect(getCampaignSummaryText("  ")).toBe("캠페인 상세에서 수행 미션을 확인해 주세요.");
  });

  it("푸드 키워드로 카테고리를 분류한다", () => {
    expect(matchesCampaignDiscoveryCategory(campaign, "푸드")).toBe(true);
    expect(matchesCampaignDiscoveryCategory(campaign, "뷰티")).toBe(false);
  });

  it("제목, 브랜드, 가이드에서 대소문자 구분 없이 검색한다", () => {
    expect(matchesCampaignSearch(campaign, "브런치")).toBe(true);
    expect(matchesCampaignSearch(campaign, "1,500자")).toBe(true);
    expect(matchesCampaignSearch(campaign, "노트북")).toBe(false);
  });
});
```

- [ ] **Step 2: Run the test and confirm the red state**

Run: `pnpm.cmd test -- packages/utils/src/campaign/discovery.test.ts`

Expected: FAIL because `./discovery` does not exist.

- [ ] **Step 3: Implement the minimal pure policies**

```ts
import type { Campaign } from "@pacto/types";

export const CAMPAIGN_DISCOVERY_CATEGORIES = [
  "전체",
  "일상·리뷰",
  "여행",
  "뷰티",
  "푸드",
  "IT·기기",
] as const;

export type CampaignDiscoveryCategory = (typeof CAMPAIGN_DISCOVERY_CATEGORIES)[number];

export type CampaignDiscoveryBadge = {
  label: "진행중" | "마감 임박";
  tone: "active" | "closing";
};

const CATEGORY_KEYWORDS: Record<Exclude<CampaignDiscoveryCategory, "전체">, string[]> = {
  "일상·리뷰": ["일상", "리뷰", "체험", "후기", "블로그"],
  여행: ["여행", "숙박", "호텔", "펜션", "관광", "지역"],
  뷰티: ["뷰티", "네일", "헤어", "살롱", "화장품", "미용", "스킨케어"],
  푸드: ["맛집", "식당", "카페", "브런치", "디저트", "푸드", "외식"],
  "IT·기기": ["IT", "기기", "노트북", "태블릿", "스마트폰", "가전", "디지털"],
};

const CLOSING_WINDOW_MS = 7 * 24 * 60 * 60 * 1000;
const FALLBACK_MISSION_COPY = "캠페인 상세에서 수행 미션을 확인해 주세요.";

export function getCampaignDiscoveryBadge(
  campaign: Campaign,
  now = new Date(),
): CampaignDiscoveryBadge {
  const deadlineMs = new Date(campaign.deadline).getTime();
  const remainingMs = deadlineMs - now.getTime();

  if (Number.isFinite(deadlineMs) && remainingMs >= 0 && remainingMs <= CLOSING_WINDOW_MS) {
    return { label: "마감 임박", tone: "closing" };
  }

  return { label: "진행중", tone: "active" };
}

export function getCampaignSummaryText(guidelines: string): string {
  const normalized = guidelines.replace(/\s+/g, " ").trim();

  if (!normalized) {
    return FALLBACK_MISSION_COPY;
  }

  const firstSentence = normalized.match(/^.*?[.!?](?:\s|$)/)?.[0]?.trim();
  return firstSentence ?? normalized;
}

export function matchesCampaignDiscoveryCategory(
  campaign: Campaign,
  category: CampaignDiscoveryCategory,
): boolean {
  if (category === "전체") {
    return true;
  }

  const haystack = `${campaign.title} ${campaign.brandName} ${campaign.guidelines}`.toLowerCase();
  return CATEGORY_KEYWORDS[category].some((keyword) => haystack.includes(keyword.toLowerCase()));
}

export function matchesCampaignSearch(campaign: Campaign, query: string): boolean {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return true;
  }

  return [campaign.title, campaign.brandName, campaign.guidelines].some((value) =>
    value.toLowerCase().includes(normalizedQuery),
  );
}
```

Export the policies from `packages/utils/src/index.ts`:

```ts
export {
  CAMPAIGN_DISCOVERY_CATEGORIES,
  getCampaignDiscoveryBadge,
  getCampaignSummaryText,
  matchesCampaignDiscoveryCategory,
  matchesCampaignSearch,
} from "./campaign/discovery";
export type { CampaignDiscoveryBadge, CampaignDiscoveryCategory } from "./campaign/discovery";
```

- [ ] **Step 4: Run focused tests and typecheck**

Run: `pnpm.cmd test -- packages/utils/src/campaign/discovery.test.ts`

Expected: 6 tests PASS.

Run: `pnpm.cmd --filter @pacto/utils typecheck`

Expected: exit code 0.

- [ ] **Step 5: Commit the policy unit**

```powershell
git add -- packages/utils/src/campaign/discovery.ts packages/utils/src/campaign/discovery.test.ts packages/utils/src/index.ts
git commit -m "feat(blogger): 캠페인 탐색 표시 정책 추가"
```

### Task 2: Server search and approved illustration

**Files:**

- Modify: `apps/blogger/app/(main)/campaigns/page.tsx:8-34`
- Create: `apps/blogger/public/illustrations/woman-social-tablet-hd-transparent-refined.png`

**Interfaces:**

- Consumes: `matchesCampaignSearch(campaign, query)` from Task 1.
- Produces: a server-filtered campaign array and public asset URL `/illustrations/woman-social-tablet-hd-transparent-refined.png`.

- [ ] **Step 1: Add URL search filtering to the server page**

Add this prop type and update the page signature:

```ts
type CampaignsPageProps = {
  searchParams?: Promise<{ q?: string }>;
};

export default async function CampaignsPage({ searchParams }: CampaignsPageProps) {
  const params = await searchParams;
  const searchQuery = params?.q?.trim() ?? "";
  // existing session and API load
}
```

Import `matchesCampaignSearch` from `@pacto/utils` and filter after `isCurrentlyApplicableCampaign`:

```ts
campaigns: campaigns
  .filter(isCurrentlyApplicableCampaign)
  .filter((campaign) => matchesCampaignSearch(campaign, searchQuery)),
```

- [ ] **Step 2: Copy the approved binary asset to the public path**

Run:

```powershell
Copy-Item -LiteralPath 'assets\woman-social-tablet-hd-transparent-refined.png' -Destination 'apps\blogger\public\illustrations\woman-social-tablet-hd-transparent-refined.png'
```

Expected: the destination exists and retains its transparent PNG dimensions.

- [ ] **Step 3: Typecheck the blogger app**

Run: `pnpm.cmd --filter @pacto/blogger typecheck`

Expected: exit code 0.

- [ ] **Step 4: Commit server search and asset**

```powershell
git add -- 'apps/blogger/app/(main)/campaigns/page.tsx' 'apps/blogger/public/illustrations/woman-social-tablet-hd-transparent-refined.png'
git commit -m "feat(blogger): 캠페인 검색과 프로모션 이미지 연결"
```

### Task 3: Campaign discovery list component

**Files:**

- Modify: `apps/blogger/app/_components/campaign-explorer.tsx:1-252`

**Interfaces:**

- Consumes: Task 1 discovery policies, `Campaign[]`, `loadErrorMessage?: string`, and `searchQuery: string`.
- Produces: a single-column `campaign-discovery-screen` with banner, category filter, campaign cards, empty/error state, and route links.

- [ ] **Step 1: Replace explorer state and imports**

Use `Coins`, `CalendarClock`, `ChevronRight`, and `UsersRound` from Lucide. Remove view-mode, localStorage notice, and `useEffect`. Set props and state to:

```ts
type CampaignExplorerProps = {
  campaigns: Campaign[];
  loadErrorMessage?: string;
  searchQuery: string;
};

export function CampaignExplorer({
  campaigns,
  loadErrorMessage,
  searchQuery,
}: CampaignExplorerProps) {
  const [selectedCategory, setSelectedCategory] = useState<CampaignDiscoveryCategory>("전체");
  const filteredCampaigns = campaigns.filter((campaign) =>
    matchesCampaignDiscoveryCategory(campaign, selectedCategory),
  );
```

Update the page render at the same time so the query becomes visible to the client component:

```tsx
<CampaignExplorer
  campaigns={campaignResult.campaigns}
  loadErrorMessage={campaignResult.errorMessage}
  searchQuery={searchQuery}
/>
```

- [ ] **Step 2: Render the promotion and campaign header**

Use semantic markup with the approved copy and asset:

```tsx
<section className="campaign-promotion" aria-label="블로거 캠페인 안내">
  <div className="campaign-promotion-copy">
    <p>내 블로그로</p>
    <p>브랜드를 소개하고</p>
    <strong>보상을 받아보세요!</strong>
  </div>
  <img
    alt=""
    aria-hidden="true"
    className="campaign-promotion-image"
    src="/illustrations/woman-social-tablet-hd-transparent-refined.png"
  />
</section>

<div className="campaign-recommendation-heading">
  <h1 id="campaigns-title">추천 캠페인</h1>
  <Link href="/campaigns">전체 보기 <ChevronRight aria-hidden="true" size={15} /></Link>
</div>
```

When `searchQuery` is non-empty, show a compact line under the heading: `“{searchQuery}” 검색 결과 {campaigns.length}개`.

- [ ] **Step 3: Render the accessible single-select chips**

```tsx
<div className="campaign-category-list" aria-label="캠페인 카테고리">
  {CAMPAIGN_DISCOVERY_CATEGORIES.map((category) => (
    <button
      aria-pressed={selectedCategory === category}
      className={selectedCategory === category ? "selected" : undefined}
      key={category}
      onClick={() => setSelectedCategory(category)}
      type="button"
    >
      {category}
    </button>
  ))}
</div>
```

- [ ] **Step 4: Replace the old ticket with the campaign card**

For each campaign, calculate:

```ts
const badge = getCampaignDiscoveryBadge(campaign);
const missionCopy = getCampaignSummaryText(campaign.guidelines);
const thumbnailUrl = campaign.thumbnailUrl ?? getFallbackThumbnail(campaign.id);
const totalSlots = campaign.totalSlots || campaign.recruitCount;
```

Render:

```tsx
<article className="campaign-list-card">
  <div className="campaign-card-summary">
    <Link className="campaign-card-image-link" href={`/campaigns/${campaign.id}`}>
      <img
        alt={`${campaign.title} 대표 이미지`}
        decoding="async"
        fetchPriority={isPriority ? "high" : "auto"}
        loading={isPriority ? "eager" : "lazy"}
        src={thumbnailUrl}
      />
    </Link>
    <div className="campaign-card-content">
      <div className="campaign-card-title-row">
        <span className={`campaign-discovery-badge ${badge.tone}`}>{badge.label}</span>
        <Link href={`/campaigns/${campaign.id}`}>{campaign.title}</Link>
      </div>
      <p className="campaign-card-description">{missionCopy}</p>
      <dl className="campaign-card-metrics">
        <div>
          <dt>
            <Coins aria-hidden="true" size={15} />
            보상 금액
          </dt>
          <dd>{formatPoint(campaign.rewardPoint)}</dd>
        </div>
        <div>
          <dt>
            <CalendarClock aria-hidden="true" size={15} />
            마감까지
          </dt>
          <dd>{formatDeadlineDday(campaign.deadline)}</dd>
        </div>
        <div>
          <dt>
            <UsersRound aria-hidden="true" size={15} />
            신청 현황
          </dt>
          <dd>
            {campaign.applicantCount}/{totalSlots}
          </dd>
        </div>
      </dl>
    </div>
  </div>
  <div className="campaign-mission-panel">
    <p>
      <strong>미션:</strong> {missionCopy}
    </p>
    <Link href={`/campaigns/${campaign.id}`}>신청하기</Link>
  </div>
</article>
```

- [ ] **Step 5: Implement error and empty states**

Keep the API failure text and use these explicit branches. Do not render the old floating localStorage notice.

```tsx
{
  loadErrorMessage != null ? (
    <div className="campaign-discovery-empty" role="alert">
      <strong>캠페인 목록을 불러오지 못했어요</strong>
      <p>{loadErrorMessage}</p>
    </div>
  ) : filteredCampaigns.length > 0 ? (
    <div className="campaign-card-list">
      {filteredCampaigns.map((campaign, index) => (
        <CampaignCard campaign={campaign} isPriority={index < 2} key={campaign.id} />
      ))}
    </div>
  ) : (
    <div className="campaign-discovery-empty">
      <strong>조건에 맞는 캠페인이 없어요</strong>
      <p>검색어나 카테고리를 바꿔 다시 확인해 주세요.</p>
      {searchQuery ? (
        <Link href="/campaigns">전체 캠페인 보기</Link>
      ) : (
        <button onClick={() => setSelectedCategory("전체")} type="button">
          전체 카테고리 보기
        </button>
      )}
    </div>
  );
}
```

- [ ] **Step 6: Typecheck the integrated component**

Run: `pnpm.cmd --filter @pacto/blogger typecheck`

Expected: exit code 0.

- [ ] **Step 7: Commit the campaign component**

```powershell
git add -- 'apps/blogger/app/_components/campaign-explorer.tsx' 'apps/blogger/app/(main)/campaigns/page.tsx'
git commit -m "feat(blogger): 캠페인 탐색 목록 구조 개편"
```

### Task 4: Campaign-route app bar and working search

**Files:**

- Modify: `apps/blogger/app/_components/app-nav.tsx:1-93`

**Interfaces:**

- Consumes: `usePathname()`, `useSearchParams()`, and the existing notification count.
- Produces: campaign-only title/search state while preserving existing navigation on other routes.

- [ ] **Step 1: Add campaign-specific start content**

In `AppHeaderStart`, when `pathname === "/campaigns"`, render:

```tsx
<Link className="campaign-app-title" href="/campaigns" aria-label="Pacto 캠페인 홈">
  <span className="campaign-app-mark" aria-hidden="true">
    <img src="/brand/logo-bg-rm-cropped.webp" alt="" />
  </span>
  <strong>캠페인</strong>
</Link>
```

Keep the existing back button and full brand block for all other paths.

- [ ] **Step 2: Add the functional campaign search control**

Add `Search` to Lucide imports and `useEffect`, `useRef`, `useState` to React imports. In `TopActions`, derive `isCampaignHome`, keep `isSearchOpen`, and focus the input after opening:

```ts
const pathname = usePathname();
const searchParams = useSearchParams();
const isCampaignHome = pathname === "/campaigns";
const [isSearchOpen, setIsSearchOpen] = useState(false);
const searchInputRef = useRef<HTMLInputElement>(null);

useEffect(() => {
  if (isSearchOpen) searchInputRef.current?.focus();
}, [isSearchOpen]);
```

Render a 44px search toggle only on campaign home:

```tsx
<button
  aria-expanded={isSearchOpen}
  aria-label="캠페인 검색 열기"
  className="icon-button campaign-search-toggle"
  onClick={() => setIsSearchOpen((open) => !open)}
  type="button"
>
  <Search aria-hidden="true" size={22} strokeWidth={2} />
</button>
```

When open, render an absolute app-bar search panel:

```tsx
<form action="/campaigns" className="campaign-header-search" method="get">
  <Search aria-hidden="true" size={18} />
  <input
    aria-label="캠페인 검색어"
    defaultValue={searchParams.get("q") ?? ""}
    name="q"
    placeholder="캠페인명, 브랜드, 미션 검색"
    ref={searchInputRef}
    type="search"
  />
  <button type="submit">검색</button>
</form>
```

On non-campaign routes, preserve the current profile link.

- [ ] **Step 3: Use the red notification dot on campaign home**

When `isCampaignHome && hasNotifications`, render an empty decorative dot plus a screen-reader label instead of the numeric badge. Keep the numeric badge on other routes.

- [ ] **Step 4: Typecheck and lint the app bar**

Run: `pnpm.cmd --filter @pacto/blogger typecheck`

Expected: exit code 0.

Run: `pnpm.cmd lint -- apps/blogger/app/_components/app-nav.tsx`

Expected: exit code 0.

- [ ] **Step 5: Commit the app bar unit**

```powershell
git add -- 'apps/blogger/app/_components/app-nav.tsx'
git commit -m "feat(blogger): 캠페인 앱바 검색 추가"
```

### Task 5: Scoped campaign visual system

**Files:**

- Modify: `apps/blogger/app/globals.css:102-210,249-360,830-1210,2014-2060,2442-2570`

**Interfaces:**

- Consumes: class names produced by Tasks 3 and 4.
- Produces: 430px and 360px mobile layouts without changing non-campaign screen selectors.

- [ ] **Step 1: Add scoped tokens and screen rhythm**

```css
.campaign-discovery-screen {
  --campaign-primary: #1478f5;
  --campaign-primary-pressed: #0967dd;
  --campaign-promotion: #f0f6ff;
  --campaign-mission: #f3f7ff;
  --campaign-text: #182033;
  --campaign-muted: #8a94a6;
  --campaign-inactive: #a9b2c0;
  --campaign-border: #e8edf3;
  --campaign-active: #36c995;
  --campaign-closing: #ffb85c;
  display: grid;
  gap: 20px;
  padding-top: 8px;
  padding-bottom: calc(var(--bottom-nav-height) + var(--bottom-nav-gap) + 36px);
  color: var(--campaign-text);
}
```

- [ ] **Step 2: Style the 112px promotion slot and illustration fit**

```css
.campaign-promotion {
  position: relative;
  height: 112px;
  overflow: hidden;
  border-radius: 12px;
  background: linear-gradient(100deg, #f4f8ff, #e9f2ff);
}

.campaign-promotion-copy {
  position: absolute;
  top: 18px;
  left: 16px;
  z-index: 1;
  display: grid;
  max-width: 52%;
  color: #182033;
  font-size: 17px;
  font-weight: 700;
  line-height: 26px;
}

.campaign-promotion-image {
  position: absolute;
  right: 4px;
  bottom: 0;
  width: 50%;
  height: 100%;
  object-fit: contain;
  object-position: right bottom;
}
```

- [ ] **Step 3: Style headings and scrollable chips**

```css
.campaign-recommendation-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.campaign-recommendation-heading h1 {
  color: var(--campaign-text);
  font-size: 18px;
  font-weight: 700;
  line-height: 24px;
}

.campaign-recommendation-heading a {
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  color: var(--campaign-muted);
  font-size: 12px;
  font-weight: 500;
}

.campaign-search-summary {
  margin-top: -12px;
  color: var(--campaign-muted);
  font-size: 12px;
  line-height: 18px;
}

.campaign-category-list {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  margin-top: -8px;
  padding-bottom: 2px;
  scrollbar-width: none;
}

.campaign-category-list::-webkit-scrollbar {
  display: none;
}

.campaign-category-list button {
  height: 30px;
  flex: 0 0 auto;
  border: 1px solid var(--campaign-border);
  border-radius: 999px;
  background: #fff;
  padding: 0 13px;
  color: var(--campaign-muted);
  font-size: 13px;
  font-weight: 600;
  line-height: 18px;
}

.campaign-category-list button.selected {
  border-color: var(--campaign-primary);
  background: var(--campaign-primary);
  color: #fff;
}
```

- [ ] **Step 4: Style the card summary, metrics, and mission panel**

```css
.campaign-card-list {
  display: grid;
  gap: 24px;
}

.campaign-list-card {
  display: grid;
  gap: 12px;
  border-bottom: 1px solid #f2f4f7;
  background: #fff;
  padding-bottom: 24px;
}

.campaign-card-summary {
  display: grid;
  grid-template-columns: 80px minmax(0, 1fr);
  gap: 12px;
}

.campaign-card-image-link,
.campaign-card-image-link img {
  display: block;
  width: 80px;
  height: 80px;
  border-radius: 8px;
}

.campaign-card-image-link img {
  object-fit: cover;
}

.campaign-card-content {
  display: grid;
  min-width: 0;
  gap: 4px;
}

.campaign-card-title-row {
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 7px;
}

.campaign-card-title-row a {
  overflow: hidden;
  min-width: 0;
  color: var(--campaign-text);
  font-size: 14px;
  font-weight: 700;
  line-height: 20px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.campaign-discovery-badge {
  flex: 0 0 auto;
  border-radius: 4px;
  padding: 2px 6px;
  color: #fff;
  font-size: 10px;
  font-weight: 600;
  line-height: 16px;
}

.campaign-discovery-badge.active {
  background: var(--campaign-active);
}

.campaign-discovery-badge.closing {
  background: var(--campaign-closing);
}

.campaign-card-description {
  display: -webkit-box;
  overflow: hidden;
  color: var(--campaign-muted);
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.campaign-card-metrics {
  display: grid;
  grid-template-columns: 1.2fr 1fr 1fr;
  gap: 8px;
  margin-top: 6px;
}

.campaign-card-metrics div {
  display: grid;
  min-width: 0;
  gap: 1px;
}

.campaign-card-metrics dt {
  display: flex;
  align-items: center;
  gap: 3px;
  color: var(--campaign-muted);
  font-size: 10px;
  font-weight: 500;
  line-height: 14px;
}

.campaign-card-metrics dd {
  overflow: hidden;
  color: var(--campaign-text);
  font-size: 15px;
  font-weight: 700;
  line-height: 20px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.campaign-mission-panel {
  display: grid;
  gap: 8px;
  border-radius: 10px;
  background: var(--campaign-mission);
  padding: 8px;
}

.campaign-mission-panel p {
  display: -webkit-box;
  overflow: hidden;
  color: var(--campaign-text);
  font-size: 12px;
  font-weight: 600;
  line-height: 18px;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.campaign-mission-panel p strong {
  color: var(--campaign-primary);
}

.campaign-mission-panel > a {
  display: grid;
  min-height: 44px;
  place-items: center;
  border-radius: 6px;
  background: var(--campaign-primary);
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  line-height: 18px;
}

.campaign-mission-panel > a:active {
  background: var(--campaign-primary-pressed);
}

.campaign-discovery-empty {
  display: grid;
  gap: 8px;
  border-radius: 10px;
  background: var(--campaign-mission);
  padding: 18px;
  text-align: center;
}

.campaign-discovery-empty a,
.campaign-discovery-empty button {
  min-height: 44px;
  border: 0;
  border-radius: 6px;
  background: var(--campaign-primary);
  color: #fff;
}
```

- [ ] **Step 5: Style campaign app-bar states without affecting other routes**

```css
.app-top:has(.campaign-app-title) {
  min-height: 52px;
  padding: 4px 16px;
}

.campaign-app-title {
  display: inline-flex;
  min-width: 0;
  align-items: center;
  gap: 8px;
}

.campaign-app-mark {
  display: grid;
  width: 24px;
  height: 24px;
  place-items: center;
  overflow: hidden;
  border-radius: 6px;
}

.campaign-app-mark img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.campaign-app-title strong {
  color: #182033;
  font-size: 18px;
  font-weight: 700;
  line-height: 24px;
}

.campaign-search-toggle {
  width: 44px;
  height: 44px;
}

.campaign-notification-dot {
  position: absolute;
  top: 7px;
  right: 7px;
  width: 7px;
  height: 7px;
  border: 2px solid #fff;
  border-radius: 999px;
  background: #ff4d5e;
}

.campaign-header-search {
  position: absolute;
  top: 100%;
  right: 12px;
  left: 12px;
  display: grid;
  grid-template-columns: 20px minmax(0, 1fr) auto;
  align-items: center;
  gap: 8px;
  border: 1px solid #e8edf3;
  border-radius: 10px;
  background: #fff;
  padding: 8px 8px 8px 12px;
  box-shadow: 0 12px 28px rgba(24, 32, 51, 0.12);
}

.campaign-header-search input {
  min-width: 0;
  border: 0;
  outline: 0;
  color: #182033;
}

.campaign-header-search button {
  min-height: 36px;
  border: 0;
  border-radius: 6px;
  background: #1478f5;
  padding: 0 12px;
  color: #fff;
  font-size: 13px;
  font-weight: 600;
}
```

- [ ] **Step 6: Add the 360px fallback**

```css
@media (max-width: 360px) {
  .campaign-discovery-screen {
    gap: 18px;
  }

  .campaign-promotion-copy {
    font-size: 16px;
    line-height: 24px;
  }

  .campaign-card-summary {
    gap: 10px;
  }

  .campaign-card-metrics {
    gap: 5px;
  }

  .campaign-card-metrics dt {
    align-items: flex-start;
    white-space: normal;
  }
}
```

- [ ] **Step 7: Format, lint, and typecheck**

Run: `pnpm.cmd exec prettier --write apps/blogger/app/globals.css apps/blogger/app/_components/campaign-explorer.tsx apps/blogger/app/_components/app-nav.tsx 'apps/blogger/app/(main)/campaigns/page.tsx' packages/utils/src/campaign/discovery.ts packages/utils/src/campaign/discovery.test.ts packages/utils/src/index.ts`

Expected: exit code 0.

Run: `pnpm.cmd lint`

Expected: exit code 0.

Run: `pnpm.cmd typecheck`

Expected: exit code 0.

- [ ] **Step 8: Commit the visual system**

```powershell
git add -- 'apps/blogger/app/globals.css'
git commit -m "style(blogger): 캠페인 목록 모바일 디자인 적용"
```

### Task 6: Browser verification and final regression

**Files:**

- Modify if verification finds issues: the files listed in Tasks 2–5 only.

**Interfaces:**

- Consumes: completed `/campaigns` screen.
- Produces: verified 430px and 360px visual states and a clean test/lint/typecheck result.

- [ ] **Step 1: Start the blogger app**

Run: `pnpm.cmd dev:blogger`

Expected: Next.js serves the blogger app at `http://localhost:3000`.

- [ ] **Step 2: Verify the core route in the in-app browser**

Open `http://localhost:3000/campaigns` in the in-app browser. Use the existing preview login if redirected. Verify the promotion asset is not cropped, the chips scroll, the cards remain single-column, and the last CTA clears the bottom navigation.

- [ ] **Step 3: Verify interactive states**

At 430px, verify search open/focus/submit, URL `q` filtering, single chip selection, empty reset, card detail link, CTA detail link, and notification dot. Repeat layout checks at 360px.

- [ ] **Step 4: Verify non-campaign regressions**

Open `/missions`, `/wallet`, and `/profile`. Confirm their existing app bar, spacing, and bottom navigation remain unchanged.

- [ ] **Step 5: Run the final verification suite**

Run: `pnpm.cmd test`

Expected: all tests PASS.

Run: `pnpm.cmd lint`

Expected: exit code 0 with zero warnings.

Run: `pnpm.cmd typecheck`

Expected: exit code 0.

Run: `pnpm.cmd build`

Expected: both Next.js apps build successfully.

- [ ] **Step 6: Review the final diff and commit verification fixes**

Run: `git diff --check`

Expected: no whitespace errors.

If browser verification required a scoped adjustment, stage only those adjusted campaign files and commit:

```powershell
git commit -m "fix(blogger): 캠페인 목록 반응형 마감"
```
