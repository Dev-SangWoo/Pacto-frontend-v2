# Modal

출처: https://tossmini-docs.toss.im/tds-mobile/components/modal/

Modal

### Modal

`Modal` 컴포넌트는 사용자의 주의가 필요한 중요한 내용을 표시하거나 즉각적인 상호작용이 필요할 때 사용해요. 화면의 다른 콘텐츠 위에 나타나 사용자의 집중을 유도해요. 사용자가 제공되는 정보를 확인하거나 필요한 동작을 완료해야만 기존 화면으로 돌아갈 수 있어요.

### 사용 예제

`Modal` 컴포넌트는 `Modal.Overlay`와 `Modal.Content` 두 개의 하위 컴포넌트로 구성되어 있어요. `Modal`에 담길 콘텐츠는 `Modal.Content` 안에 있고, `Modal.Overlay`는 `Modal` 컴포넌트 뒤에 보이는 배경으로 사용자가 콘텐츠에 담긴 내용에 집중하는 것을 도와줘요.

### 기본 사용법

가장 기본적인 `Modal` 컴포넌트의 사용 방법이에요. 버튼을 클릭하면 `Modal` 컴포넌트가 열리고, 확인 버튼이나 오버레이를 클릭하면 `Modal` 컴포넌트가 닫혀요.

Editable Example

```tsx
/** 기본 `Modal` 컴포넌트이에요. */
function Basic() {
  const [open, setOpen] = React.useState<boolean>(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>모달 열기</Button>
      <Modal open={open} onOpenChange={setOpen}>
        <Modal.Overlay />
        <Modal.Content
          style={{
            padding: "32px 20px 20px 20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <p style={{ marginBottom: "24px" }}>
            동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산
            대한사람 대한으로 길이 보전하세 동해물과 백두산이 마르고 닳도록 하느님이 보우하사
            우리나라 만세 무궁화 삼천리 화려강산 대한사람 대한으로 길이 보전하세
          </p>
          <Button display="block" color="primary" onClick={() => setOpen(false)}>
            확인
          </Button>
        </Modal.Content>
      </Modal>
    </>
  );
}
```

### 닫힘 이벤트 처리하기

`Modal` 컴포넌트가 완전히 닫힌 후 특정 동작을 수행하고 싶다면 `onExited` 콜백을 사용하세요. 이 콜백은 `Modal` 컴포넌트가 완전히 닫히고 애니메이션이 완료된 후에 호출되기 때문에 리소스 해제나 후속 작업을 처리하기에 적합해요.

Editable Example

```tsx
/** onExit 콜백 활용한 `Modal` 컴포넌트이에요. */
function OnExitModal() {
  const [open, setOpen] = React.useState<boolean>(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>모달 열기</Button>
      <Modal open={open} onOpenChange={setOpen} onExited={() => alert("모달이 완전히 닫혔어요.")}>
        <Modal.Overlay />
        <Modal.Content
          style={{
            padding: "32px 20px 20px 20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <p style={{ marginBottom: "24px" }}>
            동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산
            대한사람 대한으로 길이 보전하세 동해물과 백두산이 마르고 닳도록 하느님이 보우하사
            우리나라 만세 무궁화 삼천리 화려강산 대한사람 대한으로 길이 보전하세
          </p>
          <Button display="block" color="primary" onClick={() => setOpen(false)}>
            확인
          </Button>
        </Modal.Content>
      </Modal>
    </>
  );
}
```

### 오버레이 클릭 이벤트 처리하기

`Modal` 컴포넌트의 오버레이(배경) 클릭 시 특별한 동작을 수행하고 싶다면 `Modal.Overlay`의 `onClick` 콜백을 사용하세요. 예를 들어, 배경을 클릭하면 `Modal` 컴포넌트를 닫거나 추가 작업을 실행할 수 있어요.

일반적인 사용 예시를 참고해 보세요.

- 입력 폼의 내용이 있을 때 "저장하지 않고 나가시겠습니까?" 확인하기
- 결제 진행 중에 실수로 닫는 것을 방지하기 위한 한 번 더 확인하기
- `Modal` 컴포넌트가 닫힐 때 입력 내용 초기화하기

Editable Example

```tsx
/** 오버레이의 onClick 콜백을 활용하는 `Modal` 컴포넌트이에요. */
function OverlayCallbackModal() {
  const [open, setOpen] = React.useState<boolean>(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>모달 열기</Button>
      <Modal open={open} onOpenChange={setOpen} onExited={() => alert("모달이 닫혔습니다")}>
        <Modal.Overlay onClick={() => alert("오버레이를 클릭했어요.")} />
        <Modal.Content
          style={{
            padding: "32px 20px 20px 20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <p style={{ marginBottom: "24px" }}>
            동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산
            대한사람 대한으로 길이 보전하세 동해물과 백두산이 마르고 닳도록 하느님이 보우하사
            우리나라 만세 무궁화 삼천리 화려강산 대한사람 대한으로 길이 보전하세
          </p>
        </Modal.Content>
      </Modal>
    </>
  );
}
```

### 접근성

- `Modal` 컴포넌트는 다음과 같은 접근성 기능을 제공해요.

### 기본 접근성 지원

다음 속성이 있어서 다른 설정 없이도 기본적으로 사용자의 접근성을 고려한 `Modal` 컴포넌트를 제공할 수 있어요.

| 속성            | 접근성 효과                                                | 설명                                                                                       |
| --------------- | ---------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `aria-hidden`   | `Modal` 컴포넌트의 외부 콘텐츠가 스크린 리더에서 숨겨져요. | `Modal` 컴포넌트가 열린 동안 배경 콘텐츠는 스크린 리더가 읽지 않아요.                      |
| `tabIndex={0}`  | `Modal` 컴포넌트의 내부로 키보드 포커스가 이동해요.        | `Modal` 컴포넌트가 열리면 자동으로 포커스를 받을 수 있어요.                                |
| `role="button"` | 오버레이가 클릭 가능한 요소임을 알려줘요.                  | 스크린 리더 사용자가 오버레이 클릭으로 `Modal` 컴포넌트를 닫을 수 있음을 인지할 수 있어요. |

### 인터페이스

#### ModalProps

| 속성                | 기본값          | 타입                                                                                                                            |
| ------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| **open**            | `-`             | `false`                                                                                                                         | `true``Modal` 컴포넌트의 열림/닫힘 상태를 제어해요. 이 값이 `true`라면 `Modal` 컴포넌트가 열려요. 이 값이 `false`라면 `Modal` 컴포넌트가 닫혀있어요. |
| **onOpenChange**    | `-`             | `(open: boolean) => void``Modal` 컴포넌트의 상태가 변경될 때 호출되는 콜백이에요. `Modal` 컴포넌트가 열리거나 닫힐 때 실행돼요. |
| **onExited**        | `-`             | `() => void``Modal` 컴포넌트가 닫히고 애니메이션이 완료된 후 호출되는 콜백이에요.                                               |
| **portalContainer** | `document.body` | `HTMLElement``Modal` 컴포넌트가 렌더링될 DOM 요소를 지정해요. `Modal` 컴포넌트는 기본적으로 document.body에 렌더링돼요.         |

#### ModalOverlayProps

| 속성        | 기본값 | 타입                                                                       |
| ----------- | ------ | -------------------------------------------------------------------------- |
| **onClick** | `-`    | `() => void``Modal` 컴포넌트의 오버레이(배경) 클릭 시 호출되는 콜백이에요. |
