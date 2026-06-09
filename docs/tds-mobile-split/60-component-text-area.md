# TextField / Text Area

출처: https://tossmini-docs.toss.im/tds-mobile/components/TextField/text-area/

TextFieldTextArea

### TextArea

`TextArea` 컴포넌트는 여러 줄의 텍스트 입력을 받을 수 있는 컴포넌트로, 피드백 작성, 주소 입력, 메모와 같이 긴 텍스트 데이터를 처리할 때 사용돼요. `height` 속성을 사용해 입력 영역의 높이를 조정할 수 있어 사용자가 더 편리하게 긴 내용을 작성할 수 있어요. 이 컴포넌트를 사용하면 사용자에게 넉넉한 입력 공간을 제공하고, 긴 텍스트를 효율적으로 입력하고 편집할 수 있는 환경을 만들어줘요.

### 높이가 고정된 텍스트 영역 사용하기

`height` 속성을 사용해 입력 영역의 높이를 고정할 수 있어요. 이는 특정 높이의 입력 영역이 필요한 경우에 유용해요. 예를 들어, 짧은 리뷰나 간단한 메모를 작성할 때는 작은 높이로, 긴 피드백이나 상세한 설명을 작성할 때는 큰 높이로 설정할 수 있어요. 이렇게 고정된 높이를 사용하면 레이아웃이 일관되게 유지되어 UI의 안정성을 높일 수 있어요.

Editable Example

```tsx
<TextArea
  variant="box"
  height="200px"
  placeholder="텍스트를 입력해보세요."
  help="높이가 고정된 텍스트 필드"
/>
```

### 높이가 자동으로 조정되는 텍스트 영역 사용하기

텍스트 입력 시 내용의 양에 따라 입력 영역의 높이가 자동으로 늘어나요. 이는 사용자가 긴 내용을 입력할 때 스크롤 없이도 전체 내용을 한눈에 볼 수 있게 해줘요. `minHeight` 속성으로 입력 영역의 최소 높이를 지정할 수 있어 너무 작아지는 것을 방지할 수 있어요.

Editable Example

```tsx
<TextArea
  variant="box"
  placeholder="텍스트를 길게 입력하거나 엔터를 눌러보세요."
  help="높이가 자동으로 조절되는 텍스트 필드"
  minHeight={100}
/>
```

### 인터페이스

#### TextAreaProps

`TextField` 컴포넌트를 확장하여 제작했어요. `TextField` 컴포넌트의 `prefix`, `suffix`, `right` 속성을 제외한 속성을 가져요.

| 속성          | 기본값 | 타입     |
| ------------- | ------ | -------- | --------------------------------------------------- |
| **minHeight** | `-`    | `string` | `number``TextArea` 컴포넌트의 최소 높이를 설정해요. |
| **height**    | `-`    | `string` | `number``TextArea` 컴포넌트의 높이를 설정해요.      |
