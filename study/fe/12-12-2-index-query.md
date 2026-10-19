# 12-2 · Index & Query

> **go 정리본** · 원문: `frontend-dev-notes/docs/curriculum/week-12-database/12-2-index-query.md` (**원문 stub — 본문 비어 있음; FE·면접 관점 Index/Query 보강**) · active: [`active_fe.md`](../../log/_common/sessions/active_fe.md)

## 학습 할 일

- [x] 인덱스(B-tree)가 검색·정렬·조인에 미치는 영향
- [x] 복합 인덱스·leftmost prefix 규칙
- [x] Full table scan vs index scan·EXPLAIN 감각
- [x] WHERE / ORDER BY / JOIN 컬럼과 인덱스 설계
- [x] SELECT *·과도한 컬럼이 성능·캐시에 주는 부담
- [x] offset vs keyset(cursor)와 인덱스 정렬
- [x] Covering index·N+1(12-3)과의 연결
- [x] **통과선** — 인덱스·slow query·페이지네이션 30초

## 정리

### 한 줄

DB는 **인덱스(B-tree 등)** 로 `WHERE`·`ORDER BY`·`JOIN` 비용을 줄이고, **복합 인덱스는 왼쪽 prefix**부터 쓰이며, FE가 느끼는 **목록·필터 API 지연**은 흔히 **missing index·N+1·offset deep page**에서 온다.

### 핵심

- **인덱스**: 정렬된 키 구조 — equality/range search O(log n). **없으면 full scan** — row 많을수록 API TTFB↑.
- **복합 인덱스 `(a,b,c)`**: `a`, `a+b`, `a+b+c` 조건에 유리. **`b`만** filter면 인덱스 못 탈 수 있음(leftmost).
- **ORDER BY + WHERE**: filter 컬럼 + sort 컬럼 순서로 인덱스 설계하면 **filesort** 감소. cursor 페이지네이션은 `(created_at, id)` 인덱스와 짝.
- **JOIN**: FK 쪽 **indexed** 아니면 nested loop 비용 폭증 — ORM relation lazy가 N+1(12-3)과 합쳐져 “목록 API 2초”.
- **SELECT ***: 필요 컬럼만 — wide row는 메모리·네트워크·ORM hydration↑. JSON blob 컬럼까지 끌어오면 특히 큼.
- **EXPLAIN**: `Seq Scan` vs `Index Scan`, `rows estimate` — 백엔드와 협업 시 “이 API slow query log” 근거.

### 흐름

```
목록 API GET /orders?status=open&sort=-createdAt
  → WHERE status = ? ORDER BY created_at DESC LIMIT 20
  → 인덱스 (status, created_at) 있으면 range + ordered
  → offset page=5000 → DB는 앞 5000 row skip (느림) → cursor after=id 권장 (11-2)

[ORM]
  orders.map(o => o.user)  // N+1 if not eager
  → include/join or batch IN query
```

### 차이·함정

| 대비 | 한 줄 |
|------|--------|
| index vs full scan | row 수·선택도 |
| unique vs non-unique index | 제약 + lookup |
| index too many | write slowdown·storage |
| offset vs keyset | deep page 성능 |
| DB index vs Redis cache | 영구 구조 vs hot read 사본 |

### 실무 연결

- React Query **staleTime**으로 느린 API를 숨기기 전에 — Network waterfall에서 **같은 list API가 수십 번**이면 N+1/GraphQL dataloader 이슈 의심.
- 필터 UI(08-2 URL)가 바뀔 때마다 **다른 WHERE** — 백엔드에 “이 filter combo index 있나?” 질문 가능.
- Supabase/Postgres: `EXPLAIN ANALYZE` — FE는 결과만 받지만 **pagination spec**을 cursor로 밀 수 있음.

### 면접 한 방

- **Q:** 인덱스가 뭐고, 복합 인덱스는 언제 깨지나?
- **답:** lookup·sort를 빠르게 하는 B-tree 같은 구조다. 복합 (a,b)는 a 조건이 있을 때 활용되고 b만으로는 leftmost 규칙 때문에 못 탈 수 있다. API가 느리면 full scan, missing index, N+1, 큰 offset을 의심한다.

### 통과선 스크립트

1. 인덱스 = WHERE/ORDER/JOIN 가속.
2. 복합 = leftmost prefix.
3. deep offset 나쁨 → keyset/cursor.
4. SELECT 필요 컬럼만.
5. N+1은 쿼리 수, 인덱스는 쿼리당 cost — 둘 다 FE latency.
6. 원문 stub — Index & Query는 위 FE 협업·면접 축으로 정리.
