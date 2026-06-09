# List Header

출처: https://tossmini-docs.toss.im/tds-mobile/components/list-header/

List Header

### ListHeader

![ListHeader thumbnail](/tds-mobile/_next/static/media/Thumbnail-ListHeader.dc3cb399.png)

`ListHeader` 컴포넌트는 사용자가 특정 동작을 실행하거나 추가 정보로 안내될 수 있는 헤더 UI 요소예요. 페이지나 섹션의 상단에 배치되어 사용자에게 제목, 설명, 그리고 상호작용 가능한 요소를 제공할 수 있어요. 주로 제목, 오른쪽의 부가 콘텐츠, 보조 설명을 포함해요.

보조설명 내용타이틀 내용악세사리

### 사용 예제

### 위치

`ListHeader` 컴포넌트의 보조 설명은 `descriptionPosition` 속성을 통해 위 또는 아래에 배치될 수 있어요. `top`과 `bottom` 두 가지를 제공해요. 기본적으로 `descriptionPosition`은 `top`으로 설정되어 있지만, `bottom` 값을 주면 설명이 제목 아래에 배치돼요.

Editable Example

```tsx
<div style={{ display: "flex", gap: "32px", flexDirection: "column" }}>
  <ListHeader
    title={
      <ListHeader.TitleParagraph typography="t5" color={adaptive.grey800} fontWeight="bold">
        타이틀 내용
      </ListHeader.TitleParagraph>
    }
    right={
      <ListHeader.RightText typography="t7" color={adaptive.grey700}>
        악세사리
      </ListHeader.RightText>
    }
    description={<ListHeader.DescriptionParagraph>보조설명 내용</ListHeader.DescriptionParagraph>}
    rightAlignment="center"
  />

  <ListHeader
    title={
      <ListHeader.TitleParagraph typography="t5" color={adaptive.grey800} fontWeight="bold">
        타이틀 내용
      </ListHeader.TitleParagraph>
    }
    right={
      <ListHeader.RightText typography="t7" color={adaptive.grey700}>
        악세사리
      </ListHeader.RightText>
    }
    description={<ListHeader.DescriptionParagraph>보조설명 내용</ListHeader.DescriptionParagraph>}
    rightAlignment="center"
    descriptionPosition="bottom"
  />
</div>
```

### 제목

`ListHeader`에서 제목을 사용하는 방법으로 `ListHeader.TitleParagraph`, `ListHeader.TitleTextButton`, `ListHeader.TitleSelector` 세 가지 방법을 제공하고 있어요.

#### 제목으로 텍스트(문단) 사용하기

`ListHeader` 컴포넌트에서 제목을 텍스트(문단)로 설정할 때, `title` 속성에 `ListHeader.TitleParagraph`을 사용해요. `ListHeader.TitleParagraph`은 `typography`와 `fontWeight`를 지정해 스타일을 변경할 수 있어요.

Editable Example

```tsx
<ListHeader
  title={
    <ListHeader.TitleParagraph typography="t5" color={adaptive.grey800} fontWeight="bold">
      타이틀 내용
    </ListHeader.TitleParagraph>
  }
  right={
    <ListHeader.RightText typography="t7" color={adaptive.grey700}>
      악세사리
    </ListHeader.RightText>
  }
  description={<ListHeader.DescriptionParagraph>보조설명 내용</ListHeader.DescriptionParagraph>}
  rightAlignment="center"
/>
```

#### 제목으로 텍스트 버튼 사용하기

`ListHeader` 컴포넌트에서 제목을 클릭할 수 있는 텍스트 버튼으로 설정할 때, `title` 속성에 `ListHeader.TitleTextButton`을 사용해요. `ListHeader.TitleTextButton`은 `size` 속성을 지정해 크기를 변경할 수 있어요.

형태는 `variant` 속성으로 `TextButton` 컴포넌트의 타입으로 정의된 `clear`, `arrow`, `underline` 세 가지를 제공해요.

Editable Example

```tsx
<div style={{ display: "flex", gap: "32px", flexDirection: "column" }}>
  <ListHeader
    title={
      <ListHeader.TitleTextButton
        size="large"
        color={adaptive.grey600}
        fontWeight="bold"
        variant="arrow"
      >
        타이틀 내용
      </ListHeader.TitleTextButton>
    }
    right={
      <ListHeader.RightText typography="t6" color={adaptive.grey700}>
        악세사리
      </ListHeader.RightText>
    }
    description={<ListHeader.DescriptionParagraph>보조설명 내용</ListHeader.DescriptionParagraph>}
    rightAlignment="center"
  />
  <ListHeader
    title={
      <ListHeader.TitleTextButton
        size="large"
        color={adaptive.grey600}
        fontWeight="bold"
        variant="arrow"
      >
        타이틀 내용
      </ListHeader.TitleTextButton>
    }
    right={
      <ListHeader.RightText typography="t6" color={adaptive.grey700}>
        악세사리
      </ListHeader.RightText>
    }
    description={<ListHeader.DescriptionParagraph>보조설명 내용</ListHeader.DescriptionParagraph>}
    rightAlignment="center"
  />
  <ListHeader
    title={
      <ListHeader.TitleTextButton
        size="large"
        color={adaptive.grey600}
        fontWeight="bold"
        variant="underline"
      >
        타이틀 내용
      </ListHeader.TitleTextButton>
    }
    right={
      <ListHeader.RightText typography="t6" color={adaptive.grey700}>
        악세사리
      </ListHeader.RightText>
    }
    description={<ListHeader.DescriptionParagraph>보조설명 내용</ListHeader.DescriptionParagraph>}
    rightAlignment="center"
  />
</div>
```

