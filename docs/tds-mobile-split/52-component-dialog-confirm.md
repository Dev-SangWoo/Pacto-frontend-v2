# Dialog / Confirm Dialog

출처: https://tossmini-docs.toss.im/tds-mobile/components/Dialog/confirm-dialog/

DialogConfirmDialog

### ConfirmDialog

`ConfirmDialog` 컴포넌트는 사용자의 액션이나 선택이 필요한 상황에서 사용되는 인터페이스를 제공해요. 확인과 취소, 두 개의 버튼을 통해 사용자가 명확한 선택을 할 수 있도록 도와줘요.

### 사용 예제

### 기본 사용법

`ConfirmDialog` 컴포넌트의 기본적인 구성은 제목(`title`), 설명(`description`), 취소 버튼(`cancelButton`), 확인 버튼(`confirmButton`)으로 이루어져 있어요. `open`상태와`onClose`핸들러를 함께 사용하여 `ConfirmDialog` 컴포넌트의 표시 여부를 제어할 수 있어요.

Editable Example

```tsx
function Basic() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>기본 확인 다이얼로그</Button>
      <ConfirmDialog
        open={open}
        title={<ConfirmDialog.Title>{"김토스님의 의견이\n잘 전달되었어요"}</ConfirmDialog.Title>}
        description={
          <ConfirmDialog.Description>
            {"소중한 의견을 바탕으로 더 간편한\n서비스를 만들게요."}
          </ConfirmDialog.Description>
        }
        cancelButton={
          <ConfirmDialog.CancelButton onClick={() => setOpen(false)}>
            아니오
          </ConfirmDialog.CancelButton>
        }
        confirmButton={
          <ConfirmDialog.ConfirmButton onClick={() => setOpen(false)}>
            예
          </ConfirmDialog.ConfirmButton>
        }
        onClose={() => setOpen(false)}
      />
    </>
  );
}
```

### 외부 딤 클릭 제어하기

`closeOnDimmerClick` 속성을 통해 `ConfirmDialog` 컴포넌트 외부(딤) 영역 클릭 시의 동작을 제어할 수 있어요. 기본값은 `true`이며, `false`로 설정하면 외부 클릭으로 `ConfirmDialog` 컴포넌트가 닫히지 않고, Wiggle 애니메이션을 보여줘요.

Editable Example

```tsx
function WithWiggle() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>딤 누르면 위글</Button>
      <ConfirmDialog
        open={open}
        title={<ConfirmDialog.Title>{"김토스님의 의견이\n잘 전달되었어요"}</ConfirmDialog.Title>}
        description={
          <ConfirmDialog.Description>
            {"소중한 의견을 바탕으로 더 간편한 서비스를 만들게요.\n"}
          </ConfirmDialog.Description>
        }
        cancelButton={
          <ConfirmDialog.CancelButton onClick={() => setOpen(false)}>
            아니오
          </ConfirmDialog.CancelButton>
        }
        confirmButton={
          <ConfirmDialog.ConfirmButton onClick={() => setOpen(false)}>
            예
          </ConfirmDialog.ConfirmButton>
        }
        onClose={() => setOpen(false)}
        closeOnDimmerClick={false}
      />
    </>
  );
}
```

### 긴 콘텐츠 처리하기

`ConfirmDialog` 컴포넌트는 다양한 길이의 콘텐츠를 자연스럽게 표시할 수 있어요.

#### 긴 설명 사용하기

설명이 길 경우 스크롤이 자동으로 생성되어 모든 내용을 확인할 수 있어요.

Editable Example

```tsx
function LongDescription() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>긴 설명</Button>
      <ConfirmDialog
        open={open}
        title={<ConfirmDialog.Title>{"김토스님의 의견이\n잘 전달되었어요"}</ConfirmDialog.Title>}
        description={
          <ConfirmDialog.Description>
            {`소중한 의견을 바탕으로 더 간편한\n서비스를 만들게요.`.repeat(30)}
          </ConfirmDialog.Description>
        }
        cancelButton={
          <ConfirmDialog.CancelButton onClick={() => setOpen(false)}>
            아니오
          </ConfirmDialog.CancelButton>
        }
        confirmButton={
          <ConfirmDialog.ConfirmButton onClick={() => setOpen(false)}>
            예
          </ConfirmDialog.ConfirmButton>
        }
        onClose={() => setOpen(false)}
      />
    </>
  );
}
```

