# Checkbox

출처: https://tossmini-docs.toss.im/tds-mobile/components/checkbox/

Checkbox

### Checkbox

`Checkbox` 컴포넌트는 사용자가 하나 이상의 항목을 선택할 때 사용해요. 체크된 상태와 체크되지 않은 상태를 나타내고, 여러 개의 항목을 동시에 선택할 수 있어요.

### 사용 예제

### 형태

`Checkbox`는 두 가지 방법으로 표현할 수 있어요.

- `<Checkbox.Circle />`: 체크 아이콘이 원으로 감싸진 형태로 표현돼요.
- `<Checkbox.Line />`: 체크 아이콘이 단독으로 표현돼요.

Editable Example

```tsx
<div style={{ display: "flex", alignItems: "center", gap: 8 }}>
  <Checkbox.Circle defaultChecked={true} />
  <Checkbox.Line defaultChecked={true} />
</div>
```

### 상태

#### 상태를 외부에서 관리하는 방식

`Checkbox`의 상태를 외부에서 관리하려면 `checked`와 `onCheckedChange` 속성을 함께 사용하세요. 이렇게 하면 체크박스가 선택되었는지 아닌지를 외부에서 직접 관리할 수 있어요.

Editable Example

```tsx
function Controlled() {
  const [checked, setChecked] = React.useState(true);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <Checkbox.Circle checked={checked} onCheckedChange={setChecked} />
      <Checkbox.Line checked={checked} onCheckedChange={setChecked} />
    </div>
  );
}
```

#### 상태를 내부에서 관리하는 방식

`Checkbox`의 상태를 내부에서 자동으로 관리하려면 `defaultChecked` 속성을 사용하세요. 이 속성은 체크박스가 처음 화면에 표시될 때 선택 상태를 정해주고, 그 후에는 컴포넌트가 스스로 상태를 관리해요. 이 방식은 상태 변화를 추적하지 않아도 될 때 유용해요.

Editable Example

```tsx
<div style={{ display: "flex", alignItems: "center", gap: 8 }}>
  <Checkbox.Circle defaultChecked={true} />
  <Checkbox.Line defaultChecked={true} />
</div>
```

### 크기 조정하기

`Checkbox`의 크기를 변경하려면 `size` 속성을 사용하세요.

Editable Example

```tsx
<div style={{ display: "flex", alignItems: "center", gap: 8 }}>
  <Checkbox.Circle defaultChecked={true} size={24} />
  <Checkbox.Line defaultChecked={true} size={24} />
</div>
```

### 비활성화하기

`Checkbox`를 비활성화하려면 `disabled` 속성을 사용하세요. 비활성화된 `Checkbox`를 클릭하면 선택 상태가 바뀌지 않고, 좌우로 흔들리는 애니메이션이 나타나요.

Editable Example

```tsx
<div style={{ display: "flex", alignItems: "center", gap: 8 }}>
  <Checkbox.Circle defaultChecked={true} disabled />
  <Checkbox.Circle disabled />
  <Checkbox.Line defaultChecked={true} disabled />
  <Checkbox.Line disabled />
</div>
```

### 라디오 버튼으로 활용하기

`Checkbox`를 라디오 버튼으로 활용하려면 `inputType` 속성에 `'radio'`를 넣어주세요. 여러 개의 항목 중 하나만을 선택해야할 때 유용해요.

Editable Example

```tsx
function Radios() {
  const [checked, setChecked] = React.useState<null | string>(null);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <Checkbox.Circle
        inputType="radio"
        value="1"
        checked={checked === "1"}
        onChange={(e) => setChecked(e.target.value)}
      />
      <Checkbox.Circle
        inputType="radio"
        value="2"
        checked={checked === "2"}
        onChange={(e) => setChecked(e.target.value)}
      />
      <Checkbox.Circle
        inputType="radio"
        value="3"
        checked={checked === "3"}
        onChange={(e) => setChecked(e.target.value)}
      />
    </div>
  );
}
```

### 접근성

`Checkbox` 컴포넌트는 기본적으로 접근성을 지원하는 여러 속성을 포함하고 있어요. 이 속성들은 스크린 리더 사용자들이 컴포넌트를 명확하게 이해하고 상호작용할 수 있도록 도와줘요.

