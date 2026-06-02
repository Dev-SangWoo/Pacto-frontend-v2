# @pacto/api

Pacto API client, service, adapter, mock handler를 관리하는 패키지다.

화면 컴포넌트는 API 원본 응답에 직접 접근하지 않고, 이 패키지의 service가 반환하는 프론트엔드 타입을 사용한다.

## 책임

```txt
HTTP client
인증 토큰 처리
API service
서버 응답 adapter
MSW mock handler
API error 변환
```

## 원칙

```txt
Swagger endpoint를 기준으로 service를 만든다.
서버 응답은 adapter에서 프론트 타입으로 변환한다.
느슨한 object 응답은 mock data로 먼저 보완한다.
```
