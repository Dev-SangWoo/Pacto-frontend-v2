# TextField / Text Field

출처: https://tossmini-docs.toss.im/tds-mobile/components/TextField/text-field/

TextFieldTextField

### TextField

`TextField` 컴포넌트는 사용자로부터 입력을 받는 가장 기본적인 UI 요소로, 다양한 디자인 옵션과 속성을 제공하여 일반 텍스트 입력부터 비밀번호 입력까지 다양한 상황에 적합하게 사용할 수 있어요.

`label`과 `placeholder`는 사용자가 입력 필드의 목적을 이해하도록 도와주고 `help`는 추가적인 안내 메시지를 제공해 입력 과정을 더 명확하게 해줘요. 이 컴포넌트는 다양한 상태와 옵션을 제공해서 어떤 사용 환경에서도 유연하게 동작해요. 예를 들어, `disabled` 상태를 사용해 비활성화된 입력 필드를 제공하거나, `hasError` 속성을 활용해 사용자가 잘못된 값을 입력했을 때 실수를 시각적으로 알릴 수 있어요.

LabelHelp

### 형태 변경하기

`variant` 속성을 사용하면 입력 필드의 디자인을 변경할 수 있어요. 사용 가능한 형태는 `box`, `line`, `big`, `hero`가 있어요.

- `box`: 기본 형태의 사각형 스타일로, 명확하고 간결해요.
- `line`: 입력 필드 아래에 선만 표시되는 스타일로, 깔끔한 인상을 줘요.
- `big`: 큰 글씨로 눈에 띄게 만든 스타일로, 사용자가 꼭 써야 하는 내용을 알려줘요.
- `hero`: 사용자의 시선을 끌기에 좋은 대형 스타일이에요.

Editable Example

```tsx
<div>
  <TextField
    variant="box"
    label="box"
    labelOption="sustain"
    help="help"
    placeholder="Placeholder"
  />
  <TextField
    variant="line"
    label="line"
    labelOption="sustain"
    help="help"
    placeholder="Placeholder"
  />
  <TextField
    variant="big"
    label="big"
    labelOption="sustain"
    help="help"
    placeholder="Placeholder"
  />
  <TextField
    variant="hero"
    label="hero"
    labelOption="sustain"
    help="help"
    placeholder="Placeholder"
  />
</div>
```

### 에러 상태 사용하기

`hasError` 속성을 사용하면 입력 필드가 에러 상태로 표시돼요. 사용자가 입력한 값이 유효하지 않을 때 시각적으로 알려줄 수 있어요. `hasError`와 `help` 속성을 함께 사용하면 사용자에게 더 명확한 피드백을 제공할 수 있어요.

예를 들어, 글자 수 제한이 있는 입력 필드에서 3글자 이상 입력했을 때 에러 상태를 표시하고 도움말로 '3글자 미만으로 입력해주세요'라는 메시지를 보여주면, 사용자가 바로 문제를 인지하고 수정할 수 있어요. 이런 즉각적인 피드백은 사용자 경험을 개선하고 입력 오류를 효과적으로 줄일 수 있어요.

Editable Example

```tsx
function TextFieldError() {
  const [boxValue, setBoxValue] = React.useState("");
  const [lineValue, setLineValue] = React.useState("");

  const errorMessage = "3글자 미만으로 입력해주세요.";

  const handleError = (value: string) => {
    return value.length > 2;
  };

  return (
    <div>
      <TextField
        variant="box"
        label="에러 상태 텍스트 필드"
        help={handleError(boxValue) ? errorMessage : null}
        labelOption="sustain"
        placeholder="3글자 이상 입력하면 에러 상태가 적용돼요."
        hasError={handleError(boxValue)}
        value={boxValue}
        onChange={(e) => setBoxValue(e.target.value)}
      />
      <TextField
        variant="line"
        label="에러 상태 텍스트 필드"
        help={handleError(lineValue) ? errorMessage : null}
        labelOption="sustain"
        placeholder="3글자 이상 입력하면 에러 상태가 적용돼요."
        hasError={handleError(lineValue)}
        value={lineValue}
        onChange={(e) => setLineValue(e.target.value)}
      />
    </div>
  );
}
```

### 비활성화 상태 사용하기

