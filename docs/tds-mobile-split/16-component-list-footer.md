# List Footer

출처: https://tossmini-docs.toss.im/tds-mobile/components/list-footer/

List Footer

### ListFooter

`ListFooter` 컴포넌트는 리스트 항목의 마지막 부분에 위치해, 사용자에게 더 많은 항목을 불러오거나 목록을 확장하는 기능을 제공해요. 기본적으로 "더 보기"와 같은 텍스트를 표시해 리스트가 이어질 수 있다는 암시를 주고, 다양한 옵션으로 시각적 요소를 맞춤 설정할 수 있어요.

- 더 보기

### 사용법

### 텍스트 사용하기

리스트의 마지막에 "더 보기" 같은 텍스트를 표시하고 싶다면 `children`에 문자열을 전달하세요. 문자열을 전달하면 `ListFooter.Text` 컴포넌트를 사용해 텍스트가 렌더링돼요. 컴포넌트를 전달하면 그대로 렌더링돼요.

Editable Example

```tsx
<div>
  <ListFooter>더 보기</ListFooter>
  <ListFooter textColor={adaptive.grey600}>더 보기</ListFooter>
  <ListFooter>
    <ListFooter.Text color={adaptive.blue400} fontWeight="bold">
      더 보기
    </ListFooter.Text>
  </ListFooter>
</div>
```

### 아이콘과 함께 사용하기

"더 보기" 기능을 아이콘으로 표현하려면 `icon` 속성을 활용하세요. 문자열을 전달하면 `ListFooter.Icon` 컴포넌트와 함께 해당 아이콘이 렌더링돼요. 아이콘 컴포넌트를 직접 전달하면 그대로 렌더링돼요.

Editable Example

```tsx
<div>
  <ListFooter icon="icon-plus-small-mono">더 보기</ListFooter>
  <ListFooter icon="icon-arrow-down-mono" iconColor={adaptive.grey600} textColor={adaptive.grey600}>
    더 보기
  </ListFooter>
  <ListFooter
    textColor={adaptive.grey600}
    icon={<ListFooter.Icon name="icon-arrow-up-mono" color={adaptive.grey600} />}
  >
    더 보기
  </ListFooter>
</div>
```

### 상단 구분선 조정하기

`border` 속성을 사용해 `ListFooter`의 상단 구분선 스타일을 조정할 수 있어요. `border` 값에 따라 리스트의 시작 부분을 강조하거나 깔끔하게 보여줄 수 있어요.

- `full`: 리스트의 시작에 가느다란 구분선을 전체 너비로 표시해요. 기본값으로 설정된 옵션이며, `ListFooter`의 경계를 분명히 하고 싶을 때 적합해요.
- `indented`: 좌측 여백을 두고 구분선을 표시헤요. 리스트 내용과 자연스럽게 연결하고 싶을 때 사용해요.
- `none`: 구분선을 표시하지 않아요. 구분이 필요없거나 리스트가 하나로 이어진 느낌을 줄 때 사용해요.

또한 `hairline` 속성을 사용해 `ListFooter`의 구분선을 더 세밀하게 설정할 수 있어요.
`hairline`은 `ListFooter.Hairline` 컴포넌트를 렌더링 할 수 있고, `indent` 속성을 설정해 구분선의 왼쪽 여백을 픽셀 단위로 설정할 수 있어요. 예를 들어, `indent={50}`을 사용하면 구분선이 50px의 여백을 두고 렌더링돼요.

Editable Example

```tsx
<div>
  <ListFooter border="full">더 보기</ListFooter>
  <ListFooter border="indented">더 보기</ListFooter>
  <ListFooter border="none">더 보기</ListFooter>
  <ListFooter
    hairline={<ListFooter.Hairline indent={50} style={{ background: `${adaptive.blue100}` }} />}
  >
    더 보기
  </ListFooter>
</div>
```

### 그림자 효과 주기

`ListFooter`에 `onClick` 속성을 추가하면 클릭 시 그림자 효과가 나타나요. 이 효과는 사용자가 `ListFooter`와 상호작용하고 있음을 시각적으로 나타내며, 리스트가 확장되거나 더 많은 항목을 불러오는 동작임을 암시할 수 있어요.

또한 `shadow` 속성을 사용해 `ListFooter`의 그림자 효과를 더 세밀하게 설정할 수 있어요.
`ListFooter.Shadow` 컴포넌트와 `style` 속성을 조합하면 원하는 그림자 스타일을 적용할 수 있어요.

Editable Example

