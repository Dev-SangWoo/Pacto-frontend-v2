# Chart / Bar Chart

출처: https://tossmini-docs.toss.im/tds-mobile/components/Chart/bar-chart/

ChartBar Chart

### BarChart

`BarChart` 컴포넌트는 막대 그래프 형태로 데이터의 값을 시각화하는 도구예요. `BarChart`를 사용하면 데이터를 막대의 높이로 표현할 수 있고, 색상을 지정하여 특정 막대를 강조 할 수 있어요. 이를 통해 사용자는 데이터의 중요도를 한눈에 파악할 수 있어요.

6543211월2월3월4월5월6월

### 사용법

### 항목 구성하기

`BarChart`에 `data`를 전달하려면 아래와 같은 항목을 포함해야 해요.

- `maxValue`: `BarChart` 전체에서 최대값을 설정하는데 사용해요. 모든 `value` 값은 `maxValue`에 대한 비율로 표시돼요.
- `value`: 해당 막대의 실제 값을 나타내요. 막대의 높이는 이 값에 비례해 설정돼요.
- `label`: X축에 나타나는 레이블로, 각 막대가 나타내는 항목을 설명하는 텍스트예요.
- `barAnnotation`: 각 막대 위에 표시할 텍스트나 숫자예요. 해당 값이나 설명을 표시해 사용자가 데이터를 쉽게 이해할 수 있도록 도와줘요.
- `theme`: 해당 막대의 색상을 설정하는 속성이에요. `BarChart`에서 선택할 수 있는 색상 테마에는 `blue`, `green`, `yellow`, `orange`, `red`, `grey`, `default`가 있어요.

```tsx
<BarChart
  data={[
    { maxValue: 10, value: 6, label: "1월", barAnnotation: 6 },
    { maxValue: 10, value: 5, label: "2월", barAnnotation: 5 },
    { maxValue: 10, value: 4, label: "3월", barAnnotation: 4 },
    { maxValue: 10, value: 3, label: "4월", barAnnotation: 3 },
    { maxValue: 10, value: 2, label: "5월", barAnnotation: 2 },
    { maxValue: 10, value: 1, label: "6월", barAnnotation: 1 },
  ]}
  fill={{
    type: "all-bar",
    theme: "green",
  }}
/>
```

Editable Example

```tsx
<BarChart
  data={[
    { maxValue: 10, value: 6, label: "1월", barAnnotation: 6 },
    { maxValue: 10, value: 5, label: "2월", barAnnotation: 5 },
    { maxValue: 10, value: 4, label: "3월", barAnnotation: 4 },
    { maxValue: 10, value: 3, label: "4월", barAnnotation: 3 },
    { maxValue: 10, value: 2, label: "5월", barAnnotation: 2 },
    { maxValue: 10, value: 1, label: "6월", barAnnotation: 1 },
  ]}
  fill={{
    type: "all-bar",
    theme: "green",
  }}
/>
```

### 차트 스타일 지정하기

`BarChart`의 막대 스타일은 `fill`의 `type` 속성으로 설정할 수 있으며, 세 가지 타입인 `all-bar`, `single-bar`, `auto`를 지원해요. 각 타입에 따라 추가적으로 필요한 속성도 달라져요.

#### 전체 막대 색상 변경하기

`all-bar`는 모든 막대에 동일한 색상을 적용하고 싶을 때 사용하는 옵션이에요. 예를 들어, 모든 막대를 노란색으로 설정할 수 있어요. 이 경우 `theme` 속성을 이용해 적용할 색상만 지정해 주면 돼요.

Editable Example

```tsx
<BarChart
  data={[
    { maxValue: 10, value: 6, label: "1월", barAnnotation: 6 },
    { maxValue: 10, value: 5, label: "2월", barAnnotation: 5 },
    { maxValue: 10, value: 4, label: "3월", barAnnotation: 4 },
    { maxValue: 10, value: 3, label: "4월", barAnnotation: 3 },
    { maxValue: 10, value: 2, label: "5월", barAnnotation: 2 },
    { maxValue: 10, value: 1, label: "6월", barAnnotation: 1 },
  ]}
  fill={{
    type: "all-bar",
    theme: "yellow",
  }}
/>
```