#### 긴 버튼 텍스트 사용하기

버튼의 텍스트가 길어지면 버튼의 레이아웃이 자동으로 조정돼요. 버튼의 텍스트가 짧을 때는 가로로 나란히 배치되지만, 텍스트가 길어지면 세로로 쌓이면서 각 버튼이 전체 너비를 사용해요.

Editable Example

```tsx
function LongButtons() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>긴 버튼</Button>
      <ConfirmDialog
        open={open}
        title={<ConfirmDialog.Title>{"김토스님의 의견이\n잘 전달되었어요"}</ConfirmDialog.Title>}
        description={
          <ConfirmDialog.Description>
            {"소중한 의견을 바탕으로 더 간편한\n서비스를 만들게요."}
          </ConfirmDialog.Description>
        }
        cancelButton={
          <ConfirmDialog.CancelButton onClick={() => setOpen(false)}>
            아니오, 취소해주세요
          </ConfirmDialog.CancelButton>
        }
        confirmButton={
          <ConfirmDialog.ConfirmButton onClick={() => setOpen(false)}>
            예, 알겠습니다
          </ConfirmDialog.ConfirmButton>
        }
        onClose={() => setOpen(false)}
      />
    </>
  );
}
```

### 설명 없는 `ConfirmDialog` 컴포넌트

간단한 확인이 필요한 경우 제목과 버튼들만으로도 구성할 수 있어요.

Editable Example

```tsx
function WithoutDescription() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>설명 없음</Button>
      <ConfirmDialog
        open={open}
        title={<ConfirmDialog.Title>{"김토스님의 의견이\n잘 전달되었어요"}</ConfirmDialog.Title>}
        cancelButton={
          <ConfirmDialog.CancelButton onClick={() => setOpen(false)}>
            아니오
          </ConfirmDialog.CancelButton>
        }
        confirmButton={
          <ConfirmDialog.ConfirmButton onClick={() => setOpen(false)}>
            예
          </ConfirmDialog.ConfirmButton>
        }
        onClose={() => setOpen(false)}
      />
    </>
  );
}
```

#### 특정 DOM 요소에 렌더링하기

`ConfirmDialog` 컴포넌트는 기본적으로 `document.body`에 렌더링이 되지만, `portalContainer` 속성을 사용하면 렌더링 위치를 변경할 수 있어요. 이는 특히 `z-index` 관련 이슈나 특별한 레이아웃 요구사항이 있을 때 유용해요.

Editable Example

```tsx
function PortalContainer() {
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {/* 다이얼로그가 렌더링될 컨테이너 */}
      <div
        ref={containerRef}
        style={{
          position: "relative",
          padding: "16px",
          border: "2px dashed #E5E5EC",
          borderRadius: "8px",
          minHeight: "100px",
        }}
      >
        <div style={{ color: "#98989F" }}>다이얼로그가 이 영역에 렌더링돼요.</div>
      </div>

      {/* 버튼은 별도의 영역에 위치 */}
      <div>
        <Button onClick={() => setIsOpen(true)}>다이얼로그 열기</Button>
        <p style={{ marginTop: "8px", color: "#98989F", fontSize: "14px" }}>
          👆 버튼은 다른 영역에 있지만, 다이얼로그는 위의 점선 영역에 그려져요.
        </p>
      </div>

      <ConfirmDialog
        open={isOpen}
        portalContainer={containerRef.current}
        title={<ConfirmDialog.Title>특정 컨테이너에 렌더링되는 다이얼로그</ConfirmDialog.Title>}
        description={
          <ConfirmDialog.Description>
            이 다이얼로그는 DOM 구조상 상단의 점선 영역에 렌더링 되지만, 시각적으로는 여전히 전체
            화면을 덮어요. 일반적으로 document.body에 렌더링되는 것과 달리, 지정된 컨테이너의 자식
            요소로 마운트돼요.
          </ConfirmDialog.Description>
        }
        cancelButton={
          <ConfirmDialog.CancelButton onClick={() => setIsOpen(false)}>
            취소
          </ConfirmDialog.CancelButton>
        }
        confirmButton={
          <ConfirmDialog.ConfirmButton onClick={() => setIsOpen(false)}>
            확인
          </ConfirmDialog.ConfirmButton>
        }
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
}
```

