# ListRow / Components

출처: https://tossmini-docs.toss.im/tds-mobile/components/ListRow/list-row-components/

ListRow ListRow 영역 구성하기

### ListRow 영역 구성하기

이 문서를 읽고 나면,

- `ListRow`에서 사용할 수 있는 컴포넌트와 사용 방법을 이해할 수 있어요.
- `ListRow`의 `left`, `contents`, `right` 세 가지 영역에 위치할 수 있는 구성 요소를 이해하고 각 영역에 적합한 컴포넌트를 선택해 배치할 수 있어요.

### ListRow 구성요소 사용하기

### 아이콘 사용하기

`ListRow.AssetIcon` 컴포넌트는 리스트 항목에 아이콘을 추가해 콘텐츠의 성격을 표현할 때 사용해요. 이 컴포넌트들을 사용하면 항목의 중요한 특징을 직관적으로 전달할 수 있어요.

아이콘은 두 가지 방식으로 표시할 수 있어요. 디자인 시스템에서 제공하는 아이콘을 사용할 때는 `name` 속성을, 외부 이미지를 아이콘으로 사용할 때는 `url` 속성을 사용해요. 필요하면 `alt` 텍스트를 추가해 접근성을 높일 수 있어요.

#### 아이콘 모양 설정하기

`ListRow.AssetIcon` 컴포넌트는 `shape` 속성을 통해 다양한 스타일을 제공해요.

- `original`: 배경이 없는 기본 아이콘
- `squircle`: 스쿼클 배경이 있는 아이콘
- `card`: 카드 모양 배경이 있는 아이콘
- `circle`: 원형 배경이 있는 아이콘 (※ 레거시 옵션)

`ListRow.AssetIcon` 컴포넌트는 기본적으로 'small'과 'medium' 사이즈를 제공해요. `variant="fill"` 속성을 설정하면 'xsmall', 'small', 'medium' 사이즈를 선택할 수 있어요.

Editable Example

