# Menu

출처: https://tossmini-docs.toss.im/tds-mobile/components/menu/

Menu

### Menu

`Menu` 컴포넌트는 드롭다운 메뉴를 사용해 항목을 선택하거나 상태를 확인하고 바꿀 수 있어요. 여러 옵션을 정리해서 보여주고, 설정 화면이나 작업 리스트처럼 다양한 곳에서 활용할 수 있어요. 버튼 클릭이나 입력과 같은 사용자 동작에 따라 메뉴를 열고 닫을 수 있어서 동적인 UI를 쉽게 구현할 수 있어요.

편집첫 번째 메뉴두 번째 메뉴세 번째 메뉴

### 드롭다운 메뉴 만들기

드롭다운 메뉴를 사용하면 여러 옵션을 깔끔하게 나열하고, 사용자가 원하는 항목을 선택할 수 있어요. `Menu.Dropdown` 컴포넌트를 사용해서 기본 드롭다운 메뉴를 생성할 수 있어요.

- `Menu.Dropdown`: 드롭다운 컨테이너 역할을 해요. `header` 속성을 사용해서 메뉴 상단에 제목을 추가할 수 있어요.
- `Menu.Header`: 메뉴의 제목을 나타내요. 드롭다운 상단에 위치하며, 제목 텍스트를 전달할 수 있어요.
- `Menu.DropdownItem`: 드롭다운 메뉴의 개별 항목을 나타내요. 사용자가 선택할 수 있는 옵션을 정의해요.

Editable Example

```tsx
<Menu.Dropdown header={<Menu.Header>편집</Menu.Header>}>
  <Menu.DropdownItem>첫 번째 메뉴</Menu.DropdownItem>
  <Menu.DropdownItem>두 번째 메뉴</Menu.DropdownItem>
  <Menu.DropdownItem>세 번째 메뉴</Menu.DropdownItem>
</Menu.Dropdown>
```

### 아이콘이 포함된 메뉴 사용하기

아이콘이 포함된 메뉴는 옵션의 의미를 시각적으로 강조할 때 유용해요. 예를 들어, 설정 항목이나 상태를 시각적으로 구분해야 할 때 사용해요. `Menu.DropdownItem`의 `right` 속성에 `Menu.DropdownIcon`을 전달해서 각 항목에 아이콘을 추가할 수 있어요.

Editable Example

```tsx
<Menu.Dropdown header={<Menu.Header>편집</Menu.Header>}>
  <Menu.DropdownItem right={<Menu.DropdownIcon name="icon-setting-mono" />}>
    첫 번째 메뉴
  </Menu.DropdownItem>
  <Menu.DropdownItem right={<Menu.DropdownIcon name="icon-setting-mono" />}>
    두 번째 메뉴
  </Menu.DropdownItem>
  <Menu.DropdownItem right={<Menu.DropdownIcon name="icon-setting-mono" />}>
    세 번째 메뉴
  </Menu.DropdownItem>
</Menu.Dropdown>
```

### 체크박스 메뉴 추가하기

`Menu.DropdownCheckItem` 컴포넌트를 사용하면 체크박스를 포함한 메뉴를 만들 수 있어요. `checked`와 `onCheckedChange` 속성을 사용해서 각 항목의 상태를 제어할 수 있어요.

Editable Example

```tsx
<Menu.Dropdown header={<Menu.Header>편집</Menu.Header>}>
  <Menu.DropdownCheckItem checked={false}>첫 번째 메뉴</Menu.DropdownCheckItem>
  <Menu.DropdownCheckItem checked={true}>두 번째 메뉴</Menu.DropdownCheckItem>
  <Menu.DropdownCheckItem checked={false}>세 번째 메뉴</Menu.DropdownCheckItem>
</Menu.Dropdown>
```

### 트리거로 메뉴 열기

`Menu.Trigger` 컴포넌트는 사용자 동작에 따라 메뉴를 열고 닫고 싶을 때 사용해요. `open` 속성을 동적으로 제어해서 버튼 클릭이나 사용자 입력에 따라 상태를 변경할 수 있어요. 예를 들어, "옵션" 버튼을 눌렀을 때 드롭다운 메뉴를 보여주고, 외부를 클릭했을 때 닫히는 동작을 구현할 수 있어요.

`placement` 속성을 사용해서 메뉴가 열리는 위치를 설정할 수 있어요. `placement` 속성의 값은 메뉴가 열릴 방향과 정렬 방식을 결정해요.

- 방향 설정: `top`, `bottom`, `left`, `right`를 사용하여 메뉴가 기준 컴포넌트의 상하좌우 중 어느 방향에 열릴지 결정해요.
- 정렬 설정: `start`와 `end`를 사용하여 메뉴의 시작과 끝을 기준 컴포넌트의 왼쪽 또는 오른쪽에 맞출 수 있어요. 정렬을 지정하지 않으면 중앙에 정렬돼요.

