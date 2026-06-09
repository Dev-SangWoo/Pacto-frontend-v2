# Rating

출처: https://tossmini-docs.toss.im/tds-mobile/components/rating/

Rating

### Rating

`Rating` 컴포넌트는 사용자가 주어진 항목이나 콘텐츠에 대한 평가를 제공할 수 있도록 해주는 UI 요소예요. 사용자는 아이콘 개수를 선택해 자신의 만족도를 표현할 수 있고, 선택된 점수에 따라 시각적으로도 즉각 반영돼요. 이 컴포넌트는 상호작용 방식에 따라 읽기 전용 또는 상호작용 가능한 형태로 제공될 수 있어요.

### 사용 예제

### 크기 조정하기

`Rating` 컴포넌트의 크기를 변경하려면 `size` 속성을 사용하세요. `medium`, `large`, `big` 중 하나를 선택할 수 있어요.

Editable Example

```tsx
function SizeRatings() {
  const [valueMedium, setValueMedium] = React.useState<number>(5);
  const [valueLarge, setValueLarge] = React.useState<number>(5);
  const [valueBig, setValueBig] = React.useState<number>(5);

  return (
    <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
      <Rating
        readOnly={false}
        value={valueMedium}
        max={5}
        size="medium"
        aria-label="별점 평가"
        onValueChange={setValueMedium}
      />
      <Rating
        readOnly={false}
        value={valueLarge}
        max={5}
        size="large"
        aria-label="별점 평가"
        onValueChange={setValueLarge}
      />
      <Rating
        readOnly={false}
        value={valueBig}
        max={5}
        size="big"
        aria-label="별점 평가"
        onValueChange={setValueBig}
      />
    </div>
  );
}
```

### 읽기 전용으로 사용하기

`Rating` 컴포넌트를 읽기 전용으로 사용하려면 `readOnly` 속성을 사용하세요. `readOnly`를 `true`로 설정하면 읽기 전용으로 사용할 수 있어요. 반대로, 상호작용할 수 있는 `Rating` 컴포넌트를 사용하려면 `readOnly`를 `false`로 설정하면 돼요.

#### 형태 변경하기

읽기 전용으로 사용되는 `Rating` 컴포넌트의 형태를 변경하려면 `variant` 속성을 사용하세요. 선택할 수 있는 값에는 `full`, `compact`, `iconOnly`가 있어요.

Editable Example

```tsx
<div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
  <Rating readOnly={true} value={5} max={5} size="medium" variant="full" aria-label="별점 평가" />
  <Rating
    readOnly={true}
    value={5}
    max={5}
    size="medium"
    variant="compact"
    aria-label="별점 평가"
  />
  <Rating
    readOnly={true}
    value={5}
    max={5}
    size="medium"
    variant="iconOnly"
    aria-label="별점 평가"
  />
</div>
```

#### 크기 조정하기

읽기 전용으로 사용되는 `Rating` 컴포넌트의 크기를 변경하려면 `size` 속성을 사용하세요. 상호작용이 가능한 `Rating` 컴포넌트와는 달리 `tiny`, `small`, `medium`, `large`, `big` 중 하나를 선택할 수 있어요.

Editable Example

```tsx
<div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
  <Rating readOnly={true} value={5} max={5} size="tiny" variant="full" aria-label="별점 평가" />
  <Rating readOnly={true} value={5} max={5} size="small" variant="full" aria-label="별점 평가" />
  <Rating readOnly={true} value={5} max={5} size="medium" variant="full" aria-label="별점 평가" />
  <Rating readOnly={true} value={5} max={5} size="large" variant="full" aria-label="별점 평가" />
  <Rating readOnly={true} value={5} max={5} size="big" variant="full" aria-label="별점 평가" />
</div>
```

### 비활성화하기

`Rating` 컴포넌트를 비활성화하려면 `disabled` 속성을 사용하세요. 비활성화된 `Rating` 컴포넌트는 사용자와 상호작용할 수 없고, 시각적으로도 비활성화된 상태임을 나타내요.

Editable Example

```tsx
function DisabledRatings() {
  const [value, setValue] = React.useState<number>(5);

  const handleValueChange = (newValue: number) => {
    setValue(newValue);
  };
  return (
    <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
      <Rating
        readOnly={false}
        value={value}
        max={5}
        size="medium"
        disabled={true}
        aria-label="현재 별점 현황"
        onValueChange={handleValueChange}
      />
      <Rating
        readOnly={false}
        value={value}
        max={5}
        size="large"
        disabled={true}
        aria-label="현재 별점 현황"
        onValueChange={handleValueChange}
      />
      <Rating
        readOnly={false}
        value={value}
        max={5}
        size="big"
        disabled={true}
        aria-label="현재 별점 현황"
        onValueChange={handleValueChange}
      />
    </div>
  );
}
```

