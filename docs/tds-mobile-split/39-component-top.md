# Top

출처: https://tossmini-docs.toss.im/tds-mobile/components/top/

Top

### Top

![Top thumbnail](/tds-mobile/_next/static/media/Thumbnail-Top.683facc5.png)

`Top` 컴포넌트는 다양한 레이아웃을 지원하는 페이지 상단 컴포넌트로, 여러 요소(텍스트, 버튼, 이미지 등)를 쉽게 배치할 수 있어요. 주로 페이지의 최상단에 사용되어 헤더나 타이틀 영역을 구성하는 데 활용돼요.

동해물과 백두산이 마르고 닳도록텍스트를 적어주세요.

### 사용법

### 상하 여백 제어하기

`upperGap`와 `lowerGap` 속성을 사용해서 `Top` 컴포넌트의 상하 여백을 조정할 수 있어요.

Editable Example

```tsx
<Top
  upperGap={0}
  lowerGap={0}
  title={<Top.TitleParagraph size={28}>동해물과 백두산이</Top.TitleParagraph>}
  right={<Top.RightButton>선택하기</Top.RightButton>}
/>
```

### 상단에 요소 추가하기

`upper` 속성을 사용해서 콘텐츠 영역 상단에 요소를 추가할 수 있어요. `Top` 컴포넌트의 여백 규칙을 지키려면 `Asset` 컴포넌트를 `Top.UpperAssetContent` 컴포넌트로 감싸서 사용해 주세요.

Editable Example

```tsx
<Top
  upper={
    <Top.UpperAssetContent
      content={
        <Asset.Lottie
          frameShape={Asset.frameShape.SquareLarge}
          scale={1}
          src="https://static.toss.im/lotties-common/check-green-spot.json"
        />
      }
    />
  }
  title={<Top.TitleParagraph size={28}>동해물과 백두산이</Top.TitleParagraph>}
/>
```

### 하단에 요소 추가하기

`lower` 속성을 사용해서 콘텐츠 영역 하단에 요소를 추가할 수 있어요.

#### 하단에 버튼 한 개 추가하기

`Top.LowerButton` 컴포넌트를 사용해서 하단에 작은 버튼을 추가할 수 있어요.

Editable Example

```tsx
<Top
  title={<Top.TitleParagraph>동해물과 백두산이</Top.TitleParagraph>}
  lower={<Top.LowerButton>왜 사용할 수 없나요?</Top.LowerButton>}
/>
```

#### 하단에 버튼 두 개 추가하기

`Top.LowerCTA`와 `Top.LowerCTAButton` 컴포넌트를 사용해서 하단에 꽉 찬 두 개의 버튼을 표현할 수 있어요. `Top.LowerCTAButton`의 `display` 속성에 `block`을 설정하면 돼요.

Editable Example

```tsx
<Top
  title={<Top.TitleParagraph>동해물과 백두산이</Top.TitleParagraph>}
  lower={
    <Top.LowerCTA
      type="2-button"
      leftButton={
        <Top.LowerCTAButton color="dark" variant="weak" display="block">
          채우기
        </Top.LowerCTAButton>
      }
      rightButton={<Top.LowerCTAButton display="block">보내기</Top.LowerCTAButton>}
    />
  }
/>
```

### 우측에 요소 추가하기

`right` 속성을 사용해서 콘텐츠 영역 우측에 요소를 추가할 수 있어요.

#### 우측에 에셋 추가하기

`Asset` 컴포넌트를 사용해서 우측에 원하는 에셋을 추가할 수 있어요. `Top` 컴포넌트의 여백 규칙을 지키려면 `Asset` 컴포넌트를 `Top.RightAssetContent` 컴포넌트로 감싸서 사용하면 돼요.

Editable Example

```tsx
<Top
  title={<Top.TitleParagraph>동해물과 백두산이</Top.TitleParagraph>}
  right={
    <Top.RightAssetContent
      content={
        <Asset.Lottie
          frameShape={Asset.frameShape.CleanW60}
          src="https://static.toss.im/lotties-common/confetti-spot.json"
          loop={true}
          aria-hidden={true}
        />
      }
    />
  }
/>
```

