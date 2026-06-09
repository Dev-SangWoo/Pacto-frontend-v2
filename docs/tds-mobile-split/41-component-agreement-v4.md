# Agreement / v4

출처: https://tossmini-docs.toss.im/tds-mobile/components/Agreement/v4/

AgreementV4

### AgreementV4

`AgreementV4` 컴포넌트는 사용자의 동의를 받아야 하는 화면을 간편하게 구성할 수 있도록 도와줘요. 여러 동의 항목을 쉽게 추가할 수 있고, 항목을 그룹화하거나 접고 펼치는 기능을 활용해 UI를 깔끔하게 정리할 수 있어요. 또, 체크박스, 설명글, 태그 등 다양한 구성 요소를 지원해서 동의받을 내용을 유저에게 잘 설명해 줄 수 있어요.

서비스 이용 동의

### AgreementV4 구성요소 활용법 알아보기

`AgreementV4` 컴포넌트는 동의 화면을 구성하는 데 필요한 다양한 하위 컴포넌트를 제공해요. 이 구성 요소들을 조합하면 사용자가 쉽게 이해할 수 있는 직관적이고 정리된 동의 화면을 만들 수 있어요.

### 텍스트 사용하기

`AgreementV4.Text`는 동의 항목의 설명이나 제목을 표시하는 텍스트 컴포넌트예요. `onPressEnd` 속성과 함께 사용하면 사용자 클릭을 감지하여 인터랙션을 제공해 사용자에게 명확한 피드백을 제공해요.

Editable Example

```tsx
<div>
  <AgreementV4 variant="large" middle={<AgreementV4.Text>텍스트</AgreementV4.Text>} />
  <AgreementV4
    variant="large"
    middle={
      <AgreementV4.Text onPressEnd={() => console.log("press")}>
        텍스트를 클릭해보세요.
      </AgreementV4.Text>
    }
  />
</div>
```

### 뱃지 사용하기

`AgreementV4.Badge`는 동의 항목에 시각적 강조를 추가하는 컴포넌트예요. `variant`가 `fill`일 때 배경색을 지정할 수 있어요.

Editable Example

```tsx
<div>
  <AgreementV4
    variant="large"
    middle={<AgreementV4.Text>서비스 이용 동의</AgreementV4.Text>}
    right={
      <AgreementV4.Badge variant="fill" bgColor={adaptive.yellow50} textColor={adaptive.yellow500}>
        배경 있음
      </AgreementV4.Badge>
    }
  />
  <AgreementV4
    variant="large"
    middle={<AgreementV4.Text>서비스 이용 동의</AgreementV4.Text>}
    right={
      <AgreementV4.Badge variant="clear" textColor={adaptive.blue500}>
        배경 없음
      </AgreementV4.Badge>
    }
  />
</div>
```

### 체크박스 사용하기

`AgreementV4.Checkbox`는 사용자의 선택을 받기 위한 체크박스 컴포넌트예요. `variant`가 `'checkbox'`, `'dot'`, `'hidden'`이 있어서 상황에 맞게 사용할 수 있어요. `hidden` 옵션은 체크박스를 시각적으로 숨기고 레이아웃만 유지할 때 유용해요. 체크박스는 보이지 않지만 공간은 그대로 차지해요.

Editable Example

```tsx
<div>
  <AgreementV4
    variant="large"
    left={<AgreementV4.Checkbox />}
    middle={<AgreementV4.Text>checkbox</AgreementV4.Text>}
  />
  <AgreementV4
    variant="large"
    left={<AgreementV4.Checkbox variant="dot" />}
    middle={<AgreementV4.Text>dot</AgreementV4.Text>}
  />
  <AgreementV4
    variant="large"
    left={<AgreementV4.Checkbox variant="hidden" />}
    middle={<AgreementV4.Text>hidden</AgreementV4.Text>}
  />
</div>
```

### 필수 여부 나타내기

