# Day 47 · Zustand / Redux

> **go 정리본** · 원문: `frontend-dev-notes/docs/curriculum/week-07-react-state-error/day-47-zustand-redux.md` · active: [`active_fe.md`](../../log/_common/sessions/active_fe.md)

## 학습 할 일

- [x] Redux: dispatch → action → reducer → store
- [x] Zustand: store+액션 함수, selector 구독
- [x] 불변 업데이트·클라이언트 vs 서버 상태
- [x] Context와 비교해 언제 스토어를 쓰는지
- [x] **실무:** detail 조회 후 **list invalidate** (RQ) — 스토어에 목록 넣지 않기
- [x] selector로 리렌더 범위 줄이기
- [x] **통과선** — “목록은 RQ, UI 전역만 스토어”

## 정리

### 한 줄

Zustand/Redux는 **클라이언트 전역 상태**용이고, API 원본이 서버에 있는 목록/상세는 React Query가 맡으며 mutation 뒤 **invalidate**로 맞춘다.

### 핵심

- Redux: 단방향·미들웨어·DevTools·규칙. RTK+Immer로 불변 업데이트 작성 부담↓.
- Zustand: 보일러플레이트 적음, `useStore(s => s.x)` selector가 핵심.
- 모든 걸 스토어에 넣지 않는다. 모달·input 로컬은 `useState`.
- **서버 상태**: fetch 결과를 Redux에 복제하면 캐시 이중관리. 상세 수정 후 목록이 낡으면 `queryClient.invalidateQueries(orderQueries.list())` 패턴(W8 화 손과제).
- care의 redux slice는 “클라이언트 워크플로” 쪽 사례로 읽고, nursing 목록은 Query 키 팩토리 쪽.

### 흐름

```
mutation 성공
  → invalidateQueries(['orders','list'])
  → list 화면 재fetch / 캐시 갱신
(스토어에 items[]를 또 두지 않음)
```

### 차이·함정

| 대비 | 한 줄 |
|------|--------|
| Zustand vs Redux | 간결 구독 vs 명시적 파이프라인 |
| 스토어 vs RQ | 클라이언트 vs 서버 캐시 |
| 전체 store 구독 vs selector | 불필요 리렌더 vs 필요한 슬라이스만 |
| 직접 mutate state | 예측·구독 깨짐(불변 원칙) |

### 실무 연결

- **손과제: detail + invalidate** — 상세 저장 후 목록 키를 무효화해 목록이 새 데이터를 보게 한다. Day47 요지: 이 흐름을 Redux에 목록 복사로 풀지 않는다.
- care `redux/store.ts`는 탭·UI·도메인 클라이언트 상태에 가깝게 재독.

### 면접 한 방

- **Q:** Context 있는데 왜 Zustand/Redux? 서버 데이터는?
- **답:** 갱신·구독·도구가 체계적일 때 스토어. 서버 원본 데이터는 RQ. 상세 변경 후 목록은 invalidate로 동기화한다.

### 통과선 스크립트

1. Redux 단방향 한 줄.
2. Zustand selector 한 줄.
3. 클라이언트 vs 서버 상태.
4. invalidate로 list 동기.
5. 전부 스토어 X.
