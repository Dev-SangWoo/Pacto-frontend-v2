# ListRow / Legacy

출처: https://tossmini-docs.toss.im/tds-mobile/components/ListRow/ListRowLegacy/list-row-legacy/

ListRowListRowLegacy⚠️ v3에서 제거되는 API

### 이전 ListRow 확인하기

이 문서를 읽고 나면,

- `ListRow`에서 사용할 수 있는 컴포넌트와 사용 방법을 이해할 수 있어요.
- `ListRow`의 `left`, `contents`, `right` 세 가지 영역에 위치할 수 있는 구성 요소를 이해하고 각 영역에 적합한 컴포넌트를 선택해 배치할 수 있어요.

### ListRow 구성요소 사용하기

### 아이콘 사용하기

`ListRow.Icon`과 `ListRow.FillIcon` 컴포넌트는 리스트 항목에 아이콘을 추가해 콘텐츠의 성격을 표현할 때 사용해요. 이 컴포넌트들을 사용하면 항목의 중요한 특징을 직관적으로 전달할 수 있어요.

아이콘은 두 가지 방식으로 표시할 수 있어요. 디자인 시스템에서 제공하는 아이콘을 사용할 때는 `name` 속성을, 외부 이미지를 아이콘으로 사용할 때는 `url` 속성을 사용해요. 필요하면 `alt` 텍스트를 추가해 접근성을 높일 수 있어요.

#### 아이콘 모양 설정하기

`ListRow.Icon`과 `ListRow.FillIcon` 컴포넌트는 `shape` 속성을 통해 다양한 스타일을 제공해요.

**`ListRow.Icon` 컴포넌트**

- `no-background`: 배경이 없는 기본 아이콘
- `squircle-background`: 스쿼클 배경이 있는 아이콘
- `circle-background`: 원형 배경이 있는 아이콘
- `circle-masking`: 이미지를 원형으로 마스킹한 아이콘

**`ListRow.FillIcon` 컴포넌트**

- `default`: 배경이 없는 기본 아이콘
- `squircle`: 스쿼클 형태로 마스킹된 아이콘
- `circle-background`: 원형 배경이 있는 아이콘
- `circle-masking`: 아이콘을 원형으로 마스킹한 아이콘

`ListRow.Icon` 컴포넌트의 `squircle-background`와 `ListRow.FillIcon` 컴포넌트의 `squircle`에서는 `size` 속성으로 'medium'과 'large' 크기를 선택할 수 있어요.

#### Non-Fill Icon 사용하기

Editable Example

```tsx
<List>
  <ListRow
    left={<ListRow.Icon shape="no-background" name="icon-toss-logo-blank" />}
    contents={<ListRow.Texts type="1RowTypeA" top="no-background" />}
  />
  <ListRow
    left={<ListRow.Icon shape="squircle-background" name="icon-toss-logo-blank" size="medium" />}
    contents={<ListRow.Texts type="1RowTypeA" top="squircle-background medium" />}
  />
  <ListRow
    left={<ListRow.Icon shape="squircle-background" name="icon-toss-logo-blank" size="large" />}
    contents={<ListRow.Texts type="1RowTypeA" top="squircle-background large" />}
  />
  <ListRow
    left={<ListRow.Icon shape="circle-background" name="icon-toss-logo-blank" />}
    contents={<ListRow.Texts type="1RowTypeA" top="circle-background" />}
  />
  <ListRow
    left={<ListRow.Icon shape="circle-masking" name="icon-toss-logo-blank" />}
    contents={<ListRow.Texts type="1RowTypeA" top="circle-masking" />}
  />
</List>
```

#### Fill Icon 사용하기

Editable Example

