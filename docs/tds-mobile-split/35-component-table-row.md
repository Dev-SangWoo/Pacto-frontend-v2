# Table Row

출처: https://tossmini-docs.toss.im/tds-mobile/components/table-row/

Table Row

### TableRow

`TableRow` 컴포넌트는 데이터를 간결하고 읽기 쉽게 좌우로 배치할 때 사용해요.
주로 정보 제목과 내용을 나란히 배치해야 할 때 유용하며, 텍스트의 비율이나 정렬을 유연하게 조정할 수 있어요.

- 김토스받는 분
- 강토스받는 분 통장표시
- 이체 1일 전미리알림

### 사용법

`TableRow`는 세 가지 필수 속성을 가지고 있어요.

- `left`: 왼쪽에 배치될 요소를 받는 속성이에요. 문자열, 숫자, 또는 React 컴포넌트를 전달할 수 있어요.
- `right`: 오른쪽에 배치될 요소를 받는 속성이에요. 문자열, 숫자, 또는 React 컴포넌트를 전달할 수 있어요.
- `align`: 정렬 방향을 설정해요.

### 제목과 데이터를 양쪽 끝으로 배치하기

`align="space-between"` 속성을 사용하면 제목과 내용을 양쪽 끝으로 배치해 데이터를 분명히 구분할 수 있어요.
주로 정보의 제목과 내용이 시각적으로 명확히 분리되어야 하는 경우 적합해요.

Editable Example

```tsx
<div>
  <TableRow align="space-between" left="김토스" right="받는 분" />
  <TableRow align="space-between" left="강토스" right="받는 분 통장표시" />
  <TableRow align="space-between" left="이체 1일 전" right="미리알림" />
</div>
```

### 제목과 데이터를 왼쪽으로 정렬하기

`align="left"` 속성을 사용하면 제목과 내용을 모두 한쪽으로 가까이 배치해요.
제목과 내용이 같은 영역에 밀집되어 있어야 하거나, 공간이 제한된 상황에서 유용해요.

`leftRatio` 속성을 사용하면 좌측 영역의 비율을 조정해 균형 있는 레이아웃을 만들 수 있어요. 예를 들어, `leftRatio={30}`으로 설정하면 왼쪽 영역이 전체 너비의 30%를 차지하게 돼요.

Editable Example

```tsx
<div>
  <TableRow align="left" left="김토스" right="받는 분" />
  <TableRow align="left" left="강토스" right="받는 분 통장표시" />
  <Border variant="full" />
  <TableRow align="left" left="김토스" right="받는 분" leftRatio={30} />
  <TableRow align="left" left="강토스" right="받는 분 통장표시" leftRatio={30} />
</div>
```

### 인터페이스

#### TableRowProps

| 속성          | 기본값 | 타입                                                                                                   |
| ------------- | ------ | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------- |
| **left\***    | `-`    | `React.ReactNode`왼쪽에 배치되는 컴포넌트예요. 문자열, 숫자, 또는 React 컴포넌트를 전달할 수 있어요.   |
| **right\***   | `-`    | `React.ReactNode`오른쪽에 배치되는 컴포넌트예요. 문자열, 숫자, 또는 React 컴포넌트를 전달할 수 있어요. |
| **align\***   | `-`    | `"left"`                                                                                               | `"space-between"`정렬 방향을 설정해요. left: 왼쪽 정렬 space-between: 양끝 정렬 |
| **leftRatio** | `-`    | `number`왼쪽 영역의 너비를 고정된 비율로 설정할 수 있어요. 주로 `Left` 컴포넌트에서 사용해요.          |
