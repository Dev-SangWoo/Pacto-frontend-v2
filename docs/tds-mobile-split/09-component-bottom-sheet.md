# Bottom Sheet

출처: https://tossmini-docs.toss.im/tds-mobile/components/bottom-sheet/

Bottom Sheet

### BottomSheet

`BottomSheet` 컴포넌트는 화면의 하단에서 슬라이드 되어 나타나는 패널이에요. 페이지를 벗어나지 않고 사용자에게 추가적인 상세 설명을 보여주거나, 특정 액션을 유도하고 싶을 때 유용해요.

### 사용 예제

### 제목 붙이기

`BottomSheet`에 제목을 붙이려면 `header` 속성을 사용하세요. 일반적으로 `BottomSheet.Header` 컴포넌트를 넣어 사용해요.

Editable Example

```tsx
function WithHeader() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div style={{ padding: 16 }}>
      <Button onClick={() => setIsOpen(true)}>BottomSheet 열기</Button>
      <BottomSheet
        // 문서를 위해 사용된 prop이에요.
        UNSAFE_disableFocusLock
        open={isOpen}
        onClose={() => setIsOpen(false)}
        // @here 이렇게 제목을 넣을 수 있어요!
        header={<BottomSheet.Header>저는 BottomSheet 제목이에요.</BottomSheet.Header>}
      >
        <Post.Paragraph>저는 BottomSheet 내용이에요</Post.Paragraph>
      </BottomSheet>
    </div>
  );
}
```

### 부제목 붙이기

`BottomSheet`에 제목을 붙이려면 `headerDescription` 속성을 사용하세요. 일반적으로 `BottomSheet.HeaderDescription` 컴포넌트를 넣어 사용해요.

Editable Example

```tsx
function WithHeaderDescription() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div style={{ padding: 16 }}>
      <Button onClick={() => setIsOpen(true)}>BottomSheet 열기</Button>

      <BottomSheet
        // 문서를 위해 사용된 prop이에요.
        UNSAFE_disableFocusLock
        open={isOpen}
        onClose={() => setIsOpen(false)}
        header={<BottomSheet.Header>저는 BottomSheet 제목이에요.</BottomSheet.Header>}
        // @here 이렇게 부제목을 넣을 수 있어요!
        headerDescription={
          <BottomSheet.HeaderDescription>
            저는 BottomSheet 부제목이에요
          </BottomSheet.HeaderDescription>
        }
      >
        <Post.Paragraph>저는 BottomSheet 내용이에요</Post.Paragraph>
      </BottomSheet>
    </div>
  );
}
```

### CTA 붙이기

`BottomSheet`에 CTA를 붙이려면 `cta` 속성을 사용하세요. 일반적으로 `BottomSheet.CTA` 컴포넌트를 넣어 사용해요.

Editable Example

```tsx
function WithCta() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div style={{ padding: 16 }}>
      <Button onClick={() => setIsOpen(true)}>BottomSheet 열기</Button>

      <BottomSheet
        // 문서를 위해 사용된 prop이에요.
        UNSAFE_disableFocusLock
        open={isOpen}
        onClose={() => setIsOpen(false)}
        header={<BottomSheet.Header>저는 BottomSheet 제목이에요.</BottomSheet.Header>}
        // @here 이렇게 하단에 CTA를 넣을 수 있어요!
        cta={<BottomSheet.CTA onClick={() => setIsOpen(false)}>확인</BottomSheet.CTA>}
      >
        <Post.Paragraph>저는 BottomSheet 내용이에요</Post.Paragraph>
      </BottomSheet>
    </div>
  );
}
```

### Double CTA 붙이기

`BottomSheet.DoubleCTA` 컴포넌트를 사용하면 버튼이 좌우로 나누어진 형태의 CTA도 사용할 수 있어요.

Editable Example

```tsx
function WithDoubleCta() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div style={{ padding: 16 }}>
      <Button onClick={() => setIsOpen(true)}>BottomSheet 열기</Button>

      <BottomSheet
        // 문서를 위해 사용된 prop이에요.
        UNSAFE_disableFocusLock
        open={isOpen}
        onClose={() => setIsOpen(false)}
        header={<BottomSheet.Header>저는 BottomSheet 제목이에요.</BottomSheet.Header>}
        cta={
          // @here
          <BottomSheet.DoubleCTA
            leftButton={
              <Button variant="weak" color="dark" onClick={() => setIsOpen(false)}>
                닫기
              </Button>
            }
            rightButton={<Button onClick={() => setIsOpen(false)}>확인</Button>}
          />
        }
      >
        <Post.Paragraph>저는 BottomSheet 내용이에요</Post.Paragraph>
      </BottomSheet>
    </div>
  );
}
```