#### 우측에 버튼 추가하기

`Top.RightButton` 컴포넌트를 사용해서 우측에 버튼을 추가할 수 있어요.

Editable Example

```tsx
<Top
  title={<Top.TitleParagraph>동해물과 백두산이</Top.TitleParagraph>}
  right={
    <Top.RightButton color="dark" variant="weak">
      송금
    </Top.RightButton>
  }
/>
```

### 콘텐츠 영역에 타이틀 추가하기

`title` 속성을 사용해 콘텐츠 영역에 타이틀을 추가할 수 있어요.

타이틀 영역에 단순한 정보를 보여주려면 `Top.TitleParagraph` 컴포넌트를 사용할 수 있어요. 이 컴포넌트는 상호작용이 없는 단순한 정보 전달용이에요.

Editable Example

```tsx
<Top title={<Top.TitleParagraph>동해물과 백두산이</Top.TitleParagraph>} />
```

#### 타이틀을 텍스트 버튼으로 추가하기

타이틀 영역에 링크와 같은 텍스트 버튼을 추가하려면 `Top.TitleTextButton` 컴포넌트를 사용할 수 있어요. `Top.TitleTextButton`는 타이틀 영역이 텍스트 버튼처럼 동작하며, 클릭할 때 기본적인 인터렉션이 나타나요.

Editable Example

```tsx
<Top title={<Top.TitleTextButton>동해물과 백두산이</Top.TitleTextButton>} />
```

#### 타이틀을 셀렉터 버튼으로 추가하기

타이틀 영역에 셀렉터 버튼을 추가할 때 `Top.TitleSelector` 컴포넌트를 사용할 수 있어요. `Top.TitleSelector`는 타이틀 영역이 화살표 아이콘을 갖는 텍스트 버튼처럼 동작하고, 클릭할 때 기본적인 인터렉션이 나타나요.

Editable Example

```tsx
<Top title={<Top.TitleSelector>동해물과 백두산이</Top.TitleSelector>} />
```

### 콘텐츠 영역에 서브타이틀 추가하기

`subtitleTop`과 `subtitleBottom` 속성을 사용해 타이틀 상단 또는 하단에 서브타이틀을 추가할 수 있어요.

서브타이틀 영역에 단순한 정보를 보여줄 때는 `Top.SubtitleParagraph` 컴포넌트를 사용할 수 있어요. 이 컴포넌트는 상호작용 없이 정보만 전달해요.

Editable Example

```tsx
<Top
  title={<Top.TitleParagraph>동해물과 백두산이</Top.TitleParagraph>}
  subtitleTop={<Top.SubtitleParagraph>텍스트를 적어주세요.</Top.SubtitleParagraph>}
/>
```

#### 서브타이틀을 텍스트 버튼으로 추가하기

서브타이틀 영역에 링크와 같은 텍스트 버튼을 추가하려면 `Top.SubtitleTextButton` 컴포넌트를 사용할 수 있어요. `Top.SubtitleTextButton`는 서브타이틀 영역이 텍스트 버튼처럼 동작하며, 클릭할 때 기본적인 인터렉션이 나타나요.

Editable Example

```tsx
<Top
  title={<Top.TitleParagraph>동해물과 백두산이</Top.TitleParagraph>}
  subtitleTop={<Top.SubtitleTextButton>텍스트를 적어주세요.</Top.SubtitleTextButton>}
/>
```

#### 서브타이틀을 셀렉터 버튼으로 추가하기

서브타이틀 영역에 셀렉터 버튼을 추가하려면 `Top.SubtitleSelector` 컴포넌트를 사용할 수 있어요. 이 컴포넌트는 화살표 아이콘이 포함된 버튼으로, 클릭할 때 인터렉션이 나타나요.

Editable Example

```tsx
<Top
  title={<Top.TitleParagraph>동해물과 백두산이</Top.TitleParagraph>}
  subtitleTop={<Top.SubtitleSelector type="arrow">텍스트를 적어주세요.</Top.SubtitleSelector>}
/>
```

#### 서브타이틀을 뱃지로 추가하기

