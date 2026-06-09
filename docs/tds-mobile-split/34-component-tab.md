# Tab

출처: https://tossmini-docs.toss.im/tds-mobile/components/tab/

Tab

### Tab

![Tab thumbnail](/tds-mobile/_next/static/media/Thumbnail-Tab.683101f0.png)

`Tab` 컴포넌트는 여러 콘텐츠를 한 화면에서 효율적으로 전환할 수 있도록 도와줘요. 각 탭은 콘텐츠 목록을 보여주고, 사용자가 선택한 탭에 따라 해당 콘텐츠를 전환해요. `Tab` 컴포넌트를 사용하면 여러 콘텐츠를 한 번에 볼 수 있고, 전환도 간편하게 할 수 있어요.

- 탭1
- 탭2
- 탭3

### 사용 예제

### 크기 조정하기

`Tab` 컴포넌트의 크기를 변경하려면 `size` 속성을 사용하세요. `small`, `large` 중 하나를 선택할 수 있어요.

Editable Example

```tsx
function Sizes() {
  const [selectedSmall, setSelectedSmall] = React.useState(0);
  const [selectedLarge, setSelectedLarge] = React.useState(0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <Tab size="small" onChange={(index) => setSelectedSmall(index)}>
        <Tab.Item selected={selectedSmall === 0}>small</Tab.Item>
        <Tab.Item selected={selectedSmall === 1}>small</Tab.Item>
      </Tab>
      <Tab size="large" onChange={(index) => setSelectedLarge(index)}>
        <Tab.Item selected={selectedLarge === 0}>large</Tab.Item>
        <Tab.Item selected={selectedLarge === 1}>large</Tab.Item>
      </Tab>
    </div>
  );
}
```

### 간격 조정하기

`Tab.Item` 컴포넌트들의 간격을 변경하려면 `itemGap` 속성을 사용하세요.

Editable Example

```tsx
function ItemGap() {
  const [selected, setSelected] = React.useState(0);

  return (
    <div style={{ display: "flex" }}>
      <Tab itemGap={36} onChange={(index) => setSelected(index)}>
        <Tab.Item selected={selected === 0}>탭1</Tab.Item>
        <Tab.Item selected={selected === 1}>탭2</Tab.Item>
        <Tab.Item selected={selected === 2}>탭3</Tab.Item>
        <Tab.Item selected={selected === 3}>탭4</Tab.Item>
        <Tab.Item selected={selected === 4}>탭5</Tab.Item>
      </Tab>
    </div>
  );
}
```

### 스크롤 되게 하기

아이템이 4개 이상이면 `fluid` 속성을 사용해보세요. 아이템이 많아지면 탭에 가로 스크롤이 생겨요.

Editable Example

```tsx
function Fluid() {
  const [selected, setSelected] = React.useState(0);

  return (
    <Tab fluid onChange={(index) => setSelected(index)}>
      {Array.from({ length: 20 }, (_, index) => (
        <Tab.Item key={index} selected={selected === index}>
          {index === 0 ? "탭1" : "긴텍스트"}
        </Tab.Item>
      ))}
    </Tab>
  );
}
```

### 접근성

`Tab` 컴포넌트는 기본적인 접근성을 제공해요.

### 기본 접근성 지원

`Tab` 컴포넌트는 다음과 같은 접근성 기능을 기본적으로 가지고 있어요. 덕분에 별도의 설정 없이도 기본적으로 사용자의 접근성을 고려한 형태의 `Tab` 컴포넌트를 제공할 수 있어요.

| 속성             | 접근성 효과                                | 설명                                                                                        |
| ---------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------- |
| `role="tablist"` | 스크린 리더에서 "탭 목록"으로 인식해요.    | 탭 컨테이너의 역할을 명확히 전달해요.                                                       |
| `role="tab"`     | 스크린 리더에서 "탭"으로 인식해요.         | 각 탭의 역할을 명확히 전달해요.                                                             |
| `aria-selected`  | 현재 선택된 탭을 스크린 리더에서 알려줘요. | 탭 컴포넌트를 구현할 때 `selected` 상태에 따라 `aria-selected` 속성이 자동 업데이트 됩니다. |

