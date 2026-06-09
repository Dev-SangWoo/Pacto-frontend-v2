# Keypad / Full Secure Keypad

출처: https://tossmini-docs.toss.im/tds-mobile/components/Keypad/full-secure-keypad/

KeypadFull Secure Keypad

### Full Secure Keypad

`FullSecureKeypad` 컴포넌트는 숫자와 알파벳을 함께 표시하는 보안 키패드예요. 숫자와 문자를 모두 입력할 수 있으며, 비밀번호나 인증번호 입력처럼 보안이 중요할 때 사용해요. 키패드의 각 키 사이에 랜덤으로 공백이 배치되어 있어, 입력 패턴을 쉽게 추측할 수 없도록 설계되었어요. 사용자가 입력을 마치면 제출할 수 있는 버튼도 함께 제공해요.

-
-
-
-
-
-
-
-
-
-

-
-
-
-
-
-
-
-
-
-

-
-
-
-
-
-
-
-
-

-
-
-
-
-
-
-
-

-
-
-
-

### 사용법

### 키패드 공백 위치 무작위로 바꾸기

`FullSecureKeypad`의 공백 위치를 무작위로 변경하려면 `FullSecureKeypadRef` 타입의 `ref`를 전달하세요. `ref.current.reorderEmptyCells` 함수를 호출하면 키패드의 공백 위치를 무작위로 바꿀 수 있어요.

Editable Example

```tsx
function RandomBlanks() {
  const [_, setState] = React.useState(false);
  const ref = React.useRef({
    reorderEmptyCells: () => {},
    element: null,
  });

  return (
    <FullSecureKeypad
      ref={ref}
      onKeyClick={() => {}}
      onBackspaceClick={() => {}}
      onSpaceClick={() => {}}
      onSubmit={() => {
        if (ref.current) {
          ref.current.reorderEmptyCells();
          setState((prev) => !prev); // 의도적으로 리렌더링을 트리거합니다.
        }
      }}
      submitButtonText="공백 옮기기"
    />
  );
}
```

### 인터페이스

#### FullSecureKeypadProps

| 속성                   | 기본값        | 타입                                                                                                                                                                                                                                                                                  |
| ---------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| **onKeyClick\***       | `-`           | `(value: string) => void``FullSecureKeypad` 컴포넌트의 숫자 또는 알파벳 키를 클릭하면 실행되는 함수예요.                                                                                                                                                                              |
| **onBackspaceClick\*** | `-`           | `() => void``FullSecureKeypad` 컴포넌트에서 `backspace` 키를 클릭하면 실행되는 함수예요. 기본적으로 마지막 입력 값을 삭제하는 데 사용되지만, 이 함수에 원하는 동작을 추가해 다양한 상황에 맞게 활용할 수 있어요. 예를 들어, 삭제 전에 확인 메시지를 표시하는 동작을 구현할 수 있어요. |
| **onSpaceClick\***     | `-`           | `() => void``FullSecureKeypad` 컴포넌트의 `space` 키를 클릭하면 실행되는 함수예요.                                                                                                                                                                                                    |
| **onSubmit\***         | `-`           | `() => void``FullSecureKeypad` 컴포넌트의 입력 완료 키를 클릭하면 실행되는 함수예요.                                                                                                                                                                                                  |
| **submitDisabled**     | `false`       | `false`                                                                                                                                                                                                                                                                               | `true`이 값이 `true`일 때 입력 완료 키가 비활성화돼요. |
| **submitButtonText**   | `'입력 완료'` | `string`입력을 완료한 후 제출할 때 클릭하는 키 버튼에 표시할 텍스트예요.                                                                                                                                                                                                              |

#### FullSecureKeypadRef

| 속성                    | 기본값 | 타입                                                                                                         |
| ----------------------- | ------ | ------------------------------------------------------------------------------------------------------------ |
| **reorderEmptyCells\*** | `-`    | `() => void`키패드의 공백 위치를 무작위로 재배치하는 함수예요. 보안을 강화하기 위해 사용해요.                |
| **element\***           | `-`    | `HTMLDivElement``FullSecureKeypad` 컴포넌트의 DOM 요소에 대한 참조예요. DOM에 ref를 할당해야 할 때 사용해요. |
