# Lighthouse 모바일 성능 기준선

## 측정 조건

- 측정일: 2026-07-13
- 도구: Chrome DevTools Lighthouse
- 모드: Navigation / Mobile
- 대상: 로컬 인증 프리뷰 페이지
- 원본 HTML: 인증 화면 정보가 포함될 수 있어 Git에서 제외하고 로컬 보관

이 문서는 최적화 전 병목을 같은 조건에서 비교하기 위한 기준선입니다. 현재 수치로 오해하지 않도록 개선 내역은 [Blogger Performance Improvement](./blogger-performance-improvement-2026-07-13.md)와 함께 확인합니다.

## Blogger App

| 화면            | Performance | Accessibility |  LCP |     TBT |
| --------------- | ----------: | ------------: | ---: | ------: |
| `/login`        |          48 |            92 | 7.3s | 1,260ms |
| `/campaigns`    |          46 |            94 | 7.9s | 1,780ms |
| `/campaigns/55` |          49 |            90 | 6.5s | 1,320ms |
| `/missions`     |          50 |            90 | 8.5s |   910ms |
| `/wallet`       |          45 |            89 | 7.4s | 1,260ms |
| `/profile`      |          56 |            93 | 7.1s |   610ms |

로그인을 제외한 핵심 화면 평균은 Performance 49.2, LCP 7.5초였습니다. 가장 큰 병목은 대용량 로컬 이미지와 인증 데이터의 중복 요청으로 판단했습니다.

## Dashboard App

| 화면                   | Performance | Accessibility |  LCP |   TBT |
| ---------------------- | ----------: | ------------: | ---: | ----: |
| `/dashboard`           |          90 |            96 | 1.5s |  90ms |
| `/login`               |          94 |            95 | 1.3s | 150ms |
| `/dashboard/campaigns` |          92 |            96 | 1.4s | 130ms |
| `/dashboard/payments`  |          92 |            96 | 1.3s | 110ms |

Dashboard 평균은 Performance 92.0, LCP 1.4초로 측정되어 Blogger 앱 최적화를 우선했습니다.

## 개선 우선순위

1. 첫 화면에 노출되는 캠페인·일러스트 이미지 용량 축소
2. 인증된 서버 렌더링 과정의 중복 API 요청 제거
3. 외부 폰트 요청 제거
4. 동일한 페이지와 조건으로 재측정