```tsx
<List>
  <ListRow
    left={<ListRow.FillIcon shape="default" name="icon-mountain-fill-square" />}
    contents={<ListRow.Texts type="1RowTypeA" top="default" />}
  />
  <ListRow
    left={<ListRow.FillIcon shape="squircle" name="icon-mountain-fill-square" size="medium" />}
    contents={<ListRow.Texts type="1RowTypeA" top="squircle medium" />}
  />
  <ListRow
    left={<ListRow.FillIcon shape="squircle" name="icon-mountain-fill-square" size="large" />}
    contents={<ListRow.Texts type="1RowTypeA" top="squircle large" />}
  />
  <ListRow
    left={<ListRow.FillIcon shape="circle-background" name="icon-mountain-fill-square" />}
    contents={<ListRow.Texts type="1RowTypeA" top="circle-background" />}
  />
  <ListRow
    left={<ListRow.FillIcon shape="circle-masking" name="icon-mountain-fill-square" />}
    contents={<ListRow.Texts type="1RowTypeA" top="circle-masking" />}
  />
</List>
```

### 아이콘 버튼 사용하기

`ListRow.IconButton` 컴포넌트는 리스트 항목에 작은 버튼을 추가할 때 사용해요. 주로 설정, 즐겨찾기 추가 등 즉각적인 상호작용이 필요한 기능을 제공할 수 있어요. 버튼의 형태는 `variant` 속성을 통해 상황에 맞게 선택할 수 있어요.

- `fill`: 배경색이 있는 채워진 형태로, 주요 액션이나 강조가 필요할 때 사용해요.
- `clear`: 배경색이 없는 깔끔한 형태로, 간단한 액션이나 인터페이스를 깔끔하게 유지하고 싶을 때 사용해요.
- `border`: 테두리가 있는 형태로, 버튼의 영역을 시각적으로 구분하고 싶을 때 사용해요.

접근성을 고려해 `label` 속성을 통해 버튼의 용도를 설명할 수 있어요. 이는 스크린 리더 사용자들에게 버튼의 기능을 명확하게 전달해요.

Editable Example

```tsx
<List>
  <ListRow
    contents={<ListRow.Texts type="1RowTypeA" top="IconButton" />}
    right={
      <ListRow.IconButton
        variant="clear"
        iconSize={16}
        aria-label="위로화살표"
        src="https://static.toss.im/icons/png/4x/icon-arrow-up-2-mono.png"
      />
    }
  />
  <ListRow
    contents={<ListRow.Texts type="1RowTypeA" top="IconButton" />}
    right={
      <ListRow.IconButton
        variant="fill"
        iconSize={16}
        aria-label="위로화살표"
        src="https://static.toss.im/icons/png/4x/icon-arrow-up-2-mono.png"
      />
    }
  />
  <ListRow
    contents={<ListRow.Texts type="1RowTypeA" top="IconButton" />}
    right={
      <ListRow.IconButton
        variant="border"
        iconSize={16}
        aria-label="위로화살표"
        src="https://static.toss.im/icons/png/4x/icon-arrow-up-2-mono.png"
      />
    }
  />
</List>
```

### 이미지 사용하기

`ListRow.Image` 컴포넌트는 실제 이미지나 썸네일을 표시할 때 사용해 리스트에 시각적인 정보를 더할 수 있어요. 이미지는 `type` 속성을 통해 상황에 맞는 형태로 표현할 수 있어요. 기본 이미지 형태인 `default`부터 정사각형 형태의 `square`, 직사각형 형태의 `rectangle`과 그보다 작은 `rectangle-small`, 프로필 이미지에 적합한 `circle`과 `circle-small`, 그리고 3D 이모지 표현에 최적화된 `3d-emoji`까지 다양한 옵션을 제공해요.

Editable Example

```tsx
<List>
  <ListRow
    left={<ListRow.Image type="default" src="https://picsum.photos/300/200?random" />}
    contents={<ListRow.Texts type="1RowTypeA" top="Default" />}
  />
  <ListRow
    left={<ListRow.Image type="square" src="https://picsum.photos/300/200?random" />}
    contents={<ListRow.Texts type="1RowTypeA" top="Square" />}
  />
  <ListRow
    left={<ListRow.Image type="rectangle" src="https://picsum.photos/100?random" />}
    contents={<ListRow.Texts type="1RowTypeA" top="Circle" />}
  />
  <ListRow
    left={<ListRow.Image type="circle" src="https://picsum.photos/100?random" />}
    contents={<ListRow.Texts type="1RowTypeA" top="Circle Small" />}
  />

  <ListRow
    left={<ListRow.Image type="3d-emoji" src="https://static.toss.im/3d-emojis/u1F680-apng.png" />}
    contents={<ListRow.Texts type="1RowTypeA" top="3D Emoji" />}
  />
</List>
```

