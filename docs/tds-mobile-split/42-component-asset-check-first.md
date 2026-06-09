# Asset / 먼저 확인해주세요

출처: https://tossmini-docs.toss.im/tds-mobile/components/Asset/check-first/

AssetAsset 이해하기

### Asset 이해하기

![Asset thumbnail](/tds-mobile/_next/static/media/Thumbnail-Asset.8f0ad14c.png)

이 문서를 읽고나면,

- `Asset` 컴포넌트의 기본 개념과 구조를 이해할 수 있어요
- `Frame` 컴포넌트의 역할과 중요성을 이해할 수 있어요
- 각 에셋 종류의 특징과 차이점을 이해할 수 있어요

![](https://static.toss.im/2d-emojis/svg/u1F600.svg)![](https://static.toss.im/2d-emojis/svg/u1F600.svg)![](https://static.toss.im/icons/svg/icon-check-circle-green.svg)![](https://static.toss.im/2d-emojis/svg/u1F600.svg)

### Asset의 구조 이해하기

`Asset` 컴포넌트는 아이콘, 이미지, 비디오, Lottie 애니메이션 등 다양한 미디어 에셋을 일관된 방식으로 표시할 수 있게 해주는 컴포넌트예요.

`Asset` 컴포넌트는 Frame, Content, Union으로 나뉘어요.

💡

`Asset` 컴포넌트의 핵심은 `Frame` 컴포넌트에요. `Frame` 컴포넌트는 모든 `Asset` 컴포넌트 종류에 일관된 레이아웃과 스타일링을 제공하는 기반이 돼요.

### Frame

- `Asset` 컴포넌트의 기본 틀을 담당해요
- 모든 종류의 `Asset` 컴포넌트에 일관된 크기와 모양을 제공해요
- 정사각형, 직사각형, 원형 등 다양한 프리셋을 제공해요

### Content

- 이미지, 아이콘, 비디오, 텍스트, 로띠와 같은 `Asset` 컴포넌트의 실제 내용물이 들어가는 영역이에요
- `scaleType` 속성을 통해 내용물이 프레임에 맞춰지는 방식을 조절할 수 있어요

### Union

- Content에 대한 부가적인 정보를 표현해요
- `overlap`: 여러 항목이 겹쳐있음을 표현해요
- `acc` (액세서리): 상태나 부가 기능을 작은 요소로 표시해요
