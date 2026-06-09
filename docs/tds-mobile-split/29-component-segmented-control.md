# Segmented Control

출처: https://tossmini-docs.toss.im/tds-mobile/components/segmented-control/

Segmented Control

### Segmented Control

`SegmentedControl` 컴포넌트는 여러 선택지 중 하나를 선택할 수 있는 UI 요소예요. 주로 단일 옵션을 선택할 때 사용하고, `Radio` 컴포넌트와 같은 역할을 해요.

아이템1아이템2아이템3

### 사용 예제

### 상태

#### 상태를 외부에서 관리하는 방식

`SegmentedControl`의 상태를 외부에서 관리하려면 `value`와 `onChange` 속성을 함께 사용하세요. 이렇게 하면 어떤 아이템이 선택되었는지를 외부에서 직접 관리할 수 있어요.

Editable Example

```tsx
function Controlled() {
  const [value, setValue] = React.useState("1");

  return (
    <SegmentedControl value={value} onChange={(value) => setValue(value)}>
      <SegmentedControl.Item value="1">아이템1</SegmentedControl.Item>
      <SegmentedControl.Item value="2">아이템2</SegmentedControl.Item>
      <SegmentedControl.Item value="3">아이템3</SegmentedControl.Item>
    </SegmentedControl>
  );
}
```

#### 상태를 내부에서 관리하는 방식

`SegmentedControl`의 상태를 내부에서 자동으로 관리하려면 `defaultValue` 속성을 사용하세요. 이 속성은 `SegmentedControl`가 처음 화면에 표시될 때 선택될 `SegmentedControl.Item`의 `value` 속성을 정해주고, 그 후에는 컴포넌트가 스스로 상태를 관리해요. 이 방식은 상태 변화를 추적할 필요가 없을 때 유용해요.

Editable Example

```tsx
<SegmentedControl defaultValue="1">
  <SegmentedControl.Item value="1">아이템1</SegmentedControl.Item>
  <SegmentedControl.Item value="2">아이템2</SegmentedControl.Item>
  <SegmentedControl.Item value="3">아이템3</SegmentedControl.Item>
</SegmentedControl>
```

### 크기 조정하기

`SegmentedControl` 컴포넌트의 크기를 변경하려면 `size` 속성을 사용하세요. `small`, `large` 중 하나를 선택할 수 있어요.

Editable Example

```tsx
<div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
  <SegmentedControl size="small" defaultValue="1">
    <SegmentedControl.Item value="1">아이템1</SegmentedControl.Item>
    <SegmentedControl.Item value="2">아이템2</SegmentedControl.Item>
    <SegmentedControl.Item value="3">아이템3</SegmentedControl.Item>
  </SegmentedControl>
  <SegmentedControl size="large" defaultValue="1">
    <SegmentedControl.Item value="1">아이템1</SegmentedControl.Item>
    <SegmentedControl.Item value="2">아이템2</SegmentedControl.Item>
    <SegmentedControl.Item value="3">아이템3</SegmentedControl.Item>
  </SegmentedControl>
</div>
```

### 스크롤 되게 하기

`SegmentedControl.Item`의 개수나 글자 수가 많다면 `alignment` 속성을 `fluid`로 설정해 보세요. 이렇게 하면 아이템의 너비가 내용에 맞춰 조정되고, `SegmentedControl` 컴포넌트에 가로 스크롤이 생겨요.

스크롤해서 첫 번째 아이템이 가려질 때 왼쪽 화살표 버튼이 나타나고, 클릭하면 첫 번째 아이템이 보이게 스크롤돼요.

Editable Example

```tsx
<SegmentedControl defaultValue="1" alignment="fluid">
  {Array.from({ length: 20 }, (_, index) => (
    <SegmentedControl.Item
      key={index}
      value={String(index + 1)}
    >{`아이템${index + 1}`}</SegmentedControl.Item>
  ))}
</SegmentedControl>
```

### 접근성

`SegmentedControl` 컴포넌트는 기본적으로 접근성을 지원하는 여러 속성을 포함하고 있어요. 이 속성들은 스크린 리더 사용자들이 컴포넌트를 명확하게 이해하고 상호작용할 수 있도록 도와줘요.

### 기본 접근성 지원

`SegmentedControl` 컴포넌트는 다음과 같은 접근성 기능을 기본적으로 가지고 있어요. 그래서 개발자는 별도의 설정 없이도 사용자의 접근성을 고려한 형태의 `SegmentedControl` 컴포넌트를 제공할 수 있어요.

