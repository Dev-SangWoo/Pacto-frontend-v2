# Bottom Info

출처: https://tossmini-docs.toss.im/tds-mobile/components/bottom-info/

Bottom Info

### Bottom Info

`BottomInfo` 컴포넌트는 화면 하단에 중요한 정보나 주의사항을 명확하게 표시할 때 사용해요. 특히 금융 상품처럼 법적 고지나 디스클레이머(면책 조항)를 사용자에게 안내해야 하는 상황에서 유용해요. 주로 리스트 형식을 제공할 수 있는 `Post` 컴포넌트와 함께 사용해 정보를 깔끔하게 정리해 보여줄 수 있어요.

-

대출기간 40년의 경우 만39세 (만 나이를 사용해주세요!) 이하 또는 신혼부부(혼인신고후 7년이내) 대상으로 한 상품입니다.

-

회사 및 대출모집인은 해당상품에 대해 충분히 설명할 의무가 있으며, 고객님께서는 이에 대한 충분한 설명을 받으시길 바랍니다.

-

대출금 중도상환시 중도상환수수료 부과기간 잔여일수에 대해 중도상환수수료가 발생할 수 있습니다.

### 사용 예제

### 그라디언트

`BottomInfo` 컴포넌트의 하단 그라디언트를 변경하려면 `bottomGradient` 속성을 사용하세요. `bottomGradient` 속성을 추가하면 화면 최하단 스크롤시 배경색과 바텀인포의 색이 달라 일관성이 떨어지는 문제를 해결할 수 있어요.

#### 그라디언트 조정하기

`bottomGradient` 기본값은 `linear-gradient(adaptive.greyBackground, rgba(255,255,255,0))`이고, 원하는 값으로 변경할 수 있어요.

Editable Example

```tsx
<div style={{ width: "100%", maxWidth: 375, margin: "auto" }}>
  <BottomInfo bottomGradient={`linear-gradient(${adaptive.greyBackground}, ${adaptive.blue100})`}>
    <Post.Ul paddingBottom={24} typography="t7">
      <Post.Li>
        대출기간 40년의 경우 만39세 (만 나이를 사용해주세요!) 이하 또는 신혼부부(혼인신고후 7년이내)
        대상으로 한 상품입니다.
      </Post.Li>
      <Post.Li>
        회사 및 대출모집인은 해당상품에 대해 충분히 설명할 의무가 있으며, 고객님께서는 이에 대한
        충분한 설명을 받으시길 바랍니다.
      </Post.Li>
      <Post.Li>
        대출금 중도상환시 중도상환수수료 부과기간 잔여일수에 대해 중도상환수수료가 발생할 수
        있습니다.
      </Post.Li>
    </Post.Ul>
  </BottomInfo>
</div>
```

#### 그라디언트 없애기

`bottomGradient` 속성을 `none`으로 그라디언트를 없앨 수 있어요. `none`을 사용하면 iOS 기기에서 기본 배경색과 어울리지 않을 수 있어서, 특별한 경우가 아니라면 사용을 권장하지 않아요

Editable Example

```tsx
<div style={{ width: "100%", maxWidth: 375, margin: "auto" }}>
  <BottomInfo bottomGradient="none">
    <Post.Ul paddingBottom={24} typography="t7">
      <Post.Li>
        대출기간 40년의 경우 만39세 (만 나이를 사용해주세요!) 이하 또는 신혼부부(혼인신고후 7년이내)
        대상으로 한 상품입니다.
      </Post.Li>
      <Post.Li>
        회사 및 대출모집인은 해당상품에 대해 충분히 설명할 의무가 있으며, 고객님께서는 이에 대한
        충분한 설명을 받으시길 바랍니다.
      </Post.Li>
      <Post.Li>
        대출금 중도상환시 중도상환수수료 부과기간 잔여일수에 대해 중도상환수수료가 발생할 수
        있습니다.
      </Post.Li>
    </Post.Ul>
  </BottomInfo>
</div>
```

### 인터페이스

#### BottomInfoProps

| 속성               | 기본값                                                            | 타입     |
| ------------------ | ----------------------------------------------------------------- | -------- | ------------------------------------------------------------------------------ |
| **bottomGradient** | `"linear-gradient(adaptive.greyBackground, rgba(255,255,255,0))"` | `"none"` | `"linear-gradient(${string})"`하단 그라데이션의 배경색과 존재 유무를 설정해요. |
