# Toast

출처: https://tossmini-docs.toss.im/tds-mobile/components/toast/

Toast

### Toast

`Toast` 컴포넌트는 사용자가 어떤 작업을 완료했거나, 이벤트가 발생했을 때 그 내용에 대해 알리거나 피드백을 하기 위해 사용해요. 이 컴포넌트를 사용하면 메시지가 화면 상단이나 하단에 짧은 시간 동안 표시된 뒤 자동으로 사라져요.

### 사용법

`Toast` 컴포넌트는 `overlay-extension`을 통해 사용하는 것을 권장해요. 다만 이 문서에서는 독립적으로 `Toast` 컴포넌트를 이해할 수 있도록 도와드려요.

### 토스트 노출 위치 지정하기

가장 기본적인 형태의 토스트 메시지를 표시할 수 있어요. `Toast` 컴포넌트의 위치는 `position` 속성을 사용해 설정할 수 있어요. 사용할 수 있는 값은 `bottom`, `top`이에요.

Editable Example

```tsx
/** 기본 토스트 (상단) */
function BasicToasts() {
  const [openTop, setOpenTop] = React.useState(false);
  const [openBottom, setOpenBottom] = React.useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "row", gap: "12px" }}>
      <Button onClick={() => setOpenTop(true)}>상단 토스트 열기</Button>
      <Toast
        position="top"
        open={openTop}
        text="상단 토스트 메시지이에요"
        duration={3000}
        onClose={() => setOpenTop(false)}
      />
      <Button onClick={() => setOpenBottom(true)}>하단 토스트 열기</Button>
      <Toast
        position="bottom"
        open={openBottom}
        text="하단 토스트 메시지이에요"
        duration={3000}
        onClose={() => setOpenBottom(false)}
      />
    </div>
  );
}
```

### 아이콘 추가하기

`leftAddon` 속성을 사용해서 토스트 메시지 왼쪽에 아이콘을 추가할 수 있어요. 성공, 경고, 에러 등 메시지의 성격을 시각적으로 전달할 때 유용해요.

Editable Example

```tsx
/** 아이콘이 있는 토스트 */
function ToastWithIcon() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>아이콘 토스트 열기</Button>
      <Toast
        position="top"
        open={open}
        text="아이콘이 포함된 토스트이에요"
        leftAddon={<Toast.Icon name="icn-success-color" />}
        duration={3000}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
```

### 버튼 추가하기

하단 `Toast` 컴포넌트에서는 `button` 속성을 사용하여 액션 버튼을 추가할 수 있어요. 사용자가 `Toast` 컴포넌트에 대해 즉각적인 액션을 취할 수 있게 해줘요.

Editable Example

```tsx
/** 버튼이 있는 토스트 (하단 전용) */
function ToastWithButton() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>버튼 토스트 열기</Button>
      <Toast
        position="bottom"
        open={open}
        text="버튼이 포함된 토스트이에요"
        button={<Toast.Button onClick={() => alert("clicked")}>확인</Toast.Button>}
        duration={3000}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
```

### CTA 위에 표시하기

`higherThanCTA` 속성을 사용하면 하단 고정 CTA 버튼보다 위에 토스트를 표시할 수 있어요. 주요 액션 버튼을 가리지 않으면서도 알림을 표시할 수 있어요.

Editable Example

```tsx
/** CTA 위에 표시되는 토스트 */
function ToastAboveCTA() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>CTA 위 토스트 열기</Button>
      <Toast
        position="bottom"
        open={open}
        text="CTA 버튼 위에 표시되는 토스트이에요"
        higherThanCTA
        duration={3000}
        onClose={() => setOpen(false)}
      />
      {open ? <FixedBottomCTA>CTA 버튼</FixedBottomCTA> : <div style={{ height: "110px" }} />}
    </>
  );
}
```

### 로티 애니메이션 사용하기

`leftAddon`에 `Toast.Lottie` 컴포넌트를 사용하여 로티 애니메이션을 표시할 수 있어요.

Editable Example

```tsx
/** 로티 애니메이션이 있는 토스트 */
function ToastWithLottie() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>로티 토스트 열기</Button>
      <Toast
        position="top"
        open={open}
        text="로티 애니메이션이 포함된 토스트이에요"
        leftAddon={
          <Toast.Lottie src="https://static.toss.im/lotties-common/check-green-spot.json" />
        }
        duration={3000}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
```

### 접근성

`Toast` 컴포넌트는 다음과 같은 접근성 기능을 제공해요:

- `aria-live` 속성을 통해 스크린 리더 사용자에게 적절한 알림을 제공해요.

- `assertive`: 즉시 읽기 (중요한 알림에 사용)
- `polite`: 현재 읽고 있는 내용을 마친 후 읽기 (일반적인 알림에 사용)

### 인터페이스