| 속성                                                                                                                                     | 접근성 효과                                                                                      | 설명                                                                                                                            |
| ---------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| `role="radiogroup"` (opens in a new tab) (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/radiogroup_role)         | 스크린 리더에서 "라디오 그룹"으로 인식해요.                                                      | 여러 항목 중 하나만 선택할 수 있는 그룹이라는 것을 명확히 전달해요.                                                             |
| `role="radio"` (opens in a new tab) (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/radio_role) 및 `tabindex="0"` | 스크린 리더에서 각 항목을 "라디오 버튼"으로 인식해요.                                            | 라디오 버튼으로 인식되며, 각 항목의 선택 가능성을 전달해요.                                                                     |
| `aria-checked` (opens in a new tab) (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-checked)            | 선택된 항목의 상태를 스크린 리더에서 알려줘요.                                                   | 선택 상태에 따라 `aria-checked` 속성이 자동으로 업데이트되며, `true`일 때는 "선택됨", `false`일 때는 "선택 안 됨"으로 읽어줘요. |
| `aria-labelledby` (opens in a new tab) (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby)      | 모든 상호 작용 가능한 요소는 접근성 레이블이 필요하며, 이를 `aria-labelledby` 속성으로 지원해요. | 레이블이 `role="radio"` 요소와 분리되어 있지만, `aria-labelledby`로 자동 적용돼요.                                              |

`aria-checked` (opens in a new tab) (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-checked) 속성은 선택 상태에 따라 자동으로 관리돼요.
개발자가 선택 상태만 업데이트하거나, 내부 상태 관리를 사용하면 컴포넌트가 `aria-checked` 속성을 자동으로 설정하여 스크린 리더 사용자에게 현재 상태를 정확히 전달해요. 이러한 속성들은 `SegmentedControl` 컴포넌트에 기본적으로 적용되며, 사용자가 선택 상태를 명확히 이해할 수 있도록 도와요.

### 인터페이스

#### SegmentedControlProps

| 속성             | 기본값    | 타입                                                                                                                                                                                                                    |
| ---------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **children\***   | `-`       | `React.ReactNode``SegmentedControl` 컴포넌트를 구성하는 하나 이상의 `SegmentedControl.Item` 컴포넌트를 받아요. `SegmentedControl.Item` 컴포넌트는 각각의 아이템을 나타내며, 여러 개의 아이템을 배열로 전달할 수 있어요. |
| **size**         | `'small'` | `"small"`                                                                                                                                                                                                               | `"large"``SegmentedControl` 컴포넌트의 크기를 결정해요.                                                                                                                                                         |
| **alignment**    | `'fixed'` | `"fixed"`                                                                                                                                                                                                               | `"fluid"`이 값이 `fluid`면 `SegmentedControl.Item` 컴포넌트의 너비가 글자 수에 맞춰져요. `SegmentedControl.Item` 컴포넌트의 전체 크기가 `SegmentedControl` 컴포넌트의 컨테이너를 넘어가면 가로 스크롤이 생겨요. |
| **value**        | `-`       | `string`이 값을 가지는 `SegmentedControl.Item` 컴포넌트가 선택된 상태로 표현돼요. 주로 `SegmentedControl` 컴포넌트의 상태를 컴포넌트 외부에서 관리할 때, `onChange` 속성과 함께 사용해요.                               |
| **defaultValue** | `-`       | `string``SegmentedControl` 컴포넌트의 상태를 컴포넌트 내부에서 관리할 때, 초기 선택 값을 지정해요.                                                                                                                      |
| **onChange**     | `-`       | `(v: string) => void``SegmentedControl` 컴포넌트의 선택 상태가 바뀔 때 실행되는 함수예요.                                                                                                                               |

#### SegmentedControlItemProps

| 속성           | 기본값 | 타입                                                                                                                   |
| -------------- | ------ | ---------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| **children\*** | `-`    | `React.ReactNode``SegmentedControl.Item`의 라벨을 표현해요.                                                            |
| **value\***    | `-`    | `string`해당 `SegmentedControl.Item`을 선택했을 때, `SegmentedControl` 컴포넌트의 `onChange` 속성에 전달되는 값이에요. |
| **size**       | `-`    | `"small"`                                                                                                              | `"large"`사이즈에 따라 `SegmentedControl.Item` 컴포넌트의 텍스트 크기와 패딩이 변경돼요. |
