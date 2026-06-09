# 시작하기

출처: https://tossmini-docs.toss.im/tds-mobile/start/

### TDS Mobile 시작하기

TDS Mobile 패키지를 사용하면 모바일 환경에서 다양한 UI 컴포넌트를 쉽게 적용할 수 있어요. 이 문서에서는 TDS Mobile을 프로젝트에 설치하고 사용하는 방법을 알려드려요.

### 1. 필수 패키지 설치하기

먼저, TDS Mobile을 사용하려면 관련된 패키지들을 설치해야 해요.

```tsx
npm install @toss/tds-mobile @toss/tds-mobile-ait @emotion/react@^11 react@^18 react-dom@^18
```

### 2. Provider 설정하기

TDS Mobile을 사용하려면, 프로젝트의 최상위를 `TDSMobileAITProvider`로 감싸야 해요. 이 컴포넌트는 TDS Mobile의 컴포넌트들이 올바르게 동작할 수 있도록 설정해 줘요.

```tsx
import { TDSMobileAITProvider } from "@toss/tds-mobile-ait";

function App({ Component, pageProps }) {
  return (
    <TDSMobileAITProvider>
      <Component {...pageProps} />
    </TDSMobileAITProvider>
  );
}
```

### 3. 사용하기

패키지 설치와 설정이 끝났다면, 이제 컴포넌트를 프로젝트에 불러와서 사용할 수 있어요. 예를 들어, `Button` 컴포넌트를 사용하려면 다음과 같이 코드를 작성하면 돼요.

```tsx
import { Button } from "@toss/tds-mobile";

const App = () => <Button>버튼</Button>;
```
