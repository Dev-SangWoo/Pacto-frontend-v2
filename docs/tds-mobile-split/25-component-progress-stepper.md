# Progress Stepper

출처: https://tossmini-docs.toss.im/tds-mobile/components/progress-stepper/

Progress Stepper

### ProgressStepper

`ProgressStepper` 컴포넌트는 프로그레스바와 스테퍼가 결합된 형태로, 작업의 진행 상태를 단계별로 시각적으로 표시하는 데 사용해요. 각 단계의 제목을 설정하면 사용자에게 현재 진행 중인 단계와 앞으로의 단계를 명확하게 보여줄 수 있어요. 단계별 진행 상황을 한눈에 확인할 수 있어, 작업의 완료 정도를 효과적으로 표현할 수 있어요.

유심 신청배송 완료개통 완료

### 사용법

### 형태 변경하기

`variant` 속성을 사용하면 `ProgressStepper` 컴포넌트의 스타일을 변경할 수 있어요. 사용 가능한 형태는 `compact`, `icon`가 있어요.

- `compact`: 단계가 간결하게 표시되는 스타일로, 명확한 진행 상태를 보여줘요.
- `icon`: 각 단계에 아이콘이 추가되어 쉽게 알아볼 수 있고, 시각적으로 더 직관적인 단계 구분이 가능해요.

Editable Example

```tsx
<div>
  <ProgressStepper variant="compact" activeStepIndex={1}>
    <ProgressStep title="유심 신청" />
    <ProgressStep title="배송 완료" />
    <ProgressStep title="개통 완료" />
  </ProgressStepper>
  <ProgressStepper variant="icon" activeStepIndex={1} paddingTop="wide">
    <ProgressStep title="유심 신청" />
    <ProgressStep title="배송 완료" />
    <ProgressStep title="개통 완료" />
  </ProgressStepper>
</div>
```

### 단순한 형태로 사용하기

`ProgressStep` 컴포넌트의 `title` 속성을 생략하면 단순한 형태의 스텝퍼를 사용할 수 있어요. 이 형태는 단계의 진행 상태만을 간단히 표시하고 싶을 때 유용해요. 특히 제한된 공간에서 진행 상태를 표시하거나, 단계별 설명이 불필요할 때 사용해요.

Editable Example

```tsx
<div>
  <ProgressStepper variant="compact" activeStepIndex={1}>
    <ProgressStep />
    <ProgressStep />
    <ProgressStep />
    <ProgressStep />
  </ProgressStepper>
  <ProgressStepper variant="icon" activeStepIndex={1} paddingTop="wide">
    <ProgressStep />
    <ProgressStep />
    <ProgressStep />
  </ProgressStepper>
</div>
```

### 완료된 단계 표시하기

`ProgressStepper` 컴포넌트의 `variant` 속성을 `icon`으로 설정하고 `checkForFinish` 속성을 `true`로 설정하면, 현재 단계 이전의 모든 단계가 체크 아이콘으로 표시돼요. 이렇게 하면 어떤 단계를 다 끝냈는지 바로 알 수 있어요.

Editable Example

```tsx
<ProgressStepper variant="icon" activeStepIndex={2} checkForFinish>
  <ProgressStep title="첫 번째" />
  <ProgressStep title="두 번째" />
  <ProgressStep title="세 번째" />
  <ProgressStep title="네 번째" />
  <ProgressStep title="마지막" />
</ProgressStepper>
```

### 단계별 아이콘 설정하기

`ProgressStepper` 컴포넌트의 `variant` 속성을 `icon`으로 설정하면 각 단계에 아이콘을 추가할 수 있어요. `ProgressStep` 컴포넌트의 `icon` 속성을 사용해서 각 단계별로 의미 있는 아이콘을 사용할 수 있어요. 아이콘을 사용하면 각 단계의 특성을 시각적으로 명확하게 구분할 수 있고, 사용자가 진행 상태를 한 눈에 확인하는 데 도움이 돼요.

Editable Example

```tsx
<ProgressStepper variant="icon" activeStepIndex={1}>
  <ProgressStep
    title="동해물과"
    icon={
      <Asset.Icon
        frameShape={Asset.frameShape.CleanWFull}
        name="icon-home-mono"
        aria-hidden={true}
      />
    }
  />
  <ProgressStep
    title="백두산이"
    icon={
      <Asset.Icon
        frameShape={Asset.frameShape.CleanWFull}
        name="icon-tuba-click-mono"
        aria-hidden={true}
      />
    }
  />
  <ProgressStep
    title="마르고 닳도록"
    icon={
      <Asset.Icon
        frameShape={Asset.frameShape.CleanWFull}
        name="icon-money-bag-mono"
        aria-hidden={true}
      />
    }
  />
</ProgressStepper>
```

### 인터페이스

#### ProgressStepperProps

| 속성                | 기본값      | 타입                                       |
| ------------------- | ----------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| **variant\***       | `-`         | `"compact"`                                | `"icon"`진행 단계를 표시하는 스타일을 설정해요. - compact: 간결한 스타일 - icon: 아이콘이 포함된 스타일                               |
| **paddingTop**      | `'default'` | `"default"`                                | `"wide"`상단 여백을 조절해요. - wide: 24px - default: 16px                                                                            |
| **activeStepIndex** | `0`         | `number`현재 진행 단계를 설정할 수 있어요. |
| **checkForFinish**  | `false`     | `false`                                    | `true``variant` 속성이 `icon`일 때만 사용할 수 있어요. `activeStepIndex` 보다 낮은 단계의 `ProgressStep`을 check icon으로 렌더링해요. |

#### ProgressStepProps

| 속성      | 기본값 | 타입                                                                                                                                 |
| --------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| **title** | `-`    | `string`각 단계의 제목을 설정해요.                                                                                                   |
| **icon**  | `-`    | `React.ReactNode``ProgressStepper` 컴포넌트의 `variant` 속성이 `icon`일 때만 사용할 수 있어요. 각 단계별 사용할 아이콘을 렌더링해요. |
