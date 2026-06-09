# BottomCTA / Single

출처: https://tossmini-docs.toss.im/tds-mobile/components/BottomCTA/Single/

BottomCTASingle

### BottomCTA.Single

`BottomCTA.Single`는 이 BottomCTA의 구성 요소 중 하나로, 버튼을 **하나만** 렌더링하는 간단한 형태에요.

### 사용법

### 배경색 없애기

`BottomCTA.Single` 컴포넌트는 기본적으로 배경색이 있어요. 배경색을 없애려면 `background` prop을 `none`으로 설정하세요.

### SafeArea의 영향 받지 않기

`hasSafeAreaPadding` prop을 `true`로 설정하면, 기기 화면 하단에 있는 SafeArea의 높이만큼 `paddingBottom`이 추가되어 버튼이 안전하게 표시돼요. 이때 웹뷰에서 user-agent로 전달된 SafeArea 정보를 `--toss-safe-area-bottom` 변수에 반영해 사용해요.

아래 코드와 같이 변수가 선언돼요. 이때 웹뷰로부터 전달받아 파싱된 값이 `--toss-safe-area-bottom` 이에요. 이때 웹뷰로부터 전달받아 파싱된 값이 `--toss-safe-area-bottom` 이에요.

```tsx
<style>
  --bottom-cta-padding-bottom: max(var(--toss-safe-area-bottom, 0px), env(safe-area-inset-bottom),
  20px);
</style>
```

### 최상단 요소 스타일 변경하기

`containerStyle` prop을 통해 최상단 요소의 스타일을 변경할 수 있어요.

⚠️모바일 키패드 사용시에는 opacity 혹은 bottom 값을 변경하는 것을 지양해야 해요.

### 상단/하단 요소 추가하기

`topAccessory` 와 `bottomAccessory` prop을 사용하면 상단과 하단에 요소를 추가할 수 있어요.

Editable Example

```tsx
<BottomCTA.Single
  topAccessory={<div>topAccessory</div>}
  bottomAccessory={<div>bottomAccessory</div>}
>
  여기는 설명이 들어갑니다
</BottomCTA.Single>
```

### 키보드 위에 고정하기

`fixedAboveKeyboard` prop을 `true`로 설정하면, 키보드가 활성화된 상태에서도 버튼이 키보드 위에 고정돼요. 이 설정을 통해 사용자가 키보드를 통해 입력하는 상황에서도 CTA 버튼을 쉽게 누를 수 있어요.

⚠️이 기능은 `BottomCTA.Double`에서는 사용할 수 없어요.

### 애니메이션 설정하기

`showAfterDelay` prop을 사용하면 지정한 시간만큼 지연된 후에 버튼이 애니메이션과 함께 나타나도록 할 수 있어요.

Editable Example

```tsx
function ShowAfterDelay() {
  const [animation, setAnimation] = React.useState<"fade" | "scale" | "slide">("fade");

  return (
    <>
      <SegmentedControl value={animation} onChange={setAnimation as (v: string) => void}>
        <SegmentedControl.Item value="fade">fade</SegmentedControl.Item>
        <SegmentedControl.Item value="scale">scale</SegmentedControl.Item>
        <SegmentedControl.Item value="slide">slide</SegmentedControl.Item>
      </SegmentedControl>
      <BottomCTA.Single showAfterDelay={{ animation, delay: 1 }}>
        여기는 설명이 들어갑니다
      </BottomCTA.Single>
    </>
  );
}
```

### 스크롤에 따라 숨김 처리하기

`hideOnScroll` prop을 `true`로 설정하면, 사용자가 페이지를 스크롤할 때 버튼이 자동으로 숨겨져요. 이때 `hideOnScrollDistanceThreshold` prop을 사용해 버튼이 숨겨지는 스크롤 지점을 설정할 수 있어요.

### 인터페이스

#### TypeAProps

| 속성                              | 기본값      | 타입                                                                                                                                                                          |
| --------------------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| **children\***                    | `-`         | `React.ReactNode`버튼 내부에 렌더링되는 컨텐츠에요.                                                                                                                           |
| **showAfterDelay**                | `-`         | `{ animation: "slide"                                                                                                                                                         | "fade"                                                                                                                                                                                                                                                                              | "scale"; delay: number; }`초기 등장 애니메이션을 정의해요. |
| **show**                          | `false`     | `false`                                                                                                                                                                       | `true`CTA가 숨거나 등장할 때 애니메이션을 적용해요. 초기 등장 애니메이션이 아니에요.                                                                                                                                                                                                |
| **hideOnScroll**                  | `false`     | `false`                                                                                                                                                                       | `true`스크롤에 따라 CTA를 숨길지 결정해요. true로 설정하면 CTA가 아래로 스크롤될 때 숨고, 위로 스크롤될 때 나타나요.                                                                                                                                                                |
| **hideOnScrollDistanceThreshold** | `1`         | `number`hideOnScroll이 true일 때 넘겨준 값만큼 스크롤이 이동해야 발생해요. 이 때 단위는 px이에요.                                                                             |
| **hasSafeAreaPadding**            | `true`      | `false`                                                                                                                                                                       | `true`하단 `safeArea`만큼의 `paddingBottom`을 갖게 할지를 결정해요. `hasPaddingBottom`이 `false`라면, `hasSafeAreaPadding` 값에 관계없이 `paddingBottom`이 0px로 고정돼요. `hasPaddingBottom`이 `true`이고 `hasSafeAreaPadding`이 `false`라면 `paddingBottom`은 20px로 설정돼요.    |
| **hasPaddingBottom**              | `true`      | `false`                                                                                                                                                                       | `true`false 로 설정하게 될 경우 CTA의 paddingBottom 을 0으로 설정해요.                                                                                                                                                                                                              |
| **takeSpace**                     | `-`         | `false`                                                                                                                                                                       | `true``takeSpace`는 컴포넌트가 화면에 고정된 상태에서 레이아웃 공간을 차지할지를 결정해요. `true`라면 `FixedBottomCTA`와 유사하게 고정된 상태에서 공간을 차지하고, `false`라면 화면 하단에 고정되지만 레이아웃에 영향을 미치지 않아요. `fixed`가 `true`일 때는 기본값이 `true`에요. |
| **fixed**                         | `-`         | `false`                                                                                                                                                                       | `true`화면 최하단에 고정시킬지 결정해요. BottomCTA 에서 fixed 를 주면, FixedBottomCTA 를 사용하는 것과 동일해요.                                                                                                                                                                    |
| **containerStyle**                | `-`         | `React.CSSProperties`모바일 키보드가 표시될 때 사용을 권장하지 않는 스타일을 설정하는 객체에요. 모바일 키보드가 있다면 `opacity`와 `bottom` 속성 사용을 피하는 것을 권장해요. |
| **containerRef**                  | `-`         | `React.Ref<HTMLDivElement>`컨테이너 요소에 대한 ref에요.                                                                                                                      |
| **background**                    | `'default'` | `"default"`                                                                                                                                                                   | `"none"``none`으로 주면 gradient와 배경색이 없어져요.                                                                                                                                                                                                                               |
| **topAccessory**                  | `-`         | `React.ReactNode`CTA 위에 렌더링되는 악세서리 요소에요.                                                                                                                       |
| **bottomAccessory**               | `-`         | `React.ReactNode`CTA 아래에 렌더링되는 악세서리 요소에요.                                                                                                                     |
| **fixedAboveKeyboard**            | `-`         | `false`                                                                                                                                                                       | `true`BottomSheet.CTA 버튼이 키보드 위에 고정되어야 할 때 사용해요.                                                                                                                                                                                                                 |
