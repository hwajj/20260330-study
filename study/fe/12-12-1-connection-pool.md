# 12-1 · 연결 & 커넥션 풀

> **go 정리본** · 원문: `frontend-dev-notes/docs/curriculum/week-12-database/12-1-connection-pool.md` · active: [`active_fe.md`](../../log/_common/sessions/active_fe.md)

## 학습 할 일

- [x] DB 커넥션 생성 비용·풀 재사용
- [x] 최대 연결 수·풀 고갈 증상
- [x] 연결 수 ≠ 동시 사용자 수
- [x] Supabase session(5432) vs transaction(6543) pooler
- [x] HMR·중복 인스턴스로 로컬 고갈
- [x] 반환 누락·싱글턴 풀·graceful shutdown
- [x] **실무:** Serverless/Edge에서 풀 함정
- [x] **통과선** — 풀·고갈·session/transaction 30초

## 정리

### 한 줄

DB **커넥션 생성은 비싸서 풀**로 재사용하지만 **최대 슬롯**을 넘기면 대기·실패하고, 슬롯은 **동시 쿼리** 기준이며 Supabase는 **session vs transaction pooler**로 모드가 갈린다.

### 핵심

- **커넥션**: TCP+auth+세션 상태. 요청마다 new connection은 느리고 DB `max_connections`를 깎는다.
- **풀**: 미리 N개 만들어 빌려주고 **반환**. `pool max` 초과 → queue 또는 `too many connections` / Supabase `Max client connections`.
- **고갈 원인**: (1) leak — finally에서 release 안 함 (2) **풀 인스턴스 중복** — dev HMR마다 새 Pool (3) 장시간 트랜잭션 점유 (4) serverless **인스턴스마다 풀** → DB에 connection 폭증.
- **사용자 15명 ≠ 15 connection**: 짧은 쿼리는 슬롯 재사용. **동시에 DB 붙어 있는 작업 수**가 한계.
- **Supabase**: **5432 session mode** — prepared statement·트랜잭션 세션 유지 OK. **6543 transaction mode** — 쿼리 단위로 연결 빌림, serverless/Prisma serverless에 자주 씀. 잘못 고르면 “prepared statement already exists” 등.

### 흐름

```
요청 → pool.acquire() → query → release()
  (슬롯 없음) → wait timeout / error

[로컬 dev 함정]
  hot reload → new PrismaClient × N → each opens pool → EMAXCONN
  → global singleton in dev, disconnect on shutdown
```

### 차이·함정

| 대비 | 한 줄 |
|------|--------|
| pool size vs DB max | 앱 인스턴스 수 × pool ≤ DB 한도 |
| session vs transaction pooler | 세션 sticky vs 쿼리 단위 |
| ORM pool vs pg pool | 설정 위치·default max |
| connection leak vs slow query | 슬롯 안 돌아옴 vs 오래 점유 |
| PgBouncer vs app pool | 중간 프록시 vs 앱 내 |

### 실무 연결

- Next.js API route / serverless: **connection per invocation** 이슈 — transaction pooler, `@vercel/postgres`, 또는 Data API.
- FE 체감: API **간헐 503/timeout** — DB pool wait인지 Network 탭만으로는 모름; 서버 로그 `timeout acquiring connection`.
- Supabase 슬롯 노트: 무료 tier max client — **풀 max를 작게** + pooler URL.

### 면접 한 방

- **Q:** 커넥션 풀은 왜 쓰고, 고갈되면?
- **답:** 연결 생성 비용을 줄이려고 연결을 재사용한다. 최대 개수를 넘으면 새 요청이 대기하거나 실패한다. 사용자 수 제한이 아니라 동시 점유 슬롯 제한이고, leak·HMR 중복 풀·긴 트랜잭션이 흔한 원인이다.

### 통과선 스크립트

1. 풀 = 재사용 + max cap.
2. 고갈 = leak / duplicate pool / long tx.
3. 동시 connection ≠ MAU.
4. session 5432 vs transaction 6543 한 줄.
5. serverless = pooler 또는 connectionless 전략.
