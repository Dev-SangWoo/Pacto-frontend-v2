# Switch

출처: https://tossmini-docs.toss.im/tds-mobile/components/switch/

Switch

### Switch

`Switch` 컴포넌트는 두 가지 상태(예: 켜짐/꺼짐, 활성화/비활성화)를 전환할 수 있는 UI 요소예요. 단순한 토글 방식으로 동작해서 주로 설정이나 옵션을 활성화하거나 비활성화할 때 사용해요. 체크박스와 비슷하지만 더 직관적인 시각적 요소로 사용자가 상태 변화를 쉽게 인식할 수 있어요.

### 사용 예제

### 상태

스위치의 켜짐과 꺼짐 상태를 표현하려면 `checked` 속성을 사용하세요. 상태를 바꾸려면 `onChange` 속성과 함께 사용하세요.

Editable Example

```tsx
<div style={{ display: "flex", gap: "8px" }}>
  <Switch checked />
  <Switch checked={false} />
</div>
```

### 비활성화하기

스위치를 비활성화하려면 `disabled` 속성을 사용하세요. 비활성화된 스위치는 사용자가 클릭할 수 없고, 시각적으로도 비활성화된 상태임을 나타내요.

Editable Example

```tsx
<div style={{ display: "flex", gap: "8px" }}>
  <Switch checked disabled />
  <Switch checked={false} disabled />
</div>
```

### 터치 애니메이션 끄기

스위치를 클릭했을 때 나타나는 터치 애니메이션을 제외하려면 `hasTouchEffect` 속성에 `false`를 넣어주세요.

Editable Example

```tsx
function Effects() {
  const [checked, setChecked] = React.useState(true);

  return (
    <Switch hasTouchEffect={false} checked={checked} onChange={() => setChecked((prev) => !prev)} />
  );
}
```

### 접근성

`Switch` 컴포넌트는 다음과 같이 기본적인 접근성을 제공해요. 덕분에 별도의 설정 없이도 기본적으로 사용자의 접근성을 고려한 형태의 `Switch` 컴포넌트를 제공할 수 있어요.

| 속성                                                                                                                            | 접근성 효과                                      | 설명                                                                          |
| ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ | ----------------------------------------------------------------------------- |
| `role="switch"` (opens in a new tab) (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/switch_role)        | 스크린 리더에서 "전환" 또는 "스위치"로 인식해요. | 스위치 역할을 명확히 전달해서 사용자가 상호작용 가능하다는 것을 알 수 있어요. |
| `aria-checked` (opens in a new tab) (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-checked)   | 켜짐 또는 꺼짐 상태를 스크린 리더에서 읽어줘요.  | `checked` 상태에 따라 `aria-checked` 상태가 자동으로 업데이트돼요.            |
| `aria-disabled` (opens in a new tab) (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-disabled) | 비활성화된 상태를 스크린 리더에서 읽어줘요.      | 스위치가 비활성화되어 상호작용할 수 없다는 정보를 스크린 리더로 알려줘요.     |

```tsx
<Switch checked={isOn} onChange={handleToggle} />
```

### 추가로 지원해야 하는 접근성

개발자가 접근성을 고려해서 다음 내용을 추가로 작업해야 할 때도 있어요. 예를 들어 `Switch` 컴포넌트를 나타내는 텍스트가 컴포넌트 바깥에 따로 있거나, 아이콘만 있다면 컴포넌트에서 제공하는 기본적인 접근성으로는 충분하지 않아요.

이럴 때는 반드시 `aria-label` 속성을 사용해서 `Switch` 컴포넌트의 역할을 설명해야 해요. 이때, 레이블에는 "스위치", "켜짐", "꺼짐" 같은 정보는 포함하지 않아요. 이러한 정보는 컴포넌트의 상태를 나타낼 뿐, 역할을 설명하지 않기 때문이에요.

```tsx
<Switch
 checked={isDarkMode}
 onChange={toggleDarkMode}
 aria-label="다크 모드"
/>
<Switch
 checked={isNotificationsEnabled}
 onChange={toggleNotifications}
 aria-label="알림 설정"
/>
```

### 인터페이스

#### SwitchProps

| 속성               | 기본값  | 타입                                                                                                                            |
| ------------------ | ------- | ------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **checked**        | `-`     | `false`                                                                                                                         | `true``Switch` 컴포넌트의 켜짐과 꺼짐 상태를 표현해요. 상태를 바꾸려면 `onChange`에 적절한 핸들러를 전달해야 해요. (예: `setState`) |
| **disabled**       | `false` | `false`                                                                                                                         | `true`이 값이 `true`일 때 컴포넌트가 비활성화돼요.                                                                                  |
| **name**           | `-`     | `string`input 태그의 `name` 속성을 결정해요.                                                                                    |
| **hasTouchEffect** | `true`  | `false`                                                                                                                         | `true`이 값이 `false`라면 클릭했을 때 터치 애니메이션이 실행되지 않아요.                                                            |
| **onChange**       | `-`     | `(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void``Switch` 컴포넌트가 켜지거나 꺼질 때 실행되는 함수예요. |
| **onClick**        | `-`     | `(event: React.MouseEvent<HTMLInputElement, MouseEvent>) => void``Switch` 컴포넌트를 클릭했을 때 실행되는 함수예요.             |
