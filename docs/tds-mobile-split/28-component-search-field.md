# Search Field

출처: https://tossmini-docs.toss.im/tds-mobile/components/search-field/

Search Field

### SearchField

`SearchField` 컴포넌트는 검색 입력창을 구현할 때 사용되는 컴포넌트예요. 검색 입력창에 고정 기능과 검색어 삭제 기능을 포함하며, 다양한 설정을 제공해요.

![image](https://static.toss.im/icons/svg/icn-searchfield.svg)

### 사용법

### 상단에 고정하기

`SearchField` 컴포넌트는 검색창을 화면 상단에 고정할 수 있어요. 검색창을 화면의 상단에 고정하고 싶을 때는 `fixed` 속성을 사용하면 돼요. CSS에서 `position` 속성이 `fixed`일 때와 같아요. 예를 들어, 검색창이 항상 보이게 유지해서 사용자가 쉽게 검색할 수 있도록 만들고 싶을 때 유용해요.

- `fixed`: 검색창을 화면 상단에 고정하려면 `true`로 설정하세요. 검색창이 스크롤 중에도 항상 보이게 돼요.
- `takeSpace`: 검색창이 고정될 때 페이지 빈 공간을 유지하려면 `true`로 유지하세요. `true`로 유지하면 레이아웃 변화 없이 페이지의 다른 요소들이 움직이지 않도록 할 수 있어요.

Editable Example

```tsx
<div>
  <SearchField placeholder="검색어를 입력하세요" fixed takeSpace />
  <p style={{ textAlign: "center", padding: "0px 14px" }}>
    takeSpace는 검색창 아래에 공간을 차지해요.
  </p>
</div>
```

### 검색어 삭제하기

`SearchField` 컴포넌트는 기본적으로 입력된 검색어를 삭제할 수 있는 버튼을 제공해요. 사용자가 삭제 버튼을 클릭하면 입력된 내용은 지워지고, 추가적으로 `onDeleteClick` 속성을 사용해 특정 동작을 실행할 수 있어요. 이 속성을 활용하면 검색어를 삭제할 때 로그를 남기거나, 다른 동작을 실행하도록 설정할 수 있어요.

Editable Example

```tsx
<div style={{ position: "relative" }}>
  <SearchField
    placeholder="검색어를 입력하고 오른쪽 버튼을 클릭해보세요."
    onDeleteClick={() => alert("delete")}
  />
</div>
```

### 인터페이스

#### SearchFieldProps

| 속성              | 기본값  | 타입                                                               |
| ----------------- | ------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| **fixed**         | `false` | `false`                                                            | `true`컴포넌트를 상단에 고정시켜줘요.                                                      |
| **takeSpace**     | `true`  | `false`                                                            | `true`이 값과 fixed속성이 true일 때 fixed 된 컴포넌트가 화면에서 차지하던 영역을 채워줘요. |
| **onDeleteClick** | `-`     | `() => void`텍스트 삭제 아이콘을 눌렀을 때 호출되는 콜백 함수예요. |
