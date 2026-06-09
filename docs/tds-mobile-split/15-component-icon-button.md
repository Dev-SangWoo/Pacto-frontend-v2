# Icon Button

출처: https://tossmini-docs.toss.im/tds-mobile/components/icon-button/

Icon Button

### Icon Button

`IconButton` 컴포넌트는 사용자가 특정 작업을 실행하거나 이벤트를 트리거할 때 사용해요. 아이콘으로 기능을 직관적으로 전달하면서, UI를 간결하게 유지할 수 있어요.

### 사용법

### 형태

`IconButton`의 형태를 변경하려면 `variant` 속성을 사용하세요. 선택할 수 있는 값은 `'clear'`, `'fill'`, `'border'`가 있어요.

#### clear

배경 없이 아이콘만 보여주고 싶다면 `variant` 속성에 `'clear'`를 넣어주세요. 클릭한 상태에서는 배경 색이 보여요.

Editable Example

```tsx
<div style={{ display: "flex", gap: "8px" }}>
  <IconButton
    src="https://static.toss.im/icons/svg/icon-search-bold-mono.svg"
    variant="clear"
    aria-label="검색하기"
  />
  <IconButton
    src="https://static.toss.im/icons/svg/icon-line-three-mono.svg"
    variant="clear"
    aria-label="햄버거 메뉴 열기"
  />
  <IconButton
    src="https://static.toss.im/icons/svg/icon-alarm-mono.svg"
    variant="clear"
    aria-label="알림 열기"
  />
  <IconButton
    src="https://static.toss.im/icons/svg/icon-setting-mono.svg"
    variant="clear"
    aria-label="설정 열기"
  />
</div>
```

#### fill

아이콘 버튼에 배경색을 추가하려면 `variant`에 `'fill'`을 넣어주세요. 배경이 채워진 스타일로 아이콘이 강조돼요. 클릭한 상태에서는 배경 색이 사라져요.

Editable Example

```tsx
<div style={{ display: "flex", gap: "8px" }}>
  <IconButton
    src="https://static.toss.im/icons/svg/icon-search-bold-mono.svg"
    variant="fill"
    aria-label="검색하기"
  />
  <IconButton
    src="https://static.toss.im/icons/svg/icon-line-three-mono.svg"
    variant="fill"
    aria-label="햄버거 메뉴 열기"
  />
  <IconButton
    src="https://static.toss.im/icons/svg/icon-alarm-mono.svg"
    variant="fill"
    aria-label="알림 열기"
  />
  <IconButton
    src="https://static.toss.im/icons/svg/icon-setting-mono.svg"
    variant="fill"
    aria-label="설정 열기"
  />
</div>
```

#### border

테두리가 있는 스타일을 원한다면 `variant` 속성에 `'border'`를 넣어주세요. 버튼에 테두리가 생겨 아이콘이 구분되어 보여요. 클릭한 상태에서는 배경 색이 보여요.

Editable Example

```tsx
<div style={{ display: "flex", gap: "8px" }}>
  <IconButton
    src="https://static.toss.im/icons/svg/icon-search-bold-mono.svg"
    variant="border"
    aria-label="검색하기"
  />
  <IconButton
    src="https://static.toss.im/icons/svg/icon-line-three-mono.svg"
    variant="border"
    aria-label="햄버거 메뉴 열기"
  />
  <IconButton
    src="https://static.toss.im/icons/svg/icon-alarm-mono.svg"
    variant="border"
    aria-label="알림 열기"
  />
  <IconButton
    src="https://static.toss.im/icons/svg/icon-setting-mono.svg"
    variant="border"
    aria-label="설정 열기"
  />
</div>
```

### 아이콘 색 변경하기

아이콘 색을 변경하려면 `color` 속성을 사용하세요. 아이콘의 이름이 `-mono`로 끝나는 모노타입의 아이콘만 색을 변경할 수 있어요.

Editable Example

