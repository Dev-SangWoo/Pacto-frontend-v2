# 유틸리티 / Overlay Extension / useBottomSheet

출처: https://tossmini-docs.toss.im/tds-mobile/hooks/OverlayExtension/use-bottom-sheet/

Overlay ExtensionuseBottomSheet

### useBottomSheet

`useBottomSheet` 훅은 화면 하단에서 올라오는 바텀시트를 쉽게 제어할 수 있게 해주는 유틸리티 훅이에요. 이 훅을 사용하면 바텀시트의 열림과 닫힘 상태를 제어하고, 콘텐츠 표시와 사용자 상호작용을 효율적으로 처리할 수 있어요. 이를 통해 반복적인 코드를 줄이고, 바텀시트를 일관되게 구현할 수 있어요.

### 사용 예시

### 기본 바텀시트 표시하기

`open` 메서드를 사용하여 기본적인 바텀시트를 표시할 수 있어요.

- `header` 속성으로 제목을, `children`으로 내용을 전달할 수 있어요.
- `closeOnDimmerClick` 속성을 사용해 배경 클릭 시 바텀시트가 닫히는 동작을 제어할 수 있어요. 기본값은 `true`예요.

Editable Example

```tsx
function Basic() {
  const { open, close } = useBottomSheet();

  return (
    <Button
      onClick={() => {
        open({
          header: "기본 바텀시트예요",
          children: (
            <Text style={{ margin: "0 24px 24px 24px" }}>컨텐츠만 있는 기본적인 바텀시트예요.</Text>
          ),
          onClose: () => close(),
        });
      }}
    >
      기본 바텀시트 열기
    </Button>
  );
}
```

### 단일 버튼 바텀시트

`openOneButtonSheet` 메서드를 사용하면 하나의 버튼이 있는 바텀시트를 표시할 수 있어요.

- `button` 속성으로 버튼의 텍스트나 커스텀 버튼을 설정할 수 있어요. 문자열을 전달하면 기본 버튼이 생성돼요.
- `closeOnButtonClick` 속성으로 버튼을 클릭했을 때 바텀시트가 닫히는 동작을 제어할 수 있어요.

Editable Example

```tsx
function OneButtonSheet() {
  const { openOneButtonSheet } = useBottomSheet();

  return (
    <Button
      onClick={() => {
        openOneButtonSheet({
          header: "단일 버튼 바텀시트예요",
          children: <Text style={{ margin: "0 24px" }}>하나의 버튼이 있는 바텀시트예요.</Text>,
          button: "확인",
        });
      }}
    >
      단일 버튼 바텀시트 열기
    </Button>
  );
}
```

### 이중 버튼 바텀시트

`openTwoButtonSheet` 메서드로 두 개의 버튼이 있는 바텀시트를 표시할 수 있어요.

- `leftButton`과 `rightButton` 속성으로 각 버튼을 설정하고, `closeOnLeftButtonClick`과 `closeOnRightButtonClick`으로 각 버튼을 클릭할 때의 닫힘 동작을 제어할 수 있어요.

Editable Example

```tsx
function TwoButtonSheet() {
  const { openTwoButtonSheet } = useBottomSheet();

  return (
    <Button
      onClick={async () => {
        await openTwoButtonSheet({
          header: "이중 버튼 바텀시트예요",
          children: <Text style={{ margin: "0 24px" }}>두 개의 버튼이 있는 바텀시트예요.</Text>,
          leftButton: "취소",
          rightButton: "확인",
        });
      }}
    >
      이중 버튼 바텀시트 열기
    </Button>
  );
}
```

### 비동기 작업 처리하기

`openAsyncTwoButtonSheet` 메서드를 사용하면 버튼을 클릭할 때 버튼에 로딩 중임이 표현되고, 조건이 만족할 때까지 바텀시트를 표시할 수 있어요. 이 방법은 작업이 끝날 때까지 바텀시트를 유지해야 할 때 유용해요.

- `onLeftButtonClick`과 `onRightButtonClick` 속성에 비동기 함수를 전달하면, 작업이 완료될 때까지 자동으로 로딩 상태가 처리돼요.

Editable Example

```tsx
function AsyncSheet() {
  const { openAsyncTwoButtonSheet } = useBottomSheet();

  const delay = async (milliseconds: number) => {
    await new Promise((res) => setTimeout(res, milliseconds));
  };

  return (
    <Button
      onClick={() => {
        openAsyncTwoButtonSheet({
          header: "결제를 취소할까요?",
          children: <Text style={{ margin: "0 24px" }}>결제를 취소하면 되돌릴 수 없어요.</Text>,
          leftButton: "취소",
          rightButton: "확인",
          onRightButtonClick: () => delay(1000),
        });
      }}
    >
      비동기 바텀시트 열기
    </Button>
  );
}
```

