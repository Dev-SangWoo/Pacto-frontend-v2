# Board Row

출처: https://tossmini-docs.toss.im/tds-mobile/components/board-row/

Board Row

### Board Row

`BoardRow`는 제한된 공간에서 많은 정보를 깔끔하게 정리해 표시하는 컴포넌트예요. 주로 Q&A와 같은 정보를 표현할 때 사용하며, 펼쳐졌다 접히는 방식으로 정보를 보여주는 아코디언 컴포넌트 같은 역할을 해요.

- Q매도 환전이 무엇인가요?![image](https://static.toss.im/icons/svg/icon-arrow-right-mono.svg)

주식 거래가 실시간이 아니기 때문에, 가격이 변할 것에 대비하는 금액을 말해요. 이 금액은 수수료가 아니며, 주식 거래에 쓰이고 남으면 계좌로 환급돼요.

- Q토스포인트가 뭐예요?![image](https://static.toss.im/icons/svg/icon-arrow-right-mono.svg)

토스포인트는 토스의 혜택 서비스가 적립되는 마일리지형 선불전자지급 수단이에요.

- Q토스프라임이 무엇인가요?![image](https://static.toss.im/icons/svg/icon-arrow-right-mono.svg)

토스에서 아래의 혜택을 받아볼 수 있는 매월 5,900원의 정기 구독형 프리미엄 유료 서비스예요.

### 사용법

`BoardRow` 컴포넌트는 제목, 프리픽스, 아이콘, 그리고 콘텐츠 영역으로 구성돼요. 사용자는 제목 영역을 클릭하여 콘텐츠 영역을 열거나 닫을 수 있어요. 제목 옆의 프리픽스와 아이콘은 추가적인 정보나 상태를 시각적으로 표시하기 위해 사용해요.

Editable Example

```tsx
<BoardRow
  title="매도 환전이 무엇인가요?"
  prefix={<BoardRow.Prefix>Q</BoardRow.Prefix>}
  icon={<BoardRow.ArrowIcon />}
>
  <BoardRow.Text>
    주식 거래가 실시간이 아니기 때문에 가격이 변할 것에 대비하는 금액을 말해요.{" "}
  </BoardRow.Text>
</BoardRow>
```

### 패널 초기 열림 상태 제어하기

`initialOpened` 속성을 사용하면 패널이 처음 화면에 렌더링될 때, 기본적으로 열린 상태로 표시돼요. 즉, 사용자가 별도로 클릭하지 않아도 처음부터 콘텐츠 영역이 펼쳐져 있어요.

Editable Example

```tsx
<BoardRow
  initialOpened
  title="매도 환전이 무엇인가요"
  prefix={<BoardRow.Prefix>Q</BoardRow.Prefix>}
  icon={<BoardRow.ArrowIcon />}
>
  <BoardRow.Text>초기부터 콘텐츠 영역이 열려 있어요.</BoardRow.Text>
</BoardRow>
```

### 패널 열림/닫힘 제어하기

`isOpened` 속성과 `onOpen`, `onClose` 함수를 사용하면 컴포넌트 외부에서 패널의 열림/닫힘 상태를 직접 제어할 수 있어요. `isOpened`가 `true`면 패널이 열린 상태로, `false`면 닫힌 상태로 표시돼요. `onOpen`은 패널이 열릴 때 호출되는 함수이고, `onClose`는 패널이 닫힐 때 호출되는 함수예요. 이 속성과 함수들을 활용해서 패널의 상태를 외부에서 동적으로 제어할 수 있어요.

Editable Example

```tsx
function OpenClose() {
  const [isOpened, setIsOpened] = React.useState(false);
  return (
    <BoardRow
      title="매도 환전이 무엇인가요"
      isOpened={isOpened}
      onOpen={() => setIsOpened(true)}
      onClose={() => setIsOpened(false)}
      prefix={<BoardRow.Prefix>Q</BoardRow.Prefix>}
      icon={<BoardRow.ArrowIcon />}
    >
      <BoardRow.Text>
        주식 거래가 실시간이 아니기 때문에 가격이 변할 것에 대비하는 금액을 말해요.
      </BoardRow.Text>
    </BoardRow>
  );
}
```

### 콘텐츠 영역 채우기

`BoardRow`의 콘텐츠 영역에는 주로 `Post` 컴포넌트를 사용해요. `Post` 컴포넌트를 활용하면 깔끔하게 정리된 정보를 전달할 수 있어요.

Editable Example

```tsx
<BoardRow
  title="질문을 적어주세요."
  prefix={<BoardRow.Prefix>Q</BoardRow.Prefix>}
  icon={<BoardRow.ArrowIcon />}
  initialOpened
>
  <Post.Paragraph paddingBottom={24} typography="t6">
    주식 거래가 실시간이 아니기 때문에 가격이 변할 것에 대비하는 금액을 말해요.
  </Post.Paragraph>
  <Post.Ul paddingBottom={24} typography="t6">
    <Post.Li>
      대시를 붙이고 띄어쓰면 불렛을 쓸 수 있어요.
      <Post.Ul paddingBottom={24} typography="t6">
        <Post.Li>들여쓰려면 대시 앞에 〉를 입력해요.</Post.Li>
      </Post.Ul>
    </Post.Li>
  </Post.Ul>
</BoardRow>
```

간단한 문장을 사용할 때는 `BoardRow.Text`를 사용할 수 있어요. `BoardRow.Text`는 `Post.Paragraph`를 확장한 컴포넌트예요.

Editable Example

```tsx
<BoardRow
  title="질문을 적어주세요."
  prefix={<BoardRow.Prefix>Q</BoardRow.Prefix>}
  icon={<BoardRow.ArrowIcon />}
  initialOpened
>
  <BoardRow.Text>
    주식 거래가 실시간이 아니기 때문에 가격이 변할 것에 대비하는 금액을 말해요.
  </BoardRow.Text>
</BoardRow>
```

### 접근성

`BoardRow` 컴포넌트는 기본적으로 접근성을 지원하는 여러 속성을 포함하고 있어요. 이 속성들은 스크린 리더 사용자들이 컴포넌트를 명확하게 이해하고 상호작용할 수 있도록 도와줘요. 특히 컴포넌트에서 패널의 열림/닫힘 상태는 시각적으로만 나타나는 것이 아니라, 스크린 리더 사용자에게도 전달될 수 있도록 설계되었어요.

| 속성            | 접근성 효과                                     | 설명                                                         |
| --------------- | ----------------------------------------------- | ------------------------------------------------------------ |
| `<button>` 태그 | 스크린 리더가 버튼으로 인식해요.                | 사용자는 제목 영역이 클릭 가능한 버튼임을 알 수 있어요.      |
| `aria-expanded` | 패널이 열림/닫힘 상태를 스크린 리더가 알려줘요. | 사용자는 패널이 현재 열려 있는지 닫혀 있는지를 알 수 있어요. |

### 사용 방법 예시

```tsx
<BoardRow
  title="매도 환전이 무엇인가요?"
  isOpened={true} // 패널이 열린 상태로 시작, 자동으로 aria-expanded="true" 적용
  prefix={<BoardRow.Prefix>Q</BoardRow.Prefix>}
  icon={<BoardRow.ArrowIcon />}
>
  <BoardRow.Text>
    주식 거래가 실시간이 아니기 때문에 가격이 변할 것에 대비하는 금액을 말해요.
  </BoardRow.Text>
</BoardRow>
```

`BoardRow`는 스크린 리더 사용자들을 위한 `aria-expanded` 속성을 자동으로 추가하거나 제거해서 패널의 상태를 스크린 리더에 전달해요. 그래서 추가적인 접근성 설정을 하지 않아도 기본적인 상호작용을 보장할 수 있어요.

### 인터페이스

#### BoardRowProps

| 속성              | 기본값  | 타입                                                                                                                |
| ----------------- | ------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **title\***       | `-`     | `React.ReactNode`헤더 영역에 표시될 제목이에요.                                                                     |
| **initialOpened** | `false` | `false`                                                                                                             | `true`컴포넌트가 처음 렌더링될 때 열려 있을지 여부를 설정해요. `true`로 설정하면 콘텐츠가 처음부터 열려 있어요.                                                    |
| **isOpened**      | `false` | `false`                                                                                                             | `true`이 값이 `true`일 때 콘텐츠 영역이 열린 상태로 표현돼요. `BoardRow` 컴포넌트의 상태를 컴포넌트 외부에서 관리할 때, `onOpen`과 `onClose` 속성과 함께 사용해요. |
| **onOpen**        | `-`     | `() => void`콘텐츠 영역이 열릴 때 호출되는 함수예요.                                                                |
| **onClose**       | `-`     | `() => void`콘텐츠 영역이 닫힐 때 호출되는 함수예요.                                                                |
| **prefix**        | `-`     | `React.ReactNode`헤더 영역의 `title` 앞에 8px 간격으로 글자나 요소를 배치해요. 주로 `BoardRow.Prefix`를 사용해요.   |
| **icon**          | `-`     | `React.ReactNode`헤더 영역의 `title` 뒤에 표시할 아이콘이에요. 주로 `BoardRow.ArrowIcon`를 사용해요.                |
| **children**      | `-`     | `React.ReactNode`콘텐츠 영역에 표시될 내용이에요. 주로 `BoardRow.Text` 혹은 `Post` 컴포넌트로 감싼 요소를 사용해요. |
| **liAttributes**  | `-`     | `React.LiHTMLAttributes<HTMLLIElement>``li` 요소에 적용할 HTML 기본 속성들을 지정해요.                              |

#### BoardRowTextProps

| 속성           | 기본값 | 타입   |
| -------------- | ------ | ------ | ------- | ------- | ------- | ------ | ------- | ------- | ------- | ------ | ------- | ------ | ------- | ------- | ------ | -------- | ------ | -------- | ------ | -------- | ------------------------------------------------ |
| **typography** | `"t6"` | `"t1"` | `"st1"` | `"st2"` | `"st3"` | `"t2"` | `"st4"` | `"st5"` | `"st6"` | `"t3"` | `"st7"` | `"t4"` | `"st8"` | `"st9"` | `"t5"` | `"st10"` | `"t6"` | `"st11"` | `"t7"` | `"st12"` | `"st13"`텍스트의 타이포그래피 스타일을 지정해요. |

#### BoardRowPrefixProps

| 속성           | 기본값             | 타입                              |
| -------------- | ------------------ | --------------------------------- | ---------- | ------------ | --------------------------------- | ------ | ------- | ------- | ------- | ------ | ------- | ------ | ------- | ------- | ------ | -------- | ------ | -------- | ------ | -------- | ------------------------------------------------ |
| **typography** | `"st8"`            | `"t1"`                            | `"st1"`    | `"st2"`      | `"st3"`                           | `"t2"` | `"st4"` | `"st5"` | `"st6"` | `"t3"` | `"st7"` | `"t4"` | `"st8"` | `"st9"` | `"t5"` | `"st10"` | `"t6"` | `"st11"` | `"t7"` | `"st12"` | `"st13"`텍스트의 타이포그래피 스타일을 지정해요. |
| **fontWeight** | `"regular"`        | `"regular"`                       | `"medium"` | `"semibold"` | `"bold"`텍스트의 두께를 지정해요. |
| **color**      | `adaptive.blue500` | `string`텍스트의 색상을 지정해요. |

#### BoardRowIconProps

| 속성      | 기본값                    | 타입                              |
| --------- | ------------------------- | --------------------------------- |
| **name**  | `"icon-arrow-right-mono"` | `string`아이콘의 이름을 지정해요. |
| **color** | `adaptive.grey400`        | `string`아이콘의 색상을 지정해요. |
| **size**  | `24`                      | `number`아이콘의 크기를 지정해요. |
