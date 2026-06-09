# 유틸리티 / Overlay Extension / useToast

출처: https://tossmini-docs.toss.im/tds-mobile/hooks/OverlayExtension/use-toast/

Overlay ExtensionuseToast

### useToast

`useToast`는 간단하고 일시적인 알림 메시지를 화면에 표시할 수 있게 해주는 유틸리티 훅이에요. 사용자에게 피드백을 제공하거나 이벤트를 알릴 때 유용하게 사용할 수 있어요.

### 동작 방식

#### 웹 환경

- 기본적으로 토스트 메시지는 자동으로 사라져요.

- 버튼이 없을 때: 3000ms 후에 사라져요.
- 버튼이 있을 때: 5000ms 후에 사라져요.

- `duration` 속성을 사용해 표시 시간을 원하는 대로 설정할 수 있어요.
- `closeToast` 메서드를 통해 수동으로 닫을 수도 있어요.

#### 앱 환경

- Android와 iOS에서 기본 위치가 다르게 설정돼요.

- Android: 화면 기준 상단 26px 떨어진 곳에 위치해요.
- iOS: 화면 기준 상단 46px 떨어진 곳에 위치해요.

- `SafeArea`와 `BottomCTA` 컴포넌트의 높이를 자동으로 고려해요.
- 수동으로 닫는 메서드는 제공되지 않고, 앱브릿지가 있는 환경에서 사용돼요.

### 사용 예시

### 기본 토스트 메시지 표시하기

가장 단순한 토스트 메시지를 표시하는 예시예요. `message` 속성을 통해 표시할 내용을 설정하고, `openToast` 메서드를 호출해요.

Editable Example

```tsx
function Basic() {
  const toast = useToast();

  return (
    <Button
      onClick={() => {
        toast.openToast("메시지를 전송했어요");
      }}
    >
      기본 토스트 열기
    </Button>
  );
}
```

### 아이콘과 함께 사용하기

`icon` 속성을 사용하여 토스트 메시지에 원하는 아이콘을 자유롭게 사용할 수 있으며, 이를 통해 더 명확한 시각적 피드백을 제공할 수 있어요.

Editable Example

```tsx
function IconToast() {
  const toast = useToast();

  return (
    <Button
      onClick={() => {
        toast.openToast("프로필을 업데이트했어요", {
          icon: "icon-check",
          iconType: "circle",
        });
      }}
    >
      아이콘 토스트 열기
    </Button>
  );
}
```

### 버튼과 함께 사용하기

`button` 속성을 사용해서 토스트 메시지에 버튼을 추가할 수 있어요. 버튼이 있을 때 웹 환경에서는 기본적으로 5초 동안 표시되고, `onClick` 속성으로 버튼을 클릭할 때의 동작을 정의할 수 있어요.

Editable Example

```tsx
function ButtonToast() {
  const toast = useToast();

  return (
    <Button
      onClick={() => {
        toast.openToast("결제에 실패했어요", {
          icon: "icon-warning-circle",
          button: {
            text: "다시 시도하기",
            onClick: () => alert("결제 재시도"),
          },
        });
      }}
    >
      버튼 토스트 열기
    </Button>
  );
}
```

### 위치 조정하기

`type` 속성을 사용하여 토스트 메시지의 위치를 'top' 또는 'bottom'으로 설정할 수 있어요. 앱 환경에서는 OS별로 최적화된 기본 위치값이 적용되며, `SafeArea`와 `BottomCTA`의 높이가 자동으로 고려돼요.

Editable Example

```tsx
function PositionToast() {
  const toast = useToast();

  return (
    <Button
      onClick={() => {
        toast.openToast("새로운 알림이 있어요", {
          type: "top",
          gap: 30,
        });
      }}
    >
      상단 토스트 열기
    </Button>
  );
}
```

### 애니메이션 타이밍 조절하기

`duration` 속성을 사용하여 토스트 메시지가 표시되는 시간을 밀리초 단위로 조절할 수 있어요. 이 속성은 웹 환경에서만 사용할 수 있어요. 앱 환경에서는 기본값인 3000ms로 고정돼요.

Editable Example

```tsx
function AnimationTimingToast() {
  const toast = useToast();

  return (
    <Button
      onClick={() => {
        toast.openToast("메시지예요", {
          duration: 1000,
        });
      }}
    >
      애니메이션 타이밍을 조절한 토스트 열기
    </Button>
  );
}
```

### 인터페이스

#### ToastButton

| 속성          | 기본값 | 타입                                                             |
| ------------- | ------ | ---------------------------------------------------------------- |
| **text\***    | `-`    | `string``Toast` 컴포넌트의 버튼에 표시될 텍스트에요.             |
| **onClick\*** | `-`    | `() => void``Toast` 컴포넌트의 버튼을 클릭할 때 실행될 함수에요. |

#### OpenToastOptions

| 속성              | 기본값      | 타입                                                                                                                          |
| ----------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| **type**          | `'bottom'`  | `"top"`                                                                                                                       | `"bottom"``Toast` 컴포넌트의 토스트 메시지의 위치를 설정해요.             |
| **gap**           | `-`         | `number``Toast` 컴포넌트가 표시될 때 상/하단에서 떨어질 간격을 설정해요. 다른 값들보다 우선적으로 적용돼요.                   |
| **icon**          | `-`         | `string``Toast` 컴포넌트에 표시될 아이콘의 이름이에요. lottie와 함께 사용할 수 없어요.                                        |
| **iconType**      | `undefined` | `"circle"`                                                                                                                    | `"square"``Toast` 컴포넌트에 표시될 아이콘의 모양을 설정해요.             |
| **lottie**        | `-`         | `string``Toast` 컴포넌트에 표시될 로티 애니메이션의 URL이에요. icon과 함께 사용할 수 없어요.                                  |
| **button**        | `-`         | `ToastButton (https://tossmini-docs.toss.im#ToastButton)``Toast` 컴포넌트에 표시될 버튼이에요.                                |
| **higherThanCTA** | `false`     | `false`                                                                                                                       | `true``BottomCTA` 컴포넌트보다 위에 `Toast` 컴포넌트를 표시할지 설정해요. |
| **duration**      | `-`         | `number``Toast` 컴포넌트가 자동으로 사라질 때까지의 시간(ms)이에요. 버튼이 있는 경우 기본값은 5000ms, 없는 경우 3000ms이에요. |