서브타이틀 영역에는 `Top.SubtitleBadges` 컴포넌트를 사용할 수 있어요. `badges` 속성에 원하는 뱃지 정보를 넣으면 돼요.

Editable Example

```tsx
<Top
  title={<Top.TitleParagraph>동해물과 백두산이</Top.TitleParagraph>}
  subtitleTop={
    <Top.SubtitleBadges
      badges={[
        { text: `뱃지`, color: `red`, variant: `fill` },
        { text: `뱃지`, color: `green`, variant: `weak` },
      ]}
    />
  }
/>
```

### 접근성

`Top` 컴포넌트는 기본적으로 접근성을 지원하는 여러 속성을 포함하고 있어요. 이 속성들은 스크린 리더 사용자들이 컴포넌트를 명확하게 이해하고 상호작용할 수 있도록 도와줘요.

| 속성                      | 접근성 효과                                                        | 설명                                                                                         |
| ------------------------- | ------------------------------------------------------------------ | -------------------------------------------------------------------------------------------- |
| `role="heading"`          | 스크린 리더에서 이 텍스트가 제목임을 인식해요.                     | 사용자는 콘텐츠의 계층을 쉽게 파악할 수 있어요.                                              |
| `aria-level="1"`          | 제목의 중요도를 스크린 리더에 전달해요.                            | 주요 제목임을 나타내고, 사용자는 이를 토대로 페이지 구조를 이해해요.                         |
| `aria-level="2"`          | 부제목의 계층을 스크린 리더로 전달해요.                            | 주요 제목 아래에 속하는 부제목임을 사용자에게 알려줘요.                                      |
| `aria-haspopup="listbox"` | 드롭다운을 사용하는 부분에서 스크린 리더가 팝업 메뉴임을 인식해요. | 사용자는 버튼을 누르면 기존 값을 다른 값으로 변경하는 팝업이 열린다는 것을 예측할 수 있어요. |

### 적용 예시

- **Top.TitleParagraph**

- `role="heading"` 속성과 `aria-level="1"` 속성을 적용하여 해당 텍스트가 주요 제목임을 명확하게 전달해요.

```tsx
<Top.TitleParagraph role="heading" aria-level="1">
  주요 제목
</Top.TitleParagraph>
```

- **Top.SubtitleParagraph**

- `role="heading"`과 `aria-level="2"` 속성을 추가하여 부제목임을 알리고, 텍스트 계층 구조를 명확히 해줘요.

```tsx
<Top.SubtitleParagraph role="heading" aria-level="2">
  부제목
</Top.SubtitleParagraph>
```

- **Top.TitleSelector 및 Top.SubtitleSelector**

- `aria-haspopup="listbox"` 속성이 자동으로 추가되어, 사용자는 버튼을 누르면 기존 값을 다른 값으로 변경하는 팝업이 열린다는 것을 예측할 수 있어요.

```tsx
<Top.TitleSelector aria-haspopup="listbox">
 제목 선택
</Top.TitleSelector>
<Top.SubtitleSelector aria-haspopup="listbox">
 부제목 선택
</Top.SubtitleSelector>
```

### 추가로 지원해야 하는 접근성

Top 컴포넌트는 기본적인 접근성을 제공하지만, 추가적인 속성을 활용해서 사용자 경험을 더욱 개선할 수 있어요. 예를 들어, aria-label을 사용해 제목이나 선택 항목의 의미가 명확하지 않을 때 적절한 설명을 추가하면 사용자가 더 쉽게 이해할 수 있어요.

### 인터페이스

#### TopProps

