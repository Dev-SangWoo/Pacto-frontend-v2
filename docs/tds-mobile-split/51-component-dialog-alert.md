# Dialog / Alert Dialog

출처: https://tossmini-docs.toss.im/tds-mobile/components/Dialog/alert-dialog/

DialogAlertDialog

### AlertDialog

`AlertDialog` 컴포넌트는 사용자에게 중요한 정보를 전달하고 단일 확인 버튼을 사용해서 알림을 닫을 수 있는 인터페이스를 제공해요. 주로 작업 완료 알림이나 상태 변경 알림 등 사용자에게 피드백을 제공할 때 사용해요.

### 사용 예제

### 기본 사용법

`AlertDialog` 컴포넌트의 기본적인 구성은 제목(`title`), 설명(`description`), 확인 버튼(`alertButton`)으로 이루어져 있어요. `open` 상태와 `onClose` 핸들러를 함께 사용하여 `AlertDialog` 컴포넌트의 표시 여부를 제어할 수 있어요.

Editable Example

```tsx
function Basic() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>기본 알림 다이얼로그</Button>
      <AlertDialog
        open={open}
        title={<AlertDialog.Title>{"김토스님의 의견이\n잘 전달되었어요"}</AlertDialog.Title>}
        description={
          <AlertDialog.Description>
            {"소중한 의견을 바탕으로 더 간편한 서비스를 만들게요.\n"}
          </AlertDialog.Description>
        }
        alertButton={
          <AlertDialog.AlertButton onClick={() => setOpen(false)}>확인</AlertDialog.AlertButton>
        }
        onClose={() => setOpen(false)}
      />
    </>
  );
}
```

### 외부 딤 클릭 제어하기

`closeOnDimmerClick` 속성을 사용해서 `AlertDialog` 컴포넌트의 바깥 영역을 클릭할 때의 동작을 제어할 수 있어요. 기본값은 `true`이며, `false`로 설정하면 외부 클릭으로 `AlertDialog` 컴포넌트가 닫히지 않고, Wiggle 애니메이션을 보여줘요.

Editable Example

```tsx
function WithWiggle() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>딤 누르면 위글</Button>
      <AlertDialog
        open={open}
        title={<AlertDialog.Title>{"김토스님의 의견이\n잘 전달되었어요"}</AlertDialog.Title>}
        description={
          <AlertDialog.Description>
            {"소중한 의견을 바탕으로 더 간편한\n서비스를 만들게요."}
          </AlertDialog.Description>
        }
        alertButton={
          <AlertDialog.AlertButton onClick={() => setOpen(false)}>확인</AlertDialog.AlertButton>
        }
        onClose={() => setOpen(false)}
        closeOnDimmerClick={false}
      />
    </>
  );
}
```

### 긴 콘텐츠 처리하기

`AlertDialog` 컴포넌트는 다양한 길이의 콘텐츠를 자연스럽게 표시할 수 있어요.

#### 긴 제목 사용하기

제목이 길어도 자연스럽게 줄 바꿈 되어 표시돼요.

Editable Example

```tsx
function LongTitle() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>긴 제목</Button>
      <AlertDialog
        open={open}
        title={
          <AlertDialog.Title>
            {"30글자이상의엄청긴제목30글자이상의엄청긴제목30글자이상의엄청긴제목"}
          </AlertDialog.Title>
        }
        description={
          <AlertDialog.Description>
            {"소중한 의견을 바탕으로 더 간편한\n서비스를 만들게요."}
          </AlertDialog.Description>
        }
        alertButton={
          <AlertDialog.AlertButton onClick={() => setOpen(false)}>확인</AlertDialog.AlertButton>
        }
        onClose={() => setOpen(false)}
      />
    </>
  );
}
```

#### 긴 설명 사용하기

설명이 길 때 스크롤이 자동으로 생성되어 모든 내용을 확인할 수 있어요.

Editable Example

```tsx
function LongDescription() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>긴 설명</Button>
      <AlertDialog
        open={open}
        title={<AlertDialog.Title>{"김토스님의 의견이\n잘 전달되었어요"}</AlertDialog.Title>}
        description={
          <AlertDialog.Description>
            {`소중한 의견을 바탕으로 더 간편한 서비스를 만들게요.\n`.repeat(30)}
          </AlertDialog.Description>
        }
        alertButton={
          <AlertDialog.AlertButton onClick={() => setOpen(false)}>확인</AlertDialog.AlertButton>
        }
        onClose={() => setOpen(false)}
      />
    </>
  );
}
```

#### 긴 버튼 텍스트(레이블) 사용하기

버튼의 텍스트가 길어도 레이아웃이 깨지지 않고 자연스럽게 표시돼요.

Editable Example