### 인터페이스

#### BottomSheetOptions

| 속성                         | 기본값 | 타입                                                                |
| ---------------------------- | ------ | ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **children\***               | `-`    | `React.ReactNode``BottomSheet` 컴포넌트의 내용이에요.               |
| **header**                   | `-`    | `React.ReactNode``BottomSheet` 컴포넌트의 헤더에 표시될 제목이에요. |
| **closeOnDimmerClick**       | `true` | `false`                                                             | `true``BottomSheet` 컴포넌트 외부의 어두운 배경을 클릭했을 때 `BottomSheet` 컴포넌트가 닫힐지 여부를 설정해요.                                                                                                                                                                                                                                                                          |
| **onEntered**                | `-`    | `() => void``BottomSheet` 컴포넌트가 열린 후 실행될 콜백 함수에요.  |
| **onExited**                 | `-`    | `() => void``BottomSheet` 컴포넌트가 닫힌 후 실행될 콜백 함수에요.  |
| **UNSAFE_disableFocusLock**  | `-`    | `false`                                                             | `true``BottomSheet` 컴포넌트가 열렸을 때 `BottomSheet` 컴포넌트 외부 영역에서: - 키보드 포커스가 `BottomSheet` 컴포넌트 내부로 제한되지 않도록 하고 - 스크린 리더가 `BottomSheet` 컴포넌트 외부 콘텐츠를 읽을 수 있도록 해요. 이 속성을 사용하면 접근성이 제한될 수 있으므로 불가피한 경우에만 사용해주세요.                                                                            |
| **UNSAFE_ignoreDimmerClick** | `-`    | `false`                                                             | `true``BottomSheet` 컴포넌트 외부의 어두운 배경을 클릭해도 onClose가 호출되지 않게 해요. **주의: `BottomSheet` 컴포넌트 외부 영역 클릭 시 사용자의 액션을 취소하고 `BottomSheet` 컴포넌트가 닫히는 것이 권장되는 동작이에요.**                                                                                                                                                          |
| **UNSAFE_ignoreBackEvent**   | `-`    | `false`                                                             | `true`앱에서 제공하는 뒤로가기 이벤트를 무시할지 설정해요. true로 설정하면 뒤로가기 동작이 발생해도 `BottomSheet` 컴포넌트가 닫히지 않아요. **주의: 뒤로가기 동작 발생 시 사용자의 액션을 취소하고 `BottomSheet` 컴포넌트가 닫히는 것이 권장되는 동작이에요.** 추후 이 api가 deprecated 될 수 있으므로, 취소 액션을 구현하는 것이 기술적으로 어려운 상황에서만 이 속성을 사용해 주세요. |

#### OneButtonOptions

