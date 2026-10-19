# 08-2 · URL as State

> **go 정리본** · 원문: `frontend-dev-notes/docs/curriculum/week-08-routing-realtime/08-2-url-as-state.md` · active: [`active_fe.md`](../../log/_common/sessions/active_fe.md)

## 학습 할 일

- [x] URL as State — 필터·탭·페이지를 쿼리에 두는 이유
- [x] searchParams 읽기/쓰기 (`URLSearchParams` / `useSearchParams`)
- [x] codec — 객체 ↔ 문자열 대칭 (배열·boolean 규칙)
- [x] URL↔state 양방향 동기화 race 원인
- [x] SSOT를 URL로 두는 단방향·배칭 완화
- [x] 잦은 갱신은 `replace`로 히스토리 오염 방지
- [x] **실무:** `useParamState` purpose · race · Param codec
- [x] **통과선** — 왜 URL / race / codec 30초

## 정리

### 한 줄

공유·새로고침·뒤로가기에 남아야 하는 UI 상태(필터·탭·페이지)는 컴포넌트 state가 아니라 **쿼리스트링을 SSOT**로 두고, encode/decode를 대칭으로 맞추며, URL↔로컬 양방향 쓰기를 피하거나 merge race를 막는다.

### 핵심

- **서버 state / 클라이언트 state / URL state** 3분할: 목록 데이터는 Query, 유저·역할은 persist·스토어, **공유·복원되는 뷰 상태**는 URL.
- 무엇을 URL에 둘지: 링크를 보내면 같은 화면이 나와야 하는가? 새로고침 후에도 유지해야 하는가? → Yes면 쿼리.
- `searchParams`는 문자열 세계. number·boolean·배열은 **codec**(decode 기본값·validator + encode 규칙)이 없으면 `?page=abc`·빈 배열 구분이 깨진다.
- race: `state → URL`과 `URL → state`가 서로를 트리거하거나, `setSearchParams`를 같은 틱에 여러 번 호출해 **이전 스냅샷으로 덮어쓰기**할 때 값이 튄다. 해법은 **URL 단방향 SSOT** 또는 **한 번에 merge / 주소창 기준 merge**.
- 입력·필터 연타는 `replace`(08-1과 연결). push는 “이전 필터로 돌아가기”가 의도일 때만.

### 흐름

```
목록 화면
  → 어떤 상태가 공유·복원 대상인가? (탭/필터/page)
  → codec으로 객체 ↔ ?key=value 대칭
  → useSearchParams / useParamState로 읽기
  → 변경 시 replace + (가능하면) 한 객체로 일괄 set
  → 새로고침·공유 링크·뒤로가기 → 같은 뷰 복원

[race 예]
  setParams({ status: 'done' })  // page 유실 가능
  setParams({ page: 2 })         // 옛 스냅샷이면 status 유실
  → 한 번에 { page, status } 또는 location.href 기준 merge
```

### 차이·함정

| 대비 | 한 줄 |
|------|--------|
| useState vs URL | 탭 임시 vs 공유·복원 UI |
| Redux/Zustand vs URL | 앱 전역 클라 vs 주소창에 남는 뷰 |
| push vs replace (쿼리) | 필터 히스토리 남김 vs 현재만 교체 |
| functional `prev` vs `location.href` | Router `prev`가 주소창과 어긋날 수 있음 |
| codec vs Zod만 | URL 팀 규칙(배열 trailing comma 등)은 codec 축 |

### 실무 연결

- `useParamState` (`@backoffice-fe/hook`): 목록 필터·페이지 스펙을 `Param`/`createQueryParams`로 한 번 선언 → 읽기·쓰기·Link 재사용 (`notes/2026-07-02_use-param-state-purpose.md`).
- race fix: `updateParam`이 merge 기준을 `setParams`의 `prev` 대신 `document.location.href`로 두고, 반영 대기 `await 80ms` (`notes/2026-07-01_use-param-state-url-race.md`, batch 노트).
- `Param` = 팀 URL 코덱(boolean `'true'`/`'false'`, 배열 trailing comma) — Zod 대체물이 아님 (`notes/2026-07-02_param-url-codec.md`).
- nursing `useListParams` / W8 URL-sync 손과제와 같은 축. UrlPlayground로 연속 `setSearchParams` 유실을 눈으로 확인 가능.

### 면접 한 방

- **Q:** 필터·페이지를 URL에 두면 뭐가 좋고, URL↔state 동기화 race는 왜 생기나?
- **답:** 공유·북마크·새로고침·뒤로가기에서 뷰가 보존된다. race는 URL→state와 state→URL이 서로를 밀거나, `setSearchParams`를 연속 호출해 옛 스냅샷으로 덮을 때 난다. URL을 SSOT로 두거나 한 번에 merge하고, 잦은 갱신은 replace.

### 통과선 스크립트

1. URL state가 3분할에서 맡는 역할 한 줄.
2. URL에 둘 것 / 두지 말 것 판단 기준.
3. searchParams는 문자열 → codec 필요.
4. race 두 원인(양방향 루프 · 연속 set 덮어쓰기).
5. 완화: 단방향 SSOT · 일괄 set · location 기준 merge.
6. replace와 히스토리.
7. `useParamState` / Param codec 한 줄.
