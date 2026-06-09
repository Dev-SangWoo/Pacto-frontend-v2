# Numeric Spinner

출처: https://tossmini-docs.toss.im/tds-mobile/components/numeric-spinner/

Numeric Spinner

### Numeric Spinner

`NumericSpinner` 컴포넌트는 정수 입력을 쉽게 처리할 수 있도록, 숫자를 증감시키는 버튼을 제공해요. 키보드 없이 숫자를 입력하거나 수정할 때 사용해요.

0000

### 사용법

### 입력값 관리

#### 입력값을 외부에서 관리하기

`NumericSpinner` 컴포넌트의 입력값을 외부에서 관리하려면, `number`, `onNumberChange` 속성을 함께 사용하세요. `number`는 컴포넌트에 현재 값을 제공하고, `onNumberChange`는 입력값이 바뀔 때 호출되는 함수예요.

Editable Example

```tsx
function Controlled() {
  const [value, setValue] = React.useState(0);

  return (
    <NumericSpinner
      size="large"
      number={value}
      onNumberChange={(number) => {
        setValue(number);
      }}
    />
  );
}
```

#### 입력값을 내부에서 관리하기

`NumericSpinner` 컴포넌트의 입력값을 내부에서 관리하려면, `defaultNumber` 속성에 값을 설정하세요. 설정한 값이 초기 입력값이 되고 이후 입력값의 변경은 `NumericSpinner` 컴포넌트 내부에서 처리돼요. 이 방식은 외부에서 값을 따로 관리할 필요가 없을 때 적합해요.

Editable Example

```tsx
<NumericSpinner size="large" defaultNumber={0} />
```

### 크기 변경하기

`NumericSpinner` 컴포넌트의 크기를 변경하려면 `size` 속성을 사용하세요. 지원되는 크기는 `small`, `medium`, `large`가 있어요.

Editable Example

```tsx
<div style={{ display: "flex", alignItems: "center", gap: 8 }}>
  <NumericSpinner size="tiny" defaultNumber={0} />
  <NumericSpinner size="small" defaultNumber={0} />
  <NumericSpinner size="medium" defaultNumber={0} />
  <NumericSpinner size="large" defaultNumber={0} />
</div>
```

### 비활성화하기

`NumericSpinner` 컴포넌트를 비활성화하려면 `disable` 속성을 사용하세요. 비활성화된 `NumericSpinner` 컴포넌트는 버튼을 클릭해도 숫자가 변하지 않아요.

Editable Example

```tsx
<NumericSpinner size="large" defaultNumber={0} disable />
```

### 접근성

`NumericSpinner` 컴포넌트는 기본적으로 접근성을 지원하는 여러 속성을 포함하고 있어요. 이 속성들은 스크린 리더 사용자들이 컴포넌트를 명확하게 이해하고 상호작용할 수 있도록 도와줘요.

| 속성                 | 접근성 효과                                                 | 설명                                                         |
| -------------------- | ----------------------------------------------------------- | ------------------------------------------------------------ |
| `<button>` 태그      | 스크린 리더가 버튼으로 인식해요.                            | 사용자는 해당 요소가 상호작용 가능한 버튼임을 알 수 있어요.  |
| `aria-live="polite"` | 수량 변경 시 변경된 숫자를 스크린 리더가 자동으로 읽어줘요. | 사용자는 실시간으로 업데이트되는 수량 정보를 들을 수 있어요. |
| `decreaseAriaLabel`  | 감소 버튼의 기능을 설명해요.                                | 스크린 리더 사용자에게 버튼의 목적을 명확히 전달해요.        |
| `increaseAriaLabel`  | 증가 버튼의 기능을 설명해요.                                | 스크린 리더 사용자에게 버튼의 목적을 명확히 전달해요.        |

### 추가로 지원해야 하는 접근성

기본적인 접근성 제공 외에도, `decreaseAriaLabel`과 `increaseAriaLabel` props를 사용해서 더 구체적인 상황에서 사용자 경험을 개선할 수 있어요. 예를 들면 이 props들은 기본값으로 "빼기", "더하기"로 설정되어 있지만, 상황에 따라 의미가 달라지면 반드시 변경해야 해요. 예를 들어 상품 수량과 관련된 UI에서 사용될 때, 다음과 같이 라벨의 값을 바꿔서 버튼의 기능을 더 명확하게 설명할 수 있어요.

```tsx
<NumericSpinner
  number={value}
  onNumberChange={setValue}
  decreaseAriaLabel="상품 수량 줄이기"
  increaseAriaLabel="상품 수량 늘리기"
/>
```

이렇게 적절한 `aria-label`을 제공하면, 스크린 리더 사용자들이 버튼의 목적을 정확히 이해하고 사용할 수 있어요. 상황에 맞게 명확한 레이블을 제공하는 것이 접근성 향상에 매우 중요해요.

### 인터페이스

#### NumericSpinnerProps

| 속성               | 기본값  | 타입                                                                                                                                                                                                      |
| ------------------ | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | ---------- | --------------------------------------------- |
| **size\***         | `-`     | `"tiny"`                                                                                                                                                                                                  | `"small"`                                                                                                      | `"medium"` | `"large"``NumericSpinner` 컴포넌트의 크기에요 |
| **number**         | `0`     | `number``NumericSpinner` 컴포넌트에 표시되는 값이에요. 주로 입력값을 컴포넌트 외부에서 관리할 때 `onNumberChange` 속성과 함께 사용해요.                                                                   |
| **defaultNumber**  | `-`     | `number``NumericSpinner` 컴포넌트의 초기 입력값이에요. 설정된 값으로 컴포넌트가 초기화되고, 이후 입력값은 `NumericSpinner` 컴포넌트 내부에서 관리돼요. 외부에서 값 변경을 추적할 필요가 없을 때 사용해요. |
| **minNumber**      | `0`     | `number`입력할 수 있는 최소값이에요. 설정된 값보다 작은 값은 사용자가 입력할 수 없어요.                                                                                                                   |
| **maxNumber**      | `999`   | `number`입력할 수 있는 최대값이에요. 설정된 값보다 큰 값은 사용자가 입력할 수 없어요.                                                                                                                     |
| **disable**        | `false` | `false`                                                                                                                                                                                                   | `true`이 값이 true일 때 `NumericSpinner` 컴포넌트가 비활성화돼요. 사용자가 버튼을 눌러도 숫자가 변하지 않아요. |
| **onNumberChange** | `-`     | `(number: number) => void`입력값이 변경될 때 호출되는 함수예요. 변경된 숫자 값을 매개변수로 받아 처리해요. 예를 들어, 입력값이 변경되면 이를 외부 상태에 반영할 때 사용해요.                              |
