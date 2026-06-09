# Slider

출처: https://tossmini-docs.toss.im/tds-mobile/components/slider/

Slider

### Slider

`Slider` 컴포넌트는 막대를 좌우로 움직여서 원하는 숫자를 선택할 수 있는 컨트롤이에요. 주어진 범위 내에서 핸들을 드래그하여 원하는 값을 선택할 수 있어요. 숫자의 범위를 시각적으로 표현하고 직관적으로 조절해야 하는 상황에서 유용하게 사용할 수 있어요.

### 사용법

### 색상 변경하기

`color` 속성을 사용하여 슬라이더의 트랙 색상을 변경할 수 있어요. 색상을 변경하면 슬라이더의 시각적 피드백을 강화하거나, 특정 상태나 의미를 전달할 때 유용해요. CSS 색상 값을 지정할 수 있으며, 기본값은 `blue400` 색상이에요.

Editable Example

```tsx
function SliderWithColor() {
  const [value, setValue] = React.useState(50);
  const [value2, setValue2] = React.useState(50);
  const [value3, setValue3] = React.useState(50);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <Slider
        color={adaptive.blue500}
        value={value}
        onValueChange={(newValue) => setValue(newValue)}
      />
      <Slider
        color={adaptive.green500}
        value={value2}
        onValueChange={(newValue) => setValue2(newValue)}
      />
      <Slider
        color={adaptive.red500}
        value={value3}
        onValueChange={(newValue) => setValue3(newValue)}
      />
    </div>
  );
}
```

### 라벨 사용하기

`label` 속성을 사용하여 슬라이더 아래에 최소값, 최대값, 중간값을 표시할 수 있어요. 슬라이더의 범위를 명확하게 표시하고 싶을 때 유용해요. 아래 예시처럼 가격 범위를 선택하는 슬라이더에서 최소 금액과 최대 금액을 표시할 때 활용할 수 있어요. 중간값을 표시하면 사용자가 원하는 값을 더 쉽게 찾을 수 있어요.

Editable Example

```tsx
function SliderWithLabel() {
  const [value, setValue] = React.useState(150);

  const MIN = 100;
  const MID = 150;
  const MAX = 200;

  return (
    <Slider
      value={value}
      minValue={MIN}
      maxValue={MAX}
      label={{ min: `${MIN} 만원`, mid: `${MID} 만원`, max: `${MAX} 만원` }}
      onValueChange={(newValue) => setValue(newValue)}
    />
  );
}
```

### 툴팁 사용하기

`tooltip` 속성을 사용하여 슬라이더 위에 현재 값을 표시할 수 있어요. 툴팁은 사용자가 슬라이더를 조작할 때 현재 선택된 값을 실시간으로 보여주어 더 정확한 값을 선택하는 데 도움을 줘요. 특히 정밀한 값 조절이 필요하거나, 슬라이더의 현재 값을 명확하게 보여줘야 하는 상황에서 유용해요.

`Slider.Tooltip` 컴포넌트를 사용하면 슬라이더의 현재 값을 툴팁으로 표시할 수 있어요. 이 컴포넌트는 `Tooltip` 컴포넌트의 속성을 그대로 사용할 수 있어서, `offset` 속성으로 툴팁의 위치를 조절하거나 다양한 스타일을 적용할 수 있어요. 슬라이더의 현재 값을 툴팁 메시지로 표시하려면 `message` 속성에 값을 전달해야 해요.

Editable Example

```tsx
function SliderWithTooltip() {
  const [value, setValue] = React.useState(50);

  return (
    <div style={{ paddingTop: "55px" }}>
      <Slider
        value={value}
        tooltip={<SliderTooltip message={value} />}
        onValueChange={(newValue) => setValue(newValue)}
      />
    </div>
  );
}
```

### 인터페이스

#### SliderProps

| 속성              | 기본값 | 타입                                                                                                  |
| ----------------- | ------ | ----------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| **value**         | `-`    | `number``Slider` 컴포넌트의 현재 값을 설정해요. 정의되지 않으면 사용자의 이벤트에 따라 값이 변경돼요. |
| **defaultValue**  | `-`    | `number``Slider` 컴포넌트의 기본값을 설정해요. 정의되지 않으면 사용자의 이벤트에 따라 값이 변경돼요.  |
| **onValueChange** | `-`    | `(value: number) => void``value`가 변경될 때 호출되는 함수에요.                                       |
| **minValue**      | `-`    | `number``value`의 최솟값을 설정해요.                                                                  |
| **maxValue**      | `-`    | `number``value`의 최댓값을 설정해요.                                                                  |
| **color**         | `-`    | `string``Slider` 컴포넌트의 트랙 색상을 변경해요.                                                     |
| **label**         | `-`    | `{ min: string; max: string; mid?: string; }``Slider` 컴포넌트 아래에 표시될 라벨을 설정해요.         |
| **tooltip**       | `-`    | `React.ReactElement<any, string                                                                       | React.JSXElementConstructor<any>>``Slider` 컴포넌트 위에 표시될 툴팁을 설정해요. |

#### SliderTooltipProps

Tooltip 컴포넌트를 확장하여 제작했어요. Tooltip 컴포넌트의 모든 속성을 사용할 수 있어요.

| 속성          | 기본값 | 타입                                     |
| ------------- | ------ | ---------------------------------------- |
| **message\*** | `-`    | `string`툴팁 메시지에 표시될 텍스트에요. |