#### ToastProps

| 속성              | 기본값     | 타입                                                                                                                                                                                                                                                   |
| ----------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **open\***        | `-`        | `false`                                                                                                                                                                                                                                                | `true``Toast` 컴포넌트의 열림 상태를 제어해요.                                                                                                                                                                                                               |
| **position\***    | `-`        | `"top"`                                                                                                                                                                                                                                                | `"bottom"``Toast` 컴포넌트의 위치를 결정해요.                                                                                                                                                                                                                |
| **text\***        | `-`        | `string``Toast` 컴포넌트에 표시할 메시지에요.                                                                                                                                                                                                          |
| **leftAddon**     | `-`        | `React.ReactNode``Toast` 컴포넌트의 왼쪽에 표시할 아이콘이나 로티 애니메이션이에요. `Toast.Icon`, `Toast.Lottie`를 사용할 수 있어요.                                                                                                                   |
| **button**        | `-`        | `React.ReactNode``Toast` 컴포넌트의 버튼이에요.`position: "bottom"`에서만 사용할 수 있어요.                                                                                                                                                            |
| **duration**      | `3000`     | `number``Toast` 컴포넌트가 자동으로 닫히는 시간(ms)이에요. 기본은 3000이고, 버튼을 사용했다면 5000이에요.                                                                                                                                              |
| **onClose**       | `-`        | `() => void``Toast` 컴포넌트가 닫히기 시작할 때 호출되는 콜백 함수에요. 아래와 같은 상황에서 사용할 수 있어요: - `duration` 시간이 지나서 자동으로 닫힐 때 - 사용자가 `Toast` 컴포넌트를 드래그해서 닫을 때 - 수동으로 `open` 값을 `false`로 변경할 때 |
| **onExited**      | `-`        | `() => void``Toast` 컴포넌트가 완전히 사라지고 애니메이션이 끝난 후에 호출되는 콜백 함수에요. 아래와 같은 상황에서 사용할 수 있어요: - `Toast` 컴포넌트가 완전히 사라진 후 다음 작업을 진행해야 할 때                                                  |
| **higherThanCTA** | `false`    | `false`                                                                                                                                                                                                                                                | `true``Toast` 컴포넌트가 `FixedBottomCTA`보다 위에 표시될지 결정해요. `position: bottom`일 때만 사용할 수 있어요.                                                                                                                                            |
| **'aria-live'**   | `'polite'` | `"assertive"`                                                                                                                                                                                                                                          | `"polite"``Toast` 컴포넌트가 나타났을 때, 스크린리더가 `Toast` 컴포넌트의 메시지를 읽는 우선순위를 결정해요. 기본 값은 `polite`이고, `assertive`로 설정하면 즉시 읽기가 돼요. - `assertive`: 즉시 읽기 - `polite`: 현재 읽고 있는 메시지를 모두 읽은 뒤 읽기 |

#### ToastButtonProps

| 속성           | 기본값 | 타입                                             |
| -------------- | ------ | ------------------------------------------------ |
| **children\*** | `-`    | `string`버튼에 표시할 텍스트에요.                |
| **onClick**    | `-`    | `() => void`버튼 클릭 시 호출되는 콜백 함수에요. |

#### ToastIconProps

| 속성           | 기본값                      | 타입                                                |
| -------------- | --------------------------- | --------------------------------------------------- |
| **name\***     | `-`                         | `string`아이콘의 이름이에요.                        |
| **icon\***     | `-`                         | `string`아이콘의 종류에요.                          |
| **frameShape** | `{ width: 24, height: 24 }` | `"FrameShapeType"`아이콘의 크기를 조절할 수 있어요. |

#### ToastLottieProps

| 속성           | 기본값                      | 타입                                                         |
| -------------- | --------------------------- | ------------------------------------------------------------ |
| **src\***      | `-`                         | `string`로티 애니메이션의 소스 경로에요.                     |
| **frameShape** | `{ width: 24, height: 24 }` | `"FrameShapeType"`로티 애니메이션의 크기를 조절할 수 있어요. |

#### FrameShapeType

| 속성        | 기본값 | 타입                                                                                                       |
| ----------- | ------ | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| **width**   | `-`    | `string`                                                                                                   | `number`프레임의 너비를 지정해요.          |
| **height**  | `-`    | `string`                                                                                                   | `number`프레임의 높이를 지정해요.          |
| **radius**  | `-`    | `string`                                                                                                   | `number`프레임의 모서리 둥글기를 지정해요. |
| **acc**     | `-`    | `"FrameAccShapeType"`프레임의 액세서리 영역 설정이에요.                                                    |
| **overlap** | `-`    | `"FrameOverlapShapeType"`프레임 뒤에 겹침 효과를 설정해요. 여러 개의 항목이 합쳐졌음을 표현할 때 사용해요. |