### 선택지 보여주기

`BottomSheet.Select` 컴포넌트를 사용하면 사용자에게 선택지를 보여줄 수 있어요.

Editable Example

```tsx
function WithSelect() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [favoritePet, setFavoritePet] = React.useState<"강아지" | "고양이" | "토끼" | null>(null);

  return (
    <>
      <UtilComponents direction="column" style={{ padding: 16 }}>
        <Button onClick={() => setIsOpen(true)}>BottomSheet 열기</Button>
        {isNotNil(favoritePet) && (
          <>
            <Spacing size={16} />
            <Paragraph.Text>저는 {favoritePet}를 가장 좋아해요</Paragraph.Text>
          </>
        )}

        <BottomSheet
          // 문서를 위해 사용된 prop이에요.
          UNSAFE_disableFocusLock
          open={isOpen}
          onClose={() => setIsOpen(false)}
          header={<BottomSheet.Header>좋아하는 동물을 선택해주세요.</BottomSheet.Header>}
        >
          <BottomSheet.Select
            onChange={(e) => {
              const selected = e.target.value as "강아지" | "고양이" | "토끼" | null;

              setFavoritePet(selected);
              setIsOpen(false);
            }}
            value={favoritePet ?? undefined}
            options={["강아지", "고양이", "토끼"].map((pet) => ({
              name: pet,
              value: pet,
            }))}
          />
        </BottomSheet>
      </UtilComponents>
    </>
  );
}
```

### 페이지 포커스 유지하기

`BottomSheet`이 열린 상태에서도 페이지에 포커스를 유지해야 하는 경우에는 `UNSAFE_disableFocusLock` 속성을 사용하세요. `disableDimmer` 속성을 함께 사용해서 딤 해제도 할 수 있어요.

Editable Example

```tsx
function FocusLockDisabled() {
  const [selected, setSelected] = React.useState<number>(0);

  return (
    <>
      {Array.from({ length: 20 }).map((_, idx) => {
        const isSelected = selected === idx;

        return (
          <ListRow
            key={`list-item-${idx}`}
            style={{
              background: adaptive.grey100,
            }}
            contents={
              <ListRow.Text
                color={isSelected ? adaptive.blue600 : adaptive.grey800}
                fontWeight={isSelected ? "bold" : "regular"}
              >
                {idx + 1}번 아이템
              </ListRow.Text>
            }
            border="indented"
            onClick={() => setSelected(idx)}
          />
        );
      })}

      <BottomSheet
        // @here 포커스 락과 딤을 해제하여 페이지 포커스를 유지해요
        UNSAFE_disableFocusLock
        disableDimmer
        open
        header={<BottomSheet.Header>{selected + 1}번 아이템</BottomSheet.Header>}
      >
        <Post.Paragraph>
          {`${selected + 1}번 아이템에 대한 설명이에요.\n설명을 보면서 동시에 리스트를 둘러볼 수 있어요!`}
        </Post.Paragraph>
      </BottomSheet>
    </>
  );
}
```

### 인터페이스

#### BottomSheetProps