```tsx
<div role="tablist">
  <button role="tab" aria-selected="true">
    탭 1
  </button>
  <button role="tab" aria-selected="false">
    탭 2
  </button>
</div>
```

`Tab` 컴포넌트는 이러한 접근성 속성을 자동으로 지원해요. 특히 `selected` 상태에 따라 `aria-selected` 속성이 자동으로 업데이트되어 현재 선택된 탭을 스크린 리더 사용자에게 정확히 전달할 수 있어요. `redBean` 속성이 `true`일 때, 업데이트 아이콘과 동시에 `title` 속성으로 "(업데이트 있음)"이 추가되어 스크린 리더 사용자에게도 정보를 알릴 수 있어요.

### 추가로 지원해야 하는 접근성

개발자가 추가로 접근성을 고려해야 할 때도 있어요.

#### 레이블이 별도로 있거나 의미 전달이 명확하지 않을 때

`Tab` 컴포넌트의 의미를 전달하는 텍스트가 없거나 별도의 요소에 있을 때, 또는 아이콘만 사용하는 등 의미를 전달하기 어려울 때는 `aria-label` 속성을 사용해서 `Tab` 컴포넌트의 역할을 설명해야 해요.

```tsx
<button role="tab" aria-selected="false" aria-label="설정">
  <SettingsIcon />
</button>
```

주의할 점은 `aria-label`을 작성할 때 "탭"이라는 요소 유형은 적지 않도록 해야 해요. 스크린 리더가 이미 "탭"이라고 읽어주기 때문에 중복된 정보가 제공되기 때문이에요.

### 인터페이스

#### TabProps

| 속성           | 기본값    | 타입                                                                                                                                                           |
| -------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **children\*** | `-`       | `React.ReactNode``Tab`을 구성하는 하나 이상의 `Tab.Item` 컴포넌트를 받아요. `Tab.Item`은 각각의 탭을 나타내며, 여러 개의 `Tab.Item`을 배열로 전달할 수 있어요. |
| **onChange\*** | `-`       | `(index: number, key?: string                                                                                                                                  | number) => void`선택된 탭이 바뀔 때 실행되는 함수예요.                                                                                                                                 |
| **size**       | `'large'` | `"large"`                                                                                                                                                      | `"small"`사이즈에 따라 `Tab`의 높이와 텍스트 크기가 변경돼요.                                                                                                                          |
| **fluid**      | `false`   | `false`                                                                                                                                                        | `true`이 값이 `true`일 때 각 아이템의 너비가 글자 수에 맞춰져요. 아이템의 전체 크기가 `Tab`의 컨테이너를 넘어가면 가로 스크롤이 생겨요. `false`라면 최대 4개의 아이템 사용을 권장해요. |
| **itemGap**    | `-`       | `number`이 값에 맞춰 탭의 간격을 변경해요. 예를 들어 이 값이 `4`라면, `4px`이 간격으로 적용돼요.                                                               |
| **ariaLabel**  | `-`       | `string`보조 기술(스크린 리더 등)이 인식할 수 있도록 요소의 역할을 설명하는 텍스트예요.                                                                        |

#### TabItemProps

| 속성           | 기본값  | 타입    |
| -------------- | ------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **selected\*** | `-`     | `false` | `true`이 값이 `true`일 때 해당 `Tab.Item`이 선택된 상태로 표현돼요. 선택된 아이템을 바꾸려면 `Tab` 컴포넌트의 `onChange`에 상태를 바꾸는 함수를 전달해야 해요. (예: `setState`) |
| **redBean**    | `false` | `false` | `true`이 값이 `true`일 때 `Tab.Item`의 우측 상단에 빨간 동그라미가 표시돼요. 중요한 알림이나 새로운 업데이트가 있음을 사용자에게 시각적으로 전달할 수 있어요.                   |
