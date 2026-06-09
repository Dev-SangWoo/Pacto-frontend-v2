# 유틸리티 / Overlay Extension / 먼저 확인해주세요

출처: https://tossmini-docs.toss.im/tds-mobile/hooks/OverlayExtension/check-first/

Overlay ExtensionOverlay Extension 이해하기

### Overlay Extension 이해하기

이 문서를 읽고나면,

- `useDialog`, `useToast`, `useBottomSheet` 훅의 차이점과 각각의 사용 목적을 이해할 수 있어요. 각 훅이 제공하는 기능과 사용 방법을 이해할 수 있어요.

### 이해하기

`OverlayExtension`은 `Dialog` 컴포넌트 (https://tossmini-docs.toss.im/tds-mobile/components/dialog/dialog/), `Toast` 컴포넌트 (https://tossmini-docs.toss.im/tds-mobile/components/toast/), `BottomSheet` 컴포넌트 (https://tossmini-docs.toss.im/tds-mobile/components/bottom-sheet/)와 같은 오버레이 UI를 선언적으로 쉽게 사용할 수 있게 해주는 유틸리티 훅들의 모음이에요.

### useDialog vs useToast vs useBottomSheet

각 훅은 서로 다른 목적과 사용 상황에 맞게 설계되어 있어요:

| 훅               | 설명                                                            | 사용 상황                                                                | 문서                                                                                                    |
| ---------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------- |
| `useDialog`      | 사용자의 주의가 필요한 중요한 정보나 결정을 요구할 때 사용해요. | - 중요한 작업 확인 - 경고 메시지 표시 - 사용자의 명시적 결정이 필요할 때 | useDialog 문서 (https://tossmini-docs.toss.im/tds-mobile/hooks/OverlayExtension/use-dialog/)            |
| `useToast`       | 일시적인 알림이나 피드백을 표시할 때 사용해요.                  | - 작업 완료 알림 - 오류 메시지 - 일시적인 상태 표시                      | useToast 문서 (https://tossmini-docs.toss.im/tds-mobile/hooks/OverlayExtension/use-toast/)              |
| `useBottomSheet` | 추가 정보나 작업을 화면 하단에서 표시할 때 사용해요.            | - 상세 정보 표시 - 추가 옵션 제공 - 복잡한 상호작용이 필요할 때          | useBottomSheet 문서 (https://tossmini-docs.toss.im/tds-mobile/hooks/OverlayExtension/use-bottom-sheet/) |