`disabled` 속성을 사용하면 입력 필드가 비활성화돼요. 비활성화된 필드는 사용자와의 상호작용이 제한되고 읽기 전용이나 입력이 필요하지 않은 상황에서 사용돼요. 예를 들어, 서버 응답 대기 중 데이터를 잠시 수정하지 못하게 하거나, 사용자가 특정 조건을 충족해야 활성화할 수 있는 입력 필드에서 활용할 수 있어요. 비활성화 상태는 시각적으로도 구분돼 입력이 불가능하다는 점을 명확히 전달할 수 있어요. 이렇게 불필요한 입력을 방지하면 UI의 명확성을 높일 수 있어요.

Editable Example

```tsx
<div>
  <TextField
    variant="box"
    label="값이 없는 경우"
    help="이 필드는 현재 비활성화 상태예요."
    labelOption="sustain"
    placeholder="Placeholder"
    disabled
  />
  <TextField
    variant="line"
    label="값이 있는 경우"
    help="이 필드는 현재 비활성화 상태예요."
    labelOption="sustain"
    placeholder="Placeholder"
    value="안녕하세요."
    disabled
  />
</div>
```

### 라벨 표시 방식 변경하기

`labelOption` 속성은 라벨의 표시 방식을 설정해요. 사용 가능한 방식은 `appear`과 `sustain`이에요.

- `sustain`: 항상 라벨이 보여 사용자가 입력 필드의 목적을 항상 명확히 알 수 있도록 하고 특히 입력 필드가 여러 개일 때 혼동을 줄이는 데 유용해요.
- `appear`: 값이 있을 때만 라벨이 보여 입력 필드가 깔끔하게 보이도록 하고 사용자가 입력을 시작할 때만 라벨이 나타나도록 해서 시각적 혼잡을 줄일 수 있어요.

Editable Example

```tsx
<div>
  <TextField
    variant="box"
    label="sustain"
    help="라벨이 항상 보여요."
    labelOption="sustain"
    placeholder="Placeholder"
  />
  <TextField
    variant="line"
    label="appear"
    help="텍스트를 입력하면 라벨이 보여요."
    labelOption="appear"
    placeholder="Placeholder"
  />
</div>
```

### 접두사, 접미사 사용하기

`prefix`와 `suffix` 속성을 사용하면 입력 필드의 앞뒤에 텍스트나 기호를 추가할 수 있어요. 금액, 단위와 같은 데이터를 입력받을 때 사용자에게 입력 형식을 직관적으로 보여줄 수 있어요. 예를 들어, `₩`를 접두사로 추가하면 금액 입력임을 즉시 알 수 있고, `kg`를 접미사로 추가하면 입력 데이터의 단위를 명확히 알 수 있어요.

Editable Example

```tsx
<div>
  <TextField
    variant="box"
    labelOption="sustain"
    label="prefix 텍스트 필드"
    help="금액이나 단위를 입력해주세요."
    placeholder="Placeholder"
    prefix="$"
  />
  <TextField
    variant="line"
    labelOption="sustain"
    label="suffix 텍스트 필드"
    help="금액이나 단위를 입력해주세요."
    placeholder="Placeholder"
    suffix="원"
  />
</div>
```

### 오른쪽 영역에 컴포넌트 추가하기

`right` 속성을 사용하면 입력 필드 오른쪽에 사용자 액션을 위한 버튼이나 추가 정보를 배치할 수 있어요. 예를 들어, 검색 필드에 검색 버튼을 추가하면 사용자가 입력값을 바로 검색할 수 있어요. 또, 유효성 검사 상태를 아이콘으로 표시해 사용자에게 입력값의 유효 여부를 시각적으로 알려줄 수도 있어요.

Editable Example

```tsx
<div>
  <TextField
    variant="box"
    label="오른쪽 컴포넌트"
    labelOption="sustain"
    help="오른쪽 영역에 컴포넌트를 넣을 수 있어요."
    placeholder="Placeholder"
    right={<Button size="small">버튼</Button>}
  />
  <TextField
    variant="line"
    label="오른쪽 컴포넌트"
    labelOption="sustain"
    help="오른쪽 영역에 컴포넌트를 넣을 수 있어요."
    placeholder="Placeholder"
    right={<Button size="small">버튼</Button>}
  />
</div>
```

### 클리어 버튼 사용하기

