# ListRow / Overview

출처: https://tossmini-docs.toss.im/tds-mobile/components/ListRow/list-row-overview/

ListRowListRow 이해하기

### ListRow 이해하기

![ListRow thumbnail](/tds-mobile/_next/static/media/Thumbnail-ListRow.f8665962.png)

이 문서를 읽고 나면

- `ListRow` 컴포넌트의 전반적인 구성 요소와 그 역할에 대해 이해할 수 있어요.
- 다양한 스타일 옵션을 활용해 `ListRow`의 외형과 동작을 시각적으로 조정할 수 있어요.
- `ListRow`의 로딩 상태를 표시하고, 사용자 경험을 개선할 수 있어요.

- 동해물과 백두산이

### 이해하기

`ListRow` 컴포넌트는 리스트 형태의 UI를 구성할 때 사용해요. `left`, `contents`, `right` 세 영역으로 나뉘어 있으며, 각 영역에 아이콘, 텍스트, 이미지를 추가해 직관적인 리스트 아이템을 만들 수 있어요. 또한 터치 효과와 화살표 속성으로 사용자가 리스트 아이템의 동작을 쉽게 예측할 수 있고, 비활성화 속성을 사용해 특정 항목을 비활성화할 수도 있어요. 이를 통해 상황에 맞춰 다양한 리스트 UI를 구성할 수 있어요.

### ListRow의 기본 구조

`ListRow` 컴포넌트는 기본적으로 세 가지 주요 부분인 `left`, `contents`, `right`로 나뉘어 있어요. 각 영역에 맞는 내부 컴포넌트들을 적절히 배치해 사용자에게 적합한 리스트 아이템을 만들 수 있게 도와줘요.

- `left`: 컴포넌트 가장 왼쪽에 위치해 아이콘이나 이미지를 배치해 항목을 직관적으로 이해할 수 있게 돕는 영역이에요.
- `contents`: 컴포넌트의 중앙에 위치해 주요 텍스트 정보가 들어가는 영역으로 다양한 텍스트 레이아웃을 선택할 수 있어요.
- `right`: 컴포넌트의 가장 오른쪽에 위치해 부가적인 정보나 상호작용 요소를 배치하는 영역이에요.

