# Tooltip

출처: https://tossmini-docs.toss.im/tds-mobile/components/tooltip/

Tooltip

### Tooltip

`Tooltip` 컴포넌트는 사용자가 특정 요소에 포커스할 때 추가적인 정보를 제공하기 위해 사용해요. 보통 아이콘이나 버튼과 같은 작은 UI 요소 위에 `Tooltip` 컴포넌트를 이용해 보조적인 내용을 전달해요.

### 사용법

### 상태

`Tooltip` 컴포넌트는 열림과 닫힘 상태를 외부에서 관리하는 방식, 내부에서 관리하는 방식 모두 사용 가능해요.

#### 상태를 외부에서 관리하기

`Tooltip` 컴포넌트의 열림과 닫힘 상태를 외부에서 관리하려면, `open` 속성에 메시지 열림 여부 상태를 설정하세요.

Editable Example

```tsx
function Controlled() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div style={{ paddingBottom: 80 }}>
      <Tooltip message={"툴팁입니다."} open={isOpen}>
        <Button
          onClick={() => {
            setIsOpen((prev) => !prev);
          }}
        >
          Click Me
        </Button>
      </Tooltip>
    </div>
  );
}
```

#### 상태를 내부에서 관리하기

`open` 속성을 주지 않으면 `Tooltip` 컴포넌트 내부에서 열림과 닫힘 상태가 관리돼요. 이때 `defaultOpen` 속성을 통해 초기 값을 지정할 수 있어요. 그리고 아래 속성들을 통해 `Tooltip` 컴포넌트 내부에서 스스로 열림과 닫힘 상태가 변경되게 할 수 있어요.

- `openOnHover`: `true`일 경우, `Tooltip` 컴포넌트 위에 마우스 포인터를 올리면 메시지가 열려요. 마우스 포인터를 내리면 메시지가 닫혀요.
- `openOnFocus`: `true`일 경우, `Tooltip` 컴포넌트가 포커스 되면 메시지가 열려요. 포커스가 되지 않으면 메시지가 닫혀요.
- `dismissible`: `true`일 경우, `Tooltip` 컴포넌트 외부를 클릭하거나 `escape` 키를 누르면 메시지가 닫혀요.

Editable Example

```tsx
<div style={{ display: "flex", gap: 10, paddingBottom: 80 }}>
  <Tooltip message={"툴팁입니다."} openOnHover>
    <Button>Hover Me</Button>
  </Tooltip>
  <Tooltip message={"툴팁입니다."} openOnFocus>
    <Button>Focus Me</Button>
  </Tooltip>
  <Tooltip message={"툴팁입니다."} defaultOpen openOnFocus openOnHover dismissible>
    <Button>Default Open</Button>
  </Tooltip>
</div>
```

### 크기 정하기

`Tooltip` 컴포넌트의 크기를 정하려면 `size` 속성을 사용하세요. 가능한 값으로는 `small`, `medium`, `large`가 있고 `medium`이 기본값이에요.

Editable Example

```tsx
<div style={{ display: "flex", gap: 10, paddingBottom: 80 }}>
  <Tooltip message={"툴팁입니다."} defaultOpen openOnHover size="small">
    <Button>Small</Button>
  </Tooltip>
  <Tooltip message={"툴팁입니다."} defaultOpen openOnHover size="medium">
    <Button>Medium</Button>
  </Tooltip>
  <Tooltip message={"툴팁입니다."} defaultOpen openOnHover size="large">
    <Button>Large</Button>
  </Tooltip>
</div>
```

### 메시지

`Tooltip` 컴포넌트의 메시지 내용은 `message` 속성으로 설정해요.

#### 메시지 정렬하기

`Tooltip` 컴포넌트의 메시지를 정렬 방식을 정하려면 `messageAlign` 속성을 사용하세요. `Tooltip` 컴포넌트의 넓이가 고정되어있어야 해요.

Editable Example

```tsx
<div style={{ display: "flex", gap: 50, paddingBottom: 80 }}>
  <Tooltip
    message={"툴팁입니다."}
    messageAlign="left"
    defaultOpen
    openOnHover
    style={{ width: 150 }}
  >
    <Button>Left</Button>
  </Tooltip>
  <Tooltip
    message={"툴팁입니다."}
    messageAlign="center"
    defaultOpen
    openOnHover
    style={{ width: 150 }}
  >
    <Button>Center</Button>
  </Tooltip>
  <Tooltip
    message={"툴팁입니다."}
    messageAlign="right"
    defaultOpen
    openOnHover
    style={{ width: 150 }}
  >
    <Button>Right</Button>
  </Tooltip>
</div>
```

### 위치

#### 상하 위치 정하기