`AgreementV4.Necessity`는 동의 항목의 필수 여부를 나타내는 컴포넌트예요. `variant`가 'optional', 'mandatory'가 있어서 상황에 따라 적용할 수 있으며, 색상이 다르게 표시돼요. 주로 `AgreementV4.Text`의 `necessity` 속성에서 사용돼요. 필수와 옵션 항목을 명확히 구분하면 사용자는 어떤 항목이 반드시 필요한지 명확히 알 수 있어, 동의 과정을 더 수월하게 진행할 수 있어요.

Editable Example

```tsx
<div>
  <AgreementV4
    variant="large"
    left={<AgreementV4.Checkbox />}
    middle={
      <AgreementV4.Text
        necessity={<AgreementV4.Necessity variant="mandatory">필수</AgreementV4.Necessity>}
      >
        서비스 이용 동의
      </AgreementV4.Text>
    }
  />
  <AgreementV4
    variant="large"
    left={<AgreementV4.Checkbox />}
    middle={
      <AgreementV4.Text
        necessity={<AgreementV4.Necessity variant="optional">선택</AgreementV4.Necessity>}
      >
        서비스 이용 동의
      </AgreementV4.Text>
    }
  />
</div>
```

### 접고 펼치기 화살표 사용하기

`AgreementV4.RightArrow`는 동의 항목을 접거나 펼치는 기능을 제공하는 화살표예요. 오른쪽에 있는 화살표로, 접기 화살표가 나와요. `collapsed` 컴포넌트에 트리거 용도로 사용돼요.

Editable Example

```tsx
<AgreementV4
  variant="large"
  middle={<AgreementV4.Text>개인정보 수집 동의</AgreementV4.Text>}
  right={<AgreementV4.RightArrow />}
/>
```

### 설명 추가하기

`AgreementV4.Description`는 동의 항목에 대한 부가 정보를 제공할 때 사용하는 컴포넌트예요. 작은 회색 글씨로 표시되며, 약관 세부 내용이나 참고 정보를 보여줄 때 적합해요. `variant` 속성을 통해 스타일을 조정할 수 있으며 이를 통해 설명의 가독성을 높이고, 시각적으로 구분할 수 있어요.

- `box`: 설명을 박스 형태로 감싸서 강조할 수 있어요. `box` 속성은 배경색과 패딩이 추가되어 설명을 시각적으로 구분하는 데 유용해요.
- `normal`: 기본 스타일로, 패딩 없이 간결하게 설명을 표시해요. `normal` 속성은 설명을 간단하게 표시하고 싶을 때 적합해요.

Editable Example

```tsx
<div>
  <AgreementV4.Description variant="box">
    수집된 개인정보는 서비스 제공 목적으로만 사용됩니다.
  </AgreementV4.Description>
  <AgreementV4.Description variant="normal">
    수집된 개인정보는 서비스 제공 목적으로만 사용됩니다.
  </AgreementV4.Description>
</div>
```

### 헤더 사용하기

`AgreementV4.Header`는 동의 항목의 제목이나 섹션을 시각적으로 구분하는 컴포넌트예요. 다양한 `variant` 옵션을 통해 크기와 스타일을 조절할 수 있어요.

Editable Example

```tsx
<div>
  <AgreementV4.Header variant="xLarge">Header</AgreementV4.Header>
  <AgreementV4.Header variant="medium" indent={1}>
    Header
  </AgreementV4.Header>
</div>
```

### 클릭 감지하기

`AgreementV4.Pressable`은 사용자의 클릭을 감지하여 인터랙션을 제공해 명확한 피드백을 제공해요. `onPressEnd`와 함께 사용해요.

Editable Example

```tsx
<AgreementV4
  variant="large"
  left={<AgreementV4.Checkbox />}
  middle={
    <AgreementV4.Pressable onPressEnd={() => console.log("press")}>
      <AgreementV4.Text
        necessity={<AgreementV4.Necessity variant="mandatory">필수</AgreementV4.Necessity>}
      >
        체크박스를 제외한 부분을 클릭해보세요.
      </AgreementV4.Text>
      <AgreementV4.Badge variant="clear" textColor={adaptive.blue500}>
        안심
      </AgreementV4.Badge>
      <AgreementV4.RightArrow />
    </AgreementV4.Pressable>
  }
/>
```

