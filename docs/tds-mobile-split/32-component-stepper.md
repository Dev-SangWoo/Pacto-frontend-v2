# Stepper

출처: https://tossmini-docs.toss.im/tds-mobile/components/stepper/

Stepper

### Stepper

`Stepper` 컴포넌트는 여러 단계를 시각적으로 보여줄 때 사용하는 컴포넌트예요. 각 단계는 제목과 설명을 가질 수 있고, 오른쪽에는 아이콘이나 버튼을 추가할 수 있어요. 순차적인 흐름을 사용자에게 쉽게 전달하는 데 적합해요.

![1 단계](https://static.toss.im/icons/svg/icon-step1-rounded-light.svg)타이틀설명![image](https://static.toss.im/icons/svg/icon-arrow-right-mono.svg)![2 단계](https://static.toss.im/icons/svg/icon-step2-rounded-light.svg)타이틀설명![image](https://static.toss.im/icons/svg/icon-arrow-right-mono.svg)![3 단계](https://static.toss.im/icons/svg/icon-step3-rounded-light.svg)타이틀설명![image](https://static.toss.im/icons/svg/icon-arrow-right-mono.svg)

### 사용법

### 단계 추가하기

`StepperRow` 컴포넌트의 `content` 속성에 `StepperRow.Texts` 컴포넌트를 사용해서 단계를 추가할 수 있어요.

#### 제목과 설명 추가하기

`StepperRow.Texts` 컴포넌트에서 `type` 속성을 사용하면 제목과 설명의 스타일을 변경할 수 있어요.

- `A`: 일반 크기의 제목(`t5`), 일반 크기의 설명(`t6`)
- `B`: 큰 크기의 제목(`t4`), 일반 크기의 설명(`t6`)
- `C`: 일반 크기의 제목(`t5`), 작은 크기의 설명(`t7`)

Editable Example

```tsx
<>
  <StepperRow
    left={<StepperRow.NumberIcon number={1} />}
    center={<StepperRow.Texts type="A" title="일반 크기의 제목" description="일반 크기의 설명" />}
  />
  <StepperRow
    left={<StepperRow.NumberIcon number={1} />}
    center={<StepperRow.Texts type="B" title="큰 크기의 제목" description="일반 크기의 설명" />}
  />
  <StepperRow
    left={<StepperRow.NumberIcon number={1} />}
    center={<StepperRow.Texts type="C" title="일반 크기의 제목" description="작은 크기의 설명" />}
    hideLine
  />
</>
```

### 왼쪽에 요소 추가하기

`StepperRow` 컴포넌트의 `left` 속성을 사용하면 콘텐츠 영역의 왼쪽에 요소를 배치할 수 있어요. 보통 단계를 나타내기 위한 숫자나 의미를 부각하는 아이콘을 배치하는 데 많이 사용해요.

#### 왼쪽에 숫자 아이콘 추가하기

`Stepper.NumberIcon` 컴포넌트를 사용해 왼쪽에 숫자 아이콘을 추가할 수 있어요. 각 단계를 명확히 구분할 수 있어 유용해요.

Editable Example

```tsx
<>
  <StepperRow
    left={<StepperRow.NumberIcon number={1} />}
    center={<StepperRow.Texts type="A" title="타이틀" description="설명" />}
  />
  <StepperRow
    left={<StepperRow.NumberIcon number={2} />}
    center={<StepperRow.Texts type="A" title="타이틀" description="설명" />}
  />
  <StepperRow
    left={<StepperRow.NumberIcon number={3} />}
    center={<StepperRow.Texts type="A" title="타이틀" description="설명" />}
    hideLine
  />
</>
```

#### 왼쪽에 에셋 추가하기

`Asset` 컴포넌트를 사용해서 왼쪽에 원하는 에셋을 추가할 수 있어요. `Stepper` 컴포넌트의 여백 규칙을 지키려면 `Asset` 컴포넌트를 `Stepper.AssetFrame` 컴포넌트로 감싸서 사용하면 돼요.

Editable Example

```tsx
<>
  <StepperRow
    left={
      <StepperRow.AssetFrame
        shape={Asset.frameShape.CircleMedium}
        content={<Asset.ContentImage src="https://static.toss.im/2d-emojis/png/4x/u1F31D.png" />}
        backgroundColor="transparent"
      />
    }
    center={<StepperRow.Texts type="A" title="타이틀" description="설명" />}
  />
  <StepperRow
    left={
      <StepperRow.AssetFrame
        shape={Asset.frameShape.CircleMedium}
        content={<Asset.ContentImage src="https://static.toss.im/2d-emojis/png/4x/u1F31D.png" />}
        backgroundColor="transparent"
      />
    }
    center={<StepperRow.Texts type="A" title="타이틀" description="설명" />}
  />
  <StepperRow
    left={
      <StepperRow.AssetFrame
        shape={Asset.frameShape.CircleMedium}
        content={<Asset.ContentImage src="https://static.toss.im/2d-emojis/png/4x/u1F31D.png" />}
        backgroundColor="transparent"
      />
    }
    center={<StepperRow.Texts type="A" title="타이틀" description="설명" />}
    hideLine
  />
</>
```

### 오른쪽에 요소 추가하기

`StepperRow` 컴포넌트의 `right` 속성을 사용해서 콘텐츠 영역의 오른쪽에 요소를 추가할 수 있어요.

#### 오른쪽에 화살표 아이콘 추가하기

`Stepper.RightArrow` 컴포넌트를 사용해서 오른쪽에 화살표 아이콘을 추가할 수 있어요.

Editable Example

```tsx
<>
  <StepperRow
    left={<StepperRow.NumberIcon number={1} />}
    center={<StepperRow.Texts type="A" title="타이틀" description="설명" />}
    right={<StepperRow.RightArrow />}
  />
  <StepperRow
    left={<StepperRow.NumberIcon number={2} />}
    center={<StepperRow.Texts type="A" title="타이틀" description="설명" />}
    right={<StepperRow.RightArrow />}
  />
  <StepperRow
    left={<StepperRow.NumberIcon number={3} />}
    center={<StepperRow.Texts type="A" title="타이틀" description="설명" />}
    right={<StepperRow.RightArrow />}
    hideLine
  />
</>
```

#### 오른쪽에 버튼 추가하기

`Stepper.RightButton` 컴포넌트를 사용해서 오른쪽에 버튼을 추가할 수 있어요.

Editable Example

```tsx
<>
  <StepperRow
    left={<StepperRow.NumberIcon number={1} />}
    center={<StepperRow.Texts type="A" title="타이틀" description="설명" />}
    right={<StepperRow.RightButton>버튼</StepperRow.RightButton>}
  />
  <StepperRow
    left={<StepperRow.NumberIcon number={2} />}
    center={<StepperRow.Texts type="A" title="타이틀" description="설명" />}
    right={<StepperRow.RightButton>버튼</StepperRow.RightButton>}
  />
  <StepperRow
    left={<StepperRow.NumberIcon number={3} />}
    center={<StepperRow.Texts type="A" title="타이틀" description="설명" />}
    right={<StepperRow.RightButton>버튼</StepperRow.RightButton>}
    hideLine
  />
</>
```

### 연결선 가리기

`StepperRow` 컴포넌트의 `hideLine` 속성을 사용하면 연결선을 숨길 수 있어요. 주로 마지막 단계에서 연결선을 제거할 때 사용해요.

Editable Example

```tsx
<>
  <StepperRow
    left={<StepperRow.NumberIcon number={1} />}
    center={<StepperRow.Texts type="A" title="타이틀" description="설명" />}
  />
  <StepperRow
    left={<StepperRow.NumberIcon number={2} />}
    center={<StepperRow.Texts type="A" title="타이틀" description="설명" />}
    hideLine
  />
</>
```

### 등장 모션 제공하기

`Stepper` 컴포넌트를 사용해 `StepperRow` 컴포넌트를 감싸면, 모션을 적용할 수 있어요. 이 모션은 각 스텝이 차례로 등장하게 해서 사용자가 단계를 쉽게 인식할 수 있게 도와줘요. `Stepper`로 감싸면 자식으로 전달된 `StepperRow`들이 순차적으로 등장해요.

Editable Example

```tsx
<Stepper>
  <StepperRow
    left={<StepperRow.NumberIcon number={1} />}
    center={<StepperRow.Texts type="A" title="타이틀" description="설명" />}
    right={<StepperRow.RightArrow />}
  />
  <StepperRow
    left={<StepperRow.NumberIcon number={2} />}
    center={<StepperRow.Texts type="A" title="타이틀" description="설명" />}
    right={<StepperRow.RightArrow />}
  />
  <StepperRow
    left={<StepperRow.NumberIcon number={3} />}
    center={<StepperRow.Texts type="A" title="타이틀" description="설명" />}
    right={<StepperRow.RightArrow />}
    hideLine
  />
</Stepper>
```

`staggerDelay` 속성을 사용하면 스텝들이 일정한 시간 간격을 두고 순차적으로 등장하는 애니메이션을 적용할 수 있어요. stagger는 각 요소가 동시에 등장하지 않고, 일정한 딜레이를 두고 차례로 등장하는 방식이에요. 이 방식은 복잡한 정보나 여러 단계를 시각적으로 더 쉽게 인식할 수 있게 도와줘요.

`staggerDelay` 값은 초 단위로 입력하며, 이 값이 클수록 각 스텝 사이의 등장 간격이 길어져요. 예를 들어, `staggerDelay={0.5}`로 설정하면 각 스텝이 0.5초 간격으로 순차적으로 나타나요.

Editable Example

```tsx
<Stepper staggerDelay={0.5}>
  <StepperRow
    left={<StepperRow.NumberIcon number={1} />}
    center={<StepperRow.Texts type="A" title="타이틀" description="설명" />}
  />
  <StepperRow
    left={<StepperRow.NumberIcon number={2} />}
    center={<StepperRow.Texts type="A" title="타이틀" description="설명" />}
  />
  <StepperRow
    left={<StepperRow.NumberIcon number={3} />}
    center={<StepperRow.Texts type="A" title="타이틀" description="설명" />}
    hideLine
  />
</Stepper>
```

`Stepper` 컴포넌트의 `play` 속성으로 처음 렌더링될 때 모션을 재생할지 결정할 수 있어요. `play`를 토글해도 한 번 실행된 모션은 다시 실행되지 않아요. `play`가 `false`라면 모션이 실행되지 않아요.

Editable Example

```tsx
<Stepper play={false}>
  <StepperRow
    left={<StepperRow.NumberIcon number={1} />}
    center={<StepperRow.Texts type="A" title="타이틀" description="설명" />}
  />
  <StepperRow
    left={<StepperRow.NumberIcon number={2} />}
    center={<StepperRow.Texts type="A" title="타이틀" description="설명" />}
  />
  <StepperRow
    left={<StepperRow.NumberIcon number={3} />}
    center={<StepperRow.Texts type="A" title="타이틀" description="설명" />}
    hideLine
  />
</Stepper>
```

### 인터페이스

#### StepperProps

| 속성             | 기본값 | 타입                                                                                         |
| ---------------- | ------ | -------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| **play**         | `true` | `false`                                                                                      | `true``Stepper` 컴포넌트가 렌더링될 때 `StepperRow` 컴포넌트의 등장 애니메이션을 실행해요. `false`라면 애니메이션 없이 렌더링돼요. |
| **delay**        | `0`    | `number`애니메이션의 시작 지연 시간을 설정해요. 초 단위를 사용해요.                          |
| **staggerDelay** | `0.1`  | `number`각 `StepperRow` 컴포넌트가 순차적으로 나타날 때 간격을 설정해요. 초 단위를 사용해요. |

#### StepperRowProps

| 속성         | 기본값  | 타입                                                                                                                |
| ------------ | ------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **left\***   | `-`     | `React.ReactNode``StepperRow` 컴포넌트의 왼쪽 영역에 표시될 컴포넌트를 지정해요. 주로 아이콘이나 이미지가 사용돼요. |
| **center\*** | `-`     | `React.ReactNode``StepperRow` 컴포넌트의 중앙 영역에 표시될 타이틀과 설명을 지정해요. 주로 텍스트가 들어가요.       |
| **right**    | `-`     | `React.ReactNode``StepperRow` 컴포넌트의 오륵쪽 영역에 표시될 컴포넌트를 지정해요. 주로 버튼이나 아이콘가 사용돼요. |
| **hideLine** | `false` | `false`                                                                                                             | `true``StepperRow` 컴포넌트의 연결선을 숨길지 여부를 설정해요. 주로 마지막 스텝에서 `true`를 사용하여 연결선을 제거해요. |

#### StepperRowAssetFrameProps

Asset.Frame 컴포넌트를 확장하여 제작했어요. Asset.Frame 컴포넌트의 모든 속성을 사용할 수 있어요.

| 속성          | 기본값 | 타입                                                                                                         |
| ------------- | ------ | ------------------------------------------------------------------------------------------------------------ |
| **shape\***   | `-`    | `AssetFrameShapeType``Asset` 컴포넌트의 프레임 형태를 지정해요. 주로 `Asset`에서 제공하는 preset을 사용해요. |
| **content\*** | `-`    | `React.ReactNode``Asset` 컴포넌트의 프레임 안에 표시될 콘텐츠를 지정해요. 주로 이미지나 아이콘을 추가해요.   |

#### StepperRowNumberIconProps

Icon 컴포넌트를 확장하여 제작했어요. Icon 컴포넌트의 모든 속성을 사용할 수 있어요.

| 속성         | 기본값 | 타입 |
| ------------ | ------ | ---- | --- | --- | --- | --- | --- | --- | --- | ---------------------------------------------------------------- |
| **number\*** | `-`    | `1`  | `2` | `3` | `4` | `5` | `6` | `7` | `8` | `9``StepperRow` 컴포넌트 왼쪽에 순서를 나타내는 숫자를 설정해요. |

#### StepperRowRightArrowProps

| 속성           | 기본값                      | 타입                                                                                                                                      |
| -------------- | --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **name**       | `'icon-arrow-right-mono'`   | `string`아이콘의 이름을 지정해요.                                                                                                         |
| **color**      | `adaptive.grey400`          | `string`아이콘의 색상을 지정해요.                                                                                                         |
| **frameShape** | `Asset.frameShape.CleanW24` | `AssetFrameShapeType`프레임의 모양을 설정해요. 더 큰 텍스트 스케일이 160보다 크거나 같으면, `Asset.frameShape.CleanW32` 로 자동 변경돼요. |

#### StepperRowRightButtonProps

Button 컴포넌트를 확장하여 제작했어요. Button 컴포넌트의 모든 속성을 사용할 수 있어요.

| 속성      | 기본값      | 타입        |
| --------- | ----------- | ----------- | ---------- | --------- | --------------------------------- |
| **size**  | `'small'`   | `"small"`   | `"medium"` | `"large"` | `"xlarge"`버튼의 크기를 설정해요. |
| **color** | `'primary'` | `"primary"` | `"danger"` | `"light"` | `"dark"`버튼의 컬러를 설정해요.   |

#### StepperRowTextsProps

| 속성                 | 기본값 | 타입                                                               |
| -------------------- | ------ | ------------------------------------------------------------------ | ----- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **type\***           | `-`    | `"A"`                                                              | `"B"` | `"C"``StepperRow` 컴포넌트의 텍스트의 타입을 설정해요. 타이틀과 설명의 스타일이 타입에 따라 달라져요. - `A`일 떄 타이틀은 `t5`, 설명은 `t6`에요. - `B`일 떄 타이틀은 `t4`, 설명은 `t6`에요. - `C`일 떄 타이틀은 `t5`, 설명은 `t7`에요. |
| **title\***          | `-`    | `React.ReactNode``StepperRow` 컴포넌트에 표시될 타이틀을 지정해요. |
| **description**      | `-`    | `React.ReactNode``StepperRow` 컴포넌트에 표시될 설명을 지정해요.   |
| **titleProps**       | `-`    | `ParagraphTextProps`추가로 타이틀의 스타일링을 할 때 사용해요.     |
| **descriptionProps** | `-`    | `ParagraphTextProps`추가로 설명의 스타일링을 할 때 사용해요.       |