`Tooltip` 컴포넌트가 `Tooltip` 컴포넌트의 트리거로부터 어떤 위치에 메시지를 표시할지를 정하려면 `placement` 속성을 사용하세요. 가능한 값으로는 `top`, `bottom`이 있고, `bottom`이 기본값이에요.

Editable Example

```tsx
<div style={{ display: "flex", gap: 10, padding: 80 }}>
  <Tooltip message={"툴팁입니다."} placement="top" defaultOpen openOnHover>
    <Button>Top</Button>
  </Tooltip>
  <Tooltip message={"툴팁입니다."} placement="bottom" defaultOpen openOnHover>
    <Button>Bottom</Button>
  </Tooltip>
</div>
```

#### 위치 자동 조정하기

`Tooltip` 컴포넌트가 시야에서 자동으로 벗어날 때, `Tooltip` 컴포넌트가 가려진 반대 방향으로 위치가 조정되게 하려면, `autoFlip` 속성을 사용하세요.

Editable Example

```tsx
<div style={{ padding: 80 }}>
  <Tooltip message={"툴팁입니다."} defaultOpen autoFlip>
    <Button>스크롤하여 확인해보세요</Button>
  </Tooltip>
</div>
```

#### 트리거 대상까지의 거리 정하기

`Tooltip` 컴포넌트와 `Tooltip` 컴포넌트 트리거 사이의 거리를 정하려면 `offset` 속성을 사용하세요. 기본값은 `Tooltip` 컴포넌트의 화살표와 `size` 속성에 따라 결정돼요. 임의의 값을 지정한다면 화살표의 사이즈를 고려하여 설정해주세요.

Editable Example

```tsx
<div style={{ display: "flex", gap: 10, paddingBottom: 80 }}>
  <Tooltip message={"툴팁입니다."} offset={0} defaultOpen openOnHover>
    <Button>Offset 0</Button>
  </Tooltip>
  <Tooltip message={"툴팁입니다."} offset={15} defaultOpen openOnHover>
    <Button>Offset 15</Button>
  </Tooltip>
  <Tooltip message={"툴팁입니다."} offset={30} defaultOpen openOnHover>
    <Button>Offset 30</Button>
  </Tooltip>
</div>
```

### 화살표

#### 화살표 형태 정하기

메시지가 `Tooltip` 컴포넌트를 가리키는 화살표의 형태를 변경하려면 `clipToEnd` 속성을 활용하세요. `none`일 경우 기본 형태를 유지하고, `left`, `right`인 경우 각각 화살표의 왼쪽, 오른쪽을 남겨요.

Editable Example

```tsx
<div style={{ display: "flex", gap: 10, paddingBottom: 80 }}>
  <Tooltip message={"툴팁입니다."} clipToEnd="none" defaultOpen openOnHover>
    <Button>none</Button>
  </Tooltip>
  <Tooltip message={"툴팁입니다."} clipToEnd="left" defaultOpen openOnHover>
    <Button>left</Button>
  </Tooltip>
  <Tooltip message={"툴팁입니다."} clipToEnd="right" defaultOpen openOnHover>
    <Button>right</Button>
  </Tooltip>
</div>
```

#### 화살표의 위치 정하기

`Tooltip` 컴포넌트의 화살표 위치를 정하려면 `anchorPositionByRatio` 속성을 사용하세요. 0과 1 사이의 값을 가질 수 있고 0.5로 설정 시, 정중앙에 위치하게 돼요.

Editable Example

```tsx
<div style={{ display: "flex", gap: 10, paddingBottom: 80 }}>
  <Tooltip message={"툴팁입니다."} anchorPositionByRatio={0.1} openOnHover defaultOpen>
    <Button>0.1</Button>
  </Tooltip>
  <Tooltip message={"툴팁입니다."} anchorPositionByRatio={0.5} openOnHover defaultOpen>
    <Button>0.5</Button>
  </Tooltip>
  <Tooltip message={"툴팁입니다."} anchorPositionByRatio={0.9} openOnHover defaultOpen>
    <Button>0.9</Button>
  </Tooltip>
</div>
```

### 모션 강도 정하기

`Tooltip` 컴포넌트의 등장 퇴장 시, 발생하는 애니메이션의 강도를 정하려면 `motionVariant` 속성을 사용하세요.

Editable Example

```tsx
<div style={{ display: "flex", gap: 10, paddingBottom: 80 }}>
  <Tooltip message={"툴팁입니다."} motionVariant="weak" openOnHover>
    <Button>Weak</Button>
  </Tooltip>
  <Tooltip message={"툴팁입니다."} motionVariant="strong" openOnHover>
    <Button>Strong</Button>
  </Tooltip>
</div>
```

