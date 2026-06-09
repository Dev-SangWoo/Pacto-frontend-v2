# Loader

출처: https://tossmini-docs.toss.im/tds-mobile/components/loader/

Loader

### Loader

`Loader` 컴포넌트는 사용자가 기다리는 동안 콘텐츠가 로드 중임을 시각적으로 알려줘요. 데이터를 불러오거나 작업이 진행 중일 때 사용자에게 피드백을 제공하기 위해 활용해요.

### 사용법

### 크기 설정하기

`Loader` 컴포넌트의 크기는 `size` 속성을 사용해 설정할 수 있어요. 사용할 수 있는 값은 `small`, `medium`, `large`이며, 기본값은 `medium`이에요.

Editable Example

```tsx
<div style={{ display: "flex", gap: 20, alignItems: "center" }}>
  <Loader size="small" />
  <Loader size="medium" />
  <Loader size="large" />
</div>
```

### 타입 설정하기

`Loader` 컴포넌트의 타입은 `type` 속성을 사용해 설정할 수 있어요. 사용할 수 있는 값은 `primary`, `dark`, `light`이며, 기본값은 `primary`이에요.

특히 `light` 타입은 어두운 배경에서 사용하기 적합해요.

Editable Example

```tsx
<div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
  <Loader type="primary" />
  <Loader type="dark" />
  <Loader
    type="light"
    style={{
      background: adaptive.grey600,
    }}
  />
</div>
```

### 레이블 추가하기

`Loader` 컴포넌트 아래에 텍스트를 추가하려면 `label` 속성을 사용하면 돼요. 로딩 중임을 텍스트로도 알려주거나, 로딩 중에 이루어지는 작업을 설명할 수 있어요.

Editable Example

```tsx
<Loader label={"김토스님의 카드를\n불러오고있어요."} />
```

### 인터페이스

#### LoaderProps

| 속성          | 기본값      | 타입                                                                                                                                                                   |
| ------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| **size**      | `'medium'`  | `"small"`                                                                                                                                                              | `"medium"` | `"large"``Loader` 컴포넌트의 크기를 지정해요.                                                                                        |
| **type**      | `'primary'` | `"primary"`                                                                                                                                                            | `"dark"`   | `"light"``Loader` 컴포넌트의 타입을 지정해요. 타입은 `primary`, `dark`, `light` 중 하나를 선택할 수 있어요. 각 타입별 색상이 달라요. |
| **label**     | `-`         | `string``Loader` 컴포넌트 하단에 표시될 텍스트를 지정해요. 로딩 상태에 대한 설명이나 진행 중인 작업을 설명하는 텍스트를 표시할 수 있으며, 여러 줄의 텍스트도 지원해요. |
| **style**     | `-`         | `React.CSSProperties``Loader` 컴포넌트의 스타일을 직접 지정해요.                                                                                                       |
| **className** | `-`         | `string``Loader` 컴포넌트의 `className`을 지정해요.                                                                                                                    |
| **id**        | `-`         | `string``Loader` 컴포넌트의 고유 id를 지정해요.                                                                                                                        |