### 사용법

### 단일 동의 항목 생성하기

`AgreementV4` 컴포넌트는 단일 동의 항목을 생성하는 데 사용돼요. `left`, `middle`, `right` 속성을 통해 체크박스, 텍스트, 추가 정보 등 다양한 컴포넌트를 사용하여 원하는 구성을 구현할 수 있어요.

- `left`: 주로 선택 요소를 배치하는 공간이에요. `AgreementV4.Checkbox`와 같은 컴포넌트가 주로 사용돼요.
- `middle`: 동의 항목의 제목이나 주요 텍스트를 표시하는 공간이에요. `AgreementV4.Text` 컴포넌트가 주로 사용돼요.
- `right`: 추가 정보나 인터랙션을 위한 요소를 배치하는 공간이에요. `AgreementV4.Badge` 또는 `AgreementV4.RightArrow` 컴포넌트가 주로 사용돼요.

Editable Example

```tsx
<div>
  <AgreementV4
    variant="large"
    left={<AgreementV4.Checkbox />}
    middle={<AgreementV4.Text>서비스 이용 동의</AgreementV4.Text>}
    right={
      <AgreementV4.Badge variant="fill" bgColor={adaptive.yellow50} textColor={adaptive.yellow500}>
        안심
      </AgreementV4.Badge>
    }
  />
  <AgreementV4
    variant="large"
    left={<AgreementV4.Checkbox variant="dot" />}
    middle={<AgreementV4.Text>서비스 이용 동의</AgreementV4.Text>}
    right={<AgreementV4.RightArrow />}
  />
  <AgreementV4
    variant="large"
    left={<AgreementV4.Checkbox variant="hidden" />}
    middle={<AgreementV4.Text>서비스 이용 동의</AgreementV4.Text>}
  />
</div>
```

### 시각적 계층 구성하기

`AgreementV4.IndentPushable` 컴포넌트는 동의 항목의 시각적 계층을 명확히 할 때 유용해요. 주로 여러 단계의 동의 항목이 있을 때, 사용자가 각 항목의 관계를 명확히 이해할 수 있도록 할 때 사용돼요. 이 기능은 항목 간의 관계에 대한 이해도를 높여주어, 사용자 경험을 개선해요.

- `AgreementV4.IndentPushable`: 계층을 적용할 컴포넌트의 전체 영역을 감싸요.
- `AgreementV4.IndentPushableTrigger`: 클릭 시 내용을 들여쓰기 할 수 있는 트리거 컴포넌트예요.
- `AgreementV4.IndentPushableContent`: 트리거가 활성화되면 들여쓰기가 적용돼요.

`AgreementV4.IndentPushable` 컴포넌트는 `pushed` 속성을 통해 `AgreementV4.IndentPushableContent`의 들여쓰기를 제어할 수 있어요. `pushed`가 `true`일 경우, `IndentPushableContent`에 포함된 약관들의 들여쓰기가 1만큼 증가해요. 하지만 약관 컴포넌트가 직접 가지는 `indent` 속성의 우선순위가 더 높기 때문에, 이 점을 고려하여 사용해야 해요.

Editable Example

```tsx
<>
  <AgreementV4.IndentPushable>
    <AgreementV4.IndentPushableTrigger>
      <AgreementV4
        variant="large"
        left={<AgreementV4.Checkbox />}
        middle={
          <AgreementV4.Text>카드상품 이외의 부수 서비스 안내 등을 위한 수집, 이용</AgreementV4.Text>
        }
        right={
          <AgreementV4.Badge variant="clear" textColor={adaptive.blue500}>
            안심
          </AgreementV4.Badge>
        }
      />
    </AgreementV4.IndentPushableTrigger>
    <AgreementV4.IndentPushableContent>
      <AgreementV4
        variant="small"
        left={<AgreementV4.Checkbox variant="dot" />}
        middle={<AgreementV4.Text>고유식별정보 수집/이용</AgreementV4.Text>}
      />
      <AgreementV4
        variant="small"
        left={<AgreementV4.Checkbox variant="dot" />}
        middle={<AgreementV4.Text>개인(신용)정보 수집/이용</AgreementV4.Text>}
      />
    </AgreementV4.IndentPushableContent>
  </AgreementV4.IndentPushable>
</>
```