| 속성                         | 기본값   | 타입                                                                |
| ---------------------------- | -------- | ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **children\***               | `-`      | `React.ReactNode``BottomSheet` 컴포넌트의 내용이에요.               |
| **header**                   | `-`      | `React.ReactNode``BottomSheet` 컴포넌트의 헤더에 표시될 제목이에요. |
| **closeOnDimmerClick**       | `true`   | `false`                                                             | `true`배경을 클릭했을 때 `BottomSheet` 컴포넌트가 닫힐지 여부를 설정해요.                                                                                                                                                                                                                                                                                                               |
| **onEntered**                | `-`      | `() => void``BottomSheet` 컴포넌트가 열린 후 실행될 콜백 함수에요.  |
| **onExited**                 | `-`      | `() => void``BottomSheet` 컴포넌트가 닫힌 후 실행될 콜백 함수에요.  |
| **topAccessory**             | `-`      | `React.ReactNode``BottomSheet` 컴포넌트 상단에 표시될 요소에요.     |
| **bottomAccessory**          | `-`      | `React.ReactNode``BottomSheet` 컴포넌트 하단에 표시될 요소에요.     |
| **button**                   | `'확인'` | `string                                                             | React.ReactElement<any, string                                                                                                                                                                                                                                                                                                                                                          | React.JSXElementConstructor<any>>``BottomSheet` 컴포넌트의 버튼이에요. 버튼의 텍스트나 커스텀 버튼을 설정할 수 있어요. |
| **closeOnButtonClick**       | `true`   | `false`                                                             | `true`버튼을 클릭할 때 `BottomSheet` 컴포넌트가 닫힐지 여부를 설정해요.                                                                                                                                                                                                                                                                                                                 |
| **UNSAFE_disableFocusLock**  | `-`      | `false`                                                             | `true``BottomSheet` 컴포넌트가 열렸을 때 `BottomSheet` 컴포넌트 외부 영역에서: - 키보드 포커스가 `BottomSheet` 컴포넌트 내부로 제한되지 않도록 하고 - 스크린 리더가 `BottomSheet` 컴포넌트 외부 콘텐츠를 읽을 수 있도록 해요. 이 속성을 사용하면 접근성이 제한될 수 있으므로 불가피한 경우에만 사용해주세요.                                                                            |
| **UNSAFE_ignoreDimmerClick** | `-`      | `false`                                                             | `true``BottomSheet` 컴포넌트 외부의 어두운 배경을 클릭해도 onClose가 호출되지 않게 해요. **주의: `BottomSheet` 컴포넌트 외부 영역 클릭 시 사용자의 액션을 취소하고 `BottomSheet` 컴포넌트가 닫히는 것이 권장되는 동작이에요.**                                                                                                                                                          |
| **UNSAFE_ignoreBackEvent**   | `-`      | `false`                                                             | `true`앱에서 제공하는 뒤로가기 이벤트를 무시할지 설정해요. true로 설정하면 뒤로가기 동작이 발생해도 `BottomSheet` 컴포넌트가 닫히지 않아요. **주의: 뒤로가기 동작 발생 시 사용자의 액션을 취소하고 `BottomSheet` 컴포넌트가 닫히는 것이 권장되는 동작이에요.** 추후 이 api가 deprecated 될 수 있으므로, 취소 액션을 구현하는 것이 기술적으로 어려운 상황에서만 이 속성을 사용해 주세요. |

#### AsyncOneButtonOptions

| 속성                         | 기본값      | 타입                                                                |
| ---------------------------- | ----------- | ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **children\***               | `-`         | `React.ReactNode``BottomSheet` 컴포넌트의 내용이에요.               |
| **header**                   | `-`         | `React.ReactNode``BottomSheet` 컴포넌트의 헤더에 표시될 제목이에요. |
| **closeOnDimmerClick**       | `true`      | `false`                                                             | `true`배경을 클릭했을 때 `BottomSheet` 컴포넌트가 닫힐지 여부를 설정해요.                                                                                                                                                                                                                                                                                                               |
| **onEntered**                | `-`         | `() => void``BottomSheet` 컴포넌트가 열린 후 실행될 콜백 함수에요.  |
| **onExited**                 | `-`         | `() => void``BottomSheet` 컴포넌트가 닫힌 후 실행될 콜백 함수에요.  |
| **topAccessory**             | `-`         | `React.ReactNode``BottomSheet` 컴포넌트 상단에 표시될 요소에요.     |
| **bottomAccessory**          | `-`         | `React.ReactNode``BottomSheet` 컴포넌트 하단에 표시될 요소에요.     |
| **button**                   | `'확인'`    | `string                                                             | React.ReactElement<any, string                                                                                                                                                                                                                                                                                                                                                          | React.JSXElementConstructor<any>>``BottomSheet` 컴포넌트의 버튼이에요. 버튼의 텍스트나 커스텀 버튼을 설정할 수 있어요. |
| **onClick**                  | `-`         | `() => Promise<void>`버튼을 클릭할 때 실행될 비동기 함수에요.       |
| **loadingPropName**          | `'loading'` | `string`버튼의 로딩 상태를 나타내는 prop의 이름이에요.              |
| **UNSAFE_disableFocusLock**  | `-`         | `false`                                                             | `true``BottomSheet` 컴포넌트가 열렸을 때 `BottomSheet` 컴포넌트 외부 영역에서: - 키보드 포커스가 `BottomSheet` 컴포넌트 내부로 제한되지 않도록 하고 - 스크린 리더가 `BottomSheet` 컴포넌트 외부 콘텐츠를 읽을 수 있도록 해요. 이 속성을 사용하면 접근성이 제한될 수 있으므로 불가피한 경우에만 사용해주세요.                                                                            |
| **UNSAFE_ignoreDimmerClick** | `-`         | `false`                                                             | `true``BottomSheet` 컴포넌트 외부의 어두운 배경을 클릭해도 onClose가 호출되지 않게 해요. **주의: `BottomSheet` 컴포넌트 외부 영역 클릭 시 사용자의 액션을 취소하고 `BottomSheet` 컴포넌트가 닫히는 것이 권장되는 동작이에요.**                                                                                                                                                          |
| **UNSAFE_ignoreBackEvent**   | `-`         | `false`                                                             | `true`앱에서 제공하는 뒤로가기 이벤트를 무시할지 설정해요. true로 설정하면 뒤로가기 동작이 발생해도 `BottomSheet` 컴포넌트가 닫히지 않아요. **주의: 뒤로가기 동작 발생 시 사용자의 액션을 취소하고 `BottomSheet` 컴포넌트가 닫히는 것이 권장되는 동작이에요.** 추후 이 api가 deprecated 될 수 있으므로, 취소 액션을 구현하는 것이 기술적으로 어려운 상황에서만 이 속성을 사용해 주세요. |

