# Asset / Asset

출처: https://tossmini-docs.toss.im/tds-mobile/components/Asset/asset/

Asset래핑한 컴포넌트 활용하기

### 래핑한 컴포넌트 활용하기

많이 사용되는 `Frame` 컴포넌트와 `ContentIcon` 컴포넌트, `ContentImage` 컴포넌트, `ContentLottie` 컴포넌트, `ContentText` 컴포넌트, `ContentVideo` 컴포넌트의 조합을 미리 래핑하여 사용하기 쉽게 제공해요.

![image](https://static.toss.im/icons/svg/icn-heart-line.svg)![](https://static.toss.im/2d-emojis/svg/u1F600.svg)Text

래핑된 컴포넌트들은 다음과 같아요:

- `Asset.Icon` = `Frame` + `ContentIcon`
- `Asset.Image` = `Frame` + `ContentImage`
- `Asset.Lottie` = `Frame` + `ContentLottie`
- `Asset.Text` = `Frame` + `ContentText`
- `Asset.Video` = `Frame` + `ContentVideo`

래핑된 컴포넌트들은 원래 `Frame` 컴포넌트의 `shape` 속성을 `frameShape` 속성으로 이름을 변경해서 제공해요. 예를 들면 다음 예시와 같아요.

```tsx
// Frame을 직접 사용할 때
<Frame shape={{ width: 100, height: 100 }} {...restProps} />

// 래핑된 컴포넌트를 사용할 때
<Asset.Image frameShape={{ width: 100, height: 100 }} {...restProps} />
```

자주 사용되는 frameShape 값들은 미리 정의된 프리셋으로도 제공돼요:

```tsx
<Asset.Image frameShape={Asset.frameShape.SquareMedium} {...restProps} />
```

이 컴포넌트들을 사용하면 쉽게 `Asset` 컴포넌트를 활용할 수 있어요.

### 사용 예제

### 아이콘 에셋 사용하기

`Asset.Icon` 컴포넌트는 아이콘을 표시할 때 사용해요. 아이콘을 프레임 안에 일관된 크기와 스타일로 표현할 수 있어요. 필요에 따라 크기와 색상을 조절할 수 있어요.

Editable Example

```tsx
<Asset.Icon color="green" name="heart-line" />
```

#### 색상 변경하기

`color` 속성을 사용해 아이콘의 색상을 변경할 수 있어요. CSS 색상값을 지원해요. 토스의 색상 시스템인 adaptive 값도 사용할 수 있어요.

Editable Example

```tsx
<div style={{ display: "flex", flexDirection: "row", gap: "32px" }}>
  <Asset.Icon color="green" name="heart-line" />
  <Asset.Icon color="red" name="heart-line" />
  <Asset.Icon color="blue" name="heart-line" />
</div>
```

### 이미지 에셋 사용하기

`Asset.Image` 컴포넌트는 이미지를 표시할 때 사용해요. `frameShape` 속성을 통해 크기와 모양을 지정할 수 있고, `scaleType` 속성으로 이미지 맞춤 방식을 조절할 수 있어요.

Editable Example

```tsx
<Asset.Image
  frameShape={{
    height: 100,
    width: 100,
  }}
  scaleType="crop"
  src="https://static.toss.im/2d-emojis/svg/u1F600.svg"
/>
```

### 로티 에셋 사용하기

`Asset.Lottie` 컴포넌트는 Lottie 애니메이션을 표시할 때 사용해요.

Editable Example

```tsx
<Asset.Lottie
  frameShape={{
    height: 300,
    width: 300,
  }}
  scaleType="crop"
  src="https://static.toss.im/lotties/activation/1won_new/1won.json"
/>
```

### 텍스트 에셋 사용하기

`Asset.Text` 컴포넌트는 텍스트를 프레임 안에 표시할 때 사용해요.

Editable Example

```tsx
<Asset.Text
  frameShape={{
    height: 100,
    width: 100,
  }}
>
  Text
</Asset.Text>
```

### 비디오 에셋 사용하기

`Asset.Video` 컴포넌트는 비디오를 재생할 때 사용해요. 자동재생, 반복재생, 음소거를 통해 제어할 수 있어요.

Editable Example

```tsx
<Asset.Video
  frameShape={{
    height: 200,
    width: 200,
  }}
  as="video"
  src="https://static.toss.im/3d/number-100-light.mp4"
/>
```

#### 비디오 제어하기

`Asset.Video` 컴포넌트는 다양한 속성을 통해 비디오 재생을 제어할 수 있어요:

- `controls`: 재생, 일시정지, 음량, 전체화면 등의 컨트롤러를 표시할 수 있어요
- `autoPlay`: 비디오가 로드되면 자동으로 재생할지 설정할 수 있어요
- `loop`: 비디오가 끝나면 다시 처음부터 재생할지 설정할 수 있어요
- `muted`: 비디오의 음소거 여부를 설정할 수 있어요

Editable Example

```tsx
<Asset.Video
  frameShape={{
    height: 200,
    width: 200,
  }}
  as="video"
  src={"https://static.toss.im/3d/number-100-light.mp4" as unknown as HTMLVideoElement["src"]}
  controls
  autoPlay={false}
  loop={false}
/>
```

### 인터페이스

#### IconProps

| 속성       | 기본값 | 타입                              |
| ---------- | ------ | --------------------------------- |
| **name\*** | `-`    | `string`아이콘의 이름을 지정해요. |
| **color**  | `-`    | `string`아이콘의 색상을 지정해요. |

#### ImageProps

| 속성          | 기본값  | 타입                                     |
| ------------- | ------- | ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **src\***     | `-`     | `string`이미지의 URL을 지정해요.         |
| **scaleType** | `'fit'` | `"fit"`                                  | `"crop"`이미지가 프레임에 맞춰지는 방식을 지정해요. - `fit`: 이미지의 비율을 유지하면서 프레임 안에 모두 들어가도록 맞춰요 - `crop`: 이미지가 프레임을 가득 채우도록 맞추고, 넘치는 부분은 잘라내요 |
| **alt**       | `-`     | `string`이미지의 대체 텍스트를 지정해요. |

#### VideoProps

| 속성            | 기본값  | 타입                             |
| --------------- | ------- | -------------------------------- | -------------------------------------------- |
| **src\***       | `-`     | `string`비디오의 URL을 지정해요. |
| **autoPlay**    | `true`  | `false`                          | `true`자동 재생 여부를 지정해요.             |
| **loop**        | `true`  | `false`                          | `true`반복 재생 여부를 지정해요.             |
| **muted**       | `true`  | `false`                          | `true`음소거 여부를 지정해요.                |
| **controls**    | `false` | `false`                          | `true`컨트롤 표시 여부를 지정해요.           |
| **playsInline** | `true`  | `false`                          | `true`비디오를 인라인으로 재생할지 지정해요. |

#### LottieProps

| 속성          | 기본값  | 타입                                             |
| ------------- | ------- | ------------------------------------------------ | ------------------------------------------------------- |
| **src\***     | `-`     | `string`Lottie 애니메이션 파일의 URL을 지정해요. |
| **scaleType** | `'fit'` | `"fit"`                                          | `"crop"`애니메이션이 프레임에 맞춰지는 방식을 지정해요. |

#### TextProps

| 속성         | 기본값 | 타입                                     |
| ------------ | ------ | ---------------------------------------- |
| **children** | `-`    | `React.ReactNode`텍스트 내용을 지정해요. |

#### AssetCommonType

| 속성                | 기본값           | 타입                                                                                                                        |
| ------------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------- |
| **frameShape**      | `-`              | `"FrameShapeType"`프레임의 형태와 크기를 지정해요.                                                                          |
| **backgroundColor** | `-`              | `string`프레임의 배경색을 지정해요.                                                                                         |
| **id**              | `-`              | `string``Asset` 컴포넌트의 ID를 지정해요.                                                                                   |
| **className**       | `-`              | `string``Asset` 컴포넌트의 클래스명을 지정해요.                                                                             |
| **style**           | `-`              | `React.CSSProperties`컴포넌트의 인라인 스타일을 지정해요.                                                                   |
| **acc**             | `-`              | `React.ReactNode`프레임에 추가할 액세서리 요소를 지정해요.                                                                  |
| **accPosition**     | `'bottom-right'` | `"FrameAccPositionType"`액세서리의 위치를 지정해요.                                                                         |
| **overlap**         | `-`              | `{ color: string; }`여러 개의 항목이 합쳐졌음을 보여주고 싶을 때 사용해요. `color` 속성으로 오버랩 색상을 설정할 수 있어요. |