### 접었다 펼치는 동의 항목 구현하기

`AgreementV4.Collapsible` 컴포넌트는 긴 내용을 깔끔하게 정리하고 필요할 때만 내용을 펼쳐 볼 수 있도록 도와줘요. 약관이나 정책 설명이 길거나 동의 항목이 많아 화면이 복잡해질 우려가 있을 때 특히 유용해요. 이 기능은 기본 정보만 노출하고, 추가 내용은 사용자가 필요할 때 열람할 수 있도록 만들어 사용자 경험을 개선해요.

- `AgreementV4.Collapsible`: 컴포넌트의 상태에 따라 내용을 접거나 펼칠 수 있는 기능을 제공해요. `collapsed` 속성을 통해 현재 상태를 제어하며, `onCollapsedChange` 이벤트를 통해 상태 변화를 처리할 수 있어요.
- `AgreementV4.CollapsibleTrigger`: 클릭 시 내용을 펼치거나 접을 수 있는 트리거 컴포넌트예요.
- `AgreementV4.CollapsibleContent`: 트리거가 활성화되면 표시되는 내용을 포함해요.

Editable Example

```tsx
function Collapsed() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <AgreementV4.Collapsible
      collapsed={isOpen}
      onCollapsedChange={() => setIsOpen((prev) => !prev)}
    >
      <AgreementV4.CollapsibleTrigger>
        <AgreementV4
          variant="large"
          middle={
            <AgreementV4.Text>개인정보 수집 동의 (오른쪽 화살표를 클릭해보세요.)</AgreementV4.Text>
          }
          right={<AgreementV4.RightArrow />}
        />
      </AgreementV4.CollapsibleTrigger>
      <AgreementV4.CollapsibleContent>
        <AgreementV4
          variant="large"
          left={<AgreementV4.Checkbox />}
          middle={<AgreementV4.Text>동의해요</AgreementV4.Text>}
        />
        <AgreementV4
          variant="large"
          left={<AgreementV4.Checkbox />}
          middle={<AgreementV4.Text>동의해요</AgreementV4.Text>}
        />
      </AgreementV4.CollapsibleContent>
    </AgreementV4.Collapsible>
  );
}
```

### 여러 동의 항목 그룹화하기

`AgreementV4.Group` 컴포넌트는 여러 동의 항목을 하나의 그룹으로 묶어주는 컴포넌트예요. 이 컴포넌트는 여러 항목을 논리적으로 구분하여 사용자에게 일관된 정보를 제공하는 데 목적이 있어요. 또한, `showGradient` 속성을 통해 시각적 구분을 강화할 수 있어요. 이 속성은 기본적으로 활성화되어 있으며, 필요에 따라 비활성화하여 그라데이션 효과를 사용하지 않을 수도 있어요.

Editable Example

```tsx
<AgreementV4.Group>
  <AgreementV4
    variant="large"
    left={<AgreementV4.Checkbox variant="hidden" />}
    middle={
      <AgreementV4.Text>카드상품 이외의 부수서비스 안내 등을 위한 수집/이용</AgreementV4.Text>
    }
  />
  <AgreementV4
    variant="small"
    left={<AgreementV4.Checkbox variant="hidden" />}
    middle={<AgreementV4.Text>개인(신용)정보 수집/이용</AgreementV4.Text>}
  />
  <AgreementV4
    variant="small"
    left={<AgreementV4.Checkbox variant="hidden" />}
    middle={<AgreementV4.Text>전자적 매체를 통한 광고성 정보 수신</AgreementV4.Text>}
  />
</AgreementV4.Group>
```

### 인터페이스

#### AgreementV4Props