#### TwoButtonOptions

| 속성                         | 기본값   | 타입                                                                |
| ---------------------------- | -------- | ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| **children\***               | `-`      | `React.ReactNode``BottomSheet` 컴포넌트의 내용이에요.               |
| **header**                   | `-`      | `React.ReactNode``BottomSheet` 컴포넌트의 헤더에 표시될 제목이에요. |
| **closeOnDimmerClick**       | `true`   | `false`                                                             | `true`배경을 클릭했을 때 `BottomSheet` 컴포넌트가 닫힐지 여부를 설정해요.                                                                                                                                                                                                                                                                                                               |
| **onEntered**                | `-`      | `() => void``BottomSheet` 컴포넌트가 열린 후 실행될 콜백 함수에요.  |
| **onExited**                 | `-`      | `() => void``BottomSheet` 컴포넌트가 닫힌 후 실행될 콜백 함수에요.  |
| **topAccessory**             | `-`      | `React.ReactNode``BottomSheet` 컴포넌트 상단에 표시될 요소에요.     |
| **bottomAccessory**          | `-`      | `React.ReactNode``BottomSheet` 컴포넌트 하단에 표시될 요소에요.     |
| **leftButton**               | `'취소'` | `string                                                             | React.ReactElement<any, string                                                                                                                                                                                                                                                                                                                                                          | React.JSXElementConstructor<any>>``BottomSheet` 컴포넌트의 왼쪽 버튼이에요. 버튼의 텍스트나 커스텀 버튼을 설정할 수 있어요. |
| **closeOnLeftButtonClick**   | `true`   | `false`                                                             | `true`왼쪽 버튼을 클릭할 때 `BottomSheet` 컴포넌트가 닫힐지 여부를 설정해요.                                                                                                                                                                                                                                                                                                            |
| **rightButton**              | `'확인'` | `string                                                             | React.ReactElement<any, string                                                                                                                                                                                                                                                                                                                                                          | React.JSXElementConstructor<any>>`오른쪽 버튼이에요. 버튼의 텍스트나 커스텀 버튼을 설정할 수 있어요.                        |
| **closeOnRightButtonClick**  | `true`   | `false`                                                             | `true`오른쪽 버튼을 클릭할 때 `BottomSheet` 컴포넌트가 닫힐지 여부를 설정해요.                                                                                                                                                                                                                                                                                                          |
| **UNSAFE_disableFocusLock**  | `-`      | `false`                                                             | `true``BottomSheet` 컴포넌트가 열렸을 때 `BottomSheet` 컴포넌트 외부 영역에서: - 키보드 포커스가 `BottomSheet` 컴포넌트 내부로 제한되지 않도록 하고 - 스크린 리더가 `BottomSheet` 컴포넌트 외부 콘텐츠를 읽을 수 있도록 해요. 이 속성을 사용하면 접근성이 제한될 수 있으므로 불가피한 경우에만 사용해주세요.                                                                            |
| **UNSAFE_ignoreDimmerClick** | `-`      | `false`                                                             | `true``BottomSheet` 컴포넌트 외부의 어두운 배경을 클릭해도 onClose가 호출되지 않게 해요. **주의: `BottomSheet` 컴포넌트 외부 영역 클릭 시 사용자의 액션을 취소하고 `BottomSheet` 컴포넌트가 닫히는 것이 권장되는 동작이에요.**                                                                                                                                                          |
| **UNSAFE_ignoreBackEvent**   | `-`      | `false`                                                             | `true`앱에서 제공하는 뒤로가기 이벤트를 무시할지 설정해요. true로 설정하면 뒤로가기 동작이 발생해도 `BottomSheet` 컴포넌트가 닫히지 않아요. **주의: 뒤로가기 동작 발생 시 사용자의 액션을 취소하고 `BottomSheet` 컴포넌트가 닫히는 것이 권장되는 동작이에요.** 추후 이 api가 deprecated 될 수 있으므로, 취소 액션을 구현하는 것이 기술적으로 어려운 상황에서만 이 속성을 사용해 주세요. |

