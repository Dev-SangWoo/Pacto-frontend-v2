# Lighthouse Baseline - 2026-07-13

## Measurement Context

- Tool: Chrome DevTools Lighthouse
- Mode: Navigation
- Device: Mobile
- Target: local authenticated preview pages
- Source reports: `docs/performance/lighthouse`
- Timezone note: Lighthouse `fetchTime` values are stored in UTC.

## Blogger App

| Page            | Performance | Accessibility | Best Practices | SEO |  FCP |  LCP |   CLS |     TBT | Speed Index | Report                                                                                     |
| --------------- | ----------: | ------------: | -------------: | --: | ---: | ---: | ----: | ------: | ----------: | ------------------------------------------------------------------------------------------ |
| `/login`        |          48 |            92 |             74 | 100 | 2.5s | 7.3s |     0 | 1,260ms |        3.2s | `docs/performance/lighthouse/blogger/baseline-login-mobile-20260713T131557.html`           |
| `/campaigns`    |          46 |            94 |             96 | 100 | 1.6s | 7.9s | 0.003 | 1,780ms |        4.1s | `docs/performance/lighthouse/blogger/baseline-campaigns-mobile-20260713T133333.html`       |
| `/campaigns/55` |          49 |            90 |            100 | 100 | 1.6s | 6.5s |     0 | 1,320ms |        4.7s | `docs/performance/lighthouse/blogger/baseline-campaign-detail-mobile-20260713T133443.html` |
| `/missions`     |          50 |            90 |            100 | 100 | 1.5s | 8.5s | 0.028 |   910ms |        5.1s | `docs/performance/lighthouse/blogger/baseline-missions-mobile-20260713T133515.html`        |
| `/wallet`       |          45 |            89 |            100 | 100 | 1.6s | 7.4s |  0.01 | 1,260ms |        6.1s | `docs/performance/lighthouse/blogger/baseline-wallet-mobile-20260713T133546.html`          |
| `/profile`      |          56 |            93 |            100 | 100 | 2.6s | 7.1s | 0.001 |   610ms |        3.2s | `docs/performance/lighthouse/blogger/baseline-profile-mobile-20260713T133633.html`         |

### Blogger Summary

- Core tab/detail average Performance: 49.2 across `/campaigns`, `/campaigns/55`, `/missions`, `/wallet`, `/profile`.
- Core tab/detail average LCP: 7.5s.
- Worst Performance: `/wallet` at 45.
- Worst LCP: `/missions` at 8.5s.
- Highest TBT: `/campaigns` at 1,780ms.

## Dashboard App

| Page                   | Performance | Accessibility | Best Practices | SEO |  FCP |  LCP |   CLS |   TBT | Speed Index | Report                                                                                      |
| ---------------------- | ----------: | ------------: | -------------: | --: | ---: | ---: | ----: | ----: | ----------: | ------------------------------------------------------------------------------------------- |
| `/dashboard`           |          90 |            96 |            100 |  91 | 0.5s | 1.5s | 0.002 |  90ms |        2.3s | `docs/performance/lighthouse/dashboard/baseline-dashboard-home-mobile-20260713T133707.html` |
| `/login`               |          94 |            95 |            100 | 100 | 0.5s | 1.3s | 0.003 | 150ms |        0.9s | `docs/performance/lighthouse/dashboard/baseline-login-mobile-20260713T133937.html`          |
| `/dashboard/campaigns` |          92 |            96 |            100 | 100 | 0.5s | 1.4s | 0.002 | 130ms |        1.6s | `docs/performance/lighthouse/dashboard/baseline-campaigns-mobile-20260713T134040.html`      |
| `/dashboard/payments`  |          92 |            96 |            100 | 100 | 0.5s | 1.3s | 0.001 | 110ms |        1.9s | `docs/performance/lighthouse/dashboard/baseline-payments-mobile-20260713T134115.html`       |

### Dashboard Summary

- Average Performance: 92.0.
- Average LCP: 1.4s.
- The dashboard app is already above the usual Lighthouse 90+ target on the measured pages.

## Optimization Priorities

1. Reduce Blogger LCP on `/missions`, `/campaigns`, and `/wallet`.
2. Investigate Blogger main-thread work, especially `/campaigns` TBT at 1,780ms.
3. Check large images and first-viewport hero media in Blogger pages.
4. Re-run the same pages after each optimization and compare against this baseline.

## Resume Metric Candidates

- Before metric: Blogger core mobile Lighthouse Performance average 49.2.
- Before metric: Blogger core mobile LCP average 7.5s.
- Before metric: Dashboard mobile Lighthouse Performance average 92.0.
- Strong resume phrasing after improvement: "Improved Blogger mobile Lighthouse Performance from 49 to NN and reduced average LCP from 7.5s to N.Ns across five core authenticated screens."