| 속성                   | 기본값     | 타입                                                                                                                                                                                        |
| ---------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| **title\***            | `-`        | `React.ReactNode`콘텐츠 영역에 표시될 타이틀이에요. 주로 `Top.TitleParagraph`, `Top.TitleTextButton`, 그리고 `Top.TitleSelector` 컴포넌트를 사용해요.                                       |
| **upperGap**           | `24`       | `number`상단 여백을 지정해요.                                                                                                                                                               |
| **lowerGap**           | `24`       | `number`하단 여백을 지정해요.                                                                                                                                                               |
| **upper**              | `-`        | `React.ReactNode`콘텐츠 영역 상단에 표시될 부가적인 내용이에요. 주로 `Asset`과 `Top.UpperAssetContent` 컴포넌트를 사용해요.                                                                 |
| **lower**              | `-`        | `React.ReactNode`콘텐츠 영역 하단에 표시될 부가적인 내용이에요. 주로 `Top.LowerButton`, `Top.LowerCTA`, 그리고 `Top.LowerCTAButton` 컴포넌트를 사용해요.                                    |
| **subtitleTop**        | `-`        | `React.ReactNode`타이틀 상단에 표시될 부가적인 내용이에요. 주로 `Top.SubtitleParagraph`, `Top.SubtitleSelector`, `Top.SubtitleTextButton`, 그리고 `Top.SubtitleBadges` 컴포넌트를 사용해요. |
| **subtitleBottom**     | `-`        | `React.ReactNode`타이틀 하단에 표시될 부가적인 내용이에요. 주로 `Top.SubtitleParagraph`, `Top.SubtitleSelector`, `Top.SubtitleTextButton`, 그리고 `Top.SubtitleBadges` 컴포넌트를 사용해요. |
| **right**              | `-`        | `React.ReactNode`콘텐츠 영역 우측에 표시될 부가적인 내용이에요. 주로 `Asset`, `Top.RightAssetContent`, 그리고 `Top.RightButton` 컴포넌트를 사용해요.                                        |
| **rightVerticalAlign** | `'center'` | `"center"`                                                                                                                                                                                  | `"end"`콘텐츠 영역 우측의 수직 정렬을 제어해요. |

#### TopLowerButtonProps

Button 컴포넌트를 확장하여 제작했어요. Button 컴포넌트의 모든 속성을 사용할 수 있어요.

| 속성     | 기본값    | 타입      |
| -------- | --------- | --------- | ---------- | --------- | --------------------------------- |
| **size** | `'small'` | `"small"` | `"medium"` | `"large"` | `"xlarge"`버튼의 크기를 지정해요. |

#### TopLowerCTAProps

| 속성              | 기본값 | 타입                                              |
| ----------------- | ------ | ------------------------------------------------- |
| **type\***        | `-`    | `"2-button"`두 개의 버튼을 추가할 수 있어요.      |
| **leftButton\***  | `-`    | `React.ReactNode`왼쪽 영역에 표시할 버튼이에요.   |
| **rightButton\*** | `-`    | `React.ReactNode`오른쪽 영역에 표시할 버튼이에요. |

#### TopLowerCTAButtonProps

Button 컴포넌트를 확장하여 제작했어요. Button 컴포넌트의 모든 속성을 사용할 수 있어요.

| 속성     | 기본값    | 타입      |
| -------- | --------- | --------- | ---------- | --------- | --------------------------------- |
| **size** | `'large'` | `"small"` | `"medium"` | `"large"` | `"xlarge"`버튼의 크기를 지정해요. |

#### TopRightArrowProps

Icon 컴포넌트를 확장하여 제작했어요. Icon 컴포넌트의 모든 속성을 사용할 수 있어요.

| 속성      | 기본값                          | 타입                              |
| --------- | ------------------------------- | --------------------------------- |
| **color** | `adaptive.grey600`              | `string`아이콘의 색상을 지정해요. |
| **name**  | `'icon-arrow-right-small-mono'` | `string`아이콘의 이름을 지정해요. |

#### TopRightAssetContentProps

| 속성          | 기본값 | 타입                                                                       |
| ------------- | ------ | -------------------------------------------------------------------------- |
| **content\*** | `-`    | `React.ReactNode`우측에 표시할 콘텐츠로, 주로 `Asset` 컴포넌트를 사용해요. |

#### TopRightButtonProps

Button 컴포넌트를 확장하여 제작했어요. Button 컴포넌트의 모든 속성을 사용할 수 있어요.

| 속성     | 기본값     | 타입      |
| -------- | ---------- | --------- | ---------- | --------- | --------------------------------- |
| **size** | `'medium'` | `"small"` | `"medium"` | `"large"` | `"xlarge"`버튼의 크기를 지정해요. |