#### 하나의 항목만 강조하기

`single-bar`는 하나의 막대만 다른 색상으로 강조할 때 사용하는 옵션이에요. 강조할 막대의 인덱스를 `barIndex` 속성으로 지정해 주면 선택한 막대만 색상이 적용되어 강조돼요.

Editable Example

```tsx
<BarChart
  data={[
    { maxValue: 10, value: 6, label: "1월", barAnnotation: 6 },
    { maxValue: 10, value: 5, label: "2월", barAnnotation: 5 },
    { maxValue: 10, value: 4, label: "3월", barAnnotation: 4 },
    { maxValue: 10, value: 3, label: "4월", barAnnotation: 3 },
    { maxValue: 10, value: 2, label: "5월", barAnnotation: 2 },
    { maxValue: 10, value: 1, label: "6월", barAnnotation: 1 },
  ]}
  fill={{
    type: "single-bar",
    barIndex: 0,
    theme: "blue",
  }}
/>
```

#### 자동으로 여러 항목 강조하기

`auto`는 여러 개의 막대를 자동으로 색상 적용하고 싶을 때 사용하는 타입이에요. 이 경우 `count` 속성을 설정해서 오른쪽부터 몇 개의 막대에 색상을 적용할지 지정할 수 있어요. `auto` 타입의 색상 적용 순서는 오른쪽부터 `blue → green → yellow → orange → red → grey` 순서로 적용돼요.

Editable Example

```tsx
function Auto() {
  const data = [
    { maxValue: 10, value: 6, label: "1월", barAnnotation: 6 },
    { maxValue: 10, value: 5, label: "2월", barAnnotation: 5 },
    { maxValue: 10, value: 4, label: "3월", barAnnotation: 4 },
    { maxValue: 10, value: 3, label: "4월", barAnnotation: 3 },
    { maxValue: 10, value: 2, label: "5월", barAnnotation: 2 },
    { maxValue: 10, value: 1, label: "6월", barAnnotation: 1 },
  ];
  return (
    <BarChart
      data={data}
      fill={{
        type: "auto",
        count: data.length,
      }}
    />
  );
}
```

### 높이 설정하기

차트 전체의 높이를 설정하는 속성이에요. 막대 개수에 상관없이 이 값에 따라 차트 전체 높이가 설정돼요. 막대 하나하나의 높이가 아닌, `BarChart` 컴포넌트 전체의 세로 길이를 조정할 때 사용해요.

Editable Example

```tsx
<BarChart
  data={[
    { maxValue: 10, value: 10, label: "1월", barAnnotation: 10 },
    { maxValue: 10, value: 9, label: "2월", barAnnotation: 9 },
    { maxValue: 10, value: 8, label: "3월", barAnnotation: 8 },
    { maxValue: 10, value: 7, label: "4월", barAnnotation: 7 },
    { maxValue: 10, value: 6, label: "5월", barAnnotation: 6 },
    { maxValue: 10, value: 5, label: "6월", barAnnotation: 5 },
  ]}
  fill={{
    type: "single-bar",
    barIndex: 3,
    theme: "orange",
  }}
  height={300}
/>
```

### 데이터가 많은 경우 표시하기

data의 항목 개수가 12개를 초과하면, 차트에서는 첫 번째와 마지막 항목에만 `label`과 `barAnnotation`이 표시돼요. 데이터가 많을 때 라벨이 겹쳐 보이는 것을 방지하기 위한 설정이에요.

Editable Example