### 로띠 사용하기

로띠 애니메이션을 통해 리스트 항목에 동적인 요소를 추가할 수 있어요. 주로 로딩 상태를 표현하거나 사용자의 주목을 끌어야 할 때 활용하면 좋아요. 로띠를 사용하려면 `Asset.Lottie` 컴포넌트를 `ListRow.ImageContainer`로 감싸서 사용해야 해요. `ListRow.Image`와 동일하게 `type` 속성을 사용할 수 있어요. `default`, `square`, `rectangle`, `circle` 등의 타입을 지정해 로띠 애니메이션의 컨테이너 형태를 자유롭게 설정할 수 있어요.

Editable Example

```tsx
<ListRow
  left={
    <ListRow.ImageContainer type="circle">
      <Asset.Lottie src="https://static.toss.im/lotties/invest/invest-loop-2.json" />
    </ListRow.ImageContainer>
  }
  contents="Lottie (Rectangle)"
/>
```

### 왼쪽 텍스트 사용하기

`ListRow.LeftText` 컴포넌트는 왼쪽에 순서나 간단한 텍스트를 표시할 때 사용해요. 두 가지 형태를 지원해요.

-

`default`: 굵은 글씨체로 강조된 텍스트로 순서나 중요 코드에 활용할 수 있어요.

-

`border`: 원형 테두리가 있는 텍스트로 상태를 표시하거나, 카테고리를 보여줄 수 있어요.

Editable Example

```tsx
<List>
  <ListRow
    left={<ListRow.LeftText>01.01</ListRow.LeftText>}
    contents={<ListRow.Texts type="1RowTypeB" top="Text" />}
  />
  <ListRow
    left={<ListRow.LeftText color={colors.blue700}>1</ListRow.LeftText>}
    contents={<ListRow.Texts type="1RowTypeB" top="Text" />}
  />
  <ListRow
    left={
      <ListRow.LeftText color={colors.blue500} type="border">
        김
      </ListRow.LeftText>
    }
    contents={<ListRow.Texts type="1RowTypeB" top="Text (Border)" />}
  />
</List>
```

### 여러줄 텍스트 사용하기

`ListRow.Texts` 컴포넌트는 `type` 속성을 사용해 리스트 항목의 텍스트를 여러 줄로 나눠 표시하거나 시각적 계층을 조정할 수 있어요. `type` 속성에 사용할 수 있는 값들은 일관된 네이밍 규칙을 따르고 있어요.

- 앞부분의 숫자(1Row, 2Row, 3Row)는 텍스트가 차지하는 줄 수를 나타내요.
- 앞부분에 'Right'가 붙으면 오른쪽 정렬, 없으면 왼쪽 정렬이에요.
- 마지막 알파벳(A, B, C...)은 텍스트의 스타일 세트를 나타내요. 각 세트는 글자 크기, 굵기, 색상 등의 조합으로 구성되어 있어요.

주요 정보를 표시할 때는 일반 텍스트 타입을 사용해요. 제목이나 설명과 같은 핵심 내용을 표현할 때 적합해요. 줄 수에 따라 다음과 같은 타입을 선택할 수 있어요.

- 1줄 텍스트: `1RowTypeA` ~ `1RowTypeC`
- 2줄 텍스트: `2RowTypeA` ~ `2RowTypeF`
- 3줄 텍스트: `3RowTypeA` ~ `3RowTypeF`

날짜, 시간, 가격 등의 보조 정보나 상태값을 표시할 때는 오른쪽 정렬 텍스트 타입을 사용해요. 이 타입들은 오른쪽에 깔끔하게 정렬되어 표시되며, 다음과 같은 옵션을 제공해요.

- 1줄 텍스트: `Right1RowTypeA` ~ `Right1RowTypeE`
- 2줄 텍스트: `Right2RowTypeA` ~ `Right2RowTypeE`