```tsx
<List>
  <ListRow
    left={<ListRow.AssetIcon name="icon-crown-simple" />}
    contents={<ListRow.Texts type="2RowTypeA" top="Original" bottom="variant=none" />}
  />
  <ListRow
    left={<ListRow.AssetIcon name="icon-lightning-bluegradation-fill" variant="fill" />}
    contents={<ListRow.Texts type="2RowTypeA" top="Original" bottom="variant=fill" />}
  />
  <ListRow
    left={
      <ListRow.AssetIcon
        shape="squircle"
        name="icon-crown-simple"
        size="small"
        backgroundColor={adaptive.grey100}
      />
    }
    contents={<ListRow.Texts type="2RowTypeA" top="Squircle Small" bottom="variant=none" />}
  />
  <ListRow
    left={
      <ListRow.AssetIcon
        shape="squircle"
        name="icon-lightning-bluegradation-fill"
        variant="fill"
        size="small"
        backgroundColor={adaptive.grey100}
      />
    }
    contents={<ListRow.Texts type="2RowTypeA" top="Squircle Small" bottom="variant=fill" />}
  />
  <ListRow
    left={
      <ListRow.AssetIcon shape="card" name="icon-crown-simple" backgroundColor={adaptive.grey100} />
    }
    contents={<ListRow.Texts type="2RowTypeA" top="Card Medium" bottom="variant=none" />}
  />
  <ListRow
    left={
      <ListRow.AssetIcon
        shape="card"
        name="icon-lightning-bluegradation-fill"
        variant="fill"
        backgroundColor={adaptive.grey100}
      />
    }
    contents={<ListRow.Texts type="2RowTypeA" top="Card Medium" bottom="variant=fill" />}
  />
  <ListRow
    left={
      <ListRow.AssetIcon
        shape="circle-background"
        name="icon-crown-simple"
        backgroundColor={adaptive.grey100}
      />
    }
    contents={
      <ListRow.Texts type="2RowTypeA" top="Circle Background" bottom="(고정사이즈 large) 40 * 40" />
    }
  />
  <ListRow
    left={
      <ListRow.AssetIcon
        variant="fill"
        shape="circle-masking"
        name="icon-lightning-bluegradation-fill"
      />
    }
    contents={
      <ListRow.Texts type="2RowTypeA" top="Circle Masking" bottom="(고정사이즈 large) 40 * 40" />
    }
  />
  <ListRow
    left={<ListRow.AssetIcon shape="circle-masking" name="icon-crown-simple" />}
    contents={<ListRow.Texts type="2RowTypeA" top="Circle Masking" bottom="마스킹 있음" />}
  />
  <ListRow
    left={
      <ListRow.AssetIcon
        variant="fill"
        shape="circle-background"
        name="icon-lightning-bluegradation-fill"
        backgroundColor={adaptive.grey100}
      />
    }
    contents={<ListRow.Texts type="2RowTypeA" top="Circle Background" bottom="마스킹 없음" />}
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

`ListRow.AssetImage` 컴포넌트는 실제 이미지나 썸네일을 표시할 때 사용해 리스트에 시각적인 정보를 더할 수 있어요.

이미지는 `shape` 속성을 통해 상황에 맞는 형태로 표현할 수 있어요.

- `original`: 원본 이미지
- `squircle`: 스쿼클 형태로 마스킹된 이미지
- `card`: 카드 형태로 마스킹된 이미지
- `square`: 정사각형으로 마스킹된 이미지
- `circle`: 원형으로 마스킹된 이미지

`ListRow.AssetImage` 컴포넌트는 'xsmall', 'small', 'medium'의 사이즈를 제공해요. 단, `square`, `circle`은 각각 52*52, 40*40의 고정 사이즈로 제공하고 있어요. `original`은 아래와 같이 고정 사이즈로 제공돼요.

- `Image`: 높이 56 맞춤 고정 사이즈
- `2D Emoji`: 높이 24 맞춤 고정 사이즈
- `3D Emoji`: 높이 40 맞춤 고정 사이즈

배경이 없는 리소스일 경우 `backgroundColor` 속성을 함께 사용해 주세요.

Editable Example

```tsx
<List>
  <ListRow
    left={
      <ListRow.AssetImage
        src="https://static.toss.im/photos/shopping-image-guide-30.png"
        shape="squircle"
        size="xsmall"
      />
    }
    contents={<ListRow.Texts type="2RowTypeA" top="xsmall" bottom="squircle" />}
  />
  <ListRow
    left={
      <ListRow.AssetImage
        src="https://static.toss.im/3d-common/u1F3AB-new-gold.png"
        shape="squircle"
        size="medium"
        scale={0.66}
        backgroundColor={adaptive.grey100}
      />
    }
    contents={<ListRow.Texts type="2RowTypeA" top="medium" bottom="squircle" />}
  />
  <ListRow
    left={
      <ListRow.AssetImage
        src="https://static.toss.im/photos/shopping-image-guide-30.png"
        shape="card"
        size="xsmall"
      />
    }
    contents={<ListRow.Texts type="2RowTypeA" top="xsmall" bottom="card" />}
  />
  <ListRow
    left={
      <ListRow.AssetImage
        src="https://static.toss.im/3d-common/u1F3AB-new-gold.png"
        shape="card"
        size="medium"
        scale={0.7}
        scaleType="fit"
        backgroundColor={adaptive.grey100}
      />
    }
    contents={<ListRow.Texts type="2RowTypeA" top="medium" bottom="card" />}
  />
  <ListRow
    left={
      <ListRow.AssetImage
        src="https://static.toss.im/photos/shopping-image-guide-30.png"
        shape="original"
      />
    }
    contents={<ListRow.Texts type="2RowTypeA" top="Original" bottom="(고정 사이즈) 높이 54 맞춤" />}
  />
  <ListRow
    left={
      <ListRow.AssetImage
        src="https://static.toss.im/3d-common/u1F3AB-new-gold.png"
        shape="original"
      />
    }
    contents={<ListRow.Texts type="2RowTypeA" top="Original" bottom="(고정 사이즈) 높이 54 맞춤" />}
  />
  <ListRow
    left={
      <ListRow.AssetImage
        src="https://static.toss.im/3d-common/u1F3AB-new-gold.png"
        shape="square"
        scale={0.66}
        size="xsmall"
        backgroundColor={adaptive.grey100}
      />
    }
    contents={<ListRow.Texts type="2RowTypeA" top="Square" bottom="(고정 사이즈) 52 * 52" />}
  />
  <ListRow
    left={
      <ListRow.AssetImage
        src="https://static.toss.im/3d-common/u1F3AB-new-gold.png"
        shape="circle"
        scale={0.66}
        size="xsmall"
        backgroundColor={adaptive.grey100}
      />
    }
    contents={<ListRow.Texts type="2RowTypeA" top="Circle" bottom="(고정 사이즈) 40 * 40" />}
  />
