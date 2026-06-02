# @pacto/types

Pacto 프론트엔드 도메인 타입을 관리하는 패키지다.

Swagger 응답 타입과 화면에서 사용하는 도메인 타입은 분리한다. 화면은 서버 응답 타입이 아니라 이 패키지의 프론트엔드 타입에 의존한다.

## 책임

```txt
User 타입
Campaign 타입
Mission 타입
Wallet 타입
Escrow 타입
권한/상태 enum 타입
```

## 원칙

```txt
서버 필드명이 바뀌어도 화면 타입은 최대한 안정적으로 유지한다.
상태값은 status-policy.md와 일치해야 한다.
```
