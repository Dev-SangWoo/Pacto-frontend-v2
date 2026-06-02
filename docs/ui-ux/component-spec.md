# Pacto Component Spec

## 1. 문서 목적

이 문서는 Pacto MVP 프론트엔드에서 사용할 공통 UI 컴포넌트와 도메인 컴포넌트의 책임 범위를 정의한다.

목표는 화면마다 UI를 새로 만들지 않고, 상태와 액션을 일관된 컴포넌트로 표현하는 것이다.

---

## 2. 컴포넌트 설계 원칙

```txt
공통 UI 컴포넌트는 도메인 지식을 갖지 않는다.
도메인 컴포넌트는 Pacto의 상태와 업무 흐름을 표현한다.
상태 배지와 금액 표시는 반드시 재사용 컴포넌트로 만든다.
화면 컴포넌트는 데이터 조합과 레이아웃 책임만 갖는다.
```

---

## 3. 공통 UI 컴포넌트

| Component | 목적 |
| --- | --- |
| Button | 주요 액션 버튼 |
| IconButton | 아이콘 기반 액션 버튼 |
| Input | 단일 행 텍스트 입력 |
| Textarea | 긴 텍스트 입력 |
| Select | 단일 선택 입력 |
| Checkbox | 다중 선택 또는 동의 |
| Switch | on/off 설정 |
| Modal | 확인/입력 모달 |
| Drawer | 모바일 또는 보조 패널 |
| Tabs | 상태 또는 섹션 전환 |
| Badge | 상태/라벨 표시 |
| Toast | 전역 피드백 |
| Table | 대시보드 목록 |
| Pagination | 목록 페이지 이동 |
| DatePicker | 날짜 선택 |
| EmptyState | 데이터 없음 |
| LoadingState | 로딩 표시 |
| ErrorState | 에러 표시 |

---

## 4. 도메인 컴포넌트

| Component | 목적 |
| --- | --- |
| CampaignCard | 블로거 앱의 캠페인 요약 카드 |
| CampaignStatusBadge | 캠페인 상태 표시 |
| CampaignSummary | 캠페인 핵심 정보 요약 |
| ApplicationStatusBadge | 지원 상태 표시 |
| MissionStatusBadge | 미션 상태 표시 |
| SettlementStatusBadge | 정산 상태 표시 |
| WalletBalance | 출금 가능/잠긴 금액 표시 |
| WithdrawalForm | 출금 신청 입력 폼 |
| ApplicantTable | 지원자 목록 테이블 |
| MissionReviewPanel | 미션 검수 패널 |
| EscrowLedgerTable | 정산 원장 테이블 |
| PaymentSummary | 결제 금액 요약 |
| ReportSummary | 캠페인 리포트 요약 |

---

## 5. Blogger App 컴포넌트

## 5.1 CampaignCard

표시 정보:

```txt
브랜드명
캠페인 제목
보상 금액
모집 인원
남은 슬롯
마감일
캠페인 상태 배지
```

액션:

```txt
카드 클릭 시 캠페인 상세 이동
```

## 5.2 MissionCard

표시 정보:

```txt
캠페인 제목
브랜드명
미션 상태
제출 기한
보상 금액
```

액션:

```txt
카드 클릭 시 미션 상세 이동
```

## 5.3 WalletBalance

표시 정보:

```txt
출금 가능 금액
잠긴 금액
누적 수익
```

규칙:

```txt
availableBalance와 lockedBalance는 반드시 분리해서 보여준다.
금액은 천 단위 구분자를 적용한다.
```

---

## 6. Dashboard 컴포넌트

## 6.1 CampaignTable

컬럼:

```txt
캠페인명
광고주
상태
모집 인원
지원자 수
승인자 수
마감일
예산
정산 상태
액션
```

기능:

```txt
검색
상태 필터
정렬
페이지네이션
상세 이동
```

## 6.2 ApplicantTable

컬럼:

```txt
블로거명
블로그 URL
지원일
상태
최근 활동
예상 적합도
액션
```

액션:

```txt
승인
반려
상세 보기
```

## 6.3 MissionReviewPanel

표시 정보:

```txt
블로거 정보
캠페인 정보
제출 URL
제출일
검수 상태
반려 사유
```

액션:

```txt
제출 URL 열기
승인
반려
반려 사유 작성
```

---

## 7. 공통 상태 컴포넌트

## 7.1 EmptyState

필수 요소:

```txt
제목
설명
선택 액션 버튼
```

예시:

```txt
캠페인이 없습니다.
새 캠페인을 등록해 운영을 시작해 보세요.
```

## 7.2 LoadingState

사용 기준:

```txt
목록 화면: skeleton row 또는 skeleton card
상세 화면: 주요 영역 skeleton
버튼 액션: 버튼 내부 loading indicator
```

## 7.3 ErrorState

사용 기준:

```txt
inline error: 폼 입력 오류
toast error: 일시적 요청 실패
page error: 화면 전체 로딩 실패
```

---

## 8. 확인 모달 기준

다음 액션은 확인 모달을 거친다.

```txt
캠페인 지원
지원자 승인
지원자 반려
미션 승인
미션 반려
출금 신청
결제 진행
```

모달은 다음 구조를 따른다.

```txt
제목
설명
취소 버튼
확인 버튼
위험 액션일 경우 강조 색상
```

---

## 9. 네이밍 기준

```txt
공통 UI: Button, Modal, Table
도메인 표시: CampaignStatusBadge, WalletBalance
도메인 목록: CampaignTable, ApplicantTable
도메인 폼: WithdrawalForm, CampaignForm
도메인 패널: MissionReviewPanel
```