</List>
```

### 로띠 사용하기

`ListRow.AssetLottie` 컴포넌트를 사용하여 리스트 항목에 동적인 요소를 추가할 수 있어요. 주로 로딩 상태를 표현하거나 사용자의 주목을 끌어야 할 때 활용하면 좋아요.
`ListRow.AssetImage`와 동일하게 `shape` 속성을 사용할 수 있어요.

- `original`: 원본 로띠
- `squircle`: 스쿼클 배경이 있는 로띠
- `card`: 카드 모양 배경이 있는 로띠
- `square`: 정사각형 배경이 있는 로띠
- `circle`: 원형 배경이 있는 로띠

`ListRow.AssetLottie` 컴포넌트는 'xsmall', 'small', 'medium'의 사이즈를 제공해요. 단, `original`, `square`, `circle`은 각각 높이 40 맞춤, 52*52, 40*40의 고정 사이즈로 제공하고 있어요.

Editable Example

```tsx
<>
  <ListRow
    left={
      <ListRow.AssetLottie
        src="https://static.toss.im/lotties/bonus-graph-point-2.json"
        shape="squircle"
        size="xsmall"
      />
    }
    contents={<ListRow.Texts type="2RowTypeA" top="xsmall" bottom="squircle" />}
  />
  <ListRow
    left={
      <ListRow.AssetLottie
        src="https://static.toss.im/lotties/bonus-graph-point-2.json"
        shape="squircle"
        size="medium"
      />
    }
    contents={<ListRow.Texts type="2RowTypeA" top="medium" bottom="squircle" />}
  />
  <ListRow
    left={
      <ListRow.AssetLottie
        src="https://static.toss.im/lotties/bonus-graph-point-2.json"
        shape="card"
        size="xsmall"
      />
    }
    contents={<ListRow.Texts type="2RowTypeA" top="xsmall" bottom="card" />}
  />
  <ListRow
    left={
      <ListRow.AssetLottie
        src="https://static.toss.im/lotties/bonus-graph-point-2.json"
        shape="card"
        size="medium"
      />
    }
    contents={<ListRow.Texts type="2RowTypeA" top="medium" bottom="card" />}
  />
  <ListRow
    left={
      <ListRow.AssetLottie
        src="https://static.toss.im/lotties/bonus-graph-point-2.json"
        shape="original"
      />
    }
    contents={<ListRow.Texts type="2RowTypeA" top="Original" bottom="(고정 사이즈) 높이 54 맞춤" />}
  />
  <ListRow
    left={
      <ListRow.AssetLottie
        src="https://static.toss.im/lotties/bonus-graph-point-2.json"
        shape="square"
        size="xsmall"
      />
    }
    contents={<ListRow.Texts type="2RowTypeA" top="Square" bottom="(고정 사이즈) 52 * 52" />}
  />
  <ListRow
    left={
      <ListRow.AssetLottie
        src="https://static.toss.im/lotties/bonus-graph-point-2.json"
        shape="circle"
        size="xsmall"
      />
    }
    contents={<ListRow.Texts type="2RowTypeA" top="Circle" bottom="(고정 사이즈) 40 * 40" />}
  />