| 속성           | 기본값 | 타입                                                                          |
| -------------- | ------ | ----------------------------------------------------------------------------- | --------- | ---------- | ---------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **variant\***  | `-`    | `"xLarge"`                                                                    | `"large"` | `"medium"` | `"medium-title"` | `"small"` | `"small-last"`동의 항목의 크기 및 스타일을 결정해요. - `xLarge`: 매우 큰 크기예요. - `large`: 큰 크기예요. - `medium`: 중간 크기예요. - `medium-title`: 중간 크기의 제목 스타일이에요. - `small`: 작은 크기예요. - `small-last`: 마지막 작은 크기예요. |
| **indent**     | `-`    | `number`동의 항목의 들여쓰기 정도를 설정해요.                                 |
| **left**       | `-`    | `React.ReactNode``AgreementV4` 컴포넌트의 왼쪽 영역에 들어갈 요소를 설정해요. |
| **middle**     | `-`    | `React.ReactNode``AgreementV4` 컴포넌트의 중간에 들어갈 요소를 설정해요.      |
| **right**      | `-`    | `React.ReactNode``AgreementV4` 컴포넌트의 오른쪽에 들어갈 요소를 설정해요.    |
| **onPressEnd** | `-`    | `() => void`동의 항목이 클릭되었을 때 호출되는 함수예요.                      |

#### AgreementV4BadgeProps

| 속성            | 기본값 | 타입                            |
| --------------- | ------ | ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **variant\***   | `-`    | `"fill"`                        | `"clear"`뱃지의 스타일을 결정해요. - `fill`: 배경색이 채워진 스타일이에요. - `clear`: 투명한 스타일이에요.                                                       |
| **textColor\*** | `-`    | `string`텍스트 색상을 설정해요. |
| **bgColor**     | `-`    | `"string                        | unknown"`배경 색상을 설정해요. `variant`속성이`fill`일 때는 `string`이 적용되고, 필수값이에요. `variant`속성이`clear`일 때는 `unknown`이 적용되고, 선택적이에요. |

#### AgreementV4CheckboxProps

| 속성                | 기본값       | 타입                                                                                                                                                                                                                                                                                             |
| ------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **checked**         | `-`          | `false`                                                                                                                                                                                                                                                                                          | `true`체크박스의 체크 상태를 제어하는 상태예요. 이 속성을 사용하려면 `onCheckedChange`도 함께 전달해서 제어 컴포넌트로 설정해야 해요.                                                   |
| **variant**         | `'checkbox'` | `"checkbox"`                                                                                                                                                                                                                                                                                     | `"dot"`                                                                                                                                                                                 | `"hidden"`체크박스 모양을 정할 수 있어요. - `checkbox`: 기본 체크박스 모양이에요. - `dot`: 점 모양의 체크박스에요. - `hidden`: 체크박스를 노출하지 않아요. |
| **motionVariant**   | `'weak'`     | `"strong"`                                                                                                                                                                                                                                                                                       | `"weak"`체크박스가 체크/언체크될 때 모션의 형태를 정할 수 있어요. - `strong`: 바운스가 섞인 모션으로, 더 강한 시각적 효과를 줘요. - `weak`: 기본 모션으로, 부드러운 시각적 효과를 줘요. |
| **transitionDelay** | `0`          | `number`체크박스가 체크되거나 해제될 때 모션의 시작 지연 시간을 설정해요. 설정된 값에 0.1초가 자동으로 추가되어, 최종 지연 시간이 계산돼요. 이 속성을 사용하면 체크박스 모션의 시작 타이밍을 조정할 수 있어요. 예를 들어, `transitionDelay`를 `0.2`로 설정하면, 실제 지연 시간은 `0.3초`가 돼요. |
| **onCheckedChange** | `-`          | `(checked: boolean) => void`체크박스의 체크 상태가 변경될 때 호출되는 콜백 함수에요. `checked` 상태가 변경되면 이 함수가 호출되어, 외부에서 상태 변화를 감지할 수 있어요.                                                                                                                        |

