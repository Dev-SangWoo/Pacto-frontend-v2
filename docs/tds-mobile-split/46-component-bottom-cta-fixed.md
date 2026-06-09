# BottomCTA / Fixed Bottom CTA

출처: https://tossmini-docs.toss.im/tds-mobile/components/BottomCTA/fixed-bottom-cta/

BottomCTAFixedBottomCTA

### FixedBottomCTA

`FixedBottomCTA` 컴포넌트는 화면 하단에 고정된 CTA버튼을 표현할 때 사용해요.

### 사용 예제

### Double

TypeB는 버튼이 두 개가 렌더링되는 형태에요.

Editable Example

```tsx
<FixedBottomCTA.Double
  leftButton={
    <CTAButton color="dark" variant="weak">
      취소
    </CTAButton>
  }
  rightButton={<CTAButton>확인</CTAButton>}
/>
```

### 스크롤 애니메이션

`hideOnScroll` 속성을 추가하면 스크롤 시 버튼이 자동으로 숨겨지거나 나타나는 애니메이션이 적용돼요. 사용자가 아래로 스크롤할 때 버튼이 사라지고, 위로 스크롤할 때 다시 나타나요.

Editable Example

```tsx
<FixedBottomCTA.Double
  hideOnScroll
  leftButton={
    <CTAButton color="dark" variant="weak">
      취소
    </CTAButton>
  }
  rightButton={<CTAButton>확인</CTAButton>}
/>
```
