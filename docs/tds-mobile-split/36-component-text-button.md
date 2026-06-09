# Text Button

출처: https://tossmini-docs.toss.im/tds-mobile/components/text-button/

Text Button

### Text Button

`TextButton` 컴포넌트는 사용자가 어떤 액션을 트리거하거나 이벤트를 실행할 때 사용해요.

### 사용 예제

### 크기 조정하기

`TextButton` 컴포넌트의 크기는 `size` 속성을 사용해서 변경할 수 있어요. `xsmall`, `small`, `medium`, `large`, `xlarge`, `xxlarge` 값으로 텍스트 크기를 조정할 수 있어요.

Editable Example

```tsx
<div style={{ display: "flex", alignItems: "center", gap: 8 }}>
  <TextButton size="xsmall">텍스트 버튼</TextButton>
  <TextButton size="small">텍스트 버튼</TextButton>
  <TextButton size="medium">텍스트 버튼</TextButton>
  <TextButton size="large">텍스트 버튼</TextButton>
  <TextButton size="xlarge">텍스트 버튼</TextButton>
  <TextButton size="xxlarge">텍스트 버튼</TextButton>
</div>
```

### 형태 변경하기

`TextButton` 컴포넌트의 모양을 변경하려면 `variant` 속성을 사용하세요. 사용할 수 있는 값은 `arrow`와 `underline`이 있어요.

#### 화살표 추가하기

화살표 아이콘과 함께 사용하려면 `variant` 속성을 `arrow`로 설정하세요. 컴포넌트 오른쪽에 화살표가 추가돼요.

Editable Example

```tsx
<div style={{ display: "flex", alignItems: "center", gap: 8 }}>
  <TextButton size="medium" variant="arrow">
    텍스트 버튼
  </TextButton>
  <TextButton size="xlarge" variant="arrow">
    텍스트 버튼
  </TextButton>
  <TextButton size="xxlarge" variant="arrow">
    텍스트 버튼
  </TextButton>
</div>
```

#### 밑줄 긋기

`TextButton` 컴포넌트에 밑줄을 추가하려면 `variant` 속성을 `underline`으로 설정하세요.

Editable Example

```tsx
<div style={{ display: "flex", alignItems: "center", gap: 8 }}>
  <TextButton size="medium" variant="underline">
    텍스트 버튼
  </TextButton>
  <TextButton size="xlarge" variant="underline">
    텍스트 버튼
  </TextButton>
  <TextButton size="xxlarge" variant="underline">
    텍스트 버튼
  </TextButton>
</div>
```

### 비활성화

텍스트 버튼을 비활성화하려면 `disabled` 속성을 사용하세요. 비활성화된 텍스트 버튼은 사용자가 클릭할 수 없고, 시각적으로도 비활성화된 상태임을 나타내요.

Editable Example

```tsx
<div style={{ display: "flex", alignItems: "center", gap: 8 }}>
  <TextButton size="medium" disabled>
    텍스트 버튼
  </TextButton>
  <TextButton size="xlarge" disabled>
    텍스트 버튼
  </TextButton>
  <TextButton size="xxlarge" disabled>
    텍스트 버튼
  </TextButton>
</div>
```

### 인터페이스

#### TextButtonProps

ParagraphText 컴포넌트를 확장하여 제작했어요. ParagraphText 컴포넌트의 모든 속성을 사용할 수 있어요.

| 속성         | 기본값    | 타입       |
| ------------ | --------- | ---------- | ------------------------------------------------------- | ------------------------------------------------- | --------- | ---------- | ------------------------------------------- |
| **size\***   | `-`       | `"xsmall"` | `"small"`                                               | `"medium"`                                        | `"large"` | `"xlarge"` | `"xxlarge"`텍스트 버튼의 사이즈를 결정해요. |
| **variant**  | `'clear'` | `"arrow"`  | `"underline"`                                           | `"clear"``TextButton` 컴포넌트의 형태를 결정해요. |
| **disabled** | `-`       | `false`    | `true``TextButton` 컴포넌트의 비활성화 여부를 나타내요. |
