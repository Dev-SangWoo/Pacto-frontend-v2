# Paragraph

출처: https://tossmini-docs.toss.im/tds-mobile/components/paragraph/

Paragraph

### Paragraph

`Paragraph` 컴포넌트는 텍스트를 표시하는 데 사용돼요.

다양한 하위 요소나 속성을 조합해서 더 복잡한 구성을 할 수 있도록 설계되었어요.
이 문서에서는 `Paragraph`의 각 하위 요소가 어떤 역할을 하는지, 그리고 다양한 요소를 조합해 컴포넌트를 어떻게 사용하는지 쉽게 이해할 수 있어요.

동해물과 백두산이 마르고 닳도록

### 사용법

### 텍스트 표현하기

`Paragraph.Text`를 활용해서 텍스트를 표현할 수 있어요.
`Paragraph.Text`에서 사용할 수 있는 속성들은 ParagraphTextProps (https://tossmini-docs.toss.im/tds-mobile/components/paragraph/#paragraphtext)를 참고해 주세요.

Editable Example

```tsx
<Paragraph typography="t5">
  <Paragraph.Text>동해물과 백두산이 마르고 닳도록</Paragraph.Text>
  <Paragraph.Text>하느님이 보우하사</Paragraph.Text>
  <Paragraph.Text>우리나라 만세</Paragraph.Text>
</Paragraph>
```

### 아이콘 그리기

아이콘을 그리려면 `Paragraph.Icon` 컴포넌트를 사용하세요.
`Paragraph.Icon`에서 사용할 수 있는 속성들은 ParagraphIconProps (https://tossmini-docs.toss.im/tds-mobile/components/paragraph/#paragraphicon)를 참고해 주세요.

Editable Example

```tsx
<Paragraph typography="t5">
  <Paragraph.Text>{`동해물과 백두산이\n마르고 닳도록`}</Paragraph.Text>
  <Paragraph.Icon name="heart-line" />
  <Paragraph.Text>하느님이 보우하사</Paragraph.Text>
</Paragraph>
```

### 뱃지 그리기

뱃지를 그리려면 `Paragraph.Badge` 컴포넌트를 사용하세요.
`Paragraph.Badge`에서 사용할 수 있는 속성들은 ParagraphBadgeProps (https://tossmini-docs.toss.im/tds-mobile/components/paragraph/#paragraphbadge)를 참고해 주세요.

Editable Example

```tsx
<Paragraph typography="t5">
  <Paragraph.Text>{`동해물과 백두산이\n마르고 닳도록`}</Paragraph.Text>
  <Paragraph.Text>하느님이 보우하사</Paragraph.Text>
  <Paragraph.Badge color="blue" variant="fill">
    우리
  </Paragraph.Badge>
  <Paragraph.Badge color="red" variant="weak">
    나라
  </Paragraph.Badge>
  <Paragraph.Badge color="teal" variant="fill">
    만세
  </Paragraph.Badge>
</Paragraph>
```

### 링크 그리기

링크를 그리려면 `Paragraph.Link` 컴포넌트를 사용하세요.
`Paragraph.Link`에서 사용할 수 있는 속성들은 ParagraphLinkProps (https://tossmini-docs.toss.im/tds-mobile/components/paragraph/#paragraphlink)를 참고해 주세요.

`type` 속성을 통해 두 가지 스타일을 적용할 수 있어요.

- `underline`: 밑줄이 있는 링크
- `none`: 밑줄이 없는 링크

Editable Example

```tsx
<Paragraph typography="t5">
  <Paragraph.Text>일반 텍스트 사이에 </Paragraph.Text>

  <Paragraph.Link as="a" href="https://toss.im" type="underline" color={adaptive.green600}>
    <Paragraph.Text>밑줄이 있는 링크</Paragraph.Text>
  </Paragraph.Link>

  <Paragraph.Text>를 넣을 수 있어요. </Paragraph.Text>

  <Paragraph.Link as="a" href="https://toss.im">
    밑줄이 없는 링크는 기본 색상이 blue500이에요.
  </Paragraph.Link>

  <Paragraph.Link as="a" href="https://toss.im" type="underline">
    <Paragraph.Icon name="icon-gift-red" /> <Paragraph.Text>이미지, </Paragraph.Text>{" "}
    <Paragraph.Badge color="red" variant="weak">
      뱃지
    </Paragraph.Badge>
    <Paragraph.Text>컴포넌트를 내부에 넣을 수 있어요.</Paragraph.Text>
  </Paragraph.Link>
</Paragraph>
```

### 인터페이스

### Paragraph

#### ParagraphProps

| 속성                   | 기본값      | 타입                                                                                                                                         |
| ---------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ | ------------ | --------------------------------------------- | --------- | ---------- | ------- | ----------- | -------- | ---------------- | --------- | -------------------------------------------- | ------- | ------ | -------- | ------ | -------- | ------ | -------- | --------------------------------------------- |
| **typography\***       | `-`         | `"t1"`                                                                                                                                       | `"st1"`                                          | `"st2"`      | `"st3"`                                       | `"t2"`    | `"st4"`    | `"st5"` | `"st6"`     | `"t3"`   | `"st7"`          | `"t4"`    | `"st8"`                                      | `"st9"` | `"t5"` | `"st10"` | `"t6"` | `"st11"` | `"t7"` | `"st12"` | `"st13"``Paragraph`의 텍스트 크기를 결정해요. |
| **display**            | `'block'`   | `"block"`                                                                                                                                    | `"inline"``Paragraph`의 display 속성을 결정해요. |
| **ellipsisAfterLines** | `-`         | `number`lineClamp 속성을 결정해요. 예를 들어 `ellipsisAfterLines`가 3이면, 세 번째 줄에서 말줄임을 표시하고, 네 번째 줄부터는 보이지 않아요. |
| **textAlign**          | `-`         | `"inherit"`                                                                                                                                  | `"initial"`                                      | `"revert"`   | `"revert-layer"`                              | `"unset"` | `"center"` | `"end"` | `"justify"` | `"left"` | `"match-parent"` | `"right"` | `"start"``Paragraph`의 정렬 방향을 결정해요. |
| **fontWeight**         | `'regular'` | `"regular"`                                                                                                                                  | `"medium"`                                       | `"semibold"` | `"bold"``Paragraph`의 텍스트 굵기를 결정해요. |
| **color**              | `-`         | `string``Paragraph`의 텍스트 색상을 결정해요. CSS 색상 코드 또는 컬러 이름을 사용할 수 있어요.                                               |

### ParagraphText

#### ParagraphTextProps

| 속성           | 기본값 | 타입                                                           |
| -------------- | ------ | -------------------------------------------------------------- | ---------- | ------------ | ---------------------------------------- | ------ | ------- | ------- | ------- | ------ | ------- | ------ | ------- | ------- | ------ | -------- | ------ | -------- | ------ | -------- | ---------------------------------------- |
| **id**         | `-`    | `string``Text`에게 전달될 id를 결정해요.                       |
| **style**      | `-`    | `React.CSSProperties``Text`에게 전달될 HTML 스타일을 결정해요. |
| **className**  | `-`    | `string``Text`에게 전달될 클래스 이름을 결정해요.              |
| **children**   | `-`    | `React.ReactNode``Text`의 자식 요소를 결정해요.                |
| **typography** | `-`    | `"t1"`                                                         | `"st1"`    | `"st2"`      | `"st3"`                                  | `"t2"` | `"st4"` | `"st5"` | `"st6"` | `"t3"` | `"st7"` | `"t4"` | `"st8"` | `"st9"` | `"t5"` | `"st10"` | `"t6"` | `"st11"` | `"t7"` | `"st12"` | `"st13"``Text`의 텍스트 타입을 결정해요. |
| **fontWeight** | `-`    | `"regular"`                                                    | `"medium"` | `"semibold"` | `"bold"``Text`의 텍스트 굵기를 결정해요. |
| **color**      | `-`    | `string``Text`의 텍스트 색상을 결정해요.                       |

### ParagraphBadge

#### ParagraphBadgeProps

| 속성           | 기본값 | 타입                                                            |
| -------------- | ------ | --------------------------------------------------------------- | ------------------------------------------- | --------- | ------- | ---------- | --------------------------------------------- | ------- | ------- | ------ | ------- | ------ | ------- | ------- | ------ | -------- | ------ | -------- | ------ | -------- | ----------------------------------------- |
| **style\***    | `-`    | `"fill"`                                                        | `"weak"``Badge`의 스타일 (모양)을 결정해요. |
| **type\***     | `-`    | `"blue"`                                                        | `"teal"`                                    | `"green"` | `"red"` | `"yellow"` | `"elephant"``Badge`의 타입 (색상)을 결정해요. |
| **id**         | `-`    | `string``Badge`에게 전달될 id를 결정해요.                       |
| **className**  | `-`    | `string``Badge`에게 전달될 클래스 이름을 결정해요.              |
| **htmlStyle**  | `-`    | `React.CSSProperties``Badge`에게 전달될 HTML 스타일을 결정해요. |
| **children**   | `-`    | `React.ReactNode``Badge`의 자식 요소를 결정해요.                |
| **typography** | `-`    | `"t1"`                                                          | `"st1"`                                     | `"st2"`   | `"st3"` | `"t2"`     | `"st4"`                                       | `"st5"` | `"st6"` | `"t3"` | `"st7"` | `"t4"` | `"st8"` | `"st9"` | `"t5"` | `"st10"` | `"t6"` | `"st11"` | `"t7"` | `"st12"` | `"st13"``Badge`의 텍스트 타입을 결정해요. |

### ParagraphLink

#### ParagraphLinkProps

| 속성           | 기본값                                            | 타입                                     |
| -------------- | ------------------------------------------------- | ---------------------------------------- | ---------------------------------- | ------------ | ---------------------------------------- | ------ | ------- | ------- | ------- | ------ | ------- | ------ | ------- | ------- | ------ | -------- | ------ | -------- | ------ | -------- | ---------------------------------------- |
| **type**       | `'clear'`                                         | `"underline"`                            | `"clear"``Link`의 타입을 결정해요. |
| **typography** | `-`                                               | `"t1"`                                   | `"st1"`                            | `"st2"`      | `"st3"`                                  | `"t2"` | `"st4"` | `"st5"` | `"st6"` | `"t3"` | `"st7"` | `"t4"` | `"st8"` | `"st9"` | `"t5"` | `"st10"` | `"t6"` | `"st11"` | `"t7"` | `"st12"` | `"st13"``Link`의 텍스트 타입을 결정해요. |
| **fontWeight** | `-`                                               | `"regular"`                              | `"medium"`                         | `"semibold"` | `"bold"``Link`의 텍스트 굵기를 결정해요. |
| **color**      | `'var(--tds-paragraph-color, ${colors.blue500})'` | `string``Link`의 텍스트 색상을 결정해요. |

### ParagraphIcon

#### ParagraphIconProps

| 속성           | 기본값 | 타입                                                           |
| -------------- | ------ | -------------------------------------------------------------- | ------- | ------- | ------- | ------ | ------- | ------- | ------- | ------ | ------- | ------ | ------- | ------- | ------ | -------- | ------ | -------- | ------ | -------- | ------------------------------------------------------------------------ |
| **id**         | `-`    | `string``Icon`에게 전달될 id를 결정해요.                       |
| **style**      | `-`    | `React.CSSProperties``Icon`에게 전달될 HTML 스타일을 결정해요. |
| **className**  | `-`    | `string``Icon`에게 전달될 클래스 이름을 결정해요.              |
| **typography** | `-`    | `"t1"`                                                         | `"st1"` | `"st2"` | `"st3"` | `"t2"` | `"st4"` | `"st5"` | `"st6"` | `"t3"` | `"st7"` | `"t4"` | `"st8"` | `"st9"` | `"t5"` | `"st10"` | `"t6"` | `"st11"` | `"t7"` | `"st12"` | `"st13"`Icon의 높이를 결정해요. Asset.ContentIcon에 전달되는 속성이에요. |
