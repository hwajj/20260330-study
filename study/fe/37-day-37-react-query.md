# Day 37 · TanStack Query (React Query)

> **go 정리본** · 원문: `frontend-dev-notes/docs/curriculum/week-05-react-rendering/day-37-react-query.md` · active: [`active_fe.md`](../../log/_common/sessions/active_fe.md)

## 학습 할 일

- [x] day-37 원문 — queryKey·staleTime·gcTime·invalidate·background refetch
- [x] HTTP 캐시(Day5) vs RQ 서버 상태 캐시 **역할 분리**
- [x] 뮤테이션 후 안 바뀜 → key/invalidate 진단
- [x] **주말** shared `adaptServiceResponse` README 읽기만
- [x] unpackResponse vs adaptServiceResponse 한 줄 차이
- [x] **차이·함정** — fresh 스킵 vs HTTP 304 / hmcError throw 위치
- [x] **통과선** — RQ 진단 말하기 + adapt 파이프가 Query에 연결되는 그림

## 정리

### 한 줄

React Query는 **파싱된 서버 상태**를 queryKey로 캐시·재fetch·무효화하고, `adaptServiceResponse`는 Service 메서드 응답을 풀어 **성공 데이터 / hmcError throw** 로 맞춰 Query·mutation이 그 계약을 소비하게 한다.

### 핵심

- **queryKey**: 캐시 주소. 같으면 공유·dedupe. 목록/상세 key 불일치가 invalidate 실패 1순위.
- **staleTime**: fresh 구간 — 기본 설정에선 이 안 **백그라운드 refetch 스킵**.
- **gcTime**(구 cacheTime): 구독 0일 때 메모리 잔류 시간. 길면 복귀 시 즉시 페인트 여지.
- **invalidate**: 키를 낡게 → refetch. 뮤테이션 성공 후 목록 동기화의 정석.
- **background refetch**: 이미 UI에 데이터 있어도 stale이면 뒤에서 갱신.
- HTTP 캐시 = 바이트·전송 계층 / RQ = 앱의 서버 상태·로딩·에러. “Network에 안 뜸”이 둘 중 어디인지 먼저 가른다.
- `adaptServiceResponse(ServiceImpl)`: 클래스 래핑 → 성공 언팩 + 실패 시 `hmcErrorCode` throw 단순화 (`packages/service` README).
- `unpackResponse(promise, picker)`: 한 호출만 `res.data.data.Authorization`처럼 **커스텀 꺼내기**.

### 흐름

```
adaptServiceResponse(Service)
  → method() → 성공: 언팩 데이터 / 실패: hmcError throw
       → useQuery / useMutation
            → QueryCache.onError 또는 useHmcError(onError)

invalidateQueries({ queryKey })
  → stale → (구독 중이면) refetch → UI 갱신
```

### 차이·함정

| 대비 | 한 줄 |
|------|--------|
| staleTime vs gcTime | 언제 낡을지 vs 안 쓰는 캐시 폐기 |
| RQ fresh 스킵 vs HTTP 캐시 | 앱이 fetch 안 함 vs 브라우저가 디스크/304 |
| adaptServiceResponse vs unpackResponse | 클래스 전체 계약 vs 단발 picker |
| invalidate 안 함 vs key 오타 | 증상 같음(“안 갱신”) — key부터 확인 |

### 실무 연결

- **주말 열:** `@backoffice-fe/service` README — adaptServiceResponse·unpackResponse **읽기만**.
- W6 월~수 에러 파이프의 **소스**: Service가 throw → mutation/Query onError.
- adjuster applications Service + `@query`가 이 계약을 전제로 동작.

### 면접 한 방

- **Q:** React Query를 쓰는 이유? staleTime과 gcTime? / adaptServiceResponse는?
- **답:** 서버 상태의 로딩·에러·캐시·중복요청을 일관 처리. staleTime은 신선 기간, gcTime은 미사용 캐시 수명. adapt는 API 성공/실패(HMC 코드) 계약을 Service 단에 고정해 화면은 Query만 보게 한다.

### 통과선 스크립트

1. queryKey = 캐시 주소.
2. staleTime / gcTime 한 줄씩.
3. invalidate + background refetch.
4. HTTP 캐시와 구분.
5. “안 갱신” → key·invalidate 점검.
6. adaptServiceResponse = 언팩 + hmcError throw.
7. 그 throw → onError/useHmcError/QueryCache로 이어짐.
