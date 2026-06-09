# TextField / Split Text Field

출처: https://tossmini-docs.toss.im/tds-mobile/components/TextField/split-text-field/

TextFieldSplitTextField

### SplitTextField

`SplitTextField` 컴포넌트는 입력 데이터를 여러 필드로 나누어 입력받을 때 사용돼요. 사용자가 각 부분에 초점을 맞추어 입력할 수 있어, 주민등록번호처럼 고정된 형식의 데이터를 정확히 입력하도록 도와줘요. 이를 사용하면 입력 흐름이 직관적이고 편리해지며, 사용자 오류를 줄일 수 있어요.

이 컴포넌트는 `RRN13`과 `RRNFirst7` 두 가지 컴포넌트를 제공해요. "RNN"은 Resident Registration Number를 의미하고, 뒤에 붙은 숫자는 자릿수를 의미해요. `SplitTextField.RRN13` 컴포넌트는 주민등록번호 13자리를 입력받는 필드이고, `SplitTextField.RRNFirst7` 컴포넌트는 주민등록번호 앞 7자리를 입력받는 필드예요.

### 주민번호 13자리 사용하기

`SplitTextField.RRN13` 컴포넌트는 주민등록번호 13자리를 두 개의 입력 필드로 나누어 입력받을 수 있어요. 생년월일과 뒷자리를 분리하면, 입력 과정이 더 간단하고 명확해져요. 앞자리 6자리를 모두 입력하면 자동으로 뒷자리 입력 필드로 포커스가 이동하여 더욱 편리하게 입력할 수 있어요.

Editable Example

```tsx
<div>
  <SplitTextField.RRN13 variant="box" label="주민등록번호" help="주민등록번호를 입력해주세요." />
  <SplitTextField.RRN13 variant="line" label="주민등록번호" help="주민등록번호를 입력해주세요." />
  <SplitTextField.RRN13 variant="big" label="주민등록번호" help="주민등록번호를 입력해주세요." />
  <SplitTextField.RRN13 variant="hero" label="주민등록번호" help="주민등록번호를 입력해주세요." />
</div>
```

### 주민번호 뒷자리 마스킹 사용하기

`mask` 속성을 사용하면 주민등록번호 뒷자리를 마스킹 처리할 수 있어요. 기본값은 `true`로, 사용자의 민감한 정보를 보호하면서도 입력값의 유효성을 유지할 수 있어요. 반면, `mask={false}`로 설정하면 주민등록번호의 뒷자리가 마스킹 처리되지 않고 그대로 표시돼요. 이는 사용자가 입력한 내용을 확인해야 하는 상황에서 유용할 수 있지만, 개인정보 보호 측면에서는 주의가 필요해요.

Editable Example

```tsx
<div>
  <SplitTextField.RRN13
    variant="box"
    focused
    help="주민번호 뒷자리를 마스킹 처리해요."
    label="주민등록번호"
  />
  <SplitTextField.RRN13
    variant="box"
    help="주민번호 뒷자리를 마스킹 처리를 하지 않아요."
    label="주민등록번호"
    mask={false}
  />
</div>
```

### 주민번호 앞 7자리 사용하기

`SplitTextField.RRNFirst7` 컴포넌트는 주민등록번호의 앞 7자리(생년월일과 성별코드)만 입력받고 싶을 때 사용돼요. 예를 들어, 성인 인증처럼 기본적인 정보만 필요할 때 적합해요.

Editable Example

```tsx
<div>
  <SplitTextField.RRNFirst7
    variant="box"
    focused
    label="주민등록번호 (앞 7자리)"
    help="생년월일과 성별코드를 입력하세요."
  />
  <SplitTextField.RRNFirst7
    variant="line"
    label="주민등록번호 (앞 7자리)"
    help="생년월일과 성별코드를 입력하세요."
  />
  <SplitTextField.RRNFirst7
    variant="big"
    label="주민등록번호 (앞 7자리)"
    help="생년월일과 성별코드를 입력하세요."
  />
  <SplitTextField.RRNFirst7
    variant="hero"
    label="주민등록번호 (앞 7자리)"
    help="생년월일과 성별코드를 입력하세요."
  />
</div>
```

### 성별코드 마스킹 사용하기

`mask` 속성을 사용하면 주민등록번호 앞 7자리 중 성별코드만 마스킹 처리할 수 있어요. 기본값은 `false`로, 입력한 숫자가 그대로 표시돼요. `mask={true}`로 설정하면 성별코드가 마스킹 처리되어 표시돼요. 이는 보안이 필요한 상황에서 유용하게 사용할 수 있어요.

Editable Example

