# 11-4 · BFF · API Gateway

> **go 정리본** · 원문: `frontend-dev-notes/docs/curriculum/week-11-backend/11-4-bff-gateway.md` · active: [`active_fe.md`](../../log/_common/sessions/active_fe.md)

## 학습 할 일

- [x] Monolith vs MSA — 프론트 협업 관점
- [x] API Gateway — 진입·TLS·rate limit·라우팅
- [x] BFF — 채널별 aggregate·DTO
- [x] 브라우저 MSA 직접 호출 시 문제
- [x] Gateway vs BFF 역할 대비
- [x] 무거운 작업은 큐·비동기 후처리
- [x] **실무:** 화면 API가 “왜 이렇게 생겼는지” 설명
- [x] **통과선** — BFF·Gateway·aggregate 30초

## 정리

### 한 줄

MSA에서 브라우저가 서비스마다 직접 호출하면 **워터폴·CORS·인증·필드 불일치**가 나고, **BFF**가 화면 단위로 **aggregate**하며 **Gateway**는 공통 관문(라우팅·TLS·rate limit)을 담당한다 — 이름은 조직마다 다르지만 **프론트 전용 조립 계층**이 왜 생기는지가 핵심이다.

### 핵심

- **Monolith**: 한 배포에 여러 도메인 — FE는 보통 **한 API base**. 단순하나 팀·배포가 묶임.
- **MSA**: 서비스별 API — FE 입장 **여러 origin·스키마**. 상품+재고+리뷰를 각각 fetch하면 **RTT N배·에러 처리 분산**.
- **BFF**: “웹용 백엔드” — `/page/home` 한 방에 필요 데이터 조합, **웹 전용 필드**만 내려줌. 모바일 BFF는 별도일 수 있음.
- **API Gateway**: 외부 **단일 진입점** — 인증 검증, rate limit, path → 서비스 라우팅, TLS 종료. BFF **앞/뒤**에 둘 수 있고 역할 일부 겹칠 수 있음.
- **Aggregate**: N개 내부 호출을 서버에서 병렬/순차 후 **한 DTO** — FE는 단순 fetch + React Query key 하나.
- **비동기**: 트랜스코딩·메일·알림은 **큐/워커** — API는 `202 Accepted` + job id, FE는 polling/WebSocket(08-3).

### 흐름

```
브라우저
  → (TLS) API Gateway: auth, rate limit, /orders → order-svc
  → BFF(웹): GET /home → parallel [catalog, promo, user] → HomeDTO
  → React: single query

[안티패턴]
  브라우저 → catalog-svc, inventory-svc, review-svc (×3 CORS, ×3 token, waterfall)
```

### 차이·함정

| 대비 | 한 줄 |
|------|--------|
| Gateway vs BFF | 횡단 관문 vs UI 채널 API |
| BFF vs Monolith facade | 분리 배포 vs 모듈 내부 |
| GraphQL vs BFF REST | 스키마 유연 vs 팀 익숙 REST |
| sync aggregate vs CQRS | 한 응답 vs 읽기 모델 분리 |
| 502 at gateway | upstream/BFF down |

### 실무 연결

- FE **base URL 하나**(13-2 Nginx `/api`)가 Gateway/BFF 뒤를 가리키는 경우가 많 — same-origin으로 CORS 단순화.
- React Query: BFF endpoint 하나 = **queryKey 하나**, staleTime으로 홈 aggregate 재fetch 줄이기.
- Presigned upload(11-2)는 BFF가 sign URL만 주고 파일은 S3 직행 — BFF 대역폭 보호.

### 면접 한 방

- **Q:** BFF가 왜 필요한가? Gateway와 차이는?
- **답:** 클라이언트마다 필요한 데이터 shape가 다르고, 마이크로서비스를 브라우저가 직접 조합하면 지연·보안·CORS가 복잡해진다. BFF가 화면 단위로 모은다. Gateway는 공통 진입·라우팅·rate limit 같은 횡단 관심사고, BFF는 특정 UI를 위한 API 계층이다.

### 통과선 스크립트

1. MSA → FE는 다 API; BFF로 aggregate.
2. Gateway = 관문, BFF = 채널 DTO.
3. Monolith면 BFF 없어도 facade 모듈과 유사.
4. 무거운 작업 = 큐, API는 접수만.
5. same-origin `/api`와 BFF 관계.