`TextField.Clearable` 컴포넌트는 입력 필드에 클리어 버튼을 제공하는 컴포넌트예요. 사용자는 초기화 버튼을 클릭해 입력 내용을 한 번에 지울 수 있어요. 이 과정에서 `onClear` 이벤트를 활용해 필터링된 목록을 초기 상태로 되돌리거나 최근 검색어 목록을 업데이트하는 등의 추가 작업을 수행할 수 있어요. 이 컴포넌트는 검색창이나 폼 필드에서 잘못된 입력을 빠르게 수정하거나 재입력을 유도하고 싶을 때 적합해요. 클리어 버튼을 사용하면 사용자가 입력 내용을 쉽게 정리할 수 있어 폼 입력이나 검색 경험을 크게 개선할 수 있어요.

Editable Example

```tsx
<div>
  <TextField.Clearable
    variant="box"
    label="클리어 가능한 텍스트 필드"
    labelOption="sustain"
    help="값을 입력 후, 오른쪽 clear 버튼을 눌러보세요. onClear가 실행돼요."
    placeholder="Placeholder"
    onClear={() => {
      window.alert("clear");
    }}
  />
  <TextField.Clearable
    variant="line"
    label="클리어 가능한 텍스트 필드"
    labelOption="sustain"
    help="값을 입력 후, 오른쪽 clear 버튼을 눌러보세요. onClear가 실행돼요."
    placeholder="Placeholder"
    onClear={() => {
      window.alert("clear");
    }}
  />
</div>
```

### 비밀번호 형태로 사용하기

`TextField.Password` 컴포넌트는 비밀번호와 같은 민감한 정보를 안전하게 입력받는 컴포넌트예요. 기본적으로 입력값이 마스킹되어 있어 다른 사람이 내용을 확인할 수 없도록 보호하고, 필요에 따라 입력값을 표시하거나 숨길 수 있는 버튼도 제공해요. 비밀번호 입력 중 실수를 줄이고 사용자가 내용을 검토할 수 있는 선택지를 제공하기 때문에, 보안과 편리함을 모두 충족할 수 있어요. 이 컴포넌트를 사용하면 사용자가 안심하고 중요한 정보를 입력할 수 있는 환경을 조성할 수 있어요.

Editable Example

```tsx
<div>
  <TextField.Password
    variant="box"
    label="비밀번호 입력 필드"
    labelOption="sustain"
    help="콘솔창을 통해 visible 상태를 확인해보세요."
    placeholder="Placeholder"
    onVisibilityChange={(visible: boolean) => {
      alert(`visible: ${visible}`);
    }}
  />
  <TextField.Password
    variant="line"
    label="비밀번호 입력 필드"
    labelOption="sustain"
    help="콘솔창을 통해 visible 상태를 확인해보세요."
    placeholder="Placeholder"
    onVisibilityChange={(visible: boolean) => {
      alert(`visible: ${visible}`);
    }}
  />
</div>
```

### 버튼으로 사용하기

`TextField.Button` 컴포넌트는 입력 필드와 유사한 형태를 가지면서도 클릭 가능한 버튼으로, 사용자가 특정 작업을 수행할 수 있도록 돕는 컴포넌트예요. 기본적으로 입력 필드처럼 보이지만, 실제로는 `<button>` 엘리먼트를 사용하여 사용자가 값을 선택하거나 작업을 트리거할 수 있는 인터페이스를 제공해요. 이 컴포넌트는 입력 필드와 비슷한 UI를 유지하면서도 클릭 가능한 액션을 제공하여, 사용자가 직관적으로 작업을 수행할 수 있도록 해줘요.

Editable Example

```tsx
<div>
  <TextField.Button
    variant="box"
    label="버튼이 있는 텍스트 필드"
    labelOption="sustain"
    help="입력 필드를 눌러보세요."
    placeholder="Button"
    onClick={() => window.alert("click")}
  />
  <TextField.Button
    variant="line"
    label="버튼이 있는 텍스트 필드"
    labelOption="sustain"
    help="입력 필드를 눌러보세요."
    placeholder="Button"
    onClick={() => window.alert("click")}
  />
</div>
```

### 인터페이스

#### TextFieldPublicProps

TextField 컴포넌트의 공통 속성을 정의해요.