#### AsyncTwoButtonOptions

| 속성                           | 기본값      | 타입                                                                 |
| ------------------------------ | ----------- | -------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| **children\***                 | `-`         | `React.ReactNode``BottomSheet` 컴포넌트의 내용이에요.                |
| **header**                     | `-`         | `React.ReactNode``BottomSheet` 컴포넌트의 헤더에 표시될 제목이에요.  |
| **closeOnDimmerClick**         | `true`      | `false`                                                              | `true`배경을 클릭했을 때 `BottomSheet` 컴포넌트가 닫힐지 여부를 설정해요.                                                                                                                                                                                                                                                                                                               |
| **onEntered**                  | `-`         | `() => void``BottomSheet` 컴포넌트가 열린 후 실행될 콜백 함수에요.   |
| **onExited**                   | `-`         | `() => void``BottomSheet` 컴포넌트가 닫힌 후 실행될 콜백 함수에요.   |
| **topAccessory**               | `-`         | `React.ReactNode``BottomSheet` 컴포넌트 상단에 표시될 요소에요.      |
| **bottomAccessory**            | `-`         | `React.ReactNode``BottomSheet` 컴포넌트 하단에 표시될 요소에요.      |
| **leftButton**                 | `'취소'`    | `string                                                              | React.ReactElement<any, string                                                                                                                                                                                                                                                                                                                                                          | React.JSXElementConstructor<any>>``BottomSheet` 컴포넌트의 왼쪽 버튼이에요. 버튼의 텍스트나 커스텀 버튼을 설정할 수 있어요.   |
| **onLeftButtonClick**          | `-`         | `() => Promise<void>`왼쪽 버튼을 클릭할 때 실행될 비동기 함수에요.   |
| **leftButtonLoadingPropName**  | `'loading'` | `string`왼쪽 버튼의 로딩 상태를 나타내는 prop의 이름이에요.          |
| **rightButton**                | `'확인'`    | `string                                                              | React.ReactElement<any, string                                                                                                                                                                                                                                                                                                                                                          | React.JSXElementConstructor<any>>``BottomSheet` 컴포넌트의 오른쪽 버튼이에요. 버튼의 텍스트나 커스텀 버튼을 설정할 수 있어요. |
| **onRightButtonClick**         | `-`         | `() => Promise<void>`오른쪽 버튼을 클릭할 때 실행될 비동기 함수에요. |
| **rightButtonLoadingPropName** | `'loading'` | `string`오른쪽 버튼의 로딩 상태를 나타내는 prop의 이름이에요.        |
| **UNSAFE_disableFocusLock**    | `-`         | `false`                                                              | `true``BottomSheet` 컴포넌트가 열렸을 때 `BottomSheet` 컴포넌트 외부 영역에서: - 키보드 포커스가 `BottomSheet` 컴포넌트 내부로 제한되지 않도록 하고 - 스크린 리더가 `BottomSheet` 컴포넌트 외부 콘텐츠를 읽을 수 있도록 해요. 이 속성을 사용하면 접근성이 제한될 수 있으므로 불가피한 경우에만 사용해주세요.                                                                            |
| **UNSAFE_ignoreDimmerClick**   | `-`         | `false`                                                              | `true``BottomSheet` 컴포넌트 외부의 어두운 배경을 클릭해도 onClose가 호출되지 않게 해요. **주의: `BottomSheet` 컴포넌트 외부 영역 클릭 시 사용자의 액션을 취소하고 `BottomSheet` 컴포넌트가 닫히는 것이 권장되는 동작이에요.**                                                                                                                                                          |
| **UNSAFE_ignoreBackEvent**     | `-`         | `false`                                                              | `true`앱에서 제공하는 뒤로가기 이벤트를 무시할지 설정해요. true로 설정하면 뒤로가기 동작이 발생해도 `BottomSheet` 컴포넌트가 닫히지 않아요. **주의: 뒤로가기 동작 발생 시 사용자의 액션을 취소하고 `BottomSheet` 컴포넌트가 닫히는 것이 권장되는 동작이에요.** 추후 이 api가 deprecated 될 수 있으므로, 취소 액션을 구현하는 것이 기술적으로 어려운 상황에서만 이 속성을 사용해 주세요. |