```tsx
<div>
  <SplitTextField.RRNFirst7
    variant="box"
    label="주민등록번호 (앞 7자리)"
    help="생년월일과 성별코드를 입력하세요."
    mask={true}
  />
  <SplitTextField.RRNFirst7
    variant="box"
    label="주민등록번호 (앞 7자리)"
    help="생년월일과 성별코드를 입력하세요."
    mask={false}
  />
</div>
```

### 분리된 입력 필드 설정하기

`SplitTextField` 컴포넌트의 각 필드는 `first`와 `second` 속성을 사용해 개별적으로 커스터마이즈할 수 있어요. 각 필드는 `TextField` 컴포넌트의 `placeholder`, `disabled` 등의 주요 속성들을 사용할 수 있어요.

- `first`: 첫 번째 입력 필드의 속성을 설정해요. 예를 들어 생년월일 입력 시 'YYMMDD' 형식의 `placeholder`를 설정할 수 있어요.
- `second`: 두 번째 입력 필드의 속성을 설정해요. first 필드와 다른 형식의 `placeholder`를 설정할 수 있어요.

Editable Example

```tsx
<div>
  <SplitTextField.RRN13
    variant="box"
    label="주민등록번호"
    help="주민등록번호를 입력해주세요."
    first={{
      placeholder: "앞 6자리",
    }}
    second={{
      placeholder: "뒷 7자리",
    }}
  />
  <SplitTextField.RRNFirst7
    variant="box"
    label="주민등록번호 (앞 7자리)"
    help="생년월일과 성별코드를 입력하세요."
    first={{
      placeholder: "YYMMDD",
    }}
    second={{
      placeholder: "*",
    }}
  />
</div>
```

### 인터페이스

#### SplitTextFieldProps

`SplitTextField` 컴포넌트의 공통 속성을 정의해요.

| 속성              | 기본값           | 타입                                                           |
| ----------------- | ---------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **variant\***     | `-`              | `"box"`                                                        | `"line"`                                                                                                                                                                                                     | `"big"` | `"hero"`텍스트 필드의 형태를 선택해요. - `box`: 기본 형태의 사각형 스타일 - `line`: 입력 필드 아래에 선만 표시되는 스타일 - `big`: 텍스트가 강조되는 큰 스타일 - `hero`: 사용자의 시선을 끌기에 좋은 대형 스타일 |
| **label\***       | `'주민등록번호'` | `string`텍스트 필드의 위쪽 라벨이에요.                         |
| **labelOption\*** | `-`              | `"appear"`                                                     | `"sustain"`텍스트 필드의 라벨 표시 옵션을 설정해요. `variant`가 'box'일 때 'sustain', 그렇지 않으면 'appear'이 기본값이에요. - `appear`: value가 있을 때만 label이 보여요. - `sustain`: 항상 label이 보여요. |
| **help**          | `-`              | `React.ReactNode`텍스트 필드의 아래쪽 도움말이에요.            |
| **paddingTop**    | `-`              | `string`                                                       | `number`텍스트 필드의 위쪽 패딩이에요.                                                                                                                                                                       |
| **paddingBottom** | `-`              | `string`                                                       | `number`텍스트 필드의 아래쪽 패딩이에요.                                                                                                                                                                     |
| **hasError**      | `false`          | `false`                                                        | `true`에러 상태 여부를 나타내요.                                                                                                                                                                             |
| **first**         | `-`              | `"TextFieldPublicProps"`첫 번째 텍스트 필드의 속성을 설정해요. |
| **second**        | `-`              | `"TextFieldPublicProps"`두 번째 텍스트 필드의 속성을 설정해요. |
| **focused**       | `-`              | `false`                                                        | `true`텍스트 필드의 포커스 여부를 나타내요.                                                                                                                                                                  |

#### RRN13TextFieldProps

SplitTextField 컴포넌트를 확장하여 제작했어요. SplitTextField 컴포넌트의 모든 속성을 사용할 수 있어요.

| 속성     | 기본값 | 타입    |
| -------- | ------ | ------- | ------------------------------------------------------------------------- |
| **mask** | `true` | `false` | `true``RRN13TextField` 컴포넌트 주민번호 뒷자리의 마스킹 여부를 나타내요. |

#### RRNFirst7TextFieldProps

SplitTextField 컴포넌트를 확장하여 제작했어요. SplitTextField 컴포넌트의 모든 속성을 사용할 수 있어요.

| 속성     | 기본값  | 타입    |
| -------- | ------- | ------- | ----------------------------------------------------------------------------- |
| **mask** | `false` | `false` | `true``RRNFirst7TextField` 컴포넌트 주민번호 뒷자리의 마스킹 여부를 나타내요. |
