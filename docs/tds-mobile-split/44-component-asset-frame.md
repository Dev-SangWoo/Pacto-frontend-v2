# Asset / Frame

출처: https://tossmini-docs.toss.im/tds-mobile/components/Asset/frame/

AssetAsset 활용하기

### Asset 활용하기

모든 `Asset` 컴포넌트는 `Frame` 컴포넌트를 기반으로 만들어져 있어요. `Frame` 컴포넌트는 에셋의 크기, 모양, 배경 등 일관된 스타일을 제공하는 역할을 해요.

Square![](https://static.toss.im/2d-emojis/svg/u1F600.svg)![](https://static.toss.im/2d-emojis/svg/u1F600.svg)![](https://static.toss.im/2d-emojis/svg/u1F600.svg)Rectangle![](https://static.toss.im/2d-emojis/svg/u1F600.svg)![](https://static.toss.im/2d-emojis/svg/u1F600.svg)Circle![](https://static.toss.im/2d-emojis/svg/u1F600.svg)![](https://static.toss.im/2d-emojis/svg/u1F600.svg)![](https://static.toss.im/2d-emojis/svg/u1F600.svg)Card![](https://static.toss.im/2d-emojis/svg/u1F600.svg)![](https://static.toss.im/2d-emojis/svg/u1F600.svg)![](https://static.toss.im/2d-emojis/svg/u1F600.svg)

### 사용 예제

### Frame 컴포넌트 사용해보기

`Asset` 컴포넌트는 `Frame` 컴포넌트를 기반으로 구성되어 있어요. `Frame` 컴포넌트는 모든 종류의 `Asset` 컴포넌트의 기본 틀이 되어 일관된 레이아웃과 스타일링을 제공하고 있어요. 예를 들어 `Asset.Image` 컴포넌트는 내부적으로 `Frame` 컴포넌트와 `ContentImage` 컴포넌트의 조합으로 이루어져 있어요:

- `Frame` 컴포넌트: 크기, 모양, 배경색, 액세서리 등 에셋의 외형을 담당해요.
- `ContentImage` 컴포넌트: 실제 이미지를 표시하는 역할이에요.

가장 기본적인 사용법을 먼저 살펴보아요.

Editable Example

```tsx
<Asset.Frame
  shape={Asset.frameShape.RectangleLarge}
  content={
    <Asset.ContentImage src="https://static.toss.im/2d-emojis/svg/u1F600.svg" alt="스마일 이모지" />
  }
/>
```

위 예시에서 `src`는 `ContentImage` 컴포넌트에 전달되어 실제 이미지를 표시하게 돼요. 여기에 `Frame` 컴포넌트의 특성을 활용하면 다양한 스타일링이 가능해요. `Frame` 컴포넌트와 `ContentImage` 컴포넌트를 조합하여 쉽게 사용할 수 있게 `Asset.Image` 컴포넌트로 제공해요.

`Asset.Image` 컴포넌트를 활용한 방법은 **래핑한 컴포넌트 활용하기 (https://tossmini-docs.toss.im/tds-mobile/components/Asset/asset/)** 페이지에서 확인할 수 있어요.

앞으로 `Asset.Image` 컴포넌트와 `Asset.Lottie` 컴포넌트를 기준으로 설명해요.

### 프리셋 프레임 활용하기

자주 사용되는 크기와 모양의 프레임을 프리셋으로 제공해요.

- **Square**: 정사각형 프레임 (Small, Medium, Large)
- **Rectangle**: 직사각형 프레임 (Medium, Large)
- **Circle**: 원형 프레임 (Small, Medium, Large)
- **Card**: 카드형 프레임 (Small, Medium, Large)

💡**Asset.frameShape**에서 원하는 프리셋을 선택할 수 있어요. Editable Example

```tsx
<div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
  {/* Square 프리셋 */}
  <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
    <span style={{ width: 80 }}>Square</span>
    <Asset.Image
      src="https://static.toss.im/2d-emojis/svg/u1F600.svg"
      frameShape={Asset.frameShape.SquareSmall}
      backgroundColor={adaptive.grey100}
      scale={0.55}
    />
    <Asset.Image
      src="https://static.toss.im/2d-emojis/svg/u1F600.svg"
      frameShape={Asset.frameShape.SquareMedium}
      backgroundColor={adaptive.grey100}
      scale={0.55}
    />
    <Asset.Image
      src="https://static.toss.im/2d-emojis/svg/u1F600.svg"
      frameShape={Asset.frameShape.SquareLarge}
      backgroundColor={adaptive.grey100}
      scale={0.55}
    />
  </div>

  {/* Rectangle 프리셋 */}
  <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
    <span style={{ width: 80 }}>Rectangle</span>
    <Asset.Image
      src="https://static.toss.im/2d-emojis/svg/u1F600.svg"
      frameShape={Asset.frameShape.RectangleMedium}
      backgroundColor={adaptive.grey100}
      scale={0.6}
    />
    <Asset.Image
      src="https://static.toss.im/2d-emojis/svg/u1F600.svg"
      frameShape={Asset.frameShape.RectangleLarge}
      backgroundColor={adaptive.grey100}
      scale={0.6}
    />
  </div>

  {/* Circle 프리셋 */}
  <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
    <span style={{ width: 80 }}>Circle</span>
    <Asset.Image
      src="https://static.toss.im/2d-emojis/svg/u1F600.svg"
      frameShape={Asset.frameShape.CircleSmall}
      backgroundColor={adaptive.grey100}
      scale={0.55}
    />
    <Asset.Image
      src="https://static.toss.im/2d-emojis/svg/u1F600.svg"
      frameShape={Asset.frameShape.CircleMedium}
      backgroundColor={adaptive.grey100}
      scale={0.55}
    />
    <Asset.Image
      src="https://static.toss.im/2d-emojis/svg/u1F600.svg"
      frameShape={Asset.frameShape.CircleLarge}
      backgroundColor={adaptive.grey100}
      scale={0.55}
    />
  </div>

  {/* Card 프리셋 */}
  <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
    <span style={{ width: 80 }}>Card</span>
    <Asset.Image
      src="https://static.toss.im/2d-emojis/svg/u1F600.svg"
      frameShape={Asset.frameShape.CardSmall}
      backgroundColor={adaptive.grey100}
      scale={0.7}
    />
    <Asset.Image
      src="https://static.toss.im/2d-emojis/svg/u1F600.svg"
      frameShape={Asset.frameShape.CardMedium}
      backgroundColor={adaptive.grey100}
      scale={0.7}
    />
    <Asset.Image
      src="https://static.toss.im/2d-emojis/svg/u1F600.svg"
      frameShape={Asset.frameShape.CardLarge}
      backgroundColor={adaptive.grey100}
      scale={0.7}
    />
  </div>
</div>
```

### 액세서리 추가하기

에셋에 부수적인 기능을 표현하기 위해 작은 요소(뱃지 등)를 추가할 수 있어요. 주로 에셋의 모서리에 올라가는 형태로, 뱃지나 상태 표시 등의 용도로 사용돼요. 우리는 이렇게 추가한 요소를 액세서리라고 부르고 있어요.

- `acc` 속성으로 액세서리 컴포넌트를 지정할 수 있어요.
- `accPosition` 속성으로 액세서리의 위치를 지정할 수 있어요. `top-left`, `bottom-left`, `top-right`, `bottom-right`을 사용할 수 있고, 기본적으로는 `bottom-right` 이에요.

Editable Example

```tsx
<div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
  <Asset.Image
    src="https://static.toss.im/2d-emojis/svg/u1F600.svg"
    frameShape={Asset.frameShape.SquareSmall}
    backgroundColor={adaptive.grey100}
    scale={0.55}
    acc={<Asset.ContentImage src="https://static.toss.im/icons/svg/icon-check-circle-green.svg" />}
    accPosition="bottom-right"
  />
  <Asset.Image
    src="https://static.toss.im/2d-emojis/svg/u1F600.svg"
    frameShape={Asset.frameShape.SquareMedium}
    backgroundColor={adaptive.grey100}
    scale={0.55}
    acc={<Asset.ContentImage src="https://static.toss.im/icons/svg/icon-check-circle-green.svg" />}
    accPosition="bottom-right"
  />
  <Asset.Image
    src="https://static.toss.im/2d-emojis/svg/u1F600.svg"
    frameShape={Asset.frameShape.SquareLarge}
    backgroundColor={adaptive.grey100}
    scale={0.55}
    acc={<Asset.ContentImage src="https://static.toss.im/icons/svg/icon-check-circle-green.svg" />}
    accPosition="bottom-right"
  />
</div>
```

### 오버랩 추가하기

프레임에 오버랩 효과를 추가할 수 있어요. 여러 개의 항목이 합쳐졌음을 보여주고 싶을 때 사용해요. `overlap` 속성으로 테두리 색상을 지정할 수 있어요. 뒤의 배경에는 컬러값을 받을 수 있어요.

Editable Example

```tsx
<div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
  <Asset.Image
    src="https://static.toss.im/2d-emojis/svg/u1F600.svg"
    frameShape={Asset.frameShape.SquareSmall}
    backgroundColor={adaptive.grey100}
    scale={0.55}
    overlap={{ color: "#3182F6" }}
  />
  <Asset.Image
    src="https://static.toss.im/2d-emojis/svg/u1F600.svg"
    frameShape={Asset.frameShape.SquareMedium}
    backgroundColor={adaptive.grey100}
    scale={0.55}
    overlap={{ color: "#3182F6" }}
  />
  <Asset.Image
    src="https://static.toss.im/2d-emojis/svg/u1F600.svg"
    frameShape={Asset.frameShape.SquareLarge}
    backgroundColor={adaptive.grey100}
    scale={0.55}
    overlap={{ color: "#3182F6" }}
  />
</div>
```

### 프레임 맞춤 방식 조절하기

`scaleType` 속성으로 이미지가 프레임에 맞춰지는 방식을 조절할 수 있어요:

- `fit`: 이미지의 비율을 유지하면서 프레임 안에 모두 들어가도록 맞춰요.
- `crop`: 이미지가 프레임을 가득 채우도록 맞추고, 넘치는 부분은 잘라내요.

Editable Example

```tsx
<div style={{ display: "flex", flexDirection: "row", gap: "32px" }}>
  <Asset.Lottie
    frameShape={{
      height: 200,
      width: 200,
    }}
    scaleType="fit"
    src="https://static.toss.im/lotties/activation/1won_new/1won.json"
  />

  <Asset.Lottie
    frameShape={{
      height: 100,
      width: 200,
    }}
    scaleType="fit"
    src="https://static.toss.im/lotties/activation/1won_new/1won.json"
  />

  <Asset.Lottie
    frameShape={{
      height: 200,
      width: 100,
    }}
    scaleType="fit"
    src="https://static.toss.im/lotties/activation/1won_new/1won.json"
  />

  <Asset.Lottie
    frameShape={{
      height: 100,
      width: 200,
    }}
    scaleType="crop"
    src="https://static.toss.im/lotties/activation/1won_new/1won.json"
  />

  <Asset.Lottie
    frameShape={{
      height: 200,
      width: 100,
    }}
    scaleType="crop"
    src="https://static.toss.im/lotties/activation/1won_new/1won.json"
  />
</div>
```

### 프레임 크기 조절하기

`frameShape`의 width와 height로 텍스트가 들어갈 프레임의 크기를 지정할 수 있어요.

Editable Example

```tsx
<div style={{ display: "flex", flexDirection: "row", gap: "32px" }}>
  <Asset.Text
    frameShape={{
      height: 200,
      width: 200,
    }}
    backgroundColor={colors.greyBackground}
  >
    Text
  </Asset.Text>

  <Asset.Text
    frameShape={{
      height: 100,
      width: 200,
    }}
    backgroundColor={colors.greyBackground}
  >
    Text
  </Asset.Text>
</div>
```

### 인터페이스

#### FrameShapeType

| 속성        | 기본값 | 타입                                                                                                       |
| ----------- | ------ | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| **width**   | `-`    | `string`                                                                                                   | `number`프레임의 너비를 지정해요.          |
| **height**  | `-`    | `string`                                                                                                   | `number`프레임의 높이를 지정해요.          |
| **radius**  | `-`    | `string`                                                                                                   | `number`프레임의 모서리 둥글기를 지정해요. |
| **acc**     | `-`    | `"FrameAccShapeType"`프레임의 액세서리 영역 설정이에요.                                                    |
| **overlap** | `-`    | `"FrameOverlapShapeType"`프레임 뒤에 겹침 효과를 설정해요. 여러 개의 항목이 합쳐졌음을 표현할 때 사용해요. |

#### FrameAccShapeType

| 속성       | 기본값 | 타입     |
| ---------- | ------ | -------- | --------------------------------------- |
| **width**  | `-`    | `string` | `number`액세서리의 너비를 지정해요.     |
| **height** | `-`    | `string` | `number`액세서리의 높이를 지정해요.     |
| **x**      | `-`    | `string` | `number`액세서리의 X축 위치를 지정해요. |
| **y**      | `-`    | `string` | `number`액세서리의 Y축 위치를 지정해요. |

#### FrameOverlapShapeType

| 속성       | 기본값 | 타입     |
| ---------- | ------ | -------- | --------------------------------------- |
| **x**      | `-`    | `string` | `number`오버랩의 X축 오프셋을 지정해요. |
| **y**      | `-`    | `string` | `number`오버랩의 Y축 오프셋을 지정해요. |
| **blur**   | `-`    | `string` | `number`오버랩의 블러 정도를 지정해요.  |
| **spread** | `-`    | `string` | `number`오버랩의 확산 정도를 지정해요.  |

#### FrameProps

| 속성                | 기본값             | 타입                                                                                                                                              |
| ------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| **content\***       | `-`                | `React.ReactNode``Frame` 컴포넌트 내부에 표시될 요소예요. `Asset` 컴포넌트의 주요 콘텐츠(아이콘, 이미지, 비디오 등)가 `content`를 통해 전달돼요.  |
| **shape\***         | `-`                | `"FrameShapeType"``Frame` 컴포넌트의 크기와 모양을 정의하는 객체예요. 리소스 타입 별 권장하는 규격을 프리셋으로 제공하고 있어요.                  |
| **backgroundColor** | `adaptive.grey100` | `string``Frame` 컴포넌트의 배경색을 지정해요.                                                                                                     |
| **acc**             | `-`                | `React.ReactNode``Frame` 컴포넌트 위에 표시될 추가 요소예요. 뱃지나 상태 표시, 이미지 등을 통해 에셋에 부수적인 기능이 있음을 표현할 때 사용해요. |
| **accPosition**     | `'bottom-right'`   | `"top-left"`                                                                                                                                      | `"top-right"`                                                                                                                      | `"bottom-left"` | `"bottom-right"`액세서리(`acc`)의 위치를 지정해요. `top-left`, `top-right`, `bottom-left`, `bottom-right` 중 하나를 선택할 수 있어요. |
| **accMasking**      | `'none'`           | `"circle"`                                                                                                                                        | `"none"`액세서리(`acc`) 아래 콘텐츠의 마스킹 처리 방식을 지정해요. `circle`로 설정하면 액세서리 아래 원형으로 콘텐츠가 마스킹돼요. |
| **overlap**         | `-`                | `{ color: string; }``Frame` 컴포넌트에 오버랩을 추가해요. 여러 개의 항목이 합쳐졌음을 보여주고 싶을 때 사용해요.                                  |
| **color**           | `-`                | `string``Frame` 컴포넌트 내부 콘텐츠의 색상을 지정해요. 주로 아이콘의 색상을 지정할 때 사용돼요.                                                  |