#### TopSubtitleBadgesProps

| 속성         | 기본값 | 타입                          |
| ------------ | ------ | ----------------------------- | ------ | ------- | ----- | -------- | ------------------------- | ------------------------------------- |
| **badges\*** | `-`    | `{ text: string; type: "blue" | "teal" | "green" | "red" | "yellow" | "elephant"; style: "fill" | "weak"; }[]`표시할 뱃지의 배열이에요. |

#### TopSubtitleParagraphProps

Paragraph 컴포넌트를 확장하여 제작했어요. Paragraph 컴포넌트의 모든 속성을 사용할 수 있어요.

| 속성           | 기본값             | 타입                              |
| -------------- | ------------------ | --------------------------------- | ----------- | ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ------- | ------- | ------- | ------ | ------- | ------ | ------- | ------- | ------ | -------- | ------ | -------- | ------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| **size**       | `17`               | `13`                              | `15`        | `17`텍스트의 크기를 지정해요. |
| **color**      | `adaptive.grey700` | `string`텍스트의 색상을 지정해요. |
| **typography** | `'t5'`             | `"t1"`                            | `"st1"`     | `"st2"`                       | `"st3"`                                                                                                                                             | `"t2"` | `"st4"` | `"st5"` | `"st6"` | `"t3"` | `"st7"` | `"t4"` | `"st8"` | `"st9"` | `"t5"` | `"st10"` | `"t6"` | `"st11"` | `"t7"` | `"st12"` | `"st13"`텍스트의 타이포그래피 스타일을 지정해요. 텍스트 크기(`size`)에 따라 기본값이 다르게 적용돼요: - size 13: t7 - size 15: t6 - size 17: t5 |
| **fontWeight** | `'medium'`         | `"medium"`                        | `"regular"` | `"semibold"`                  | `"bold"`텍스트의 폰트 굵기를 지정해요. 텍스트 크기(`size`)에 따라 기본값이 다르게 적용돼요: - size 13: regular - size 15: regular - size 17: medium |

#### TopSubtitleSelectorProps

| 속성           | 기본값             | 타입                                   |
| -------------- | ------------------ | -------------------------------------- | ----------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ------- | ------- | ------- | ------ | ------- | ------ | ------- | ------- | ------ | -------- | ------ | -------- | ------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **size**       | `17`               | `13`                                   | `15`        | `17`셀렉터 버튼의 크기를 지정해요. |
| **color**      | `adaptive.grey700` | `string`셀렉터 버튼의 색상을 지정해요. |
| **typography** | `'t5'`             | `"t1"`                                 | `"st1"`     | `"st2"`                            | `"st3"`                                                                                                                                     | `"t2"` | `"st4"` | `"st5"` | `"st6"` | `"t3"` | `"st7"` | `"t4"` | `"st8"` | `"st9"` | `"t5"` | `"st10"` | `"t6"` | `"st11"` | `"t7"` | `"st12"` | `"st13"`셀렉터 버튼의 타이포그래피 스타일을 지정해요. `size`에 따라 기본값이 다르게 적용돼요: - size 13: t7 - size 15: t6 - size 17: t5 |
| **fontWeight** | `'medium'`         | `"medium"`                             | `"regular"` | `"semibold"`                       | `"bold"`셀렉터 버튼의 폰트 굵기를 지정해요. `size`에 따라 기본값이 다르게 적용돼요: - size 13: regular - size 15: regular - size 17: medium |

#### TopSubtitleTextButtonProps

TextButton 컴포넌트를 확장하여 제작했어요. TextButton 컴포넌트의 모든 속성을 사용할 수 있어요.

| 속성        | 기본값             | 타입                                   |
| ----------- | ------------------ | -------------------------------------- | ------------- | --------------------------------------- | ---------- | ---------- | ------------------------------------------- |
| **size**    | `'medium'`         | `"small"`                              | `"medium"`    | `"large"`                               | `"xlarge"` | `"xsmall"` | `"xxlarge"`텍스트 버튼의 사이즈를 결정해요. |
| **variant** | `'arrow'`          | `"arrow"`                              | `"underline"` | `"clear"`텍스트 버튼의 형태를 결정해요. |
| **color**   | `adaptive.grey700` | `string`텍스트 버튼의 색상을 지정해요. |