Editable Example

```tsx
<List>
  <ListRow contents={<ListRow.Texts type="1RowTypeC" top="1RowTypeC" />} />
  <ListRow contents={<ListRow.Texts type="2RowTypeA" top="2RowTypeA" bottom="bottomText" />} />
  <ListRow contents={<ListRow.Texts type="2RowTypeD" top="2RowTypeD" bottom="bottomText" />} />
  <ListRow
    contents={
      <ListRow.Texts type="3RowTypeA" top="3RowTypeA" middle="middleText" bottom="bottomText" />
    }
  />
  <ListRow
    contents={
      <ListRow.Texts type="3RowTypeC" top="3RowTypeC" middle="middleText" bottom="bottomText" />
    }
  />
  <ListRow right={<ListRow.Texts type="Right1RowTypeA" top="Right1RowTypeA" />} />
  <ListRow
    right={<ListRow.Texts type="Right2RowTypeA" top="Right2RowTypeA" bottom="bottomText" />}
  />
  <ListRow
    right={<ListRow.Texts type="Right2RowTypeD" top="Right2RowTypeD" bottom="bottomText" />}
  />
</List>
```

### ListRow 영역 활용하기

### 왼쪽 영역

`ListRow`의 왼쪽 영역은 사용자가 콘텐츠를 빠르게 인식할 수 있도록 도와주는 중요한 공간이에요. 이 영역에서는 `ListRow.Icon`, `ListRow.LeftText`, `ListRow.Image`, `ListRow.ImageContainer` 컴포넌트를 사용할 수 있어요.

Editable Example

```tsx
<List>
  <ListRow
    left={<ListRow.Icon shape="circle-background" name="icon-plus" />}
    contents={<ListRow.Texts type="1RowTypeA" top="Icon (circle-background)" />}
  />
  <ListRow
    left={
      <ListRow.LeftText color={colors.blue500} type="border">
        김
      </ListRow.LeftText>
    }
    contents={<ListRow.Texts type="1RowTypeA" top="Text (Border)" />}
  />
  <ListRow
    left={<ListRow.Image type="3d-emoji" src="https://static.toss.im/3d-emojis/u1F680-apng.png" />}
    contents={<ListRow.Texts type="1RowTypeA" top="Image (3D Emoji)" />}
  />
  <ListRow
    left={
      <ListRow.ImageContainer type="circle">
        <Asset.Lottie src="https://static.toss.im/lotties/invest/invest-loop-2.json" />
      </ListRow.ImageContainer>
    }
    contents="Lottie"
  />
</List>
```

### contents 영역

`ListRow`의 `contents` 영역은 리스트 항목의 중앙에 위치해, 항목의 주요 텍스트 정보를 포함하는 공간이에요. 이 영역에서는 주로 `ListRow.Texts` 컴포넌트를 사용해 1줄, 2줄, 3줄 텍스트를 표현할 수 있어요.

Editable Example

```tsx
<List>
  <ListRow contents={<ListRow.Texts type="1RowTypeC" top="1RowTypeC" />} />
  <ListRow contents={<ListRow.Texts type="2RowTypeA" top="2RowTypeA" bottom="bottomText" />} />
  <ListRow contents={<ListRow.Texts type="2RowTypeD" top="2RowTypeD" bottom="bottomText" />} />
  <ListRow
    contents={
      <ListRow.Texts type="3RowTypeA" top="3RowTypeA" middle="middleText" bottom="bottomText" />
    }
  />
  <ListRow
    contents={
      <ListRow.Texts type="3RowTypeC" top="3RowTypeC" middle="middleText" bottom="bottomText" />
    }
  />
</List>
```

### 오른쪽 영역

`ListRow`의 오른쪽 영역은 사용자가 리스트 항목과 상호작용할 수 있는 다양한 요소를 배치할 수 있어요. 이 영역에서는 `ListRow.Texts`, `ListRow.IconButton` 컴포넌트를 사용하거나 `Switch`, `Badge` 같은 다른 컴포넌트와 조합할 수 있어요. 또한 `withArrow` prop을 사용해 화살표 아이콘을 표시할 수 있어요.