```tsx
function LongLabel() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>긴 레이블</Button>
      <AlertDialog
        open={open}
        title={<AlertDialog.Title>{"김토스님의 의견이\n잘 전달되었어요"}</AlertDialog.Title>}
        description={
          <AlertDialog.Description>
            {"소중한 의견을 바탕으로 더 간편한\n서비스를 만들게요."}
          </AlertDialog.Description>
        }
        alertButton={
          <AlertDialog.AlertButton onClick={() => setOpen(false)}>
            {"30글자이상의엄청긴레이블30글자이상의엄청긴레이블30글자이상의엄청긴레이블"}
          </AlertDialog.AlertButton>
        }
        onClose={() => setOpen(false)}
      />
    </>
  );
}
```

### 설명이 없는 `AlertDialog` 컴포넌트

간단한 알림일 때는 제목과 버튼만으로도 구성할 수 있어요.

Editable Example

```tsx
function WithoutDescription() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>설명 없는 다이얼로그</Button>
      <AlertDialog
        open={open}
        title={<AlertDialog.Title>{"김토스님의 의견이\n잘 전달되었어요"}</AlertDialog.Title>}
        alertButton={
          <AlertDialog.AlertButton onClick={() => setOpen(false)}>확인</AlertDialog.AlertButton>
        }
        onClose={() => setOpen(false)}
      />
    </>
  );
}
```

#### 특정 DOM 요소에 렌더링하기