```tsx
function Shadow() {
  const onClick = () => {};
  return (
    <div>
      <ListFooter icon="icon-plus-small-mono" onClick={onClick}>
        더 보기
      </ListFooter>
      <ListFooter
        icon="icon-plus-small-mono"
        onClick={onClick}
        shadow={
          <ListFooter.Shadow
            style={{
              background: `radial-gradient(closest-side, ${adaptive.blue100} 0%, transparent 100%)`,
            }}
          />
        }
      >
        더 보기
      </ListFooter>
    </div>
  );
}
```

### 접근성

### 개발자가 추가로 지원해야 하는 접근성

#### 필수로 제공해야 하는 aria-label

`ListFooter` 컴포넌트에서는 `aria-label` 속성을 필수적으로 제공해서 `ListFooter` 버튼의 목적을 명확히 설명해야 합니다.
스크린 리더 사용자는 무엇에 대한 버튼인지 조금 더 구체적인 설명이 필요합니다. 화면을 보는 경우 위 아래 맥락을 파악하여 더보기에 대한 용도가 쉽게 파악이 되지만, 스크린 리더 사용자는 화면의 맥락을 파악한 상태에서 버튼에 접근하지 못할 가능성도 있기 때문입니다.

```tsx
<ListFooter
  onClick={goToNextPage}
  aria-label="다음 페이지로 이동하기" // 개발자가 필수로 제공해야 합니다
>
  <ListFooter.Text>더 보기</ListFooter.Text>
</ListFooter>
```

### 인터페이스

#### ListFooterProps

| 속성          | 기본값             | 타입                            |
| ------------- | ------------------ | ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **border**    | `full`             | `"full"`                        | `"indented"`                                                                                                                                                                                                            | `"none"`상단 구분선의 스타일을 설정해요. - `full`: 전체 너비로 표시해요. - `indented`: 좌측 여백을 두고 구분선을 표시해요. - `none`: 구분선을 표시하지 않아요. |
| **icon**      | `-`                | `"string"`                      | `"ReactElement"`아이콘을 설정해요. 문자열을 입력하면 `ListFooter.Icon` 컴포넌트와 함께 렌더링하고, `ReactElement`를 입력하면 전달한 컴포넌트를 그대로 렌더링해요.                                                       |
| **hairline**  | `-`                | `React.ReactElement<any, string | React.JSXElementConstructor<any>>`상단 구분선을 설정해요. 색상이나 간격 등을 수정하고 싶을 때 사용해요. `ListFooter.Hairline` 컴포넌트 또는 다른 선 컴포넌트를 사용해서 스타일을 커스터마이징할 수 있어요.              |
| **shadow**    | `-`                | `React.ReactElement<any, string | React.JSXElementConstructor<any>>``onClick` 속성이 있을 때 보이는 속성이에요. 기본 스타일을 변경하고 싶을 때 사용해요. `ListFooter.Shadow` 컴포넌트 또는 다른 선 컴포넌트를 사용해서 스타일을 커스터마이징할 수 있어요. |
| **textColor** | `adaptive.blue500` | `string`텍스트 색상을 설정해요. |
| **iconColor** | `adaptive.blue500` | `string`아이콘 색상을 설정해요. |
| **children**  | `-`                | `"string"`                      | `"ReactElement"`"더 보기"와 같은 하위 텍스트를 설정해요. 전달된 값이 문자열이라면 `ListFooter.Text` 컴포넌트와 함께 렌더링하고, ReactElement 라면 전달한 컴포넌트를 그대로 렌더링해요.                                  |

#### ListFooterTextProps

| 속성           | 기본값   | 타입                              |
| -------------- | -------- | --------------------------------- | ---------- | ------------ | ---------------------------------------- |
| **color**      | `-`      | `string`텍스트의 색상을 설정해요. |
| **fontWeight** | `medium` | `"regular"`                       | `"medium"` | `"semibold"` | `"bold"`텍스트의 두께 스타일을 설정해요. |

#### ListFooterIconProps

| 속성       | 기본값 | 타입                                     |
| ---------- | ------ | ---------------------------------------- |
| **name\*** | `-`    | `string`사용할 아이콘의 이름을 지정해요. |
| **color**  | `-`    | `string`아이콘의 색상을 설정해요.        |

#### ListFooterHairLineProps

| 속성       | 기본값 | 타입                                                                                                                |
| ---------- | ------ | ------------------------------------------------------------------------------------------------------------------- |
| **indent** | `-`    | `number`좌측 여백을 설정해요. 단위는 `px`이에요. 예를 들어, `indent={10}`으로 설정하면 좌측에 10px의 여백이 생겨요. |