</>
```

### 왼쪽 텍스트 사용하기

`ListRow.AssetText` 컴포넌트는 왼쪽에 순서나 간단한 텍스트를 표시할 때 사용해요. `shape` 속성을 통해 `squircle`, `card` 형태를 사용할 수 있어요. 크기는 공통으로 'xsmall', 'small', 'medium' 사이즈를 제공해요.

Editable Example

```tsx
<List>
  <ListRow
    left={
      <ListRow.AssetText shape="squircle" size="xsmall">
        오늘
      </ListRow.AssetText>
    }
    contents={<ListRow.Texts type="2RowTypeA" top="size=xsmall" bottom="shape=squircle" />}
  />
  <ListRow
    left={
      <ListRow.AssetText shape="squircle" size="medium">
        오늘
      </ListRow.AssetText>
    }
    contents={<ListRow.Texts type="2RowTypeA" top="size=medium" bottom="shape=squircle" />}
  />
  <ListRow
    left={
      <ListRow.AssetText shape="card" size="xsmall">
        오늘
      </ListRow.AssetText>
    }
    contents={<ListRow.Texts type="2RowTypeA" top="size=xsmall" bottom="shape=card" />}
  />
  <ListRow
    left={
      <ListRow.AssetText shape="card" size="medium">
        오늘
      </ListRow.AssetText>
    }
    contents={<ListRow.Texts type="2RowTypeA" top="size=medium" bottom="shape=card" />}
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

`ListRow`의 왼쪽 영역은 사용자가 콘텐츠를 빠르게 인식할 수 있도록 도와주는 중요한 공간이에요. 이 영역에서는 `ListRow.AssetIcon`, `ListRow.AssetImage`, `ListRow.AssetLottie`, `ListRow.AssetText` 컴포넌트를 사용할 수 있어요.

Editable Example

