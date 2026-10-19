# SI 08 · JWT 로그인

> **go** · 플랜 단계 8

## 학습 할 일

- [x] `/auth/register` · `/auth/login` + BCrypt
- [x] Bearer 필터 (`JwtAuthFilter`)
- [x] 주문 API 보호
- [x] 통과선: 401/200 흐름 말 1분

## 진행

- register → accessToken
- 무토큰·위조 토큰 `GET /api/orders` → **401**
- 정상 Bearer → **200** 목록

## 정리

### 한 줄
로그인 성공 시 JWT를 주고, 이후 요청은 Bearer로 **누구인지**만 검증한다.

### 통과선 스크립트
1. register/login → token  
2. `Authorization: Bearer …` 없으면 401  
3. 위조 토큰도 401  
4. 유효 토큰이면 Principal(`AuthUser`)로 CRUD

## 메모

—

## 막힌 질문

—
