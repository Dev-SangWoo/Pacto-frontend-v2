# BottomCTA / 먼저 확인해주세요

출처: https://tossmini-docs.toss.im/tds-mobile/components/BottomCTA/check-first/

BottomCTABottomCTA 이해하기

### BottomCTA 이해하기

![BottomCTA thumbnail](/tds-mobile/_next/static/media/Thumbnail-BottomCTA.ae04a1dc.png)

이 문서를 읽고나면,

- `FixedBottomCTA`와 `BottomCTA`의 차이를 이해할 수 있어요.
- `BottomCTA.Single`와 `BottomCTA.Double`의 차이를 이해할 수 있어요.

### 이해하기

`BottomCTA` 컴포넌트는 사용자 인터페이스(UI)에 표시되는 호출 버튼(Call-to-Action)이에요.
주로 사용자가 특정 작업을 완료할 수 있도록 도와줄 때 사용하죠. 보통 페이지 하단에 항상 고정되어 있어서, 긴 스크롤이나 키보드 입력 시에도 손쉽게 접근할 수 있어요.

### FixedBottomCTA vs BottomCTA

`FixedBottomCTA`와 `BottomCTA`는 모두 하단에 고정되는 **호출 버튼(Call-to-Action)** 을 제공해요. 차이점은 버튼의 고정 여부에요. `FixedBottomCTA`는 `BottomCTA` 컴포넌트의 `fixed` prop을 `true`로 기본 설정한 컴포넌트에요. 따라서 항상 화면 하단에 고정된 상태로 표시돼요. 다음과 같은 형태로 정의되어 있죠.

```tsx
export const FixedBottomCTA = (props: Omit<ComponentProps<typeof BottomCTA>, "fixed">) => {
  return <BottomCTA fixed={true} {...props} />;
};
```

💡

`FixedBottomCTA`는 기본적으로 CTA가 하나인 `BottomCTA.Single`에요. 만약 CTA가 두 개인 `Double`를 사용하고 싶다면 `FixedBottomCTA.Double`를 사용하세요.

이 문서에서는 BottomCTA 만을 예시로 설명해요.

### Single vs Double

다음은 `BottomCTA.Single`와 `BottomCTA.Double`의 차이를 비교한 표에요.

| type   | 예시 | 설명                                                                                                        | 문서                                                                                |
| ------ | ---- | ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Single |      | 버튼이 하나만 렌더링되는 형태에요. children을 통해 버튼에 렌더링될 요소를 결정해요.                         | Single 문서 (https://tossmini-docs.toss.im/tds-mobile/components/BottomCTA/Single/) |
| Double |      | 버튼이 두 개가 렌더링되는 형태에요. leftButton, rightButton prop을 통해 각 버튼에 렌더링될 요소를 결정해요. | Double 문서 (https://tossmini-docs.toss.im/tds-mobile/components/BottomCTA/Double/) |