### position 속성 정하기

`Tooltip` 컴포넌트의 CSS `position` 속성을 정하려면 `strategy` 속성을 사용하세요. 다음 두 가지 속성이 사용가능해요.

- `absolute`: `Tooltip` 컴포넌트가 가장 가까운 `position`이 지정된 상위 요소를 기준으로 배치돼요. 대부분의 레이아웃에서는 브라우저가 위치를 업데이트할 때 보통 가장 적은 작업량을 요구해요.
- `fixed`: `Tooltip` 컴포넌트가 가장 가까운 포함 블록(보통 뷰포트)을 기준으로 배치돼요. `Tooltip` 컴포넌트가 고정되어 있을 때 스크롤 중 위치가 튀는 것을 줄이는 데 유용해요.

Editable Example

```tsx
<div style={{ display: "flex", gap: 10, paddingBottom: 80 }}>
  <Tooltip message={"툴팁입니다."} strategy="absolute" defaultOpen>
    <Button>absolute</Button>
  </Tooltip>
  <Tooltip message={"툴팁입니다."} strategy="fixed" defaultOpen>
    <Button>fixed</Button>
  </Tooltip>
</div>
```

### 인터페이스

#### TooltipProps

| 속성                      | 기본값       | 타입                                                                                                                                 |
| ------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| **size**                  | `'medium'`   | `"small"`                                                                                                                            | `"medium"`                                                                                                           | `"large"``Tooltip` 컴포넌트의 크기에요.                       |
| **defaultOpen**           | `false`      | `false`                                                                                                                              | `true``Tooltip` 컴포넌트의 열림과 닫힘 상태를 내부에서 관리할 때 사용해요.                                           |
| **open**                  | `-`          | `false`                                                                                                                              | `true``Tooltip` 컴포넌트의 열림과 닫힘 상태를 외부에서 관리할 때 사용해요.                                           |
| **onOpenChange**          | `-`          | `(open: boolean) => void``open` 상태가 변경될 때 호출되는 콜백 함수에요.                                                             |
| **message**               | `-`          | `React.ReactNode``Tooltip` 컴포넌트에 표현할 메시지에요.                                                                             |
| **messageAlign**          | `'left'`     | `"left"`                                                                                                                             | `"center"`                                                                                                           | `"right"``Tooltip` 컴포넌트의 메세지의 정렬을 결정해요.       |
| **placement**             | `'bottom'`   | `"top"`                                                                                                                              | `"bottom"``Tooltip` 컴포넌트를 `Tooltip` 컴포넌트의 트리거로부터 어떤 위치에 표현할지 결정해요.                      |
| **motionVariant**         | `'weak'`     | `"weak"`                                                                                                                             | `"strong"``Tooltip` 컴포넌트의 등장과 퇴장 시 발생하는 모션의 강도에요.                                              |
| **offset**                | `-`          | `number``Tooltip` 컴포넌트와 `Tooltip` 컴포넌트 트리거까지의 거리를 표현해요.                                                        |
| **anchorPositionByRatio** | `0.5`        | `number``Tooltip` 컴포넌트의 화살표 위치를 설정해요. 0과 1 사이의 값을 갖고 기본값 설정 시 화살표가 메시지의 정중앙에 위치하게 돼요. |
| **openOnHover**           | `false`      | `false`                                                                                                                              | `true`마우스 호버 시 `Tooltip` 컴포넌트가 열려요. 마우스 호버 상태가 풀리면 `Tooltip` 컴포넌트가 닫혀요.             |
| **openOnFocus**           | `false`      | `false`                                                                                                                              | `true`포커스 시 `Tooltip` 컴포넌트가 열려요. 포커스가 상태가 풀리면 `Tooltip` 컴포넌트가 닫혀요.                     |
| **dismissible**           | `false`      | `false`                                                                                                                              | `true``Tooltip` 컴포넌트 외부 클릭 시, `Tooltip` 컴포넌트가 닫혀요.                                                  |
| **autoFlip**              | `false`      | `false`                                                                                                                              | `true``Tooltip` 컴포넌트가 시야에서 벗어나는 경우, `Tooltip` 컴포넌트가 가려진 반대 방향으로 위치가 조정돼요.        |
| **strategy**              | `'absolute'` | `"absolute"`                                                                                                                         | `"fixed"``Tooltip` 컴포넌트가 사용할 css `position`이에요. 대부분의 경우 기본값인 `absolute`가 연산이 적어 적절해요. |
| **clipToEnd**             | `'none'`     | `"left"`                                                                                                                             | `"right"`                                                                                                            | `"none"``Tooltip` 컴포넌트의 화살표를 자르는 방향을 결정해요. |
