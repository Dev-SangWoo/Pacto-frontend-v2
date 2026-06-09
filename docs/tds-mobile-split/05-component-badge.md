# Badge

출처: https://tossmini-docs.toss.im/tds-mobile/components/badge/

Badge

### Badge

![Badge thumbnail](/tds-mobile/_next/static/media/Thumbnail-Badge.e9b9b500.png)

`Badge` 컴포넌트는 항목의 상태를 빠르게 인식할 수 있도록 강조하는 데 사용돼요.

Badge

### 사용법

### 크기 조정하기

`Badge` 컴포넌트의 크기를 변경하려면 `size` 속성을 사용하세요. `xsmall`, `small`, `medium`, `large` 중 하나를 선택할 수 있어요.

Editable Example

```tsx
<div style={{ display: "flex", alignItems: "center", gap: 8 }}>
  <Badge size="xsmall" color="blue" variant="fill">
    xsmall
  </Badge>
  <Badge size="small" color="blue" variant="fill">
    small
  </Badge>
  <Badge size="medium" color="blue" variant="fill">
    medium
  </Badge>
  <Badge size="large" color="blue" variant="fill">
    large
  </Badge>
</div>
```

### 스타일

`Badge` 컴포넌트의 스타일을 설정하려면 `variant` 속성을 사용하세요. 선택 할 수 있는 값에는 `fill`과 `weak`이 있어요. 이때, `color` 속성을 사용하여 원하는 색상을 설정할 수 있어요.

#### fill

`fill` 스타일은 채도가 높아 시각적으로 강렬하고 눈에 띄는 디자인이라 주요 항목을 강조하는 데 적합해요.

Editable Example

```tsx
<div style={{ display: "flex", alignItems: "center", gap: 8 }}>
  <Badge size="xsmall" color="blue" variant="fill">
    Badge
  </Badge>
  <Badge size="xsmall" color="teal" variant="fill">
    Badge
  </Badge>
  <Badge size="xsmall" color="green" variant="fill">
    Badge
  </Badge>
  <Badge size="xsmall" color="red" variant="fill">
    Badge
  </Badge>
</div>
```

#### weak

`weak` 스타일은 채도가 낮아서 시각적으로 덜 눈에 띄어요.

Editable Example

```tsx
<div style={{ display: "flex", alignItems: "center", gap: 8 }}>
  <Badge size="xsmall" color="blue" variant="weak">
    Badge
  </Badge>
  <Badge size="xsmall" color="teal" variant="weak">
    Badge
  </Badge>
  <Badge size="xsmall" color="green" variant="weak">
    Badge
  </Badge>
  <Badge size="xsmall" color="red" variant="weak">
    Badge
  </Badge>
</div>
```

### 인터페이스

#### BadgeProps

| 속성          | 기본값 | 타입       |
| ------------- | ------ | ---------- | -------------------------------------------------- | ---------- | ------------------------------------- | ---------- | ------------------------------------------ |
| **variant\*** | `-`    | `"fill"`   | `"weak"``Badge` 컴포넌트의 색상과 투명도 정보에요. |
| **size\***    | `-`    | `"xsmall"` | `"small"`                                          | `"medium"` | `"large"``Badge` 컴포넌트의 크기에요. |
| **color\***   | `-`    | `"blue"`   | `"teal"`                                           | `"green"`  | `"red"`                               | `"yellow"` | `"elephant"``Badge` 컴포넌트의 색상이에요. |
