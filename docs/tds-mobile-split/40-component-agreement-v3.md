# Agreement / v3

출처: https://tossmini-docs.toss.im/tds-mobile/components/Agreement/v3/

AgreementV3

### AgreementV3

⚠️`AgreementV3`는 더 이상 사용되지 않아요. `AgreementV4`를 이용해 주세요.

`AgreementV3` 컴포넌트는 사용자의 동의를 받아야 하는 화면을 구성하기 위해 사용해요. 하지만 이 컴포넌트는 더 이상 유지보수되지 않으며, 최신 요구 사항을 반영한 `AgreementV4`가 역할을 대신해요.

약관 보기![약관 보기 ](https://static.toss.im/icons/svg/icon-arrow-right-mono.svg)

### 사용법

### 체크박스 없이 정보만 표시하는 항목

`AgreementV3.SingleField` 컴포넌트는 체크박스 없이 정보를 표시하는 단순한 동의 항목을 생성하는 컴포넌트예요.
추가 정보를 안내하거나, 약관 세부 내용으로 연결되는 링크에 주로 사용돼요.

Editable Example

```tsx
<div>
  <AgreementV3.SingleField type="medium-bold" arrowType="collapsible">
    이용약관
  </AgreementV3.SingleField>
  <AgreementV3.SingleField type="medium" arrowType="link">
    이용약관
  </AgreementV3.SingleField>
</div>
```

### 체크박스를 포함한 동의 항목

`AgreementV3.SingleCheckboxField` 컴포넌트는 체크박스를 포함한 동의 항목을 생성하는 컴포넌트예요. `necessity` 속성을 통해 필수 항목인지 선택 항목인지 구분할 수 있어요.

- `none`: 항목에 필수나 선택 표시가 없어요.
- `mandatory`: [필수] 라벨이 추가되며, 반드시 동의해야 하는 항목이에요.
- `optional`: [선택] 라벨이 추가되며, 사용자가 선택적으로 동의할 수 있는 항목이에요.

Editable Example

```tsx
<div>
  <AgreementV3.SingleCheckboxField type="medium">
    카드의 실제 소유자입니다
  </AgreementV3.SingleCheckboxField>
  <AgreementV3.SingleCheckboxField type="medium" arrowType="link" necessity="mandatory">
    카드의 실제 소유자입니다
  </AgreementV3.SingleCheckboxField>
  <AgreementV3.SingleCheckboxField type="medium" arrowType="collapsible" necessity="optional">
    카드의 실제 소유자입니다
  </AgreementV3.SingleCheckboxField>
</div>
```

### 여러 동의 항목을 그룹화하기

`AgreementV3.Group` 컴포넌트는 여러 동의 항목을 하나의 그룹으로 묶어주는 컴포넌트예요. 여러 항목을 논리적으로 구분하거나, 화면을 정리된 형태로 구성하고 싶을 때 유용해요. 그룹 안의 각각의 항목은 `AgreementV3.GroupItem`으로 생성하며, 항목이 많은 경우에도 시각적으로 깔끔하게 정리할 수 있어요.

이 컴포넌트는 여러 동의 항목을 가로로 정렬하며, 화면 너비가 좁아지거나 항목이 많아질 때는 자동으로 다음 줄로 넘어가요. 이를 통해 다양한 디바이스에서 일관된 사용자 경험을 제공할 수 있어요.

Editable Example

```tsx
<AgreementV3.Group indent={1}>
  <AgreementV3.GroupItem type="medium">동의합니다.</AgreementV3.GroupItem>
  <AgreementV3.GroupItem type="medium">동의합니다.</AgreementV3.GroupItem>
</AgreementV3.Group>
```

### 접었다 펼치는 동의 항목

`AgreementV3.CollapsibleGroup` 컴포넌트와 `AgreementV3.Collapsible` 컴포넌트는 긴 내용을 깔끔하게 정리하고 필요할 때만 내용을 펼쳐 볼 수 있도록 도와줘요. 약관이나 정책 설명이 길거나 동의 항목이 많아 화면이 복잡해질 우려가 있을 때 특히 유용해요. 이 기능은 기본 정보만 노출하고, 추가 내용은 사용자가 필요할 때 열람할 수 있도록 만들어 사용자 경험을 개선해요.

구현 방식은 `AgreementV3.CollapsibleGroup` 컴포넌트로 전체 영역을 감싸고, 실제로 접히고 펼쳐질 내용은 `AgreementV3.Collapsible` 컴포넌트로 구성해요. 안쪽에 `SingleCheckboxField`, `Group`과 같은 다른 컴포넌트를 자유롭게 중첩할 수 있어 다양한 형태의 동의 화면을 만들 수 있어요. 들여쓰기가 필요한 경우 각 컴포넌트의 `indent` 속성을 사용해서 시각적으로 구분할 수 있어요.

Editable Example

```tsx
<div>
  <AgreementV3.CollapsibleGroup defaultOpen={true}>
    <AgreementV3.SingleField type="medium" arrowType="collapsible">
      개인정보 수집 동의
    </AgreementV3.SingleField>

    <AgreementV3.Collapsible>
      <AgreementV3.SingleCheckboxField indent={1} type="medium" necessity="mandatory">
        동의해요 1-1
      </AgreementV3.SingleCheckboxField>
      <AgreementV3.SingleCheckboxField indent={1} type="medium" necessity="mandatory">
        동의해요 1-2
      </AgreementV3.SingleCheckboxField>
      <AgreementV3.CollapsibleGroup defaultOpen={true}>
        <AgreementV3.SingleField indent={3} type="medium" arrowType="collapsible">
          개인정보 수집 동의 group
        </AgreementV3.SingleField>
        <AgreementV3.Collapsible>
          <AgreementV3.Group indent={3}>
            <AgreementV3.GroupItem type="medium">동의해요 group item</AgreementV3.GroupItem>
            <AgreementV3.GroupItem type="medium">동의해요 group item</AgreementV3.GroupItem>
            <AgreementV3.GroupItem type="medium">동의해요 group item</AgreementV3.GroupItem>
          </AgreementV3.Group>
        </AgreementV3.Collapsible>
      </AgreementV3.CollapsibleGroup>
    </AgreementV3.Collapsible>
  </AgreementV3.CollapsibleGroup>
</div>
```

### 체크박스 버튼

`AgreementV3.Button` 컴포넌트는 전체 동의 기능을 제공하는 컴포넌트예요. 여러 동의 항목을 한 번에 모두 동의할 수 있는 버튼 형태의 UI를 제공해요. 체크박스를 포함하고 있어 사용자가 전체 동의를 클릭하면 시각적으로도 동의 상태를 확인할 수 있어요.

Editable Example

```tsx
<AgreementV3.Button
  inputType="checkbox"
  onCheckedChange={(checked) => console.log("전체 동의:", checked)}
>
  전체 동의하기
</AgreementV3.Button>
```

### 동의 항목 설명

`AgreementV3.Description` 컴포넌트는 동의 항목에 대한 부가 정보를 제공할 때 사용하는 컴포넌트예요. 작은 회색 글씨로 표시되며, 약관 세부 내용이나 참고 정보를 보여줄 때 적합해요.

Editable Example

```tsx
<div>
  <AgreementV3.SingleCheckboxField type="medium">
    개인정보 수집 및 이용 동의
  </AgreementV3.SingleCheckboxField>
  <AgreementV3.Description indent={1}>
    수집된 개인정보는 서비스 제공 목적으로만 사용됩니다.
  </AgreementV3.Description>
</div>
```

### 태그를 활용한 강조 표시

`AgreementV3.Tag` 컴포넌트는 동의 항목에 중요한 정보를 강조하거나 추가적인 메시지를 전달할 때 사용해요. 주요 키워드를 사용자가 빠르게 인식할 수 있도록 돕는 역할을 해요.

Editable Example

```tsx
<AgreementV3.SingleCheckboxField
  type="medium"
  rightAddon={<AgreementV3.Tag color="#3182f6">안심</AgreementV3.Tag>}
>
  개인정보 수집 및 이용 동의
</AgreementV3.SingleCheckboxField>
```

### 상호작용하기

`AgreementV3` 컴포넌트는 다양한 상호작용 이벤트를 제공하며, 주로 `AgreementSingleField`, `AgreementSingleCheckboxField`, 그리고 `AgreementGroupItem`에서 활용돼요.

이 컴포넌트들은 `arrowType` 속성을 사용하여 링크 이동이나 접기/펼치기 기능을 제공해요. 각 이벤트는 특정 상황에서 사용되며, 아래 표는 주요 이벤트와 그 사용 조건을 설명해요.

| 이벤트 이름       | 설명                                                | `arrowType`이 `none`일 때 | `arrowType`이 `none`이 아닐 때                  |
| ----------------- | --------------------------------------------------- | ------------------------- | ----------------------------------------------- |
| `onClick`         | 사용자가 컴포넌트의 주요 영역을 클릭할 때 실행돼요. | 전체 영역에서 사용돼요.   | Link, Collapse Area를 제외한 영역에서 사용돼요. |
| `onPressEnd`      | 사용자가 터치 영역을 눌렀다가 뗄 때 실행돼요.       | 전체 영역에서 사용돼요.   | Link, Collapse Area를 제외한 영역에서 사용돼요. |
| `onArrowClick`    | 화살표 아이콘을 클릭할 때 실행돼요.                 | 사용되지 않아요.          | Link, Collapse Area에서 사용돼요.               |
| `onArrowPressEnd` | 화살표 아이콘을 터치했다가 뗄 때 실행돼요.          | 사용되지 않아요.          | Link, Collapse Area에서 사용돼요.               |

체크 상태 변경 이벤트는 `AgreementV3.SingleCheckboxField`에서 `onCheckedChange`로, `AgreementV3.GroupItem`에서 `onChange`로 사용돼요. 이러한 이벤트를 적절히 활용하여 `AgreementV3` 컴포넌트의 상호작용을 더욱 풍부하게 만들 수 있어요.

Editable Example

```tsx
function AgreementEventExample() {
  const handleCheckedChange = (checked: boolean) => {
    console.log("Checkbox checked state:", checked);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Group item state changed:", event.target.checked);
  };

  const handleClick = () => {
    console.log("Main area clicked");
  };

  const handleArrowClick = () => {
    console.log("Arrow clicked");
  };

  return (
    <div>
      <AgreementV3.SingleCheckboxField
        type="medium"
        arrowType="link"
        onCheckedChange={handleCheckedChange}
        onClick={handleClick}
        onArrowClick={handleArrowClick}
      >
        Single Checkbox Field
      </AgreementV3.SingleCheckboxField>
      <AgreementV3.Group>
        <AgreementV3.GroupItem
          type="medium"
          arrowType="collapsible"
          onChange={handleChange}
          onClick={handleClick}
          onArrowClick={handleArrowClick}
        >
          Group Item
        </AgreementV3.GroupItem>
        <AgreementV3.GroupItem
          type="medium"
          arrowType="link"
          onChange={handleChange}
          onClick={handleClick}
          onArrowClick={handleArrowClick}
        >
          Group Item
        </AgreementV3.GroupItem>
      </AgreementV3.Group>
    </div>
  );
}
```

### 인터페이스

#### AgreementSingleFieldProps

| 속성                | 기본값  | 타입                                                                                                                                                               |
| ------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **type\***          | `-`     | `"big"`                                                                                                                                                            | `"medium"`                                                                           | `"medium-bold"`동의 항목의 크기와 스타일을 설정해요. - `medium`: 기본 크기에요. - `medium-bold`: 굵은 텍스트를 사용해요. - `big`: 더 큰 크기에요.                         |
| **arrowType**       | `none`  | `"none"`                                                                                                                                                           | `"link"`                                                                             | `"collapsible"`동의 항목 옆에 배치할 화살표 형태를 설정해요. - `none`: 화살표가 없어요. - `link`: 링크 형태의 화살표에요. - `collapsible`: 펼치기/접기 형태의 화살표에요. |
| **withBorder**      | `false` | `false`                                                                                                                                                            | `true`동의 항목 아래에 구분선을 표시해요.                                            |
| **indent**          | `0`     | `number`동의 항목의 동의 항목의 들여쓰기 값을 설정해요.                                                                                                            |
| **open**            | `false` | `false`                                                                                                                                                            | `true`동의 항목의 펼침 상태를 설정해요. `arrowType`이 `collapsible`일 때만 사용돼요. |
| **rightAddon**      | `-`     | `React.ReactNode`동의 항목 오른쪽에 추가할 수 있는 컴포넌트예요.                                                                                                   |
| **children**        | `-`     | `string`동의 항목의 내용이에요.                                                                                                                                    |
| **onClick**         | `-`     | `(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void``Link`, `Collapse` 영역을 제외한 모든 터치영역을 클릭했을 때 실행되는 콜백이에요.                   |
| **onArrowClick**    | `-`     | `(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void``Link`, `Collapse` 영역을 클릭했을 때 실행되는 콜백이에요. `arrowType`이 none이 아닐 경우 실행돼요. |
| **onPressEnd**      | `-`     | `() => void``Link`, `Collapse` 영역을 제외한 영역의 터치가 끝날 때 실행되는 콜백이에요.                                                                            |
| **onArrowPressEnd** | `-`     | `() => void``Link`, `Collapse` 영역의 터치가 끝날 때 실행되는 콜백이에요. `arrowType`이 `none`이 아닐 경우 실행돼요.                                               |

#### AgreementSingleCheckboxFieldProps

| 속성                | 기본값  | 타입                                                                                                                                                                          |
| ------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **type**            | `-`     | `"big"`                                                                                                                                                                       | `"medium"`                                                                             | `"medium-bold"`동의 항목의 크기와 스타일을 설정해요. - `medium`: 기본 크기에요. - `medium-bold`: 굵은 텍스트를 사용해요. - `big`: 더 큰 크기에요.                         |
| **arrowType**       | `none`  | `"none"`                                                                                                                                                                      | `"link"`                                                                               | `"collapsible"`동의 항목 옆에 배치할 화살표 형태를 설정해요. - `none`: 화살표가 없어요. - `link`: 링크 형태의 화살표에요. - `collapsible`: 펼치기/접기 형태의 화살표에요. |
| **withBorder**      | `-`     | `false`                                                                                                                                                                       | `true`동의 항목 아래에 구분선을 표시해요.                                              |
| **checked**         | `-`     | `false`                                                                                                                                                                       | `true`동의 항목의 체크 상태를 설정해요. controlled로 외부에서 상태를 제어할 수 있어요. |
| **necessity**       | `none`  | `"none"`                                                                                                                                                                      | `"optional"`                                                                           | `"mandatory"`동의 항목의 필수 여부를 설정해요. - `none`: 필수가 아니에요. - `optional`: 선택이 가능해요. - `mandatory`: 필수에요.                                         |
| **indent**          | `0`     | `number`동의 항목의 들여쓰기 값을 설정해요.                                                                                                                                   |
| **open**            | `false` | `false`                                                                                                                                                                       | `true`동의 항목의 펼침 상태를 설정해요. `arrowType`이 `collapsible`일 때만 사용돼요.   |
| **rightAddon**      | `-`     | `React.ReactNode`동의 항목 오른쪽에 추가할 수 있는 컴포넌트예요.                                                                                                              |
| **children**        | `-`     | `string`동의 항목의 내용이에요.                                                                                                                                               |
| **onCheckedChange** | `-`     | `(checked: boolean) => void`동의 항목의 체크 상태가 변경될 때 호출되는 함수에요.                                                                                              |
| **onClick**         | `-`     | `(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void``Link`, `Collapse` 영역을 제외한 모든 터치영역을 클릭했을 때 실행되는 콜백이에요.                              |
| **onArrowClick**    | `-`     | `(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void``Link`, `Collapse` 영역의 화살표를 클릭했을 때 실행되는 콜백이에요. `arrowType`이 `none`이 아닐 경우 실행돼요. |
| **onPressEnd**      | `-`     | `() => void``Link`, `Collapse` 영역을 제외한 영역의 터치가 끝날 때 실행되는 콜백이에요.                                                                                       |
| **onArrowPressEnd** | `-`     | `() => void``Link`, `Collapse` 영역의 터치가 끝날 때 실행되는 콜백이에요. `arrowType`이 `none`이 아닐 경우 실행돼요.                                                          |

#### AgreementGroupProps

| 속성           | 기본값 | 타입                                                                                             |
| -------------- | ------ | ------------------------------------------------------------------------------------------------ |
| **children\*** | `-`    | `React.ReactNode`그룹 내부에 들어갈 컴포넌트들이에요. 주로 `GroupItem` 컴포넌트와 함께 사용돼요. |
| **indent**     | `0`    | `number`동의 항목의 들여쓰기 값을 설정해요.                                                      |

#### AgreementGroupItemProps

| 속성                | 기본값  | 타입                                                                                                                                                                          |
| ------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **type\***          | `-`     | `"big"`                                                                                                                                                                       | `"medium"`                                                                           | `"medium-bold"`동의 항목의 크기와 스타일을 설정해요. - `medium`: 기본 크기에요. - `medium-bold`: 굵은 텍스트를 사용해요. - `big`: 더 큰 크기에요.                         |
| **arrowType**       | `none`  | `"none"`                                                                                                                                                                      | `"link"`                                                                             | `"collapsible"`동의 항목 옆에 배치할 화살표 형태를 설정해요. - `none`: 화살표가 없어요. - `link`: 링크 형태의 화살표에요. - `collapsible`: 펼치기/접기 형태의 화살표에요. |
| **checked**         | `-`     | `false`                                                                                                                                                                       | `true`체크 상태를 설정해요. controlled로 외부에서 상태를 제어할 수 있어요.           |
| **open**            | `false` | `false`                                                                                                                                                                       | `true`동의 항목의 펼침 상태를 설정해요. `arrowType`이 `collapsible`일 때만 사용돼요. |
| **rightAddon**      | `-`     | `React.ReactNode`동의 항목의 오른쪽에 추가할 수 있는 컴포넌트예요.                                                                                                            |
| **children**        | `-`     | `string`동의 항목의 내용이에요.                                                                                                                                               |
| **onChange**        | `-`     | `(event: React.ChangeEvent<HTMLInputElement>) => void`동의 항목의 체크 상태가 변경될 때 호출되는 함수에요.                                                                    |
| **onClick**         | `-`     | `(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void``Link`, `Collapse` 영역을 제외한 모든 터치영역을 클릭했을 때 실행되는 콜백이에요.                              |
| **onArrowClick**    | `-`     | `(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void``Link`, `Collapse` 영역의 화살표를 클릭했을 때 실행되는 콜백이에요. `arrowType`이 `none`이 아닐 경우 실행돼요. |
| **onPressEnd**      | `-`     | `() => void``Link`, `Collapse` 영역을 제외한 영역의 터치가 끝날 때 실행되는 콜백이에요.                                                                                       |
| **onArrowPressEnd** | `-`     | `() => void``Link`, `Collapse` 영역의 터치가 끝날 때 실행되는 콜백이에요. `arrowType`이 `none`이 아닐 경우 실행돼요.                                                          |

#### AgreementCollapsibleGroupProps

| 속성            | 기본값 | 타입                                                                                                                                                              |
| --------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| **open**        | `-`    | `false`                                                                                                                                                           | `true``CollapsibleGroup` 컴포넌트의 펼침 상태를 설정해요. controlled로 외부에서 상태를 제어할 수 있어요.           |
| **defaultOpen** | `-`    | `false`                                                                                                                                                           | `true``CollapsibleGroup` 컴포넌트의 초기 펼침 상태를 설정해요. uncontrolled로 사용할 때 초기값을 설정할 수 있어요. |
| **children**    | `-`    | `React.ReactNode``CollapsibleGroup` 컴포넌트 내부에 들어갈 컴포넌트들이에요. 주로 `SingleField`, `SingleCheckboxField`, `Collapsible` 컴포넌트들과 함께 사용돼요. |
| **onChange**    | `-`    | `(open: boolean) => void``CollapsibleGroup` 컴포넌트의 펼침 상태가 변경될 때 호출되는 함수에요.                                                                   |

#### AgreementCollapsibleProps

| 속성         | 기본값 | 타입                                                                                                                                                   |
| ------------ | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------- |
| **open**     | `-`    | `false`                                                                                                                                                | `true``Collapsible` 컴포넌트의 펼침/접힘 상태를 제어해요. |
| **children** | `-`    | `React.ReactNode``Collapsible` 컴포넌트 내부에 들어갈 컴포넌트들이에요. 주로 `SingleField`, `SingleCheckboxField`, `Group` 컴포넌트들과 함께 사용돼요. |

#### AgreementButtonProps

| 속성           | 기본값       | 타입                                                    |
| -------------- | ------------ | ------------------------------------------------------- | --------------------------------------------- |
| **children\*** | `-`          | `React.ReactNode`버튼 내용으로 들어갈 컴포넌트들이에요. |
| **inputType**  | `'checkbox'` | `"checkbox"`                                            | `"radio"`input 태그의 `type` 속성을 설정해요. |
| **size**       | `24`         | `number``Checkbox` 컴포넌트의 크기를 설정해요.          |

#### AgreementDescriptionProps

| 속성         | 기본값 | 타입                                                    |
| ------------ | ------ | ------------------------------------------------------- |
| **indent**   | `0`    | `number`설명의 들여쓰기 값을 설정해요.                  |
| **children** | `-`    | `React.ReactNode`설명 내용으로 들어갈 컴포넌트들이에요. |

#### AgreementTagProps

| 속성           | 기본값 | 타입                                                    |
| -------------- | ------ | ------------------------------------------------------- |
| **children\*** | `-`    | `React.ReactNode`태그 내용으로 들어갈 컴포넌트들이에요. |
| **color**      | `-`    | `string`태그의 텍스트 색상을 설정해요.                  |