#### TopTitleParagraphProps

Paragraph 컴포넌트를 확장하여 제작했어요. Paragraph 컴포넌트의 모든 속성을 사용할 수 있어요.

| 속성           | 기본값             | 타입                              |
| -------------- | ------------------ | --------------------------------- | ----------------------------- | ------------ | -------------------------------------- | ------ | ------- | ------- | ------- | ------ | ------- | ------ | ------- | ------- | ------ | -------- | ------ | -------- | ------ | -------- | --------------------------------------------------------------------------------------------------------------------- |
| **size**       | `22`               | `22`                              | `28`텍스트의 크기를 지정해요. |
| **color**      | `adaptive.grey800` | `string`텍스트의 색상을 지정해요. |
| **typography** | `'t3'`             | `"t1"`                            | `"st1"`                       | `"st2"`      | `"st3"`                                | `"t2"` | `"st4"` | `"st5"` | `"st6"` | `"t3"` | `"st7"` | `"t4"` | `"st8"` | `"st9"` | `"t5"` | `"st10"` | `"t6"` | `"st11"` | `"t7"` | `"st12"` | `"st13"`텍스트의 타이포그래피 스타일을 지정해요. `size`에 따라 기본값이 다르게 적용돼요: - size 22: t3 - size 28: st2 |
| **fontWeight** | `'bold'`           | `"medium"`                        | `"regular"`                   | `"semibold"` | `"bold"`텍스트의 폰트 굵기를 지정해요. |

#### TopTitleSelectorProps

| 속성           | 기본값             | 타입                                   |
| -------------- | ------------------ | -------------------------------------- | ----------- | ------------ | ------------------------------------------- | ------ | ------- | ------- | ------- | ------ | ------- | ------ | ------- | ------- | ------ | -------- | ------ | -------- | ------ | -------- | -------------------------------------------------------------------------------------------------------------------------- |
| **color**      | `adaptive.grey800` | `string`셀렉터 버튼의 색상을 지정해요. |
| **typography** | `'t3'`             | `"t1"`                                 | `"st1"`     | `"st2"`      | `"st3"`                                     | `"t2"` | `"st4"` | `"st5"` | `"st6"` | `"t3"` | `"st7"` | `"t4"` | `"st8"` | `"st9"` | `"t5"` | `"st10"` | `"t6"` | `"st11"` | `"t7"` | `"st12"` | `"st13"`셀렉터 버튼의 타이포그래피 스타일을 지정해요. `size`에 따라 기본값이 다르게 적용돼요: - size 22: t3 - size 28: st2 |
| **fontWeight** | `'bold'`           | `"medium"`                             | `"regular"` | `"semibold"` | `"bold"`셀렉터 버튼의 폰트 굵기를 지정해요. |

#### TopTitleTextButtonProps

TextButton 컴포넌트를 확장하여 제작했어요. TextButton 컴포넌트의 모든 속성을 사용할 수 있어요.

| 속성        | 기본값             | 타입                                   |
| ----------- | ------------------ | -------------------------------------- | ------------- | --------------------------------------- | ---------- | ---------- | ------------------------------------------- |
| **size**    | `'xlarge'`         | `"small"`                              | `"medium"`    | `"large"`                               | `"xlarge"` | `"xsmall"` | `"xxlarge"`텍스트 버튼의 사이즈를 결정해요. |
| **color**   | `adaptive.grey800` | `string`텍스트 버튼의 색상을 지정해요. |
| **variant** | `-`                | `"arrow"`                              | `"underline"` | `"clear"`텍스트 버튼의 형태를 경정해요. |

#### TopUpperAssetContentProps

| 속성          | 기본값 | 타입                                               |
| ------------- | ------ | -------------------------------------------------- |
| **content\*** | `-`    | `React.ReactNode`주로 `Asset` 컴포넌트를 사용해요. |