```tsx
function DataSamples() {
  const data = [
    { maxValue: 10, value: 8, label: "2012", barAnnotation: 8 },
    { maxValue: 10, value: 7, label: "2013", barAnnotation: 7 },
    { maxValue: 10, value: 6, label: "2014", barAnnotation: 6 },
    { maxValue: 10, value: 5, label: "2015", barAnnotation: 5 },
    { maxValue: 10, value: 4, label: "2016", barAnnotation: 4 },
    { maxValue: 10, value: 3, label: "2017", barAnnotation: 3 },
    { maxValue: 10, value: 2, label: "2018", barAnnotation: 2 },
    { maxValue: 10, value: 3, label: "2019", barAnnotation: 3 },
    { maxValue: 10, value: 4, label: "2020", barAnnotation: 4 },
    { maxValue: 10, value: 5, label: "2021", barAnnotation: 5 },
    { maxValue: 10, value: 6, label: "2022", barAnnotation: 6 },
    { maxValue: 10, value: 7, label: "2023", barAnnotation: 7 },
    { maxValue: 10, value: 8, label: "2024", barAnnotation: 8 },
  ];
  return (
    <BarChart
      data={data}
      fill={{
        type: "auto",
        count: data.length,
      }}
    />
  );
}
```

### 인터페이스

#### BarChartProps

| 속성       | 기본값 | 타입                                                                    |
| ---------- | ------ | ----------------------------------------------------------------------- | --------- | ------- |
| **data\*** | `-`    | `"BarChartData[]"`-                                                     |
| **fill\*** | `-`    | `"AllBar                                                                | SingleBar | Auto"`- |
| **height** | `205`  | `number`차트 전체의 높이를 설정해요. 단위는 `px`이고, 기본값은 205예요. |

#### BarChartData

BarChartProps의 data에 들어가는 속성이에요.

| 속성              | 기본값 | 타입                                                                                     |
| ----------------- | ------ | ---------------------------------------------------------------------------------------- | ------------------------------------------- | ---------- | ---------- | ------- | -------- | ---------------------------------- |
| **value\***       | `-`    | `number`차트에서 막대의 길이에요.                                                        |
| **maxValue**      | `-`    | `number`차트에서 나타낼 최대값이에요. 설정하지 않으면 차트가 자동으로 최대값을 계산해요. |
| **label**         | `-`    | `string`X축에 표시될 레이블이에요.                                                       |
| **theme**         | `-`    | `"blue"`                                                                                 | `"green"`                                   | `"yellow"` | `"orange"` | `"red"` | `"grey"` | `"default"`막대의 색상을 설정해요. |
| **barAnnotation** | `-`    | `string`                                                                                 | `number`막대 위에 표시할 텍스트나 숫자예요. |

#### AllBar

BarChartProps의 fill 속성의 type이 all-bar인 경우 fill에 들어가는 속성이에요.

| 속성        | 기본값 | 타입                                         |
| ----------- | ------ | -------------------------------------------- | --------- | ---------- | ---------- | ------- | -------- | ------------------------------------------------ |
| **type\***  | `-`    | `"all-bar"`모든 막대에 같은 색상을 적용해요. |
| **theme\*** | `-`    | `"blue"`                                     | `"green"` | `"yellow"` | `"orange"` | `"red"` | `"grey"` | `"default"`모든 막대를 한가지 색상으로 적용해요. |

#### SingleBar

BarChartProps의 fill 속성의 type이 single-bar인 경우 fill에 들어가는 속성이에요.

| 속성           | 기본값 | 타입                                                     |
| -------------- | ------ | -------------------------------------------------------- | --------- | ---------- | ---------- | ------- | -------- | ------------------------------------------------ |
| **type\***     | `-`    | `"single-bar"`선택한 하나의 막대에만 색상을 적용해요.    |
| **theme\***    | `-`    | `"blue"`                                                 | `"green"` | `"yellow"` | `"orange"` | `"red"` | `"grey"` | `"default"`선택한 하나의 막대의 색상을 설정해요. |
| **barIndex\*** | `-`    | `number`색상을 적용할 막대의 위치를 지정하는 인덱스에요. |

#### Auto

BarChartProps의 fill 속성의 type이 auto인 경우 fill에 들어가는 속성이에요.

| 속성        | 기본값 | 타입                                                                                                                                  |
| ----------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| **type\***  | `-`    | `"auto"`막대에 정해진 규칙으로 색상을 자동으로 지정해요. blue -> green -> yellow -> orange -> red -> grey 순서로 오른쪽부터 적용돼요. |
| **count\*** | `-`    | `number`색상을 적용할 막대의 개수예요. 색상은 오른쪽부터 적용돼요.                                                                    |