```tsx
<List>
  <ListRow
    left={
      <ListRow.AssetIcon shape="squircle" name="icon-plus" backgroundColor={adaptive.grey100} />
    }
    contents={<ListRow.Texts type="1RowTypeA" top="AssetIcon (squircle)" />}
  />
  <ListRow
    left={
      <ListRow.AssetText shape="card" size="medium">
        오늘
      </ListRow.AssetText>
    }
    contents={<ListRow.Texts type="1RowTypeA" top="AssetText (card)" />}
  />
  <ListRow
    left={
      <ListRow.AssetImage src="https://static.toss.im/3d-emojis/u1F680-apng.png" shape="original" />
    }
    contents={<ListRow.Texts type="1RowTypeA" top="AssetImage (original)" />}
  />
  <ListRow
    left={
      <ListRow.AssetLottie
        src="https://static.toss.im/lotties/invest/invest-loop-2.json"
        shape="circle"
        size="medium"
      />
    }
    contents={<ListRow.Texts type="1RowTypeA" top="AssetLottie (circle)" />}
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

#### ListRowAssetIconProps

| 속성                 | 기본값           | 타입                                        |
| -------------------- | ---------------- | ------------------------------------------- | --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **shape**            | `squircle`       | `"original"`                                | `"squircle"`                                                                                              | `"card"`                                                                  | `"circle-background"` | `"circle-masking"`아이콘의 모양을 설정해요. - `original`: 배경이 없는 기본 아이콘이에요. - `squircle`: 스쿼클 형태의 아이콘이에요. 사이즈를 선택할 수 있어요. - `card`: 카드 형태의 아이콘이에요. 사이즈를 선택할 수 있어요. - `circle-background`: 원형 배경이 있는 아이콘이에요. - `circle-masking`: 원형 마스킹이 있는 아이콘이에요. |
| **alt**              | `-`              | `string`아이콘의 대체 텍스트를 설정해요.    |
| **dataLoggingLabel** | `-`              | `string`로깅을 위한 라벨을 설정해요.        |
| **variant**          | `'none'`         | `"fill"`                                    | `"none"`아이콘의 변형 스타일을 설정해요. 기존의 Fill Icon을 대체하는 속성이에요.                          |
| **size**             | `medium`         | `"xsmall"`                                  | `"small"`                                                                                                 | `"medium"`아이콘의 크기를 설정해요. squircle-background 일 때만 유효해요. |
| **paddingX**         | `false`          | `false`                                     | `true`shape가 card일 때 좌우 여백을 넣을지 결정해요. true일 경우 size별로 매핑된 내부 여백 값이 적용돼요. |
| **acc**              | `-`              | `React.ReactNode`액세서리(뱃지)를 설정해요. |
| **accPosition**      | `'bottom-right'` | `"bottom-right"`                            | `"top-right"`액세서리의 위치를 지정해요. `top-right`, `bottom-right` 중 하나를 선택할 수 있어요.          |
| **accMasking**       | `'none'`         | `"none"`                                    | `"circle"` `circle`로 설정하면 액세서리에 테두리가 생겨요.                                                |

#### ListRowIconButtonProps

| 속성         | 기본값                    | 타입                                                                                                                             |
| ------------ | ------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | --------- | -------------------------------------------------- |
| **color**    | `-`                       | `string`사용할 아이콘의 색상을 지정해요. 아이콘의 이름이 `-mono`로 끝나는 모노타입 아이콘을 사용할 때만 색상을 지정할 수 있어요. |
| **bgColor**  | `adaptive.greyOpacity100` | `string``IconButton` 컴포넌트의 배경색을 지정해요.                                                                               |
| **variant**  | `'clear'`                 | `"fill"`                                                                                                                         | `"clear"` | `"border"``IconButton` 컴포넌트의 형태를 결정해요. |
| **iconSize** | `24`                      | `number`이 값에 맞춰 아이콘의 크기를 변경해요. 예를 들어 이 값이 24라면, 24px이 크기로 적용돼요.                                 |
| **label**    | `-`                       | `string`button 태그의 `aria-label` 속성을 결정해요.                                                                              |

#### ListRowAssetImageProps

| 속성            | 기본값           | 타입                                        |
| --------------- | ---------------- | ------------------------------------------- | --------------------------------------------------------------------------------------------------------- | ------------------------------------- | ---------- | ----------------------------------- |
| **src\***       | `-`              | `string`이미지의 소스를 설정해요.           |
| **size**        | `'small'`        | `"xsmall"`                                  | `"small"`                                                                                                 | `"medium"`이미지의 사이즈를 설정해요. |
| **shape**       | `'squircle'`     | `"original"`                                | `"squircle"`                                                                                              | `"card"`                              | `"circle"` | `"square"`이미지의 모양을 설정해요. |
| **paddingX**    | `false`          | `false`                                     | `true`shape가 card일 때 좌우 여백을 넣을지 결정해요. true일 경우 size별로 매핑된 내부 여백 값이 적용돼요. |
| **acc**         | `-`              | `React.ReactNode`액세서리(뱃지)를 설정해요. |
| **accPosition** | `'bottom-right'` | `"bottom-right"`                            | `"top-right"`액세서리의 위치를 지정해요. `top-right`, `bottom-right` 중 하나를 선택할 수 있어요.          |
| **accMasking**  | `'none'`         | `"none"`                                    | `"circle"` `circle`로 설정하면 액세서리에 테두리가 생겨요.                                                |

#### ListRowAssetLottieProps

| 속성                | 기본값                    | 타입                                                                           |
| ------------------- | ------------------------- | ------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------- | ----------------------------------- | ---------- | --------------------------------- |
| **src\***           | `-`                       | `string`로티 아이콘의 소스를 설정해요.                                         |
| **size**            | `'small'`                 | `"xsmall"`                                                                     | `"small"`                                                                                                 | `"medium"`로띠의 사이즈를 설정해요. |
| **backgroundColor** | `adaptive.greyOpacity100` | `string`로띠의 배경색을 설정해요. shape이 original인 경우에는 적용되지 않아요. |
| **shape**           | `'squircle'`              | `"original"`                                                                   | `"squircle"`                                                                                              | `"card"`                            | `"circle"` | `"square"`로띠의 모양을 설정해요. |
| **paddingX**        | `false`                   | `false`                                                                        | `true`shape가 card일 때 좌우 여백을 넣을지 결정해요. true일 경우 size별로 매핑된 내부 여백 값이 적용돼요. |
| **acc**             | `-`                       | `React.ReactNode`액세서리(뱃지)를 설정해요.                                    |
| **accPosition**     | `'bottom-right'`          | `"bottom-right"`                                                               | `"top-right"`액세서리의 위치를 지정해요. `top-right`, `bottom-right` 중 하나를 선택할 수 있어요.          |
| **accMasking**      | `'none'`                  | `"none"`                                                                       | `"circle"` `circle`로 설정하면 액세서리에 테두리가 생겨요.                                                |

#### ListRowAssetTextProps

| 속성                | 기본값                    | 타입                                        |
| ------------------- | ------------------------- | ------------------------------------------- | --------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| **children\***      | `-`                       | `React.ReactNode`텍스트의 내용을 설정해요.  |
| **shape\***         | `-`                       | `"squircle"`                                | `"card"`텍스트의 모양을 설정해요.                                                                         |
| **size**            | `'small'`                 | `"xsmall"`                                  | `"small"`                                                                                                 | `"medium"`텍스트의 사이즈를 설정해요. |
| **backgroundColor** | `adaptive.greyOpacity100` | `string`텍스트의 배경색을 설정해요.         |
| **color**           | `adaptive.blue500`        | `string`텍스트의 색상을 설정해요.           |
| **paddingX**        | `false`                   | `false`                                     | `true`shape가 card일 때 좌우 여백을 넣을지 결정해요. true일 경우 size별로 매핑된 내부 여백 값이 적용돼요. |
| **acc**             | `-`                       | `React.ReactNode`액세서리(뱃지)를 설정해요. |
| **accPosition**     | `'bottom-right'`          | `"bottom-right"`                            | `"top-right"`액세서리의 위치를 지정해요. `top-right`, `bottom-right` 중 하나를 선택할 수 있어요.          |
| **accMasking**      | `'none'`                  | `"none"`                                    | `"circle"` `circle`로 설정하면 액세서리에 테두리가 생겨요.                                                |

#### ListRowTextsProps

| 속성          | 기본값 | 타입                          |
| ------------- | ------ | ----------------------------- | -------------------------------------------------------- | ------------- | ------------------ | ------------------ | ------------------ | ------------------ | ------------------ | ------------- | ------------- | ------------- | ------------- | ------------- | ------------- | ------------------ | ------------------ | ------------------ | ------------------ | ------------------ | ------------- | ------------- | ------------- | ------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **type**      | `-`    | `"1RowTypeA"`                 | `"1RowTypeB"`                                            | `"1RowTypeC"` | `"Right1RowTypeA"` | `"Right1RowTypeB"` | `"Right1RowTypeC"` | `"Right1RowTypeD"` | `"Right1RowTypeE"` | `"2RowTypeA"` | `"2RowTypeB"` | `"2RowTypeC"` | `"2RowTypeD"` | `"2RowTypeE"` | `"2RowTypeF"` | `"Right2RowTypeA"` | `"Right2RowTypeB"` | `"Right2RowTypeC"` | `"Right2RowTypeD"` | `"Right2RowTypeE"` | `"3RowTypeA"` | `"3RowTypeB"` | `"3RowTypeC"` | `"3RowTypeD"` | `"3RowTypeE"` | `"3RowTypeF"`텍스트의 타입을 설정해요. - 1줄 텍스트: `1RowTypeA` ~ `1RowTypeC`, `Right1RowTypeA` ~ `Right1RowTypeE` - 2줄 텍스트: `2RowTypeA` ~ `2RowTypeF`, `Right2RowTypeA` ~ `Right2RowTypeE` - 3줄 텍스트: `3RowTypeA` ~ `3RowTypeF` |
| **top**       | `-`    | `"ReactElement                | string"`상단 텍스트를 설정해요.                          |
| **middle**    | `-`    | `"ReactElement                | string"`중간 텍스트를 설정해요. (3Row 타입인 경우)       |
| **bottom**    | `-`    | `"ReactElement                | string"`하단 텍스트를 설정해요. (2Row, 3Row 타입인 경우) |
| **marginTop** | `-`    | `number`위쪽 여백을 설정해요. |