Editable Example

```tsx
<List>
  <ListRow right={<ListRow.Texts type="Right1RowTypeA" top="Right1RowTypeA" />} />
  <ListRow
    right={<ListRow.Texts type="Right2RowTypeA" top="Right2RowTypeA" bottom="bottomText" />}
  />
  <ListRow
    right={<ListRow.Texts type="Right2RowTypeD" top="Right2RowTypeD" bottom="bottomText" />}
  />
  <ListRow contents={<ListRow.Texts type="1RowTypeA" top="Switch" />} right={<Switch />} />
  <ListRow
    contents={<ListRow.Texts type="1RowTypeA" top="IconButton" />}
    right={
      <ListRow.IconButton
        variant="fill"
        iconSize={16}
        aria-label="위로화살표"
        src="https://static.toss.im/icons/png/4x/icon-arrow-up-2-mono.png"
      />
    }
  />
  <ListRow contents={<ListRow.Texts type="1RowTypeA" top="with arrow" />} withArrow={true} />
</List>
```

### 인터페이스

#### ListRowIconProps

| 속성                 | 기본값          | 타입                                     |
| -------------------- | --------------- | ---------------------------------------- | ------------------------------------------------------------------------ | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **shape**            | `no-background` | `"no-background"`                        | `"squircle-background"`                                                  | `"circle-background"` | `"circle-masking"`아이콘의 모양을 설정해요. - `no-background`: 기본 크기의 아이콘이에요. - `squircle-background`: 스쿼클 배경이 있는 아이콘이에요. 사이즈를 선택할 수 있어요. - `circle-background`: 원형 배경이 있는 아이콘이에요. - `circle-masking`: 원형으로 마스킹된 아이콘이에요. |
| **alt**              | `-`             | `string`아이콘의 대체 텍스트를 설정해요. |
| **dataLoggingLabel** | `-`             | `string`로깅을 위한 라벨을 설정해요.     |
| **size**             | `medium`        | `"medium"`                               | `"large"`아이콘의 크기를 설정해요. squircle-background 일 때만 유효해요. |

#### ListRowFillIconProps

| 속성                 | 기본값    | 타입                                     |
| -------------------- | --------- | ---------------------------------------- | ------------------------------------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **shape**            | `default` | `"circle-background"`                    | `"circle-masking"`                                            | `"default"` | `"squircle"`아이콘의 모양을 설정해요. - `default`: 기본 크기의 아이콘이에요. - `squircle`: 스쿼클 형태로 마스킹된 아이콘이에요. 사이즈를 선택할 수 있어요. - `circle-background`: 원형 배경이 있는 아이콘이에요. - `circle-masking`: 원형으로 마스킹된 아이콘이에요. |
| **alt**              | `-`       | `string`아이콘의 대체 텍스트를 설정해요. |
| **dataLoggingLabel** | `-`       | `string`로깅을 위한 라벨을 설정해요.     |
| **size**             | `medium`  | `"medium"`                               | `"large"`아이콘의 크기를 설정해요. squircle 일 때만 유효해요. |

#### ListRowIconButtonProps

| 속성         | 기본값                    | 타입                                                                                                                             |
| ------------ | ------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | --------- | -------------------------------------------------- |
| **color**    | `-`                       | `string`사용할 아이콘의 색상을 지정해요. 아이콘의 이름이 `-mono`로 끝나는 모노타입 아이콘을 사용할 때만 색상을 지정할 수 있어요. |
| **bgColor**  | `adaptive.greyOpacity100` | `string``IconButton` 컴포넌트의 배경색을 지정해요.                                                                               |
| **variant**  | `'clear'`                 | `"fill"`                                                                                                                         | `"clear"` | `"border"``IconButton` 컴포넌트의 형태를 결정해요. |
| **iconSize** | `24`                      | `number`이 값에 맞춰 아이콘의 크기를 변경해요. 예를 들어 이 값이 24라면, 24px이 크기로 적용돼요.                                 |
| **label**    | `-`                       | `string`button 태그의 `aria-label` 속성을 결정해요.                                                                              |

#### ListRowImageContainerProps

