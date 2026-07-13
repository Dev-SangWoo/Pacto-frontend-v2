# Blogger Performance Improvement Report - 2026-07-13

## Context

Baseline Lighthouse capture in `docs/performance/lighthouse-baseline-2026-07-13.md` showed the blogger app as the main performance target.

| Area                        |                                                                         Baseline |
| --------------------------- | -------------------------------------------------------------------------------: |
| Blogger average Performance |                                                                             49.2 |
| Blogger average LCP         |                                                                             7.5s |
| Worst page                  |                                           `/missions` - Performance 50, LCP 8.5s |
| Biggest visible risk        | Large local campaign/illustration images and repeated authenticated data fetches |

## Changes Applied

### 1. Local image payload reduction

Generated WebP versions for the largest blogger static assets and switched app references to the WebP files. Original PNG files were kept as source assets.

| Asset                             |    Before |    After | Reduction |
| --------------------------------- | --------: | -------: | --------: |
| `campaigns/seongsu-brunch-cafe`   | 898,622 B | 65,006 B |     92.8% |
| `campaigns/hongdae-nail-studio`   | 743,680 B | 35,868 B |     95.2% |
| `campaigns/jamsil-fitness-lounge` | 691,312 B | 34,388 B |     95.0% |
| `illustrations/wallet-cashback`   | 223,129 B | 12,716 B |     94.3% |
| `illustrations/goal-mountain`     | 109,696 B | 11,234 B |     89.8% |
| `brand/logo-bg-rm-cropped`        | 136,562 B | 21,720 B |     84.1% |

Total optimized payload for these referenced local assets dropped from 2,803,001 B to 180,932 B, saving about 2.62 MB before transfer compression.

Touched surfaces:

- Campaign fallback thumbnails
- Mission fallback thumbnails
- Blogger logo surfaces
- Wallet and mission CSS illustration backgrounds

### 2. Removed render-blocking external font CSS

Removed the remote Pretendard `@import` from `apps/blogger/app/globals.css`.

The app still keeps a Korean-friendly system font fallback stack, but no longer blocks first render on a third-party CSS request. This should mainly help FCP and Speed Index, especially on throttled Lighthouse runs.

### 3. Deduplicated authenticated activity fetches per request

Added `getBloggerActivity()` with React request cache and reused it from:

- Main layout notification badge
- Missions page
- Notifications page
- Campaign detail CTA state

This reduces repeated calls for the same `getMyMissions` and `getMyApplicationResponses` data during a single server render. The campaign detail page also derives the user's application/mission state from the shared activity snapshot.

## Expected Lighthouse Movement

The biggest expected gain is on pages where fallback campaign thumbnails or CSS illustrations participate in the initial viewport.

| Metric      | Expected direction    | Why                                                                                     |
| ----------- | --------------------- | --------------------------------------------------------------------------------------- |
| LCP         | Down                  | Main visual assets are much smaller                                                     |
| FCP         | Down                  | Removed external font stylesheet dependency                                             |
| Speed Index | Down                  | Smaller images and fewer blocking requests                                              |
| TBT         | Slight down / neutral | Server fetch dedupe helps page work, but client bundle work still needs a separate pass |

## Follow-up Measurement: `/campaigns`

After the first optimization pass, `/campaigns` still measured similarly:

| Metric      | Measured |
| ----------- | -------: |
| FCP         |     0.9s |
| LCP         |     6.6s |
| TBT         |  1,710ms |
| CLS         |        0 |
| Speed Index |     4.2s |

Interpretation:

- FCP is already acceptable, so the page can paint early.
- LCP is still too slow, which points to the largest visible campaign content arriving late or being image-load delayed.
- TBT is still high, which points to client-side JavaScript execution/hydration cost rather than only image transfer size.

Second-pass changes for `/campaigns`:

- Request only recruiting campaigns from the API with `status: "RECRUITING"`.
- Reduce initial campaign page size from 100 to 24.
- Load the first two campaign card images eagerly with high fetch priority; keep the rest lazy.

## Re-measure Plan

Run Lighthouse again on the same deployed environment and same device profile as the baseline:

1. Blogger `/campaigns`
2. Blogger `/missions`
3. Blogger `/wallet`
4. Blogger campaign detail
5. Dashboard pages only as regression check

Record the new report beside the baseline and compare:

- Performance score
- FCP
- LCP
- Speed Index
- TBT
- Total transfer size
- Largest image resource

## Next Optimization Candidates

1. Replace above-the-fold `<img>` campaign hero/thumbnail rendering with `next/image` where backend image domains are known.
2. Split heavy client components if Lighthouse still reports high JavaScript execution time.
3. Add route-level loading skeletons only where real network latency still makes page transitions feel blocked.
4. Cache campaign detail lookups used for mission/application enrichment if the backend latency dominates `/missions` or `/notifications`.
