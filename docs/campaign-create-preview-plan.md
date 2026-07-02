# 캠페인 생성 모바일 미리보기 구현 계획

## 목표

캠페인 생성 화면을 좌우 분할 구조로 바꾸고, 오른쪽에 블로거가 보게 될 모바일 상세 페이지 형태의 미리보기를 제공한다.

```text
왼쪽: 캠페인 정보 입력 폼
오른쪽: 핸드폰 목업 기반 캠페인 상세 미리보기
```

광고주는 캠페인명, 보상, 모집 인원, 대표 이미지, 미션 가이드라인을 입력하면서 실제 노출될 화면을 즉시 확인할 수 있다.

## 핵심 방향

- 기존 server action 기반 제출 흐름은 유지한다.
- 입력값은 React state로도 관리해서 오른쪽 preview에 전달한다.
- `guidelines`는 현재 구현된 Tiptap 호환 JSON을 유지한다.
- 이미지 파일 업로드 API가 생기기 전까지 대표 이미지는 URL 기반으로 preview한다.
- 추후 Supabase Storage 업로드가 붙으면 preview는 업로드 결과 URL을 그대로 사용한다.

## 화면 구조

### 데스크톱

```text
campaign-create-workbench
├─ campaign-create-form-panel
│  └─ 캠페인 생성 폼
└─ campaign-create-preview-panel
   └─ phone-preview
```

- 왼쪽: 입력 폼
- 오른쪽: sticky 모바일 프리뷰
- 프리뷰는 실제 모바일 상세 페이지 느낌을 축약해서 보여준다.

### 모바일/좁은 화면

- 입력 폼이 먼저 나온다.
- 모바일 미리보기는 폼 아래에 배치한다.
- 오른쪽 sticky는 해제한다.

## 입력 상태

캠페인 생성 폼에서 관리할 상태:

```ts
type CampaignCreatePreviewState = {
  title: string;
  rewardPoint: number;
  totalSlots: number;
  deadline: string;
  thumbnailUrl: string;
  guidelines: TiptapGuidelines;
};
```

## 컴포넌트 설계

### `CampaignCreateForm`

역할:

- 기존 폼 제출을 유지한다.
- 각 입력값을 state로 관리한다.
- `GuidelineEditor`에서 생성된 JSON을 preview에 전달한다.
- 오른쪽 `CampaignMobilePreview`를 렌더링한다.

### `GuidelineEditor`

변경:

```ts
type GuidelineEditorProps = {
  onChange?: (guidelines: TiptapGuidelines) => void;
};
```

- 내부 블록 변경 시 `onChange`를 호출한다.
- hidden input은 그대로 유지해서 server action 제출을 보장한다.

### `CampaignMobilePreview`

역할:

- 핸드폰 목업 UI를 렌더링한다.
- 캠페인 대표 이미지, 제목, 보상, 모집 인원, 마감일, 가이드라인을 표시한다.
- 신청 버튼은 mock이며 실제 동작하지 않는다.

Props:

```ts
type CampaignMobilePreviewProps = {
  title: string;
  rewardPoint: number;
  totalSlots: number;
  deadline: string;
  thumbnailUrl: string;
  guidelines: TiptapGuidelines;
};
```

### `GuidelinePreview`

역할:

- Tiptap 호환 JSON을 읽어서 미리보기 화면에 렌더링한다.

지원 노드:

- `heading`
- `paragraph`
- `bulletList`
- `listItem`
- `image`

## 파일 구조

```text
apps/dashboard/app/dashboard/campaigns/new/_components/
├─ campaign-create-form.tsx
├─ campaign-mobile-preview.tsx
├─ guideline-editor.tsx
└─ guideline-preview.tsx
```

## 구현 순서

1. 계획 문서 작성
2. `guideline-editor.tsx`에 타입 export 및 `onChange` 추가
3. `guideline-preview.tsx` 추가
4. `campaign-mobile-preview.tsx` 추가
5. `campaign-create-form.tsx`를 좌우 workbench 구조로 변경
6. `globals.css`에 preview/workbench 스타일 추가
7. `apps/dashboard` 타입 체크
8. 필요 시 `apps/blogger` 타입 체크

## 추후 확장

- Supabase Storage 업로드 API 연결
- 대표 이미지 URL 입력 대신 파일 업로드 UI로 변경
- 실제 블로거 캠페인 상세 페이지와 preview renderer 공유
- 캠페인 수정 페이지에도 같은 preview 재사용