| 속성                            | 기본값          | 타입                                                                                                                                                                                                                                                                                          |
| ------------------------------- | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **open\***                      | `-`             | `false`                                                                                                                                                                                                                                                                                       | `true``BottomSheet`이 열렸는지 여부예요.                                                                                                                                                                                                                                                                                                                      |
| **className**                   | `-`             | `string``BottomSheet` 영역의 className을 설정해요.                                                                                                                                                                                                                                            |
| **dimmerClassName**             | `-`             | `string`딤 영역에 전달할 className이에요.                                                                                                                                                                                                                                                     |
| **disableDimmer**               | `false`         | `false`                                                                                                                                                                                                                                                                                       | `true`이 값이 `true`일 때 딤 영역을 표시하지 않아요.                                                                                                                                                                                                                                                                                                          |
| **hasTextField**                | `false`         | `false`                                                                                                                                                                                                                                                                                       | `true`이 값이 `true`일 때 `BottomSheet`을 키보드 위로 올려줘요. `BottomSheet` 내부에 키보드를 활성화할 수 있는 컴포넌트가 있을 때 사용되어요.                                                                                                                                                                                                                 |
| **header**                      | `-`             | `any``BottomSheet` 제목 영역이에요.                                                                                                                                                                                                                                                           |
| **headerDescription**           | `-`             | `any``BottomSheet` 부제목 영역이에요.                                                                                                                                                                                                                                                         |
| **cta**                         | `-`             | `React.ReactNode``BottomSheet` CTA 영역이에요.                                                                                                                                                                                                                                                |
| **children**                    | `-`             | `React.ReactNode``BottomSheet`의 메인 컨텐츠 영역이에요.                                                                                                                                                                                                                                      |
| **ariaLabelledBy**              | `-`             | `string`HTML의 `aria-labelledby` 속성에 전달할 값이에요. 스크린 리더가 `BottomSheet`의 제목을 읽을 때 사용할 요소의 `ID`를 지정해요. `ID`를 전달하여 `BottomSheet`의 목적을 설명해요.참고↗ (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby)       |
| **ariaDescribedBy**             | `-`             | `string`HTML의 `aria-labelledby` 속성에 전달할 값이에요. 스크린 리더가 BottomSheet의 상세 내용을 읽을 때 사용할 요소의 `ID`를 지정해요. `ID`를 전달하여 BottomSheet의 자세한 설명을 제공해요.참고↗ (https://developer.mozilla.org/ko/docs/Web/Accessibility/ARIA/Attributes/aria-describedby) |
| **disableChildrenDragging**     | `false`         | `false`                                                                                                                                                                                                                                                                                       | `true`BottomSheet 내부 컨텐츠의 드래그 동작을 제어해요. 이 값이 `true`라면 컨텐츠 영역에서 드래그해도 BottomSheet이 움직이지 않아요.                                                                                                                                                                                                                          |
| **expandBottomSheet**           | `false`         | `false`                                                                                                                                                                                                                                                                                       | `true``BottomSheet` 내부에 스크롤이 있을 때, `BottomSheet`을 위로 10px 드래그하면 화면 전체 높이로 확장되도록 설정해요.                                                                                                                                                                                                                                       |
| **maxHeight**                   | `-`             | `number``BottomSheet`이 확장되지 않았을 때의 `BottomSheet` 높이를 설정해요. 단위는 `px`예요.                                                                                                                                                                                                  |
| **expandedMaxHeight**           | `-`             | `number``BottomSheet`이 확장되었을 때의 높이를 지정해요. 단위는 `px`예요.                                                                                                                                                                                                                     |
| **expandBottomSheetWhenScroll** | `false`         | `false`                                                                                                                                                                                                                                                                                       | `true``expandBottomSheet`와 `expandBottomSheetWhenScroll`이 모두 `true`일 때, `BottomSheet` 내부에서 스크롤을 내리면 `BottomSheet`이 화면 전체 높이로 확장돼요.                                                                                                                                                                                               |
| **onClose**                     | `-`             | `() => void``BottomSheet`이 닫힐 때 실행할 함수예요.                                                                                                                                                                                                                                          |
| **onExpanded**                  | `-`             | `() => void``BottomSheet`이 확장되었을 때 호출되는 함수예요.                                                                                                                                                                                                                                  |
| **onHandlerTouchStart**         | `-`             | `(event: React.TouchEvent) => void``BottomSheet`의 상단의 핸들러에 터치가 시작되었을 때 실행되는 함수예요.                                                                                                                                                                                    |
| **onHandlerTouchEnd**           | `-`             | `(event: React.TouchEvent) => void``BottomSheet`의 상단의 핸들러에 터치가 끝났을 때 실행되는 함수예요.                                                                                                                                                                                        |
| **onDimmerClick**               | `-`             | `() => void`딤 영역을 클릭 했을 때 실행되는 함수예요.                                                                                                                                                                                                                                         |
| **onEntered**                   | `-`             | `() => void``BottomSheet`이 열리기 시작할 때 실행되는 함수예요.                                                                                                                                                                                                                               |
| **onExited**                    | `-`             | `() => void``BottomSheet`이 닫히고 완전히 사라진 후 실행되는 함수예요.                                                                                                                                                                                                                        |
| **portalContainer**             | `document.body` | `HTMLElement``BottomSheet`을 렌더링할 HTML 요소를 지정해요. `UNSAFE_disabledFocusLock`이 `true`일 때는 무시돼요.                                                                                                                                                                              |
| **ctaContentGap**               | `34px`          | `number``BottomSheet`컴포넌트 내부의 `BottomSheet.CTA` 컴포넌트와 `children`의 간격을 조정해요. `BottomSheet.Gradient`의 높이와 동일해요.                                                                                                                                                     |
| **UNSAFE_disableFocusLock**     | `-`             | `false`                                                                                                                                                                                                                                                                                       | `true``BottomSheet`이 열려도 기존 페이지에 포커스 잠금과 스크린 리더 잠금이 적용되지 않도록 설정해요. 이 속성을 사용하면 접근성 대응이 되지 않으므로 직접 접근성을 대응해야 해요.                                                                                                                                                                             |
| **UNSAFE_ignoreDimmerClick**    | `-`             | `false`                                                                                                                                                                                                                                                                                       | `true`바텀시트 외부의 어두운 배경을 클릭해도 `onClose`가 호출되지 않게 해요. **주의: 바텀시트 외부 영역 클릭 시 사용자의 액션을 취소하고 `BottomSheet` 컴포넌트가 닫히는 것이 권장되는 동작이에요.**                                                                                                                                                          |
| **UNSAFE_ignoreBackEvent**      | `-`             | `false`                                                                                                                                                                                                                                                                                       | `true`앱에서 제공하는 뒤로가기 이벤트를 무시할지 설정해요. `true`로 설정하면 뒤로가기 동작이 발생해도 바텀시트가 닫히지 않아요. **주의: 뒤로가기 동작 발생 시 사용자의 액션을 취소하고 바텀시트가 닫히는 것이 권장되는 동작이에요.** 이 API는 곧 지원이 중단될 수 있어요. 따라서 취소 동작을 구현하는 것이 기술적으로 어려운 상황에서만 이 속성을 사용하세요. |
| **a11yIncludeHeaderInScroll**   | `true`          | `false`                                                                                                                                                                                                                                                                                       | `true`더큰텍스트 160% 이상일 때, 헤더를 스크롤 영역에 포함합니다.                                                                                                                                                                                                                                                                                             |

#### BottomSheetHeaderProps

| 속성           | 기본값 | 타입                                                                                                                  |
| -------------- | ------ | --------------------------------------------------------------------------------------------------------------------- |
| **children\*** | `-`    | `React.ReactNode`제목 영역에 전달할 자식 요소에요. 문자열을 넣으면 `h1` 태그로 감싸고, `t4` 텍스트 스타일을 적용해요. |
| **className**  | `-`    | `string`제목 영역에 전달할 `className`이에요.                                                                         |

#### BottomSheetHeaderDescriptionProps

| 속성           | 기본값 | 타입                                                                                             |
| -------------- | ------ | ------------------------------------------------------------------------------------------------ |
| **children\*** | `-`    | `React.ReactNode`부제목 영역에 전달할 자식 요소에요. 부제목은 기본적으로 `t6` 텍스트로 감싸져요. |
| **className**  | `-`    | `string`부제목 영역에 전달할 `className`이에요.                                                  |

#### BottomSheetSelectProps

| 속성               | 기본값 | 타입                                                                                                                                           |
| ------------------ | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| **options\***      | `-`    | `SelectOption[] (https://tossmini-docs.toss.im#SelectOption)`각 선택 옵션에 대한 정보예요.                                                     |
| **onChange\***     | `-`    | `(event: React.ChangeEvent<HTMLInputElement>) => void`값이 변경되었을 때 실행할 함수에요. 변경된 값은 `event.target.value`로 확인할 수 있어요. |
| **value**          | `-`    | `string`현재 선택된 값이에요.                                                                                                                  |
| **className**      | `-`    | `string`셀렉트 박스에 전달할 `className`이에요.                                                                                                |
| **animation**      | `true` | `false`                                                                                                                                        | `true``BottomSheet`이 열릴 때 슬라이드 업 애니메이션을 적용할 지 여부예요. |
| **animationDelay** | `-`    | `number`애니메이션이 활성화됐을 때, 애니메이션의 지연 시간을 설정해요. 단위는 밀리초(ms)예요.                                                  |

#### SelectOption

| 속성                      | 기본값 | 타입                                                                                    |
| ------------------------- | ------ | --------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| **name\***                | `-`    | `string`선택 옵션의 이름이에요. UI에 이 이름이 표시돼요.                                |
| **value\***               | `-`    | `string`선택 옵션의 값이에요. `onChange` 함수에서 `e.target.value`로 전달되는 값이에요. |
| **className**             | `-`    | `string`선택 옵션에 전달할 `className`이에요.                                           |
| **disabled**              | `-`    | `false`                                                                                 | `true`선택 옵션을 비활성화할지 여부에요.                     |
| **hideUnCheckedCheckBox** | `-`    | `false`                                                                                 | `true`옵션이 선택되지 않았을 때 체크박스를 숨길 지 여부에요. |
