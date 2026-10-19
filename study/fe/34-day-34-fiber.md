# Day 34 · Fiber

> **go 정리본** · 원문: `frontend-dev-notes/docs/curriculum/week-05-react-rendering/day-34-fiber.md` · active: [`active_fe.md`](../../log/_common/sessions/active_fe.md)

## 학습 할 일

- [x] Fiber = **작업 단위 + 링크드 트리** (interruptible render) 정의
- [x] render phase(재개 가능) vs commit phase(동기·DOM) 구분
- [x] Concurrent 감각 — 우선순위·중단이 왜 필요한지 한 줄
- [x] **W6 수** mutation `onError` + **invalidate** 토이 시나리오
- [x] shared README `adaptServiceResponse`가 에러 throw와 맞물리는 위치 예고
- [x] **차이·함정** — Fiber ≠ VDOM 폐기 / onError에서 invalidate 타이밍
- [x] **통과선** — Fiber 30초 + mutation 실패 후 캐시 전략

## 정리

### 한 줄

Fiber는 구 VDOM 스택을 **끊을 수 있는 단위 작업**으로 쪼갠 내부 모델이고, 실무 mutation은 성공 시뿐 아니라 **실패 onError에서도** 특정 코드면 invalidate로 서버 상태와 화면을 다시 맞춘다.

### 핵심

- Fiber 노드: 컴포넌트 인스턴스·DOM·hooks·sibling/child/return 포인터. **트리 + 큐**로 “다음 할 일”을 순회.
- **Render phase**: 계산만 (순수에 가깝게). 우선순위 높은 업데이트에 양보·재시작 가능(Concurrent).
- **Commit phase**: DOM 반영·layout effect — **중단하면 중간 UI가 깨지므로** 짧게 동기.
- “왜 Fiber?” — 긴 동기 reconcile이 입력·애니메이션을 막던 문제를 **시간 슬라이싱**으로 완화.
- mutation `onSuccess` → 보통 `invalidateQueries`. `onError` + `useHmcError.onErrorConsumed`에서도 **같은 키 invalidate** 가능(예: 티켓/카드 상태 불일치 코드).
- 실패 후 invalidate는 “낙관적 UI 롤백”과 별개로, **서버가 이미 바꾼 부수효과**를 다시 읽는 용도.

### 흐름

```
Update → schedule
  → render (Fiber walk, pause/resume 가능)
  → commit (DOM + effects, sync)

mutate()
  → 성공: invalidate(listKey) → refetch
  → 실패: onError → useHmcError → onErrorConsumed(code)
       → 특정 code면 invalidate → 화면을 서버에 재정렬
```

### 차이·함정

| 대비 | 한 줄 |
|------|--------|
| Fiber vs “옛 VDOM” | 같은 목표(최소 DOM), **스케줄링·단위**가 다름 |
| Render vs Commit | 재계산 가능 vs DOM 확정 |
| onSuccess invalidate vs onError invalidate | 정상 갱신 vs **에러 코드 조건부** 재동기화 |
| 무조건 invalidate | 불필요 refetch·로딩 깜빡임 — 코드·키를 좁혀라 |

### 실무 연결

- 수 저녁: mutation onError + invalidate 토이. 월 `useHmcError` Example 1의 `DMN-ADJUSTER-1447` → `invalidate(ticketQuery…)`가 실전 템플릿.
- `adaptServiceResponse`로 감싼 Service는 실패 시 `hmcErrorCode` throw → 그 err가 mutation onError로 전달되는 **파이프** (토 주말에 깊게).

### 면접 한 방

- **Q:** Fiber가 뭐야? / 뮤테이션 실패 후에도 invalidate를 하나?
- **답:** React가 UI 작업을 Fiber 단위로 나눠 렌더를 중단·재개할 수 있게 한 구조다. 커밋은 짧게 동기. 실패여도 서버 상태가 이미 바뀌었거나 클라 캐시가 어긋난 코드면 onErrorConsumed에서 해당 queryKey만 무효화해 다시 맞춘다.

### 통과선 스크립트

1. Fiber = 끊을 수 있는 작업 단위 트리.
2. render 재개 가능 / commit 동기.
3. Concurrent = 응답성 위한 스케줄링.
4. mutation 성공→invalidate 기본.
5. 실패→코드 테이블→조건부 invalidate.
6. “전역 무조건 refetch”가 아니라고 한 줄.
