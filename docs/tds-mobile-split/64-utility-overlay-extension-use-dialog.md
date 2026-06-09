# 유틸리티 / Overlay Extension / useDialog

출처: https://tossmini-docs.toss.im/tds-mobile/hooks/OverlayExtension/use-dialog/

Overlay ExtensionuseDialog

### useDialog

`useDialog` 훅은 Alert와 Confirm 형태의 다이얼로그를 쉽게 표시할 수 있게 해주는 유틸리티 훅이에요.

### 사용 예시

### Alert 다이얼로그 표시하기

`openAlert` 메서드를 사용하여 기본적인 Alert 다이얼로그를 표시할 수 있어요. `title`로 제목을, `description`으로 설명을 설정할 수 있고, `alertButton` 속성으로 버튼의 텍스트나 커스텀 버튼을 설정할 수 있어요. `closeOnDimmerClick` 속성을 `false`로 설정하면 배경 클릭으로 다이얼로그가 닫히는 것을 방지할 수 있어요.

Editable Example

```tsx
function Basic() {
  const { openAlert } = useDialog();

  return (
    <Button
      onClick={() => {
        openAlert({
          title: "알려드릴게요",
          description: "작업이 완료됐어요.",
          alertButton: "확인하기",
        });
      }}
    >
      기본 Alert 다이얼로그 열기
    </Button>
  );
}
```

### Confirm 다이얼로그 표시하기

`openConfirm` 메서드는 사용자의 결정을 요구하는 상황에서 유용해요. `confirmButton`과 `cancelButton` 속성으로 각 버튼의 텍스트를 지정하거나, 커스텀 버튼을 사용할 수 있어요.

Editable Example

```tsx
function BasicConfirm() {
  const { openConfirm } = useDialog();

  return (
    <Button
      onClick={() => {
        openConfirm({
          title: "삭제할까요?",
          description: "이 작업은 되돌릴 수 없어요.",
          confirmButton: "삭제하기",
          cancelButton: "취소",
        });
      }}
    >
      기본 Confirm 다이얼로그 열기
    </Button>
  );
}
```

### 비동기 작업 처리하기

`openAsyncConfirm`을 사용하면 버튼을 클릭했을 때 로딩 상태를 표시하면서 비동기 작업을 처리할 수 있어요. `onConfirmClick`과 `onCancelClick` 속성에 비동기 함수를 전달하면, 작업이 완료될 때까지 자동으로 로딩 상태가 처리돼요.

Editable Example

```tsx
function AsyncConfirm() {
  const { openAsyncConfirm } = useDialog();

  const delay = async (milliseconds: number) => {
    await new Promise((res) => setTimeout(res, milliseconds));
  };

  return (
    <Button
      onClick={() => {
        openAsyncConfirm({
          title: "상담을 종료할까요?",
          description: "상담을 종료하면 대화를 이어갈 수 없어요.",
          confirmButton: "종료하기",
          cancelButton: "취소",
          onConfirmClick: () => delay(2000),
        });
      }}
    >
      비동기 Confirm 다이얼로그 열기
    </Button>
  );
}
```

### 인터페이스

#### AlertOptions

| 속성                   | 기본값   | 타입                                                               |
| ---------------------- | -------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------- |
| **title\***            | `-`      | `React.ReactNode``AlertDialog` 컴포넌트의 제목이에요.              |
| **description**        | `-`      | `React.ReactNode``AlertDialog` 컴포넌트의 설명이에요.              |
| **alertButton**        | `'확인'` | `"ReactElement                                                     | string"``AlertDialog` 컴포넌트의 확인 버튼이에요. 버튼의 텍스트나 커스텀 버튼을 설정할 수 있어요. |
| **closeOnDimmerClick** | `false`  | `false`                                                            | `true`배경을 클릭했을 때 `AlertDialog` 컴포넌트가 닫힐지 여부를 설정해요.                         |
| **onEntered**          | `-`      | `() => void``AlertDialog` 컴포넌트가 열린 후 실행될 콜백 함수에요. |
| **onExited**           | `-`      | `() => void``AlertDialog` 컴포넌트가 닫힌 후 실행될 콜백 함수에요. |

#### ConfirmOptions

| 속성                   | 기본값   | 타입                                                                 |
| ---------------------- | -------- | -------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| **title\***            | `-`      | `React.ReactNode``ConfirmDialog` 컴포넌트의 제목이에요.              |
| **description**        | `-`      | `React.ReactNode``ConfirmDialog` 컴포넌트의 설명이에요.              |
| **closeOnDimmerClick** | `false`  | `false`                                                              | `true`배경을 클릭했을 때 `ConfirmDialog` 컴포넌트가 닫힐지 여부를 설정해요.                         |
| **confirmButton**      | `'확인'` | `"ReactElement                                                       | string"``ConfirmDialog` 컴포넌트의 확인 버튼이에요. 버튼의 텍스트나 커스텀 버튼을 설정할 수 있어요. |
| **cancelButton**       | `'취소'` | `"ReactElement                                                       | string"``ConfirmDialog` 컴포넌트의 취소 버튼이에요. 버튼의 텍스트나 커스텀 버튼을 설정할 수 있어요. |
| **onEntered**          | `-`      | `() => void``ConfirmDialog` 컴포넌트가 열린 후 실행될 콜백 함수에요. |
| **onExited**           | `-`      | `() => void``ConfirmDialog` 컴포넌트가 닫힌 후 실행될 콜백 함수에요. |

#### AsyncConfirmOptions

| 속성                             | 기본값      | 타입                                                                      |
| -------------------------------- | ----------- | ------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| **title\***                      | `-`         | `React.ReactNode``AsyncConfirmDialog` 컴포넌트의 제목이에요.              |
| **description**                  | `-`         | `React.ReactNode``AsyncConfirmDialog` 컴포넌트의 설명이에요.              |
| **closeOnDimmerClick**           | `false`     | `false`                                                                   | `true`배경을 클릭했을 때 `AsyncConfirmDialog` 컴포넌트가 닫힐지 여부를 설정해요.                         |
| **onEntered**                    | `-`         | `() => void``AsyncConfirmDialog` 컴포넌트가 열린 후 실행될 콜백 함수에요. |
| **onExited**                     | `-`         | `() => void``AsyncConfirmDialog` 컴포넌트가 닫힌 후 실행될 콜백 함수에요. |
| **confirmButton**                | `'확인'`    | `"ReactElement                                                            | string"``AsyncConfirmDialog` 컴포넌트의 확인 버튼이에요. 버튼의 텍스트나 커스텀 버튼을 설정할 수 있어요. |
| **onConfirmClick**               | `-`         | `() => Promise<void>`확인 버튼을 클릭할 때 실행될 비동기 함수에요.        |
| **confirmButtonLoadingPropName** | `'loading'` | `string`확인 버튼의 로딩 상태를 나타내는 prop의 이름이에요.               |
| **cancelButton**                 | `'취소'`    | `"ReactElement                                                            | string"``AsyncConfirmDialog` 컴포넌트의 취소 버튼이에요. 버튼의 텍스트나 커스텀 버튼을 설정할 수 있어요. |
| **onCancelClick**                | `-`         | `() => Promise<void>`취소 버튼을 클릭할 때 실행될 비동기 함수에요.        |
| **cancelButtonLoadingPropName**  | `'loading'` | `string`취소 버튼의 로딩 상태를 나타내는 prop의 이름이에요.               |