각 영역의 구체적인 활용 예시는 ListRow 영역 구성하기 (https://tossmini-docs.toss.im/tds-mobile/components/ListRow/list-row-components/) 페이지를 확인해 주세요.

Editable Example

```tsx
<ListRow
  left={<ListRow.AssetIcon name="bank-toss" />}
  contents={
    <ListRow.Texts
      type="2RowTypeA"
      top="동해물과 백두산이"
      bottom="마르고닳도록 하느님이보우하사"
    />
  }
  right={
    <Button color="primary" size="small" variant="weak">
      Button
    </Button>
  }
/>
```

### 스타일 적용하기

### 구분선 사용하기

`border` 속성은 리스트 항목 위에 구분선을 추가하는 옵션이에요. 기본적으로 두 가지 스타일이 제공돼요.

- `indented`: 왼쪽에 들여쓰기가 적용된 구분선이에요. 주로 리스트 항목을 구분하기 위해 사용해요.
- `none`: 구분선이 없는 스타일이예요. 다른 리스트 항목과 연결된 느낌을 주고 싶을 때 사용해요.

Editable Example

```tsx
<ListRow border="indented" contents={<ListRow.Texts top="동해물과 백두산이" type="1RowTypeA" />} />
```

### 위 아래 여백 조절하기

`verticalPadding` 속성은 `ListRow` 컴포넌트의 상하 여백을 조절해 리스트 항목 간 간격을 다양하게 설정할 수 있어요. 이 속성을 통해 컴포넌트가 차지하는 세로 공간을 조정해 UI의 밀도와 시각적 여유를 조절할 수 있어요. 선택 가능한 옵션은 `small`, `medium`, `large`, `xlarge`로, 각 옵션에 따라 여백의 크기가 다르게 적용돼요.

Editable Example

```tsx
<List>
  <ListRow
    verticalPadding="small"
    border="indented"
    contents={<ListRow.Texts type="1RowTypeA" top="small" />}
  />
  <ListRow
    verticalPadding="medium"
    border="indented"
    contents={<ListRow.Texts type="1RowTypeA" top="medium" />}
  />
  <ListRow
    verticalPadding="large"
    border="indented"
    contents={<ListRow.Texts type="1RowTypeA" top="large" />}
  />
  <ListRow
    verticalPadding="xlarge"
    border="indented"
    contents={<ListRow.Texts type="1RowTypeA" top="xlarge" />}
  />
</List>
```

### 양옆 여백 조절하기

`horizontalPadding` 속성은 `ListRow` 컴포넌트의 좌우 여백을 조절할 수 있어요. 이 속성을 활용하면 콘텐츠와 화면 가장자리 사이의 간격을 조절해 리스트의 시각적 밀도를 조정할 수 있어요. 선택 가능한 옵션은 `small`, `medium`로, 각 옵션에 따라 여백의 크기가 다르게 적용돼요.

Editable Example

```tsx
<List>
  <ListRow
    horizontalPadding="small"
    border="indented"
    contents={<ListRow.Texts type="1RowTypeA" top="small" />}
  />
  <ListRow
    horizontalPadding="medium"
    border="indented"
    contents={<ListRow.Texts type="1RowTypeA" top="medium" />}
  />
</List>
```

### 비활성화하기

`disabled` 속성을 설정하면 리스트 항목을 비활성화시켜 클릭이나 상호작용을 막을 수 있어요. `disabledStyle` 속성을 사용해 비활성화된 항목의 스타일을 선택해요. 기본적으로 두 가지 스타일이 제공돼요.

- `type1`: 기본 비활성화 스타일로, 연한 흰색 배경이 적용돼요.
- `type2`: 기본 비활성화 스타일에 추가로 회색 배경이 덧입혀져 더 진하게 표시돼요. 선택 불가 상태임을 더 명확하게 전달하고 싶을 때 적합해요.

Editable Example

```tsx
<List style={{ position: "relative", zIndex: 1 }}>
  <ListRow
    disabled={true}
    disabledStyle="type1"
    left={<ListRow.AssetIcon name="bank-nh" />}
    contents={<ListRow.Texts type="1RowTypeA" top="disabled" />}
    right={<Button size="small">Button</Button>}
  />
  <ListRow
    disabled={true}
    disabledStyle="type2"
    left={<ListRow.AssetIcon name="bank-nh" />}
    contents={<ListRow.Texts type="1RowTypeA" top="disabled" />}
    right={<Button size="small">Button</Button>}
  />
</List>
```

### 터치 이벤트로 시각적인 반응 제공하기

`ListRow`는 `onClick` 핸들러가 있거나 `withTouchEffect` 속성을 직접 설정하면 터치 효과가 적용돼요. 사용자가 리스트 항목을 터치할 때 시각적인 반응을 제공해서 더 직관적인 인터페이스를 만들 수 있어요.

Editable Example

```tsx
<List>
  <ListRow
    contents={<ListRow.Texts top="클릭해보세요. (withTouchEffect)" type="1RowTypeA" />}
    withTouchEffect
  />
  <ListRow
    contents={<ListRow.Texts top="클릭해보세요. (onClick)" type="1RowTypeA" />}
    onClick={() => {}}
  />
</List>
```

### 시각적으로 강조하기

`ListRow`의 `ref`를 사용해서 리스트 항목을 시각적으로 강조할 수 있어요. 두 가지 효과를 활용하면 사용자의 주의를 더 효과적으로 끌 수 있어요.

- `shine`: 항목을 가로지르는 반짝임 효과를 보여줘요. 새로운 항목이 추가되었거나 중요한 변경사항을 강조하고 싶을 때 유용해요.
- `blink`: 항목 전체가 깜빡이는 효과를 보여줘요. 사용자의 주의를 끌어야 할 때 활용할 수 있어요.

Editable Example

```tsx
function VisualEffects() {
  const shineRef = React.useRef<ListRowRef>(null);
  const blinkRef = React.useRef<ListRowRef>(null);
  return (
    <List>
      <ListRow
        ref={shineRef}
        contents={
          <ListRow.Texts type="1RowTypeA" top="우측 버튼을 클릭하면 Shine 효과가 나타나요." />
        }
        right={
          <Button
            size="small"
            onClick={() => {
              shineRef.current?.shine(2);
            }}
          >
            Shine
          </Button>
        }
      />
      <ListRow
        ref={blinkRef}
        contents={
          <ListRow.Texts type="1RowTypeA" top="우측 버튼을 클릭하면 Blink 효과가 나타나요." />
        }
        right={
          <Button
            size="small"
            onClick={() => {
              blinkRef.current?.blink(1.5);
            }}
          >
            Blink
          </Button>
        }
      />
    </List>
  );
}
```

### 로딩 상태 표시하기

`ListRow.Loader` 컴포넌트를 사용하면 데이터가 로딩되는 동안 스켈레톤 UI를 표시할 수 있어요. 사용자에게 콘텐츠가 곧 로드될 것임을 시각적으로 알려주어 더 나은 사용자 경험을 제공할 수 있어요. 로더는 실제 `ListRow`와 동일한 레이아웃을 가지고 있어 자연스러운 전환 효과를 만들 수 있어요.

Editable Example

```tsx
<ListRow.Loader type="circle" verticalPadding="extraSmall" />
```

### 인터페이스

#### ListRowProps

| 속성                  | 기본값     | 타입                                                                        |
| --------------------- | ---------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **border**            | `indented` | `"indented"`                                                                | `"none"``ListRow` 컴포넌트의 구분선 스타일을 설정해요. - `indented`: 왼쪽에 들여쓰기가 적용된 구분선이에요. - `none`: 구분선이 없는 스타일이에요.       |
| **disabled**          | `false`    | `false`                                                                     | `true``ListRow` 컴포넌트의 비활성화 상태를 설정해요.                                                                                                    |
| **disabledStyle**     | `type1`    | `"type1"`                                                                   | `"type2"`비활성화된 `ListRow` 컴포넌트의 스타일을 설정해요. - `type1`: 연한 배경색이 적용된 스타일이에요. - `type2`: 진한 배경색이 적용된 스타일이에요. |
| **verticalPadding**   | `medium`   | `"small"`                                                                   | `"medium"`                                                                                                                                              | `"large"` | `"xlarge"``ListRow` 컴포넌트의 상하 여백을 설정해요. - `small`: 작은 여백이에요. (8px) - `medium`: 중간 크기의 여백이에요. (12px) - `large`: 큰 여백이에요. (16px) - `xlarge`: 가장 큰 여백이에요. (24px) |
| **horizontalPadding** | `medium`   | `"small"`                                                                   | `"medium"``ListRow` 컴포넌트의 좌우 여백을 설정해요. - `small`: 작은 여백이에요. (20px) - `medium`: 중간 크기의 여백이에요. (24px)                      |
| **left**              | `-`        | `React.ReactNode``ListRow` 컴포넌트의 왼쪽 영역에 들어갈 요소를 설정해요.   |
| **leftAlignment**     | `center`   | `"top"`                                                                     | `"center"`왼쪽 영역 요소의 수직 정렬을 설정해요.                                                                                                        |
| **contents**          | `-`        | `React.ReactNode``ListRow` 컴포넌트의 중앙 영역에 들어갈 요소를 설정해요.   |
| **right**             | `-`        | `React.ReactNode``ListRow` 컴포넌트의 오른쪽 영역에 들어갈 요소를 설정해요. |
| **rightAlignment**    | `center`   | `"top"`                                                                     | `"center"`오른쪽 영역 요소의 수직 정렬을 설정해요.                                                                                                      |
| **withArrow**         | `false`    | `false`                                                                     | `true`오른쪽 끝에 화살표 아이콘을 표시할지 설정해요.                                                                                                    |
| **withTouchEffect**   | `false`    | `false`                                                                     | `true`터치 시 시각적 효과를 표시할지 설정해요.                                                                                                          |

#### ListRowLoaderProps

| 속성                | 기본값   | 타입       |
| ------------------- | -------- | ---------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **type**            | `square` | `"square"` | `"circle"` | `"bar"``ListRowLoader` 컴포넌트의 로더 모양을 설정해요. - `square`: 정사각형 모양의 로더예요. - `circle`: 원형 모양의 로더예요. - `bar`: 막대 모양의 로더예요. |
| **verticalPadding** | `medium` | `"small"`  | `"medium"` | `"large"`                                                                                                                                                      | `"extraSmall"``ListRowLoader` 컴포넌트의 상하 여백을 설정해요. - `extraSmall`: 가장 작은 여백이에요. - `small`: 작은 여백이에요. - `medium`: 중간 크기의 여백이에요. - `large`: 큰 여백이에요. |