`AlertDialog` 컴포넌트는 기본적으로 `document.body`에 렌더링이 되지만, `portalContainer` 속성을 사용하면 렌더링 위치를 변경할 수 있어요. 이는 특히 `z-index` 관련 이슈나 특별한 레이아웃 요구사항이 있을 때 유용해요.

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

      <AlertDialog
        open={isOpen}
        portalContainer={containerRef.current}
        title={<AlertDialog.Title>특정 컨테이너에 렌더링되는 다이얼로그</AlertDialog.Title>}
        description={
          <AlertDialog.Description>
            이 다이얼로그는 DOM 구조상 상단의 점선 영역에 렌더링 되지만, 시각적으로는 여전히 전체
            화면을 덮어요. 일반적으로 document.body에 렌더링되는 것과 달리, 지정된 컨테이너의 자식
            요소로 마운트돼요.
          </AlertDialog.Description>
        }
        alertButton={
          <AlertDialog.AlertButton onClick={() => setIsOpen(false)}>확인</AlertDialog.AlertButton>
        }
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
}
```

### 인터페이스

#### AlertDialogProps

| 속성                   | 기본값          | 타입                                                                                                                                                                                                                                                                                                                                                     |
| ---------------------- | --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **open**               | `-`             | `false`                                                                                                                                                                                                                                                                                                                                                  | `true``AlertDialog` 컴포넌트의 표시 여부를 결정해요. `true`일 때는 `AlertDialog` 컴포넌트가 화면에 표시되고, `false`일 때는 `AlertDialog` 컴포넌트가 숨겨져요.                |
| **title**              | `-`             | `React.ReactNode``AlertDialog` 컴포넌트의 제목이에요.                                                                                                                                                                                                                                                                                                    |
| **description**        | `-`             | `React.ReactNode``AlertDialog` 컴포넌트의 내용을 설명하는 텍스트나 컴포넌트를 나타낼 수 있어요.                                                                                                                                                                                                                                                          |
| **alertButton**        | `-`             | `React.ReactNode``AlertDialog` 컴포넌트의 확인 버튼이에요.                                                                                                                                                                                                                                                                                               |
| **closeOnDimmerClick** | `true`          | `false`                                                                                                                                                                                                                                                                                                                                                  | `true`배경을 클릭할 때 `AlertDialog` 컴포넌트를 닫을지 여부를 설정해요. `true`로 설정하면 사용자가 `AlertDialog` 컴포넌트 외부를 클릭했을 때 `AlertDialog` 컴포넌트가 닫혀요. |
| **closeOnBackEvent**   | `true`          | `false`                                                                                                                                                                                                                                                                                                                                                  | `true`뒤로가기 이벤트가 발생했을 때 `AlertDialog` 컴포넌트를 닫을지 여부를 결정해요. `true`로 설정하면 사용자가 뒤로가기를 눌렀을 때 `AlertDialog` 컴포넌트가 닫혀요.         |
| **onClose**            | `-`             | `() => void``AlertDialog` 컴포넌트가 닫힐 때 호출되는 콜백 함수에요. `closeOnDimmerClick`이 `true`여도 `onClose`에 함수를 전달하지 않으면 `AlertDialog` 컴포넌트가 닫히지 않아요. `AlertDialog` 컴포넌트를 닫으려면 반드시 `onClose` 함수를 전달해야 해요.                                                                                               |
| **onEntered**          | `-`             | `() => void``AlertDialog` 컴포넌트가 완전히 열린 후 호출되는 콜백 함수에요. `AlertDialog` 컴포넌트가 열리는 애니메이션이 완료된 후에 호출돼요.                                                                                                                                                                                                           |
| **onExited**           | `-`             | `() => void``AlertDialog` 컴포넌트가 완전히 닫힌 후 호출되는 콜백 함수에요. `AlertDialog` 컴포넌트가 닫히는 애니메이션이 완료된 후에 호출돼요.                                                                                                                                                                                                           |
| **portalContainer**    | `document.body` | `HTMLElement``AlertDialog` 컴포넌트가 렌더링될 컨테이너를 지정해요. `portalContainer` 속성을 사용하면 `AlertDialog` 컴포넌트가 렌더링될 DOM 요소를 지정할 수 있어요. 기본적으로는 `document.body`에 렌더링 되지만, 특정 DOM 요소를 지정하여 렌더링 위치를 변경할 수 있어요. 이는 특히 `z-index` 관련 이슈나 특별한 레이아웃 요구사항이 있을 때 유용해요. |

#### AlertDialogTitleProps

| 속성           | 기본값             | 타입                                                                                                                                  |
| -------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------- | ---------- | ------------ | ----------------------------------------------------------------------- | ------ | ------- | ------- | ------- | ------ | ------- | ------ | ------- | ------- | ------ | -------- | ------ | -------- | ------ | -------- | -------------------------------------------------------------------------------- |
| **as**         | `'h3'`             | `string``AlertDialog` 컴포넌트 제목의 HTML 태그를 지정해요.                                                                           |
| **color**      | `adaptive.grey800` | `string``AlertDialog` 컴포넌트 제목의 색상을 지정해요. 기본적으로 `adaptive.grey800` 색상이 사용되며, 다른 색상으로 변경할 수 있어요. |
| **typography** | `'t4'`             | `"t1"`                                                                                                                                | `"st1"`    | `"st2"`      | `"st3"`                                                                 | `"t2"` | `"st4"` | `"st5"` | `"st6"` | `"t3"` | `"st7"` | `"t4"` | `"st8"` | `"st9"` | `"t5"` | `"st10"` | `"t6"` | `"st11"` | `"t7"` | `"st12"` | `"st13"`제목의 타이포그래피를 지정해요. 기본적으로 `t4` 타이포그래피가 적용돼요. |
| **fontWeight** | `'bold'`           | `"regular"`                                                                                                                           | `"medium"` | `"semibold"` | `"bold"`제목의 글꼴 두께를 지정해요. 기본적으로 `bold` 두께가 적용돼요. |

#### AlertDialogDescriptionProps

| 속성           | 기본값             | 타입                                                                                           |
| -------------- | ------------------ | ---------------------------------------------------------------------------------------------- | ---------- | ------------ | ------------------------------------------------------------------------- | ------ | ------- | ------- | ------- | ------ | ------- | ------ | ------- | ------- | ------ | -------- | ------ | -------- | ------ | -------- | -------------------------------------------------------------------------------- |
| **as**         | `'h3'`             | `string``AlertDialog` 컴포넌트 설명의 HTML 태그를 지정해요. 기본적으로 `h3` 태그로 렌더링돼요. |
| **color**      | `adaptive.grey600` | `string`설명의 색상을 지정해요. 기본적으로 `adaptive.grey600` 색상이 적용돼요.                 |
| **typography** | `'t6'`             | `"t1"`                                                                                         | `"st1"`    | `"st2"`      | `"st3"`                                                                   | `"t2"` | `"st4"` | `"st5"` | `"st6"` | `"t3"` | `"st7"` | `"t4"` | `"st8"` | `"st9"` | `"t5"` | `"st10"` | `"t6"` | `"st11"` | `"t7"` | `"st12"` | `"st13"`설명의 타이포그래피를 지정해요. 기본적으로 `t6` 타이포그래피가 적용돼요. |
| **fontWeight** | `'medium'`         | `"regular"`                                                                                    | `"medium"` | `"semibold"` | `"bold"`설명의 글꼴 두께를 지정해요. 기본적으로 `medium` 두께가 적용돼요. |

#### AlertDialogAlertButtonProps

| 속성           | 기본값           | 타입                                                                         |
| -------------- | ---------------- | ---------------------------------------------------------------------------- | ------------- | ------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------- | ---------- | ------------------------------------------- |
| **size**       | `'medium'`       | `"medium"`                                                                   | `"xsmall"`    | `"small"`                                                                                  | `"large"`                                                               | `"xlarge"` | `"xxlarge"`텍스트 버튼의 사이즈를 결정해요. |
| **color**      | `colors.blue500` | `string`버튼의 색상을 지정해요. 기본적으로 `colors.blue500` 색상이 적용돼요. |
| **fontWeight** | `'bold'`         | `"regular"`                                                                  | `"medium"`    | `"semibold"`                                                                               | `"bold"`버튼의 글꼴 두께를 지정해요. 기본적으로 `bold` 두께가 적용돼요. |
| **variant**    | `-`              | `"arrow"`                                                                    | `"underline"` | `"clear"`버튼의 변형을 지정해요. 'arrow', 'underline', 'clear' 중 하나를 선택할 수 있어요. |