사용 가능한 `placement` 값은 방향과 정렬 조합으로 구성돼요.

- `top`, `top-start`, `top-end`: 메뉴가 상단에 열려요.
- `bottom`, `bottom-start`, `bottom-end`: 메뉴가 하단에 열려요.
- `left`, `left-start`, `left-end`: 메뉴가 왼쪽에 열려요.
- `right`, `right-start`, `right-end`: 메뉴가 오른쪽에 열려요.

Editable Example

```tsx
function Trigger() {
  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = React.useState(1);
  return (
    <Menu.Trigger
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      placement="bottom"
      dropdown={
        <Menu.Dropdown header={<Menu.Header>항목을 선택하세요</Menu.Header>}>
          <Menu.DropdownCheckItem
            checked={checked === 1}
            onCheckedChange={(checked: boolean) => (checked ? setChecked(1) : null)}
          >
            첫 번째 메뉴
          </Menu.DropdownCheckItem>
          <Menu.DropdownCheckItem
            checked={checked === 2}
            onCheckedChange={(checked: boolean) => (checked ? setChecked(2) : null)}
          >
            두 번째 메뉴
          </Menu.DropdownCheckItem>
          <Menu.DropdownCheckItem
            checked={checked === 3}
            onCheckedChange={(checked: boolean) => (checked ? setChecked(3) : null)}
          >
            세 번째 메뉴
          </Menu.DropdownCheckItem>
        </Menu.Dropdown>
      }
    >
      <Button>클릭해보세요</Button>
    </Menu.Trigger>
  );
}
```

### 인터페이스

#### MenuDropdownProps

| 속성       | 기본값 | 타입                                                                                                 |
| ---------- | ------ | ---------------------------------------------------------------------------------------------------- |
| **header** | `-`    | `React.ReactNode`드롭다운의 헤더를 정의하는 속성이에요. 주로 `Menu.Header` 컴포넌트와 함께 사용해요. |

#### MenuDropdownItemProps

| 속성         | 기본값 | 타입                                                                                                                                         |
| ------------ | ------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| **left**     | `-`    | `React.ReactNode`드롭다운 아이템 왼쪽에 표시할 컴포넌트예요. 체크박스를 표시하려면 `Menu.DropdownCheckItem` 컴포넌트를 사용하는 것이 좋아요. |
| **right**    | `-`    | `React.ReactNode`드롭다운 아이템 오른쪽에 표시할 컴포넌트예요. 아이콘을 표시하려면 `Menu.DropdownIcon` 컴포넌트를 사용하는 것이 좋아요.      |
| **children** | `-`    | `React.ReactNode`메뉴 아이템에 들어가는 컴포넌트예요.                                                                                        |

#### MenuDropdownCheckedItemProps

| 속성                | 기본값 | 타입                                                                 |
| ------------------- | ------ | -------------------------------------------------------------------- | --------------------------------- |
| **checked**         | `-`    | `false`                                                              | `true`체크박스의 상태를 나타내요. |
| **onCheckedChange** | `-`    | `(checked: boolean) => void`체크 상태가 변경될 때 호출되는 함수예요. |

#### MenuTriggerProps

| 속성            | 기본값           | 타입                                                                                                 |
| --------------- | ---------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ---------- | -------- | ------------ | -------------- | ------------- | --------------- | -------------- | ---------------- | ----------- | -------------------------------------------------------------------- |
| **open**        | `-`              | `false`                                                                                              | `true`메뉴의 열림을 제어하는 상태예요. 이 속성을 사용하려면 `onOpen`과 `onClose`도 함께 전달해서 제어 컴포넌트로 설정해야 해요. |
| **defaultOpen** | `-`              | `false`                                                                                              | `true`초기 열림 상태예요.                                                                                                       |
| **children**    | `-`              | `React.ReactNode`메뉴를 제어하는 트리거 컴포넌트를 정의할 수 있어요.                                 |
| **dropdown**    | `-`              | `React.ReactNode``open` 되었을 때 보여지게 될 컴포넌트예요. `Menu.Dropdown` 컴포넌트를 활용해주세요. |
| **placement**   | `'bottom-start'` | `"top"`                                                                                              | `"right"`                                                                                                                       | `"bottom"` | `"left"` | `"left-end"` | `"left-start"` | `"right-end"` | `"right-start"` | `"bottom-end"` | `"bottom-start"` | `"top-end"` | `"top-start"`Trigger를 기준으로 메뉴가 열리는 위치를 정할 수 있어요. |
| **onOpen**      | `-`              | `() => void`메뉴가 열릴 때 호출되는 함수예요. 전달하지 않을 경우, uncontrolled component로 동작해요. |
| **onClose**     | `-`              | `() => void`메뉴가 닫힐 때 호출되는 함수예요. 전달하지 않을 경우, uncontrolled component로 동작해요. |