#### 제목으로 셀렉터 사용하기

제목에 선택 가능한 드롭다운 스타일의 셀렉터를 사용하고 싶을 때, `title` 속성에 `ListHeader.TitleSelector`를 사용해요. `ListHeader.TitleSelector`은 `typography`를 지정해 스타일을 변경할 수 있어요.

Editable Example

```tsx
<ListHeader
  title={
    <ListHeader.TitleSelector typography="t4" color={adaptive.grey800} fontWeight="bold">
      타이틀 내용
    </ListHeader.TitleSelector>
  }
  right={
    <ListHeader.RightText typography="t6" color={adaptive.grey700}>
      악세사리
    </ListHeader.RightText>
  }
  description={<ListHeader.DescriptionParagraph>보조설명 내용</ListHeader.DescriptionParagraph>}
  rightAlignment="center"
/>
```

### 화살표

오른쪽에 화살표 아이콘과 텍스트를 배치하려면 `ListHeader.RightArrow`를 사용해요. `ListHeader.RightArrow`는 클릭 가능한 요소로 사용할 수 있고, `onClick`을 추가해 클릭 시 발생하는 동작을 정의할 수 있어요.

Editable Example

```tsx
<div style={{ display: "flex", gap: "32px", flexDirection: "column" }}>
  <ListHeader
    title={
      <ListHeader.TitleParagraph typography="t7" color={adaptive.grey800} fontWeight="bold">
        타이틀 내용
      </ListHeader.TitleParagraph>
    }
    right={<ListHeader.RightArrow typography="t6">악세사리</ListHeader.RightArrow>}
    description={<ListHeader.DescriptionParagraph>보조설명 내용</ListHeader.DescriptionParagraph>}
    rightAlignment="center"
  />

  <ListHeader
    title={
      <ListHeader.TitleParagraph typography="t7" color={adaptive.grey800} fontWeight="bold">
        타이틀 내용
      </ListHeader.TitleParagraph>
    }
    right={<ListHeader.RightArrow typography="t6">악세사리</ListHeader.RightArrow>}
    description={<ListHeader.DescriptionParagraph>보조설명 내용</ListHeader.DescriptionParagraph>}
    rightAlignment="center"
    descriptionPosition="bottom"
  />
</div>
```

### 인터페이스

#### ListHeaderProps

| 속성                    | 기본값      | 타입                                                                                                                                                                                                                                                                       |
| ----------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **title\***             | `-`         | `React.ReactNode`ListHeader에 표시될 제목 요소예요. 제목 요소로 `ListHeader.TitleParagraph`, `ListHeader.TitleSelector`, `ListHeader.TitleTextButton`을 사용해주세요.                                                                                                      |
| **titleWidthRatio**     | `0.66`      | `number`제목이 차지하는 너비의 비율을 정의해요. `right` 속성이 설정되어 있다면, 제목과 `right`의 비율을 설정해요. 제목의 비율이 200% 이하일 때는 `titleWidthRatio`에 따라 결정되고, 200% 이상일 때는 `0.5`로 고정돼요. 더 큰 텍스트 비율이 200% 이상이면 `0.5`로 고정돼요. |
| **description**         | `undefined` | `React.ReactNode``ListHeader`에 표시될 설명 요소예요. `ListHeader.DescriptionParagraph`를 사용해 주세요.                                                                                                                                                                   |
| **descriptionPosition** | `'top'`     | `"top"`                                                                                                                                                                                                                                                                    | `"bottom"`설명 텍스트의 위치를 지정해요. `top`, `bottom` 두 가지 옵션을 제공하고 있어요. - `top`: 설명이 제목 위에 배치돼요. (기본값) - `bottom`: 설명이 제목 아래에 배치돼요. |
| **right**               | `undefined` | `React.ReactNode`ListHeader의 오른쪽에 표시될 요소예요. 오른쪽 요소는 `ListHeader.RightText` 또는 `ListHeader.RightArrow`로 정의할 수 있어요.                                                                                                                              |
| **rightAlignment**      | `'center'`  | `"bottom"`                                                                                                                                                                                                                                                                 | `"center"`오른쪽 요소의 정렬을 정의해요.                                                                                                                                       |

#### ListHeaderDescriptionParagraphProps