### 인터페이스

#### ConfirmDialogProps

| 속성                   | 기본값          | 타입                                                                                                                                                                                                                                                                                                                                                         |
| ---------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **open**               | `-`             | `false`                                                                                                                                                                                                                                                                                                                                                      | `true``ConfirmDialog` 컴포넌트의 표시 여부를 결정해요. `true`일 때는 `ConfirmDialog` 컴포넌트가 화면에 표시되고, `false`일 때는 `ConfirmDialog` 컴포넌트가 숨겨져요.                |
| **title**              | `-`             | `React.ReactNode``ConfirmDialog` 컴포넌트의 제목이에요.                                                                                                                                                                                                                                                                                                      |
| **description**        | `-`             | `React.ReactNode``ConfirmDialog` 컴포넌트의 내용을 설명하는 텍스트나 컴포넌트를 나타낼 수 있어요.                                                                                                                                                                                                                                                            |
| **cancelButton**       | `-`             | `React.ReactNode``ConfirmDialog` 컴포넌트의 취소 버튼이에요.                                                                                                                                                                                                                                                                                                 |
| **confirmButton**      | `-`             | `React.ReactNode``ConfirmDialog` 컴포넌트의 확인 버튼이에요.                                                                                                                                                                                                                                                                                                 |
| **closeOnDimmerClick** | `true`          | `false`                                                                                                                                                                                                                                                                                                                                                      | `true`딤(배경) 클릭 시 `ConfirmDialog` 컴포넌트를 닫을지 여부를 결정해요. `true`로 설정하면 사용자가 `ConfirmDialog` 컴포넌트 외부를 클릭했을 때 `ConfirmDialog` 컴포넌트가 닫혀요. |
| **closeOnBackEvent**   | `true`          | `false`                                                                                                                                                                                                                                                                                                                                                      | `true`뒤로가기 이벤트가 발생했을 때 `ConfirmDialog` 컴포넌트를 닫을지 여부를 결정해요. `true`로 설정하면 사용자가 뒤로가기를 눌렀을 때 `ConfirmDialog` 컴포넌트가 닫혀요.           |
| **onClose**            | `-`             | `() => void``ConfirmDialog` 컴포넌트가 닫힐 때 호출되는 콜백 함수에요. `closeOnDimmerClick`이 `true`이어도 `onClose`에 함수를 전달하지 않으면 `ConfirmDialog` 컴포넌트가 닫히지 않아요. `ConfirmDialog` 컴포넌트를 닫으려면 반드시 `onClose` 함수를 전달해야 해요.                                                                                           |
| **onEntered**          | `-`             | `() => void``ConfirmDialog` 컴포넌트가 완전히 열린 후 호출되는 콜백 함수에요. `ConfirmDialog` 컴포넌트가 열리는 애니메이션이 완료된 후에 호출돼요.                                                                                                                                                                                                           |
| **onExited**           | `-`             | `() => void``ConfirmDialog` 컴포넌트가 완전히 닫힌 후 호출되는 콜백 함수에요. `ConfirmDialog` 컴포넌트가 닫히는 애니메이션이 완료된 후에 호출돼요.                                                                                                                                                                                                           |
| **portalContainer**    | `document.body` | `HTMLElement``ConfirmDialog` 컴포넌트가 렌더링될 컨테이너를 지정해요. `portalContainer` 속성을 사용하면 `ConfirmDialog` 컴포넌트가 렌더링될 DOM 요소를 지정할 수 있어요. 기본적으로는 `document.body`에 렌더링 되지만, 특정 DOM 요소를 지정하여 렌더링 위치를 변경할 수 있어요. 이는 특히 `z-index` 관련 이슈나 특별한 레이아웃 요구사항이 있을 때 유용해요. |

#### ConfirmDialogTitleProps