#### AgreementV4TextProps

| 속성           | 기본값 | 타입                                                                                                                             |
| -------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------- |
| **necessity**  | `-`    | `React.ReactNode`텍스트 앞에 표시할 추가적인 정보를 나타내는 요소에요. 주로 `AgreementV4.Necessity` 컴포넌트를 사용해요.         |
| **onPressEnd** | `-`    | `() => void`터치 이벤트가 끝날 때 호출되는 콜백 함수에요. 사용자가 텍스트를 터치한 후 손을 뗄 때 실행할 동작을 정의할 수 있어요. |

#### AgreementV4NecessityProps

| 속성          | 기본값 | 타입         |
| ------------- | ------ | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **variant\*** | `-`    | `"optional"` | `"mandatory"`약관 필수 여부를 나타내는 속성이에요. - `optional`: 선택 사항을 나타내며, 진한 회색으로 표시돼요. - `mandatory`: 필수 사항을 나타내며, 파란색으로 표시돼요. |

#### AgreementV4RightArrowProps

| 속성             | 기본값 | 타입                                                                                                  |
| ---------------- | ------ | ----------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **collapsed**    | `-`    | `false`                                                                                               | `true`화살표가 접혀 있는지 여부를 나타내는 속성이에요. `true`일 때는 화살표가 접혀 있고, `false`일 때는 펼쳐져 있어요. |
| **onArrowClick** | `-`    | `() => void`화살표를 클릭할 때 호출되는 콜백 함수에요. 사용자가 화살표를 클릭하면 이 함수가 실행돼요. |

#### AgreementV4DescriptionProps

| 속성          | 기본값 | 타입                                          |
| ------------- | ------ | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| **variant\*** | `-`    | `"box"`                                       | `"normal"`약관 설명의 스타일을 설정해요. - `box`: 박스 형태로 설명을 표시해요. - `normal`: 일반 텍스트 형태로 설명을 표시해요. |
| **indent**    | `0`    | `number`약관 설명의 들여쓰기 정도를 설정해요. |

#### AgreementV4HeaderProps

| 속성          | 기본값 | 타입                                                  |
| ------------- | ------ | ----------------------------------------------------- | --------- | ---------- | ---------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **variant\*** | `-`    | `"xLarge"`                                            | `"large"` | `"medium"` | `"medium-title"` | `"small"` | `"small-last"``Header` 컴포넌트의 크기 및 스타일을 결정해요. - `xLarge`: 매우 큰 크기예요. - `large`: 큰 크기예요. - `medium`: 중간 크기예요. - `medium-title`: 중간 크기의 제목 스타일이에요. - `small`: 작은 크기예요. - `small-last`: 마지막 작은 크기예요. |
| **indent**    | `0`    | `number``Header` 컴포넌트의 들여쓰기 정도를 설정해요. |

#### AgreementV4PressableProps

| 속성           | 기본값 | 타입                                                                                                                             |
| -------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------- |
| **onPressEnd** | `-`    | `() => void`터치 이벤트가 끝날 때 호출되는 콜백 함수에요. 사용자가 텍스트를 터치한 후 손을 뗄 때 실행할 동작을 정의할 수 있어요. |

#### AgreementV4IndentPushableProps

| 속성               | 기본값 | 타입                                                                                                                                                                                  |
| ------------------ | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **children\***     | `-`    | `React.ReactNode`들여쓰기 가능한 컴포넌트 내에 포함될 자식 요소들을 나타내요.                                                                                                         |
| **pushed**         | `-`    | `false`                                                                                                                                                                               | `true``IndentPushable` 컴포넌트가 현재 들여쓰기 상태인지 여부를 나타내요. `true`일 때는 들여쓰기가 적용되고, `false`일 때는 적용되지 않아요. 이 속성을 사용하면 외부에서 들여쓰기 상태를 제어할 수 있어요. |
| **defaultPushed**  | `-`    | `false`                                                                                                                                                                               | `true``IndentPushable` 컴포넌트의 초기 들여쓰기 상태를 설정해요. `true`일 때는 기본적으로 들여쓰기가 적용되어 있고, `false`일 때는 들여쓰기를 하지 않아요.                                                 |
| **onPushedChange** | `-`    | `(pushed: boolean) => void`들여쓰기 상태가 변경될 때 호출되는 콜백 함수에요. 상태가 변경되면 `pushed` 값이 인자로 전달돼요. 이 함수를 사용하면 상태 변화를 감지하고 처리할 수 있어요. |