| 속성       | 기본값    | 타입        |
| ---------- | --------- | ----------- | ---------------------------------- | ------------- | ------------------- | ---------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **type**   | `default` | `"default"` | `"square"`                         | `"rectangle"` | `"rectangle-small"` | `"circle"` | `"circle-small"` | `"3d-emoji"`이미지 컨테이너의 타입을 설정해요. - `default`: 기본 스타일이에요. - `square`: 정사각형 스타일이에요. - `rectangle`: 직사각형 스타일이에요. - `rectangle-small`: 작은 직사각형 스타일이에요. - `circle`: 원형 스타일이에요. - `circle-small`: 작은 원형 스타일이에요. - `3d-emoji`: 3D 이모지 스타일이에요. |
| **border** | `false`   | `false`     | `true`테두리 표시 여부를 설정해요. |

#### ListRowImageProps

| 속성               | 기본값    | 타입                                               |
| ------------------ | --------- | -------------------------------------------------- | ---------------------------------- | ------------- | ------------------- | ---------- | ---------------- | ---------------------------------------------- |
| **type**           | `default` | `"default"`                                        | `"square"`                         | `"rectangle"` | `"rectangle-small"` | `"circle"` | `"circle-small"` | `"3d-emoji"`이미지 컨테이너의 타입을 설정해요. |
| **border**         | `false`   | `false`                                            | `true`테두리 표시 여부를 설정해요. |
| **containerStyle** | `-`       | `React.CSSProperties`컨테이너의 스타일을 설정해요. |

#### ListRowLeftTextProps

| 속성          | 기본값    | 타입                          |
| ------------- | --------- | ----------------------------- | ----------------------------------------------------------------------------------------------------------- |
| **type**      | `default` | `"default"`                   | `"border"`텍스트의 타입을 설정해요. - `default`: 기본 스타일이에요. - `border`: 테두리가 있는 스타일이에요. |
| **marginTop** | `-`       | `number`위쪽 여백을 설정해요. |

#### ListRowTextsProps

| 속성          | 기본값 | 타입                          |
| ------------- | ------ | ----------------------------- | -------------------------------------------------------- | ------------- | ------------------ | ------------------ | ------------------ | ------------------ | ------------------ | ------------- | ------------- | ------------- | ------------- | ------------- | ------------- | ------------------ | ------------------ | ------------------ | ------------------ | ------------------ | ------------- | ------------- | ------------- | ------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **type**      | `-`    | `"1RowTypeA"`                 | `"1RowTypeB"`                                            | `"1RowTypeC"` | `"Right1RowTypeA"` | `"Right1RowTypeB"` | `"Right1RowTypeC"` | `"Right1RowTypeD"` | `"Right1RowTypeE"` | `"2RowTypeA"` | `"2RowTypeB"` | `"2RowTypeC"` | `"2RowTypeD"` | `"2RowTypeE"` | `"2RowTypeF"` | `"Right2RowTypeA"` | `"Right2RowTypeB"` | `"Right2RowTypeC"` | `"Right2RowTypeD"` | `"Right2RowTypeE"` | `"3RowTypeA"` | `"3RowTypeB"` | `"3RowTypeC"` | `"3RowTypeD"` | `"3RowTypeE"` | `"3RowTypeF"`텍스트의 타입을 설정해요. - 1줄 텍스트: `1RowTypeA` ~ `1RowTypeC`, `Right1RowTypeA` ~ `Right1RowTypeE` - 2줄 텍스트: `2RowTypeA` ~ `2RowTypeF`, `Right2RowTypeA` ~ `Right2RowTypeE` - 3줄 텍스트: `3RowTypeA` ~ `3RowTypeF` |
| **top**       | `-`    | `"ReactElement                | string"`상단 텍스트를 설정해요.                          |
| **middle**    | `-`    | `"ReactElement                | string"`중간 텍스트를 설정해요. (3Row 타입인 경우)       |
| **bottom**    | `-`    | `"ReactElement                | string"`하단 텍스트를 설정해요. (2Row, 3Row 타입인 경우) |
| **marginTop** | `-`    | `number`위쪽 여백을 설정해요. |