| 속성           | 기본값             | 타입                                                                                                           |
| -------------- | ------------------ | -------------------------------------------------------------------------------------------------------------- | ---------- | ------------ | ----------------------------------------------------------------------- | ------ | ------- | ------- | ------- | ------ | ------- | ------ | ------- | ------- | ------ | -------- | ------ | -------- | ------ | -------- | -------------------------------------------------------------------------------- |
| **as**         | `'h3'`             | `string``ConfirmDialog` 컴포넌트 제목의 HTML 태그를 지정해요.                                                  |
| **color**      | `adaptive.grey800` | `string`제목의 색상을 지정해요. 기본적으로 `adaptive.grey800` 색상이 사용되며, 다른 색상으로 변경할 수 있어요. |
| **typography** | `'t4'`             | `"t1"`                                                                                                         | `"st1"`    | `"st2"`      | `"st3"`                                                                 | `"t2"` | `"st4"` | `"st5"` | `"st6"` | `"t3"` | `"st7"` | `"t4"` | `"st8"` | `"st9"` | `"t5"` | `"st10"` | `"t6"` | `"st11"` | `"t7"` | `"st12"` | `"st13"`제목의 타이포그래피를 지정해요. 기본적으로 `t4` 타이포그래피가 적용돼요. |
| **fontWeight** | `'bold'`           | `"regular"`                                                                                                    | `"medium"` | `"semibold"` | `"bold"`제목의 글꼴 두께를 지정해요. 기본적으로 `bold` 두께가 적용돼요. |

#### ConfirmDialogDescriptionProps

| 속성           | 기본값             | 타입                                                                           |
| -------------- | ------------------ | ------------------------------------------------------------------------------ | ---------- | ------------ | ------------------------------------------------------------------------- | ------ | ------- | ------- | ------- | ------ | ------- | ------ | ------- | ------- | ------ | -------- | ------ | -------- | ------ | -------- | -------------------------------------------------------------------------------- |
| **as**         | `'h3'`             | `string`설명의 HTML 태그를 지정해요. 기본적으로 `h3` 태그로 렌더링돼요.        |
| **color**      | `adaptive.grey600` | `string`설명의 색상을 지정해요. 기본적으로 `adaptive.grey600` 색상이 적용돼요. |
| **typography** | `'t6'`             | `"t1"`                                                                         | `"st1"`    | `"st2"`      | `"st3"`                                                                   | `"t2"` | `"st4"` | `"st5"` | `"st6"` | `"t3"` | `"st7"` | `"t4"` | `"st8"` | `"st9"` | `"t5"` | `"st10"` | `"t6"` | `"st11"` | `"t7"` | `"st12"` | `"st13"`설명의 타이포그래피를 지정해요. 기본적으로 `t6` 타이포그래피가 적용돼요. |
| **fontWeight** | `'medium'`         | `"regular"`                                                                    | `"medium"` | `"semibold"` | `"bold"`설명의 글꼴 두께를 지정해요. 기본적으로 `medium` 두께가 적용돼요. |

#### ConfirmDialogCancelButtonProps

| 속성      | 기본값    | 타입        |
| --------- | --------- | ----------- | ---------------------------------------------------------------------- | --------- | ------------------------------------------------------------------- |
| **type**  | `'dark'`  | `"primary"` | `"danger"`                                                             | `"light"` | `"dark"`버튼의 타입을 지정해요. 기본적으로 `dark` 타입이 적용돼요.  |
| **style** | `'weak'`  | `"fill"`    | `"weak"`버튼의 스타일을 지정해요. 기본적으로 `weak` 스타일이 적용돼요. |
| **size**  | `'large'` | `"medium"`  | `"big"`                                                                | `"large"` | `"tiny"`버튼의 크기를 지정해요. 기본적으로 `large` 크기가 적용돼요. |

#### ConfirmDialogConfirmButtonProps

Button 컴포넌트를 확장하여 제작했어요. Button 컴포넌트의 모든 속성을 사용할 수 있어요.

| 속성     | 기본값    | 타입       |
| -------- | --------- | ---------- | ------- | --------- | ------------------------------------------------------------------- |
| **size** | `'large'` | `"medium"` | `"big"` | `"large"` | `"tiny"`버튼의 크기를 지정해요. 기본적으로 `large` 크기가 적용돼요. |