#### AgreementV4IndentPushableTriggerProps

| 속성           | 기본값 | 타입                                                                                                                                                                 |
| -------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **children\*** | `-`    | `React.ReactNode`클릭하면 하위 콘텐츠가 들여쓰기 되는 영역에 포함될 자식 요소들을 나타내요. 이 컴포넌트는 클릭했을 때 하위 콘텐츠의 들여쓰기를 제어하는 역할을 해요. |

#### AgreementV4IndentPushableContentProps

| 속성         | 기본값 | 타입                                                                                                                                                 |
| ------------ | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| **children** | `-`    | `React.ReactNode`들여쓰기 가능한 콘텐츠 내에 포함될 자식 요소들을 나타내요. 이 컴포넌트는 트리거가 활성화되면 들여쓰기가 적용되는 콘텐츠를 포함해요. |

#### AgreementV4CollapsibleProps

| 속성                  | 기본값 | 타입                                                                                                                                                                                                     |
| --------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **children\***        | `-`    | `React.ReactNode`약관을 접거나 펼치기가 가능한 컴포넌트 내에 포함될 자식 요소들을 나타내요.                                                                                                              |
| **collapsed**         | `-`    | `false`                                                                                                                                                                                                  | `true``Collapsible` 컴포넌트가 현재 접혀 있는지 여부를 나타내요. `true`일 때는 접혀있고, `false`일 때는 펼쳐져 있어요. 이 속성을 사용하면 외부 컴포넌트에서 접기/펼치기 상태를 제어할 수 있어요. |
| **defaultCollapsed**  | `-`    | `false`                                                                                                                                                                                                  | `true``Collapsible` 컴포넌트의 초기 접기 상태를 설정해요. `true`일 때는 초기 상태가 접혀 있고, `false`일 때는 펼쳐져 있어요.                                                                     |
| **onCollapsedChange** | `-`    | `(collapsed: boolean) => void`약관을 접거나 펼칠 때 상태가 변경될 때 호출되는 콜백 함수에요. 상태가 변경되면 `collapsed` 값이 인자로 전달돼요. 이 함수를 사용하면 상태 변화를 감지하고 처리할 수 있어요. |

#### AgreementV4CollapsibleTriggerProps

| 속성           | 기본값 | 타입                                                                                                                                                                        |
| -------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **children\*** | `-`    | `React.ReactNode`약관을 접거나 펼칠 때 함께 보일 자식 요소들을 나타내요. `CollapsibleTrigger` 컴포넌트는 사용자가 클릭하여 콘텐츠를 접거나 펼칠 수 있는 트리거 역할을 해요. |

#### AgreementV4CollapsibleContentProps

| 속성           | 기본값 | 타입                                                                                                                                                                      |
| -------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **children\*** | `-`    | `React.ReactNode`약관을 접거나 펼치기가 가능한 콘텐츠 내에 포함될 자식 요소들을 나타내요. `CollapsibleContent` 컴포넌트는 트리거가 활성화되면 표시되는 콘텐츠를 포함해요. |

#### AgreementV4GroupProps

| 속성             | 기본값 | 타입                                                      |
| ---------------- | ------ | --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **children\***   | `-`    | `React.ReactNode`그룹 내에 포함될 자식 요소들을 나타내요. |
| **showGradient** | `true` | `false`                                                   | `true``Group` 컴포넌트 내부의 요소들 왼쪽에 세로로 표시되는 그라데이션 라인의 표시 여부를 설정해요. `true`일 때는 그라데이션이 표시되고, `false`일 때는 표시되지 않아요. |
