# Bubble

출처: https://tossmini-docs.toss.im/tds-mobile/components/bubble/

Bubble

### Bubble

`Bubble` 컴포넌트는 대화형 UI에서 메시지를 표시하는 데 사용돼요. 이 컴포넌트를 사용하면 사용자의 메시지와 상대방의 메시지를 색상과 말풍선 모양으로 구분할 수 있어요.

Hello

### 사용법

### 메시지의 주체 구분하기

`Bubble` 컴포넌트의 주체가 나, 상대방인 경우를 구분할 수 있어요. `background` 속성을 통해 `blue`라면 나, `grey`라면 상대방이 주체예요.

Editable Example

```tsx
<div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
  <div style={{ display: "flex", justifyContent: "flex-start" }}>
    <Bubble background="grey" withTail>
      Hello
    </Bubble>
  </div>
  <div style={{ display: "flex", justifyContent: "flex-end" }}>
    <Bubble background="blue" withTail>
      Hello
    </Bubble>
  </div>
  <div style={{ display: "flex", justifyContent: "flex-start" }}>
    <Bubble background="grey" withTail>
      How are you?
    </Bubble>
  </div>
</div>
```

### 말풍선에 꼬리 추가할지 선택하기

말풍선 꼬리를 추가할지 선택할 수 있어요. 꼬리가 있는 경우에는 `grey(상대방)`일 때 항상 왼쪽, `blue(나)`일 때 항상 오른쪽이에요.

Editable Example

```tsx
<div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
  <div style={{ display: "flex", justifyContent: "flex-start" }}>
    <Bubble background="grey" withTail={false}>
      Hello
    </Bubble>
  </div>
  <div style={{ display: "flex", justifyContent: "flex-start" }}>
    <Bubble background="grey" withTail>
      How are you?
    </Bubble>
  </div>
  <div style={{ display: "flex", justifyContent: "flex-end" }}>
    <Bubble background="blue" withTail={false}>
      Hello
    </Bubble>
  </div>
  <div style={{ display: "flex", justifyContent: "flex-end" }}>
    <Bubble background="blue" withTail>
      I am fine.
    </Bubble>
  </div>
</div>
```

### 인터페이스

`BubbleProps` 인터페이스는 `HTMLAttributes<HTMLDivElement>`를 확장하여, HTML `div` 요소에서 사용할 수 있는 모든 속성을 포함하고 있어요.

#### BubbleProps

| 속성             | 기본값 | 타입                                                                                                                                    |
| ---------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **background\*** | `-`    | `"blue"`                                                                                                                                | `"grey"``Bubble` 컴포넌트의 배경 색상이에요. `blue` 또는 `grey` 중 하나를 선택할 수 있어요. `blue`는 나이고, `grey`는 상대방이에요. |
| **withTail**     | `true` | `false`                                                                                                                                 | `true``Bubble` 컴포넌트에 꼬리가 있는지 여부를 결정해요. 기본값은 `true`이에요.                                                     |
| **children**     | `-`    | `React.ReactNode``Bubble` 컴포넌트 내부에 들어갈 자식 요소예요. 보통의 경우에는 `string`을 사용해요. 로티 등 다양하게 활용할 수 있어요. |