### 기본 접근성 지원

다음 속성이 있어서 다른 설정 없이도 기본적으로 사용자의 접근성을 고려한 `Checkbox` 컴포넌트를 제공할 수 있어요.

| 속성                                | 접근성 효과                                              | 설명                                                                                   |
| ----------------------------------- | -------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `role="checkbox"` 및 `tabindex="0"` | 스크린 리더에서 "체크박스"로 인식해요.                   | 요소의 역할을 명확히 전달해요.                                                         |
| `aria-checked`                      | 현재 체크 상태를 스크린 리더에서 알려줘요.               | 체크박스의 상태에 따라 `aria-checked` 속성이 자동으로 업데이트 돼요.                   |
| `aria-disabled="true"`              | 체크박스가 비활성화된 상태임을 스크린 리더에서 알려줘요. | 비활성화된 체크박스에 자동으로 추가되어 사용자가 상호작용할 수 없다는 정보를 전달해요. |

```tsx
<div role="checkbox" tabindex="0" aria-checked="false"></div>
```

`Checkbox` 컴포넌트는 `<input type="checkbox" />` 요소를 포함하고 있지만, 이 요소는 화면에 보이지 않아요.
대신 시각적으로 보이는 커스텀 체크박스 요소에 `role="checkbox"`와 `aria-checked` 속성이 적용되어 있어, 스크린 리더 사용자에게 올바른 정보를 전달할 수 있어요.

### 개발자가 추가로 지원해야 하는 접근성

#### 필수로 제공해야 하는 aria-label

`Checkbox` 컴포넌트에서는 `aria-label` 속성을 필수적으로 제공해서 체크박스의 목적을 명확히 설명해야 합니다. 커스텀 체크박스와 레이블이 별도의 요소로 구현되어 있기 때문이에요. 이 속성을 사용해서 스크린 리더 사용자는 체크박스의 의미를 정확히 이해할 수 있어요.

```tsx
<Checkbox.Circle
  checked={checked}
  onCheckedChange={setChecked}
  aria-label="이용약관 동의" // 개발자가 필수로 제공해야 합니다
/>
```

주의할 점은 `aria-label`을 작성할 때 "체크박스"라는 요소 유형은 적지 않도록 해야 해요. 스크린 리더가 이미 "체크박스"라고 읽어주기 때문에 중복된 정보를 제공하지 않도록 주의해야 합니다. 이러한 접근성 고려사항을 적용하면, 더욱 포괄적이고 사용하기 쉬운 체크박스 컴포넌트를 만들 수 있어요. 개발자가 `aria-label`을 필수로 제공함으로써, 모든 사용자가 체크박스의 목적을 명확히 이해할 수 있게 되어 웹 접근성이 크게 향상됩니다.

### 인터페이스

#### CheckboxProps

| 속성                | 기본값       | 타입                                                                                     |
| ------------------- | ------------ | ---------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **inputType**       | `'checkbox'` | `"checkbox"`                                                                             | `"radio"`input 태그의 `type` 속성을 결정해요.                                                                                                                              |
| **size**            | `24`         | `number``Checkbox` 컴포넌트의 크기를 결정해요.                                           |
| **checked**         | `-`          | `false`                                                                                  | `true`이 값이 `true`일 때 해당 `Checkbox`가 선택된 상태로 표현돼요. 주로 `Checkbox` 컴포넌트의 상태를 컴포넌트 외부에서 관리할 때, `onCheckedChange` 속성과 함께 사용해요. |
| **onCheckedChange** | `-`          | `(checked: boolean) => void``Checkbox` 컴포넌트의 선택 상태가 바뀔 때 실행되는 함수예요. |
| **defaultChecked**  | `-`          | `false`                                                                                  | `true``Checkbox` 컴포넌트의 상태를 컴포넌트 내부에서 관리할 때, 초기 선택 상태를 지정해요.                                                                                 |
| **disabled**        | `-`          | `false`                                                                                  | `true`이 값이 `true`일 때 `Checkbox` 컴포넌트가 비활성화돼요.                                                                                                              |
