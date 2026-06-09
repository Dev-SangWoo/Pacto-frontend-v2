# Progress Bar

출처: https://tossmini-docs.toss.im/tds-mobile/components/progress-bar/

Progress Bar

### ProgressBar

`ProgressBar` 컴포넌트는 작업의 진행 상태를 시각적으로 표시하는 데 사용해요. 데이터 로딩, 단계별 진행 상황 등 다양한 작업의 완료 정도를 사용자에게 직관적으로 보여줄 수 있어요.

### 사용법

### 진행도 표시하기

`progress` 속성에 0.0부터 1.0 사이의 값을 전달하여 진행도를 표시할 수 있어요.

Editable Example

```tsx
<ProgressBar progress={0.5} size="normal" />
```

### 크기 지정하기

`size` 속성을 통해 `ProgressBar` 컴포넌트의 크기를 지정할 수 있어요. 세 가지 크기(`light`, `normal`, `bold`)를 제공하며, 기본값은 `normal`이에요.

Editable Example

```tsx
<div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
  <ProgressBar progress={0.7} size="light" />
  <ProgressBar progress={0.7} size="normal" />
  <ProgressBar progress={0.7} size="bold" />
</div>
```

### 색상 변경하기

`color` 속성을 사용하여 진행 바의 색상을 변경할 수 있어요. CSS 색상 값을 지정할 수 있으며, 기본값은 `blue400` 색상이에요.

Editable Example

```tsx
<div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
  <ProgressBar size="normal" progress={0.7} color={colors.blue400} />
  <ProgressBar size="normal" progress={0.7} color={colors.green400} />
  <ProgressBar size="normal" progress={0.7} color={colors.red400} />
</div>
```

### 애니메이션 효과 추가하기

`animate` 속성을 `true`로 설정하면, 진행도가 변경될 때 부드러운 애니메이션 효과가 적용돼요.

Editable Example

```tsx
function Animated() {
  const [progress, setProgress] = React.useState<number>(0);

  const handleClick = () => {
    setProgress(progress === 0 ? 1 : 0);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
      <ProgressBar size="bold" progress={progress} animate />
      <Button onClick={handleClick} size="medium">
        {progress === 0 ? "애니메이션 시작" : "애니메이션 리셋"}
      </Button>
    </div>
  );
}
```

### 인터페이스

#### ProgressBarProps

| 속성           | 기본값           | 타입                                                                                                                              |
| -------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| **progress\*** | `-`              | `number``ProgressBar` 컴포넌트의 진행도를 나타내요. 0.0부터 1.0 사이의 값을 가질 수 있어요. 예를 들어, 0.5는 50% 진행을 의미해요. |
| **size\***     | `'normal'`       | `"light"`                                                                                                                         | `"normal"`                                   | `"bold"``ProgressBar` 컴포넌트의 크기를 결정해요. `light`, `normal`, `bold` 세 가지 크기를 제공해요. |
| **color**      | `colors.blue400` | `string``ProgressBar` 컴포넌트의 색상을 결정해요.                                                                                 |
| **animate**    | `false`          | `false`                                                                                                                           | `true`애니메이션을 적용할지 여부를 결정해요. |
| **className**  | `-`              | `string``ProgressBar` 컴포넌트의 `className`을 지정해요.                                                                          |
