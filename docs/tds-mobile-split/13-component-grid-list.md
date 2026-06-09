# Grid List

출처: https://tossmini-docs.toss.im/tds-mobile/components/grid-list/

Grid List

### GridList

`GridList` 컴포넌트는 그리드 형태로 `GridList.Item` 컴포넌트들을 배치하는 컴포넌트에요. `GridList.Item` 컴포넌트들은 이미지와 텍스트로 구성되고, 모바일 환경에서 `GridList.Item` 컴포넌트 터치 시 확대 효과를 통해 사용자 피드백을 제공해요.

- ![image](https://static.toss.im/icons/png/4x/icn-bank-toss.png)아이템 1
- ![image](https://static.toss.im/icons/png/4x/icn-bank-toss.png)아이템 2
- ![image](https://static.toss.im/icons/png/4x/icn-bank-toss.png)아이템 3

### 사용 예제

가장 기본적인 사용 방법이에요. 기본적으로 3열 그리드가 적용돼요.

### 열 개수 설정하기

`column` 속성을 통해 그리드의 열 개수를 설정할 수 있어요. 기본적으로 `3`이 적용돼요. `1`, `2`, `3` 중 하나를 선택할 수 있어요.

### 1열 그리드 적용하기

1열 그리드는 `column` 속성이 `1`인 그리드이에요. `GridList.Item` 컴포넌트들의 내용이 길거나, 중요도가 높은 메뉴를 강조하고 싶을 때 사용하면 좋아요.

Editable Example

```tsx
<GridList column={1}>
  <GridList.Item
    image={
      <img
        src="https://static.toss.im/icons/png/4x/icn-bank-toss.png"
        style={{
          width: `24px`,
          height: `24px`,
        }}
      />
    }
  >
    1열 그리드
  </GridList.Item>
  <GridList.Item
    image={
      <img
        src="https://static.toss.im/icons/png/4x/icn-bank-toss.png"
        style={{
          width: `24px`,
          height: `24px`,
        }}
      />
    }
  >
    1열 그리드
  </GridList.Item>
</GridList>
```

### 2열 그리드 적용하기

2열 그리드는 `column` 속성이 `2`인 그리드이에요. `GridList.Item` 컴포넌트들의 크기를 좀 더 크게 보여주고 싶을 때나, 콘텐츠의 가독성을 높이고 싶을 때 사용하면 좋아요.

Editable Example

```tsx
<GridList column={2}>
  <GridList.Item
    image={
      <img
        src="https://static.toss.im/icons/png/4x/icn-bank-toss.png"
        style={{
          width: `24px`,
          height: `24px`,
        }}
      />
    }
  >
    2열 그리드
  </GridList.Item>
  <GridList.Item
    image={
      <img
        src="https://static.toss.im/icons/png/4x/icn-bank-toss.png"
        style={{
          width: `24px`,
          height: `24px`,
        }}
      />
    }
  >
    2열 그리드
  </GridList.Item>
  <GridList.Item
    image={
      <img
        src="https://static.toss.im/icons/png/4x/icn-bank-toss.png"
        style={{
          width: `24px`,
          height: `24px`,
        }}
      />
    }
  >
    2열 그리드
  </GridList.Item>
</GridList>
```

### 3열 그리드 적용하기

3열 그리드는 `column` 속성이 `3`인 그리드이에요. 가장 일반적인 형태로, 많은 `GridList.Item` 컴포넌트들을 한 화면에 효율적으로 보여줄 수 있어요. 카테고리나 메뉴 목록처럼 다양한 옵션을 한눈에 보여주고 싶을 때 적합해요.

Editable Example

```tsx
<GridList column={3}>
  <GridList.Item
    image={
      <img
        src="https://static.toss.im/icons/png/4x/icn-bank-toss.png"
        style={{
          width: `24px`,
          height: `24px`,
        }}
      />
    }
  >
    3열 그리드
  </GridList.Item>
  <GridList.Item
    image={
      <img
        src="https://static.toss.im/icons/png/4x/icn-bank-toss.png"
        style={{
          width: `24px`,
          height: `24px`,
        }}
      />
    }
  >
    3열 그리드
  </GridList.Item>
  <GridList.Item
    image={
      <img
        src="https://static.toss.im/icons/png/4x/icn-bank-toss.png"
        style={{
          width: `24px`,
          height: `24px`,
        }}
      />
    }
  >
    3열 그리드
  </GridList.Item>
  <GridList.Item
    image={
      <img
        src="https://static.toss.im/icons/png/4x/icn-bank-toss.png"
        style={{
          width: `24px`,
          height: `24px`,
        }}
      />
    }
  >
    3열 그리드
  </GridList.Item>
  <GridList.Item
    image={
      <img
        src="https://static.toss.im/icons/png/4x/icn-bank-toss.png"
        style={{
          width: `24px`,
          height: `24px`,
        }}
      />
    }
  >
    3열 그리드
  </GridList.Item>
</GridList>
```

### 인터페이스

#### GridListProps

| 속성         | 기본값 | 타입                                                                                                    |
| ------------ | ------ | ------------------------------------------------------------------------------------------------------- | --- | ----------------------------------------------------------------------------------------- |
| **column**   | `3`    | `1`                                                                                                     | `2` | `3`표시될 열의 개수를 정해요. 기본값은 `3`이고, `1`, `2`, `3` 중 하나를 선택할 수 있어요. |
| **children** | `-`    | `React.ReactNode``GridList` 컴포넌트의 자식 요소예요. 일반적으로 `GridList.Item` 컴포넌트들이 전달돼요. |

#### GridListItemProps

| 속성         | 기본값 | 타입                                                                                                                                       |
| ------------ | ------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **image\***  | `-`    | `React.ReactNode``GridList.Item` 컴포넌트에 표시될 이미지를 지정해요. `img 태그`나 기타 `ReactNode`와 같은 요소를 전달할 수 있어요.        |
| **children** | `-`    | `React.ReactNode``GridList.Item` 컴포넌트 하단에 표시될 텍스트에요. `children`으로 전달된 텍스트는 `Paragraph` 컴포넌트를 통해 렌더링돼요. |
