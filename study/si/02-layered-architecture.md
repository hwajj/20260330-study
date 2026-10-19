# SI 02 · 레이어드 아키텍처

> **go** · 플랜 단계 2 · active: [`active_si.md`](../../log/_common/sessions/active_si.md)

## 학습 할 일

- [x] Controller(Route) → Service → Repository 역할 한 줄씩
- [x] nursing-hospital `GET /api/orders/counts` 요청 1건 추적
- [x] DTO/params가 어디서 만들어지는지 확인
- [x] FE는 계약 소비자, BE는 계약·상태·영속성 — 한 줄
- [x] 통과선: API 호출 순서 5칸 이내 그림

## 진행

- 추적: `nursing-hospital/server` — Express지만 Spring과 **같은 층**
  - Route: `server/src/routes/orders.ts` `GET /counts`
  - Service: `orders-service.ts` `getOrderCounts` (DB 상태→URL 상태 매핑)
  - Repository: `orders-repository.ts` `countByStatus` (SQL/Drizzle)
- 마운트: `app.ts` `app.use('/api/orders', authMiddleware, ordersRouter)`

## 정리

### 한 줄
레이어는 **HTTP 입구 / 비즈니스 규칙 / DB 접근**을 나누어 한 API를 따라가기 쉽게 한다.

### 핵심
- **Controller/Route**: 쿼리 파싱·상태코드·JSON — DB SQL 금지
- **Service**: 권한·매핑·집계 규칙 — `DB_TO_URL_STATUS` 같은 도메인 변환
- **Repository**: 영속성·쿼리만 — Service가 새 인스턴스/`this.db`로 호출
- FE `HttpClient`는 **계약 소비자**; BE는 **계약·인증 상태·영속성** 담당

### 통과선 스크립트 (5칸)

```
1 HTTP GET /api/orders/counts (+ auth)
2 Route: query→OrderCountParams, orderService 호출
3 Service: countByStatus + 상태 키 매핑 + all 합산
4 Repository: orders 테이블 GROUP BY status SQL
5 JSON statusCounts 응답
```

## 메모

—

## 막힌 질문

—