### 접근성

- `Rating` 컴포넌트는 기본적으로 접근성을 지원하는 여러 속성을 포함하고 있어요. 이 속성들은 스크린 리더 사용자들이 컴포넌트를 명확하게 이해하고 상호작용할 수 있도록 도와줘요.

### 기본 접근성 지원

다음 속성이 있어서 다른 설정 없이도 기본적으로 사용자의 접근성을 고려한 `Rating` 컴포넌트를 제공할 수 있어요.

| 속성                 | 접근성 효과                                                                                          | 설명                                                                                                                               |
| -------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `aria-label`         | 스크린 리더에서 기본적으로 "별점 평가"로 인식해요.                                                   | 요소의 역할을 명확히 전달하여 사용자가 현재 평가 시스템임을 이해하도록 해요.                                                       |
| `aria-valuetext`     | 현재 선택된 평가 값을 스크린 리더에서 알려줘요. 기본적으로 "`max`점 만점 중 `value`점"으로 인식해요. | 점수의 상태에 따라 읽기 쉽게 텍스트로 표현된 만점 중 현재 평가 값 (1점, 2점 등)을 사용자에게 전달해요.                             |
| `aria-hidden={true}` | 불필요한 정보를 스크린 리더가 읽지 않도록 해요.                                                      | 별 아이콘들은 시각적으로 평점을 나타내지만, 해당 상태는 이미 aria-valuetext 속성을 통해 전달되므로 스크린 리더가 읽지 않도록 해요. |

```tsx
<Rating readOnly={false} value={3} max={5} size="medium" variant="full" aria-label="별점평가" aria-valuetext={`5점 만점 중 3점`}/>
<Rating readOnly={true} value={4} max={5} size="medium" variant="full" aria-label="현재 별점 현황" aria-valuetext={`5점 만점 중 4점`} aria-hidden={false}/>
```

`Rating` 컴포넌트에서는 접근성을 위해 화면에 보이지 않는 `<input type="range" />` 요소를 포함하고 있어요.

대신 시각적으로 보이는 요소에 `aria-label`과 `aria-valuetext` 속성이 적용되어 있어, 스크린 리더 사용자에게 올바른 정보를 전달할 수 있어요.

### 인터페이스

#### RatingProps

| 속성              | 기본값      | 타입                                                                                                                                |
| ----------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **readOnly\***    | `-`         | `false`                                                                                                                             | `true`읽기 전용으로 할지, 점수를 매길 수 있는 컴포넌트로 활용할지 결정해요.                                  |
| **value\***       | `-`         | `number``Rating` 컴포넌트에서 현재 점수를 결정해요.                                                                                 |
| **size\***        | `-`         | `"tiny"`                                                                                                                            | `"small"`                                                                                                    | `"medium"`                                                                                                                             | `"large"` | `"big"``Rating` 컴포넌트의 크기를 결정해요. `readOnly` 값이 `false` 일 때는, `size` 속성으로 `medium`, `large`, `big`을 제공하고 있어요. `readOnly` 값이 `true` 일 때는, `size` 속성으로 `tiny`, `small`, `medium`, `large`, `big`을 제공하고 있어요. |
| **variant\***     | `-`         | `"full"`                                                                                                                            | `"compact"`                                                                                                  | `"iconOnly"``Rating` 컴포넌트가 읽기 전용일 때, 컴포넌트의 형태 및 스타일을 결정해요. `readOnly` 값이 `false` 일 때는 사용하지 못해요. |
| **max**           | `5`         | `number``Rating` 컴포넌트에서 최대 점수를 결정해요.                                                                                 |
| **onValueChange** | `undefined` | `(value: number) => void``Rating` 컴포넌트의 점수 상태가 바뀔 때 실행되는 함수에요. `readOnly` 값이 `true` 일 때는 사용하지 못해요. |
| **disabled**      | `false`     | `false`                                                                                                                             | `true`이 값이 `true` 일 때 `Rating` 컴포넌트가 비활성화돼요. `readOnly` 값이 `true` 일 때는 사용하지 못해요. |