| 속성           | 기본값 | 타입                                                                                    |
| -------------- | ------ | --------------------------------------------------------------------------------------- |
| **children\*** | `-`    | `React.ReactNode`설명 문단으로 표시될 자식 요소예요. ListHeader의 설명 섹션에 사용돼요. |

#### ListHeaderRightArrowProps

| 속성             | 기본값             | 타입                                                                                                 |
| ---------------- | ------------------ | ---------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **typography\*** | `-`                | `"t7"`                                                                                               | `"t6"`화살표 옆에 표시될 텍스트의 타이포그래피 스타일을 설정해요. 't7' 또는 't6' 타이포그래피 스타일 중 하나를 사용할 수 있어요. |
| **children**     | `-`                | `React.ReactNode`화살표 옆에 표시될 요소예요. 텍스트나 다른 요소를 넣을 수 있어요.                   |
| **color**        | `adaptive.grey400` | `string`화살표 아이콘의 색상이에요.                                                                  |
| **textColor**    | `adaptive.grey700` | `string`화살표 옆에 표시되는 텍스트의 색상이에요.                                                    |
| **onClick**      | `undefined`        | `() => void`화살표를 클릭했을 때 호출되는 함수예요. 사용자가 클릭 시 실행할 동작을 정의할 수 있어요. |

#### ListHeaderRightTextProps

| 속성             | 기본값             | 타입                                                                                        |
| ---------------- | ------------------ | ------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| **typography\*** | `-`                | `"t7"`                                                                                      | `"t6"`오른쪽 텍스트의 타이포그래피 스타일을 설정해요. 't7' 또는 't6' 타이포그래피 스타일 중 하나를 사용할 수 있어요. |
| **children\***   | `-`                | `React.ReactNode`오른쪽에 표시될 텍스트 자식 요소예요. 텍스트나 다른 요소를 넣을 수 있어요. |
| **color**        | `adaptive.grey700` | `string`텍스트의 색상이에요.                                                                |

#### ListHeaderTitleParagraphProps

| 속성             | 기본값             | 타입                                                                                        |
| ---------------- | ------------------ | ------------------------------------------------------------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------ |
| **fontWeight\*** | `-`                | `"bold"`                                                                                    | `"medium"` | `"regular"`제목 텍스트의 글꼴 두께를 설정해요. 'bold', 'medium', 'regular' 중 하나를 선택할 수 있어요. |
| **children\***   | `-`                | `React.ReactNode`제목으로 표시될 텍스트 자식 요소예요. 텍스트나 다른 요소를 넣을 수 있어요. |
| **typography\*** | `-`                | `"t7"`                                                                                      | `"t5"`     | `"t4"`제목 텍스트의 타이포그래피 스타일을 설정해요. 't7', 't5', 't4' 중 하나를 선택할 수 있어요.       |
| **color**        | `adaptive.grey800` | `string`제목 텍스트의 색상이에요.                                                           |

#### ListHeaderTitleSelectorProps

| 속성             | 기본값 | 타입                                                                                      |
| ---------------- | ------ | ----------------------------------------------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------ |
| **typography\*** | `-`    | `"t7"`                                                                                    | `"t5"` | `"t4"`제목 텍스트의 타이포그래피 스타일을 설정해요. 't7', 't5', 't4' 중 하나를 선택할 수 있어요. |
| **children\***   | `-`    | `React.ReactNode`제목 선택자에 표시될 자식 요소예요. 텍스트나 다른 요소를 넣을 수 있어요. |

#### ListHeaderTitleTextButtonProps

TextButton 컴포넌트를 확장하여 제작했어요. TextButton 컴포넌트의 모든 속성을 사용할 수 있어요.

| 속성             | 기본값        | 타입                                                                                                                                           |
| ---------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------ |
| **size\***       | `-`           | `"medium"`                                                                                                                                     | `"xsmall"` | `"large"`제목 텍스트의 크기를 설정해요. 'xsmall', 'medium', 'large' 중 하나를 선택할 수 있어요.                                |
| **fontWeight\*** | `-`           | `"bold"`                                                                                                                                       | `"medium"` | `"regular"`제목 텍스트의 글꼴 두께를 설정해요. 'bold', 'medium', 'regular' 중 하나를 선택할 수 있어요.                         |
| **children\***   | `-`           | `React.ReactNode`버튼의 자식 요소로 표시될 요소예요. 텍스트나 다른 요소를 넣을 수 있어요.                                                      |
| **htmlType**     | `undefined`   | `string`버튼에 HTML의 `type` 속성을 컴포넌트의 루트 요소로 전달하기 위한 속성이에요. 해당 속성은 현재 임시로 제공되며, 추후 제거될 예정이에요. |
| **variant**      | `"underline"` | `"clear"`                                                                                                                                      | `"arrow"`  | `"underline"`버튼의 형태를 결정해요. `TextButton` 컴포넌트의 타입으로 정의된 `clear`, `arrow`, `underline` 세 가지를 제공해요. |