| 속성            | 기본값  | 타입                                                                                                                           |
| --------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------- |
| **disabled**    | `false` | `false`                                                                                                                        | `true`텍스트 필드의 비활성화 여부를 나타내요. |
| **prefix**      | `-`     | `string`텍스트 필드의 앞에 위치할 문자열을 설정해요.                                                                           |
| **suffix**      | `-`     | `string`텍스트 필드의 뒤에 위치할 문자열을 설정해요.                                                                           |
| **right**       | `-`     | `React.ReactNode`텍스트 필드의 오른쪽에 위치할 컴포넌트를 설정해요.                                                            |
| **placeholder** | `-`     | `string`텍스트 필드의 플레이스홀더를 설정해요.                                                                                 |
| **format**      | `-`     | `{ transform: (value: string) => string; reset?: (formattedValue: string) => string; }`특정 형식으로 변환하기 위한 설정이에요. |

#### TextFieldProps

TextFieldPublic 컴포넌트를 확장하여 제작했어요. TextFieldPublic 컴포넌트의 모든 속성을 사용할 수 있어요.

| 속성              | 기본값   | 타입                                                                                                                                       |
| ----------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **variant\***     | `-`      | `"box"`                                                                                                                                    | `"line"`                                                                                                              | `"big"` | `"hero"`텍스트 필드의 형태를 선택해요. - `box`: 기본 형태의 사각형 스타일 - `line`: 입력 필드 아래에 선만 표시되는 스타일 - `big`: 텍스트가 강조되는 큰 스타일 - `hero`: 사용자의 시선을 끌기에 좋은 대형 스타일 |
| **label**         | `-`      | `string`텍스트 필드의 위쪽 라벨이에요.                                                                                                     |
| **labelOption**   | `appear` | `"appear"`                                                                                                                                 | `"sustain"`라벨 표시 옵션을 설정해요. - `appear`: value가 있을 때만 label이 보여요. - `sustain`: 항상 label이 보여요. |
| **help**          | `-`      | `React.ReactNode`텍스트 필드의 아래쪽 도움말이에요.                                                                                        |
| **hasError**      | `false`  | `false`                                                                                                                                    | `true`에러 상태 여부를 나타내요.                                                                                      |
| **paddingTop**    | `-`      | `string`                                                                                                                                   | `number`텍스트 필드의 위쪽 패딩이에요.                                                                                |
| **paddingBottom** | `-`      | `string`                                                                                                                                   | `number`텍스트 필드의 아래쪽 패딩이에요.                                                                              |
| **value**         | `-`      | `string`                                                                                                                                   | `number`제어된 입력 값이에요.                                                                                         |
| **defaultValue**  | `-`      | `string`기본 입력 값이에요.                                                                                                                |
| **onFocus**       | `-`      | `(event: React.FocusEvent<HTMLInputElement, Element>) => void`포커스 이벤트 핸들러예요. 이 핸들러는 입력 필드가 포커스를 받을 때 호출돼요. |
| **onBlur**        | `-`      | `(event: React.FocusEvent<HTMLInputElement, Element>) => void`블러 이벤트 핸들러예요. 이 핸들러는 입력 필드가 포커스를 잃을 때 호출돼요    |
| **onChange**      | `-`      | `(event: React.ChangeEvent<HTMLInputElement>) => void`변경 이벤트 핸들러예요. 이 핸들러는 입력 필드의 값이 변경될 때마다 호출돼요.         |

#### TextFieldButtonProps

TextFieldPublic 컴포넌트를 확장하여 제작했어요. TextFieldPublic 컴포넌트의 모든 속성을 사용할 수 있어요.

| 속성      | 기본값                                                                    | 타입                                                                        |
| --------- | ------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| **right** | `<Icon name="icon-arrow-down-mono" color={adaptive.grey400} size={24} />` | `React.ReactNode``TextFieldButton` 컴포넌트의 오른쪽에 위치할 컴포넌트예요. |

#### TextFieldClearableProps

`TextField` 컴포넌트를 확장하여 제작했어요. `TextField` 컴포넌트의 `right` 속성을 제외한 속성을 가져요.

| 속성        | 기본값 | 타입                                                                                  |
| ----------- | ------ | ------------------------------------------------------------------------------------- |
| **onClear** | `-`    | `() => void``TextFieldClearable` 컴포넌트의 클리어 버튼을 클릭하면 호출되는 함수예요. |

#### TextFieldPasswordProps

`TextField` 컴포넌트를 확장하여 제작했어요. `TextField` 컴포넌트의 `right` 속성을 제외한 속성을 가져요.

| 속성                   | 기본값 | 타입                                                                         |
| ---------------------- | ------ | ---------------------------------------------------------------------------- |
| **onVisibilityChange** | `-`    | `(visible: boolean) => void`비밀번호 표시 여부를 변경하면 호출되는 함수예요. |