```tsx
<div style={{ display: "flex", gap: "8px" }}>
  <IconButton
    src="https://static.toss.im/icons/svg/icon-search-bold-mono.svg"
    color={adaptive.red500}
    aria-label="검색하기"
  />
  <IconButton
    src="https://static.toss.im/icons/svg/icon-search-bold-mono.svg"
    color={adaptive.blue500}
    aria-label="검색하기"
  />
  <IconButton
    src="https://static.toss.im/icons/svg/icon-search-bold-mono.svg"
    color={adaptive.yellow500}
    aria-label="검색하기"
  />
  <IconButton
    src="https://static.toss.im/icons/svg/icon-search-bold-mono.svg"
    color={adaptive.green500}
    aria-label="검색하기"
  />
</div>
```

### 배경 색 변경하기

`IconButton` 컴포넌트의 배경 색을 변경하려면 `bgColor` 속성을 사용하세요. `variant` 속성의 값이 `'fill'`일 때는 지정한 색이 배경 색으로 적용되고, `'clear'`나 `'border'`일 때는 버튼을 눌렀을 때 배경 색으로 적용돼요.

Editable Example

```tsx
<div style={{ display: "flex", gap: "8px" }}>
  <IconButton
    src="https://static.toss.im/icons/svg/icon-search-bold-mono.svg"
    variant="clear"
    bgColor={adaptive.greyOpacity100}
    aria-label="검색하기"
  />
  <IconButton
    src="https://static.toss.im/icons/svg/icon-search-bold-mono.svg"
    variant="fill"
    bgColor={adaptive.greyOpacity100}
    aria-label="검색하기"
  />
  <IconButton
    src="https://static.toss.im/icons/svg/icon-search-bold-mono.svg"
    variant="border"
    bgColor={adaptive.greyOpacity100}
    aria-label="검색하기"
  />
</div>
```

### 크기 조정하기

아이콘의 크기를 변경하려면 `iconSize` 속성을 사용하세요.

Editable Example

```tsx
<div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
  <IconButton
    src="https://static.toss.im/icons/svg/icon-search-bold-mono.svg"
    iconSize={24}
    aria-label="검색하기"
  />
  <IconButton
    src="https://static.toss.im/icons/svg/icon-search-bold-mono.svg"
    iconSize={20}
    aria-label="검색하기"
  />
  <IconButton
    src="https://static.toss.im/icons/svg/icon-search-bold-mono.svg"
    iconSize={16}
    aria-label="검색하기"
  />
</div>
```

### 접근성

`IconButton` 컴포넌트에는 `aria-label` 속성을 필수 값으로 지정해야해요. 아이콘만으로는 어떤 역할인지 알 수 없기 때문이에요.
클릭을 통해 동작하는 액션을 `aria-label`을 통해 명시적으로 작성해주세요.

```tsx
<IconButton
  src="https://static.toss.im/icons/svg/icon-search-bold-mono.svg"
  aria-label="검색하기"
/>
```

### 인터페이스

#### IconButtonProps

| 속성               | 기본값                    | 타입                                                                                                                                           |
| ------------------ | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | --------- | -------------------------------------------------- |
| **'aria-label'\*** | `-`                       | `string`IconButton에서 aria-label은 필수 값입니다. 아이콘만으로는 어떤 역할인지 알 수 없기 때문입니다.                                         |
| **variant**        | `'clear'`                 | `"fill"`                                                                                                                                       | `"clear"` | `"border"``IconButton` 컴포넌트의 형태를 결정해요. |
| **src**            | `-`                       | `string`사용할 아이콘의 URL을 지정해요. `src` 속성은 `name` 속성과 함께 사용할 수 없고, 아이콘이나 2D Emoji 리소스의 URL만 지정할 수 있어요.   |
| **name**           | `-`                       | `string`사용할 아이콘의 이름을 지정해요. `name` 속성은 `src` 속성과 함께 사용할 수 없고, 아이콘이나 2D Emoji 리소스의 이름만 지정할 수 있어요. |
| **color**          | `-`                       | `string`사용할 아이콘의 색상을 지정해요. 아이콘의 이름이 `-mono`로 끝나는 모노타입 아이콘을 사용할 때만 색상을 지정할 수 있어요.               |
| **bgColor**        | `adaptive.greyOpacity100` | `string``IconButton` 컴포넌트의 배경색을 지정해요.                                                                                             |
| **iconSize**       | `24`                      | `number`이 값에 맞춰 아이콘의 크기를 변경해요. 예를 들어 이 값이 `24`라면, '24px'이 크기로 적용돼요.                                           |
