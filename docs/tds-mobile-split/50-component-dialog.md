# Dialog / Dialog

출처: https://tossmini-docs.toss.im/tds-mobile/components/Dialog/dialog/

DialogDialog 이해하기

### Dialog 이해하기

이 문서를 읽고나면,

- `Dialog` 컴포넌트의 구조와 `AlertDialog` 컴포넌트와 `ConfirmDialog` 컴포넌트의 차이를 이해할 수 있어요.

### 이해하기

`Dialog` 컴포넌트는 사용자에게 중요한 정보를 전달하거나 선택을 요구할 때 사용되는 모달 인터페이스에요. 주로 작업 완료 알림, 상태 변경 알림, 또는 사용자의 확인이 필요한 중요한 액션을 수행할 때 사용돼요.

### AlertDialog vs ConfirmDialog

`AlertDialog` 컴포넌트와 `ConfirmDialog` 컴포넌트는 모두 사용자와의 상호작용을 위한 UI를 제공해요. 차이점은 버튼의 개수와 용도에요.

다음은 `AlertDialog`와 `ConfirmDialog`의 차이를 비교한 표에요.

| 타입          | 설명                                                                                                             | 문서                                                                                            |
| ------------- | ---------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| AlertDialog   | **단일 버튼**을 통해 **알림을 확인**하는 형태에요. 주로 작업 완료나 상태 변경을 알릴 때 사용해요.                | AlertDialog 문서 (https://tossmini-docs.toss.im/tds-mobile/components/Dialog/alert-dialog/)     |
| ConfirmDialog | **두 개의 버튼**을 통해 **사용자의 선택을 받는** 형태에요. 주로 중요한 액션의 실행 전 확인이 필요할 때 사용해요. | ConfirmDialog 문서 (https://tossmini-docs.toss.im/tds-mobile/components/Dialog/confirm-dialog/) |

### Dialog의 구성 요소

`Dialog` 컴포넌트는 다음과 같은 구성 요소들로 이루어져 있어요.

-

**제목 (Title)**

- 주요 메시지를 표시해요.
- `AlertDialog.Title` 컴포넌트 또는 `ConfirmDialog.Title` 컴포넌트를 사용해요.

-

**설명 (Description)**

- 부가적인 설명이 필요할 때 사용해요.
- `AlertDialog.Description` 또는 `ConfirmDialog.Description` 컴포넌트를 사용해요.
- 선택적으로 사용할 수 있어요.

-

**버튼**

- `AlertDialog`: 단일 확인 버튼 (`AlertDialog.AlertButton`)
- `ConfirmDialog`: 취소/확인 버튼 (`ConfirmDialog.CancelButton`, `ConfirmDialog.ConfirmButton`)

각 Dialog 타입의 자세한 사용법은 해당 컴포넌트의 문서를 참고하세요.
