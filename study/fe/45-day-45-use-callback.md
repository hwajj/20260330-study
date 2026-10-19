# Day 45 · useCallback

> **go 정리본** · 원문: `frontend-dev-notes/docs/curriculum/week-06-react-hooks/day-45-use-callback.md` · active: [`active_fe.md`](../../log/_common/sessions/active_fe.md)

## 학습 할 일

- [x] `useCallback` = deps 같을 때 **같은 함수 참조**
- [x] memo 자식·Effect deps·컨텍스트 value에 넣는 이유
- [x] 없어도 되는 경우(일반 핸들러) vs 필요한 경우
- [x] deps 안 최신 state — functional update / ref와 조합
- [x] **주말:** W7 복습 — List params 변경 핸들러 참조 안정
- [x] useMemo와의 등가 관계
- [x] **통과선** — memo+callback+memo(값) 한 세트로 말하기

## 정리

### 한 줄

`useCallback`은 함수를 deps 기준으로 **메모이제이션**해, 자식 memo·의존 배열이 “매 렌더 새 함수”에 깨지지 않게 한다.

### 핵심

- `useCallback(fn, deps)` ≈ `useMemo(() => fn, deps)`.
- 이득: (1) `React.memo` 자식에 콜백 (2) Effect deps에 함수 (3) 커스텀 훅이 반환하는 안정 API.
- 부모만 리렌더되고 자식이 memo가 아니면 callback만 감싸는 의미는 작다.
- 콜백 안에서 최신 state가 필요하면 deps에 넣거나, `setS(s=>…)` / ref로 stale을 피한다(Day41).
- 목록 `onPageChange`·`onFilterChange`를 행 컴포넌트에 내릴 때 W7 모듈과 바로 연결된다.

### 흐름

```
부모 리렌더
  인라인 () => {} → 새 참조 → memo 자식 리렌더
  useCallback(..., [page]) → page 같으면 동일 참조 → 스킵 가능
```

### 차이·함정

| 대비 | 한 줄 |
|------|--------|
| useCallback vs 인라인 | 참조 안정 vs 매번 새 함수 |
| 전부 callback | 노이즈; 소비자(memo/deps) 있을 때 |
| deps [] 콜백 | 최신 state 놓치기 쉬움 |
| 커스텀 훅 반환 함수 | 보통 callback으로 안정화 |

### 실무 연결

- W7 주말 마무리: `useListParams` setter / URL 갱신 함수를 하위 필터 UI에 넘길 때 **참조가 흔들리면** 필터 패널 memo가 풀린다. Day45는 그 핸들러를 callback으로 고정하는 연습.
- orderQueries 자체는 팩토리 객체라 함수 안정과 별개 — **UI 핸들러** 쪽 이슈.

### 면접 한 방

- **Q:** useCallback은 필수인가?
- **답:** 아니다. memo 자식·Effect deps·훅 반환 API처럼 참조 동일성이 필요할 때. 그냥 버튼 onClick이면 인라인이 더 단순한 경우가 많다.

### 통과선 스크립트

1. callback = 함수 참조 메모.
2. memo와 세트로 말할 것.
3. deps와 stale 주의.
4. useMemo 등가.
5. W7: 리스트 필터 핸들러 안정화 한 줄.
